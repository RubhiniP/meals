import axios from "axios";
import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import { Container, Typography, Divider, Box, Card, CardMedia, CardContent } from '@mui/material';

class Display extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mealDetails: null
        }
    }

    componentDidMount() {
        // console.log(this.props, "our log")
        this.fetchMealDetailsById();
        const searchParams = new URLSearchParams(this.props.location.search);
        const searchResultsJson = searchParams.get('searchResults');
        if (searchResultsJson) {
            const searchResults = JSON.parse(searchResultsJson);
            this.setState({ searchResults });
        }
    }

    fetchMealDetailsById = () => {
        axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${this.props.match.params.id}`)
            .then(result => this.setState({
                mealDetails: result.data.meals[0]
            }))
            .catch(error => console.log("Error fetching data", error))
    }

    render() {
        const { mealDetails } = this.state;
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
            <Container>
                <br />
                <Box sx={{ marginTop: '20px' }}>
                    <Typography variant="h6">
                        {mealDetails.strCategory.toUpperCase()}{' '}
                        {mealDetails.strArea.toUpperCase()}
                    </Typography>
                    <Typography variant="h4">
                        {mealDetails.strMeal}
                    </Typography>
                    <Divider sx={{ my: 2 }} />
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
                                {mealDetails.strInstructions}
                            </Typography>
                            <Typography variant="h6" sx={{ mt: 2 }}>
                                Ingredients:
                            </Typography>
                            <ul>
                                {ingredientsList.map((ingredient, index) => (
                                    <li key={index}>{ingredient}</li>
                                ))}
                            </ul>
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
                                boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.3)', 
                                marginBottom: '20px', 
                            }}
                        />
                        <Typography
                            variant="body1"
                            sx={{
                            fontFamily: 'cursive',
                            fontSize: '20px',
                            fontWeight: 'bold',      
                            textTransform: 'uppercase', 
                            textDecoration: 'underline', 
                            textAlign: 'center',        
                            marginTop: '10px',          
                            }}
                            >
                            {mealDetails.strMeal}
                        </Typography><br /><br />

                    </Box>
                </Box>
            </Container>
        );
    }
}

export default withRouter(Display);
