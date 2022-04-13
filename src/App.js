import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Header from './components/Header';
import Draver from './components/Draver';
import Home from './pages/Home';
import {Route, Routes } from 'react-router-dom';
import Favorites from './pages/Favorites';

function App() {
  const [items, setItems] = useState([])
  const [cartOpened, setCartOpened] = useState(false)
  const [cartItems, setCartItems] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [favorites, setFavorites] = useState([])


 useEffect(() => {
    axios.get('https://62567d3252d8738c692f86e0.mockapi.io/items').then(res => {
      setItems(res.data)
    })
    axios.get('https://62567d3252d8738c692f86e0.mockapi.io/cart').then(res => {
      setCartItems(res.data)
    })
    axios.get('https://62567d3252d8738c692f86e0.mockapi.io/favorites').then(res => {
      setFavorites(res.data)
    })
    },[])

  const onRemoveItem = (id) => {
    axios.delete(`https://62567d3252d8738c692f86e0.mockapi.io/cart/${id}`)
    setCartItems((prev) => prev.filter(item => item.id !== id))
  }
  const onAddToCart = (obj) => {
    axios.post('https://62567d3252d8738c692f86e0.mockapi.io/cart', obj)
    setCartItems((prev) =>[...prev, obj])
  }

  const onAddToFavorite = async (obj) => {
    try{
    if(favorites.find((favObj) => favObj.id === obj.id)){
    axios.delete(`https://62567d3252d8738c692f86e0.mockapi.io/favorites/${obj.id}`)
    setFavorites((prev) => prev.filter(item => item.id !== obj.id))
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
  return (
    <div className="wrapper clear">
     {cartOpened && <Draver onRemove={onRemoveItem} cartItems={cartItems}  onCloseCart={()=>setCartOpened(false)}></Draver>}
     <Header onClickCart={()=>setCartOpened(true)}></Header>
     <Routes>
     <Route path='/' element={
     <Home 
        items={items} 
        searchValue={searchValue} 
        setSearchValue={setSearchValue} 
        onChangeSearchInput={onChangeSearchInput}
        onAddToFavorite={onAddToFavorite}
        onAddToCart={onAddToCart}
     ></Home>}>
     </Route>
     <Route path='/favorites' element={<Favorites items={favorites} onAddToFavorite={onAddToFavorite}></Favorites>}></Route>
     </Routes>
    </div> 
  );
}

export default App;
