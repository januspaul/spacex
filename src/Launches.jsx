import React, { useState, useEffect } from 'react';
import { Container, Form, Table } from 'react-bootstrap';

const SpaceXLaunches = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch('https://api.spacexdata.com/v4/launches/')
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container>
      <Form>
        <Form.Group controlId="formSearch">
          <Form.Label>Search by mission name:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter mission name"
            value={search}
            onChange={handleChange}
          />
        </Form.Group>
      </Form>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Flight Number</th>
            <th>Mission Name</th>
            <th>Launch Year</th>
            <th>Details</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan="5">Loading...</td>
            </tr>
          ) : (
            filteredData.map((launch) => (
              <tr key={launch.id}>
                <td>{launch.flight_number}</td>
                <td>{launch.name}</td>
                <td>{launch.date_utc}</td>
                <td>{launch.details}</td>
                <td>
                  <img
                    src={launch.links.patch.small}
                    alt={`Mission patch for ${launch.name}`}
                    width="100px"
                  />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default SpaceXLaunches;
