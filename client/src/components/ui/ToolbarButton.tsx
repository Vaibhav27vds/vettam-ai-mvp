import React from 'react'

interface ToolbarButtonProps {
  onClick: () => void
  isActive?: boolean
  children: React.ReactNode
  title?: string
}

const ToolbarButton = ({ onClick, isActive = false, children, title }: ToolbarButtonProps) => (
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

export default ToolbarButton