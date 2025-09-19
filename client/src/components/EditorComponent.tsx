"use client"
import React, { useState, useEffect } from 'react'
import { Editor, EditorContent, useEditor, useEditorState } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { PaginationPlus } from 'tiptap-pagination-plus'
import Text from '@tiptap/extension-text'
import TextStyle from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import TextAlign from '@tiptap/extension-text-align'
import Subscript from '@tiptap/extension-subscript'
import Superscript from '@tiptap/extension-superscript'
import FontFamily from '@tiptap/extension-font-family'
import { FontSize } from '@tiptap/extension-text-style'
import { CharacterCount } from '@tiptap/extensions'
import Toolbar from './Toolbar'
import Ruler from './Ruler'
import BottomToolbar from './bottom-toolbar'

interface WatermarkConfig {
  text: string;
  type: 'text' | 'image';
  imageUrl: string;
  opacity: number;
  position: 'center' | 'diagonal' | 'repeat';
  size: 'small' | 'medium' | 'large';
}

const EditorComponent = () => {
    const [currentPageSize, setCurrentPageSize] = useState({ name: 'A4', width: 816, height: 1056 })
    const [leftMargin, setLeftMargin] = useState(56)
    const [rightMargin, setRightMargin] = useState(56)
    const [headerFooterConfig, setHeaderFooterConfig] = useState({
        headerLeft: "",
        headerRight: "", 
        footerLeft: "",
        footerRight: "{page}"
    })
    const [editorContent, setEditorContent] = useState('<p>Start here</p>')

    const [customPageSizes, setCustomPageSizes] = useState<Array<{ name: string, width: number, height: number }>>([])

    const [watermarkConfig, setWatermarkConfig] = useState<WatermarkConfig | null>(null)

    const editor = useEditor({
         editorProps:{
        attributes: {
            style: `padding-left:${leftMargin}px; padding-right:${rightMargin}px;`,
            class: 'focus:outline-none print:border-0 border border-[#c7c7c7] bg-white cursor-text h-full prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none'
        }
    },
        extensions: [
            StarterKit,
            Text,
            TextStyle,
            Underline,
            FontSize,
            CharacterCount.configure({
               limit:400000,
               textCounter: (text) => [...new Intl.Segmenter().segment(text)].length,
               wordCounter: (text) => text.split(/\s+/).filter((word) => word !== '').length,
          }),
            FontFamily.configure({
                types: ['textStyle'],
            }),
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            Subscript,
            Superscript,
            PaginationPlus.configure({
              pageHeight: currentPageSize.height,        
              pageGap: 20,            
              pageGapBorderSize: 1,   
              pageBreakBackground: "#f9fbfd",  
              pageHeaderHeight: 50,   
              pageFooterHeight: 50,   
              footerRight: headerFooterConfig.footerRight,  
              footerLeft: headerFooterConfig.footerLeft,         
              headerRight: headerFooterConfig.headerRight,        
              headerLeft: headerFooterConfig.headerLeft,         
              marginTop: 50,           
              marginBottom: 50,        
              marginLeft: leftMargin,         
              marginRight: rightMargin,        
              contentMarginTop: 0,    
              contentMarginBottom: 0, 
            })
        ],
        content: editorContent,
        immediatelyRender: false,
        onUpdate: ({ editor }) => {
            setEditorContent(editor.getHTML())
        }
    }, [headerFooterConfig, currentPageSize, leftMargin, rightMargin])

    const { charactersCount = 0, wordsCount = 0 } = useEditorState({
    editor,
    selector: context => ({
      charactersCount: context.editor?.storage.characterCount.characters() || 0,
      wordsCount: context.editor?.storage.characterCount.words() || 0,
    }),
  }) || { charactersCount: 0, wordsCount: 0 }

  

    const handleHeaderFooterChange = (type: 'headerLeft' | 'headerRight' | 'footerLeft' | 'footerRight', value: string) => {
        const newConfig = { ...headerFooterConfig, [type]: value }
        setHeaderFooterConfig(newConfig)
    }

    const handleLeftMarginChange = (newLeftMargin: number) => {
        setLeftMargin(newLeftMargin)
    }

    const handleRightMarginChange = (newRightMargin: number) => {
        setRightMargin(newRightMargin)
    }

    const handleWatermarkChange = (config: WatermarkConfig) => {
        if (!config.text.trim() && !config.imageUrl.trim()) {
            setWatermarkConfig(null)
        } else {
            setWatermarkConfig(config)
        }
    }

     const handlePageSizeChange = (newSize: { name: string, width: number, height: number }) => {
        setCurrentPageSize(newSize)
    }

      const handleAddCustomPageSize = (customSize: { name: string, width: number, height: number }) => {
        const newCustomPageSizes = [...customPageSizes, customSize]
        setCustomPageSizes(newCustomPageSizes)
        setCurrentPageSize(customSize)
    }

    

    const getWatermarkStyles = () => {
        if (!watermarkConfig) return {}

        const sizeMap = {
            small: watermarkConfig.type === 'text' ? '32px' : '40px',
            medium: watermarkConfig.type === 'text' ? '48px' : '50px',
            large: watermarkConfig.type === 'text' ? '72px' : '120px'
        }

        const baseStyles = {
            opacity: watermarkConfig.opacity,
            pointerEvents: 'none' as const,
            zIndex: 1,
            color: '#666666',
            fontSize: watermarkConfig.type === 'text' ? sizeMap[watermarkConfig.size] : undefined,
            fontWeight: '700',
            userSelect: 'none' as const,
            letterSpacing: '2px',
            textTransform: 'uppercase' as const,
        }

        const positionStyles = {
            center: {
                position: 'absolute' as const,
                top: '100%',
                left: '70%',
                right: '0%',
                bottom: '0%',
                transform: 'translate(-50%, -50%)',
                overflow: 'hidden' as const,
            },
            diagonal: {
                position: 'absolute' as const,
                top: '60%',
                left: '110%',
                transform: 'translate(-50%, -50%) rotate(-45deg)',
            },
            repeat: {
                position: 'absolute' as const,
                top: '0',
                left: '0',
                right: '0',
                bottom: '0',
                overflow: 'hidden' as const,
            }
        }

        return {
            ...baseStyles,
            ...positionStyles[watermarkConfig.position],
            width: watermarkConfig.type === 'image' && watermarkConfig.position !== 'repeat' 
                ? sizeMap[watermarkConfig.size] 
                : '100%',
            height: watermarkConfig.type === 'image' && watermarkConfig.position !== 'repeat' 
                ? sizeMap[watermarkConfig.size] 
                : '100%',
        }
    }
    
    const renderWatermarkContent = () => {
        if (!watermarkConfig) return null

        if (watermarkConfig.type === 'text') {
            if (watermarkConfig.position === 'repeat') {
                return (
                    <div className="w-full h-full relative overflow-hidden">
                        <div 
                            className="absolute inset-0"
                            style={{
                                backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='150' xmlns='http://www.w3.org/2000/svg'%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dominant-baseline='middle' font-family='Arial' font-size='24' font-weight='bold' fill='%23666666' transform='rotate(-45 100 75)'%3E${encodeURIComponent(watermarkConfig.text)}%3C/text%3E%3C/svg%3E")`,
                                backgroundRepeat: 'repeat',
                                backgroundSize: '200px 150px',
                                opacity: watermarkConfig.opacity,
                            }}
                        />
                    </div>
                )
            } else {
                return (
                    <div style={{ 
                        fontSize: getWatermarkStyles().fontSize,
                        fontWeight: getWatermarkStyles().fontWeight,
                        letterSpacing: getWatermarkStyles().letterSpacing,
                        textTransform: getWatermarkStyles().textTransform,
                        whiteSpace: 'nowrap'
                    }}>
                        {watermarkConfig.text}
                    </div>
                )
            }
        } else if (watermarkConfig.type === 'image') {
            if (watermarkConfig.position === 'repeat') {
                return (
                    <div 
                        className="w-full h-full"
                        style={{
                            backgroundImage: `url(${watermarkConfig.imageUrl})`,
                            backgroundRepeat: 'repeat',
                            backgroundSize: '150px 150px',
                            opacity: watermarkConfig.opacity,
                        }}
                    />
                )
            } else {
                return (
                    <img 
                        src={watermarkConfig.imageUrl} 
                        alt="Watermark"
                        style={{ 
                            width: '100%', 
                            height: '100%', 
                            objectFit: 'contain',
                            opacity: watermarkConfig.opacity,
                        }}
                    />
                )
            }
        }
        return null
    }

    const renderPageWatermarks = () => {
        if (!watermarkConfig) return null

        const pages = document.querySelectorAll('[data-pagination-page]')
        const pageCount = Math.max(pages.length, 1) 

        return Array.from({ length: pageCount + 1 }, (_, index) => (
            <div
                key={`watermark-${index}`}
                className="watermark-layer"
                style={{
                    position: 'absolute',
                    top: `${index * (currentPageSize.height + 20)}px`, // 20px-page gap
                    left: '0',
                    width: `${currentPageSize.width}px`,
                    height: `${currentPageSize.height}px`,
                    ...getWatermarkStyles(),
                    zIndex: 1,
                }}
            >
                {renderWatermarkContent()}
            </div>
        ))
    }

    useEffect(() => {
        if (editor) {
            const wrapper = document.querySelector('.min-w-max') as HTMLElement
            if (wrapper) {
                wrapper.style.width = `${currentPageSize.width}px`
            }
        }
    }, [currentPageSize, editor])

  
    // useEffect(() => {
    //     const timeout = setTimeout(() => {
    //         if (watermarkConfig) {
    //             setWatermarkConfig({ ...watermarkConfig })
    //         }
    //     }, 100)
    //     return () => clearTimeout(timeout)
    // }, [editorContent])

  return (
    <>
      <Toolbar 
        editor={editor} 
        onPaperSizeChange={handlePageSizeChange}
        onHeaderFooterChange={handleHeaderFooterChange}
        onWatermarkChange={handleWatermarkChange}
        customPageSizes={customPageSizes}
        onAddCustomPageSize={handleAddCustomPageSize}
      />
      <div className='size-full overflow-x-auto bg-[#f9fbfd] px-4 print:p-0 print:bg-white print:overflow-visible'>
        <Ruler 
          leftMargin={leftMargin}
          rightMargin={rightMargin}
          onLeftMarginChange={handleLeftMarginChange}
          onRightMarginChange={handleRightMarginChange}
        />
        <div 
          className="min-w-max flex justify-center py-4 print:py-0 mx-auto print:w-full print:min-w-0"
          style={{ width: `${currentPageSize.width}px` }}
        >
          <div 
            className="relative"
            style={{ 
              width: `${currentPageSize.width}px`, 
              minHeight: `${currentPageSize.height}px`,
            }}
          >
            {watermarkConfig && renderPageWatermarks()}
            
            {/* Editor Content */}
            <div style={{ position: 'relative', zIndex: 2, backgroundColor: 'transparent' }}>
              <EditorContent editor={editor} />
            </div>
          </div>
        </div>
      </div>

       <BottomToolbar characterCount={charactersCount} wordCount={wordsCount}  />

      {/* Styles for better watermark rendering */}
      <style jsx global>{`
        .watermark-layer {
          pointer-events: none !important;
          user-select: none !important;
        }
        
        .ProseMirror {
          background: transparent !important;
        }
        
        [data-pagination-page] {
          position: relative;
          background: white;
        }
      `}</style>
    </>
  )
}

export default EditorComponent