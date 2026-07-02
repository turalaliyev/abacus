import { useState } from "react"
import type { TeamMember } from "../../types/database"

export function TeamMemberCard({ member }: { member: TeamMember }) {
  const [imageError, setImageError] = useState(false)
  const showImage = member.image_url && !imageError

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-gold-300 hover:shadow-xl">
      <div className="relative aspect-[4/5] overflow-hidden bg-navy-900">
        {showImage ? (
          <img
            src={member.image_url}
            alt={member.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-navy-900 to-navy-700 text-4xl font-bold text-gold-400">
            {member.name.charAt(0)}
          </div>
        )}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-navy-950/80 to-transparent" />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-semibold text-navy-900">{member.name}</h3>
        <p className="mt-1 text-sm leading-relaxed text-slate-500">{member.role}</p>
      </div>
    </div>
  )
}
