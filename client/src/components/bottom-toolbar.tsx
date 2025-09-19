import React from 'react'

const BottomToolbar = ({
    characterCount,
    wordCount,
}: {
    characterCount: number;
    wordCount: number;
}) => {
  return (
    <div className='fixed bottom-0 bg-[#E6DCEF] w-full z-20 flex justify-start gap-8 '>
        <div>Words: {wordCount} words</div>
        <div>Characters: {characterCount} Characters</div>
    </div>
  )
}

export default BottomToolbar