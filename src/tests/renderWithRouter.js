import React from 'react';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  const objectRender = {
    ...render(<Router history={ history }>{component}</Router>),
  };
  return ({
    ...objectRender,
    history,
  });
};

export default renderWithRouter;
