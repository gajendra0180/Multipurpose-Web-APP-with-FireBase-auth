import React from "react";
import "./Card.css";
const Card = (props) => {

  // Background image of each card in the web page will be random and according to the tags of the weather_type
  var bgImg=`https://images.unsplash.com/photo-1503643766889-957dc3096721?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=900&ixid=MnwxfDB8MXxyYW5kb218MHx8bmlnaHR8fHx8fHwxNjQwMjc2MTg5&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1600`
  if(props.weather_image!="")
    bgImg=props.weather_image
    

  const style1 = {
    color: "white",
    position: "relative",
    zIndex: "100",
    marginRight: "auto",
    marginTop:"2vh",
    marginLeft:"auto",
    cursor: "pointer",
    fontSize: "2em",
    borderRadius: "20px",
    border:"none",
    backgroundImage: `url(${bgImg})`,
    height: "400px",
    width: "300px",
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
  };


  return (
    <>
      <div style={style1} className="card">

      {props.temperature_humidity === "" ? (
          <h1 style={{color:"white",fontStyle:"italic",fontFamily:"fantasy"}}>{props.city}</h1>
        ) : (
          <h1>Location: {props.city}</h1>
        )}

        {props.temperature === "" ? (
          ""
        ) : (
          <h4>Temperature:{props.temperature}</h4>
        )}

        {props.temperature_humidity === "" ? (
          ""
        ) : (
          <h4>Humidity:{props.temperature_humidity}</h4>
        )}

        {props.weather_type === "" ? (
          ""
        ) : (
          <h4>Weather Type:{props.weather_type}</h4>
        )}

     
        <br />
      </div>
    </>
  );
};

export default Card;
