import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Header from './components/Header';
import Draver from './components/Draver';
import Home from './pages/Home';
import {Route, Routes } from 'react-router-dom';
import Favorites from './pages/Favorites';
import AppContext from './context';


function App() {
  const [items, setItems] = useState([])
  const [cartOpened, setCartOpened] = useState(false)
  const [cartItems, setCartItems] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [favorites, setFavorites] = useState([])
  const [isLoading, setIsLoading] = useState(true) 

  useEffect(() => {
   async function fetchData() {
    const cartResponse = await axios.get('https://62567d3252d8738c692f86e0.mockapi.io/cart')
    const favoritesResponse = await axios.get('https://62567d3252d8738c692f86e0.mockapi.io/favorites')
    const itemsResponse = await axios.get('https://62567d3252d8738c692f86e0.mockapi.io/items')
    setIsLoading(false)
    setCartItems(cartResponse.data)
    setFavorites(favoritesResponse.data)
    setItems(itemsResponse.data)
  }
  fetchData()
},[])
  const onRemoveItem = (id) => {
    axios.delete(`https://62567d3252d8738c692f86e0.mockapi.io/cart/${id}`)
    setCartItems((prev) => prev.filter(item => item.id !== id))
  }
  const onAddToCart = (obj) => {
    try{
      if(cartItems.find((item) =>Number(item.id) === Number(obj.id) )) {
          axios.delete(`https://62567d3252d8738c692f86e0.mockapi.io/cart/${obj.id}`)
          setCartItems((prev) =>prev.filter(item => Number(item.id) !== Number(obj.id)))
      }else {
        axios.post('https://62567d3252d8738c692f86e0.mockapi.io/cart', obj)
        setCartItems((prev)=>[...prev,obj])
      }
    }catch(error) {
      alert('Не удалось добавить в корзину!')
    }
  }
  const onAddToFavorite = async (obj) => {
    try{
    if(favorites.find((favObj) => Number(favObj.id) === Number(obj.id))){
    axios.delete(`https://62567d3252d8738c692f86e0.mockapi.io/favorites/${obj.id}`)
    setFavorites((prev) => prev.filter(item => Number(item.id) !== Number(obj.id)))
    }else{
      const {data} = await axios.post('https://62567d3252d8738c692f86e0.mockapi.io/favorites', obj)
      setFavorites((prev) =>[...prev, data])
    }
   }catch (error) {
    alert('Не удалось добавить в фавориты!')
   }
  }
  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value)
  }

const isItemAdded = (id) => {
 return cartItems.some((obj)=> Number(obj.id) === Number(id)) 
}

  return (
    <AppContext.Provider value={{cartItems, favorites, items, isItemAdded, onAddToFavorite, setCartOpened, setCartItems}}>
      <div className="wrapper clear">
      {cartOpened && <Draver onRemove={onRemoveItem} cartItems={cartItems}  onCloseCart={()=>setCartOpened(false)}></Draver>}
        <Header onClickCart={()=>setCartOpened(true)}></Header>
        <Routes>
          <Route path='/' element={
            <Home 
              items={items} 
              cartItems={cartItems}
              searchValue={searchValue} 
              setSearchValue={setSearchValue} 
              onChangeSearchInput={onChangeSearchInput}
              onAddToFavorite={onAddToFavorite}
              onAddToCart={onAddToCart}
              isLoading={isLoading}
            ></Home>}>
          </Route>
          <Route path='/favorites' element={<Favorites></Favorites>}></Route>
        </Routes>
      </div> 
    </AppContext.Provider>
  );
}

export default App;
