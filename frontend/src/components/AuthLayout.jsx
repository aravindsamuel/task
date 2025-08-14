import React from 'react'

const AuthLayout = ({ title, children }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-purple-100 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-6 sm:p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">{title}</h2>
        {children}
      </div>
    </div>
  )
}

export default AuthLayout