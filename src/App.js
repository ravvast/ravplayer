import React from 'react';

import { AppContextProvider } from './providers/AppContextProvider';
import CardContainer from './containers/CardContainer';
import Layout from './containers/Layout';

const App = () => (
  <AppContextProvider>
    <Layout>
      <CardContainer />
    </Layout>
  </AppContextProvider>
);

export default App;
