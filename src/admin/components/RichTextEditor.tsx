import { useEffect } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import { Extension } from '@tiptap/core'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Underline from '@tiptap/extension-underline'
import { TextStyle } from '@tiptap/extension-text-style'
import { Button, Select, Space, Tooltip } from 'antd'
import {
  BoldOutlined,
  ItalicOutlined,
  UnderlineOutlined,
  OrderedListOutlined,
  UnorderedListOutlined,
  LinkOutlined,
} from '@ant-design/icons'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    fontSize: {
      setFontSize: (size: string) => ReturnType
      unsetFontSize: () => ReturnType
    }
  }
}

/**
 * Inline font size. TipTap has no official extension for this, so it is the
 * documented pattern: a `fontSize` attribute on the TextStyle mark, rendered as
 * an inline style so the public site keeps the same size.
 */
const FontSize = Extension.create({
  name: 'fontSize',
  addGlobalAttributes() {
    return [
      {
        types: ['textStyle'],
        attributes: {
          fontSize: {
            default: null,
            parseHTML: (element) => element.style.fontSize || null,
            renderHTML: (attributes) =>
              attributes.fontSize ? { style: `font-size: ${attributes.fontSize}` } : {},
          },
        },
      },
    ]
  },
  addCommands() {
    return {
      setFontSize:
        (size: string) =>
        ({ chain }) =>
          chain().setMark('textStyle', { fontSize: size }).run(),
      unsetFontSize:
        () =>
        ({ chain }) =>
          chain().setMark('textStyle', { fontSize: null }).removeEmptyTextStyle().run(),
    }
  },
})

const FONT_SIZES = ['12px', '14px', '16px', '18px', '20px', '24px', '28px', '32px', '40px']

/** Paragraph or H1–H5, the block styles the editor offers. */
const BLOCK_OPTIONS = [
  { value: 'paragraph', label: 'Mətn' },
  { value: 'h1', label: 'H1' },
  { value: 'h2', label: 'H2' },
  { value: 'h3', label: 'H3' },
  { value: 'h4', label: 'H4' },
  { value: 'h5', label: 'H5' },
]

/** Convert plain text to simple HTML so existing content still loads. */
export function toEditorHtml(value: string | undefined): string {
  const v = value?.trim() ?? ''
  if (!v) return ''
  if (/<[a-z][\s\S]*>/i.test(v)) return v
  return `<p>${v.replace(/\n\n+/g, '</p><p>').replace(/\n/g, '<br>')}</p>`
}

function normalizeEditorHtml(html: string): string {
  const trimmed = html.trim()
  if (!trimmed || trimmed === '<p></p>') return ''
  return trimmed
}

export function RichTextEditor({
  value,
  onChange,
}: {
  value?: string
  onChange?: (html: string) => void
}) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3, 4, 5] },
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { class: 'text-blue-600 underline' },
      }),
      TextStyle,
      FontSize,
    ],
    content: toEditorHtml(value),
    onUpdate: ({ editor: ed }) => {
      onChange?.(ed.isEmpty ? '' : ed.getHTML())
    },
    editorProps: {
      attributes: {
        class:
          'min-h-[160px] max-h-[320px] overflow-y-auto px-3 py-2 text-sm outline-none prose prose-sm max-w-none',
      },
    },
  })

  useEffect(() => {
    if (!editor) return
    const next = normalizeEditorHtml(toEditorHtml(value))
    const current = normalizeEditorHtml(editor.isEmpty ? '' : editor.getHTML())
    if (next === current) return
    editor.commands.setContent(next || '<p></p>', { emitUpdate: false })
  }, [editor, value])

  if (!editor) return null

  const setLink = () => {
    const prev = editor.getAttributes('link').href as string | undefined
    const url = window.prompt('URL', prev ?? 'https://')
    if (url === null) return
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()
      return
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  }

  const blockValue = editor.isActive('heading', { level: 1 })
    ? 'h1'
    : editor.isActive('heading', { level: 2 })
      ? 'h2'
      : editor.isActive('heading', { level: 3 })
        ? 'h3'
        : editor.isActive('heading', { level: 4 })
          ? 'h4'
          : editor.isActive('heading', { level: 5 })
            ? 'h5'
            : 'paragraph'

  const setBlock = (v: string) => {
    const chain = editor.chain().focus()
    if (v === 'paragraph') {
      chain.setParagraph().run()
      return
    }
    chain.setHeading({ level: Number(v.slice(1)) as 1 | 2 | 3 | 4 | 5 }).run()
  }

  const currentSize: string | undefined = editor.getAttributes('textStyle').fontSize || undefined

  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
      <div className="flex flex-wrap gap-1 border-b border-slate-200 bg-slate-50 px-2 py-1.5">
        <Space size={4} wrap>
          <Tooltip title="Mətn stili">
            <Select
              size="small"
              style={{ width: 96 }}
              value={blockValue}
              options={BLOCK_OPTIONS}
              onChange={setBlock}
            />
          </Tooltip>
          <Tooltip title="Şriftin ölçüsü">
            <Select
              size="small"
              style={{ width: 96 }}
              placeholder="Ölçü"
              allowClear
              value={currentSize}
              options={FONT_SIZES.map((s) => ({ value: s, label: s.replace('px', '') }))}
              onChange={(v) => {
                if (v) editor.chain().focus().setFontSize(v).run()
                else editor.chain().focus().unsetFontSize().run()
              }}
            />
          </Tooltip>
          <Tooltip title="Bold">
            <Button
              type={editor.isActive('bold') ? 'primary' : 'text'}
              size="small"
              icon={<BoldOutlined />}
              onClick={() => editor.chain().focus().toggleBold().run()}
            />
          </Tooltip>
          <Tooltip title="Italic">
            <Button
              type={editor.isActive('italic') ? 'primary' : 'text'}
              size="small"
              icon={<ItalicOutlined />}
              onClick={() => editor.chain().focus().toggleItalic().run()}
            />
          </Tooltip>
          <Tooltip title="Underline">
            <Button
              type={editor.isActive('underline') ? 'primary' : 'text'}
              size="small"
              icon={<UnderlineOutlined />}
              onClick={() => editor.chain().focus().toggleUnderline().run()}
            />
          </Tooltip>
          <Tooltip title="Bullet list">
            <Button
              type={editor.isActive('bulletList') ? 'primary' : 'text'}
              size="small"
              icon={<UnorderedListOutlined />}
              onClick={() => editor.chain().focus().toggleBulletList().run()}
            />
          </Tooltip>
          <Tooltip title="Numbered list">
            <Button
              type={editor.isActive('orderedList') ? 'primary' : 'text'}
              size="small"
              icon={<OrderedListOutlined />}
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
            />
          </Tooltip>
          <Tooltip title="Link">
            <Button
              type={editor.isActive('link') ? 'primary' : 'text'}
              size="small"
              icon={<LinkOutlined />}
              onClick={setLink}
            />
          </Tooltip>
        </Space>
      </div>
      <EditorContent editor={editor} />
    </div>
  )
}
