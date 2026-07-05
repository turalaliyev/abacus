import type { HTMLAttributes } from 'react'

type SkeletonProps = HTMLAttributes<HTMLDivElement>

export function Skeleton({ className = '', ...props }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse rounded-lg bg-slate-200/80 ${className}`}
      aria-hidden="true"
      {...props}
    />
  )
}

export function HeroSkeleton() {
  return (
    <section className="relative overflow-hidden bg-navy-950">
      <div className="mx-auto max-w-7xl px-4 py-24 lg:px-8 lg:py-32">
        <Skeleton className="h-7 w-64 rounded-full bg-white/10" />
        <Skeleton className="mt-6 h-14 w-full max-w-2xl bg-white/10" />
        <Skeleton className="mt-3 h-14 w-full max-w-xl bg-white/10" />
        <Skeleton className="mt-6 h-6 w-full max-w-lg bg-white/10" />
        <div className="mt-10 flex gap-4">
          <Skeleton className="h-12 w-40 bg-white/10" />
          <Skeleton className="h-12 w-36 bg-white/10" />
        </div>
      </div>
    </section>
  )
}

export function StatsSkeleton() {
  return (
    <section className="bg-navy-900 py-14">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 lg:grid-cols-4 lg:px-8">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="text-center">
            <Skeleton className="mx-auto h-12 w-24 bg-white/10" />
            <Skeleton className="mx-auto mt-3 h-4 w-20 bg-white/10" />
          </div>
        ))}
      </div>
    </section>
  )
}

export function ServicesGridSkeleton({ count = 9 }: { count?: number }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <Skeleton className="h-32 w-full rounded-none sm:h-36" />
          <div className="p-5 sm:p-6">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="mt-3 h-4 w-full" />
            <Skeleton className="mt-2 h-4 w-full" />
            <Skeleton className="mt-2 h-4 w-2/3" />
          </div>
        </div>
      ))}
    </div>
  )
}

export function TeamGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <Skeleton className="aspect-[4/5] w-full rounded-none" />
          <div className="p-5">
            <Skeleton className="h-5 w-2/3" />
            <Skeleton className="mt-2 h-4 w-full" />
          </div>
        </div>
      ))}
    </div>
  )
}

export function PartnersGridSkeleton({ count = 12 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <Skeleton key={i} className="min-h-44 w-full rounded-xl bg-[#CAD1D8]" />
      ))}
    </div>
  )
}

export function BlogGridSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="overflow-hidden rounded-2xl border border-slate-200">
          <Skeleton className="aspect-video w-full rounded-none" />
          <div className="p-6">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="mt-4 h-6 w-full" />
            <Skeleton className="mt-3 h-4 w-full" />
            <Skeleton className="mt-2 h-4 w-3/4" />
          </div>
        </div>
      ))}
    </div>
  )
}

export function WhyUsGridSkeleton() {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="rounded-2xl border border-slate-200 p-7">
          <Skeleton className="h-7 w-7 rounded-full" />
          <Skeleton className="mt-4 h-6 w-1/2" />
          <Skeleton className="mt-3 h-4 w-full" />
        </div>
      ))}
    </div>
  )
}

export function TextBlockSkeleton({ lines = 4 }: { lines?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton key={i} className={`h-5 ${i === lines - 1 ? 'w-4/5' : 'w-full'}`} />
      ))}
    </div>
  )
}

export function NavbarSkeleton() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 lg:px-8">
        <Skeleton className="h-10 w-40" />
        <div className="hidden gap-2 lg:flex">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-8 w-20" />
          ))}
        </div>
        <Skeleton className="hidden h-10 w-28 lg:block" />
      </div>
    </header>
  )
}

export function ContactInfoSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="flex gap-4 rounded-2xl border border-slate-200 p-6">
          <Skeleton className="h-12 w-12 shrink-0 rounded-xl" />
          <div className="flex-1">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="mt-2 h-6 w-48" />
          </div>
        </div>
      ))}
    </div>
  )
}
