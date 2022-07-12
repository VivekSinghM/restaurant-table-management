import { useState, useEffect } from "react"
import React from 'react'

function App() {
  const [data, setData] = useState([{}])
  useEffect(()=>{
    fetch("/users").then(
      response=>response.json()
      ).then(
        data=>{
          setData(data)
          console.log(data)
        }
      )
  },[])
  console.log(data)
  return (
    <div>App</div>
  )
}

export default App