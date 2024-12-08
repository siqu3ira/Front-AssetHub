import React from 'react'
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.js'

// condigurando o router
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import PrivateRoute from './routes.jsx';

import Login from './pages/Login.jsx'
import Home from './pages/Home.jsx'
import Hosts_Virtuais from './pages/Hosts_Virtuais.jsx';
import Hardware from './pages/Hardware.jsx';
import Ambiente from './pages/Ambiente.jsx';
import Site from './pages/Site.jsx';
import { QueryClient, QueryClientProvider } from 'react-query';
import Host_Details from './pages/Host_Details.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />
  },
  {
    path: "/home",
    element: 

    <PrivateRoute>
      <Home />
    </PrivateRoute>
  },
  {
    path: "/hosts-virtuais",
    element: 

    <PrivateRoute>
      <Hosts_Virtuais />
    </PrivateRoute>
  },
  {
    path: "/hardware",
    element: 
    
    <PrivateRoute>
      <Hardware />
    </PrivateRoute>
  },
  {
    path: "/ambiente",
    element: 
    
    <PrivateRoute>
      <Ambiente />
    </PrivateRoute>
  },
  {
    path: "/site",
    element: 
    
    <PrivateRoute>
      <Site />
    </PrivateRoute>
  },
  {
    path: "/host-details",
    element: 
    
    <PrivateRoute>
      <Host_Details />
    </PrivateRoute>
  },
  {
    path: "*",
    element: <Login /> 
  }
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>,
)
