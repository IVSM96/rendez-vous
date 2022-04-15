import React, { useContext } from "react";
import AppContext from "../../context";
import styles from './Info.module.scss'


const Info = ({ image, title, description}) => {
    const {setCartOpened} = useContext(AppContext)
    return(
        <div className="cartEmpty d-flex align-center justify-center flex-column flex">
            <img className="mb-20" width={120} height={120} src={image} alt=""></img>
            <h2>{title}</h2>
            <p className={styles.description}>{description}</p>
            <button onClick={() => setCartOpened(false)} className={styles.greenButton}><img src="arrow_reverse.svg" alt=""></img>Вернуться назад</button>
        </div>
    )
}

export default Info;