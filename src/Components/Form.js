import { useRef, useState, useEffect, useCallback } from "react";
import Card from "./Card";
import "./Form.css";
import alanBtn from "@alan-ai/alan-sdk-web";
import { v4 as uuidv4 } from 'uuid';
import { useAuth } from "../Contexts/AuthContext.js"
const LOCAL_STORAGE_KEY = 'USERS_APP'


const Form = () => {

  console.log("hey the api key is"+process.env.REACT_APP_API_KEY)

// getting current user from local host
  var { currentUser } = useAuth()
  var users = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (currentUser == undefined) {
      currentUser = users
    }

// setting up alan instance
  const [alanInstance, setAlanInstance] = useState();

// alan instance speaks when locaton found

  const speak = useCallback(() => {
     alanInstance.activate()  
    alanInstance.playText(
      "Sorry But We are not able to find any such place in our database.Please Try Again"
    );
  }, [alanInstance]);

  useEffect(() => {
    window.addEventListener("error_occurred", speak);
    return () => {
      window.removeEventListener("error_occurred", speak);
    };
  }, [speak]);

// alan instance speaks when locaton not found


  const speakLocation = useCallback(() => {
     alanInstance.activate()  
    alanInstance.playText(
      `The weather report has appeared as a card on the webpage.Thanks For Using Me!`
    );
  }, [alanInstance]);


    useEffect(() => {
    window.addEventListener("Location_Found", speakLocation);
    return () => {
      window.removeEventListener("Location_Found", speakLocation);
    };
  }, [speakLocation]);


// Basic Alan AI Setup
  useEffect(() => {
    if (alanInstance != null) return;
    setAlanInstance(
      alanBtn({
        bottom: "2vh",
        right: "1vw",
        key: "2073b628f8787fbac49a0bc9f63f2f002e956eca572e1d8b807a3e2338fdd0dc/stage",
        onCommand: ({ command }) => {
          console.log(command);
          // console.log("akslakkkkkkkkkkkkkkkkkkkkkkkkssssssssssssssssssssssssssssssssssssssssssssss")
          getData(command);
        },
      })
    );
  }, []);


  const [totalCardsPinned, settotalCardsPinned] = useState(0);
  const location = useRef();
  const [weatherCards, setWeatherCards] = useState([
    {
      name: totalCardsPinned + " Cards Pinned",
      temperature: "",
      temperature_humidity: "",
      weather_type: "",
      weather_image: "",
    },
  ]);


  // This function will be used to update the UI by adding the cards to the view
  function update(
    name,
    temperature,
    temperature_humidity,
    weather_type,
    weather_image
  ) {
    if (name !== "") {
      settotalCardsPinned(function setit(totalCardsPinned) {
        totalCardsPinned++;
        const new_arr1 = weatherCards;
        new_arr1[0].name = totalCardsPinned + " Cards Pinned";
        setWeatherCards(new_arr1);
        const new_arr = [
          ...weatherCards,
          {
            name: name,
            temperature: temperature,
            temperature_humidity: temperature_humidity,
            weather_type: weather_type,
            weather_image: weather_image,
          },
        ];
        setWeatherCards(new_arr);
        return totalCardsPinned;
      });
    }

  }

  // This function will fetch the data from the open weather server and unsplash server through APIs
  function getData(data) {

    var cityName;
    if (location.current.value != "") cityName = location.current.value;
    else cityName = data;

    location.current.value = null;

    console.log("Hey The city" + cityName);


    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=52fbfd16084cb849b4bab407c67677ea&units=metric`;

    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Something went wrong");
        }
      })
      .then((responseJson) => {
        console.log(responseJson);

        fetch(
          `https://source.unsplash.com/1600x900/?${responseJson.weather[0].description}`
        ).then((response) => {
          console.log(response.url);
                  window.dispatchEvent(new CustomEvent("Location_Found"));      
          update(
            cityName,
            responseJson.main.temp,
            responseJson.main.humidity,
            responseJson.weather[0].description,
            response.url
          );
        });
      })
    .catch((error) => {
        console.log("Error occured");
        window.dispatchEvent(new CustomEvent("error_occurred"));
        update("", "", "", "", "");
      });
  }

  function handleSubmitForm(e)
  { e.preventDefault();
  }

// UI rendering done here
  return (
    <>
      <section className="section_1">
        <form className="location_form" onSubmit={handleSubmitForm}>
          <input
            type="text"
            // required
            ref={location}
            autoFocus
            autoComplete="off"
            name="location"
            id="location"
            placeholder="Enter a location"
          />
          <button className="location_form_submit" onClick={getData}>
            Submit
          </button>
        </form>
        <div className="background_image"></div>
        <div className="append_here_before">Here Goes your Pinned Cards Mr.{currentUser.email} </div>
        <div style={{ marginTop: "2vh", display: "flex", flexWrap: "wrap" }}>
          {weatherCards.map((e) => {
            return (
              <Card
               key={uuidv4()}
                city={e.name}
                temperature={e.temperature}
                temperature_humidity={e.temperature_humidity}
                weather_type={e.weather_type}
                weather_image={e.weather_image}
              />
            );
          })}
        </div>
      </section>
    </>
  );
};

export default Form;
