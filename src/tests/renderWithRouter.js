import React from 'react';
import { Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';

// código feito de acordo com o código da aula ao vivo
function renderWithRouter(component) {
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

export default renderWithRouter;
