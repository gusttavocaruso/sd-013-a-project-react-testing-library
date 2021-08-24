import React from 'react';
import { Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';

function RenderWithRouter(component) {
  const historyMock = createMemoryHistory();

  const objectRender = render(
    <Router history={ historyMock }>
      {component}
    </Router>,
  );

  return {
    ...objectRender,
    history: historyMock,
  };
}

export default RenderWithRouter;
