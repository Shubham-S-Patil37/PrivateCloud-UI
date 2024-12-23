import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import "./service-card.css"

const ServiceCard = ({ data }: { data: any }) => {
    return (
        <div className="card-parent">
            <div className='card-icon'>
                <FontAwesomeIcon icon={data.icon} className='card-logo' />
            </div>
            <div className='card-title'>
                {data.title}
            </div>
            {/* <div className='card-description'>
                {data.description}
            </div> */}
        </div>
    )
}
export default ServiceCard;