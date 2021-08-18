import React from 'react';
import { render } from '@testing-library/react';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';

function renderWithRouter(component) {
  const historyMock = createMemoryHistory();

  const objectRender = render(
    <Router history={ historyMock }>
      { component }
    </Router>,
  );

  return {
    ...objectRender,
    history: historyMock,
  };
}

export default renderWithRouter;
