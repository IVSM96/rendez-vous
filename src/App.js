import React, {useEffect, useState} from 'react';
import Card from './components/Card/Card';
import Header from './components/Header';
import Draver from './components/Draver';

function App() {
  const [items, setItems] = useState([])
  const [cartOpened, setCartOpened] = useState(false)
  const [cartItems, setCartItems] = useState([])

 useEffect(() => {
    fetch('https://62567d3252d8738c692f86e0.mockapi.io/items')
    .then((res) => {
      return res.json();
    })
    .then((json) => {
      setItems(json)
    })
    },[])

  const onAddToCart = (obj) => {
    setCartItems([...cartItems, obj])
  }
  return (
    <div className="wrapper clear">
     {cartOpened && <Draver cartItems={cartItems}  onCloseCart={()=>setCartOpened(false)}></Draver>}
     <Header onClickCart={()=>setCartOpened(true)}></Header>
     <div className="content p-40">
       <div className="d-flex align-center mb-40 justify-between ">
         <h1>Предложение недели</h1>
         <div className="search-block d-flex">
          <img src="search.svg" alt=""></img>
          <input placeholder="Поиск..."></input>
         </div>
       </div>
       <div className="d-flex flex-wrap">
            {items.map(item => (<Card onPlus={(obj) => onAddToCart(obj)} title={item.name} price={item.price} imageUrl={item.imageUrl}></Card>))}
       </div>
     </div>
    </div>
  );
}

export default App;
