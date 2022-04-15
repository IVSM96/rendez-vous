import React, { useState, useContext } from "react";
import styles from './Card.module.scss';
import ContentLoader from 'react-content-loader';
import AppContext from "../../context";



function Card({loading=false, id, imageUrl, title, price, onPlus, onFavorite, favorited=false, added=false}) {
  const {isItemAdded} = useContext(AppContext)
  const [isFavorite, setIsFavorite] = useState(favorited);
  const obj = {id, parentId: id, imageUrl, title, price}
    
const onClickPlus = () => {
  onPlus(obj)
}
const onClickFavorite = () => {
  onFavorite(obj)
  setIsFavorite(!isFavorite)
}

return(
    <div className={styles.card}>
        {
        loading ? 
          <ContentLoader 
            speed={2}
            width={150}
            height={200}
            viewBox="0 0 150 187"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
          >
            <rect x="0" y="0" rx="10" ry="10" width="150" height="90" /> 
            <rect x="1" y="100" rx="5" ry="5" width="150" height="15" /> 
            <rect x="1" y="129" rx="5" ry="5" width="60" height="30" /> 
            <rect x="109" y="128" rx="10" ry="10" width="40" height="30" /> 
            <rect x="134" y="137" rx="0" ry="0" width="1" height="6" />
          </ContentLoader> : 
          <>
          {onFavorite && (
          <div  onClick={onClickFavorite} className={styles.favorite}>
          <img src={isFavorite?"favorite_active.svg" :"favorite.svg"} alt=""></img>
          </div>
          )}
          <img width={133} height={112} src={imageUrl} alt=""></img>
          <h5>{title}</h5>
          <div className="d-flex justify-between align-center">
          <div className="d-flex flex-column">
          <span>Цена:</span>
          <b>{price} руб.</b>
          </div>
          {onPlus && (
              <button onClick={onClickPlus} className={isItemAdded(id) ? styles.buttonActive : styles.button}><img width={11} height={11} src={isItemAdded(id) ? 'done.svg' : 'add.svg'} alt=""></img></button>
          )}
          </div>
          </>
        }
    </div>  
    )
}


export default Card;

