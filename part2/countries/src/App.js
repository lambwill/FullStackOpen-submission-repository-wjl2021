import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Find = (props) => {
  return (
    <div>
      find countries <input type="text" value={props.filter} onChange={props.handleFilter}/>
    </div>
  )
}

const BtnShowData = ({ country, setDisplayCountry }) => (
  <input type="button" value="show" onClick={() => {
    setDisplayCountry(country)
    console.log('clicked: ', country)
    }
  }/>
)


const CountriesList = ({ countries, setDisplayCountry }) => (
  <div>
    <p>{countries.length} countries found:</p>
    {countries.map(country => <li key={country.ccn3}>{country.name.common} <BtnShowData country={country} setDisplayCountry={setDisplayCountry}/> </li>)}
  </div>
)

const LanguagesList = ({ languages }) => {
  console.log('languages:',languages)
  return (
    <div>
      <h2>Spoken languages</h2>
      {Object.entries(languages).map((language) => <li key={language[0]}>{language[1]}</li> )}
    </div>
  )
}

const Weather = ({ weather }) => {
  console.log(weather);
  if (weather == null) return null
  if (Object.keys(weather).length === 0) return null
  if (weather.success == false) return null
  return (
    <div>
      <h2>Weather in {weather.location.name}</h2>
      <p><b>temperature:</b> {weather.current.temperature} Celcius</p>
      <img src={weather.current.weather_icons[0]} alt="Weather" />
      <p><b>wind: {weather.current.wind_speed} mph direction {weather.current.wind_dir}</b></p>
    </div>
  )
}

const CountryData = ({ country }) => {
  console.log('country data:',country)
  if (Object.keys(country).length > 0) {
    return (
      <div>
        <h1>{country.name.common}</h1>
        <p>capital {country.capital}</p>
        <p>population {country.population}</p>
        <LanguagesList languages={country.languages}/>
        <img src={country.flags.png} alt="Flag" />
      </div>
    )
  }

  return null
}

const CountriesDisplay = ({ countries, setDisplayCountry }) => {
  console.log(countries)
  const numCountries = countries.length
  console.log('Number of countries:', numCountries)
  if (numCountries > 10) {
    return (
      <div>
        <p>Too many, matches, specify another filter</p>
      </div>
    )
  } else if (numCountries > 1) {
    return (
      <CountriesList countries={countries} setDisplayCountry={setDisplayCountry} />
    )
  } else if (numCountries === 0) {
      return (
        <div>
          <p>No countries found.</p>
        </div>
      )
  }
return null
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [displayCountry, setDisplayCountry] = useState({})
  const [filter, setFilter] = useState('')
  const [weather, setWeather] = useState({})

  const hook = () => {
    console.log('effect: fetch countries')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promise fulfilled: ', response.data)
        setCountries(response.data)
      })
  }

  useEffect(hook, [])

  const handleFilter = (event) => {
    console.log('filter: ', event.target.value);
    setFilter(event.target.value)
  }

  const filterCountries = () => {
    const filteredCountries = countries.filter(country => country.name.common.toUpperCase().indexOf(filter.toUpperCase()) >= 0)
    return filteredCountries
  }

  const filteredCountries = filterCountries()

  useEffect(() => {
    console.log('effect: setDisplayCountry');
    if (filteredCountries.length === 1) {
      setDisplayCountry(filteredCountries[0])
    } 
  },[filteredCountries])
  
  useEffect(() => {
    const api_key = process.env.REACT_APP_API_KEY
    console.log('Weather efect, API key:',api_key);
    console.log('displayCountry:',displayCountry);
    if (displayCountry == null) return
    if (Object.keys(displayCountry).length === 0) return
    const apiRequest = `http://api.weatherstack.com/current?access_key=${api_key}&query=${displayCountry.capital}`
    console.log('request URL:',apiRequest);
    axios
      .get(apiRequest)
      .then(response => {
        console.log('Weather data recieved: ',response.data);
        if (response.data.success == false) setWeather({})
        setWeather(response.data)
      })
  },[displayCountry])

  return (
    <div>
      <Find filter={filter} handleFilter={handleFilter}/>
      <CountriesDisplay countries={filteredCountries} setDisplayCountry={setDisplayCountry}/>
      <CountryData country={displayCountry} />
      <Weather weather={weather} />
    </div>
  )
}

export default App;
