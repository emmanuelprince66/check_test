import React from 'react'
import backArrow from "../../images/bb.svg"
import './BackArrow.css'
import { Link } from 'react-router-dom'



const BackArrow = ( { destination }) => {
  return (
    <div>
    <Link to={destination}>
    <div className='gpt3__paybills_back'>
    <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15 19.92L8.47997 13.4C7.70997 12.63 7.70997 11.37 8.47997 10.6L15 4.08002"
            stroke="#1E1E1E"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
    </div>
    
    </Link>
    </div>
  )
}

export default BackArrow