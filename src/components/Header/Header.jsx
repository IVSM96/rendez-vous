import React from "react";
import { Link } from 'react-router-dom';
import { useCart } from "../hooks/useCart";

function Header({onClickCart}) {
  const {totalPrice} = useCart()
    return(
    <header className="d-flex justify-between align-center">
       <Link to="/"><div className="d-flex align-center">
          <img width={40} height={60} src="logoR.svg" alt=""></img>
          <div className="headerLeft">
            <h3 className="text-uppercase">rendez-vous</h3>
            <p className="text-uppercase" >Обувь Сумки Аксессуары</p>
          </div>
       </div></Link>
       <ul className="d-flex">
           <li onClick={onClickCart} className="mr-30 cu-p"><svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 0 24 24" width="18px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M15.55 13c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.37-.66-.11-1.48-.87-1.48H5.21l-.94-2H1v2h2l3.6 7.59-1.35 2.44C4.52 15.37 5.48 17 7 17h12v-2H7l1.1-2h7.45zM6.16 6h12.15l-2.76 5H8.53L6.16 6zM7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/></svg><span>{totalPrice} руб.</span></li>
           <Link to="/favorites"><li className="mr-20 cu-p"><img src='favorite.svg' alt=""></img></li></Link>
           <Link to="/orders"><li><img src="account.svg" alt=""></img></li></Link>
       </ul>
    </header>
    )
}

export default Header;