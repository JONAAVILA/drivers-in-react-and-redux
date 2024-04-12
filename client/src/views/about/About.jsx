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

const About = ()=>{
    return(
        <div className="box_about" >
            <div className='box_info_proyect' >
                <div>
                    <h2>Detail of proyect</h2>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi quasi asperiores nulla illum, sint alias perferendis accusantium consectetur commodi maiores dolores ab id non praesentium ipsam autem reiciendis harum modi atque facere tempore est neque. Debitis illum delectus unde molestias.
                    </p>
                </div>
                <div className='box_info_tecnologies' >
                    <h4>Technologies applied in this project</h4>
                    <div>
                        <img className='icons_about' src={react}/>
                        <img className='icons_about' src={javascript}/>
                        <img className='icons_about' src={redux}/>
                        <img className='icons_about' src={express}/>
                        <img className='icons_about' src={postgreSql}/>
                        <img className='icons_about' src={html}/>
                        <img className='icons_about' src={css}/>
                        <img className='icons_about' src={sequelize}/>
                    </div>
                </div>
            </div>
            <div className='box_info_creator' >
                <h2>Jonatan Daniel Avila</h2>
                <h4>Desarrollador Web Full Stack</h4>
                <img className='image_creator' src='./../../../public/jonatan_avila.jpeg'/>
                <div>
                    <a href="https://github.com/JONAAVILA/Drivers" 
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
        </div>  
    )
}

export default About;