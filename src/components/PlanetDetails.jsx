import React from 'react';

const PlanetDetails = ({ planet, onClose }) => {
  return (
    <div className="planet-details">
      <h2>{planet.name}</h2>
      <p>
        <strong>Rotation Period:</strong> {planet.rotation_period}
      </p>
      <p>
        <strong>Orbital Period:</strong> {planet.orbital_period}
      </p>
      <p>
        <strong>Diameter:</strong> {planet.diameter}
      </p>
      <p>
        <strong>Climate:</strong> {planet.climate}
      </p>
      <p>
        <strong>Gravity:</strong> {planet.gravity}
      </p>
      <p>
        <strong>Terrain:</strong> {planet.terrain}
      </p>
      <p>
        <strong>Surface Water:</strong> {planet.surface_water}
      </p>
      <p>
        <strong>Population:</strong> {planet.population}
      </p>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default PlanetDetails;
