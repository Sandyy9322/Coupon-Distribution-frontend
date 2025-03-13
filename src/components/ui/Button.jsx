"use client"

function Button({ children, className = "", variant = "primary", disabled = false, onClick, ...props }) {
  const baseClasses =
    "px-4 py-2 rounded font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors"

  const variantClasses = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 disabled:bg-blue-300",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-blue-500 disabled:text-gray-400",
    ghost: "text-gray-600 hover:bg-gray-100 focus:ring-gray-500 disabled:text-gray-400",
  }

  const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${className}`

  return (
    <button className={buttonClasses} disabled={disabled} onClick={onClick} {...props}>
      {children}
    </button>
  )
}

export { Button }

