import Card from "../components/Card/Card"


function Home ({items, searchValue, setSearchValue, onChangeSearchInput, onAddToFavorite, onAddToCart}) {
    return(
        <div className="content p-40">
        <div className="d-flex align-center mb-40 justify-between ">
          <h1>{searchValue? `Поиск по запросу: "${searchValue}"`: 'Предложение недели'}</h1>
          <div className="search-block d-flex">
           <img src="search.svg" alt=""></img>
           <input value={searchValue} onChange={onChangeSearchInput} placeholder="Поиск..."></input>
          </div>
        </div>
        <div className="d-flex flex-wrap">
             {items.filter(item =>item.name.toLowerCase().includes(searchValue.toLowerCase())).map((item, index) =>
             (<Card 
             key={index}
             onFavorite={(obj)=>onAddToFavorite(obj)} 
             onPlus={(obj) => onAddToCart(obj)} 
             {...item}></Card>))}
        </div>
      </div>
    )
}

export default Home;