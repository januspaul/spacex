import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Container, Form, Table, Spinner } from 'react-bootstrap';

const SpaceXLaunchRow = lazy(() => import('./SpaceXLaunchRow'));

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
    <Container className="p-5 m-5 border rounded border-3 mx-auto">
      <Form>
        <Form.Group controlId="formSearch" className="m-5">
          <Form.Label className="display-5">Search by mission name:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter mission name"
            value={search}
            onChange={handleChange}
          />
        </Form.Group>
      </Form>
      <Table striped bordered hover className='border rounded border-3'>
        <thead>
          <tr>
            <th>Image</th>
            <th>Flight Number</th>
            <th>Mission Name</th>
            <th>Launch Year</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody className="p-5">
          {isLoading ? (
            <tr>
              <td colSpan="5">
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </td>
            </tr>
          ) : (
            filteredData.length > 0 ? (
              filteredData.map((launch) => (
                <Suspense
                  key={launch.id}
                  fallback={
                    <tr>
                      <td>
                        <Spinner animation="border" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </Spinner>
                      </td>
                    </tr>
                  }
                >
                  <SpaceXLaunchRow launch={launch} />
                </Suspense>
              ))
            ) : (
              <tr>
                <td colSpan="5">No matching launches found.</td>
              </tr>
            )
          )}
          {filteredData.length === data.length && (
            <tr>
              <td colSpan="5" className='text-center display-5'>No more data to load.</td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default SpaceXLaunches;
