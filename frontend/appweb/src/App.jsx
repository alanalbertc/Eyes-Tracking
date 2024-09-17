import React, { useState, useEffect } from 'react';
import axios from 'axios';

const IP_SERVER = " http://localhost"
const PORT_SERVER = 5000

function CategoryPage() {
  const [category, setCategory] = useState('');
  const [leftFlag, setLeftFlag] = useState(0);
  const [rightFlag, setRightFlag] = useState(0);
  const [selectFlag, setSelectFlag] = useState(0);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.get(IP_SERVER + ':' + PORT_SERVER + '/api/category');
        setCategory(response.data.category);
      } catch (error) {
        console.error('Error fetching category:', error);
      }
    };

    const fetchFlags = async () => {
      try {
        const response = await axios.get(IP_SERVER + ':' + PORT_SERVER + '/api/flags');
        console.log(response.data);
        // setLeftFlag(response.data.leftFlag);
        // setRightFlag(response.data.rightFlag);
        // setSelectFlag(response.data.selectFlag);

      } catch (error) {
        console.error('Error fetching flags:', error);
      }
    };

    fetchCategory();
    fetchFlags();

    const intervalId = setInterval(() => {
      fetchFlags();
    }, 1000); // Adjust the interval as needed

    return () => clearInterval(intervalId);
  }, []);

  const handleLeftClick = async () => {
    try {
      await axios.post(IP_SERVER + ':' + PORT_SERVER + '/api/flags', { action: 'left' });
    } catch (error) {
      console.error('Error sending left flag:', error);
    }
  };

  const handleRightClick = async () => {
    try {
      await axios.post(IP_SERVER + ':' + PORT_SERVER + '/api/flags', { action: 'right' });
    } catch (error) {
      console.error('Error sending right flag:', error);
    }
  };

  const handleSelectClick = async () => {
    try {
      await axios.post(IP_SERVER + ':' + PORT_SERVER + '/api/flags', { action: 'select' });
    } catch (error) {
      console.error('Error sending select flag:', error);
    }
  };

  return (
    <div>
      <h1>Category</h1>
      <p>{category}</p>
      <button onClick={handleLeftClick}>Left</button>
      <button onClick={handleRightClick}>Right</button>
      <button onClick={handleSelectClick}>Select</button>
    </div>
  );
}

export default CategoryPage;