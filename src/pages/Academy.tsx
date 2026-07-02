import { GraduationCap, Clock, ArrowRight } from "lucide-react"
import { PageHeader } from "../components/ui/PageHeader"
import { StaggerContainer, StaggerItem } from "../components/ui/AnimatedSection"
import { Button } from "../components/ui/Button"
import { ServicesGridSkeleton } from "../components/ui/Skeleton"
import { useAcademyCourses } from "../hooks/useSiteData"
import { ACADEMY_TRACK_LABELS, type AcademyCourse } from "../types/database"

type AcademyProps = {
  variant?: AcademyCourse["track"]
}

export function Academy({ variant = "maliyye" }: AcademyProps) {
  const { data: courses, isLoading } = useAcademyCourses(variant)
  const meta = ACADEMY_TRACK_LABELS[variant]

  return (
    <>
      <PageHeader title={meta.title} subtitle={meta.subtitle} breadcrumb={`Akademiya · ${meta.title}`} />
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-5xl px-4 lg:px-8">
          {isLoading ? (
            <ServicesGridSkeleton count={3} />
          ) : !courses?.length ? (
            <p className="text-center text-slate-500">Kurslar tezliklə əlavə olunacaq.</p>
          ) : (
            <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {courses.map((course) => (
                <StaggerItem key={course.id}>
                  <div className="flex h-full flex-col rounded-2xl border border-slate-200 bg-slate-50 p-6 transition-all duration-300 hover:border-gold-300 hover:bg-white hover:shadow-lg">
                    {course.image_url ? (
                      <img
                        src={course.image_url}
                        alt={course.name}
                        className="mb-4 h-32 w-full rounded-xl object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="mb-4 grid h-12 w-12 place-items-center rounded-xl bg-navy-900 text-gold-400">
                        <GraduationCap className="h-6 w-6" />
                      </div>
                    )}
                    <h3 className="text-lg font-semibold text-navy-900">{course.name}</h3>
                    <div className="mt-3 flex items-center gap-2 text-sm text-slate-500">
                      <Clock className="h-4 w-4" />
                      {course.duration}
                    </div>
                    <div className="mt-5">
                      <Button to="/elaqe" variant="ghost" className="border border-navy-900/15">
                        Qeydiyyat <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          )}
        </div>
      </section>
    </>
  )
}
