"use client"
import React, { useState, useEffect } from 'react'
import { Editor, EditorContent, useEditor } from '@tiptap/react'
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
import Toolbar from './Toolbar'
import Ruler from './Ruler'

const EditorComponent = () => {
    const [currentPageSize, setCurrentPageSize] = useState({ name: 'A4', width: 816, height: 1056 })
    const [leftMargin, setLeftMargin] = useState(56)
    const [rightMargin, setRightMargin] = useState(56)

    const editor = useEditor({
         editorProps:{
        attributes: {
            style: 'padding-left:56px; padding-right:56px;',
            class: 'focus:outline-none print:border-0 border border-[#c7c7c7] bg-white cursor-text h-full prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none'
        }
    },
        extensions: [
            StarterKit,
            Text,
            TextStyle,
            Underline,
            FontSize,
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
              footerRight: "{page}",  
              footerLeft: "",         
              headerRight: "Header Right",        
              headerLeft: "Header Left",         
              marginTop: 50,           
              marginBottom: 50,        
              marginLeft: leftMargin,         
              marginRight: rightMargin,        
              contentMarginTop: 0,    
              contentMarginBottom: 0, 
            })

        ],
    content: '<p>Start here</p>',
    immediatelyRender: false,
    })

    // Update margins in the editor
    const updateMargins = (left: number, right: number) => {
        if (editor) {
            editor.extensionManager.extensions.forEach((extension) => {
                if (extension.name === 'paginationPlus') {
                    extension.options.marginLeft = left
                    extension.options.marginRight = right
                }
            })
            
            // Update editor padding
            const editorContainer = editor.view.dom as HTMLElement
            if (editorContainer) {
                editorContainer.style.paddingLeft = `${left}px`
                editorContainer.style.paddingRight = `${right}px`
            }
            
            // Force editor to recalculate
            editor.view.updateState(editor.state)
        }
    }

    // Handle margin changes from ruler
    const handleLeftMarginChange = (newLeftMargin: number) => {
        setLeftMargin(newLeftMargin)
        updateMargins(newLeftMargin, rightMargin)
    }

    const handleRightMarginChange = (newRightMargin: number) => {
        setRightMargin(newRightMargin)
        updateMargins(leftMargin, newRightMargin)
    }

    const handlePageSizeChange = (newSize: { name: string, width: number, height: number }) => {
        setCurrentPageSize(newSize)
        
        if (editor) {
            // Reconfigure the PaginationPlus extension
            editor.extensionManager.extensions.forEach((extension) => {
                if (extension.name === 'paginationPlus') {
                    extension.options.pageHeight = newSize.height
                }
            })
            
            // Update container styles
            const editorContainer = editor.view.dom.closest('.prose') as HTMLElement
            if (editorContainer) {
                editorContainer.style.width = `${newSize.width}px`
                editorContainer.style.minHeight = `${newSize.height}px`
            }
            
            // Force editor to recalculate
            editor.view.updateState(editor.state)
        }
    }

    // Update the outer container width when page size changes
    useEffect(() => {
        if (editor) {
            const wrapper = document.querySelector('.min-w-max') as HTMLElement
            if (wrapper) {
                wrapper.style.width = `${currentPageSize.width}px`
            }
        }
    }, [currentPageSize, editor])

  return (
    <>
      <Toolbar editor={editor} onPaperSizeChange={handlePageSizeChange} />
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
            style={{ 
              width: `${currentPageSize.width}px`, 
              minHeight: `${currentPageSize.height}px` 
            }}
          >
            <EditorContent editor={editor} />
          </div>
        </div>
      </div>
    </>
  )
}

export default EditorComponent