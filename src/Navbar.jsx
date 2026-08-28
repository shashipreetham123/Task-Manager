import { Link } from 'react-router-dom'
import './Navbar.css'
import { useState } from 'react'
import { HamburgerIcon } from './Icons'


function Navbar() {
    const [activeLink, setActiveLink] = useState(null)
    const [navbarToggle, setNavbarToggle] = useState(false)

    function checkActive(e) {
        setActiveLink(e.target.id)
    }

    function toggleNavbar(e) {
        setNavbarToggle(!navbarToggle)
        if (navbarToggle) {
            e.target.closest(".navbar-toggler").classList.remove("active")
        } else {
            e.target.closest(".navbar-toggler").classList.add("active")
        }
    }

    return(
        <nav className="navbar">
            <button className="navbar-toggler" onClick={toggleNavbar}>
                <HamburgerIcon></HamburgerIcon>
            </button>
            <div className="navbar-nav">
                <Link className={`nav-link${activeLink == 'pending' ? ' active' : ""}`} id='pending' onClick={checkActive}  to="/">Pending</Link>
                <Link className={`nav-link${activeLink == 'completed' ? ' active' : ""}`} id='completed' onClick={checkActive} to="/completed">Completed</Link>
                <Link className={`nav-link${activeLink == 'failed' ? ' active' : ""}`} id='failed' onClick={checkActive} to="/failed">Failed</Link>
                <Link className={`nav-link${activeLink == 'newtask' ? ' active' : ""}`} id='newtask' onClick={checkActive} to="/">New Task</Link>
            </div>
        </nav>
    )
}

export default Navbar