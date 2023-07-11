import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from './pagination.module.css'
import Loading from "../Loading/Loading";
import Card from "../Components/Card/Card";
import { addGames } from "../../Redux/Actions"
import ButtonsContainer from "../Components/ButtonsContainer/ButtonsContainer";

const Pagination = () => {
  const dispatch = useDispatch()

  useEffect(()=>{
      dispatch(addGames())
  }, [dispatch])
  
  const games = useSelector( state => state.games)
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedPage, setSelectedPage] = useState(1)
  const [itemsPerPage] = useState(15)
  const lastGame = currentPage * itemsPerPage;
  const firtsGame = lastGame - itemsPerPage
  const currentGames = games.slice(firtsGame,lastGame)
  console.log(games)
  
  const generatePageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(games.length / itemsPerPage); i++) {
    pageNumbers.push({number:i, selected: i === selectedPage});
  }
  return pageNumbers;
};

const handlePrevPage = () => {
    setCurrentPage(currentPage - 1 );
    setSelectedPage(selectedPage - 1);
  };
  
  const handleNextPage = () => {
    setCurrentPage(currentPage + 1 );
    setSelectedPage(selectedPage + 1);
  };
  
  
const pageNumbers = generatePageNumbers();

    return(
        
        <div className={style.Pagination}>

            {
              games.length === 1
              ? ''
              : <div className={style.pageButtons}>
              <button className={style.unselected} onClick={handlePrevPage} disabled={currentPage === 1}>
                {"<"}
              </button>
              {pageNumbers.map((page) => (
                
                <button
                key={page.number}
                onClick={() => {
                setCurrentPage(page.number);
                setSelectedPage(page.number);
                }}
                className={`${style.pageButton} ${
                page.selected ? style.selected : style.unselected
                } ${page.number === selectedPage ? style.selected  :''}`}
                >
                {page.number}
                </button>
            ))}
              <button
                className={style.unselected}
                onClick={handleNextPage}
                disabled={lastGame >= games.length}
              >
                {">"}
              </button>
            </div>
            }
          {
            games.length > 1 
            ? <><h2 className={style.headerPagination}> Games: <ButtonsContainer /></h2></>
            : ''
          }
            <div className={style.cardsContainer}>
            
            {currentGames ?
                currentGames.map((game) => (
                  <Card
                    key={game.id}
                    id={game.id}
                    img={game.image}
                    name={game.name}
                    genres={game.genres}
                    release={game.release}
                    ratings={game.ratings}
                  /> 
               ))
              : 
               <Loading/>
              }
             
             
          
          
          {
            lastGame >= games.length
            ? ''
            :  <div className={style.pageButtons}>
            <button className={style.unselected} onClick={handlePrevPage} disabled={currentPage === 1}>
              {"<"}
            </button>
            {pageNumbers.map((page) => (
              
              <button
              key={page.number}
              onClick={() => {
              setCurrentPage(page.number);
              setSelectedPage(page.number);
              }}
              className={`${style.pageButton} ${
              page.selected ? style.selected : style.unselected
              } ${page.number === selectedPage ? style.selected  :''}`}
              >
              {page.number}
              </button>
          ))}
            <button
              className={style.unselected}
              onClick={handleNextPage}
              disabled={lastGame >= games.length}
            >
              {">"}
            </button>
          </div>
          }
         

        </div>
        
 </div>
    )
}
export default Pagination;