import React from 'react'
import './Toggle.css'

const Toggle = ({ isToggled, handleToggle }) => (
    <>
        <input
            checked={isToggled}
            onChange={handleToggle}
            className="react-switch-checkbox"
            id="react-switch-new"
            type="checkbox"
        />
        <label className="react-switch-label" htmlFor="react-switch-new">
            <span className="react-switch-button" />
        </label>
    </>
)

export default Toggle
