import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes';
import { ApolloClient, createNetworkInterface, ApolloProvider } from 'react-apollo';
import 'semantic-ui-css/semantic.min.css';

const networkInterface = createNetworkInterface({
  uri: 'http://localhost:8080/graphql',
})

const client = new ApolloClient({
  networkInterface: networkInterface
});


const App = (
  <ApolloProvider client={client}>
    <Routes />
  </ApolloProvider>
);

ReactDOM.render( App , document.getElementById('root'));
