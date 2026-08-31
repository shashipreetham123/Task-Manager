import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { useContext, useState } from "react";
import { HamburgerIcon } from "./Icons";
import { AppContext } from "./AppContext";

function Navbar() {
    const [navbarToggle, setNavbarToggle] = useState(false);

    const {setCreateTask} = useContext(AppContext)

    return (
        <nav className="navbar">
            <button className={`navbar-toggler ${navbarToggle ? "active" : ""}`} onClick={() => setNavbarToggle(!navbarToggle)} >
                <HamburgerIcon />
            </button>

            <div className="navbar-nav">
                <NavLink className="nav-link" onClick={() => setCreateTask(true)}>
                    New Task
                </NavLink>
                <NavLink to="/" className="nav-link">
                    Pending
                </NavLink>

                <NavLink to="/completed" className="nav-link">
                    Completed
                </NavLink>

                <NavLink to="/failed" className="nav-link">
                    Failed
                </NavLink>


            </div>
        </nav>
    );
}

export default Navbar;