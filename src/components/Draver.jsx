import React, {useState, useContext} from "react";
import Info from "./Info/Info";
import AppContext from "../context";
import axios from "axios";

function Draver({onCloseCart, onRemove}) {
  const {setCartItems, cartItems} = useContext(AppContext);
  const [isOrderComplete, setIsOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const onClickOrder = async () => {
    try {
      setIsLoading(true)
      const {data} = await axios.post('https://62567d3252d8738c692f86e0.mockapi.io/orders', {items: cartItems})
      setOrderId(data.id)
      setIsOrderComplete(true)
      setCartItems([])
      for(let i = 0; i < Array.lenth; i++) {
        const item = cartItems[i];
        await axios.delete('https://62567d3252d8738c692f86e0.mockapi.io/cart' + item.id)
      }
    }catch(error){
       alert('шибка при создании заказа')
    }
    setIsLoading(false)
 }  
  return(
    <div className="overlay">
    <div className="drawer">
          <h2 className="mb-30 d-flex justify-between">Корзина<button onClick={onCloseCart} className="button cu-p"><img width={11} height={11} src="close.svg" alt=""></img></button></h2>
          {cartItems.length > 0 ? (
          <div className=""> 
              <div className="items">
                  {cartItems.map((obj) => (
                    <div key={obj.id} className="cartItem d-flex align-center mb-20 ">
                    <img className="mr-20" width={70} height={70} src={obj.imageUrl} alt=""></img>
                    <div className="mr-20">
                    <p className="mb-5">{obj.title}</p>
                    <p>{obj.price} руб.</p>
                    </div>
                    <button onClick={()=>onRemove(obj.id)} className="button mr-15"><img width={11} height={11} src="close.svg" alt=""></img></button>
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
          <button disabled={isLoading} onClick={onClickOrder} className="greenButton">Оформить заказ<img src="arrow.svg" alt=""></img></button>
          </div>
            </div> 
        ) : (
          <Info
           title={isOrderComplete? "Заказ оформлен" :"Корзина пустая" } 
           description={isOrderComplete? `Ваш заказ №${orderId} скоро будет передан курьерской доставке` : "Добавьте любой товар в вашу корзину, чтобы сделать заказ."} 
           image="box.png">
          </Info>
            )}
    </div>
    </div>
    )
}

export default Draver;