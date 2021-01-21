import React from 'react'
import './oneBusiness.css'
function OneBusiness(props) {
    const data = props.params
    return (
        <div className="container" style={styles.backgroundContainer}>
            <div className="row">
                <div className="col-6">
                    {Object.keys(data).map((el,i) => {
                        if(data[el] != null && data[el] != 0 && data[el] != ''){
                            if(el == 'id' || el == 'created_by_id' || el == 'rate' || el == 'indexed_state') return null;
                            else if(el == 'name'  ){
                                return <div  className="row">
                                    <div className="col-12"><label style={styles.nameLabel}>{data[el]}</label></div>
                                </div>
                            }
                            else{
                                return <div  className="row">
                                   <div className="col-4"> <span style={styles.key}>{el} : </span></div>
                                   <div className="col-9"> <span style={styles.valueStyle}> {data[el]}</span></div>
                                </div>
                            }
                        }
                    })}

                </div>
                <div className="col-6 different"></div>
            </div>
            
        </div>
    )
}
const styles= {
    backgroundContainer : {
        padding:'30px',
        height:'100%',
        backgroundColor:'#43484B',
        fontFamily : "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
    },
    nameLabel: {
        fontWeight:'800',
        fontSize: '25px',
        color:'orange',

    },
    valueStyle: {
        fontSize: '14px',
        color: 'white',
        
    },
    key: {
        fontSize: '16px',
        fontWeight: '400',
        color:'orange'
    },

}
export default OneBusiness;

