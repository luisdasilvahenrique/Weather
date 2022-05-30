import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

export default function App() {
  const [location, setLocation] = useState(false);
  const [weather, setWeather] = useState(false);

  let getWeather = async (lat, long) => {
    let res = await axios.get("https://api.openweathermap.org/data/2.5/weather", 
    {
      params: {
      lat: lat,
      lon: long,
      appid: process.env.REACT_APP_OPEN_WHEATHER_KEY,
      lang: 'pt',
      units: 'metric'
      }
    });
    setWeather(res.data
      );
  }
  
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      getWeather(position.coords.latitude, position.coords.longitude);
      setLocation(true);
    })
  },[])

  if(location == false){
    <>Você precisa habilitar a localização no browser!</>
  } else if (weather == false){
    return (
      <>Carregando o clima...</>
    )
  } else {
    return(
    <>
    <h3>Clima nas suas coordenadas</h3>

    <ul>
      <li>Temperatura atual: {weather["main"]["temp"]} </li>
      <li>Temperatura máxima: {weather["main"]["temp_max"]}</li>
      <li>Temperatura Mínima: {weather["main"]["temp_min"]}</li>
      <li>Pressão: {weather["main"]["pressure"]}</li>
      <li>Umidade: {weather["main"]["humidity"]}</li>
    </ul>
  </>
    )
  }
  
}
