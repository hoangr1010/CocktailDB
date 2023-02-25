import React, { useState, useEffect } from 'react'
import Loading from '../components/Loading'
import { useParams, Link } from 'react-router-dom'
const url = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i='

const SingleCocktail = () => {
  const { id } = useParams()
  const [ loading, setLoading ] = useState(false)
  const [ cocktail, setCocktails ] = useState({})

  async function fetchData() {
    setLoading(true)
    try { 
      const response = await fetch(`${url}${id}`)
      const data = await response.json()
      
      if (data.drinks) {
        const detail = data.drinks[0]
        const { strDrink: name,
                strDrinkThumb: image, 
                strAlcoholic: info, 
                strCategory: category, 
                strGlass: glass, 
                strInstructions: instructions, 
                strIngredient1,
                strIngredient2, 
                strIngredient3, 
                strIngredient4, 
                strIngredient5} = detail
        const ingredients = [strIngredient1, strIngredient2, strIngredient3, strIngredient4, strIngredient5]
        setCocktails({name, image, info, category, glass, instructions, ingredients})
      } else {
        setCocktails(null)
      }
      setLoading(false)
    } catch (err) {
      console.log(err)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [id])

  if (loading) {
    return <Loading />
  }

  if (!cocktail) {
    return (
    <section>
      <h2 className='section-title'>No cocktail to display</h2>
    </section>
    )
  } else {
    const { name, image, info, category, glass, instructions, ingredients } = cocktail
    return (
      <section className='section cocktail-section'>
        <Link to='/' className='btn btn-primary'>back home</Link>
        <h2 className='section-title'>{name}</h2>
        <div className='drink'>
          <img src={image} alt={name} />
          <div className='drink-info'>
            <p>
              <span className='drink-data'>name: </span>
              {name}
            </p>
            <p>
              <span className='drink-data'>category: </span>
              {category}
            </p>
            <p>
              <span className='drink-data'>info: </span>
              {info}
            </p>
            <p>
              <span className='drink-data'>glass: </span>
              {glass}
            </p>
            <p>
              <span className='drink-data'>instructions: </span>
              {instructions}
            </p>
            <p>
              <span className='drink-data'>Ingredients: </span>
              {ingredients?.map((item, index) => {
                return item ? <span key={index}>{item}</span> : null
              })}
            </p>
          </div>
        </div>
      </section>
    )
  }
}

export default SingleCocktail
