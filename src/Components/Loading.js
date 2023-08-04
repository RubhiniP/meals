import React, { Component } from "react";
import ReactLoading from "react-loading";

class Loading extends Component{
    render(){
        return(
            <div style={{ background: "#121212", color: "#ffffff", paddingTop: "20px"}}>
                <h3 style={{ color: 'white'}}>Loading</h3>
                <ReactLoading type="balls" color="white" height={100} width={50} />
            </div>
        );
    }
}

export default Loading;