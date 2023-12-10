import { useState, useEffect } from 'react'
import axios from 'axios'
const api_key = import.meta.env.VITE_API_KEY

const App = () =>{
const [countries, setCountries] = useState([])
const [allCountries, setAllCountries] = useState([])

useEffect(() => {
  axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
    .then(response => {
      setAllCountries(response.data)
    })
}, [])

const findCountry = (event) => {
  const txtSearch = event.target.value
    setCountries(allCountries.filter(country =>
      country.name.common.toUpperCase().startsWith(txtSearch.toUpperCase())))
    if (txtSearch === ''){
      setCountries([])
    }
}

const show = (name) => {
    setCountries(allCountries.filter(country =>
      country.name.common.toUpperCase().startsWith(name.toUpperCase())))
}

return (
  <>
  find countries <input onChange={findCountry}></input>
  <Result list={countries} show={show}/>
  </>
)
}

const Result = ({list, show}) => {
  const [weather, setWeather] = useState()
  const [speed, setSpeed] = useState('')
  const [temp, setTemp] = useState('')
  const [icon, SetIcon] = useState()
  const [loading, setLoading] = useState(false)

  useEffect(() => { 
    if (list.length === 1){
      setLoading(true)
    axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${list[0].capital[0]}&limit=1&appid=${api_key}`)
        .then(response => {
          const lat = response.data[0].lat
          const lon = response.data[0].lon
          axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=b473ec464339589f834d51589bcfcaf4&units=metric`)
          .then(response => {setWeather(response.data) }) 
            .catch(error => console.log('refreshed before receiving data'))
        }).catch(error => console.log('refreshed before receiving data')) }
  }, [list]) //the render happens two times

  useEffect(() => {
    if (weather) {
      setSpeed(weather.wind.speed)
      setTemp(weather.main.temp)
      SetIcon(weather.weather[0].icon)
      setLoading(false)
    }
  }, [weather])
  
  if (list.length === 0){
      return null
  } else if (list.length > 10){
    return <p>too many matches</p>
  } else if(list.length === 1) {

    const languages = Object.values(list[0].languages)

    return(
      <div>
      <h1>{list[0].name.common}</h1>
      <div>Capital: {list[0].capital[0]} </div>
      <p>Area : {list[0].area}</p>
      <h3>Languages:</h3>
      <ul>
      {languages.map(language => <li key={language}>{language}</li>)}
      </ul>
      <img src={list[0].flags.svg} className='flag'></img>
      <h2>Weather in {list[0].capital}</h2>
      
      {loading ? <h1>Getting the data for {list[0].capital}...</h1> : // a loading to avoid showing outdated data
      <div>
        <p>temperature: {temp} Celcius</p>
        <img src= {icon && `https://openweathermap.org/img/wn/${icon}@2x.png`} className='weather'></img>
        <p>Wind speed: {speed} m/s</p>
      </div>
  } 
      </div>
    ) 
  } else {
    return (
      <div>
        <ul>
          {list.map(country => <li key={country.name.common}>{country.name.common} <button onClick={() => show(country.name.common)}>Show</button></li>)}
        </ul>
      </div>
    )
  }
}

export default App