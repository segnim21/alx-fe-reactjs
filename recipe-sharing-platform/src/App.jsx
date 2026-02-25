import HomePage from "./components/HomePage"

function App() {
  return (
    
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">
          Recipe Sharing Platform 🍳
        </h1>
        {/*the homepage component will be renderd here*/}
        <HomePage />
        <div className="space-y-4">
          <div className="border-b pb-4">
            <h2 className="text-xl font-semibold mb-2">Welcome!</h2>
            <p className="text-gray-600">
              Your Tailwind CSS setup is working correctly!
            </p>
          </div>
          
          <button className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors">
            Get Started
          </button>
        </div>
      </div>
    </div>
  )
}

export default App