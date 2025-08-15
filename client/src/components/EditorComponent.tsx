"use client"
import React from 'react'
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
import { Extension } from '@tiptap/core'
import Toolbar from './Toolbar'

// FontSize extension
const FontSize = Extension.create({
  name: 'fontSize',
  
  addOptions() {
    return {
      types: ['textStyle'],
    }
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          fontSize: {
            default: null,
            parseHTML: element => element.style.fontSize.replace(/['"]+/g, ''),
            renderHTML: attributes => {
              if (!attributes.fontSize) {
                return {}
              }
              return {
                style: `font-size: ${attributes.fontSize}`,
              }
            },
          },
        },
      },
    ]
  },

  addCommands() {
    return {
      setFontSize: fontSize => ({ chain }) => {
        return chain()
          .setMark('textStyle', { fontSize })
          .run()
      },
      unsetFontSize: () => ({ chain }) => {
        return chain()
          .setMark('textStyle', { fontSize: null })
          .removeEmptyTextStyle()
          .run()
      },
    }
  },
})

const EditorComponent = () => {
    const editor = useEditor({
         editorProps:{
        attributes: {
            style: 'padding-left:56px; padding-right:56px;',
            class: 'focus:outline-none print:border-0 border border-[#c7c7c7] bg-white cursor-text h-full prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[1056px] w-[816px]'
        }
    },
        extensions: [
            StarterKit,
            Text,
            TextStyle,
            FontSize,
            Underline,
            FontFamily.configure({
                types: ['textStyle'],
            }),
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            Subscript,
            Superscript,
            PaginationPlus.configure({
              pageHeight: 1056,        
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
              marginLeft: 56,         
              marginRight: 56,        
              contentMarginTop: 0,    
              contentMarginBottom: 0, 
            })

        ],
    content: '<p>Start here</p>',
    immediatelyRender: false,
    })

    // Function to change paper size
    const changePaperSize = (size: string) => {
        const paperSizes = {
            'a4': { width: 816, height: 1056 },
            'a3': { width: 1123, height: 1587 },
            'letter': { width: 816, height: 1056 },
            'legal': { width: 816, height: 1344 },
            'tabloid': { width: 1056, height: 1632 },
        }

        const paperSize = paperSizes[size as keyof typeof paperSizes]
        if (paperSize && editor) {
            // Update the editor's page configuration
            const editorElement = document.querySelector('.ProseMirror')
            if (editorElement) {
                (editorElement as HTMLElement).style.width = `${paperSize.width}px`
                (editorElement as HTMLElement).style.minHeight = `${paperSize.height}px`
            }
            
            // Update PaginationPlus configuration if possible
            // Note: You might need to reinitialize the editor with new config for full effect
            console.log('Paper size changed to:', size, paperSize)
        }
    }

  return (
    <>
      <Toolbar editor={editor} onPaperSizeChange={changePaperSize} />
      <div className='size-full overflow-x-auto bg-[#f9fbfd] px-4 print:p-0 print:bg-white print:overflow-visible'>
        <div className="min-w-max flex justify-center py-4 print:py-0 mx-auto print:w-full print:min-w-0">
          <EditorContent editor={editor} />
        </div>
      </div>
    </>
  )
}

export default EditorComponent