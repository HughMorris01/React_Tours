import { useEffect, useState } from 'react';
import Tours from './Tours';
import Loading from './Loading';

const url = 'https://course-api.com/react-tours-project';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [tours, setTours] = useState();

  const removeTour = (id) => {
    const newTours = tours.filter((tour) => tour.id !== id);
    setTours(newTours);
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(url);
      const tourInfo = await response.json();
      setTours(tourInfo);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <main>
        <Loading />
      </main>
    );
  }

  if (tours.length === 0) {
    return (
      <main>
        <div className="title">
          <h2>No Tours Left</h2>
          <div className="title-underline"></div>
          <button
            type="button"
            className="btn"
            style={{ marginTop: '2rem' }}
            onClick={() => fetchData()}
          >
            Reload Tours
          </button>
        </div>
      </main>
    );
  }

  return (
    <main>
      <Tours tourData={tours} removeTour={removeTour} />
    </main>
  );
};
export default App;
