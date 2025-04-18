import React from 'react';

import { AppContextProvider } from 'providers/AppContextProvider';
import Layout from 'containers/Layout';
import CardContainer from 'containers/CardContainer';

const App = () => (
  <AppContextProvider>
    <Layout>
      <CardContainer />
    </Layout>
  </AppContextProvider>
);

export default App;
