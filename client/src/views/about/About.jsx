import './About.css'
import react from './../../assets/svg/react.svg';
import javascript from './../../assets/svg/javascript.svg'
import redux from './../../assets/svg/redux.svg'
import express from './../../assets/svg/express.svg'
import postgreSql from './../../assets/svg/postgreSql.svg'
import html from './../../assets/svg/html.svg'
import css from './../../assets/svg/css.svg'
import sequelize from './../../assets/svg/sequelize.svg'
import github from './../../assets/svg/github.svg'
import linkeding from './../../assets/svg/linkeding.svg'
import dotenv from './../../assets/svg/dotenv.svg'
import axios from './../../assets/svg/axios.svg'
import nodemon from './../../assets/svg/nodemon.svg'
import node from './../../assets/svg/node.svg'
import vite from './../../assets/svg/vite.svg'

const About = ()=>{
    return(
        <div className="box_about" >
            <div className='conteiner_info' >
                <div className='box_info_creator' >
                    <img className='image_creator' src='./../../../src/assets/img/jonatan_avila.jpeg'/>
                    <div className='tittle_creator' >
                        <h1>Jonatan Daniel Avila</h1>
                        <h4>Desarrollador Web Full Stack</h4>
                    </div>
                    <div className='box_icon_networks' >
                        <a href="https://github.com/JONAAVILA/drivers-in-react-and-redux" 
                           target="_blank" 
                           rel="noreferrer" >
                            <img className='icons_creator' src={github}/>
                        </a>
                        <a href="https://www.linkedin.com/in/jonathan-avila-1b1931238/"
                           target="_blank" 
                           rel="noreferrer" >
                            <img className='icons_creator'  src={linkeding}/>
                        </a>
                    </div>
                </div>
                <div className='box_info_proyect' >
                    <h2>Academic project, SPA of drivers throughout history</h2>
                    <p>In this web application we worked on both the FrontEnd and the BackEnd from scratch, and an API and Server were also created to consume from the front.</p>
                    <h4>FrontEnd:</h4>
                    <p>It has a Landing, Home, Form, Details of each driver and About.</p>
                    <p>On the front end, React was used to render each component and use some local states, such as the values of each form input. In addition, Redux was used for global states, of which, for example, the alert status is managed from there and others such as the loading of drivers for later use, filtering and sorting.</p>
                    <h4>Features del FrontEnd:</h4>
                    <ul>
                        <li>Search by "name".</li>
                        <li>Filtered by “origin”, for example, information from the API or from the Database.</li>
                        <li>Filtered by “teams”. Each driver has one or more teams.</li>
                        <li>Sorted “ascending” or “descending” alphabetically.</li>
                        <li>Sorted by “age”, from youngest to oldest or vice versa.</li>
                        <li>Button to “refresh” the Home.</li>
                        <li>Form for creating drivers, it has name, surname, nationality, date of birth, description, teams and profile image.</li>
                    </ul>
                    <h4>Technologies implemented:</h4>
                    <div className='box_tecnologies' >
                        <img className='icons_about' src={html}/>
                        <img className='icons_about' src={css}/>
                        <img className='icons_about' src={javascript}/>
                        <img className='icons_about' src={react}/>
                        <img className='icons_about' src={redux}/>
                        <img className='icons_about' src={axios}/>
                        <img className='icons_about' src={nodemon}/>
                        <img className='icons_about' src={node}/>
                        <img className='icons_about' src={vite}/>
                    </div>
                    <h4>BackEnd</h4>
                    <p>In the backend, PostgreSQL and Sequelize were used to create the database, in which the “drivers” and “teams” models were designed with a many-to-many relationship, in addition to the intermediate table created by Sequelize to relate them.</p>
                    <p>On the Server, Express was used to build the API and be able to consume it later.</p>
                    <h4>Features del BackEnd:</h4>
                    <ul>
                        <li>Get driver by “name” ( <span className='span_get' >GET</span> - http://localhost:3001/drivers/name )</li>
                        <li>Obtain driver by “id” (<span className='span_get' >GET</span> - http://localhost:3001/drivers/idDriver ) </li>
                        <li>Get all the drivers, either from the API or from the Database (<span className='span_get' >GET</span> - http://localhost:3001/drivers )</li>
                        <li>Obtain all the drivers teams found in the API (<span className='span_get' >GET</span> - http://localhost:3001/teams )</li>
                        <li>Create a driver and save it in the Database (<span className='span_post' >POST</span> - http://localhost:3001/drivers/create )</li>
                    </ul>
                    <h4>Technologies implemented:</h4>
                    <div className='box_tecnologies' >
                        <img className='icons_about' src={postgreSql}/>
                        <img className='icons_about' src={sequelize}/>
                        <img className='icons_about' src={express}/>
                        <img className='icons_about' src={dotenv}/>
                        <img className='icons_about' src={axios}/>
                        <img className='icons_about' src={nodemon}/>
                        <img className='icons_about' src={node}/>
                    </div>

                </div>
            </div>
        
        </div>  
    )
}

 {/* <div>
                        <img className='icons_about' src={react}/>
                        <img className='icons_about' src={javascript}/>
                        <img className='icons_about' src={redux}/>
                        <img className='icons_about' src={express}/>
                        <img className='icons_about' src={postgreSql}/>
                        <img className='icons_about' src={html}/>
                        <img className='icons_about' src={css}/>
                        <img className='icons_about' src={sequelize}/>
                    </div> */}
                    

export default About;