"use client"
import React, { useState } from 'react'
import { Editor } from '@tiptap/react'
import { 
  Bold, 
  Italic, 
  Underline, 
  Strikethrough, 
  Code, 
  Quote, 
  Link, 
  AlignLeft, 
  AlignCenter, 
  AlignRight, 
  AlignJustify,
  Subscript,
  Superscript,
  FileText,
  Type,
  Heading,
  Ruler,
  Droplets
} from 'lucide-react'
import { FontSize } from '@tiptap/extension-text-style'

interface ToolbarProps {
  editor: Editor | null
  onPaperSizeChange?: (size: { name: string, width: number, height: number }) => void
  onHeaderFooterChange?: (type: 'headerLeft' | 'headerRight' | 'footerLeft' | 'footerRight', value: string) => void
}

const Toolbar = ({ editor, onPaperSizeChange, onHeaderFooterChange }: ToolbarProps) => {
  const [activeMode, setActiveMode] = useState<'text' | 'page'>('text')
  const [showHeaderFooterDialog, setShowHeaderFooterDialog] = useState<{
    show: boolean;
    type: 'headerLeft' | 'headerRight' | 'footerLeft' | 'footerRight' | null;
  }>({ show: false, type: null })
  const [headerFooterInput, setHeaderFooterInput] = useState('')

  if (!editor) {
    return null
  }

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

  const paperSizes = [
    { value: 'a4', label: 'A4', width: 816, height: 1056 },
    { value: 'a3', label: 'A3', width: 1123, height: 1587 },
    { value: 'letter', label: 'Letter', width: 816, height: 1056 },
    { value: 'legal', label: 'Legal', width: 816, height: 1344 },
    { value: 'tabloid', label: 'Tabloid', width: 1056, height: 1632 },
  ]

  const headingLevels = [
    { value: 'paragraph', label: 'Normal', action: () => editor.chain().focus().setParagraph().run() },
    { value: 'h1', label: 'Heading 1', action: () => editor.chain().focus().toggleHeading({ level: 1 }).run() },
    { value: 'h2', label: 'Heading 2', action: () => editor.chain().focus().toggleHeading({ level: 2 }).run() },
    { value: 'h3', label: 'Heading 3', action: () => editor.chain().focus().toggleHeading({ level: 3 }).run() },
    { value: 'h4', label: 'Heading 4', action: () => editor.chain().focus().toggleHeading({ level: 4 }).run() },
    { value: 'h5', label: 'Heading 5', action: () => editor.chain().focus().toggleHeading({ level: 5 }).run() },
    { value: 'h6', label: 'Heading 6', action: () => editor.chain().focus().toggleHeading({ level: 6 }).run() },
  ]

  // Function to handle header/footer addition
  const handleHeaderFooterAdd = (type: 'headerLeft' | 'headerRight' | 'footerLeft' | 'footerRight') => {
    setShowHeaderFooterDialog({ show: true, type })
    setHeaderFooterInput('')
  }

  // Function to confirm header/footer addition
  const confirmHeaderFooterAdd = () => {
    if (showHeaderFooterDialog.type && headerFooterInput.trim() && onHeaderFooterChange) {
      onHeaderFooterChange(showHeaderFooterDialog.type, headerFooterInput.trim())
    }
    setShowHeaderFooterDialog({ show: false, type: null })
    setHeaderFooterInput('')
  }

  // Function to cancel header/footer dialog
  const cancelHeaderFooterAdd = () => {
    setShowHeaderFooterDialog({ show: false, type: null })
    setHeaderFooterInput('')
  }

  // Function to get current heading level
  const getCurrentHeading = () => {
    if (editor.isActive('paragraph')) return 'paragraph'
    for (let level = 1; level <= 6; level++) {
      if (editor.isActive('heading', { level })) return `h${level}`
    }
    return 'paragraph'
  }

  const ToolbarButton = ({ 
    onClick, 
    isActive = false, 
    children, 
    title 
  }: { 
    onClick: () => void
    isActive?: boolean
    children: React.ReactNode
    title?: string
  }) => (
    <button
      onClick={onClick}
      title={title}
      className={`p-2 hover:bg-[#E6DCEF] transition-colors ${
        isActive ? 'bg-[#E6DCEF] text-[#694C80]' : 'text-gray-700'
      }`}
    >
      {children}
    </button>
  )

  const Separator = () => <div className="w-px h-8 bg-gray-300" />

  const Select = ({ 
    value, 
    onChange, 
    options, 
    placeholder 
  }: { 
    value: string
    onChange: (value: string) => void
    options: { value: string; label: string }[]
    placeholder: string
  }) => (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="px-3 py-1 border border-gray-300 rounded-none bg-white text-sm focus:outline-none focus:bg-[#E6DCEF] focus:text-[#694C80]"
    >
      <option value="">{placeholder}</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  )

  // Header/Footer Dialog Component
  const HeaderFooterDialog = () => {
    if (!showHeaderFooterDialog.show) return null

    const getDialogTitle = () => {
      switch (showHeaderFooterDialog.type) {
        case 'headerLeft': return 'Add Left Header'
        case 'headerRight': return 'Add Right Header'
        case 'footerLeft': return 'Add Left Footer'
        case 'footerRight': return 'Add Right Footer'
        default: return 'Add Header/Footer'
      }
    }

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
          <h3 className="text-lg font-semibold mb-4">{getDialogTitle()}</h3>
          <input
            type="text"
            value={headerFooterInput}
            onChange={(e) => setHeaderFooterInput(e.target.value)}
            placeholder="Enter header/footer text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#694C80] focus:border-transparent"
            autoFocus
            onKeyDown={(e) => {
              if (e.key === 'Enter') confirmHeaderFooterAdd()
              if (e.key === 'Escape') cancelHeaderFooterAdd()
            }}
          />
          <div className="flex justify-end space-x-3 mt-4">
            <button
              onClick={cancelHeaderFooterAdd}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={confirmHeaderFooterAdd}
              disabled={!headerFooterInput.trim()}
              className="px-4 py-2 bg-[#694C80] text-white rounded-md hover:bg-[#5a3f6b] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    )
  }

  const renderTextTools = () => (
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
      <Separator />

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
      <Separator />

      {/* Heading Level - FIXED */}
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
      <Separator />

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
      
      <Separator />

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
      
      <Separator />

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

  const renderPageTools = () => (
    <div className="flex items-center space-x-1 flex-wrap">
      {/* Paper Size */}
      <Select
        value=""
        onChange={(sizeValue) => {
          if (sizeValue && onPaperSizeChange) {
            const selectedSize = paperSizes.find(size => size.value === sizeValue)
            if (selectedSize) {
              onPaperSizeChange({
                name: selectedSize.label,
                width: selectedSize.width,
                height: selectedSize.height
              })
            }
          }
        }}
        options={paperSizes}
        placeholder="Paper Size"
      />
      <Separator />

      {/* Headers & Footers */}
      <ToolbarButton
        onClick={() => handleHeaderFooterAdd('headerLeft')}
        title="Add Left Header"
      >
        <div className="flex items-center space-x-1">
          <Heading size={16} />
          <span className="text-xs">H-L</span>
        </div>
      </ToolbarButton>
      
      <ToolbarButton
        onClick={() => handleHeaderFooterAdd('headerRight')}
        title="Add Right Header"
      >
        <div className="flex items-center space-x-1">
          <Heading size={16} />
          <span className="text-xs">H-R</span>
        </div>
      </ToolbarButton>
      
      <ToolbarButton
        onClick={() => handleHeaderFooterAdd('footerLeft')}
        title="Add Left Footer"
      >
        <div className="flex items-center space-x-1">
          <FileText size={16} />
          <span className="text-xs">F-L</span>
        </div>
      </ToolbarButton>
      
      <ToolbarButton
        onClick={() => handleHeaderFooterAdd('footerRight')}
        title="Add Right Footer"
      >
        <div className="flex items-center space-x-1">
          <FileText size={16} />
          <span className="text-xs">F-R</span>
        </div>
      </ToolbarButton>
      
      <Separator />

      {/* Margins */}
      <ToolbarButton
        onClick={() => {
          // Implement margin adjustment logic
          console.log('Adjust margins')
        }}
        title="Adjust Margins"
      >
        <Ruler size={16} />
      </ToolbarButton>
      
      <Separator />

      {/* Watermark */}
      <ToolbarButton
        onClick={() => {
          // Implement watermark logic
          console.log('Add watermark')
        }}
        title="Add Watermark"
      >
        <Droplets size={16} />
      </ToolbarButton>
    </div>
  )

  return (
    <>
      <div className="w-full bg-[#F2EDF7] border-b border-gray-200">
        {/* Mode Selection */}
        <div className="flex items-center px-4 py-2 border-b border-gray-200">
          <ToolbarButton
            onClick={() => setActiveMode('text')}
            isActive={activeMode === 'text'}
            title="Text Tools"
          >
            <div className="flex items-center space-x-2">
              <Type size={16} />
              <span className="text-sm font-medium">Text</span>
            </div>
          </ToolbarButton>
          
          <Separator />
          
          <ToolbarButton
            onClick={() => setActiveMode('page')}
            isActive={activeMode === 'page'}
            title="Page Tools"
          >
            <div className="flex items-center space-x-2">
              <FileText size={16} />
              <span className="text-sm font-medium">Page</span>
            </div>
          </ToolbarButton>
        </div>

        {/* Tools */}
        <div className="px-4 py-3 overflow-x-auto">
          {activeMode === 'text' ? renderTextTools() : renderPageTools()}
        </div>
      </div>
      
      {/* Header/Footer Dialog */}
      <HeaderFooterDialog />
    </>
  )
}

export default Toolbar