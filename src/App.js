import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PlanetCard from './components/PlanetCard';
import Skeleton from './components/Skeleton';
import Loading from './components/Loading';
import './App.css';

const App = () => {
  const [planets, setPlanets] = useState([]);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchPlanets('https://swapi.dev/api/planets/?format=json');
  }, []);

  const fetchPlanets = async (url) => {
    try {
      const response = await axios.get(url);
      setPlanets((prevPlanets) => [...prevPlanets, ...response.data.results]);
      setNextPage(response.data.next);
      setPrevPage(response.data.previous);
    } catch (error) {
      console.error('Error fetching planets:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    if (nextPage) {
      setLoading(true);
      fetchPlanets(nextPage);
    }
  };

  const handleLoadPrev = () => {
    if (prevPage) {
      setLoading(true);
      fetchPlanets(prevPage);
    }
  };

  return (
    <div className="app">
      <h1 className='planets-h1'>Planets Directory</h1>
      <div className="planets-container">
        {loading ? (
          Array.from({ length: 5 }).map((_, index) => <Skeleton key={index} />)
        ) : (
          planets.map((planet) => <PlanetCard key={planet.name} planet={planet} />)
        )}
      </div>
      <div className="pagination">
        {prevPage && <button onClick={handleLoadPrev}>Previous</button>}
        {nextPage && !prevPage && <button onClick={handleLoadMore}>Next</button>}
      </div>
      {loading && <Loading />}
    </div>
  );
};

export default App;
