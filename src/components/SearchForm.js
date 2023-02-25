import React, { useRef, useEffect } from 'react'
import { useGlobalContext } from '../context'

const SearchForm = () => {

  const { setSearchTerm } = useGlobalContext()

  const inputElement = useRef()

  useEffect(() => {
    inputElement.current.focus()
  },[])

  function changeHandler(e) {
    setSearchTerm(e.target.value)
  }

  function submitHandler(e) {
    e.preventDefault()
  }

  return (
    <section className='section-search'>
      <form className='search-form' onSubmit={submitHandler}>
        <div className='form-control'>
          <label htmlFor='name'>search your favorite cocktail</label>
          <input type='text' id='name' ref={inputElement} onChange={changeHandler}></input>
        </div>
      </form>
    </section>
  )
}

export default SearchForm
