import { ApolloProvider } from '@apollo/client';
import { Stack } from 'expo-router';
import client from './graphql/apolloClient';

export default function RootLayout() {
  return (
    <ApolloProvider client={client}>
      <Stack />
    </ApolloProvider>
  );
}
