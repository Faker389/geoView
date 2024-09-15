"use client"
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [options,setOptions]=useState<Array<string>>()
  const [country,setCountry]=useState<string>()
  const [images,setImages]=useState<Array<string>>()
  async function getOptions() {
    const data = await axios.get("http://localhost:8000/options",{
      headers:{
        "Content-Type":"application/json"
      }
    })
    const response = await data.data
    console.log(response)
    setOptions(response)
  }
  useEffect(()=>{
    getOptions()
  },[])
  async function getOption(str:string){
    setCountry(str)
    const data = await axios.post("http://localhost:8000/option",JSON.stringify({string:str}),{
      headers:{
        "Content-Type":"application/json"
      }
    })
    const response = await data.data
    console.log(response)
    setImages(response)
  }
  return (
    <div>
      <header>
        <ul className="inline-block">
          {options?.map((e:string,index:number)=>{
            return <li className="inline-block p-4 bg-black text-white ml-3" onClick={()=> getOption(e)} key={index}>{e}</li>
          })}
        </ul>      
        <div>
          <h1 className="text-4xl">{country}</h1>
          <div className="flex w-screen flex-wrap">
          {images?.map((e:string,index:number)=>{
            return <img className="w-72 h-auto"  src={e} key={index} />
          })}
          </div>
        </div>
      </header>
    </div>
  );
}
