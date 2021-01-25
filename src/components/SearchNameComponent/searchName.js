import React, { useState, useEffect } from 'react'
//REDUX
import { PassBetweenPage } from '../../redux/actions/passbetweenActions'
import { SetNameAndGetData, SetNameGetLocations, GetStateList } from '../../redux/actions/searchNameActions'
import { Animated } from "react-animated-css";
import { useSelector, useDispatch } from 'react-redux';
//ICONS------------------------------------------------------
import { IoChevronBackSharp } from 'react-icons/io5'
import { IoIosCloseCircleOutline } from "react-icons/io";
import { TiPhone } from "react-icons/ti";
import { HiOutlineMail, HiChevronDown, HiChevronRight } from "react-icons/hi";
import { IoLogoFacebook, IoLogoTwitter } from "react-icons/io";
import { MdLocationCity } from "react-icons/md";
import { CgWebsite, CgChevronDown, CgCloseO } from "react-icons/cg";
//------------------------------------------------------------
import {urls} from '../../constants'
import './searchName.css'
import { debounce } from 'lodash'

export default function SearchName() {
    //EFFECTS
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(GetStateList())
    }, [])

    const state = useSelector((state) => state.passbetweenReducer)
    const nameBusinessState = useSelector((state) => state.searchNameReducer)
    const [locationsOpen, toggleLocations] = useState([true, true, true])
    const setNameGetData = debounce((key) => {
        console.log("haydar")
        if (key.length > 3) {
            console.log(nameBusinessState.business_name)
            dispatch(SetNameAndGetData({ key: key }))
            dispatch(SetNameGetLocations(key))
        }
    }, 200)

    return (
        <>
            <Animated className="search-container-name" animationIn="zoomInUp" animationOut="zoomInUp" isVisible={true}
                style={{ margin: (nameBusinessState.businesses.length > 0 ? "0 auto" : "auto auto") }}>
                <input className="search-box-name" type="search" placeholder="Search By Business Name"
                    onChange={(e) => setNameGetData(e.target.value)}
                ></input>
            </Animated>
            <div className="back-to-filter" onClick={() => dispatch(PassBetweenPage())}><IoChevronBackSharp color="rgba(92, 197, 158)" size={30} />CLOSE</div>
            {nameBusinessState.businesses.length != 0 &&
                <Animated className="business-listing" animationIn="bounceInUp" animationOut="bounceInDown" isVisible={true}>
                    {nameBusinessState.businesses.slice(0, 20).map(
                        (bus) => (
                            <div className="single-business-card" onClick={
                                () => {
                                    console.log(urls.local + 'biz/' + bus.name.split(" ").join("-") + "/" + bus.city.split(" ").join("-") + "/" + bus.state + "/" + bus.id)
                                    let openURL = urls.local + 'biz/' + bus.name.split(" ").join("-") + "/" + bus.city.split(" ").join("-") + "/" + bus.state + "/" + bus.id
                                    var win = window.open(openURL)
                                    setTimeout(() => win.focus(), 1000)

                                }

                            }>
                                <div className="col-12 business-name">
                                    <span className="business-name-text font-weight-bold text-uppercase">{bus.name}</span>

                                </div>
                                <div className="col-6 business-other">
                                    {bus.phone1 && <h1 className="phone-text"><TiPhone color="orange" /> {bus.phone1}</h1>}
                                    {bus.website && <h1 className="phone-text"><CgWebsite color="orange" /> {bus.website}</h1>}
                                    {bus.email1 && <h1 className="phone-text"><HiOutlineMail color="orange" /> {bus.email1}</h1>}

                                </div>
                                <div className="col-6 business-other">
                                    {bus.facebok && <label className="business-name-text"><IoLogoFacebook color="orange"
                                        onClick={() => { var win = window.open(bus.facebok) }} />{bus.facebok}-</label>}
                                    {bus.twitter && <label className="business-name-text"><IoLogoTwitter color="orange"
                                        onClick={() => { var win = window.open(bus.twitter) }} />{bus.twitter}-</label>}

                                </div>
                                <div className="col-12">
                                    {bus.city && <h1 className="phone-text"><MdLocationCity color="orange" />{bus.street},{bus.city},{bus.state}</h1>}
                                </div>



                            </div>
                        )
                    )}
                </Animated>
            }
            {Object.keys(nameBusinessState.locations).length != 0 &&
                <div className="name-location-filter">
                    <h1 className="name-location-main-header" onClick={() => toggleLocations(locationsOpen.map((el, id) => id == 0 ? !el : el))}>States {locationsOpen[0] ? (<HiChevronDown color="" size="20" />) : (<HiChevronRight color="" size="20" />)}</h1>
                    {locationsOpen[0] ?
                        <Animated className="locations-states-container" animationIn="slideInRight" hidden={true}>

                            {Object.keys(nameBusinessState.locations).sort().map((el, i) =>
                                <div key={"state" + i} className={nameBusinessState.insertedState == el ? "locations-state-el-choosen" : "locations-state-el"}
                                    onClick={() => setTimeout(() => {
                                        if (nameBusinessState.insertedState == el) {
                                            dispatch(SetNameAndGetData({ key: nameBusinessState.business_name, state: "" }))
                                        }
                                        else {
                                            dispatch(SetNameAndGetData({ key: nameBusinessState.business_name, state: el ,city:"" }))
                                            //toggleLocations(prevState => [locationsOpen.slice(0, 1), true, locationsOpen.slice(1, 3)])
                                        }
                                    })}>
                                    {nameBusinessState.stateList[el]}
                                </div>)
                            }
                        </Animated> : null
                    }
                    {nameBusinessState.insertedState !== "" ?
                        <>
                            <h1 className="name-location-main-header" onClick={() => toggleLocations(locationsOpen.map((el, id) => id == 1 ? !el : el))}>Cities{locationsOpen[1] ? (<HiChevronDown color="" size="20" />) : (<HiChevronRight color="" size="20" />)}</h1>
                            {locationsOpen[1] &&
                                <Animated className="locations-states-container" animationIn="slideInRight" hidden={true}>
                                    {Object.keys(nameBusinessState.locations[nameBusinessState.insertedState]).sort().map((el, i) =>
                                        <div key={"zipCode" + i} className={nameBusinessState.insertedCity == el ? "locations-state-el-choosen" : "locations-state-el"}
                                            onClick={() => setTimeout(() => {
                                                console.log("citis", el, nameBusinessState.insertedCity)
                                                if (nameBusinessState.insertedCity == el) {
                                                    setTimeout(() => dispatch(SetNameAndGetData({ key: nameBusinessState.business_name, state: nameBusinessState.insertedState, city: "" })))
                                                }
                                                else {
                                                    setTimeout(() => dispatch(SetNameAndGetData({ key: nameBusinessState.business_name, state: nameBusinessState.insertedState, city: el })))

                                                }

                                            })}>{el}</div>)
                                    }
                                </Animated>}
                        </>
                        : null
                    }
                    {nameBusinessState.insertedState !== "" && nameBusinessState.insertedCity !== "" &&
                        <>
                            <h1 className="name-location-main-header" onClick={() => toggleLocations(locationsOpen.map((el, id) => id == 2 ? !el : el))}>Zipcodes{locationsOpen[2] ? (<HiChevronDown color="" size="20" />) : (<HiChevronRight color="" size="20" />)}</h1>

                            {locationsOpen[2] ?
                                <Animated className="locations-states-container" animationIn="slideInRight" hidden={true}>
                                    {nameBusinessState.locations[nameBusinessState.insertedState][nameBusinessState.insertedCity].sort().map((el, i) =>
                                        <div key={"city" + i} className={nameBusinessState.insertedZipCode == el ? "locations-state-el-choosen" : "locations-state-el"}
                                            onClick={() => setTimeout(() => {
                                                if (nameBusinessState.insertedZipCode === el) {
                                                    setTimeout(() => dispatch(SetNameAndGetData({ key: nameBusinessState.business_name, zipCode: 0 })))
                                                }
                                                else {
                                                    setTimeout(() => dispatch(SetNameAndGetData({ key: nameBusinessState.business_name, zipCode: el })))
                                                    //toggleLocations(prevState => [false, false, true])
                                                }
                                            })}>{el}</div>)
                                    }
                                </Animated> : null}
                        </>
                    }
                </div>
            }

            {/*
            
            {nameBusinessState.insertedCity != "" &&
                <Animated className="name-location-filter" animationIn="slideInRight" style={{ top: locationsOpen[2] == false?"230px":"680px" }}>
                    <h1 className="name-location-main-header" onClick={() => toggleLocations([locationsOpen.slice(0,2), !locationsOpen[2]])}>Zipcodes{locationsOpen[2] !== "" ? (<HiChevronDown color="" size="20" />) : null}</h1>

                    {locationsOpen[2] ?
                        <div className="locations-states-container">
                            {nameBusinessState.locations[nameBusinessState.insertedState][nameBusinessState.insertedCity].sort().map((el, i) =>
                                <div key={"city" + i} className={nameBusinessState.insertedZipCode == el ? "locations-state-el-choosen" : "locations-state-el"}
                                    onClick={() => setTimeout(() => {
                                        if (nameBusinessState.insertedZipCode === el) {
                                            setTimeout(() => dispatch(SetNameAndGetData({ key: nameBusinessState.business_name, zipCode: 0 })))
                                        }
                                        else {
                                            setTimeout(() => dispatch(SetNameAndGetData({ key: nameBusinessState.business_name, zipCode:  el })))
                                            //toggleLocations(prevState => [false, false, true])
                                        }
                                    })}>{el}</div>)
                            }
                        </div> : null}
                </Animated>
            } */}


        </>
    )
}

