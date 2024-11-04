import React, { useState } from "react";
import { useEffect } from "react";
import './meal.css';


const Meal = () => {
  const [mealdata, setMealdata] = useState([]);
  const [area, setArea] = useState("indian");
  const [inputData, setInputData] = useState("");

  useEffect(() => {
    const fetchDataFromApi = async () => {
      const api = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
      );
      const data = await api.json();

      console.log(data.meals);
      setMealdata(data.meals);
    };
    fetchDataFromApi();
  }, [area]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const api = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputData}`
    );
    const data = await api.json();

    console.log(data.meals);
    setMealdata(data.meals);
    setInputData('');
  };

  return (
    <>
      <div
        style={{
          width: "1000px",
          display: "flex",
          justifyContent: "space-between",
          marginLeft: "145px",
          marginTop: "20px",
        }}
        className="butnContainer"
      >
        <button
          onClick={() => setArea("Indian")}
          type="button"
          className="btn btn-primary"
        >
          Indian
        </button>
        <button
          onClick={() => setArea("Canadian")}
          type="button"
          className="btn btn-secondary"
        >
          Canadian
        </button>
        <button
          onClick={() => setArea("American")}
          type="button"
          className="btn btn-danger"
        >
          American
        </button>
        <button
          onClick={() => setArea("Thai")}
          type="button"
          className="btn btn-warning"
        >
          Thai
        </button>
        <button
          onClick={() => setArea("British")}
          type="button"
          className="btn btn-info"
        >
          British
        </button>
        <button
          onClick={() => setArea("Russian")}
          type="button"
          className="btn btn-light"
        >
          Russian
        </button>
      </div>

      <div>
        <form onSubmit={submitHandler} className="mx-auto text-center my-3">
          <input value={inputData} onChange={(e) => setInputData(e.target.value)} type="text" placeholder="Search for dish..."/>
        </form>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: "20px",
          justifyContent: "center",
          padding: "20px",
        }}
      >
        {mealdata.map((data) => (
          <div key={data.idMeal} style={{ textAlign: "center" }}>
            <div>
              <img
                src={data.strMealThumb}
                alt={data.strMeal}
                style={{
                  width: "220px",
                  borderRadius: "8px",
                  border: "2px solid yellow",
                }}
              />
            </div>
            <h3
              style={{
                marginTop: "10px",
                fontSize: "25px",
                fontWeight: "normal",
              }}
            >
              {data.strMeal}
            </h3>
          </div>
        ))}
      </div>
    </>
  );
};

export default Meal;
