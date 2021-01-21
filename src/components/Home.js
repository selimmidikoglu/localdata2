import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import BG from './ny.jpeg'
import './Home.css'
import { Animated } from "react-animated-css";
//REDUX

import SearchFilterContent from './SearchFilterComponent/searchFilterContent'
import Navigation from './Navigation/navigations'
import SearchName from './SearchNameComponent/searchName'
import Pagination from './Pagination/pagination'
export default props => {
    const pageBetweenState = useSelector((state)=> state.passbetweenReducer)
    return (
        <>
            <div className="myDiv" >
                <img className="bg" src={BG} />
            </div>
            <div className="main-container">
                <Navigation></Navigation>
                {pageBetweenState.searchByName ? <SearchName/>:<SearchFilterContent/>}
                {/* <Pagination/> */}
            </div>

        </>

    )
}
