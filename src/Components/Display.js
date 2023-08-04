import axios from "axios";
import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import { Container, Typography, Divider, Box, Card, CardMedia, CardContent, Button } from '@mui/material';

class Display extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mealDetails: null,
            showMore: false
        }
    }

    componentDidMount() {
        console.log(this.props, "our log")
        this.fetchMealDetailsById();
    }

    fetchMealDetailsById = () => {
        axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${this.props.match.params.id}`)
            .then(result => this.setState({
                mealDetails: result.data.meals[0]
            }))
            .catch(error => console.log("Error fetching data", error))
    }

    showHandler = () => {
        this.setState((prevState) => ({
            showMore: !prevState.showMore
        }));
    }

    render() {
        const { mealDetails, showMore } = this.state;
        if (!mealDetails) {
            return <div>Loading...</div>
        }

        const ingredientsList = [];
        for (let i = 1; i <= 20; i++) {
            const ingredient = mealDetails[`strIngredient${i}`];
            const measure = mealDetails[`strMeasure${i}`];
            if (ingredient && ingredient.trim() !== "" && measure && measure.trim() !== "") {
                ingredientsList.push(`${measure} ${ingredient}`);
            }
        }

        return (
            <div style={{ background: "#121212", color: "#ffffff", paddingTop: "20px" }}>
            <Container>
                <Divider style={{ margin: '15px 0', backgroundColor: '#ffffff'}}/>
                <Box sx={{ marginTop: '20px' }}>
                    <Typography variant="h6">
                        {mealDetails.strCategory.toUpperCase()}
                        {mealDetails.strArea.toUpperCase()}
                    </Typography>
                    <Typography variant="h4" sx={{fontFamily: 'sans-serif', fontStyle:'italic'}}>
                        {mealDetails.strMeal}
                    </Typography>
                    <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
                    <Card>
                        <CardMedia
                            component="img"
                            image={mealDetails.strMealThumb}
                            alt={mealDetails.strMeal}
                            width='500'
                            height='450'
                        />
                        <CardContent>
                            <Typography variant="body1">
                                {showMore ? mealDetails.strInstructions : `${mealDetails.strInstructions.substring(0,200)}`}
                            </Typography>
                            {
                            showMore &&
                            <>
                            <Typography variant="h6" sx={{ marginTop: 2, marginBottom: 2, fontFamily: 'sans-serif', fontWeight: 'bold', fontStyle: 'italic' }}>
                            Ingredients:
                            </Typography>
                            <ul>
                                {ingredientsList.map((ingredient, index) => (
                                    <li key={index}>{ingredient}</li>
                                    
                                ))}
                            </ul>
                            </>
                            }
                            <Button onClick={this.showHandler}>{showMore ? "Show Less" : "Show More" }</Button>

                        </CardContent>
                    </Card>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column',
                        marginTop: '20px',
                    }}>
                        <iframe
                            width="100%"
                            height="600"
                            src={`https://www.youtube.com/embed/${mealDetails.strYoutube.slice(-11)}`}
                            title="YouTube video player"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            sx={{
                                border: 'none', 
                                borderRadius: '12px',  
                                marginBottom: '20px', 
                            }}
                        />
                        <br /><br />

                    </Box>
                </Box>
            </Container>
            </div>
        );
    }
}

export default withRouter(Display);
