import React, { useState, useEffect } from "react";
import Card from "../../Components/Card/Card";
import Button from "../../Components/Button/Button";
import styles from "./index.module.css";
import AddCinema from "../../Components/Form/AddCinema";
import { apiClient } from "../../client/apiClient";
import Loading from "../../Components/Loading/Loading";

function Cinema() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    document.title = "Cines";
    const getData = async () => {
      try {
        const result = await apiClient.get("cinemas");
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
          Add Cinema
        </Button>
        <h1 className={styles.subtitle}>Last Cinemas</h1>
        <div className={styles.movies}>
          {data.map((item) => (
            <Card
              key={item.id}
              title={item.name}
              description={item.address}
              genre={item.phone}
              imageUrl={`img/cinemas/cinema.jpg`}
            />
          ))}
        </div>

        <AddCinema
          open={open}
          onCancel={() => setOpen(false)}
          reload={() => setReload(!reload)}
        />
      </div>
    </>
  );
}

export default Cinema;
