import React, { useContext } from 'react';
import { PlanetContext } from '../context';
import fetchFilm from '../services/fetchFilms';

const Table = () => {
  const { data: { results }, planetsToRender } = useContext(PlanetContext);

  return (
    results
      ? (
        <table className='table'>
          <thead className='table_head'>
            <tr>
              <th>Name</th>
              <th>Rotation Period</th>
              <th>Orbital Period</th>
              <th>Diameter</th>
              <th>Climate</th>
              <th>Gravity</th>
              <th>Terrain</th>
              <th>Surface Water</th>
              <th>Population</th>
              <th>Films</th>
              <th>Created</th>
              <th>Edited</th>
              <th>URL</th>
            </tr>
          </thead>
          <tbody className='table_body'>
            {
              planetsToRender.map((planet) => (
                <tr
                  key={ planet.name }
                >
                  <td className='planet_name'>{ planet.name }</td>
                  <td>{ planet.rotation_period }</td>
                  <td>{ planet.orbital_period }</td>
                  <td>{ planet.diameter }</td>
                  <td>{ planet.climate }</td>
                  <td>{ planet.gravity }</td>
                  <td>{ planet.terrain }</td>
                  <td>{ planet.surface_water }</td>
                  <td>{ planet.population }</td>
                  <td>{ planet.films }</td>
                  <td>{ planet.created }</td>
                  <td>{ planet.edited }</td>
                  <td>{ planet.url }</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      )
      : <p>Loading...</p>
  );
};

export default Table;
