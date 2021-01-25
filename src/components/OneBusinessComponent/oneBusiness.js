import React from 'react'
import './oneBusiness.css'
// import AG from './ny1.jpeg'
import { Animated } from "react-animated-css";

function OneBusiness(props) {
    const data = props.params
    return (
        <>
            <div style={styles.backgroundContainer} >
                <img style={styles.bg} src="http://localhost:6006/ny.jpeg" />
            </div>
            <div style={styles.mainContainer} className="main-container">
                <Animated animationIn="fadeIn" style={styles.dataContainer}>
                {Object.keys(data).map((el,i) => {
                        if(data[el] != null && data[el] != 0 && data[el] != ''){
                            if(el == 'id' || el == 'created_by_id' || el == 'rate' || el == 'indexed_state') return null;
                            else if(el == 'name'  ){
                                return <div key={i}  className="row" style={styles.nameLabel}>
                                    <div className="col-12"><label >{data[el]}</label></div>
                                </div>
                            }
                            else{
                                return <div key={i}  className="row" style={styles.dataElement}>
                                   <div className="col-4" > <span style={styles.key}>{el.replace("_"," ").toLocaleUpperCase() } : </span></div>
                                   <div className="col-8"> <span style={styles.valueStyle}> {data[el]}</span></div>
                                </div>
                            }
                        }
                    })}
                </Animated>
            </div>
  

        </>

        // <Animated animationIn="zoomInUp" animationOut="bounceIn" isVisible={true} className="container" style={styles.backgroundContainer}>
        //     <div className="row">
        //         <div className="col-12">

        //             {Object.keys(data).map((el,i) => {
        //                 if(data[el] != null && data[el] != 0 && data[el] != ''){
        //                     if(el == 'id' || el == 'created_by_id' || el == 'rate' || el == 'indexed_state') return null;
        //                     else if(el == 'name'  ){
        //                         return <div key={i}  className="row">
        //                             <div className="col-12"><label style={styles.nameLabel}>{data[el]}</label></div>
        //                         </div>
        //                     }
        //                     else{
        //                         return <div key={i}  className="row">
        //                            <div className="col-2"> <span style={styles.key}>{el.replace("_"," ").toLocaleUpperCase() } : </span></div>
        //                            <div className="col-10"> <span style={styles.valueStyle}> {data[el]}</span></div>
        //                         </div>
        //                     }
        //                 }
        //             })}

        //         </div>
        //         {/* <div className="col-6 different"></div> */}
        //     </div>

        // </Animated>

    )
}
const styles = {
    backgroundContainer: {
        position: "absolute",
        zIndex: 2,
        width: "100%",
        height: "100%",
        backgroundPosition: "50%",
      
    },
    bg: {
        position: "fixed",
        zIndex: -1,
        top: 0,
        left: 0,
        minWidth: "100%",
        height: "100%",
    
        backgroundRepeat: "no-repeat",

    },
    mainContainer :{
        width: "100%",
        height: "100%",
        position: "fixed",
        zIndex: 2,
        backgroundColor: "rgba(54, 58, 81, 0.7)",
        display:"flex",
        alignItems: "center",
        justifyContent:"center",

    },
    dataContainer:{
        maxWidth:"500px",
        height:"fit-content",
        backgroundColor: "rgba(54, 58, 81)",
        borderRadius:"10px",
        padding:"10px",
        alignItems:"center",
        justifyContent:"center"
    },
    dataElement:{
      borderBottom:"1px solid rgba(76, 82, 103)",
      margin:"10px"  
    },
    valueStyle: {
        fontSize: '14px',
        color: 'white',
        fontFamily: 'Nunito, sans-serif'
    },
    key: {
        fontSize: '14px',
        fontWeight: '300',
        color: 'rgba(92, 197, 158)',
        fontFamily: 'Nunito'
    },
    nameLabel:{
        fontSize: '17px',
        fontWeight: '500',
        color: 'rgba(92, 197, 158)',
        fontFamily: 'Nunito',
        margin:"10px",
    }

}
export default OneBusiness;

