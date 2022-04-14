import { useState } from 'react';
import './App.css';

// Second iteration: Going into business
// Third iteration: Extra hot
// Fourth iteration: Making money
// Fifth iteration Running out

function App() {
  const [commande, setCommande] = useState(null)
  const [error, setError] = useState(null)
  const [message, setMessage] = useState(null)

  const handleMakingDrinks = (drink, wantHotDrink, money, sugar) => {
    handleOrderTaking(drink, wantHotDrink, sugar)
    handleDrinkPayment(money, drink)
  }
  
  const handleOrderTaking = (drink, wantHotDrink, sugar) => {
    onPickDrink(drink, wantHotDrink);
    onPickSugarAndStick(sugar, drink);
  }

  const onPickDrink = (value, wantHotDrink) => {
    let drinkType
    switch (value) {
      case 'Thé':
        drinkType = 'T'
        break;
      case 'Chocolat':
        drinkType = 'H'
        break;
      case 'Café':
        drinkType = 'C'
        break;
      case 'Orange':
        drinkType = 'O'
        break;
      default:
        setError("Cette boisson n'est pas disponible")
        break;
    }
    drinkType = onPickHotDrink(wantHotDrink, drinkType)
    setCommande(drinkType)
  }

  const onPickHotDrink = (wantHotDrink, drinkType) => {
    return drinkType !== 'O' && wantHotDrink ? drinkType.concat('h') : drinkType
  }

  const onPickSugarAndStick = (sugarQuantity, drink) => {
    let orderInformation;
    if (sugarQuantity !== 0 && !drink.includes('Orange')) {
      orderInformation = `:${sugarQuantity}:0`
    } else {
      orderInformation = '::'
    }
    setCommande((prevCommande) => prevCommande = prevCommande.concat(orderInformation))
  }

  const handleDrinkPayment = (givenMoney, drink) => {
    let isMinimumAmount;
    switch (drink) {
      case 'Thé':
        isMinimumAmount = givenMoney >= 0.4
        console.log(isMinimumAmount)
        break;
      case 'Chocolat':
        isMinimumAmount = givenMoney >= 0.5
        break;
      case 'Café':
        isMinimumAmount = givenMoney >= 0.6   
        break;
      case 'Orange':
        isMinimumAmount = givenMoney >= 0.6   
        break;
      default:
        setError("Cette boisson n'est pas disponible")
        break;
    }
    if (!isMinimumAmount) {
      setMessage("M: Il n'a y pas assez argent pour la commande")
    }
  }

  return (
    <div className="App">
      <button onClick={() => handleMakingDrinks('Orange', true, 0.6, 2)}>Make drink</button>
      {!message ? (
        <div>{commande}</div>
      ) : (
        <div>{message}</div>
      )}
    </div>
  );
}

export default App;
