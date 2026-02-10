import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav>
      <Link to="/">Home</Link> |{" "}
      <Link to="/about">About</Link> |{" "}
      <Link to="/contat">Contact</Link>
      <Link to="/contact">contat</Link>
    </nav>
  )
}

export default Navbar
