import { FC, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

import "./dashboardCard.css"

interface cardProps {
    title: string,
    icon: IconDefinition,
    val: string
}

const DashBoardCard: FC<cardProps> = ({ title, icon, val }) => {

    useEffect(() => {
    }, []);

    return (
        <div className='dash-card-parent'>
            <div className='dash-card-title-parent'>
                <div className='dash-card-title'>{title}</div>
                <FontAwesomeIcon icon={icon} />
            </div>
            <div className='sub-title-parent'>
                {/* <div>{keyVal}</div> */}
                <div>{val}</div>
            </div>
        </div>
    )
}

export default DashBoardCard;