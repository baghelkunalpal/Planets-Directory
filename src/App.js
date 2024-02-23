import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PlanetCard from './components/PlanetCard';
import Skeleton from './components/Skeleton';
import Loading from './components/Loading';
import './App.css';

const App = () => {
  const [planets, setPlanets] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchPlanets(`https://swapi.dev/api/planets/?page=${currentPage}&format=json`);
  }, [currentPage]);

  const fetchPlanets = async (url) => {
    try {
      const response = await axios.get(url);
      setPlanets(response.data.results);
      setTotalPages(Math.ceil(response.data.count / 10));
    } catch (error) {
      console.error('Error fetching planets Api:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    if (currentPage < totalPages) {
      setLoading(true);
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handleLoadPrev = () => {
    if (currentPage > 1) {
      setLoading(true);
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div className="app">
      <h1 className='planets-h1'>Planets Directory</h1>
      <div className="planets-container">
        {loading ? (
          Array.from({ length: 12 }).map((_, index) => <Skeleton key={index} />)
        ) : (
          planets.map((planet) => <PlanetCard key={planet.name} planet={planet} />)
        )}
      </div>
      <div className="pagination">
        {currentPage > 1 && <button onClick={handleLoadPrev}>Previous</button>}
        {currentPage < totalPages && <button onClick={handleLoadMore}>Next</button>}
      </div>
      {loading && <Loading />}
    </div>
  );
};

export default App;
