import { isHtmlContent } from '../../lib/richText'

type RichTextProps = {
  content: string
  className?: string
}

/**
 * Renders CMS rich text (HTML from the admin editor).
 * Plain text is shown as paragraphs for backward compatibility.
 */
export function RichText({ content, className = '' }: RichTextProps) {
  if (!content?.trim()) return null

  if (isHtmlContent(content)) {
    return (
      <div
        className={`rich-text text-lg leading-relaxed text-slate-600 ${className}`}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    )
  }

  return (
    <div className={`space-y-4 text-lg leading-relaxed text-slate-600 ${className}`}>
      {content.split(/\n\n+/).map((p, i) => (
        <p key={i}>{p}</p>
      ))}
    </div>
  )
}
