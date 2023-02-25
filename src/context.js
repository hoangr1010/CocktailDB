import React, { useState, useContext, useEffect } from 'react'
import { useCallback } from 'react'

const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='
const AppContext = React.createContext()

const AppProvider = ({ children }) => {

  const [ loading, setLoading ] = useState(false)
  const [ cocktails, setCocktails ] = useState([])
  const [ searchTerm, setSearchTerm ] = useState('a')

  async function fetchData() {
    setLoading(true)
    try {
      const response = await fetch(`${url}${searchTerm}`)
      const data = await response.json()

      if (data.drinks) {
        const drinks = data.drinks.map(drink => {
          const { idDrink, strDrink, strDrinkThumb, strAlcoholic, strGlass } = drink
          return ({
            id: idDrink, 
            name: strDrink, 
            image: strDrinkThumb,
            info: strAlcoholic,
            glass: strGlass
          })
        })
        setCocktails(drinks)

      } else {
        setCocktails([])
      }
      setLoading(false)
    } catch (err) {
      console.log(err)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [searchTerm])

  return (
    <AppContext.Provider 
      value={
        {
          loading, 
          cocktails, 
          searchTerm, 
          setSearchTerm
        }
      }>
      {children}
    </AppContext.Provider>)
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
