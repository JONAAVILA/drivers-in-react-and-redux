import { Link } from 'react-router-dom';
import { useState } from 'react';
import home from './../../assets/svg/home.svg'
import create from './../../assets/svg/create.svg'
import about from './../../assets/svg/about.svg'
import racingFlag from './../../assets/svg/racingFlag.svg'
import arrowNav from './../../assets/svg/arrowNav.svg'
import './Nav.css';

const Nav = ()=>{
    const [ clas, setClas ] = useState("nav_buttonsOff")
    const handleNav = ()=>{
        if(clas === "nav_buttonsOn"){
            setClas("nav_buttonsOff")
        }else{
            setClas("nav_buttonsOn")
        }
    }   

    return(
        <div className='box_nav' >
            <div className='racing_flag' >
                <h1>DRIVERS AROUND THE WORD</h1>
                <img src={racingFlag}/>
            </div>
            <div className={clas} >
             <Link to='/home' >
                <img className='icons_nav' src={home}/>
            </Link>
            <Link to='/form' >
                <img className='icons_nav' src={create}/>
            </Link> 
            <Link to='/about' >
                <img className='icons_nav' src={about}/>
            </Link> 
                <img onClick={handleNav} className='arrow_nav ' src={arrowNav}/> 
            </div>  
        </div>
    )
}

export default Nav;