import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

interface Props {
  setFilters: (filters: { done?: boolean; overdue?: boolean }) => void;
}

export default function TaskFilters({ setFilters }: Props) {
  return (
    <View style={styles.container}>
      <Button title="All" onPress={() => setFilters({})} />
      <Button title="Done" onPress={() => setFilters({ done: true })} />
      <Button title="Not Done" onPress={() => setFilters({ done: false })} />
      <Button title="Overdue" onPress={() => setFilters({ overdue: true })} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
  },
});
