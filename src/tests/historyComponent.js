import React from 'react';
import { Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';

// Passa o componente como parametro e renderiza com a rota e o histórico daquela rota.
// Eu vi um erro no slack do Rodrigo Pova, vou deixar o componente na pasta de teste e na pasta de componente só para garantir.

const historyComponent = (component) => {
  const history = createMemoryHistory();
  return ({ ...render(
    <Router history={ history }>
      {component}
    </Router>,
  ),
  history,
  });
};

export default historyComponent;
