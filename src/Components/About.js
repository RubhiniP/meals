import React, { Component } from "react";
import { Container, Typography, Grid, Box, Divider, Paper } from "@mui/material";
import Recommendation from "./Recommendation";
import ContactUs from "./Contact";

class About extends Component {

    constructor(props) {
        super(props);
        this.state = {
          slideshowIndex: 0,
        };
      }
      
      componentDidMount() {
        this.startSlideshow();
      }
      
      componentWillUnmount() {
        clearInterval(this.slideshowInterval);
      }
      
      startSlideshow = () => {
        this.slideshowInterval = setInterval(() => {
          this.setState((prevState) => ({
            slideshowIndex: (prevState.slideshowIndex + 1) % 3
          }));
        }, 3000);
      };
      
      slideshowImages = [
        'https://wallpaperaccess.com/full/767033.jpg',
        'https://images2.alphacoders.com/568/568372.jpg',
        'https://i.pinimg.com/originals/7f/d9/33/7fd93365dc75b7e854367f4dc5c0c3da.jpg'
      ];
      
      
      
  render() {

    const { slideshowIndex } = this.state;
    return (
      <div style={{ background: "#121212", color: "#ffffff", paddingTop: "40px" }}>
        <Container>

            
<Paper elevation={3}>
          <div className="slideshow">
            <img
              src={this.slideshowImages[slideshowIndex]}
              alt={`Slideshow ${slideshowIndex + 1}`}
            />
          </div>
        </Paper><br />
          <Typography variant="h4" align="center" gutterBottom>
            About The Paradise Inn
          </Typography>

          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <img
                src="https://c4.wallpaperflare.com/wallpaper/814/350/568/spa-beach-hotel-infinity-pool-wallpaper-preview.jpg"
                alt="Hotel"
                style={{ width: "100%", borderRadius: "8px" }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body1" gutterBottom>
                Welcome to The Paradise Inn! Our luxury hotel offers an unforgettable experience in the heart of the city.
                Whether you're here for business or leisure, our top-notch amenities and personalized service ensure a
                relaxing and enjoyable stay.
              </Typography>
              <Typography variant="body1" gutterBottom>
                At The Paradise Inn, we pride ourselves on providing exceptional comfort and convenience. Our elegantly
                appointed rooms and suites are designed with your comfort in mind. Enjoy breathtaking views, plush bedding,
                and modern amenities during your stay.
              </Typography>
              <Typography variant="body1" gutterBottom>
                Indulge your taste buds at our exquisite on-site restaurant, offering a variety of international cuisines
                and local specialties. 
              </Typography>
              <Typography variant="body1" gutterBottom>
                For those seeking event and conference facilities, we offer state-of-the-art venues to host your meetings
                and special occasions. 
              </Typography>
              <Typography variant="body1" gutterBottom>
                Experience true hospitality at The Paradise Inn and make your stay in the city an unforgettable one. Book
                your reservation today and let us take care of the rest.
              </Typography>
            </Grid>
          </Grid>

          <Divider style={{ margin: "40px 0", backgroundColor: "#ffffff" }} />

          <Box textAlign="center" mb={2}>
            <Typography variant="h5">Best Recommendations for You</Typography>
            <Typography variant="body1" color="grey">
              Explore our menu and enjoy the Delight!
            </Typography>
          </Box>

            <Recommendation />
          

          <Divider style={{ margin: "40px 0", backgroundColor: "#ffffff" }} />

          <Typography variant="h5" align="center" mb={2}>
            Contact Us
          </Typography>
          <Paper elevation={3} style={{ padding: "20px" }}>
            <ContactUs />
          </Paper>
        </Container>
      </div>
    );
  }
}

export default About;
