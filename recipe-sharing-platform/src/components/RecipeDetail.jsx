import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

function RecipeDetail() {
  // Get the id parameter from the URL
  const { id } = useParams()
  
  // State for storing the current recipe
  const [recipe, setRecipe] = useState(null)
  // State for loading status
  const [loading, setLoading] = useState(true)
  // State for error (if recipe not found)
  const [error, setError] = useState(false)

  useEffect(() => {
    // Function to load recipe data
    const fetchRecipe = async () => {
      try {
        // Import the data.json file
        const data = await import('../data.json')
        const recipes = data.default || data
        
        // Find recipe with matching id (convert id to number because URL param is string)
        const foundRecipe = recipes.find(r => r.id === parseInt(id))
        
        if (foundRecipe) {
          setRecipe(foundRecipe)
          setError(false)
        } else {
          setError(true)
        }
        setLoading(false)
      } catch (err) {
        console.error('Error loading recipe:', err)
        setError(true)
        setLoading(false)
      }
    }

    fetchRecipe()
  }, [id]) // Re-run when id changes (e.g., user clicks another recipe)

  // Show loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl text-gray-600">Loading recipe...</div>
      </div>
    )
  }

  // Show error if recipe not found
  if (error || !recipe) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Recipe Not Found</h2>
          <Link to="/" className="text-blue-500 hover:underline">
            Back to Home
          </Link>
        </div>
      </div>
    )
  }

  // Main render - display recipe details
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back button */}
      <Link 
        to="/" 
        className="inline-block mb-6 text-blue-500 hover:text-blue-700 transition-colors"
      >
        ← Back to Recipes
      </Link>

      {/* Recipe detail card */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Hero image */}
        <img 
          src={recipe.image} 
          alt={recipe.title}
          className="w-full h-96 object-cover"
        />
        
        {/* Content */}
        <div className="p-8">
          <h1 className="text-4xl font-bold mb-4 text-gray-800">
            {recipe.title}
          </h1>
          
          <p className="text-xl text-gray-600 mb-8">
            {recipe.summary}
          </p>

          {/* Two-column layout on larger screens */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Ingredients section */}
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-gray-700 border-b-2 pb-2">
                Ingredients
              </h2>
              <ul className="space-y-2">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></span>
                    <span className="text-gray-700">{ingredient}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Instructions section */}
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-gray-700 border-b-2 pb-2">
                Instructions
              </h2>
              <ol className="space-y-4 list-decimal list-inside">
                {recipe.instructions.map((step, index) => (
                  <li key={index} className="text-gray-700">
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RecipeDetail