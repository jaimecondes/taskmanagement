import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://192.168.254.101:3000/graphql', // Replace with IP if on physical device
  cache: new InMemoryCache(),
});

export default client;
