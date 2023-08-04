import React, { Component, Suspense } from "react";
import { Menu, MenuItem, TextField, Button, IconButton } from '@mui/material';
import axios from "axios";
// import ResultItem from "./ResultItem";
// import HomePage from "./Homepage";
import { BiSolidRightArrowCircle, BiSolidLeftArrowCircle } from 'react-icons/bi';
import SearchIcon from '@mui/icons-material/Search';
import ErrorBoundary from "./ErrorBoundary";

const HomePage = React.lazy(() => import("./Homepage"));
const ResultItem = React.lazy(() => import("./ResultItem"));

class SearchBar1 extends Component{

    constructor(props){
        super(props);
        this.state = {
            searchQuery: '',
            firstSearchResults: [],
            searchResults: [],
            errorMessage: '',

            categories: [],
            showCategoryList: false,
            selectedCategory: null,

            areas: [],
            showAreaList: false,
            selectedArea: null,

            searched: false,

            

            // showSearchMenu: false
        }
        this.resultContainerRef = React.createRef();
        this.categoryButtonRef = React.createRef();
        this.areaButtonRef = React.createRef();
        // this.searchButtonRef = React.createRef();
    }

    scrollContainer = (scrollOffset) => {
        const container = this.resultContainerRef.current;
        if (container) {
          container.scrollLeft += scrollOffset;
        }
      };

    // openSearchMenu = (event) => {
    //     this.setState({
    //       showSearchMenu: true,
    //       searchAnchorEl: event.currentTarget,
    //     });
    // };
    
    // closeSearchMenu = () => {
    //     this.setState({ showSearchMenu: false });
    // };

    changeHandler = (e) => {
        this.setState({
            searchQuery: e.target.value
        });
    }

    searchByName = (e) => {
        e.preventDefault();
        const name = this.state.searchQuery.trim();
        if (!isNaN(name)) {
        this.setState({ searchResults: [], firstSearchResults: [], errorMessage: 'Please enter a valid name' });
        return;
        }
        axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${this.state.searchQuery}`)
        .then(result => {
            console.log(result);
            this.setState({searchResults: result.data.meals,
                           firstSearchResults: result.data.meals,
                           errorMessage: '',
                           searched: true});
        })
        .catch(error => console.log("Error fetching data", error))
    }

    // searchByLetter = (e) => {
    //     e.preventDefault();
    //     const name = this.state.searchQuery.trim();
    //     if (!isNaN(name)) {
    //     this.setState({ searchResults: [], errorMessage: 'Please enter a valid character' });
    //     return;
    //     }
    //     const letter = this.state.searchQuery.charAt(0).toLowerCase()
    //     axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)
    //     .then(result => this.setState({searchResults: result.data.meals, errorMessage: ''}))
    //     .catch(error => console.log("Error fetching data", error))
    // }

    // searchByID = (e) => {
    //     e.preventDefault();
    //     const id = this.state.searchQuery.trim();
    //     if (!id || isNaN(id)) {
    //     this.setState({ searchResults: [], errorMessage: 'Please enter a valid ID' });
    //     return;
    //     }
    //     axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${this.state.searchQuery}`)
    //     .then(result => this.setState({searchResults: result.data.meals, errorMessage: ''}))
    //     .catch(error => console.log("Error fetching data", error))
    // }

    sortByName = () => {
        this.setState({
            searchResults: this.state.searchResults.sort((a, b) => (a.strMeal < b.strMeal) ? -1 : (a.strMeal > b.strMeal) ? 1 : 0 )
        })
    }

    sortByID = () => {
        this.setState({
            searchResults: this.state.searchResults.sort((a, b) => (a.idMeal < b.idMeal) ? -1 : (a.idMeal > b.idMeal) ? 1 : 0 )
        })
    }

    //category section

    componentDidMount(){
        //fetching all categories
        axios.get("https://www.themealdb.com/api/json/v1/1/list.php?c=list")
        .then(result => {
            // console.log(result.data.meals);
            this.setState({
                categories: result.data.meals.map(meal => meal.strCategory)
        })
        // console.log(this.state.categories);
    })
    this.fetchAreas();
    }

    filterByCategory = () => {
        this.toggleCategoryList();
    }

    toggleCategoryList = () => {
        this.setState((prevState) => ({
            showCategoryList: !prevState.showCategoryList,
            selectedArea: null
        }));
    }

    selectCategory = (category) => {
        this.setState({ selectedCategory: category}, () => this.fetchMealsByCategory());
    }

    fetchMealsByCategory = () => {
        const { firstSearchResults } = this.state;
        firstSearchResults?.length ?
            this.setState({
                searchResults: firstSearchResults.filter(result => result.strCategory.includes(this.state.selectedCategory))
            }) : 
        axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${this.state.selectedCategory}`)
        .then(result => this.setState({
            searchResults: result.data.meals,
            errorMessage: ''
        }))
        .catch(error => console.log("Error fetching selected category", error));
    }    

    //area section

    fetchAreas = () => {
        //fetching all areas
        axios.get("https://www.themealdb.com/api/json/v1/1/list.php?a=list")
        .then(result => {
            // console.log(result.data.meals);
            this.setState({
                areas: result.data.meals.map(meal => meal.strArea)
        })
        // console.log(this.state.areas);
    })
    }

    filterByArea = () => {
        this.toggleAreaList();
    }

    toggleAreaList = () => {
        this.setState((prevState) => ({
            showAreaList: !prevState.showAreaList,
            selectedCategory: null
        }));
    }

    selectArea = (area) => {
        this.setState({ selectedArea: area}, () => this.fetchMealsByArea());
    }

    fetchMealsByArea = () => {
        const { firstSearchResults } = this.state;
        firstSearchResults?.length ?
            this.setState({
                searchResults: firstSearchResults.filter(result => result.strArea.includes(this.state.selectedArea))
            }) : 
        axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${this.state.selectedArea}`)
        .then(result => this.setState({
            searchResults: result.data.meals,
            errorMessage: ''
        }))
        .catch(error => console.log("Error fetching selected category", error));
    }


    inputStyle = {
        color: 'white',
        width: '500px',
        backgroundColor: 'rgba(109, 109, 109, 1)',
        cursor: 'pointer'
    };

    render(){
        const { searchQuery, searchResults, errorMessage, showCategoryList, categories, showAreaList, areas } = this.state;
        return(
            <div style={{ padding: "20px", fontFamily: "Arial, sans-serif", backgroundColor: '#121212' }}>
            <br />

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px' }}>
          
            <TextField
            variant="outlined"
            value={searchQuery}
            onChange={this.changeHandler}
            inputProps={{style: this.inputStyle}}
            inputlabelprops={{style: this.inputStyle}}
            />
            {/* <Button variant="contained" onClick={this.searchByName} style={{ marginLeft:'20px', padding: '16px', backgroundColor: 'rgba(239, 223, 26, 0.8)', color: 'black'}} ref={this.searchButtonRef}>
            Search
            </Button>           */}
            <IconButton onClick={this.searchByName}>
                <SearchIcon aria-label="search" variant="contained" ref={this.searchButtonRef} style={{padding: '16px', backgroundColor: 'rgba(59, 57, 57, 1)', color: 'white'}}/>
            </IconButton>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button variant="contained" onClick={this.filterByCategory} ref={this.categoryButtonRef}  style={{ marginLeft:'20px', backgroundColor: 'rgba(59, 57, 57, 1)'}}>Filter by category</Button>{' '}
            <Button variant="contained" onClick={this.filterByArea} ref={this.areaButtonRef}  style={{ marginLeft:'20px', backgroundColor: 'rgba(59, 57, 57, 1)'}}>Filter by Area</Button>

            {/* Dropdown Menu */}
            {/* <Menu
            anchorEl={this.searchButtonRef.current}
            open={showSearchMenu}
            onClose={this.closeSearchMenu}
            >
            <MenuItem onClick={this.searchByName}>Search By Name</MenuItem>
            <MenuItem onClick={this.searchByLetter}>Search By First Letter</MenuItem>
            <MenuItem onClick={this.searchByID}>Search By ID</MenuItem>
            </Menu> */}
            </div>
            <br />

            {/* category */}
            {showCategoryList && (
                <Menu 
                anchorEl={this.categoryButtonRef.current}
                open={showCategoryList}
                onClose={this.toggleCategoryList}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center'
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center'
                  }}>
                    {categories.map(category => (
                        <MenuItem key={category} onClick={() => this.selectCategory(category)}>{category}</MenuItem>
                    ))}
                </Menu>)}

                {/* area */}
                {showAreaList && (
                <Menu 
                anchorEl={this.areaButtonRef.current}
                open={showAreaList}
                onClose={this.toggleAreaList}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center'
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center'
                  }}
                >
                    {areas.map(area => (
                        <MenuItem key={area} onClick={() => this.selectArea(area)}>{area}</MenuItem>
                    ))}
                </Menu>)} 

                {/* {console.log(searchResults)} */}
                {searchResults?.length ? (
                
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px'}}>
                    <Button variant="contained" onClick={this.sortByName} style={{ marginLeft:'20px', backgroundColor: 'rgba(59, 57, 57, 1)'}}>Sort by Name</Button>{' '}
                    <Button variant="contained" onClick={this.sortByID}  style={{ marginLeft:'20px', backgroundColor: 'rgba(59, 57, 57, 1)'}}>Sort by ID</Button>{' '}
                    </div>
                         
                ) : null}
                
                <ErrorBoundary>
                <Suspense fallback={<div>Loading... Please wait</div>}>
                <div style={{ display: 'flex', flexWrap: 'nowrap', overflowX: 'auto'}} ref={this.resultContainerRef}>
                {(searchResults?.length ? (
                searchResults.map((result) => (
                    <div key={result.idMeal} style={{ flex: '0 0 300px', margin: '10px' }}>
                      <ResultItem item={result} meals={this.state} />
                    </div>
                  ))
                ) : this.state.searched && <div>No results found</div>)}
                </div>
                </Suspense>
                </ErrorBoundary>
                               
                                
                {searchResults?.length ? 
                <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
                <BiSolidLeftArrowCircle onClick={() => this.scrollContainer(-400)} style={{ marginRight: "20px", backgroundColor: "rgba(59, 57, 57, 1)", fontSize: '50px', borderRadius: '30px', cursor: 'pointer'}} />
                <BiSolidRightArrowCircle onClick={() => this.scrollContainer(400)} style={{ marginLeft: "20px", backgroundColor: "rgba(59, 57, 57, 1)", fontSize: '50px', borderRadius: '30px', cursor: 'pointer'}} /> 
                </div> : null}

            {errorMessage && <div>{errorMessage}</div>}

            <ErrorBoundary>
                <Suspense fallback={<div>Loading... Please wait</div>}>
                    <HomePage />
                </Suspense>
            </ErrorBoundary>
            
           
        </div>
        );
    }
}

export default SearchBar1;

