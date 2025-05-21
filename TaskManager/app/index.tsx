import { View } from 'react-native';
import AddTaskForm from './components/AddTaskForm';
import TaskList from './pages/TaskList';

export default function Index() {
  return (
    <View style={{ flex: 1, padding: 16 }}>
      <AddTaskForm />
      <TaskList />
    </View>
  );
}
