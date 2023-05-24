import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { inputSenderName, inputSenderTel, inputAddressName, inputAddressTel, 
         inputStartingPoint, inputDestination, inputPostDescription, inputQuantity, inputWeight, inputDroneId, setIsOrder } from '../../slices/orderSlice';
import './Reservation.css';
import axios from "axios";
import {Link} from 'react-router-dom';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import campusmap from '../../imgs/campusmap.jpg';
import background from '../../imgs/background.jpg';
import InputAdornment from '@mui/material/InputAdornment';

const place = [
    {label:'AI공학관'}, {label:'가천관'}, {label:'공과대학1'}, {label:'공과대학2'}, {label:'교육대학원'}, {label:'바이오나노대학'},
    {label:'바이오나노연구원'}, {label:'비전타워'}, {label:'산학협력관1'}, {label:'산학협력관2'},
    {label:'예술·체육대학'}, {label:'중앙도서관'}, {label:'학생회관'}, {label:'학생생활관'}
];

function Reservation(){
    const [isClicked, setIsClicked] = useState(false);
    const dispatch = useDispatch();

    const handleOnSenderName = (e) => {
        dispatch(inputSenderName(e.target.value));
    }

    const handleOnSenderTel = (e) => {
        dispatch(inputSenderTel(e.target.value));
    }

    const handleOnAddressName = (e) => {
        dispatch(inputAddressName(e.target.value));
    }

    const handleOnAddressTel = (e) => {
        dispatch(inputAddressTel(e.target.value));
    }

    const handleOnStartingPoint = (e) => {
        dispatch(inputStartingPoint(e.target.value));
    }

    const handleOnDestination = (e) => {
        dispatch(inputDestination(e.target.value));
    }

    const handleOnPostDescription = (e) => {
        dispatch(inputPostDescription(e.target.value));
    }

    const handleOnWeight = (e) => {
        dispatch(inputWeight(e.target.value));
    }

    const handleOnQuantity = (e) => {
        dispatch(inputQuantity(e.target.value));
    }

    const droneSelect = (id) => {
        dispatch(inputDroneId(id));
        setIsClicked(true);
    }
    
    function ShowOrderInfo() {
        const droneID = useSelector((state) => state.order.droneId);
        var key = 'drone'.concat(String(droneID.payload));
        const selectedDrone = useSelector((state) => state[key]);
        return (
            isClicked &&
            <div className='place'>
                <h2>Selected Drone</h2>
                <br/>
                <h4>Name: {selectedDrone.name}</h4>
                <h4>Price: {selectedDrone.price}</h4>
                <img className="drone-img" src={selectedDrone.img} alt={key}/>
            </div>  
        );
    }

    const orderCheck = (e) => {
        dispatch(setIsOrder());
    }

    return(   
        <div className="res_background">
             <div className="home-container">
                <img className="home-image" src={background} alt="background"/> 
                
            <div className="res_sender">
            <h1>Reservation</h1>
            <br/><br/>
                <TextField
                    required
                    label="Sender Name"
                    onChange={handleOnSenderName}
                /> <div className="margin"></div>

                <TextField
                    required
                    label="Sender Tel"
                    onChange={handleOnSenderTel}
                />  <div className="margin"></div> <div className="margin"></div>
                
                <TextField
                    required
                    label="Addressee Name"
                    onChange={handleOnAddressName}
                />  <div className="margin"></div>
            
                <TextField
                    required
                    label="Addressee Tel"
                    onChange={handleOnAddressTel}
                />  <div className="margin"></div> <div className="margin"></div> <div className="margin"></div>
                
                <div className="place">
                <img className="map-image" src={campusmap} alt="campusmap"/>    
                <TextField
                    id="outlined-select-currency"
                    select
                    label="Starting point"
                    defaultValue="AI공학관"
                    helperText="Please select starting point"
                    onChange={handleOnStartingPoint}
                >
                    {place.map((option)=>(
                    <MenuItem key={option.label} value={option.label}>
                        {option.label}
                    </MenuItem>
                    ))}
                </TextField>
                <div className="margin"></div>
              

                <TextField
                    id="outlined-select-currency"
                    select
                    label="Destination"
                    defaultValue="가천관"
                    helperText="Please select destination"
                    onChange={handleOnDestination}
                >
                    {place.map((option)=>(
                    <MenuItem key={option.label} value={option.label}>
                        {option.label}
                    </MenuItem>
                    ))}
                </TextField>
                </div>
                <div className="margin"></div><div className="margin"></div> <div className="margin"></div>
            
                <TextField
                    required
                    label="Post Description"
                    onChange={handleOnPostDescription}
                />  <div className="margin"></div>

                <TextField
                    required
                    label="Weight"
                    onChange={handleOnWeight}
                    InputProps={{
                        endAdornment: <InputAdornment position="end">kg</InputAdornment>,
                    }}
                /> <div className="margin"></div>
               
               <TextField
                    required label="Quantity"
                    onChange={handleOnQuantity}
                />
                <div class="select-button-container">

                <button className='drone-select-button' onClick={() => droneSelect('0')}>0g~400g </button>
                <button className='drone-select-button' onClick={() => droneSelect('1')}>400g~6.2kg </button>
                <button className='drone-select-button' onClick={() => droneSelect('2')}>6.2kg~24.5kg </button>
                <button className='drone-select-button' onClick={() => droneSelect('3')}>24.5kg~79kg </button>
                </div>
                <br />

                <ShowOrderInfo />

                <br />
                <br />
                <div class="button-container">
                    <Link to="http://localhost:3000/result">
                        <button className='apply_button' onClick={orderCheck}> Apply </button>
                    </Link>
                </div>

            </div>
            </div>
        </div>
    )
}

export default Reservation;