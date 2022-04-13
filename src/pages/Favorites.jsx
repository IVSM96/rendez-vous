import Card from "../components/Card/Card";


function Favorites ({items, onAddToFavorite}) {
    return(
        <div className="content p-40">
        <div className="d-flex align-center mb-40 justify-between ">
          <h1>Мои закладки</h1>
          
        </div>
        <div className="d-flex flex-wrap">
        {items.map((item, index) => (<Card
         onFavorite={onAddToFavorite} 
         key={index} 
         favorited={true}
         {...item}></Card>))}
        </div>
      </div>
    )
}

export default Favorites;