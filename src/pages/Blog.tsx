import { CalendarDays, ArrowUpRight } from "lucide-react"
import { useTranslation } from "react-i18next"
import { PageHeader } from "../components/ui/PageHeader"
import { StaggerContainer, StaggerItem } from "../components/ui/AnimatedSection"
import { BlogGridSkeleton } from "../components/ui/Skeleton"
import { useMediaAssets } from "../hooks/useSiteData"
import { useLocalizedBlogPosts } from "../hooks/useLocalizedData"
import { formatBlogDate, getMediaUrl } from "../lib/media"

type BlogProps = {
  variant?: "xeberler" | "qanunvericilik"
}

export function Blog({ variant = "xeberler" }: BlogProps) {
  const { t } = useTranslation()
  const isNews = variant === "xeberler"
  const { data: posts, isLoading } = useLocalizedBlogPosts(variant)
  const { data: media } = useMediaAssets()
  const defaultCover = getMediaUrl(media, "blog_default")

  return (
    <>
      <PageHeader
        title={isNews ? t("pages.blogNews.title") : t("pages.blogLaw.title")}
        subtitle={isNews ? t("pages.blogNews.subtitle") : t("pages.blogLaw.subtitle")}
      />
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          {isLoading ? (
            <BlogGridSkeleton />
          ) : !posts?.length ? (
            <p className="text-center text-slate-500">{t("common.noPosts")}</p>
          ) : (
            <StaggerContainer className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => {
                const cover = post.cover_image_url || defaultCover
                return (
                  <StaggerItem key={post.id}>
                    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                      <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-navy-900 to-navy-700">
                        {cover ? (
                          <img
                            src={cover}
                            alt={post.title}
                            className="h-full w-full object-cover"
                            loading="lazy"
                          />
                        ) : null}
                        <span className="absolute left-4 top-4 rounded-full bg-gold-500 px-3 py-1 text-xs font-semibold text-navy-950">
                          {post.category}
                        </span>
                      </div>
                      <div className="flex flex-1 flex-col p-6">
                        <div className="mb-3 flex items-center gap-2 text-xs text-slate-400">
                          <CalendarDays className="h-3.5 w-3.5" />
                          {formatBlogDate(post.published_at)}
                        </div>
                        <h3 className="mb-3 text-lg font-semibold text-navy-900 group-hover:text-gold-600">
                          {post.title}
                        </h3>
                        <p className="flex-1 text-sm leading-relaxed text-slate-600">{post.excerpt}</p>
                        <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-gold-600">
                          {t("common.readMore")} <ArrowUpRight className="h-4 w-4" />
                        </span>
                      </div>
                    </article>
                  </StaggerItem>
                )
              })}
            </StaggerContainer>
          )}
        </div>
      </section>
    </>
  )
}
