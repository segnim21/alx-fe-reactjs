// Import necessary components from react-router-dom
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// Import our page components
import HomePage from './components/HomePage'
import RecipeDetail from './components/RecipeDetail'

function App() {
  return (
    // Router wraps everything to enable routing
    <Router>
      {/* Routes container - only one route matches at a time */}
      <Routes>
        {/* Home page route */}
        <Route path="/" element={<HomePage />} />
        {/* Recipe detail route - :id is a dynamic parameter */}
        <Route path="/recipe/:id" element={<RecipeDetail />} />
      </Routes>
    </Router>
  )
}

export default App