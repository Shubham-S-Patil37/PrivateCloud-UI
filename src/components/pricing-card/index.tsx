import React from 'react'


import "./pricing-card.css"

const PricingCard = ({ title, price, serviceCover }: { title: string, price: number, serviceCover: string[] }) => {

    return (
        <div className='pricing-card'>
            <div className='pricing-card-title'>
                {title}
            </div>
            <div className=''>
                $ {price}
            </div>
            <ul className='item-parent'>
                {
                    serviceCover.map((service) => (
                        <li>{service}</li>
                    ))
                }
            </ul>
        </div>
    )

}

export default PricingCard;