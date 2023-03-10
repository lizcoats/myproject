import React, { useEffect } from 'react'
import { useState,useContext} from 'react'
import { useNavigate } from "react-router-dom"
import AuthContext from '../context/AuthContext';


function CreateRecipe() {

  const navigate = useNavigate()
  let {authTokens} = useContext(AuthContext)
 

  const [name, setName] = useState('')
  const [ingredients, setIngredients] = useState('')
  const [time, setTime] = useState('')
  const [instructions, setInstructions] = useState('')
  const [errors, setErrors] = useState('')
 
  const handleSubmit = (e) => {
    e.preventDefault()
    const recipeObject = {
      name: name,
      ingredients: ingredients,
      time: time,
      instructions: instructions
    }
    console.log(recipeObject)
    addRecipe(recipeObject)

  }


// const base_url = "http://127.0.0.1:8000/recipes/"
const base_url = process.env.REACT_APP_BASE_URL

  const addRecipe = async (recipeObj) => {
    // const url = base_url
    const url = `http://${base_url}/recipes/`
    const context = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': 'Bearer ' + String(authTokens.access)
      },
      body: JSON.stringify(recipeObj)
    }
    // console.log(authTokens)
    // console.log(context)
    const resp = await fetch(url, context)
    const body = await resp.json()
    if (resp.status === 400) {
      setErrors(body)
    } else {
      navigate("/recipe")
    }
  }
  
return(
  
  <div className= 'container'>
      <h2 style={{color:"#340529"}}>Create Recipe</h2>
      {errors && <h4>{JSON.stringify(errors)}</h4>}
     
      
      <div className="form=group">
      <input type="text" className="form-control form_control-lg" placeholder="Enter Recipe Name" value={name} name="name" onChange={(e) => setName(e.target.value)}></input>
      </div>
      
      <div className="form=group">
      <input type="text" className="form-control form_control-lg" placeholder="Enter Ingredients" value={ingredients} name="ingredients" onChange={(e) => setIngredients(e.target.value)}></input>
      </div>
    
      <div className="form=group">
      <input type="text" className="form-control form_control-lg" placeholder="Enter Total Time" value={time} name="time" onChange={(e) => setTime(e.target.value)}></input>
      </div>
     
      <div type="text" className="form=group">
      <input className="form-control form_control-lg" placeholder="Enter Directions" value={instructions} name="instructions" onChange={(e) => setInstructions(e.target.value)}></input>
      </div>
    
      <button className="search-button" onClick={handleSubmit}>Submit</button>
     
  </div>
 )}

export default CreateRecipe