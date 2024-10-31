import { useState } from 'react';

import Places from './Places.jsx';
import { useEffect } from 'react';
import ErrorPage from './Error.jsx';
import { sortPlacesByDistance } from '../loc.js';
import { fetchAvailablePlace } from '../http.js';

export default function AvailablePlaces({ onSelectPlace }) {
  const [isFetching, setIsFetching] = useState(false);
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [error, setError] = useState(null);

  // http request to fetch available places
  useEffect(() => {
    setIsFetching(true);
    async function fetchPlaces() {

      try {
        const places = await fetchAvailablePlace();

        navigator.geolocation.getCurrentPosition((position) => {
          const sortedPlaces = sortPlacesByDistance(
            places,
            position.coords.latitude,
            position.coords.longitude
          );
          setAvailablePlaces(sortedPlaces);
          setIsFetching(false);
        });

      } catch (error) {
        setError({ message: error.message || 'An error occurred' });
        setIsFetching(false);
      }

    }

    fetchPlaces();

    // fetch('http://localhost:3000/places')
    //   .then((response) => response.json())
    //   .then((data) => setAvailablePlaces(data.places))
    //   .catch((error) => console.error('Error:', error));
  }, []);


  if (error) {
    return <ErrorPage title="An error occurred" message={error.message} />;
  }

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isFetching}
      loadingText="Loading places..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
