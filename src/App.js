import React, {useState} from 'react';
import axios from 'axios';
import {Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Header from './components/Header/Header';
import Drawer from './components/Drawer/Drawer';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import AppContext from './context';
import Orders from './pages/Orders';
import {addCartDeleteAction, addCartPostAction, addItemRemoveAction, addFavoritesAction, addFavoritesDeleteAction} from  './redux/actions'



function App() {
  const dispatch = useDispatch()
  const cartItems = useSelector(state=>state.cartItems)
  const favorites = useSelector(state=>state.favorites)
  const [cartOpened, setCartOpened] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [isLoading, setIsLoading] = useState(true);

const onRemoveItem = (id) => {
    try{
    dispatch(addItemRemoveAction(id))
    axios.delete(`https://62567d3252d8738c692f86e0.mockapi.io/cart/${id}`)
    }catch(error) {alert('Ошибка при удалении из корзины!')}
  }
const onAddToCart = async (obj) => {
    try{
      const findItem = cartItems.find((item) =>Number(item.parentId) === Number(obj.id) )
      if(findItem) {
       await axios.delete(`https://62567d3252d8738c692f86e0.mockapi.io/cart/${findItem.id}`) 
        dispatch(addCartDeleteAction(obj))
         
      }else {
       await axios.post('https://62567d3252d8738c692f86e0.mockapi.io/cart', obj)
        dispatch(addCartPostAction(obj))
      }
    }catch(error) {
      alert('Не удалось добавить в корзину!')
    }
  }
const onAddToFavorite = async (obj) => {
    try{
    if(favorites.find((favObj) => Number(favObj.id) === Number(obj.id))){
    dispatch(addFavoritesDeleteAction(obj))
    axios.delete(`https://62567d3252d8738c692f86e0.mockapi.io/favorites/${obj.id}`)
    }else{
      const {data} = await axios.post('https://62567d3252d8738c692f86e0.mockapi.io/favorites', obj)
      dispatch(addFavoritesAction(data))
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
    <AppContext.Provider value={{cartItems, favorites, isItemAdded, onAddToCart, onAddToFavorite, setCartOpened, setIsLoading}}>
      <div className="wrapper clear">
      <Drawer opened={cartOpened} onRemove={onRemoveItem} onCloseCart={()=>setCartOpened(false)}/>
        <Header onClickCart={()=>setCartOpened(true)}/>
        <Routes>
          <Route path='/' element={
            <Home 
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
