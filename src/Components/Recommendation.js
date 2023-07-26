import React, { Component } from "react";
import axios from "axios";
import { Box } from "@mui/material";
import ResultItem from "./ResultItem";
import "./Homepage.css";

class Recommendation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      meals: [],
      isLoading: true
    };
  }

  componentDidMount() {
    this.fetchMenuData();
  }

  fetchMenuData = async () => {
    try {
      const requests = Array.from({ length: 5 }, () =>
        axios.get("https://www.themealdb.com/api/json/v1/1/random.php")
      );
      const responses = await Promise.all(requests);
      const meals = responses.map((response) => response.data.meals[0]);
      this.setState({ meals, isLoading: false });
    } catch (error) {
      console.error("Error fetching menu data:", error);
      this.setState({ isLoading: false });
    }
  };

  render() {
    const { meals, isLoading } = this.state;

    if (isLoading) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <div className="menu-list">
          <Box sx={{ display: "flex", overflowX: "auto" }}>
            {meals.map(meal => (
                <ResultItem item={meal}/>
            ))}    
          </Box>
        </div>
      </div>
    );
  }
}

export default Recommendation;
