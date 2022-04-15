import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import Drawer from './components/Drawer/Drawer';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import AppContext from './context';
import Orders from './pages/Orders';


function App() {
  const [items, setItems] = useState([]);
  const [cartOpened, setCartOpened] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
   async function fetchData() {
     try{
    const cartResponse = await axios.get('https://62567d3252d8738c692f86e0.mockapi.io/cart')
    const favoritesResponse = await axios.get('https://62567d3252d8738c692f86e0.mockapi.io/favorites')
    const itemsResponse = await axios.get('https://62567d3252d8738c692f86e0.mockapi.io/items')
    setIsLoading(false)
    setCartItems(cartResponse.data)
    setFavorites(favoritesResponse.data)
    setItems(itemsResponse.data)
    }catch(error){ alert('Ошибка при запросе данных!') }
  }
  fetchData()
},[])
  const onRemoveItem = (id) => {
    try{
    axios.delete(`https://62567d3252d8738c692f86e0.mockapi.io/cart/${id}`)
    setCartItems((prev) => prev.filter(item => Number(item.id) !== Number(id)))
    }catch(error) {alert('Ошибка при удалении из корзины!')}
  }
const onAddToCart = async (obj) => {
    try{
      const findItem = cartItems.find((item) =>Number(item.parentId) === Number(obj.id) )
      if(findItem) {
        setCartItems((prev) =>prev.filter(item => Number(item.parentId) !== Number(obj.id)))
        axios.delete(`https://62567d3252d8738c692f86e0.mockapi.io/cart/${findItem.id}`) 
      }else {
       setCartItems((prev)=>[...prev,obj])
       axios.post('https://62567d3252d8738c692f86e0.mockapi.io/cart', obj)
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
 return cartItems.some((obj)=> Number(obj.parentId) === Number(id)) 
}

return (
    <AppContext.Provider value={{cartItems, favorites, items, isItemAdded, onAddToCart, onAddToFavorite, setCartOpened, setCartItems}}>
      <div className="wrapper clear">
      <Drawer opened={cartOpened} onRemove={onRemoveItem} onCloseCart={()=>setCartOpened(false)}/>
        <Header onClickCart={()=>setCartOpened(true)}/>
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
            />}>
          </Route>
          <Route path='/favorites' element={<Favorites/>}></Route>
          <Route path='/orders' element={<Orders/>}></Route>
        </Routes>
      </div> 
    </AppContext.Provider>
  );
}

export default App;
