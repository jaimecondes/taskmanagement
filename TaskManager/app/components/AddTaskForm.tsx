import { useState } from 'react';
import {
  Button,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useMutation } from '@apollo/client';
import { ADD_TASK } from '../graphql/mutation';

export default function AddTaskForm() {
  const [name, setName] = useState('');
  const [description, setDesc] = useState('');
  const [dueDate, setDueDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const [addTask] = useMutation(ADD_TASK);

  const submit = async () => {
    await addTask({
      variables: {
        name,
        description,
        dueDate: dueDate.toISOString(),
      },
    });
    setName('');
    setDesc('');
    setDueDate(new Date());
  };

  const onChangeDate = (event: any, selectedDate?: Date) => {
    setShowPicker(Platform.OS === 'ios');
    if (selectedDate) {
      setDueDate(selectedDate);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Task Name"
        style={styles.input}
      />
      <TextInput
        value={description}
        onChangeText={setDesc}
        placeholder="Description"
        style={styles.input}
      />

      <TouchableOpacity onPress={() => setShowPicker(true)}>
        <TextInput
          style={styles.input}
          placeholder="Due Date"
          value={dueDate.toDateString()}
          editable={false}
          pointerEvents="none" // Prevent keyboard from opening
        />
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={dueDate}
          mode="date"
          display="default"
          onChange={onChangeDate}
        />
      )}

      <Button title="Add Task" onPress={submit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 10 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});
