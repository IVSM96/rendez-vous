import { useContext } from "react";
import Card from "../components/Card/Card";
import AppContext from "../context";
import axios from "axios";
import { store } from "../redux/store";
import {addFavoritesFetchAction} from '../redux/actions'

function Favorites () {

const fetchFavorites  = () => {
    return dispatch => {
     axios.get('https://62567d3252d8738c692f86e0.mockapi.io/favorites').then(res=>dispatch(addFavoritesFetchAction(res.data)))
    }
}
store.dispatch(fetchFavorites())

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