import React, { useState, useEffect } from 'react'
import { Animated } from "react-animated-css";
import './searchFilterContent.css'
// REDUX
import {
    GetCategoriesAndStates, SelectCategoryAndFetch, GetBusinesses, SelectStateAndFetch, SetCategoryKeyAndGet, SetStateAndGetCities, SetPageNumber, SetCityAndFetch,
    SetZipcodeAndFetch
} from '../../redux/actions/businessActions'
import { PassBetweenPage } from '../../redux/actions/passbetweenActions'
import { useSelector, useDispatch } from 'react-redux';
import { IoIosCloseCircleOutline } from "react-icons/io";
import { TiPhone } from "react-icons/ti";
import { HiOutlineMail } from "react-icons/hi";
import { IoLogoFacebook, IoLogoTwitter } from "react-icons/io";
import { MdLocationCity } from "react-icons/md";
import { CgWebsite, CgChevronDown, CgCloseO } from "react-icons/cg";
import Highlighter from "react-highlight-words";
import Pagination from '../Pagination/pagination';
import {urls} from '../../constants'
export default props => {
    //EFFECTS
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(GetCategoriesAndStates())
    }, [])
    //STATES
    const state = useSelector((state) => state.businessReducer)

    //SONRAKİ
    const [searchBarVisible, setsearchBarVisible] = useState(true)
    const [business_toggle, toggleAnimations] = useState(true)
    const [keyCategory, setkeyCategory] = useState("")
    //ONCEKI
    const [matchedStates, matchState] = useState([])
    const [searchedCities, searchCity] = useState([])
    const [toggleThings, openThings] = useState([false, false, false, false])
    const selectCategoryAndGetData = (event, obj) => {
        toggleAnimations(false)
        var sic_code = obj.sic_code
        console.log(obj)
        const sic_code_to_send = state.categoryInserted !== sic_code ? { sic_code: sic_code, category_name: obj.category_name } : { sic_code: 0, category_name: "" }
        console.log("NEW CODE TO SEND", sic_code_to_send)
        dispatch(SelectCategoryAndFetch(
            {
                category: sic_code_to_send.sic_code,
                state: state.stateInserted,
                hasEmail: false, hasWebsite:
                    false, lastID: state.lastID
            }, sic_code_to_send))
        toggleAnimations(true)
        //dispatch(GetCounts({category:sic_code_to_send,state:state.stateInserted,hasEmail:false,hasWebsite:false}))
    }
    const selectStateAndGetData = (event, stateAbbreviation) => {

        const state_to_send = state.stateInserted !== stateAbbreviation ? stateAbbreviation : ''
        setTimeout(() => dispatch(SetStateAndGetCities(stateAbbreviation)))
        dispatch(SelectStateAndFetch(
            {
                category: state.categoryInserted,
                state: state_to_send, hasEmail: false,
                hasWebsite: false,
                lastID: state.lastID
            }, state_to_send))

        //dispatch(GetCounts({category:state.categoryInserted,state:state_to_send,hasEmail:false,hasWebsite:false}))
    }
    const setCategorySearchKeyAndFetch = (key) => {
        setkeyCategory(key)
        if (key.length > 3)
            setTimeout(() => dispatch(SetCategoryKeyAndGet(key)))
        else if (key.length == 0)
            setTimeout(() => dispatch(SetCategoryKeyAndGet(key)))

    }
    const setCityAndFetch = (city) => {
        const city_to_send = state.insertedCity !== city ? city : ''
        dispatch(SetCityAndFetch(
            {
                category: state.categoryInserted,
                state: state.stateInserted,
                hasEmail: false,
                hasWebsite: false,
                lastID: state.lastID,
                city: city_to_send
            }, city_to_send))
    }
    const searchState = (key) => {
        let x = []
        if (key.length != 0) {
            state.categoriesStates.states.forEach(el => {
                if (el.state.toLowerCase().startsWith(key)) {
                    x.push(el)
                }

            });
            matchState(precState => x)
            console.log(x)
        }
        else {
            matchState(precState => [])
        }
    }
    const setCityAndSearch = (key) => {
        let x = []
        if (key.length != 0) {
            state.matchedCities.forEach(el => {
                if (el.toLowerCase().startsWith(key)) {
                    x.push(el)
                }

            });
            searchCity(precState => x)
            console.log(x)
        }
        else {
            searchCity(precState => [])
        }
    }
    return (
        <>
            <div className="filters-left">
                {state.categoryInserted != 0 || state.stateInserted != '' ? <h1 className="filters-header">Filters</h1> : null}
                {state.categoryInserted != 0 &&
                    <Animated className="filters-left-el" animationIn="slideInRight">{state.categoryInsertedName}
                        <IoIosCloseCircleOutline color="rgba(92,197,158)" size={20}
                            onClick={(e) => {
                                selectCategoryAndGetData(e, { sic_code: 0, category_name: "" })
                            }} />
                    </Animated>}
                {state.stateInserted != '' &&
                    <Animated className="filters-left-el" animationIn="slideInRight">{state.stateInserted}
                        <IoIosCloseCircleOutline color="rgba(92,197,158)" size={20}
                            onClick={(e) => {
                                selectStateAndGetData(e, state.stateInserted)
                            }}
                        />
                    </Animated>}
                {state.insertedCity != '' &&
                    <Animated className="filters-left-el" animationIn="slideInRight">{state.insertedCity}
                        <IoIosCloseCircleOutline color="rgba(92,197,158)" size={20}
                            onClick={() => {
                                setCityAndFetch(state.insertedCity)
                            }}
                        />
                    </Animated>}
            </div>
            <div className="search-by-name" onClick={() => dispatch(PassBetweenPage())}>SEARCH NAME</div>
            <Animated className="search-container" animationIn="zoomInUp" animationOut="zoomInUp" isVisible={true}
                style={{
                    margin: (state.businesses.length != 0 ? "0 auto" : "auto auto"),
                    borderTopLeftRadius: (state.categoryInserted != 0 ? "0px" : "10px"),
                    borderTopRightRadius: (state.categoryInserted != 0 ? "0px" : "10px"),
                }}>
                <input className="search-box" type="search" placeholder="Search Categories"
                    onClick={() => openThings([!toggleThings[0], false, false, false])}

                    onChange={(event) => {
                        setCategorySearchKeyAndFetch(event.target.value)
                    }}></input>
                <input className="search-box" type="search" placeholder="Search States"
                    onChange={(event) => searchState(event.target.value)}
                    onClick={(event) => {
                        openThings([false, !toggleThings[1], false, false])
                    }}></input>
                <input className="search-box" type="search" placeholder="Search Cities"
                    onClick={() => {
                        openThings([false, false, !toggleThings[2], false])
                    }}></input>
                {/* style={{overflowY:(state.matchedCategories.length != 0 && state.matchedCategories.length > 10?"scroll":"hidden")}} */}
                {toggleThings[0] &&
                    <div className="listing-filters-container"  >
                        {state.matchedCategories.length == 0 && state.categoriesStates.categories.map(
                            (category, i) => (
                                <div id={i} className={category.sic_code == state.categoryInserted ? "list-item-filter checked-category" : "list-item-filter"}
                                    onClick={(e) => {
                                        selectCategoryAndGetData(e, category)
                                        openThings([!toggleThings[0], false, false, false])
                                    }}>
                                    <Highlighter

                                        highlightClassName="category-inner-span"
                                        searchWords={[keyCategory]}
                                        autoEscape={true}
                                        textToHighlight={category.category_name}
                                    /></div>

                            )
                        )}
                        {state.matchedCategories.length !== 0 && state.matchedCategories.map(
                            (category, i) => (
                                <div id={i} className={category.sic_code == state.categoryInserted ? "list-item-filter checked-category" : "list-item-filter"}
                                    onClick={(e) => {
                                        selectCategoryAndGetData(e, category)
                                        openThings([!toggleThings[0], false, false, false])
                                    }}

                                >
                                    <Highlighter
                                        highlightClassName="category-inner-span"
                                        searchWords={[keyCategory]}
                                        autoEscape={true}
                                        textToHighlight={category.category_name}
                                    />
                                </div>

                            )
                        )}
                    </div>
                }
                {toggleThings[1] &&
                    <div className="listing-filters-container" style={{ marginLeft: "20.5%" }}>
                        {matchedStates.length == 0 && state.categoriesStates?.states?.map(
                            (state1, i) => (
                                <div id={i} className={state1.abbreviation == state.stateInserted ? "list-item-filter checked-category" : "list-item-filter"}
                                    onClick={(e) => {
                                        selectStateAndGetData(e, state1.abbreviation)
                                        openThings([false, !toggleThings[1], false, false])
                                    }}>{state1.state}</div>
                            )
                        )}
                        {matchedStates.length != 0 && matchedStates.map(
                            (state1, i) => (
                                <div id={i} className={state1.abbreviation == state.stateInserted ? "list-item-filter checked-category" : "list-item-filter"}
                                    onClick={(e) => {
                                        selectStateAndGetData(e, state1.abbreviation)
                                        openThings([false, !toggleThings[1], false, false])
                                    }}
                                >{state1.state}</div>
                            )
                        )}
                    </div>
                }
                {toggleThings[2] &&
                    <div className="listing-filters-container" style={{ marginLeft: "40.7%" }}>
                        {searchedCities.length == 0 && state.matchedCities.map(
                            (city, i) => (
                                <div id={i} className={city == state.insertedCity ? "list-item-filter checked-category" : "list-item-filter"}
                                    onClick={() => {
                                        setCityAndFetch(city)
                                        openThings([false, false, !toggleThings[2], false])
                                    }}>{city}</div>
                            )
                        )}
                        {searchedCities.length != 0 && searchedCities.map(
                            (city, i) => (
                                <div id={i} className={city == state.insertedCity ? "list-item-filter checked-category" : "list-item-filter"}
                                    onClick={() => {
                                        setCityAndFetch(city)
                                        openThings([false, false, !toggleThings[2], false])
                                    }}>{city}</div>
                            )
                        )}

                    </div>
                }
            </Animated>
            {state.businesses.length != 0 &&
                <Animated className="business-listing" animationIn="bounceInUp" animationOut="bounceInDown" isVisible={true}>
                    {state.businesses.slice(20*(state.currentPage-1), 20*state.currentPage).map(
                        (bus) => (
                            <div className="single-business-card" onClick={
                                () => {
                                    console.log(urls.local + 'biz/' + bus.name.split(" ").join("-") + "/" + bus.city.split(" ").join("-") + "/" + bus.state + "/" + bus.id)
                                    let openURL = urls.local + 'biz/' + bus.name.split(" ").join("-") + "/" + bus.city.split(" ").join("-") + "/" + bus.state + "/" + bus.id
                                    var win = window.open(openURL)
                                    setTimeout(() => win.focus(), 400)

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
                    <Pagination/>
                </Animated>
            }
            
        </>
    )
}
