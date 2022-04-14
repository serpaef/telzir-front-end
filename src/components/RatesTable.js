import React, { useEffect } from 'react';
import { Container, Table } from 'react-bootstrap';

function RatesTable({rates}) {
  useEffect(()=>{}, [rates]);
  
  return (
    <Container>
      <Table striped bordered hover size='sm' className='m-3'>
        <thead>
          <tr>
            <th>Origem</th>
            <th>Destino</th>
            <th>Preço por minuto</th>
          </tr>
        </thead>
        <tbody>
          {
            rates && rates.map((rate) => {
              return (
                <tr key={rate.id}>
                  <td>{rate.origin}</td>
                  <td>{rate.destination}</td>
                  <td>{`R$${(rate.pricePerMinute).toFixed(2)}`}</td>
                </tr>
              )
            })
          }
        </tbody>
      </Table>
    </Container>
  );
}

export default RatesTable;
