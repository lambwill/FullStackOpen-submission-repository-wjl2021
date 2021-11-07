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
      <h2>languages</h2>
      {Object.entries(languages).map((language) => <li key={language[0]}>{language[1]}</li> )}
    </div>
  )
}

const CountryData = ({ country }) => {
  console.log('country data:',country)
  if (Object.keys(country).length > 0) {
    return (
      <div>
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

  const hook = () => {
    console.log('effect')
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
    if (filteredCountries.length === 1) {
      setDisplayCountry(filteredCountries[0])
    } 
  },[filteredCountries])
  

  return (
    <div>
      <Find filter={filter} handleFilter={handleFilter}/>
      <CountriesDisplay countries={filteredCountries} setDisplayCountry={setDisplayCountry}/>
      <CountryData country={displayCountry} />
    </div>
  )
}

export default App;
