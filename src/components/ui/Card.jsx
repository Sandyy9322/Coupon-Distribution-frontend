function Card({ children, className = "" }) {
    return <div className={`bg-white rounded-lg shadow-md overflow-hidden ${className}`}>{children}</div>
  }
  
  function CardHeader({ children, className = "" }) {
    return <div className={`p-6 border-b ${className}`}>{children}</div>
  }
  
  function CardTitle({ children, className = "" }) {
    return <h3 className={`text-xl font-semibold ${className}`}>{children}</h3>
  }
  
  function CardDescription({ children, className = "" }) {
    return <p className={`text-sm text-gray-500 mt-1 ${className}`}>{children}</p>
  }
  
  function CardContent({ children, className = "" }) {
    return <div className={`p-6 ${className}`}>{children}</div>
  }
  
  function CardFooter({ children, className = "" }) {
    return <div className={`p-6 border-t bg-gray-50 flex justify-end gap-2 ${className}`}>{children}</div>
  }
  
  // Export all components
  Card.Header = CardHeader
  Card.Title = CardTitle
  Card.Description = CardDescription
  Card.Content = CardContent
  Card.Footer = CardFooter
  
  export { Card }
  
  