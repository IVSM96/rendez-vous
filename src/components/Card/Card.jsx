import React, { useState } from "react";
import styles from './Card.module.scss';

function Card({id, imageUrl, title, price, onPlus, onFavorite, favorited=false}) {
    const [isAdded, setIsAdded] = useState(false);
    const [isFavorite, setIsFavorite] = useState(favorited);
    
    const onClickPlus = () => {
        onPlus({imageUrl, title, price})
        setIsAdded(!isAdded)
    };
    const onClickFavorite = () => {
        onFavorite({ id, imageUrl, title, price})
        setIsFavorite(!isFavorite)
    }
    return(
    <div className={styles.card}>
        <div  onClick={onClickFavorite} className={styles.favorite}>
            <img src={isFavorite?"favorite_active.svg" :"favorite.svg"} alt=""></img>
        </div>
        <img width={133} height={112} src={imageUrl} alt=""></img>
        <h5>{title}</h5>
        <div className="d-flex justify-between align-center">
      <div className="d-flex flex-column">
            <span>Цена:</span>
            <b>{price} руб.</b>
            </div>
            <button onClick={onClickPlus} className={isAdded ? styles.buttonActive : styles.button}><img width={11} height={11} src={isAdded ? 'done.svg' : 'add.svg'} alt=""></img></button>
        </div>
    </div>  
    )
}


export default Card;

