import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Button,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { useMutation } from '@apollo/client';
import { UPDATE_TASK } from '../graphql/mutation';
import DateTimePicker from '@react-native-community/datetimepicker';
import { formatDatetimestamp } from '../components/FormatDate';


export default function EditTaskScreen() {
  const { id, name: initialName, description: initialDesc, dueDate: initialDate } = useLocalSearchParams();
  const router = useRouter();

  const [name, setName] = useState(initialName as string);
  const [description, setDescription] = useState(initialDesc as string);
  const parsedDate = new Date(Number(initialDate));
  const [dueDate, setDueDate] = useState(!isNaN(parsedDate.getTime()) ? parsedDate : new Date());

  const [showPicker, setShowPicker] = useState(false);
  const [updateTask] = useMutation(UPDATE_TASK);

  const onChangeDate = (event: any, selectedDate?: Date) => {
    setShowPicker(Platform.OS === 'ios');
    if (selectedDate) {
      setDueDate(selectedDate);
    }
  };
  const handleUpdate = async () => {
    await updateTask({
      variables: { id, name, description, dueDate: formatDatetimestamp(dueDate) },
    });
    router.back(); // Navigate back to task list
  };

  return (
    <View style={styles.container}>
      <TextInput value={name} onChangeText={setName} style={styles.input} placeholder="Task Name" />
      <TextInput value={description} onChangeText={setDescription} style={styles.input} placeholder="Description" />
      <TouchableOpacity onPress={() => setShowPicker(true)}>
        <TextInput value={formatDatetimestamp(dueDate)} style={styles.input} editable={false} />
      </TouchableOpacity>
            
      {showPicker && (
        <DateTimePicker
          value={dueDate}
          mode="date"
          display="default"
          onChange={onChangeDate}
        />
      )}
      <Button title="Update Task" onPress={handleUpdate} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 8,
    borderRadius: 5,
  },
});
