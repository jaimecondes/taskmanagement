import { useQuery, useMutation } from '@apollo/client';
import { FlatList, Text, View, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { GET_TASKS } from '../graphql/queries';
import { DELETE_TASK } from '../graphql/mutation';
import { MARK_TASK_DONE } from '../graphql/mutation';
import { MARK_TASK_NOT_DONE } from '../graphql/mutation';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import moment from 'moment';
import { formatDatetimestamp } from '../components/FormatDate';
import { Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';



const router = useRouter();
export default function TaskList() {
  const [page, setPage] = useState(1);
  const { data, loading, error, refetch } = useQuery(GET_TASKS, {
    variables: { page },
    fetchPolicy: 'network-only', 
  });

  const [markTaskDone] = useMutation(MARK_TASK_DONE, {
  onCompleted: () => refetch(),
});

 const [markTasknotDone] = useMutation(MARK_TASK_NOT_DONE, {
  onCompleted: () => refetch(),
});

  const [deleteTask] = useMutation(DELETE_TASK, {
    onCompleted: () => refetch(),
  });

  const handleMarkAsDone = async (id: string) => {
  try {
    const { data } = await markTaskDone({ variables: { id } });
    if (data?.markTaskDone) {
      Alert.alert('Success', 'Task marked as done');
      refetch();
    } else {
      Alert.alert('Failed', 'Could not mark task as done.');
    }
  } catch (err: any) {
    console.error('Mark as done error:', err);
    Alert.alert('Error', err.message || 'Something went wrong');
  }
};
const handleMarkAsnotDone = async (id: string) => {
  try {
    const { data } = await markTasknotDone({ variables: { id } });
    if (data?.markTasknotDone) {
      Alert.alert('Success', 'Task marked as done');
      refetch();
    } else {
      Alert.alert('Failed', 'Could not mark task as done.');
    }
  } catch (err: any) {
    console.error('Mark as done error:', err);
    Alert.alert('Error', err.message || 'Something went wrong');
  }
};
  const handleDelete = async (id: string) => {
     try {
    const { data } = await deleteTask({ variables: { id } });
    if (data?.deleteTask) {
      Alert.alert('Success', data.deleteTask); 
      refetch();
    } else {
      Alert.alert('Failed', 'Task not deleted.');
    }
  } catch (err: any) {
    console.error('Delete error:', err);
    Alert.alert('Error', err.message || 'Something went wrong');
  }
  };

  const handleUpdate = (task: any) => {
     router.push({
      pathname: '/pages/EditTaskScreen',
      params: {
        id: task.id,
        name: task.name,
        description: task.description,
        dueDate: task.dueDate,
      },
    });
  };

  if (loading) return <Text style={styles.message}>Loading...</Text>;
  if (error) return <Text style={styles.message}>Error: {error.message}</Text>;

  return (
    <View style={styles.container}>
      <Button title="Refresh Tasks" onPress={() => refetch({ page })} />
      <FlatList
        data={data.tasks}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <View style={styles.taskInfo}>
              <Text style={styles.taskName}>{item.name}</Text>
              <Text style={styles.taskStatus}>{formatDatetimestamp(item.dueDate)}</Text>
              
            <Picker
              selectedValue={item.done ? 'done' : 'notDone'}
              style={styles.picker}
              onValueChange={(value) => {
                const newStatus = value === 'done';
                if (item.done !== newStatus) {
                  markTaskDone({ variables: { id: item.id} })
                    .then(() => refetch())
                    .catch(err => {
                      console.error('MarkTaskDone error:', err);
                      Alert.alert('Error', 'Failed to update status');
                    });
                }else{
                  markTasknotDone({ variables: { id: item.id} })
                    .then(() => refetch())
                    .catch(err => {
                      console.error('MarkTaskDone error:', err);
                      Alert.alert('Error', 'Failed to update status');
                    });
                }
              }}
            >
              <Picker.Item label="Not Done" value="notDone" />
              <Picker.Item label="Done" value="done" />
            </Picker>

            </View>
            <View style={styles.actions}>
              <TouchableOpacity
                style={[styles.button, styles.update]}
                onPress={() => handleUpdate(item)}
              >
                <Text style={styles.buttonText}>Update</Text>
              </TouchableOpacity>
              <TouchableOpacity
                    style={[styles.button, styles.delete]}
                    onPress={() => {
                      Alert.alert(
                        'Confirm Delete',
                        'Are you sure you want to delete this task?',
                        [
                          { text: 'Cancel', style: 'cancel' },
                          { text: 'Delete', style: 'destructive', onPress: () => handleDelete(item.id) },
                        ],
                        { cancelable: true }
                      );
                    }}
                  >
                    <Text style={styles.buttonText}>Delete</Text>
                  </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <View style={styles.pagination}>
        <Button title="Prev" onPress={() => setPage((p) => Math.max(1, p - 1))} />
        <Text style={styles.pageNum}>Page {page}</Text>
        <Button title="Next" onPress={() => setPage((p) => p + 1)} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 10, flex: 1 },
  list: { paddingVertical: 10 },
  message: { padding: 10, textAlign: 'center' },
  taskItem: {
    backgroundColor: '#f8f8f8',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    elevation: 1,
  },
  markDone: {
    backgroundColor: '#2196F3',
  },
  taskInfo: {
    marginBottom: 10,
  },
  taskName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  taskStatus: {
    fontSize: 14,
    color: '#666',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
  },
  button: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  update: {
    backgroundColor: '#4CAF50',
  },
  delete: {
    backgroundColor: '#f44336',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  pageNum: {
    fontSize: 16,
    fontWeight: '500',
  },
  done: {
  backgroundColor: '#2196F3',
},
picker: {
  height: 50,
  width: 150,
  marginTop: 5,
  backgroundColor: '#e0e0e0',
  borderRadius: 4,
},
});
