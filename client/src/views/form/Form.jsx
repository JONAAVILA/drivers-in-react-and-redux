import axios from 'axios';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { handleAlert } from '../../redux/Actions';
import Alert from '../../components/alert/Alert';
import validate from './validate';
import './Form.css';

const Form = ()=>{
    const teams = useSelector(state => state.teams)
    const alert = useSelector(state => state.alert)
    const dispatch = useDispatch()
    const [ profile, setProfile ] = useState({
        name: {
            forename: '',
            surname: ''
        },
        nationality: '',
        image: {
            url: ''
        },
        dob: '',
        description: '',
        teams: []
    })
    const [ selectTeam, setSelectedTeam ] = useState("")
    const [ errors, setErrors ] = useState({})

    const handleTeams = ()=>{
        const valueFound = profile.teams.find(team => team === selectTeam)
        if(valueFound){
            dispatch(handleAlert(`${selectTeam} is already found`))
        }else if(selectTeam.length === 0){
            dispatch(handleAlert('Selected a team'))
        }else{
            setProfile(prevProfile =>({
                ...prevProfile,
                teams: [...prevProfile.teams, selectTeam]
            }))
        }
    } 
    
    const handleDeleteTeam = (event)=>{
        const { id } = event.target
        const teamsFiltered = profile.teams.filter(t => t !== id)
        setProfile(prevProfile =>({
            ...prevProfile,
            teams: teamsFiltered
        }))
    }

    const handleDriver = (event)=>{
        const { id, value } = event.target
    
        const valueNew = value
        const validateError = validate({[id]:value})
    
        if(validateError) setErrors(prevErrors => ({
            ...prevErrors,
            [id]: validateError ? validateError[id] : null
        }))
        if(id === 'name' && !validateError.name){
            setProfile(prevProfile =>({
                ...prevProfile,
                name:{
                    ...prevProfile.name,
                    forename: valueNew,
                }
            }))
        }
        if(id === 'surname' && !validateError.surname){
            setProfile(prevProfile =>({
                ...prevProfile,
                name:{
                    ...prevProfile.name,
                    surname: valueNew
                }
            }))
        }
        if(id === 'nationality' && !validateError.nationality){
            setProfile(prevProfile =>({
                ...prevProfile,
                [id]: valueNew
            }))
        }
        if(id === 'image' && !validateError.image){
            setProfile(prevProfile =>({
                ...prevProfile,
                image:{
                    url: value
                }
            }))
        }
        if(id === 'description' && !validateError.description){
            setProfile(prevProfile =>({
                ...prevProfile,
                [id]: value
            }))
        }   
        if(id === 'dob'){
            setProfile(prevProfile =>({
                ...prevProfile,
                [id]: value
            }))
        }
    }   
    
    const handleSubmit = async (event)=>{
        try {
            event.preventDefault()
            const response = await axios.post('http://localhost:3001/drivers/create', profile)
            dispatch(handleAlert(response.data.message))
            setProfile({
                name: {
                    forename: '',
                    surname: ''
                },
                nationality: '',
                image: {
                    url: ''
                },
                dob: '',
                description: '',
                teams: []
            })
        } catch (error) {
            dispatch(handleAlert(error.response.data.error))
        }
    }
   
    const forename = profile.name.forename.split(" ").map(f => f.trim()[0]?.toUpperCase()+f.slice(1)+ " ")
    const forenameFixed = forename.filter(item => item !== 'undefined ')

    return(
        <div className="conteiner_form" >
            {alert ? <Alert/> : null}
            <div className='box_inputs' >
                    <h2>Driver details</h2>
                    <input placeholder="Name"
                           onChange={handleDriver}
                           id='name'
                           value={profile.name.forename}
                           type="text"
                           required/>
                           <div className='p_errors' >
                                {errors? (<p>{errors.name}</p>):(null)}
                           </div>
                    <input placeholder="surname"
                           onChange={handleDriver} 
                           id='surname' 
                           value={profile.name.surname}
                           type="text"/> 
                           <div className='p_errors' >
                                {errors? (<p className='p_errors' >{errors.surname}</p>):(null)}
                           </div>
                    <input placeholder="Nationality" 
                           onChange={handleDriver} 
                           id='nationality' 
                           value={profile.nationality}
                           type="text"/> 
                           <div className='p_errors' >
                                {errors? (<p className='p_errors' >{errors.nationality}</p>):(null)}
                           </div>
                    <input placeholder='Url image'
                           onChange={handleDriver} 
                           id='image' 
                           value={profile.image.url}
                           type="url"/> 
                           <div className='p_errors' >
                                {errors? (<p className='p_errors' >{errors.image}</p>):(null)}
                           </div>
                    <input type="date" 
                           onChange={handleDriver} 
                           id='dob' 
                           value={profile.dob}/>
                    <div className='box_texarea' >
                        <textarea onChange={handleDriver}
                                    placeholder="Description"
                                  id='description'
                                  value={profile.description}
                                  type="text"/>
                                  <div className='p_errors' >
                                        {errors? (<p className='p_errors' >{errors.description}</p>):(null) }
                                  </div>
                    </div>
                    <div>
                        <select value={selectTeam} onChange={(e) => setSelectedTeam(e.target.value)} id="team">
                            <option value=''>Select Team</option>
                            {teams.map(team =>{
                            return(
                                <option key={team.id} value={team.name}>{team.name}</option>
                                )
                            })}
                        </select> 
                        <button onClick={handleTeams}>Select</button>  
                    </div>
                    <div>
                        <button onClick={handleSubmit} >Create</button>
                    </div>
                    <div className='box_teams_map' >
                        {profile.teams?.map(team =>{
                            return(
                                <div className='team_map' >
                                    <p>{team}</p>
                                    <svg id={team} onClick={handleDeleteTeam}
                                         xmlns="http://www.w3.org/2000/svg"
                                         width="15"  
                                         height="15"  
                                         viewBox="0 0 24 24"  
                                         fill="none"  
                                         stroke="currentColor" 
                                         stroke-width="3"  
                                         stroke-linecap="round"  
                                         stroke-linejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                        <path d="M18 6l-12 12" />
                                        <path d="M6 6l12 12" />
                                    </svg>
                                </div>
                            )
                        })}
                    </div>
            </div>
            <div className='box_preview' >
                <div className='box_tittle_preview' >
                    <h2>Preview</h2>
                </div>
                <div className="box_card_form">
                    {profile.image.url ? <div className='esqueleton_image'
                         style={{backgroundImage:`url(${profile.image.url})`,
                                 backgroundSize: 'cover',
                                 backgroundRepeat: 'no-repeat',
                                 backgroundPosition: 'center', 
                                }} /> : <div className='esqueleton_image' /> }
                    {profile.image.url?(<img src={profile.image.url}/>):
                    (<div className='esqueleton_profile_image'/>)}
                    {forenameFixed[0] ? <h1>{forenameFixed}</h1> : <div className='squeleton forename' />}
                    {profile.name.surname ? <h2>{profile.name.surname[0].toUpperCase()+profile.name.surname.slice(1)}</h2> : <div className='squeleton surname' />}
                    {profile.nationality ? <h4>{profile.nationality[0].toUpperCase()+profile.nationality.slice(1)}</h4> : <div className='squeleton other' />}
                    {profile.dob ? <h4>{profile.dob}</h4> : <div className='squeleton dob' />}
                    {profile.description ? <p>{profile.description}</p> : <div className='squeleton description' />}
                    <div>
                        {profile.teams.length ? <p>{profile.teams.toString()}</p> : <div className='squeleton teams' />}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Form;