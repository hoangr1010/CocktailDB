import React from 'react'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
// import pages
import Home from './pages/Home'
import About from './pages/About'
import SingleCocktail from './pages/SingleCocktail'
import Error from './pages/Error'
// import components
import Navbar from './components/Navbar'

const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={ <Navbar/> }>
    <Route index element={ <Home/> } />
    <Route path='about' element={ <About/> } />
    <Route path='cocktail/:id' element={ <SingleCocktail/> } />
    <Route path='*' element= { <Error /> } />
  </Route>
))


function App() {

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
