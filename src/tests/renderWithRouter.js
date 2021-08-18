// Criei essa função pois olhando por cima parecia que app
// teria um router, assim consigo testar ele.
// Ela foi copiada da ultima aula.
// https://github.com/VictorDizne/Trybe_Exercises/blob/master/bloco_15/dia_2/src/renderWithRouter.js

import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return ({
    ...render(<Router history={ history }>{component}</Router>), history,
  });
};

export default renderWithRouter;
