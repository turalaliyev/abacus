import { useParams } from "react-router-dom"
import { ArrowLeft, CalendarDays } from "lucide-react"
import { useTranslation } from "react-i18next"
import { PageHeader } from "../components/ui/PageHeader"
import { Button } from "../components/ui/Button"
import { RichText } from "../components/ui/RichText"
import { Skeleton } from "../components/ui/Skeleton"
import { useMediaAssets } from "../hooks/useSiteData"
import { useLocalizedBlogPosts } from "../hooks/useLocalizedData"
import { formatBlogDate, getMediaUrl } from "../lib/media"
import { NotFound } from "./NotFound"

/** One published article at /bloq/:slug. */
export function BlogPost() {
  const { t } = useTranslation()
  const { slug } = useParams<{ slug: string }>()
  const { data: posts, isLoading } = useLocalizedBlogPosts()
  const { data: media } = useMediaAssets()

  const post = posts?.find((p) => p.slug === slug)

  // A slug with no published row is a real 404, not an empty article.
  if (!isLoading && posts && !post) return <NotFound />

  const isLaw = post?.post_type === "qanunvericilik"
  const section = isLaw
    ? { label: t("pages.blogLaw.title"), href: "/bloq/qanunvericilik" }
    : { label: t("pages.blogNews.title"), href: "/bloq/xeberler" }
  const cover = post?.cover_image_url || getMediaUrl(media, "blog_default")

  return (
    <>
      <PageHeader
        title={post?.title ?? ""}
        breadcrumb={post?.title}
        image={cover || undefined}
      />
      <section className="bg-cream py-20 lg:py-28">
        <div className="mx-auto max-w-3xl px-4 lg:px-8">
          {isLoading || !post ? (
            <div className="space-y-4">
              <Skeleton className="h-5 w-1/3" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-3/4" />
            </div>
          ) : (
            <article>
              <div className="mb-8 flex flex-wrap items-center gap-4 text-sm text-slate-500">
                {post.category && <span className="eyebrow">{post.category}</span>}
                <span className="inline-flex items-center gap-2">
                  <CalendarDays className="h-4 w-4" aria-hidden />
                  {formatBlogDate(post.published_at)}
                </span>
              </div>

              {post.excerpt && (
                <p className="mb-10 text-xl leading-relaxed text-ink-900">{post.excerpt}</p>
              )}

              <RichText content={post.content} />

              <div className="mt-14 border-t border-ink-900/10 pt-8">
                <Button to={section.href} variant="ghost" className="border border-ink-900/15">
                  <ArrowLeft className="h-4 w-4" aria-hidden />
                  {section.label}
                </Button>
              </div>
            </article>
          )}
        </div>
      </section>
    </>
  )
}
