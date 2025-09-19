import React from 'react'

interface SelectProps {
  value: string
  onChange: (value: string) => void
  options: { value: string; label: string }[]
  placeholder: string
}

const Select = ({ value, onChange, options, placeholder }: SelectProps) => (
  <select
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className="px-3 py-1 border border-gray-300 rounded-none bg-white text-sm focus:outline-none focus:bg-[#E6DCEF] focus:text-[#694C80]"
  >
    <option value="">{placeholder}</option>
    {options.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
)

export default Select