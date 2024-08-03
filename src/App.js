import { useState } from "react";
import { useEffect } from "react";
import { Nutrition } from "./Nutrition";
import { LoaderPage } from "./LoaderPage";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Swal from "sweetalert2";


function App() {

  const [mySearch, setMySearch] = useState();
  const [wordSubmitted, setWordSubmitted] = useState('');
  const [myNutrition, setMyNutrition] = useState();
  const [stateLoader, setStateLoader] = useState(false);

  //наш ID, KEY - только наши, сгенерированные на сайте edamam
  const APP_ID = "02040090";
  const APP_KEY = "56280d4d39f1842aa54883bead1dedf4";
  const APP_URL = 'https://api.edamam.com/api/nutrition-details'

 //функция для API
  const fetchData = async (ingr) => {
    setStateLoader(true); 

    //наш API запрос - POSt, поэтому нужно headers, body, method
    const response = await fetch(`${APP_URL}?app_id=${APP_ID}&app_key=${APP_KEY}`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ingr: ingr })
    })

    if(response.ok) {
      setStateLoader(false); 
      const data = await response.json(); 
      setMyNutrition(data); 
    } else {
      setStateLoader(false); 
      Swal.fire({
        title: "Ooops!",
        text: "Please enter the ingredients correctly",
        icon: "warning",
        confirmButtonColor: "#dfa909",
      });
    }
  }

  const myRecipeSearch = e => {
    setMySearch(e.target.value);
  }

  const finalSearch = e => {
    e.preventDefault(); //избавляемся от перезагрузки страницы 
    setWordSubmitted(mySearch); //состояние меняется на то, что введено
  }

  useEffect(() => {
    if (wordSubmitted !== '') {
      let ingr = wordSubmitted.split(/[,,;,\n,\r]/); 
      fetchData(ingr);
    }
  }, [wordSubmitted]) 


const labelsOrder = [
  'Protein',
  'Carbohydrates (net)',
  "Carbohydrate, by difference",
  'Total lipid (fat)',
  "Fatty acids, total monounsaturated",
  "Fatty acids, total polyunsaturated",
  "Fatty acids, total saturated",
  "Fatty acids, total trans",
  'Sugars, total including NLEA',
  "Cholesterol",
  'Iron, Fe',
  "Vitamin E (alpha-tocopherol)",
  "Vitamin A, RAE",
  "Vitamin B-6",
  "Vitamin B-12",
  "Vitamin B-12",
  "Vitamin C, total ascorbic acid",
  'Vitamin D (D2 + D3)',
  "Vitamin K (phylloquinone)",
  "Zinc, Zn",
  "Magnesium, Mg",
  'Calcium, Ca',
  "Fiber, total dietary",
  "Folic acid",
  "Folate, DFE",
  "Folate, food",
  "Potassium, K",
  "Sodium, Na",
  "Niacin",
  "Phosphorus, P",
  "Riboflavin",
  "Thiamin",
  "Energy",
  "Water",
  // Другие метки, если есть
];
  

  return (
    <div className="App container" >
      {stateLoader && <LoaderPage />}
      <h1 className="hOne">Nutrition Analysis</h1>
        <form onSubmit={finalSearch} className="formBlock" >
          <div className="inputBlock">
            <input
              className="input"
              placeholder="Search..."
              onChange={myRecipeSearch}
            />
            <p className="inputHelpBloc">Please type the quantity (pcs, g, kg) and the product name.</p>
          </div>
          <Button type="submit" variant="warning" size="lm" id="button-addon2" className="btn">Search</Button>
        </form>
    <div className="container">
  <div>
    {
      myNutrition && <p className="Calories"> Calories {myNutrition.calories} </p>
    }
    {
      myNutrition && 
      labelsOrder.map((desiredLabel, id) => {
        const element = Object.values(myNutrition.totalNutrients)
          .find((el) => el.label === desiredLabel);

        if (!element) {
          return null; // Пропускать, если метка не найдена в данных
        }

        const { label, quantity, unit } = element;
        const classCss = label === 'Protein' ||
          label === 'Total lipid (fat)' ||
          label === 'Carbohydrates (net)' 
          ? "red" : "black";

        return (
          <div key={id} className={`${classCss} ${"item"}`}>
            <Nutrition
              label={label}
              quantity={quantity}
              unit={unit}
            />
          </div>
        );
      })
    }
  </div>
</div>
</div>
);
}

export default App;



