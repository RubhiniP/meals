import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

class ResultItem extends Component {
  render() {
    const { item, meals } = this.props;

    return (
      <Card sx={{
        backgroundColor: '',
        border: '1px solid grey',
        borderRadius: '10px',
        width: 300, 
        margin: '10px'         
      }}>
        <img
          src={`${item.strMealThumb}/preview`}
          alt={item.strMeal}
          style={{
            width: '100%',
            height: 'auto',
            borderRadius: '10px 10px 0 0', 
          }}
        />
        <CardContent sx={{ padding: '16px' }} className="card-content">
          <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '4px' }}>
            {item.idMeal} - {item.strMeal.length > 15 ? (<>{item.strMeal.slice(0,15)}...</>) : item.strMeal}
          </h3>
          {item.strArea ? (
            <p style={{ fontSize: '16px', color: 'grey', marginBottom: '4px' }}>
              {item.strArea} - {item.strCategory}
            </p>
          ) : (
            <p style={{ fontSize: '16px', color: 'grey', marginBottom: '4px' }}>
              {meals.selectedCategory && meals.selectedCategory} {meals.selectedArea && meals.selectedArea}
            </p>
          )}
          <Link
            to={`/display/${item.idMeal}`}
            style={{
              display: 'block',
              textAlign: 'center',
              backgroundColor: 'rgba(59, 57, 57, 1)',
              color: 'white',
              padding: '8px 16px',
              borderRadius: '4px',
              textDecoration: 'none',
              fontWeight: 'bold',
              fontSize: '16px',
            }}
          >
            View Details
          </Link>
        </CardContent>
      </Card>
    );
  }
}

export default ResultItem;
