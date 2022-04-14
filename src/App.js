import React, {useState, useEffect } from 'react';
import Header from './components/Header';
import PriceCalculator from './components/PriceCalculator';
import RatesTable from './components/RatesTable';
import { requestData } from './services/requests';

function App() {
  const [plans, setPlans] = useState([])
  const [rates, setRates] = useState();

  useEffect(() => {
    async function fetchData() {
      const apiPlans = await requestData('/plans');
      const apiRates = await requestData('/rates');
      setPlans(apiPlans);
      setRates(apiRates);
    }

    fetchData();
  }, [])
  
  return (
    <div>
      <Header />
      <PriceCalculator plans={plans} rates={rates} />
      <RatesTable rates={rates} />
    </div>
  );
}

export default App;
