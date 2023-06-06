import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Nav = () => {
  const auth = localStorage.getItem("userData");
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <>
      <div>
        {/* <ul className="nav-ul">
          <li>
            <Link to="/">Products</Link>
          </li>
          <li>
            <Link to="/add">Add Product</Link>
          </li>
          <li>
            <Link to="/update">Update</Link>
          </li>
          <li>
            <Link to="/profile"> Profile</Link>
          </li>

          {auth ? (
            <li>
              <Link onClick={logout} to="/login">
                Logout
              </Link>
            </li>
          ) : (
            <>
              <li>
                {" "}
                <Link to="/signup">Signup</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>{" "}
            </>
          )}
        </ul> */}
        <Link to="/">
          <img
            alt="logo"
            className="logo"
            src="https://img.freepik.com/premium-vector/abstract-modern-ecommerce-logo-design-colorful-gradient-shopping-bag-logo-template_467913-995.jpg?w=2000"
          />
        </Link>

        {auth ? (
          <ul className="nav-ul">
            <li>
              <Link to="/">Products</Link>
            </li>
            <li>
              <Link to="/add">Add Product</Link>
            </li>
            <li>
              <Link to="/update">Update</Link>
            </li>
            <li>
              <Link to="/profile"> Profile</Link>
            </li>
            <li>
              {" "}
              <Link onClick={logout} to="/login">
                Logout ({JSON.parse(auth).name})
              </Link>
            </li>
          </ul>
        ) : (
          <ul className="nav-ul nav-right">
            <li>
              {" "}
              <Link to="/signup">Sign Up</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        )}
      </div>
    </>
  );
};

export default Nav;
