"use client"
import React, { useState } from 'react'
import { Editor } from '@tiptap/react'
import { Type, FileText } from 'lucide-react'
import TextTools from './TextTools'
import HeaderFooterDialog from './HeaderFooterDialog'
import WatermarkDialog from './WatermarkDialog'
import ToolbarButton from './ui/ToolbarButton'
import PageTools from './PageTool'

interface ToolbarProps {
  editor: Editor | null
  onPaperSizeChange?: (size: { name: string, width: number, height: number }) => void
  onHeaderFooterChange?: (type: 'headerLeft' | 'headerRight' | 'footerLeft' | 'footerRight', value: string) => void
  onWatermarkChange?: (config: {
    text: string;
    type: 'text' | 'image';
    imageUrl: string;
    opacity: number;
    position: 'center' | 'diagonal' | 'repeat';
    size: 'small' | 'medium' | 'large';
  }) => void
}

// Custom vertical separator component
const VerticalSeparator = () => (
  <div className="w-px h-8 bg-gray-300 mx-1" />
)

const Toolbar = ({ editor, onPaperSizeChange, onHeaderFooterChange, onWatermarkChange }: ToolbarProps) => {
  const [activeMode, setActiveMode] = useState<'text' | 'page'>('text')
  const [showHeaderFooterDialog, setShowHeaderFooterDialog] = useState<{
    show: boolean;
    type: 'headerLeft' | 'headerRight' | 'footerLeft' | 'footerRight' | null;
  }>({ show: false, type: null })
  const [headerFooterInput, setHeaderFooterInput] = useState('')
  const [showWatermarkDialog, setShowWatermarkDialog] = useState(false)
  const [watermarkConfig, setWatermarkConfig] = useState({
    text: '',
    type: 'text' as 'text' | 'image',
    imageUrl: '',
    opacity: 0.3,
    position: 'center' as 'center' | 'diagonal' | 'repeat',
    size: 'medium' as 'small' | 'medium' | 'large'
  })

  if (!editor) {
    return null
  }

  const handleHeaderFooterAdd = (type: 'headerLeft' | 'headerRight' | 'footerLeft' | 'footerRight') => {
    setShowHeaderFooterDialog({ show: true, type })
    setHeaderFooterInput('')
  }

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
          
          <VerticalSeparator />
          
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
          {activeMode === 'text' ? (
            <TextTools editor={editor} />
          ) : (
            <PageTools
              onPaperSizeChange={onPaperSizeChange}
              onHeaderFooterAdd={handleHeaderFooterAdd}
              onWatermarkClick={() => setShowWatermarkDialog(true)}
            />
          )}
        </div>
      </div>
      
      <HeaderFooterDialog 
        showDialog={showHeaderFooterDialog}
        setShowDialog={setShowHeaderFooterDialog}
        headerFooterInput={headerFooterInput}
        setHeaderFooterInput={setHeaderFooterInput}
        onHeaderFooterChange={onHeaderFooterChange}
      />
      
      <WatermarkDialog 
        showDialog={showWatermarkDialog}
        setShowDialog={setShowWatermarkDialog}
        watermarkConfig={watermarkConfig}
        setWatermarkConfig={setWatermarkConfig}
        onWatermarkChange={onWatermarkChange}
      />
    </>
  )
}

export default Toolbar