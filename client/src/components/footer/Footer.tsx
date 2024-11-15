import React from 'react';
import "./footer.css";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <div className='footer'>
        <div className="footer-lists">
        <ul className="footer-list">
          <li>Countries</li>
          <li>Regions</li>
          <li>Cities</li>
          <li>Districts</li>
          <li>Airports</li>
          <li>Hotels</li>
        </ul>
        <ul className="footer-list">
          <li>Homes </li>
          <li>Apartments </li>
          <li>Resorts </li>
          <li>Villas</li>
          <li>Hostels</li>
          <li>Guest houses</li>
        </ul>
        <ul className="footer-list">
          <li>Unique places to stay </li>
          <li>Reviews</li>
          <li>Unpacked: Travel articles </li>
          <li>Travel communities </li>
          <li>Seasonal and holiday deals </li>
        </ul>
        <ul className="footer-list">
          <li>Car rental </li>
          <li>Flight Finder</li>
          <li>Restaurant reservations </li>
          <li>Travel Agents </li>
        </ul>
        <ul className="footer-list">
          <li>Curtomer Service</li>
          <li>Partner Help</li>
          <li>Careers</li>
          <li>Sustainability</li>
          <li>Press center</li>
          <li>Safety Resource Center</li>
          <li>Investor relations</li>
          <li>Terms & conditions</li>
        </ul>
      </div>
      <div className="copyright">Copyright © {year} Hotello.</div>
    </div>
  )
}

export default Footer