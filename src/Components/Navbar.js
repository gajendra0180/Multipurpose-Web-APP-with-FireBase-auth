import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom"
const LOCAL_STORAGE_KEY = 'USERS_APP'

const Navbar = (props) => {

   let user="Satoru Gojo"
   if(props.name)
    user=props.name
  function handleLogout() {
    localStorage.removeItem(LOCAL_STORAGE_KEY)
  }

  return (
    <>
      <div className="navbar">
        <div className="logo">
          <img src="https://raw.githubusercontent.com/gajendra0180/Weather-Web-App/main/Images/logo.png" alt="" />
          <p>
            Welcome {user}&nbsp;
            <br />
            &nbsp;&nbsp;<span>Tenki</span>
          </p>
        </div>
        <div className="nav_action_buttons">
          <button id="change_it">Home</button>
          <button><a style={{ color: "white" }} href="#">Tenki</a></button>

{
  props.signedIn?
        <button><a style={{ color: "white" }} onClick={handleLogout} href="/login">Logout</a></button>
  :
  <>
   <button><a style={{ color: "white" }} href="login">Login</a></button>
          <button><a style={{ color: "white" }} href="signup">SignUp</a></button>
          </>
  }
        
        </div>
      </div>
    </>
  );
};
export default Navbar;