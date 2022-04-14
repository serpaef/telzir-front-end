import React, { useEffect, useState } from 'react';
import { Form, Row, Col, Container, FloatingLabel } from 'react-bootstrap';

function PriceCalculator({ rates, plans }) {
  const [ratePrice, setRatePrice] = useState(0);
  const [planMinutes, setPlanMinutes] = useState(0);
  const [callMinutes, setCallMinutes] = useState(0);
  const [priceWithPlan, setPriceWithPlan] = useState(0);
  const [priceWithoutPlan, setPriceWithoutPlan] = useState(0);

  const changeController = (setter, {target: {value}}) => {
    // TODO set states and calculate prices
  }

  const calcPriceWithPlan = () => {
    // TODO
  }

  const calcPriceWithoutPlan = () => {
    // TODO
  }

  useEffect(() => {
    if (plans && rates) {
      setPlanMinutes(plans[0].minutes);
      setRatePrice(rates[0].pricePerMinute);
    }
    // setting initial values accordingly when component mount
  }, [rates, plans]);

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
                value={ratePrice}
                onChange={({ target: { value } }) => setRatePrice(+value)}
              >
                {rates &&
                  rates.map((rate) => (
                    <option
                      key={rate.id}
                      value={rate.pricePerMinute}
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
                onChange={({ target: { value } }) => setPlanMinutes(+value)}
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
                onChange={({ target: { value } }) => setCallMinutes(+value)}
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
