import React, { useState } from "react";
import styles from './Card.module.scss';

function Card({imageUrl, title, price, onPlus}) {

    const [isAdded, setIsAdded] = useState(false);

    const onClickPlus = () => {
        onPlus({imageUrl, title, price})
        setIsAdded(!isAdded)
    };
    return(
    <div className={styles.card}>
        <div className={styles.favorite}>
            <img src="favorote.svg" alt=""></img>
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

