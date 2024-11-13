import React, { useContext, useState } from 'react';
import "./reserveRoom.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import useFetch from '../../hooks/useFetch';
import { SearchContext } from '../../context/SearchContext';
import axios from 'axios';

const ReserveRoom = ({ setOpen, hotelId }) => {

  const {data, loading, error} = useFetch(`http://localhost:5000/api/hotels/rooms/${hotelId}`);
  const [selectedRooms, setSelectedRooms] = useState([]);
  const {state} = useContext(SearchContext);
  const {startDate, endDate} = state.dates[0];

  const handleSelect = (e) => {
    const selected = e.target.checked;
    const value = e.target.value;

    setSelectedRooms(selected ? [...selectedRooms, value] : selectedRooms.filter((room) => room !== value));
  }

  const getDatesInRange = (startDate, endDate) => {
    let datesRange = [];

    let date = new Date(startDate)

    while(date <= endDate) {
        datesRange.push(new Date(date).getTime());
        date.setDate(date.getDate() + 1);
    }

    return datesRange;
  }

  const allDates = getDatesInRange(startDate, endDate);

  const isAvailable = (roomNumber) => {
    // The some() method of Array instances tests whether at least one element in the array passes the test implemented by the provided function. It returns true if, in the array, it finds an element for which the provided function returns true; otherwise it returns false. It doesn't modify the array.
    const isFound = roomNumber.unavailableDates.some((date) => (
        allDates.includes(date)
    ));

    return !isFound;
  }

  const handleReserve = async (e) => {
    try {
        await Promise.all(selectedRooms.map((roomId) => {
            const res = axios.put(`http://localhost:5000/api/rooms/availability/${roomId}`, {dates: allDates});
            return res.data;
        }))
    } catch(err) {

    }
  }

  return (
    <div className='reserve-room'>
        <div className='reserve-container'>
            <FontAwesomeIcon icon={faCircleXmark} className='close-btn' onClick={() => setOpen(false)} />

            <span>Select your rooms:</span>
            {loading ? <p style={{marginTop: "20px"}}>Loading... Please wait</p>: <>
                {data?.map((room) => (
                    <div key={room._id} className='room'>
                        <div className='room-info'>
                            <div className='room-title'>{room?.title}</div>
                            <div className='room-desc'>{room?.desc}</div>
                            <div className='room-maxPeople'>Max people: <b>{room?.maxPeople}</b></div>
                            <div className='room-price'>{room?.price}</div>
                        </div>

                        <div className="select-rooms">
                            {room?.roomNumbers?.map((roomNumber, i) => (
                                <div key={i} className='room-number'>
                                    <label>{roomNumber.number}</label>
                                    <input disabled={!isAvailable(roomNumber)} type="checkbox" value={roomNumber._id} onChange={handleSelect} />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

                <button onClick={handleReserve} className='reserve-btn'>Reserve Now!</button>
            </>}
        </div>
    </div>
  )
}

export default ReserveRoom