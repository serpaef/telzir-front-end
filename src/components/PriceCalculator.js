import React, { useEffect, useState, useCallback } from 'react';
import { Form, Row, Col, Container, FloatingLabel } from 'react-bootstrap';

const CALC_RATE_DIFF = 0.1;

function PriceCalculator({ rates, plans }) {
  const [rateId, setRateId] = useState(0);
  const [ratePrice, setRatePrice] = useState(0);
  const [planMinutes, setPlanMinutes] = useState(0);
  const [callMinutes, setCallMinutes] = useState(0);
  const [priceWithPlan, setPriceWithPlan] = useState(0);
  const [priceWithoutPlan, setPriceWithoutPlan] = useState(0);

  // better than repeat it every time on 'onChange'
  const changeController = (setter, { target: { value } }) => {
    setter(+value);

    const {pricePerMinute} = rates.find(rate => rate.id === rateId)
    
    setRatePrice(pricePerMinute)
    calcPriceWithPlan();
    calcPriceWithoutPlan();
  };

  // it sets the price to 0 if call minutes <= plan minutes
  // otherwise, it calculates the final price with the excess minutes, with the 10% increase
  const calcPriceWithPlan = useCallback(() => {
    if (callMinutes <= planMinutes) {
      setPriceWithPlan(() => 0);
    } else {
      const minutesToCalc = callMinutes - planMinutes;
      const rate = ratePrice + ratePrice * CALC_RATE_DIFF;
      const callPrice = minutesToCalc * rate;
      setPriceWithPlan(callPrice);
    }
  }, [callMinutes, planMinutes, ratePrice]);

  // well, this one just makes the math.
  const calcPriceWithoutPlan = useCallback(() => {
    const callPrice = ratePrice * callMinutes;
    setPriceWithoutPlan(() => callPrice);
  }, [callMinutes, ratePrice]);

  // setting up initial state on rendering with api data.
  useEffect(() => {
    if (rates && plans) {
      setRatePrice(rates[0].pricePerMinute);
      setPlanMinutes(plans[0].minutes);
    }
  }, [plans, rates]);

  // updating total prices on component.
  useEffect(() => {
    calcPriceWithPlan();
    calcPriceWithoutPlan();
  }, [rates, plans, calcPriceWithPlan, calcPriceWithoutPlan]);

  return (
    <Container>
      <Form className='m-3'>
        <Row className='align-items-center'>
          <Col xs='auto'>
            <FloatingLabel
              controlId='floatingInput'
              label='Chamada'
              className='mb-2'
            >
              <Form.Select
                value={rateId}
                onChange={(event) => changeController(setRateId, event)}
              >
                {rates &&
                  rates.map((rate) => (
                    <option
                      key={rate.id}
                      value={rate.id}
                    >{`De ${rate.origin} para ${rate.destination}`}</option>
                  ))}
              </Form.Select>
            </FloatingLabel>
          </Col>
          <Col xs='auto'>
            <FloatingLabel
              controlId='floatingInput'
              label='Plano'
              className='mb-2'
            >
              <Form.Select
                value={planMinutes}
                onChange={(event) => changeController(setPlanMinutes, event)}
              >
                {plans &&
                  plans.map((plan) => (
                    <option key={plan.id} value={plan.minutes}>
                      {plan.plan}
                    </option>
                  ))}
              </Form.Select>
            </FloatingLabel>
          </Col>
          <Col xs='auto'>
            <FloatingLabel
              controlId='floatingInput'
              label='Minutos de chamada'
              className='mb-2'
            >
              <Form.Control
                type='number'
                defaultValue={callMinutes}
                onChange={(event) => changeController(setCallMinutes, event)}
              />
            </FloatingLabel>
          </Col>
          <Col xs='auto'>
            <p>Com FaleMais:</p>
            <p>{`R$${priceWithPlan.toFixed(2)}`}</p>
          </Col>
          <Col xs='auto'>
            <p>Sem FaleMais:</p>
            <p>{`R$${priceWithoutPlan.toFixed(2)}`}</p>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}

export default PriceCalculator;
