import React from 'react'
import { Editor } from '@tiptap/react'
import { 
  Bold, 
  Italic, 
  Underline, 
  Strikethrough, 
  Code, 
  Quote, 
  AlignLeft, 
  AlignCenter, 
  AlignRight, 
  AlignJustify,
  Subscript,
  Superscript
} from 'lucide-react'
import Select from './ui/Select'
import ToolbarButton from './ui/ToolbarButton'
import { Separator } from './ui/separator'

interface TextToolsProps {
  editor: Editor
}

const TextTools = ({ editor }: TextToolsProps) => {
  const fonts = [
    { value: 'ui-sans-serif', label: 'UI Sans Serif' },
    { value: 'ui-serif', label: 'UI Serif' },
    { value: 'ui-monospace', label: 'UI Monospace' },
    { value: 'system-ui', label: 'System UI' },
    { value: 'Arial', label: 'Arial' },
    { value: 'Times New Roman', label: 'Times New Roman' },
    { value: 'Courier New', label: 'Courier New' },
  ]

  const fontSizes = [8, 9, 10, 11, 12, 14, 16, 18, 20, 24, 28, 32, 36, 48, 60, 72]

  const headingLevels = [
    { value: 'paragraph', label: 'Normal', action: () => editor.chain().focus().setParagraph().run() },
    { value: 'h1', label: 'Heading 1', action: () => editor.chain().focus().toggleHeading({ level: 1 }).run() },
    { value: 'h2', label: 'Heading 2', action: () => editor.chain().focus().toggleHeading({ level: 2 }).run() },
    { value: 'h3', label: 'Heading 3', action: () => editor.chain().focus().toggleHeading({ level: 3 }).run() },
    { value: 'h4', label: 'Heading 4', action: () => editor.chain().focus().toggleHeading({ level: 4 }).run() },
    { value: 'h5', label: 'Heading 5', action: () => editor.chain().focus().toggleHeading({ level: 5 }).run() },
    { value: 'h6', label: 'Heading 6', action: () => editor.chain().focus().toggleHeading({ level: 6 }).run() },
  ]

  const getCurrentHeading = () => {
    if (editor.isActive('paragraph')) return 'paragraph'
    for (let level = 1; level <= 6; level++) {
      if (editor.isActive('heading', { level })) return `h${level}`
    }
    return 'paragraph'
  }

  return (
    <div className="flex items-center space-x-1 flex-wrap">
      {/* Font Family */}
      <Select
        value=""
        onChange={(font) => {
          if (font) {
            editor.chain().focus().setFontFamily(font).run()
          }
        }}
        options={fonts}
        placeholder="Font"
      />
      <Separator orientation="vertical" className="h-8 mx-1" />

      {/* Font Size */}
      <Select
        value=""
        onChange={(size) => {
          if (size) {
            // @ts-ignore - FontSize extension custom command
            editor.chain().focus().setFontSize(`${size}px`).run()
          }
        }}
        options={fontSizes.map(size => ({ value: size.toString(), label: `${size}px` }))}
        placeholder="Size"
      />
      <Separator orientation="vertical" className="h-8 mx-1" />

      {/* Heading Level */}
      <Select
        value={getCurrentHeading()}
        onChange={(headingValue) => {
          if (headingValue) {
            const heading = headingLevels.find(h => h.value === headingValue)
            if (heading) {
              heading.action()
            }
          }
        }}
        options={headingLevels.map(heading => ({ 
          value: heading.value, 
          label: heading.label 
        }))}
        placeholder="Heading"
      />
      <Separator orientation="vertical" className="h-8 mx-1" />

      {/* Basic Formatting */}
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBold().run()}
        isActive={editor.isActive('bold')}
        title="Bold"
      >
        <Bold size={16} />
      </ToolbarButton>
      
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleItalic().run()}
        isActive={editor.isActive('italic')}
        title="Italic"
      >
        <Italic size={16} />
      </ToolbarButton>
      
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        isActive={editor.isActive('underline')}
        title="Underline"
      >
        <Underline size={16} />
      </ToolbarButton>
      
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleStrike().run()}
        isActive={editor.isActive('strike')}
        title="Strikethrough"
      >
        <Strikethrough size={16} />
      </ToolbarButton>
      
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleCode().run()}
        isActive={editor.isActive('code')}
        title="Code"
      >
        <Code size={16} />
      </ToolbarButton>
      
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        isActive={editor.isActive('blockquote')}
        title="Quote"
      >
        <Quote size={16} />
      </ToolbarButton>
      
      <Separator orientation="vertical" className="h-8 mx-1" />

      {/* Text Alignment */}
      <ToolbarButton
        onClick={() => editor.chain().focus().setTextAlign('left').run()}
        isActive={editor.isActive({ textAlign: 'left' })}
        title="Align Left"
      >
        <AlignLeft size={16} />
      </ToolbarButton>
      
      <ToolbarButton
        onClick={() => editor.chain().focus().setTextAlign('center').run()}
        isActive={editor.isActive({ textAlign: 'center' })}
        title="Align Center"
      >
        <AlignCenter size={16} />
      </ToolbarButton>
      
      <ToolbarButton
        onClick={() => editor.chain().focus().setTextAlign('right').run()}
        isActive={editor.isActive({ textAlign: 'right' })}
        title="Align Right"
      >
        <AlignRight size={16} />
      </ToolbarButton>
      
      <ToolbarButton
        onClick={() => editor.chain().focus().setTextAlign('justify').run()}
        isActive={editor.isActive({ textAlign: 'justify' })}
        title="Justify"
      >
        <AlignJustify size={16} />
      </ToolbarButton>
      
      <Separator orientation="vertical" className="h-8 mx-1" />

      {/* Subscript/Superscript */}
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleSubscript().run()}
        isActive={editor.isActive('subscript')}
        title="Subscript"
      >
        <Subscript size={16} />
      </ToolbarButton>
      
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleSuperscript().run()}
        isActive={editor.isActive('superscript')}
        title="Superscript"
      >
        <Superscript size={16} />
      </ToolbarButton>
    </div>
  )
}

export default TextTools