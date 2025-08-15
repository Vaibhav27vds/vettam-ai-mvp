"use client"
import React from 'react'
import { Editor, EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { PaginationPlus } from 'tiptap-pagination-plus'
import Text from '@tiptap/extension-text'
import TextStyle from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";

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
            Underline,
            PaginationPlus.configure({
              pageHeight: 1056,        // Height of each page in pixels
              pageGap: 20,            // Gap between pages in pixels
              pageGapBorderSize: 1,   // Border size for page gaps
              pageBreakBackground: "#f9fbfd",  // Background color for page gaps
              pageHeaderHeight: 50,   // Height of page header in pixels
              pageFooterHeight: 50,   // Height of page footer in pixels
              footerRight: "{page}",  // Custom text to display in the footer right side
              footerLeft: "",         // Custom text to display in the footer left side
              headerRight: "Header Right",        // Custom text to display in the header right side
              headerLeft: "Header Left",         // Custom text to display in the header left side
              marginTop: 50,           // Top margin for pages
              marginBottom: 50,        // Bottom margin for pages
              marginLeft: 56,         // Left margin for pages
              marginRight: 56,        // Right margin for pages
              contentMarginTop: 0,    // Top margin for content within pages
              contentMarginBottom: 0, // Bottom margin for content within pages
            })

        ],
    content: '<p>Start here</p>',
    immediatelyRender: false,
    })
  return (
    <>
     <div className='size-full overflow-x-auto bg-[#f9fbfd] px-4 print:p-0 print:bg-white print:overflow-visible'>
        <div className="min-w-max flex justify-center py-4 print:py-0 mx-auto print:w-full print:min-w-0"
        //   style={{ width: `${currentPageSize.width}px` }}
        >
          <EditorContent editor={editor} />
        </div>
      </div>
    </>
  )
}

export default EditorComponent