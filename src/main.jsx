import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Toaster } from 'react-hot-toast'
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';

import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { split, HttpLink } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';

const httpLink = new HttpLink({
  uri: 'https://funny-cricket-50.hasura.app/v1/graphql',
  headers: {
    "x-hasura-admin-secret": 'gyzZ333C2ycqQI8NphEIDaDDI5eAtpKvItZlEiPZiDhW17h3aeG2jzVpuMmtaHFF'
  },
});

const wsLink = new GraphQLWsLink(createClient({
  url: 'ws://funny-cricket-50.hasura.app/v1/graphql',
  connectionParams: {
    headers: {
      "x-hasura-admin-secret": 'gyzZ333C2ycqQI8NphEIDaDDI5eAtpKvItZlEiPZiDhW17h3aeG2jzVpuMmtaHFF'
    },
  },
}));

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);



const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});


ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <ApolloProvider client={client}>
      <App />
      <Toaster />
    </ApolloProvider>
  </>
)
