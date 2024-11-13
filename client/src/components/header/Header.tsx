import React, { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed, faCalendarDays, faCar, faPerson, faPlane, faTaxi } from '@fortawesome/free-solid-svg-icons';
import "./header.css";
import { DateRange, RangeKeyDict } from 'react-date-range';
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import {format} from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { SearchContext } from '../../context/SearchContext';
import { AuthContext } from '../../context/AuthContext';

const Header = ({ type }) => {
  const [destination, setDestination] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [dates, setDates] = useState([{
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
  }]);

  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adults: 1,
    children: 0,
    rooms: 1,
  })

  const navigate = useNavigate();

  const handleOption = (option, operation) => {
    setOptions((prev) => {
        return {...prev, [option]: operation === 'i' ? options[option] + 1 : options[option] - 1};
    })
  };

  const {dispatch} = useContext(SearchContext);
  const {user} = useContext(AuthContext);

  const handleSearch = () => {
    dispatch({type: "NEW_SEARCH", payload: {destination, dates, options}});
    navigate("/hotels", {state: {destination, dates, options}});
  };

  return (
    <div className='header'>
        <div className={type === "hotels" ? 'header-container hotels' : 'header-container'}>
            <div className='header-list'>
                <div className='header-list-item active'>
                    <FontAwesomeIcon icon={faBed} />
                    <span>Stays</span>
                </div>
                <div className='header-list-item'>
                    <FontAwesomeIcon icon={faPlane} />
                    <span>Flights</span>
                </div>
                <div className='header-list-item'>
                    <FontAwesomeIcon icon={faCar} />
                    <span>Car Rentals</span>
                </div>
                <div className='header-list-item'>
                    <FontAwesomeIcon icon={faBed} />
                    <span>Attractions</span>
                </div>
                <div className='header-list-item'>
                    <FontAwesomeIcon icon={faTaxi} />
                    <span>Airport Taxis</span>
                </div>
            </div>

            {type !== "hotels" &&
                <>
                    <h1 className='header-title'>A lifetime of discounts? It's Genius.</h1>
                    <p className='header-desc'>Get rewarded for your travels - Unlock instant savings of 10% or more with a free Hotello account.</p>
                    {!user && <button className='header-btn'>Sign in / Register</button>}

                    <div className='header-search'>
                        <div className='header-search-item'>
                            <FontAwesomeIcon icon={faBed} className='header-icon' />
                            <input onChange={(e) => setDestination(e.target.value)} type="text" placeholder="Where are you going?" className='header-search-input' />
                        </div>
                        <div className='header-search-item'>
                            <FontAwesomeIcon icon={faCalendarDays} className='header-icon' />
                            <span onClick={() => setOpenDate(!openDate)} className='header-search-text'>{`${format(dates[0].startDate, "dd/MM/yyyy")} to ${format(dates[0].endDate, "dd/MM/yyyy")}`}</span>
                            {openDate && <DateRange
                                editableDateInputs={true}
                                onChange={(item: RangeKeyDict) => setDates([item.selection])}
                                moveRangeOnFirstSelection={false}
                                minDate={new Date()}
                                ranges={dates}
                                className='date-range'
                            />}
                        </div>
                        <div className='header-search-item'>
                            <FontAwesomeIcon icon={faPerson} className='header-icon' />
                            <span onClick={() => setOpenOptions(!openOptions)} className='header-search-text'>{`${options.adults} ${options.adults === 1 ? 'adult' : 'adults'} · ${options.children} children · ${options.rooms} ${options.rooms === 1 ? 'room' : 'rooms'}`}</span>
                            {openOptions && <div className='options'>
                                <div className='option-item'>
                                    <span className='option-text'>Adult</span>
                                    
                                    <div className='option-counter'>
                                        <button disabled={options.adults <= 1} className='option-counter-btn' onClick={() => {handleOption("adults", "d")}}>-</button>
                                        <span className='option-counter-num'>{options.adults}</span>
                                        <button className='option-counter-btn' onClick={() => {handleOption("adults", "i")}}>+</button>
                                    </div>
                                </div>

                                <div className='option-item'>
                                    <span className='option-text'>Children</span>

                                    <div className='option-counter'>
                                        <button disabled={options.children <= 0} className='option-counter-btn' onClick={() => {handleOption("children", "d")}}>-</button>
                                        <span className='option-counter-num'>{options.children}</span>
                                        <button className='option-counter-btn' onClick={() => {handleOption("children", "i")}}>+</button>
                                    </div>
                                </div>

                                <div className='option-item'>
                                    <span className='option-text'>Room</span>
                                    
                                    <div className='option-counter'>
                                        <button disabled={options.rooms <= 1} className='option-counter-btn' onClick={() => {handleOption("rooms", "d")}}>-</button>
                                        <span className='option-counter-num'>{options.rooms}</span>
                                        <button className='option-counter-btn' onClick={() => {handleOption("rooms", "i")}}>+</button>
                                    </div>
                                </div>
                            </div>}
                        </div>
                        <div className='header-search-item'>
                            <button disabled={destination ? false : true} className='header-btn' onClick={handleSearch}>Search</button>
                        </div>
                    </div>
                </>}
        </div>
    </div>
  )
}

// Calendar.propTypes = {
//     onChange: PropTypes.func
//   };

export default Header