import { useDispatch, useSelector } from 'react-redux';
import { handleAlert } from '../../redux/Actions';
import alertIcon from './../../assets/svg/alertIcon.svg';
import close from './../../assets/svg/close.svg';
import create_driver from './../../assets/svg/create_driver.svg';
import './Alert.css';

const Alert = ()=>{
    const alert = useSelector(state => state.alert)
    const dispatch = useDispatch()

    return(
        <div className='box_alert' >
            {alert === 'Driver created successfully' ? <img className='alert_icon' src={create_driver}/> : <img className='alert_icon' src={alertIcon}/>}
            <p>{alert}</p>
            <img className='close_icon' src={close} onClick={()=> dispatch(handleAlert(''))}/>
        </div>
    )
}

export default Alert;