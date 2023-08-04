import React, { Component } from "react";
import { PiSmileySad } from "react-icons/pi";
import { Box, Typography } from "@mui/material";

class Notfound extends Component{
    render(){
        return(
            <div style={{height: '620px', textAlign: 'center', backgroundColor: '#121212'}}>
                <PiSmileySad style={{fontSize: '400px', color:'grey'}}/>
                <Box textAlign="center">
                    <Typography variant="h4" color='white'>404 ERROR</Typography>
                    <Typography variant="h6" color="grey">
                        Page Not Found
                    </Typography>
                </Box>
            </div>
        );
    }
}

export default Notfound;