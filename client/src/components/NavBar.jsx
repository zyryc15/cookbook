import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const NavBar = () => {
  //const [cookies, setCookies] = useCookies("access_token");
  const [cookies, , removeCookies] = useCookies(["access_token"]); // Use removeCookies from useCookies
  const navigate = useNavigate();

  const Logout = (e) => {
    // Clear the "access_token" cookie
    removeCookies("access_token");
    window.localStorage.removeItem("userID");
    navigate("/auth");
  };

  return (
    <div className="navbar">
      <Link to="/">Home</Link>
      <Link to="/create-recipe">Create Recipe</Link>

      {!cookies.access_token ? (
        <Link to="/auth">Login/Register</Link>
      ) : (
        <>
          <Link to="/saved-recipes">Saved Recipes</Link>
          <button onClick={Logout}>Logout</button>
        </>
      )}
    </div>
  );
};
