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
    const [ profile,setProfile ] = useState({
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
        if(profile.teams.length === 10) return dispatch(handleAlert('Too many teams'))
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
        const teamsFiltered = profile.team.filter(t => t !== id)
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
                <div className="box_card_form">
                    <h2>Preview</h2>
                    <div className='back_image'
                         style={{backgroundImage:`url(${profile.image.url})`,
                                 backgroundSize: 'cover',
                                 backgroundRepeat: 'no-repeat',
                                 backgroundPosition: 'center', 
                                }} ></div>
                    {profile.image.url?(<img src={profile.image.url}  alt="" />):
                    (<svg  xmlns="http://www.w3.org/2000/svg"
                           width="100" 
                           height="100"
                           viewBox="0 0 24 24"  
                           fill="none"  
                           stroke="currentColor">
                       <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                       <path d="M10 9a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                       <path d="M4 8v-2a2 2 0 0 1 2 -2h2" />
                       <path d="M4 16v2a2 2 0 0 0 2 2h2" />
                       <path d="M16 4h2a2 2 0 0 1 2 2v2" />
                       <path d="M16 20h2a2 2 0 0 0 2 -2v-2" />
                       <path d="M8 16a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2" />
                    </svg>)}
                    {profile.name.forename && <h1>{profile.name.forename}</h1>}
                    {profile.name.surname && <h2>{profile.name.surname}</h2>}
                    {profile.nationality && <h4>{profile.nationality}</h4>}
                    {profile.dob && <h4>{profile.dob}</h4>}
                    {profile.description && <p>{profile.description}</p>}
                    <div>
                        {profile.teams && <p>{profile.teams.toString()}</p>}
                    </div>
                </div>
              
            </div>
        </div>
    )
}

export default Form;