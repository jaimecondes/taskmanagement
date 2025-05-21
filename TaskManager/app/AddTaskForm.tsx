import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { gql, useMutation } from '@apollo/client';
import DueDatePicker from './components/DatePicker';

const ADD_TASK = gql`
  mutation AddTask($name: String!, $description: String, $dueDate: String) {
    addTask(name: $name, description: $description, dueDate: $dueDate) {
      id
      name
      done
    }
  }
`;

export default function AddTaskForm() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState(new Date());

  const [addTask] = useMutation(ADD_TASK, {
    refetchQueries: ['GetTasks'],
  });

  const handleSubmit = () => {
    if (!name) return;
    addTask({
      variables: {
        name,
        description,
        dueDate: dueDate.toISOString(), // Convert to string for GraphQL
      },
    });
    setName('');
    setDescription('');
    setDueDate(new Date());
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Task Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
      />
     
      <Button title="Add Task" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 10 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 10,
    borderRadius: 5,
  },
});
