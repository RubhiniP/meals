import React, { Component } from "react";
import axios from "axios";
import { Box } from "@mui/material";
// import ResultItem from "./ResultItem";
import { BiSolidLeftArrowCircle, BiSolidRightArrowCircle } from 'react-icons/bi';
import ErrorBoundary from "./ErrorBoundary";
import Loading from "./Loading";

const ResultItem = React.lazy(() => import("./ResultItem"));

class Recommendation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      meals: [],
      isLoading: true
    };
    this.resultContainerRef = React.createRef();

  }

  scrollContainer = (scrollOffset) => {
    const container = this.resultContainerRef.current;
    if (container) {
      container.scrollLeft += scrollOffset;
    }
  };

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
      return <div><Loading /></div>
    }

    return (
      <div>
       <ErrorBoundary>
        <div className="menu-list">
          <Box sx={{ display: "flex", overflowX: "auto" }} ref={this.resultContainerRef}>
            {meals.map(meal => (
                <div key={meal.idMeal}>
                  <ResultItem item={meal}/>
                </div>
            ))}    
          </Box>
        </div>
       </ErrorBoundary>

        {meals?.length ? 
          <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
            <BiSolidLeftArrowCircle onClick={() => this.scrollContainer(-400)} style={{ marginRight: "20px", backgroundColor: "rgba(59, 57, 57, 1)", fontSize: '50px', borderRadius: '30px', cursor: 'pointer'}} />
            <BiSolidRightArrowCircle onClick={() => this.scrollContainer(400)} style={{ marginLeft: "20px", backgroundColor: "rgba(59, 57, 57, 1)", fontSize: '50px', borderRadius: '30px', cursor: 'pointer'}} /> 
          </div> : null}
      </div>
    );
  }
}

export default Recommendation;
