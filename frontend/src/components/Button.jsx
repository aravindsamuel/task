import React from 'react'

const Button = ({ children, type="submit" }) => {
  return (
    <button
      type={type}
      className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-md transition duration-200"
    >
      {children}
    </button>
  )
}

export default Button