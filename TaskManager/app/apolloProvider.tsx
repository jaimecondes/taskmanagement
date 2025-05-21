import React, { ReactNode } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql', // Replace with your actual backend URL
  cache: new InMemoryCache(),
});

interface Props {
  children: ReactNode;
}

export default function ProviderWrapper({ children }: Props) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}