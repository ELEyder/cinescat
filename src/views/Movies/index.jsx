import React, { useState, useEffect } from "react";
import Card from "../../Components/Card/Card";
import Button from "../../Components/Button/Button";
import styles from "./index.module.css";
import AddMovie from "../../Components/Form/AddMovie";
import { apiClient } from "../../client/apiClient";
import Loading from "../../Components/Loading/Loading";

function Movies() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    document.title = "Home";
    const getData = async () => {
      try {
        const result = await apiClient.get("movies");
        setData(result.data);
        setLoading(false);
      } catch (error) {
        setError("Error fetching data");
        setLoading(false);
      }
    };

    getData();
    const timer = setTimeout(() => {
      getData();
    }, 1000);

    return () => clearTimeout(timer);
  }, [reload]);

  if (loading) return <Loading />;
  if (error) return <p>{error}</p>;

  return (
    <>
      <div className={styles.content}>
        <Button
          onClick={() => {
            setOpen(true);
          }}
        >
          Add Movie
        </Button>
        <h1 className={styles.subtitle}>Last Movies</h1>
        <div className={styles.movies}>
          {data.map((item) => (
            <Card
              key={item.id}
              title={item.title}
              description={item.description}
              genre={item.genre}
              imageUrl={item.imageUrl}
            />
          ))}
        </div>

        <AddMovie
          open={open}
          onCancel={() => setOpen(false)}
          reload={() => setReload(!reload)}
        />
      </div>
    </>
  );
}

export default Movies;
