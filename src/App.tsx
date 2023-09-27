/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react"
import {BsWind} from 'react-icons/bs'
import {GiWaterDrop} from 'react-icons/gi'

function  App() {

interface WeatherProps {
  name:string ;
  weather: [
    {icon:string;}
  ];
  sys: {
    country: string;
  };
  wind:{
    speed: number;
  }; 
  main: {
    temp:number;
    humidity: number;
  };  
} 
  const ApiKEY = '4a732ba64a64ef6ed6511e698db6adbf'  

  const [tempo, setTempo ] =  useState<WeatherProps | null>(null)
  const [search, setSearch] = useState('')

  const getWeatherApi = async (cidade: any) => {       
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&units=metric&appid=${ApiKEY}&lang=pt_br`)
      const data = await response.json()

      if(data.cod === '404') {      
        return;
      }   
      setTempo(data) 
  }

  useEffect(()=>{
    getWeatherApi('Russia')
  },[])

  const handleSubmit = () => {
    if(search)
    getWeatherApi(search)
    setSearch('')
  }
 
  

  return (
    <>          
        <div className="flex justify-center items-center h-screen w-screen bg-[url('/public/fundo.jpg')] backdrop-blur-sm  ">
          <div className="flex flex-col items-center h-4/5 w-1/2 min-w-3/4 bg-sky-400  p-5 gap-10 rounded">
            <h1 className="font-bold text-white text-center text-3xl">VEJA O CLIMA DE QUALQUER LUGAR</h1>
            <label className="flex flex-col items-center w-1/2 min-w-1/2 gap-3 pb-5 border-b-2 border-white" >
              <input
              value={search}
              placeholder="Digite um lugar" 
              type="text"
              onChange={(e) => setSearch(e.target.value)}
              className="p-2 min-w-fit outline-none w-1/2" />       
              <button
              className="w-1/3 min-w-fit bg-white p-2 text-1xl font-semibold rounded" 
              onClick={handleSubmit}>Enviar</button>       
            </label>
          {
            tempo && (
            <div className="flex flex-col items-center rounded p-3 w-1/2">             
              <p className="text-xl font-bold text-white">
                {tempo.name}              
              </p> 
              <img src={`https://flagsapi.com/${tempo.sys.country}/flat/64.png`} alt="" />
              <img src={`http://openweathermap.org/img/wn/${tempo.weather[0].icon}.png`} alt="" />  
              <div className="flex flex-col items-center w-1/2 gap-5"> 
                <div>
                  <h2 className="text-xl font-bold text-white">Temperatura</h2>
                  <span
                   className="text-4xl font-bold">
                   {tempo.main.temp}&deg;C
                  </span>
                </div>
                  <div className="flex w-full justify-center">
                    <div className="flex flex-col items-center border-r-2 pr-4 border-white">
                      <h2 className="text-xl font-bold text-white mb-5">Ventos</h2>
                      <div className="flex gap-4 items-center">
                        <i><BsWind/> </i>
                        <span className="text-2xl font-bold">{tempo.wind.speed} </span>
                      </div>
                    </div>
                    <div className="flex flex-col items-center ml-4">                      
                      <h2 className="text-xl font-bold text-white mb-5">Humidade</h2>
                        <div className="flex items-center gap-4">
                         <i><GiWaterDrop/></i>
                         <span  className="text-2xl font-bold">{tempo.main.humidity} </span>
                        </div>
                    </div>
                  </div>                          
              </div>
            </div>)
          }
        </div>  
        </div>   
    </>
  )
}

export default App
