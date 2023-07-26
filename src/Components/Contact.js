import React, { Component } from "react";
import { Container, Typography, Grid, TextField, Button, Box } from "@mui/material";

class ContactUs extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
  };

  render() {
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
                fullWidth
                required
                margin="normal"
              />
              <TextField
                label="Email Address"
                variant="outlined"
                fullWidth
                required
                margin="normal"
              />
              <TextField
                label="Phone Number"
                variant="outlined"
                fullWidth
                required
                margin="normal"
              />
              <TextField
                label="Message"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                required
                margin="normal"
              />
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
