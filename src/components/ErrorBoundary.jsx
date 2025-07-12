import React from 'react'
import { FaExclamationTriangle, FaHome, FaRedo } from 'react-icons/fa'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
          <div className="text-center max-w-md mx-auto p-8">
            <div className="w-20 h-20 bg-gradient-to-r from-red-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaExclamationTriangle className="text-red-500 text-3xl" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Что-то пошло не так</h2>
            <p className="text-gray-600 mb-8">Произошла ошибка при загрузке приложения. Попробуйте перезагрузить страницу.</p>
            
            <div className="space-y-4">
              <button
                onClick={() => window.location.reload()}
                className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-primary-600 to-purple-600 hover:from-primary-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                <FaRedo />
                <span>Перезагрузить страницу</span>
              </button>
              
              <button
                onClick={() => window.location.href = '/'}
                className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-gray-100 to-blue-100 hover:from-gray-200 hover:to-blue-200 text-gray-700 px-6 py-3 rounded-lg font-medium transition-all duration-200 border border-gray-300"
              >
                <FaHome />
                <span>На главную страницу</span>
              </button>
            </div>
            
            {/* Error details for development */}
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-8 text-left">
                <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700">
                  Детали ошибки (только для разработки)
                </summary>
                <pre className="mt-2 text-xs bg-gray-100 p-4 rounded-lg overflow-auto text-red-600">
                  {this.state.error.toString()}
                </pre>
              </details>
            )}
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary