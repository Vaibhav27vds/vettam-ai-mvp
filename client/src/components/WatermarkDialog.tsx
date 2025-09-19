import React from 'react'

interface WatermarkConfig {
  text: string;
  type: 'text' | 'image';
  imageUrl: string;
  opacity: number;
  position: 'center' | 'diagonal' | 'repeat';
  size: 'small' | 'medium' | 'large';
}

interface WatermarkDialogProps {
  showDialog: boolean
  setShowDialog: React.Dispatch<React.SetStateAction<boolean>>
  watermarkConfig: WatermarkConfig
  setWatermarkConfig: React.Dispatch<React.SetStateAction<WatermarkConfig>>
  onWatermarkChange?: (config: WatermarkConfig) => void
}

const WatermarkDialog = ({ 
  showDialog, 
  setShowDialog, 
  watermarkConfig, 
  setWatermarkConfig, 
  onWatermarkChange 
}: WatermarkDialogProps) => {
  if (!showDialog) return null

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setWatermarkConfig(prev => ({
          ...prev,
          imageUrl: e.target?.result as string,
          type: 'image'
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const applyWatermark = () => {
    if (onWatermarkChange) {
      onWatermarkChange(watermarkConfig)
    }
    setShowDialog(false)
  }

  const removeWatermark = () => {
    if (onWatermarkChange) {
      onWatermarkChange({
        text: '',
        type: 'text',
        imageUrl: '',
        opacity: 0.3,
        position: 'center',
        size: 'medium'
      })
    }
    setWatermarkConfig({
      text: '',
      type: 'text',
      imageUrl: '',
      opacity: 0.3,
      position: 'center',
      size: 'medium'
    })
    setShowDialog(false)
  }

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4 max-h-[80vh] overflow-y-auto">
          <h3 className="text-lg font-semibold mb-4">Add Watermark</h3>
          
          {/* Watermark Type */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Type</label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="watermarkType"
                  checked={watermarkConfig.type === 'text'}
                  onChange={() => setWatermarkConfig(prev => ({ ...prev, type: 'text' }))}
                  className="mr-2"
                />
                Text
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="watermarkType"
                  checked={watermarkConfig.type === 'image'}
                  onChange={() => setWatermarkConfig(prev => ({ ...prev, type: 'image' }))}
                  className="mr-2"
                />
                Image
              </label>
            </div>
          </div>

          {/* Text Input */}
          {watermarkConfig.type === 'text' && (
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Text</label>
              <input
                type="text"
                value={watermarkConfig.text}
                onChange={(e) => setWatermarkConfig(prev => ({ ...prev, text: e.target.value }))}
                placeholder="Enter watermark text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#694C80]"
              />
            </div>
          )}

          {/* Image Upload */}
          {watermarkConfig.type === 'image' && (
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#694C80] file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:bg-[#694C80] file:text-white hover:file:bg-[#5a3f6b]"
              />
              {watermarkConfig.imageUrl && (
                <div className="mt-3 p-2 border border-gray-200 rounded-md bg-gray-50">
                  <img 
                    src={watermarkConfig.imageUrl} 
                    alt="Watermark preview" 
                    className="h-20 w-20 object-contain mx-auto"
                  />
                  <p className="text-xs text-gray-600 text-center mt-2">Preview</p>
                </div>
              )}
            </div>
          )}

          {/* Opacity */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Opacity: {Math.round(watermarkConfig.opacity * 100)}%
            </label>
            <input
              type="range"
              min="0.05"
              max="0.95"
              step="0.05"
              value={watermarkConfig.opacity}
              onChange={(e) => setWatermarkConfig(prev => ({ ...prev, opacity: parseFloat(e.target.value) }))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              style={{
                background: `linear-gradient(to right, #694C80 0%, #694C80 ${watermarkConfig.opacity * 100}%, #e5e7eb ${watermarkConfig.opacity * 100}%, #e5e7eb 100%)`
              }}
            />
          </div>

          {/* Position */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Position</label>
            <select
              value={watermarkConfig.position}
              onChange={(e) => setWatermarkConfig(prev => ({ ...prev, position: e.target.value as any }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#694C80]"
            >
              <option value="center">Center</option>
              <option value="diagonal">Diagonal</option>
              <option value="repeat">Repeat</option>
            </select>
          </div>

          {/* Size */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Size</label>
            <select
              value={watermarkConfig.size}
              onChange={(e) => setWatermarkConfig(prev => ({ ...prev, size: e.target.value as any }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#694C80]"
            >
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </div>

          <div className="flex justify-between space-x-3">
            <button
              onClick={removeWatermark}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
            >
              Remove Watermark
            </button>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowDialog(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={applyWatermark}
                disabled={watermarkConfig.type === 'text' ? !watermarkConfig.text.trim() : !watermarkConfig.imageUrl}
                className="px-4 py-2 bg-[#694C80] text-white rounded-md hover:bg-[#5a3f6b] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Apply Watermark
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #694C80;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        
        .slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #694C80;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
      `}</style>
    </>
  )
}

export default WatermarkDialog