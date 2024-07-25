import "./styles.css";
import { appLogout } from "../../store/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useState } from "react";
import { FaUserCircle, FaSearch, FaHome, FaFile, FaFolder } from 'react-icons/fa';

const Navbar = () => {
    const dispatch = useDispatch();
    const { email } = useSelector(state => state.auth);
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const handleLogout = () => {
        dispatch(appLogout());
        toast.success("Logged out successfully");
    };

    return (
        <div className="navbar-container">
            <div className="navbar-left-items">
            
                <h3>cloudHome</h3>

                <div className="navbar-links">
                    <a href="#home"><FaHome /> Home</a>
                    <a href="#files"><FaFile /> Files</a>
                    <a href="#folders"><FaFolder /> Folders</a>
                </div>
            </div>
            <div className="navbar-right-items">
                <div className="search-container">
                    <input type="text" placeholder="Search..." />
                    <FaSearch className="search-icon" />
                </div>
                <div className="user-info" onClick={() => setDropdownOpen(!isDropdownOpen)}>
                    <FaUserCircle className="user-icon" />
                    <span className="user-email">{email}</span>
                </div>
                {isDropdownOpen && (
                    <div className="dropdown-menu">
                        <button onClick={handleLogout}>Logout</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
