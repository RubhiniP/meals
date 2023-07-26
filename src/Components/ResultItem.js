import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

class ResultItem extends Component {
  render() {
    const { item, meals } = this.props;

    return (
      <Card sx={{
        backgroundColor: '#f0f0f0',
        border: '1px solid grey',
        borderRadius: '10px',
        width: 300, 
        margin: '10px', 
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', 
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
          <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '8px' }}>
            {item.idMeal} ~ {item.strMeal}
          </h3>
          {item.strArea ? (
            <p style={{ fontSize: '0.9rem', color: 'grey', marginBottom: '8px' }}>
              {item.strArea} ~ {item.strCategory}
            </p>
          ) : (
            <p style={{ fontSize: '0.9rem', color: 'grey', marginBottom: '8px' }}>
              {meals.selectedCategory} {meals.selectedArea}
            </p>
          )}
          <Link
            to={`/display/${item.idMeal}`}
            style={{
              display: 'block',
              textAlign: 'center',
              backgroundColor: 'blue',
              color: 'white',
              padding: '8px 16px',
              borderRadius: '4px',
              textDecoration: 'none',
              fontWeight: 'bold',
              fontSize: '0.9rem',
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
