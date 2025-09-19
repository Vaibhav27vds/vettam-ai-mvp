import React from 'react'
import { Heading, FileText, Ruler, Droplets } from 'lucide-react'
import Select from './ui/Select'
import ToolbarButton from './ui/ToolbarButton'
import { Separator } from './ui/separator'

interface PageToolsProps {
  onPaperSizeChange?: (size: { name: string, width: number, height: number }) => void
  onHeaderFooterAdd: (type: 'headerLeft' | 'headerRight' | 'footerLeft' | 'footerRight') => void
  onWatermarkClick: () => void
  customPageSizes?: Array<{ name: string, width: number, height: number }>
  onShowCustomSizeDialog?: () => void
}

const PageTools = ({ onPaperSizeChange, onHeaderFooterAdd, onWatermarkClick, onShowCustomSizeDialog, customPageSizes=[] }: PageToolsProps) => {
  const paperSizes = [
    { value: 'a4', label: 'A4', width: 816, height: 1056 },
    { value: 'a3', label: 'A3', width: 1123, height: 1587 },
    { value: 'letter', label: 'Letter', width: 816, height: 1056 },
    { value: 'legal', label: 'Legal', width: 816, height: 1344 },
    { value: 'tabloid', label: 'Tabloid', width: 1056, height: 1632 },
  ]

   const customSizeOptions = customPageSizes.map(size => ({
    label: `${size.name} (${size.width} × ${size.height})`,
    value: size.name,
    width: size.width,
    height: size.height
  }))

   const allPaperSizes = [
    ...paperSizes,
    ...customSizeOptions,
    { label: '+ Add Custom Size', value: 'custom', width: 0, height: 0 }
  ]



  return (
    <div className="flex items-center space-x-1 flex-wrap">
      {/* Paper Size */}
      <Select
        value=""
        onChange={(sizeValue) => {
          if (sizeValue === 'custom' && onShowCustomSizeDialog) {
            onShowCustomSizeDialog()
          } else if (sizeValue && onPaperSizeChange) {
            const selectedSize = allPaperSizes.find(size => size.value === sizeValue)
            if (selectedSize && selectedSize.value !== 'custom') {
              onPaperSizeChange({
                name: selectedSize.label.split(' (')[0], // Remove dimensions from display name
                width: selectedSize.width,
                height: selectedSize.height
              })
            }
          }
        }}
        options={allPaperSizes}
        placeholder="Paper Size"
      />
      <Separator orientation="vertical" className="h-8 mx-1" />

      {/* Headers & Footers */}
      <ToolbarButton
        onClick={() => onHeaderFooterAdd('headerLeft')}
        title="Add Left Header"
      >
        <div className="flex items-center space-x-1">
          <Heading size={16} />
          <span className="text-xs">H-L</span>
        </div>
      </ToolbarButton>
      
      <ToolbarButton
        onClick={() => onHeaderFooterAdd('headerRight')}
        title="Add Right Header"
      >
        <div className="flex items-center space-x-1">
          <Heading size={16} />
          <span className="text-xs">H-R</span>
        </div>
      </ToolbarButton>
      
      <ToolbarButton
        onClick={() => onHeaderFooterAdd('footerLeft')}
        title="Add Left Footer"
      >
        <div className="flex items-center space-x-1">
          <FileText size={16} />
          <span className="text-xs">F-L</span>
        </div>
      </ToolbarButton>
      
      <ToolbarButton
        onClick={() => onHeaderFooterAdd('footerRight')}
        title="Add Right Footer"
      >
        <div className="flex items-center space-x-1">
          <FileText size={16} />
          <span className="text-xs">F-R</span>
        </div>
      </ToolbarButton>
      
      <Separator orientation="vertical" className="h-8 mx-1" />

      {/* Margins */}
      <ToolbarButton
        onClick={() => {
          console.log('Adjust margins')
        }}
        title="Adjust Margins"
      >
        <Ruler size={16} />
      </ToolbarButton>
      
      <Separator orientation="vertical" className="h-8 mx-1" />

      {/* Watermark */}
      <ToolbarButton
        onClick={onWatermarkClick}
        title="Add Watermark"
      >
        <Droplets size={16} />
      </ToolbarButton>
    </div>
  )
}

export default PageTools