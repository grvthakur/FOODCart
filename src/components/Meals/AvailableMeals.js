// import Card from "../UI/Card";

// import MealItem from "./MealItem";

// import Card from "../UI/Card";

// import classes from "./AvailableMeals.module.css";

// const DUMMY_MEALS = [
//   {
//     id: "m1",
//     name: "Sushi",
//     description: "Finest fish and veggies",
//     price: 22.99,
//   },
//   {
//     id: "m2",
//     name: "Schnitzel",
//     description: "A german specialty!",
//     price: 16.5,
//   },
//   {
//     id: "m3",
//     name: "Barbecue Burger",
//     description: "American, raw, meaty",
//     price: 12.99,
//   },
//   {
//     id: "m4",
//     name: "Green Bowl",
//     description: "Healthy...and green...",
//     price: 18.99,
//   },
// ];

// const AvailableMeals = () => {
//   const mealsList = DUMMY_MEALS.map((meal) => (
//     <MealItem
//       key={meal.id}
//       id={meal.id}
//       name={meal.name}
//       description={meal.description}
//       price={meal.price}
//     />
//   ));

//   return (
//     <section className={classes.meals}>
//       <Card>
//         <ul>{mealsList}</ul>
//       </Card>
//     </section>
//   );
// };

// export default AvailableMeals;

///--------------------------------------------METHOD-DUMMY DATA ----------------------------------------------------------//////////////

// const DUMMY_MEALS = [
//   {
//     id: "m1",
//     name: "Roti",
//     description: "Chapati as combination",
//     price: 20,
//   },
//   {
//     id: "m2",
//     name: "Chicken Butter Masala",
//     description: "A Indian specialty!",
//     price: 200,
//   },
//   {
//     id: "m3",
//     name: "Barbecue Burger",
//     description: "raw, meaty",
//     price: 60,
//   },
//   {
//     id: "m4",
//     name: "Green salad",
//     description: "Healthy...and green...",
//     price: 150,
//   },
//   {
//     id: "m5",
//     name: "Biryani",
//     description: "Healthy and soft.",
//     price: 175,
//   },
//   {
//     id: "m6",
//     name: "Chhole Bhature",
//     description: "Tasty and spicy.",
//     price: 75,
//   },
// ];
// export default function AvailableMeals(props) {
//   // const mealsList=DUMMY_MEALS.map(meal=><li>{meal.name}</li>) ;
//   const mealsList = DUMMY_MEALS.map((meal) => (
//     <MealItem
//       id={meal.id}
//       key={meal.id}
//       name={meal.name}
//       description={meal.description}
//       price={meal.price}
//     />
//   ));
//   return (
//     <section className={classes.meals}>
//       <Card>
//         <ul>{mealsList}</ul>
//       </Card>
//     </section>
//   );
// }

//-----------------------------USING FETCH HTTP METHOD-----------------------------------------------------------------------------///
import MealItem from "./MealItem/MealItem";
import React, { useEffect, useState } from "react";
import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const [httpError, setHttpError] = useState();

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        "https://mealapp-66c5a-default-rtdb.firebaseio.com/meals.json"
      );

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const responseData = await response.json();

      const loadedMeals = [];

      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }
      setMeals(loadedMeals);
      setIsLoading(false);
    };

    fetchMeals().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  if (isLoading) {
    return (
      <section className={classes.MealsLoading}>
        <p>is Loading...</p>
      </section>
    );
  }

  if (httpError) {
    return (
      <section className={classes.MealsError}>
        <p>{httpError}</p>
      </section>
    );
  }

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
