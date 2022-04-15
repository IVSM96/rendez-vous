import React, {useEffect, useState} from "react";
import Card from "../components/Card/Card";
import axios from 'axios'


function Orders () {
    const [orders, setOrders] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    useEffect(()=> {
        (async()=>{ 
            try {
                const {data} = await axios.get('https://62567d3252d8738c692f86e0.mockapi.io/orders')
                setOrders(data.map((obj)=> obj.items).flat())
                setIsLoading(false)
            }catch(error){
                alert('Ошибка при запросе заказов!')
            }
        })()
    },[])
    return(
        <div className="content p-40">
        <div className="d-flex align-center mb-40 justify-between ">
          <h1>Мои заказы</h1>
          
        </div>
        <div className="d-flex flex-wrap">
        {isLoading? [...Array(4)] : orders.map((item, index) => (<Card key={index} loading={isLoading} {...item}></Card>))}
        </div>
      </div>
    )
}

export default Orders;