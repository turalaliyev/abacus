import { useMemo, useRef } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"
import { prefersReducedMotion } from "../../lib/motion"

/**
 * Hero background: a slowly undulating wireframe surface with a drifting
 * particle field above it, gold on navy.
 *
 * The brief was "wow, but still an audit firm" — so this reads as a data
 * surface (a ledger grid flexing under analysis) rather than decoration. It
 * sits behind a scrim and never competes with the headline.
 *
 * Lazy-loaded by Hero so three.js stays out of the initial bundle.
 */

const GOLD = new THREE.Color("#d4af37")
const NAVY = new THREE.Color("#071525")

const SEGMENTS_X = 72
const SEGMENTS_Y = 44

function Surface({ reduced }: { reduced: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const geometry = useMemo(
    () => new THREE.PlaneGeometry(46, 26, SEGMENTS_X, SEGMENTS_Y),
    [],
  )

  // Cache the flat XY grid once; the wave only rewrites Z each frame.
  const base = useMemo(() => {
    const pos = geometry.attributes.position
    return {
      x: Float32Array.from({ length: pos.count }, (_, i) => pos.getX(i)),
      y: Float32Array.from({ length: pos.count }, (_, i) => pos.getY(i)),
    }
  }, [geometry])

  const displace = (time: number) => {
    const pos = geometry.attributes.position as THREE.BufferAttribute
    for (let i = 0; i < pos.count; i++) {
      const x = base.x[i]
      const y = base.y[i]
      // Layered waves at different frequencies read as organic rather than
      // mechanical, while staying shallow enough to feel like a surface.
      const z =
        Math.sin(x * 0.28 + time * 0.55) * 0.62 +
        Math.sin(y * 0.34 - time * 0.42) * 0.48 +
        Math.sin((x + y) * 0.17 + time * 0.31) * 0.4
      pos.setZ(i, z)
    }
    pos.needsUpdate = true
    geometry.computeVertexNormals()
  }

  useFrame(({ clock }) => {
    if (reduced) return
    displace(clock.elapsedTime)
  })

  // Reduced motion still gets a shaped surface, just frozen.
  useMemo(() => displace(0), []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <mesh ref={meshRef} geometry={geometry} rotation={[-Math.PI / 2.32, 0, 0]} position={[0, -2.4, 0]}>
      <meshBasicMaterial color={GOLD} wireframe transparent opacity={0.26} />
    </mesh>
  )
}

function Particles({ reduced }: { reduced: boolean }) {
  const pointsRef = useRef<THREE.Points>(null)
  const COUNT = 260

  const { geometry, speeds } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3)
    const spd = new Float32Array(COUNT)
    for (let i = 0; i < COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 34
      positions[i * 3 + 1] = Math.random() * 12 - 2
      positions[i * 3 + 2] = (Math.random() - 0.5) * 22
      spd[i] = 0.12 + Math.random() * 0.3
    }
    const geo = new THREE.BufferGeometry()
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3))
    return { geometry: geo, speeds: spd }
  }, [])

  useFrame((_, delta) => {
    if (reduced || !pointsRef.current) return
    const pos = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute
    for (let i = 0; i < COUNT; i++) {
      let y = pos.getY(i) + speeds[i] * delta
      if (y > 10) y = -2
      pos.setY(i, y)
    }
    pos.needsUpdate = true
  })

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        color={GOLD}
        size={0.055}
        transparent
        opacity={0.72}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}

/** Eases the camera toward the pointer for depth without disorienting. */
function CameraRig({ reduced }: { reduced: boolean }) {
  const { camera, pointer } = useThree()

  useFrame(() => {
    if (reduced) return
    camera.position.x += (pointer.x * 1.15 - camera.position.x) * 0.035
    camera.position.y += (1.9 + pointer.y * 0.6 - camera.position.y) * 0.035
    camera.lookAt(0, 0, 0)
  })

  return null
}

type DataSurfaceProps = {
  /**
   * `full` paints the whole background (surface + particles on navy).
   * `overlay` renders only the particle field on a transparent canvas, so it
   * can sit over the CMS hero video without hiding it.
   */
  variant?: "full" | "overlay"
}

export default function DataSurface({ variant = "full" }: DataSurfaceProps) {
  const reduced = prefersReducedMotion()
  const overlay = variant === "overlay"

  return (
    <Canvas
      // Cap DPR: the surface is a soft background, not a detail shot.
      dpr={[1, 1.75]}
      camera={{ position: [0, 1.9, 9], fov: 55 }}
      gl={{ antialias: true, alpha: overlay }}
      frameloop={reduced ? "demand" : "always"}
      onCreated={({ scene, gl }) => {
        if (overlay) {
          gl.setClearAlpha(0)
        } else {
          scene.fog = new THREE.Fog(NAVY, 9, 24)
          gl.setClearColor(NAVY, 1)
        }
      }}
      aria-hidden
    >
      {!overlay && <Surface reduced={reduced} />}
      <Particles reduced={reduced} />
      <CameraRig reduced={reduced} />
    </Canvas>
  )
}
