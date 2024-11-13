import React from 'react';
import "./featuredProperties.css";
import useFetch from '../../hooks/useFetch';

const FeaturedProperties = () => {
  const {data, loading, error} = useFetch("http://localhost:5000/api/hotels?featured=true&limit=4");

  return (
    <div className='featured-properties'>
        {loading ? "Loading... Please wait" : <>
            {data.map(featuredProperty => (
                <div className="featured-property-item" key={featuredProperty?._id}>
                <img
                src={featuredProperty?.photos[0]}
                alt=""
                className="featured-property-img"
                />
                <span className="featured-property-name">{featuredProperty?.name}</span>
                <span className="featured-property-city">{featuredProperty?.city}</span>
                <span className="featured-property-price">Starting from ${featuredProperty?.cheapestPrice}</span>
                {featuredProperty?.rating && <div className="featured-property-rating">
                    <button>{featuredProperty?.rating}</button>
                    <span>Excellent</span>
                </div>}
            </div>
            ))}
        </>}

        {/* <div className="featured-property-item">
            <img
            src="https://cf.bstatic.com/xdata/images/hotel/square600/13125860.webp?k=e148feeb802ac3d28d1391dad9e4cf1e12d9231f897d0b53ca067bde8a9d3355&o=&s=1"
            alt=""
            className="featured-property-img"
            />
            <span className="featured-property-name">Aparthotel Stare Miasto</span>
            <span className="featured-property-city">Madrid</span>
            <span className="featured-property-price">Starting from $120</span>
            <div className="featured-property-rating">
                <button>8.9</button>
                <span>Excellent</span>
            </div>
        </div>

        <div className="featured-property-item">
            <img
            src="https://cf.bstatic.com/xdata/images/hotel/square600/13125860.webp?k=e148feeb802ac3d28d1391dad9e4cf1e12d9231f897d0b53ca067bde8a9d3355&o=&s=1"
            alt=""
            className="featured-property-img"
            />
            <span className="featured-property-name">Aparthotel Stare Miasto</span>
            <span className="featured-property-city">Madrid</span>
            <span className="featured-property-price">Starting from $120</span>
            <div className="featured-property-rating">
                <button>8.9</button>
                <span>Excellent</span>
            </div>
        </div>

        <div className="featured-property-item">
            <img
            src="https://cf.bstatic.com/xdata/images/hotel/square600/13125860.webp?k=e148feeb802ac3d28d1391dad9e4cf1e12d9231f897d0b53ca067bde8a9d3355&o=&s=1"
            alt=""
            className="featured-property-img"
            />
            <span className="featured-property-name">Aparthotel Stare Miasto</span>
            <span className="featured-property-city">Madrid</span>
            <span className="featured-property-price">Starting from $120</span>
            <div className="featured-property-rating">
                <button>8.9</button>
                <span>Excellent</span>
            </div>
        </div>

        <div className="featured-property-item">
            <img
            src="https://cf.bstatic.com/xdata/images/hotel/square600/13125860.webp?k=e148feeb802ac3d28d1391dad9e4cf1e12d9231f897d0b53ca067bde8a9d3355&o=&s=1"
            alt=""
            className="featured-property-img"
            />
            <span className="featured-property-name">Aparthotel Stare Miasto</span>
            <span className="featured-property-city">Madrid</span>
            <span className="featured-property-price">Starting from $120</span>
            <div className="featured-property-rating">
                <button>8.9</button>
                <span>Excellent</span>
            </div>
        </div> */}
    </div>
  )
}

export default FeaturedProperties