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
    const [headerFooterConfig, setHeaderFooterConfig] = useState({
        headerLeft: "",
        headerRight: "", 
        footerLeft: "",
        footerRight: "{page}"
    })
    const [editorContent, setEditorContent] = useState('<p>Start here</p>')

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
    }, [headerFooterConfig, currentPageSize, leftMargin, rightMargin]) // Dependencies that trigger editor recreation

    // Handle header/footer changes
    const handleHeaderFooterChange = (type: 'headerLeft' | 'headerRight' | 'footerLeft' | 'footerRight', value: string) => {
        const newConfig = { ...headerFooterConfig, [type]: value }
        setHeaderFooterConfig(newConfig)
        // Editor will automatically recreate with new config due to dependency array
    }

    // Handle margin changes from ruler
    const handleLeftMarginChange = (newLeftMargin: number) => {
        setLeftMargin(newLeftMargin)
        // Editor will automatically recreate with new margins due to dependency array
    }

    const handleRightMarginChange = (newRightMargin: number) => {
        setRightMargin(newRightMargin)
        // Editor will automatically recreate with new margins due to dependency array
    }

    const handlePageSizeChange = (newSize: { name: string, width: number, height: number }) => {
        setCurrentPageSize(newSize)
        // Editor will automatically recreate with new page size due to dependency array
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
      <Toolbar 
        editor={editor} 
        onPaperSizeChange={handlePageSizeChange}
        onHeaderFooterChange={handleHeaderFooterChange}
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