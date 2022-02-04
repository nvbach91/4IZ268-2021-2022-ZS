import { useState, useEffect } from "react";
import cn from "classnames";
import Button from "../controls/Button";

const Event = ({ event, index, edit, deleteEvent }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [locationLat, setLocationLat] = useState("");
  const [locationLon, setLocationLon] = useState("");
  const [locationWeather, setLocationWeather] = useState("");

  function parseDateToMakeSense(start, end) {
    return (
      <>
        {new Date(start).toLocaleDateString("cs-cz")}{" "}
        {<p>
          {new Date(start).toLocaleTimeString()} -{" "}
          {new Date(end).toLocaleTimeString()}
        </p>}
      </>
    );
  }
  const weatherAPIKey = "b7a29de44058f61eb862029521e3cc80"

  const urlGeo = (loc) => {
    if (event.location)
      return (`http://api.openweathermap.org/geo/1.0/direct?q=${loc}&limit=1&appid=${weatherAPIKey}`)
  }
  const urlCoorToTemp = (lat, lon) => {
    if (event.location)
      return (`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&exclude=hourly,daily&appid=${weatherAPIKey}`)
  }
  const fetchLocationCoor = (loc) => {
    fetch(urlGeo(loc))
      .then
      (res => res.json())
      .then
      (data => {
        setLocationLat(data[0].lat);
        setLocationLon(data[0].lon);
      })
      .catch
      (e => console.log(e))

  }
  const fetchLocationWeather = (lat, lon) => {
    fetch(urlCoorToTemp(lat, lon))
      .then
      (res => res.json())
      .then
      (data => {
        console.log(typeof(data.main.temp))
        setLocationWeather(`${Math.round(data.main.temp - 273.15)}°C`)
      })
      .catch
      (e => console.log(e));
  }
  useEffect(() => {
    if (event.location) {
      fetchLocationCoor(event.location)
    }
  }, []);

  useEffect(() => {
    if (locationLat && locationLon) {
      fetchLocationWeather(locationLat,locationLon)
    }
  },[locationLat,locationLon]);

  if (event) {
    return (
      <div
        key={event.summary + (event.start.date || event.start.dateTime)}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>
          {event.start.date
            ? event.start.date
            : parseDateToMakeSense(event.start.dateTime, event.end.dateTime)} - {event.end.date
              ? event.end.date
              : parseDateToMakeSense(event.start.dateTime, event.end.dateTime)}
        </span>
        <div className="border-2 border-purple-500 rounded-md p-2 transition-all w-full cursor-pointer">
          <div className="flex flex-row pb-1 w-full justify-between">
            <span
              className={cn(
                "text-2xl",
                isOpen &&
                (event.description || event.location) &&
                "border-b-2 border-black"
              )}
            >
              {event.summary}
            </span>
            <div className="flex flex-col space-y-2">
              {isOpen && (
                <Button onClick={() => edit(index)} className="bg-blue-700">
                  Edit
                </Button>
              )}
              {isOpen && (
                <Button
                  onClick={() => deleteEvent(index)}
                  className="bg-blue-700"
                >
                  Delete
                </Button>
              )}
            </div>
          </div>
          {isOpen && (event.description || event.location) && (
            <div className="mt-2">
              <p>{event.description}</p>
              <p>{event.location}</p>
              <p>{locationWeather}</p>
            </div>
          )}
        </div>
      </div>
    );
  }
};

export default Event;
