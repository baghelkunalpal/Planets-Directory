

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ResidentCard = ({ residentUrl }) => {
  const [resident, setResident] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResidentData = async () => {
      try {
        const response = await axios.get(residentUrl);
        setResident(response.data);
      } catch (error) {
        console.error(`Error fetching resident data for ${residentUrl}:`, error);
        setError(error.message || 'An error occurred while fetching resident data.');
      }
    };

    fetchResidentData();
  }, [residentUrl]);

  return (
    <div className="resident-card">
      {error ? (
        <p>Error: {error}</p>
      ) : (
        <>
          {resident ? (
            <>
              <h3>{resident.name}</h3>
              <p>Height: {resident.height}</p>
              <p>Mass: {resident.mass}</p>
              <p>Gender: {resident.gender}</p>
            </>
          ) : (
            <p>Loading resident data...</p>
          )}
        </>
      )}
    </div>
  );
};

const PlanetCard = ({ planet }) => {
  const [showResidents, setShowResidents] = useState(false);
  const [residents, setResidents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResidents = async () => {
      try {
        const residentPromises = planet.residents.map((residentUrl) => axios.get(residentUrl));
        const residentResponses = await Promise.all(residentPromises);
        const residentData = residentResponses.map((response) => response.data);
        setResidents(residentData);
      } catch (error) {
        console.error('Error fetching residents:', error);
        setError(error.message || 'An error occurred while fetching resident data.');
      }
    };

    fetchResidents();
  }, [planet.residents]);

  const handleShowResidents = () => {
    setShowResidents(!showResidents);
  };

  return (
    <div className="planet-card">
      <h2>{planet.name}</h2>
      <p>
        <strong>Climate:</strong> {planet.climate}
      </p>
      <p>
        <strong>Population:</strong> {planet.population}
      </p>
      <p>
        <strong>Terrain:</strong> {planet.terrain}
      </p>
      <button className='residents-btn' onClick={handleShowResidents}>
        {showResidents ? 'Hide Residents' : 'Show Residents'}
      </button>
      {error ? (
        <p>Error: {error}</p>
      ) : (
        showResidents && (
          <div className="resident-container">
            {residents.map((residentData) => (
              <ResidentCard key={residentData.name} residentUrl={residentData.url} />
            ))}
          </div>
        )
      )}
    </div>
  );
};

export default PlanetCard;