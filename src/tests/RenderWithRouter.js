import React from 'react';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

const RenderWithRouter = (component) => {
  const getHistory = createMemoryHistory();
  return ({
    ...render(<Router history={ getHistory }>{ component }</Router>), getHistory,
  });
};

export default RenderWithRouter;
