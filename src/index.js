import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "./redux/store";
import Preloader from "./components/Preloader/Preloader";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <BrowserRouter>
          <Provider store={store}>
              <Suspense fallback={<Preloader/>}>
                  <App/>
              </Suspense>
          </Provider>
      </BrowserRouter>
  </React.StrictMode>
);

