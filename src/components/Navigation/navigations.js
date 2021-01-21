import React from 'react';
import { Animated } from "react-animated-css";
import './navigation.css'

export default props => {
    return (
        <Animated className="navigation-container" animationIn="fadeInDown" animationOut="fadeOut" isVisible={true}>
            <div className="logo-container"></div>
            <div className="navigation-buttons">
                <div className="navigation-button-container">Home</div>
                <div className="navigation-button-container">About</div>
                <div className="navigation-button-container">Contact</div>
                <div className="navigation-button-container">SIC8</div>
            </div>
        </Animated>
    )
}