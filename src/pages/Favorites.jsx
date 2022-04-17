import { useContext, useEffect } from "react";
import Card from "../components/Card/Card";
import AppContext from "../context";
import { store } from "../redux/store";
import {fetchFavorites} from '../redux/asyncActions'

function Favorites () {

useEffect(() => {
  store.dispatch(fetchFavorites())
})

  const {favorites, onAddToFavorite} = useContext(AppContext)
    return(
        <div className="content p-40">
        <div className="d-flex align-center mb-40 justify-between ">
          <h1>Мои закладки</h1>
          
        </div>
        <div className="d-flex flex-wrap">
        {favorites.map((item, index) => (<Card
         onFavorite={onAddToFavorite} 
         key={index} 
         favorited={true}
         {...item}/>))}
        </div>
      </div>
    )
}

export default Favorites;