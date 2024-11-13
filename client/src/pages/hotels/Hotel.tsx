import React, { useContext, useState } from 'react'
import "./hotel.css"
import Navbar from '../../components/navbar/Navbar'
import Header from '../../components/header/Header'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleArrowLeft, faCircleArrowRight, faCircleXmark, faLocationDot } from '@fortawesome/free-solid-svg-icons'
import MailList from '../../components/mailList/MailList'
import Footer from '../../components/footer/Footer'
import useFetch from '../../hooks/useFetch'
import { useLocation, useNavigate } from 'react-router-dom'
import { SearchContext } from '../../context/SearchContext'
import { AuthContext } from '../../context/AuthContext'
import ReserveRoom from '../../components/reserveRoom/ReserveRoom'

const Hotel = () => {
  const [slide, setSlide] = useState(0);
  const [openSlider, setOpenSlider] = useState(false);
  const [openReserveModal, setOpenReserveModal] = useState(false);

  const location = useLocation();
  const id = location.pathname.split("/")[2];

  const {data, loading, error, reFetch} = useFetch(`http://localhost:5000/api/hotels/find/${id}`);

  const {user} = useContext(AuthContext);
  const navigate = useNavigate();

  // const photos = [
  //   {
  //     src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707778.jpg?k=56ba0babbcbbfeb3d3e911728831dcbc390ed2cb16c51d88159f82bf751d04c6&o=&hp=1",
  //   },
  //   {
  //     src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707367.jpg?k=cbacfdeb8404af56a1a94812575d96f6b80f6740fd491d02c6fc3912a16d8757&o=&hp=1",
  //   },
  //   {
  //     src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261708745.jpg?k=1aae4678d645c63e0d90cdae8127b15f1e3232d4739bdf387a6578dc3b14bdfd&o=&hp=1",
  //   },
  //   {
  //     src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707776.jpg?k=054bb3e27c9e58d3bb1110349eb5e6e24dacd53fbb0316b9e2519b2bf3c520ae&o=&hp=1",
  //   },
  //   {
  //     src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261708693.jpg?k=ea210b4fa329fe302eab55dd9818c0571afba2abd2225ca3a36457f9afa74e94&o=&hp=1",
  //   },
  //   {
  //     src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707389.jpg?k=52156673f9eb6d5d99d3eed9386491a0465ce6f3b995f005ac71abc192dd5827&o=&hp=1",
  //   },
  // ];

  const {state} = useContext(SearchContext);
  const {options} = state;

  const {startDate, endDate} = state.dates[0];

  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }
  
  let days;

  if(dayDifference(startDate, endDate) == 0) {
    days = 1;
  } else {
    days = dayDifference(startDate, endDate);
  }

  const handleOpenSlider = (index) => {
    setSlide(index);
    setOpenSlider(true);
  }

  const handleSlides = (direction) => {
    let newSlide;
    if(direction == "l") {
      newSlide = slide == 0 ? 5 : slide - 1;
    } else {
      newSlide = slide == 5 ? 0 : slide + 1;
    }

    setSlide(newSlide);
  }

  const handleBookRoom = () => {
    if(user) {
      setOpenReserveModal(true);
    } else {
      navigate("/login")
    }
  }

  return (
    <div>
      <Navbar />
      <Header type="hotels" />
      {loading ? "Loading... Please wait" : <>
        <div className="hotel-container">
          {openSlider && <div className='slider'>
              <FontAwesomeIcon icon={faCircleXmark} className='close-btn' onClick={() => setOpenSlider(false)} />
              <FontAwesomeIcon icon={faCircleArrowLeft} className='arrow' onClick={() => handleSlides("l")} />
              <div className='slider-wrapper'>
                <img src={data?.photos[slide]} />
              </div>
              <FontAwesomeIcon icon={faCircleArrowRight} className='arrow' onClick={() => handleSlides("r")} />
          </div>}
          <div className="hotel-wrapper">
            <button className='book-now'>Reserve or Book Now!</button>
            <h1 className='hotel-title'>{data?.name}</h1>
            <div className='hotel-address'>
              <FontAwesomeIcon icon={faLocationDot} />
              <span>{data?.address}</span>
            </div>

            <span className="hotel-distance">
              {data?.distance}
            </span>
            <span className="hotel-price-highlight">
              Book a stay over ${data?.cheapestPrice} at this property and get a free airport taxi
            </span>

            <div className='hotel-images'>
              {data?.photos?.map((photo, index) => (
                <div className='hotel-img-wrapper'>
                  <img onClick={() => {handleOpenSlider(index)}} src={photo} alt="hotel-img" />
                </div>
              ))}
            </div>

            <div className='hotel-details'>
                <div className='hotel-details-desc'>
                  <h1 className="hotel-title">{data?.title}</h1>
                  <p className="hotel-desc">
                    {data?.desc}
                  </p>
                </div>

                <div className='hotel-details-pricing'>
                  <h1>Perfect for a {days}-night stay!</h1>
                  <span>
                    Located in the real heart of Krakow, this property has an
                    excellent location score of 9.8!
                  </span>
                  <h2>
                    <b>${days * data?.cheapestPrice * options?.rooms}</b> ({days} nights)
                  </h2>
                  <button onClick={handleBookRoom}>Reserve or Book Now!</button>
                </div>
            </div>
          </div>

          <MailList />
          <Footer />
        </div>
      </>}

      {openReserveModal && <ReserveRoom setOpen={setOpenReserveModal} hotelId={id} />}
    </div>
  )
}

export default Hotel