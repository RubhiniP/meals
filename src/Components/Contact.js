import React, { Component } from "react";
import { Container, Typography, Grid, TextField, Button, Box } from "@mui/material";

class ContactUs extends Component {

  constructor(props){
    super(props);
    this.state = {
      name: '',
      nameError: '',
      email: '',
      emailError: '',
      ph: '',
      phError: '',
      message: '',
      messageError: ''
    }
  }

  handleSubmit = (e) => {
    (this.state.nameError !== '' || this.state.emailError !== '' || this.state.phError !== '' || this.state.messageError !== '') ? (
      <div>
        {alert("Please Fill the necessary details correctly!")}
        {e.preventDefault()}
      </div>
    ) : alert("Response submitted successfully")

  };

  nameHandler = (e) => {
    this.setState({
      name: e.target.value
    })
    this.validateName();
    
  }
  
  validateName = () => {
    (!this.state.name.match(/^(?!.*\s\s)[A-Za-z]+(?:\s[A-Za-z]+)?$/)) ?
    this.setState({
      nameError: "Not valid"
    }) : this.setState({
      nameError: ''
    })
  }

  emailHandler = (e) => {
    this.setState({
      email: e.target.value
    })
    this.validateEmail();
    
  }
  
  validateEmail = () => {
    (!this.state.email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) ?
    this.setState({
      emailError: "Not valid"
    }) : this.setState({
      emailError: ''
    })
  }

  phoneHandler = (e) => {
    this.setState({
      ph: e.target.value
    })
    this.validatePhone();
    
  }
  
  validatePhone = () => {
    (!this.state.ph.match(/^[0-9]{9}$/)) ?
    this.setState({
      phError: "Not valid"
    }) : this.setState({
      phError: ''
    })
  }

  messageHandler = (e) => {
    this.setState({
      message: e.target.value
    })
    this.validateMessage();
    
  }
  
  validateMessage = () => {
    (!this.state.message.length > 0) ?
    this.setState({
      messageError: "Not valid"
    }) : this.setState({
      messageError: ''
    })
  }

  render() {

    const { name, nameError, email, emailError, ph, phError, message, messageError } = this.state;
    return (
      <Container style={{ marginTop: "40px" }}>
        <Typography variant="h4" style={{ marginBottom: "20px" }}>
          Contact Us
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Box component="form" onSubmit={this.handleSubmit}>
              <TextField
                label="Your Name"
                variant="outlined"
                value={name}
                onChange={this.nameHandler}
                fullWidth
                required
                margin="normal"
              />{nameError && <div style={{color: 'red', fontWeight: 'bold'}}>{nameError}</div>}
              <TextField
                label="Email Address"
                variant="outlined"
                value={email}
                onChange={this.emailHandler}
                fullWidth
                required
                margin="normal"
              />{emailError && <div style={{color: 'red', fontWeight: 'bold'}}>{emailError}</div>}
              <TextField
                label="Phone Number"
                variant="outlined"
                value={ph}
                onChange={this.phoneHandler}
                fullWidth
                required
                margin="normal"
              />{phError && <div style={{color: 'red', fontWeight: 'bold'}}>{phError}</div>}
              <TextField
                label="Message"
                variant="outlined"
                value={message}
                onChange={this.messageHandler}
                fullWidth
                multiline
                rows={4}
                required
                margin="normal"
                />{messageError && <div style={{color: 'red', fontWeight: 'bold'}}>{messageError}</div>}
                <Button
                type="submit"
                variant="contained"
                color="primary"
                style={{ marginTop: "10px" }}
              >
                Send Message
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" style={{ fontWeight: "bold", marginBottom: "10px" }}>
              Address:
            </Typography>
            <Typography variant="body1" style={{ marginBottom: "20px" }}>
              Main Street, Ramakrishna Nagar, Coimbatore, India
            </Typography>
            <Typography variant="h6" style={{ fontWeight: "bold", marginBottom: "10px" }}>
              Phone:
            </Typography>
            <Typography variant="body1" style={{ marginBottom: "20px" }}>
              +91 85234 85324
            </Typography>
            <Typography variant="h6" style={{ fontWeight: "bold", marginBottom: "10px" }}>
              Email:
            </Typography>
            <Typography variant="body1" style={{ marginBottom: "20px" }}>
              theparadiseinn@gmail.com
            </Typography>
          </Grid>
        </Grid>
      </Container>
      
    );
  }
}

export default ContactUs;
