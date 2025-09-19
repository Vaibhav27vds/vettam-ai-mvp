"use client"
import React, { useState } from 'react'

interface CustomPageSizeDialogProps {
  showDialog: boolean
  setShowDialog: (show: boolean) => void
  onAddCustomPageSize: (customSize: { name: string, width: number, height: number }) => void
}

const CustomPageSizeDialog: React.FC<CustomPageSizeDialogProps> = ({
  showDialog,
  setShowDialog,
  onAddCustomPageSize
}) => {
  const [customSize, setCustomSize] = useState({
    name: '',
    width: '',
    height: ''
  })

  const handleInputChange = (field: string, value: string) => {
    setCustomSize(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!customSize.name.trim() || !customSize.width || !customSize.height) {
      alert('Please fill in all fields')
      return
    }

    const width = parseInt(customSize.width)
    const height = parseInt(customSize.height)

    if (width < 100 || width > 5000 || height < 100 || height > 5000) {
      alert('Width and height must be between 100 and 5000 pixels')
      return
    }

    const newCustomSize = {
      name: customSize.name.trim(),
      width,
      height
    }

    onAddCustomPageSize(newCustomSize)
    setCustomSize({ name: '', width: '', height: '' })
    setShowDialog(false)
  }

  const handleCancel = () => {
    setShowDialog(false)
    setCustomSize({ name: '', width: '', height: '' })
  }

  if (!showDialog) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
        <h3 className="text-lg font-semibold mb-4">Add Custom Page Size</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="custom-name" className="block text-sm font-medium text-gray-700 mb-1">
              Page Name
            </label>
            <input
              type="text"
              id="custom-name"
              value={customSize.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="e.g., My Custom Size"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#694C80] focus:border-transparent"
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="custom-width" className="block text-sm font-medium text-gray-700 mb-1">
                Width (px)
              </label>
              <input
                type="number"
                id="custom-width"
                value={customSize.width}
                onChange={(e) => handleInputChange('width', e.target.value)}
                placeholder="816"
                min="100"
                max="5000"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#694C80] focus:border-transparent"
                required
              />
            </div>
            
            <div>
              <label htmlFor="custom-height" className="block text-sm font-medium text-gray-700 mb-1">
                Height (px)
              </label>
              <input
                type="number"
                id="custom-height"
                value={customSize.height}
                onChange={(e) => handleInputChange('height', e.target.value)}
                placeholder="1056"
                min="100"
                max="5000"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#694C80] focus:border-transparent"
                required
              />
            </div>
          </div>
          
          <div className="text-xs text-gray-500 mb-4">
            Dimensions must be between 100 and 5000 pixels
          </div>
          
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-[#694C80] rounded-md hover:bg-[#5a3f6b] transition-colors"
            >
              Add & Apply
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CustomPageSizeDialog