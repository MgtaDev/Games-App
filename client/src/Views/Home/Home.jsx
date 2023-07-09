import style from './Home.module.css'
// import ButtonsContainer from '../Components/ButtonsContainer/ButtonsContainer.jsx'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addGames, addGamesDb } from '../../Redux/Actions'
import Pagination  from "../Pagination/pagination";
import Loading2 from '../Loading 2/Loading2'
import NavBar from '../Components/NavBar/NavBar'
import NavBar2 from '../Components/NavBar/NavBar2';

const Home = () => {
    const dispatch = useDispatch()
    const games = useSelector((state) => state.games)
    
    useEffect(()=>{
        dispatch(addGamesDb())
        dispatch(addGames())
    }, [dispatch])
    

    return(
        <div className={style.Home}>
            {
                games.length >= 1
                ? <>
                <NavBar />
                <NavBar2 />
                <div className={style.logo}>
                </div>
                <br /> <br /> <br /> <br /> <br />
                <Pagination />
                </> 
                : 
                <><NavBar /><NavBar2 /><Loading2 /></>
            }
            {/* <ButtonsContainer/>
            <Pagination/> */}
        </div>
    )
}
export default Home;