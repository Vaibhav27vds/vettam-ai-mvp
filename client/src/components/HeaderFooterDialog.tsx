import React from 'react'

interface HeaderFooterDialogProps {
  showDialog: {
    show: boolean;
    type: 'headerLeft' | 'headerRight' | 'footerLeft' | 'footerRight' | null;
  }
  setShowDialog: React.Dispatch<React.SetStateAction<{
    show: boolean;
    type: 'headerLeft' | 'headerRight' | 'footerLeft' | 'footerRight' | null;
  }>>
  headerFooterInput: string
  setHeaderFooterInput: React.Dispatch<React.SetStateAction<string>>
  onHeaderFooterChange?: (type: 'headerLeft' | 'headerRight' | 'footerLeft' | 'footerRight', value: string) => void
}

const HeaderFooterDialog = ({ 
  showDialog, 
  setShowDialog, 
  headerFooterInput, 
  setHeaderFooterInput, 
  onHeaderFooterChange 
}: HeaderFooterDialogProps) => {
  if (!showDialog.show) return null

  const getDialogTitle = () => {
    switch (showDialog.type) {
      case 'headerLeft': return 'Add Left Header'
      case 'headerRight': return 'Add Right Header'
      case 'footerLeft': return 'Add Left Footer'
      case 'footerRight': return 'Add Right Footer'
      default: return 'Add Header/Footer'
    }
  }

  const confirmHeaderFooterAdd = () => {
    if (showDialog.type && headerFooterInput.trim() && onHeaderFooterChange) {
      onHeaderFooterChange(showDialog.type, headerFooterInput.trim())
    }
    setShowDialog({ show: false, type: null })
    setHeaderFooterInput('')
  }

  const cancelHeaderFooterAdd = () => {
    setShowDialog({ show: false, type: null })
    setHeaderFooterInput('')
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

export default HeaderFooterDialog