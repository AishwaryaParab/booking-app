import React, { useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import Header from '../../components/header/Header'
import "./hotels.css"
import { useLocation } from 'react-router-dom'
import {format} from 'date-fns'
import { DateRange } from 'react-date-range'
import SearchItem from '../../components/searchItem/SearchItem'
import useFetch from '../../hooks/useFetch'

const Hotels = () => {
  const location = useLocation();

  const [destination, setDestination] = useState(location.state.destination);
  const [dates, setDates] = useState(location.state.dates);
  const [options, setOptions] = useState(location.state.options);

  const [openDate, setOpenDate] = useState(false);
  const [min, setMin] = useState(null);
  const [max, setMax] = useState(null);

  const {data, loading, error, reFetch} = useFetch(`http://localhost:5000/api/hotels?city=${destination}&min=${min || 0}&max=${max || 999}`);

  const handleSearch = () => {
    reFetch();
  }

  return (
    <div>
      <Navbar />
      <Header type="hotels" />
      <div className='list-container'>
        <div className='list-wrapper'>
          <div className='list-search'>
            <h1>Search</h1>

            <div className='list-item'>
              <label>Destination</label>
              <input placeholder={destination} type="text" />
            </div>

            <div className='list-item'>
              <label>Check-in Date</label>
              <span onClick={() => setOpenDate(!openDate)}>{`${format(dates[0].startDate, "dd/MM/yyyy")} to ${format(dates[0].endDate, "dd/MM/yyyy")}`}</span>
              {openDate && <DateRange
                onChange={(item) => {setDates([item.selection])}}
                minDate={new Date()}
                ranges={dates}
              />}
            </div>

            <div className='list-item'>
                <label>Options</label>
                <div className='list-options'>

                  <div className='list-option-item'>
                    <span className='list-option-text'>Min price <small>per night</small></span>
                    <input className='list-option-input' onChange={(e) => setMin(e.target.value)} type="number" />
                  </div>

                  <div className='list-option-item'>
                    <span className='list-option-text'>Max price <small>per night</small></span>
                    <input className='list-option-input' onChange={(e) => setMax(e.target.value)} type="number" />
                  </div>

                  <div className='list-option-item'>
                    <span className='list-option-text'>Adult</span>
                    <input className='list-option-input' type="number" min={1} placeholder={options.adults} />
                  </div>

                  <div className='list-option-item'>
                    <span className='list-option-text'>Children</span>
                    <input className='list-option-input' type="number" min={0} placeholder={options.children} />
                  </div>

                  <div className='list-option-item'>
                    <span className='list-option-text'>Room</span>
                    <input className='list-option-input' type="number" min={1} placeholder={options.rooms} />
                  </div>
                </div>
            </div>

            <button onClick={handleSearch}>Search</button>
          </div>

          <div className='list-result'>
            {loading ? "Loading... Please wait" : <>
                {data?.map((item) => (
                  <SearchItem item={item} key={item._id} />
                ))}
            </>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hotels