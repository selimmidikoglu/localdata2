
import React, { useState, useEffect } from 'react'
//REDUX

import { SetNameAndGetData, SetNameGetLocations, GetStateList } from '../../redux/actions/searchNameActions'
import { SetPageNumber, GetNextData } from '../../redux/actions/businessActions'
import { Animated } from "react-animated-css";
import { useSelector, useDispatch } from 'react-redux';

import './pagination.css'
export default props => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(GetStateList())
    }, [])

    const state = useSelector((state) => state.passbetweenReducer)
    const businessReducer = useSelector((state) => state.businessReducer)
    const [pageNumber, setpageNumber] = useState(1)
    // const setNameGetData = debounce((key) => {
    //     console.log("haydar")
    //     if (key.length > 3) {
    //         console.log(nameBusinessState.business_name)
    //         dispatch(SetNameAndGetData({ key: key }))
    //         dispatch(SetNameGetLocations(key))
    //     }
    // }, 500)
    const [buttonColors, setbuttonColors] = useState([false, false, false, false, false])
    console.log(businessReducer)
    let pageCount = businessReducer.businesses.length != 0 ? businessReducer.businesses.length / 20 : 0
    let pageArray = []
    for (let i = 0; i < businessReducer.businesses.length / 20; i++) {
        pageArray.push(i);
    }
    let pageOtherArray = [0,1,2,3,4]
    let finalPage =businessReducer.currentPage % 5 !== 0 ? (Math.floor(businessReducer.currentPage/5)+1)*5 : businessReducer.currentPage
    
    return (
        <div className="pagination-container">
            {businessReducer.currentPage != 1 &&
                <div key={"pagination" + "-prev"} className="page-button" style={styles.buttonbeforeNext}
                    onClick={() => {



                        dispatch(SetPageNumber(businessReducer.currentPage - 1))

                        setbuttonColors(prevState => prevState.map((el, j) => j == 5 ? true : false))
                    }}>
                    PREV
                </div>
            }
            {pageArray.length >= 10  && businessReducer.currentPage > 5 &&
                <>
                    <div key={"pagination" + 1} className="page-button" style={businessReducer.currentPage == finalPage-4 ? styles.buttonafter : styles.buttonbefore}
                        onClick={() => {
                            dispatch(SetPageNumber(finalPage-4))
                            //setbuttonColors(prevState => prevState.map((el, j) => j == i ? true : false))
                        }}>
                        {finalPage-4}
                    </div>
                    <div key={"pagination" + 2} className="page-button" style={businessReducer.currentPage == finalPage-3 ? styles.buttonafter : styles.buttonbefore}
                        onClick={() => {
                            dispatch(SetPageNumber(finalPage-3))
                            //setbuttonColors(prevState => prevState.map((el, j) => j == i ? true : false))
                        }}>
                        {finalPage-3}
                    </div>
                    <div key={"pagination" + 3} className="page-button" style={businessReducer.currentPage == finalPage-2 ? styles.buttonafter : styles.buttonbefore}
                        onClick={() => {
                            dispatch(SetPageNumber(finalPage-2))
                            //setbuttonColors(prevState => prevState.map((el, j) => j == i ? true : false))
                        }}>
                        {finalPage-2}
                    </div>
                    <div key={"pagination" + 4} className="page-button" style={businessReducer.currentPage == finalPage-1 ? styles.buttonafter : styles.buttonbefore}
                        onClick={() => {
                            dispatch(SetPageNumber(finalPage-1))
                            //setbuttonColors(prevState => prevState.map((el, j) => j == i ? true : false))
                        }}>
                        {finalPage-1}
                    </div>
                    <div key={"pagination" + 5} className="page-button" style={businessReducer.currentPage == finalPage ? styles.buttonafter : styles.buttonbefore}
                        onClick={() => {
                            dispatch(SetPageNumber(finalPage))
                            //setbuttonColors(prevState => prevState.map((el, j) => j == i ? true : false))
                        }}>
                        {finalPage}
                    </div>
                </>}
            {businessReducer.currentPage <= 5 && pageOtherArray.map((el, i) =>
                <div key={"pagination" + i} className="page-button" style={businessReducer.currentPage == (el + 1) ? styles.buttonafter : styles.buttonbefore}
                    onClick={() => {
                        dispatch(SetPageNumber(el + 1))
                        setbuttonColors(prevState => prevState.map((el, j) => j == i ? true : false))
                    }}>
                    {el + 1}
                </div>
            )}
            
                <div key={"pagination" + "-next"} className="page-button" style={!buttonColors[5] ? styles.buttonbeforeNext : styles.buttonafterNext}
                    onClick={() => {
                        if (businessReducer.currentPage % 5 == 0) {
                            dispatch(GetNextData(
                                {
                                    category: businessReducer.categoryInserted,
                                    state: businessReducer.stateInserted,
                                    zipCode: businessReducer.zipCode,
                                    city: businessReducer.insertedCity,
                                    lastID: businessReducer.lastID
                                }
                            ))
                            dispatch(SetPageNumber(businessReducer.currentPage + 1))
                        }

                        else {
                            dispatch(SetPageNumber(businessReducer.currentPage + 1))
                        }
                        setbuttonColors(prevState => prevState.map((el, j) => j == 5 ? true : false))
                    }}>
                    NEXT
                </div>
            

        </div>
    )
}

const styles = {
    buttonbefore: {
        color: "white",
        fontSize: "14px",

    },
    buttonbeforeNext: {
        width: "60px",
        height: "30px",
        backgroundColor: "rba(0,0,0,0)",
        color: "white",
        fontSize: "17px"
    },
    buttonafterNext: {
        backgroundColor: "var(--lime)",
        fontSize: "17px",
        color: "gray",
        width: "60px",
        height: "30px",
    },
    buttonafter: {
        backgroundColor: "var(--lime)",
        fontSize: "17px",
        color: "gray"

    }
}