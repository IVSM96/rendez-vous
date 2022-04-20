import React from "react";
import { Link } from 'react-router-dom';
import {IconButton, Badge} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import {useSelector} from 'react-redux'

function Header({onClickCart}) {
  const favorites = useSelector(state=>state.favorites)
  const cartItems = useSelector(state=>state.cartItems)

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
            <li onClick={onClickCart} className="mr-30 cu-p">
            <IconButton>
              <Badge badgeContent={cartItems.length} color="secondary">
                <ShoppingCartIcon sx={{color: 'black'}} />
              </Badge>
            </IconButton>
            </li>
           <Link to="/favorites">
             <li className="mr-30 cu-p">
             <IconButton>
              <Badge badgeContent={favorites.length} color="secondary">
                <FavoriteBorderIcon sx={{color: 'black'}} />
              </Badge>
             </IconButton>
             </li>
           </Link>
           <Link to="/orders">
            <li>
            <IconButton>
              <Badge>
                <AccountCircleIcon sx={{color: 'black'}} />
              </Badge>
            </IconButton>
            </li>
           </Link>
       </ul>
    </header>
    )
}

export default Header;