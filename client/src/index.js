import React from "react";
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import routes from './routes';
import { AppProvider } from './components/AppProvider';
import { AIProvider } from "./components/AIProvider";

const router = createBrowserRouter(routes);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AppProvider>
      <AIProvider>
        <RouterProvider router={router} />
      </AIProvider>
    </AppProvider>
  );