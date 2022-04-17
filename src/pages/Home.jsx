import React, { useContext } from "react"
import Card from "../components/Card/Card"
import axios from 'axios';
import { addItemsFetchAction } from "../redux/actions";
import {store} from '../redux/store'
import AppContext from "../context";
import {useSelector} from 'react-redux'

function Home ({isLoading, searchValue, onChangeSearchInput, onAddToFavorite, onAddToCart}) { 
  const {setIsLoading} = useContext(AppContext)
  const items = useSelector(state=>state.items)
  const fetchItem  = () => {
    return dispatch => {
     axios.get('https://62567d3252d8738c692f86e0.mockapi.io/items').then(res => dispatch(addItemsFetchAction(res.data)))
     setIsLoading(false)
    }
}
store.dispatch(fetchItem())

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