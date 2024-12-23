import { useState, FC } from 'react'
import "./toggle-button.css"

interface ToggleButtonProps {
    title1: string;
    title2: string;
    onToggleChange: (isToggled: boolean) => void;
}
const ToggleButton: FC<ToggleButtonProps> = ({ title1, title2, onToggleChange }) => {
    const [isActive, setIsActive] = useState(true)

    const onToggleClicked = () => {
        onToggleChange(!isActive)
        setIsActive(!isActive)
    }
    return (
        <div className='toggle-parent'>
            {title1}
            <label className="switch" >
                <input type="checkbox" onClick={onToggleClicked} />
                <span className="slider round"></span>
            </label>
            {title2}
        </div>
    )
}

export default ToggleButton;