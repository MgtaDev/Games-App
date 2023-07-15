import style from './NavBar.module.css'
import { NavLink } from 'react-router-dom'
import SearchBar from '../SearchBar/SearchBar'
import logo from '../../assets/Logo.png'
const NavBar = () => {    
   
    
    return(
        <nav className={style.topBar}>
            <NavLink to={'/'}>
            <img src={logo} alt="" />
            </NavLink>

            <SearchBar/>


        <div className={style.navButtons}>
            
            <NavLink to='/form'>
               <button className={style.navB}>Create</button> 
            </NavLink>
            <NavLink to='/about'>
                <button className={style.navB2}>About me</button> 
            </NavLink>
           
        </div>

        </nav>
    )
}
export default NavBar;