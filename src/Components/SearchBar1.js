import React, { Component } from "react";
import { Menu, MenuItem, TextField, Button } from '@mui/material';
import axios from "axios";
import ResultItem from "./ResultItem";
import Recommendation from "./Recommendation";

class SearchBar1 extends Component{

    constructor(props){
        super(props);
        this.state = {
            searchQuery: '',
            searchResults: [],
            errorMessage: '',

            categories: [],
            showCategoryList: false,
            selectedCategory: null,

            areas: [],
            showAreaList: false,
            selectedArea: null,

            showSearchMenu: false
        }
        this.categoryButtonRef = React.createRef();
        this.areaButtonRef = React.createRef();
        this.searchButtonRef = React.createRef();
    }

    openSearchMenu = (event) => {
        this.setState({
          showSearchMenu: true,
          searchAnchorEl: event.currentTarget,
        });
      };
    
      closeSearchMenu = () => {
        this.setState({ showSearchMenu: false });
      };

    changeHandler = (e) => {
        this.setState({
            searchQuery: e.target.value
        });
    }

    searchByName = (e) => {
        e.preventDefault();
        const name = this.state.searchQuery.trim();
        if (!isNaN(name)) {
        this.setState({ searchResults: [], errorMessage: 'Please enter a valid name' });
        return;
        }
        axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${this.state.searchQuery}`)
        .then(result => {
            console.log(result);
            this.setState({searchResults: result.data.meals, errorMessage: ''});
        })
        .catch(error => console.log("Error fetching data", error))
    }

    searchByLetter = (e) => {
        e.preventDefault();
        const name = this.state.searchQuery.trim();
        if (!isNaN(name)) {
        this.setState({ searchResults: [], errorMessage: 'Please enter a valid character' });
        return;
        }
        const letter = this.state.searchQuery.charAt(0).toLowerCase()
        axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)
        .then(result => this.setState({searchResults: result.data.meals, errorMessage: ''}))
        .catch(error => console.log("Error fetching data", error))
    }

    searchByID = (e) => {
        e.preventDefault();
        const id = this.state.searchQuery.trim();
        if (!id || isNaN(id)) {
        this.setState({ searchResults: [], errorMessage: 'Please enter a valid ID' });
        return;
        }
        axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${this.state.searchQuery}`)
        .then(result => this.setState({searchResults: result.data.meals, errorMessage: ''}))
        .catch(error => console.log("Error fetching data", error))
    }

    sortByName = (e) => {
        this.setState({
            searchResults: this.state.searchResults.sort((a, b) => (a.strMeal < b.strMeal) ? -1 : (a.strMeal > b.strMeal) ? 1 : 0 )
        })
    }

    sortByID = (e) => {
        this.setState({
            searchResults: this.state.searchResults.sort((a, b) => (a.idMeal < b.idMeal) ? -1 : (a.idMeal > b.idMeal) ? 1 : 0 )
        })
    }

    //category section

    componentDidMount(){
        //fetching all categories
        axios.get("https://www.themealdb.com/api/json/v1/1/list.php?c=list")
        .then(result => {
            console.log(result.data.meals);
            this.setState({
                categories: result.data.meals.map(meal => meal.strCategory)
        })
        // console.log(this.state.categories);
    })
    this.fetchAreas();

    }

    toggleCategoryList = () => {
        this.setState((prevState) => ({
            showCategoryList: !prevState.showCategoryList
        }));
    }

    selectCategory = (category) => {
        this.setState({ selectedCategory: category}, () => this.fetchMealsByCategory());
    }

    fetchMealsByCategory = () => {
        axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${this.state.selectedCategory}`)
        .then(result => this.setState({
            searchResults: result.data.meals
        }))
        .catch(error => console.log("Error fetching selected category", error));
    }


    filterByCategory = (e) => {
        this.toggleCategoryList();
    }

    //area section

    fetchAreas(){
        //fetching all categories
        axios.get("https://www.themealdb.com/api/json/v1/1/list.php?a=list")
        .then(result => {
            console.log(result.data.meals);
            this.setState({
                areas: result.data.meals.map(meal => meal.strArea)
        })
        // console.log(this.state.areas);
    })
    }

    toggleAreaList = () => {
        this.setState((prevState) => ({
            showAreaList: !prevState.showAreaList
        }));
    }

    selectArea = (area) => {
        this.setState({ selectedArea: area}, () => this.fetchMealsByArea());
    }

    fetchMealsByArea = () => {
        axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${this.state.selectedArea}`)
        .then(result => this.setState({
            searchResults: result.data.meals
        }))
        .catch(error => console.log("Error fetching selected category", error));
    }


    filterByArea = (e) => {
        this.toggleAreaList();
    }

    render(){
        const { searchQuery, searchResults, errorMessage, showCategoryList, categories, showAreaList, areas, showSearchMenu } = this.state;
        return(
            <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
                <br />
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px' }}>
          <TextField
            label="Search for a meal"
            variant="outlined"
            value={searchQuery}
            onChange={this.changeHandler}
            style={{ width: '500px' }}
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {/* Parent Button - Search */}
          <Button variant="contained" onClick={this.openSearchMenu} style={{ marginRight: '10px' }} ref={this.searchButtonRef}>
            Search
          </Button>

          {/* Dropdown Menu */}
          <Menu
            anchorEl={this.searchButtonRef.current}
            open={showSearchMenu}
            onClose={this.closeSearchMenu}
          >
            <MenuItem onClick={this.searchByName}>Search By Name</MenuItem>
            <MenuItem onClick={this.searchByLetter}>Search By First Letter</MenuItem>
            <MenuItem onClick={this.searchByID}>Search By ID</MenuItem>
          </Menu>
        </div>
        <br />
                
                {searchResults.length ? (
                <ul>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px'}}>
                    <Button variant="outlined" onClick={this.sortByName}>Sort by Name</Button>{' '}
                    <Button variant="outlined" onClick={this.sortByID}>Sort by ID</Button>{' '}
                    <Button variant="outlined" onClick={this.filterByCategory} ref={this.categoryButtonRef}>Filter by category</Button>{' '}
                    <Button variant="outlined" onClick={this.filterByArea} ref={this.areaButtonRef}>Filter by Area</Button>
                    </div>
                

                {/* category */}
                {showCategoryList && (
                <Menu 
                anchorEI={this.categoryButtonRef.current}
                open={showCategoryList}
                onClose={this.toggleCategoryList}
                anchorOrigin={{
                    vertical: 'bottom', // Align the menu below the button
                    horizontal: 'center', // Center the menu horizontally below the button
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                  }}>
                    {categories.map(category => (
                        <MenuItem key={category} onClick={() => this.selectCategory(category)}>{category}</MenuItem>
                    ))}
                </Menu>)}

                {/* area */}
                {showAreaList && (
                <Menu 
                anchorEI={this.areaButtonRef.current}
                open={showAreaList}
                onClose={this.toggleAreaList}
                anchorOrigin={{
                    vertical: 'bottom', // Align the menu below the button
                    horizontal: 'center', // Center the menu horizontally below the button
                  }}
                >
                    {areas.map(area => (
                        <MenuItem key={area} onClick={() => this.selectArea(area)}>{area}</MenuItem>
                    ))}
                </Menu>)}              
                </ul>
                ) : null}

                <div style={{
          display: 'flex',
          flexWrap: 'nowrap',
          overflowX: 'auto',
        }}>
          {searchResults.map((result) => (
            <div key={result.idMeal} style={{ flex: '0 0 300px', margin: '10px' }}>
              <ResultItem item={result} meals={this.state} />
            </div>
          ))}
        </div>
        {errorMessage && <div>{errorMessage}</div>}
        <Recommendation />
            </div>
        );
    }
}

export default SearchBar1;


