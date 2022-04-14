import React, { useContext } from "react";
import AppContext from "../../context";



const Info = ({ image, title, description}) => {
    const {setCartOpened} = useContext(AppContext)
    return(
        <div className="cartEmpty d-flex align-center justify-center flex-column flex">
            <img className="mb-20" width={120} height={120} src={image} alt=""></img>
            <h2>{title}</h2>
            <p className="opacity-6">{description}</p>
            <button onClick={() => setCartOpened(false)} className="greenButton"><img src="arrow.svg" alt=""></img>Вернуться назад</button>
        </div>
    )
}

export default Info;