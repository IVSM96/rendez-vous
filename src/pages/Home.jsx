import React, { useContext, useEffect } from "react"
import Card from "../components/Card/Card"
import {store} from '../redux/store'
import AppContext from "../context";
import {useSelector} from 'react-redux'
import {fetchItem} from '../redux/asyncActions';



function Home ({isLoading, searchValue, onChangeSearchInput, onAddToFavorite, onAddToCart}) { 
  const {setIsLoading} = useContext(AppContext)
  const items = useSelector(state=>state.items)

useEffect(() => {
    store.dispatch(fetchItem())
    setIsLoading(false)
},[])

const renderItems = () => {
      return( isLoading
        ? [...Array(4)]
        : items.filter(item =>item.title.toLowerCase().includes(searchValue.toLowerCase())))
        .map((item, index) =>
          (<Card 
          key={index}
          onFavorite={(obj)=>onAddToFavorite(obj)} 
          onPlus={(obj) => onAddToCart(obj)} 
          loading={isLoading}
          {...item}/>))
    }
  
  return(
        <div className="content p-40">
        <div className="d-flex align-center mb-40 justify-between ">
          <h1>{searchValue? `Поиск по запросу: "${searchValue}"`: 'Предложение недели'}</h1>
          <div className="search-block d-flex">
           <img src="search.svg" alt=""></img>
           <input value={searchValue} onChange={onChangeSearchInput} placeholder="Поиск..."></input>
          </div>
        </div>
        <div className="d-flex flex-wrap">
            {renderItems()}
        </div>
      </div>
    )
}

export default Home;