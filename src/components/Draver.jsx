import React from "react";


function Draver({onCloseCart, cartItems = []}) {
    return(
    <div className="overlay">
    <div className="drawer">
          <h2 className="mb-30 d-flex justify-between">Корзина<button onClick={onCloseCart} className="button cu-p"><img width={11} height={11} src="close.svg" alt=""></img></button></h2>
          <div className="items">
         {cartItems.map((obj) => (
           <div className="cartItem d-flex align-center mb-20 ">
           <img className="mr-20" width={70} height={70} src={obj.imageUrl} alt=""></img>
           <div className="mr-20">
             <p className="mb-5">{obj.title}</p>
             <p>{obj.price} руб.</p>
           </div>
           <button className="button mr-15"><img width={11} height={11} src="close.svg" alt=""></img></button>
         </div>
         ))}
          </div>
          <div className="CartTotalBlock">
          <ul>
            <li>
              <span>Итого:</span>
              <div></div>
              <b>21 498 руб.</b>
            </li>
            <li>
            <span>Налог 5%:</span>
              <div></div>
              <b>1074 руб.</b>
            </li>
          </ul>
          <button className="greenButton">Оформить заказ<img src="arrow.svg" alt=""></img></button>
          </div>
    </div>
    </div>
    )
}

export default Draver;