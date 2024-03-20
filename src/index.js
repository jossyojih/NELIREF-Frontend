import React from 'react'
import { createRoot } from 'react-dom/client'
import 'normalize.css'
import './index.css'
import App from './App'
// import { store } from './store'
import { Provider } from 'react-redux'
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { GoogleOAuthProvider } from '@react-oauth/google';
const queryClient = new QueryClient()

const container = document.getElementById('root')
const root = createRoot(container)

root.render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
          <App />
        </GoogleOAuthProvider>
      </PersistGate>
    </Provider>
  </QueryClientProvider>
)
