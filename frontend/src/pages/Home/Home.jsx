import React, { useState, useEffect } from 'react';
import Card from '../../Components/Card/Card';
import styles from './Home.module.css';
import { fetchData } from "../../api/api";
import imgCinema from "../../assets/img/cinemas/cinema.jpg"

function Home() {
  const [data, setData] = useState({ movies: [], cinemas: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    document.title = "Home";

    const getData = async () => {
      try {
        setLoading(true);
        const moviesResult = await fetchData('movies');
        const cinemasResult = await fetchData('cinemas');
        setData({ movies: moviesResult, cinemas: cinemasResult });
      } catch (error) {
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const renderCards = (dataList, type) => {
    if (dataList.length === 0) {
      return <p className={styles.subtitle}>No {type}</p>;
    }
    return (
      <div className={styles.movies}>
        {dataList.map(item => (
          <Card 
            key={item.id}
            title={type === 'Movies' ? item.title : item.name}
            description={type === 'Movies' ? item.description : item.address}
            genre={type === 'Movies' ? item.genre : item.phone}
            imageUrl={type === 'Movies' ? item.imageUrl : `${imgCinema}?t=${new Date().getTime()}`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className={styles.content}>
      <h1 className={styles.subtitle}>Last Movies</h1>
      {renderCards(data.movies, 'Movies')}
      <h1 className={styles.subtitle}>Last Cinemas</h1>
      {renderCards(data.cinemas, 'Cinemas')}
    </div>
  );
}

export default Home;
