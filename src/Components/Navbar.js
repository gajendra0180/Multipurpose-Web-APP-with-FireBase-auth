import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom"
const LOCAL_STORAGE_KEY = 'USERS_APP'

const Navbar = (props) => {

   let user=""
   if(props.name)
    {
      user=props.name
      var temp=""
      for(let a=0;a<user.length;a++)
       { 
        if(user[a]=="@")
          break;
        temp+=user[a]
      }
      user=temp.toUpperCase();
    }
  function handleLogout() {
    localStorage.removeItem(LOCAL_STORAGE_KEY)
  }

  return (
    <>
      <div className="navbar">
        <div className="logo">
          <img src="https://raw.githubusercontent.com/gajendra0180/Weather-Web-App/main/Images/logo.png" alt="" />
          <p>
            <span className="logo-top-heading"> 
             {user}&nbsp;
            </span>
            <br />
            &nbsp;&nbsp;<span>Tenki</span>
          </p>
        </div>

    <div className="top_nav_bar_buttons">
              <div className="nav_action_buttons">
{
  props.signedIn?<>
          <button   id="change_it">Welcome &nbsp;&nbsp;{user}</button>
          <button><a   style={{ color: "white" }} href="#">Tenki</a></button> 
        {/* <button ><a style={{ color: "white" }}  onClick={handleLogout}  href="/login">Logout</a></button> */}
        </>
  :
  <>
            <button id="change_it">Home</button>
          <button><a   style={{ color: "white" }} href="#">Tenki</a></button> 
   <button><a   style={{ color: "white" }} href="login">Login</a></button>
          <button><a   style={{ color: "white" }} href="signup">SignUp</a></button>
          </>
  }
        
        </div>
        {props.signedIn?  <a className="Logout" style={{ color: "white" }}  onClick={handleLogout}  href="/login">Logout</a>:<></>}
     
    </div>
 </div>
    </>
  );
};
export default Navbar;