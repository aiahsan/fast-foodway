import "react-native-gesture-handler";
import * as React from "react";

import AuthLoading from "./Navigation/index";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/lib/integration/react';
import { store, persistor } from './configuration'
import { RootSiblingParent } from 'react-native-root-siblings';



export default function App() {
  console.disableYellowBox = true;
  return (
    <RootSiblingParent>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <AuthLoading />
        </PersistGate>
      </Provider>
    </RootSiblingParent>
  );
}
