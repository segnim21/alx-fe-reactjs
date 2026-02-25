import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function HomePage() {
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        // Dynamic import of JSON file (works with Vite)
        const data = await import('../data.json')
        // Handle both default and named exports
        setRecipes(data.default || data)
        setLoading(false)
      } catch (err) {
        console.error('Failed to load recipes:', err)
        setError('Could not load recipes. Please try again later.')
        setLoading(false)
      }
    }

    fetchRecipes()
  }, []) // Empty dependency array = run once when component mounts

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
          <p className="mt-4 text-gray-600">Loading delicious recipes...</p>
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="text-center">
          <p className="text-red-500 text-xl mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  // Main render
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <header className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Recipe Sharing Platform 🍳
          </h1>
          <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto">
            Discover and share amazing recipes from our community
          </p>
        </header>

        {/* Responsive Grid - includes ALL breakpoints */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {recipes.map((recipe) => (
            // Recipe Card
            <div
              key={recipe.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Image */}
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-48 object-cover"
                loading="lazy" // Improves performance
              />

              {/* Content */}
              <div className="p-5">
                <h2 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-1">
                  {recipe.title}
                </h2>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {recipe.summary}
                </p>

                {/* Link to detail page */}
                <Link
                  to={`/recipe/${recipe.id}`}
                  className="inline-block w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 text-center"
                >
                  View Recipe →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Optional: Message if no recipes */}
        {recipes.length === 0 && !loading && (
          <p className="text-center text-gray-500 mt-8">No recipes found.</p>
        )}
      </div>
    </div>
  )
}

export default HomePage