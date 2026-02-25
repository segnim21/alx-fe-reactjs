import { useState } from 'react'

function AddRecipeForm() {
  // State for each field
  const [title, setTitle] = useState('')
  const [ingredients, setIngredients] = useState('')
  const [steps, setSteps] = useState('')

  // State for validation errors
  const [errors, setErrors] = useState({})

  // State for submission success message
  const [successMessage, setSuccessMessage] = useState('')

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault() // Prevents page reload

    // Validate fields
    const newErrors = {}

    if (!title.trim()) {
      newErrors.title = 'Title is required'
    }

    if (!ingredients.trim()) {
      newErrors.ingredients = 'Ingredients are required'
    } else {
      // Check if there are at least two ingredients
      const ingredientsList = ingredients.split('\n').filter(item => item.trim() !== '')
      if (ingredientsList.length < 2) {
        newErrors.ingredients = 'Please enter at least two ingredients (one per line)'
      }
    }

    if (!steps.trim()) {
      newErrors.steps = 'Preparation steps are required'
    } else {
      const stepsList = steps.split('\n').filter(step => step.trim() !== '')
      if (stepsList.length < 1) {
        newErrors.steps = 'Please enter at least one step'
      }
    }

    // If there are errors, update state and stop submission
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      setSuccessMessage('')
      return
    }

    // If validation passes, process the data
    // For now, we'll just show a success message and log the data
    setSuccessMessage('Recipe added successfully! (Demo mode)')
    console.log('New recipe:', {
      title,
      ingredients: ingredients.split('\n').filter(i => i.trim()),
      steps: steps.split('\n').filter(s => s.trim())
    })

    // Optionally, clear the form
    setTitle('')
    setIngredients('')
    setSteps('')
    setErrors({})
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Add a New Recipe
        </h1>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
          {/* Title Field */}
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
              Recipe Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.title ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="e.g., Spaghetti Carbonara"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title}</p>
            )}
          </div>

          {/* Ingredients Field */}
          <div className="mb-4">
            <label htmlFor="ingredients" className="block text-gray-700 font-medium mb-2">
              Ingredients (one per line)
            </label>
            <textarea
              id="ingredients"
              rows="5"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.ingredients ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="200g spaghetti&#10;2 eggs&#10;100g bacon"
            />
            {errors.ingredients && (
              <p className="text-red-500 text-sm mt-1">{errors.ingredients}</p>
            )}
          </div>

          {/* Preparation Steps Field */}
          <div className="mb-6">
            <label htmlFor="steps" className="block text-gray-700 font-medium mb-2">
              Preparation Steps (one per line)
            </label>
            <textarea
              id="steps"
              rows="5"
              value={steps}
              onChange={(e) => setSteps(e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.steps ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Boil water&#10;Cook pasta&#10;Fry bacon"
            />
            {errors.steps && (
              <p className="text-red-500 text-sm mt-1">{errors.steps}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Add Recipe
          </button>

          {/* Success Message */}
          {successMessage && (
            <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-lg text-center">
              {successMessage}
            </div>
          )}
        </form>
      </div>
    </div>
  )
}

export default AddRecipeForm