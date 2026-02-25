// First, we import what we need
import { useState, useEffect } from 'react'

// This is our HomePage component
function HomePage() {
  // Step 1: Create state to store our recipes
  // Initially empty array [], will be filled with our JSON data
  const [recipes, setRecipes] = useState([])
  
  // Step 2: Create state for loading status
  // This helps show a loading message while data is being fetched
  const [loading, setLoading] = useState(true)

  // Step 3: useEffect to load data when component mounts
  useEffect(() => {
    // Function to fetch our recipe data
    const fetchRecipes = async () => {
      try {
        // Import the JSON file directly (Vite makes this easy)
        const data = await import('../data.json')
        // Set the recipes state with our data
        setRecipes(data.default || data)
        // Set loading to false since we're done
        setLoading(false)
      } catch (error) {
        console.error('Error loading recipes:', error)
        setLoading(false)
      }
    }

    // Call the function
    fetchRecipes()
  }, []) // Empty array means run once when component loads

  // Step 4: Show loading message while waiting for data
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl text-gray-600">Loading delicious recipes...</div>
      </div>
    )
  }

  // Step 5: Main render - show our recipes in a grid
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page title */}
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
        Our Recipes 🍳
      </h1>
      
      {/* Responsive grid layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Loop through each recipe and create a card */}
        {recipes.map((recipe) => (
          // Each recipe card - key is important for React to track items
          <div 
            key={recipe.id} 
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            {/* Recipe image */}
            <img 
              src={recipe.image} 
              alt={recipe.title}
              className="w-full h-48 object-cover"
            />
            
            {/* Card content */}
            <div className="p-6">
              {/* Recipe title */}
              <h2 className="text-xl font-semibold mb-2 text-gray-800">
                {recipe.title}
              </h2>
              
              {/* Recipe summary */}
              <p className="text-gray-600 mb-4">
                {recipe.summary}
              </p>
              
              {/* View details button */}
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
                View Recipe →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Export so we can use it in other files
export default HomePage