import React from 'react';

const SpaceXLaunchRow = ({ launch }) => {
  return (
    <tr key={launch.id}>
      <td>
        <img
          src={launch.links.patch.small}
          alt={`Mission patch for ${launch.name}`}
          width="100px"
        />
      </td>
      <td>{launch.flight_number}</td>
      <td>{launch.name}</td>
      <td>{launch.date_utc}</td>
      <td>{launch.details}</td>
    </tr>
  );
};

export default SpaceXLaunchRow;
