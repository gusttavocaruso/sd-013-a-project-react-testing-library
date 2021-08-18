import React from 'react';
import { Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';

function renderWithRouter(component) {
  const historyMock = createMemoryHistory();

  const objRender = render(
  <Router history={ historyMock }>
    { component }
  </Router>,
  );

  return {
    ...objRender,
    history: historyMock,
  }
}

export default renderWithRouter;
