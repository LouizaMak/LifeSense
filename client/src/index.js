import React from "react";
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import routes from './routes';
import { AppProvider } from './components/AppContext';

const router = createBrowserRouter(routes);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  );