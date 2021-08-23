import React from 'react';
import { Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';

function renderWithRouter(component) {
  const historyMock = createMemoryHistory();
  const returnRender = render(
    <Router history={ historyMock }>
      {component}
    </Router>,
  );
  return {
    ...returnRender,
    history: historyMock,
  };
}

export default renderWithRouter;
