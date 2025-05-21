// components/DueDatePicker.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

type Props = {
  dueDate: Date;
  setDueDate: (date: Date) => void;
};

export default function DueDatePicker({ dueDate, setDueDate }: Props) {
  const [showPicker, setShowPicker] = useState(false);

  const onChange = (event: any, selectedDate?: Date) => {
    setShowPicker(Platform.OS === 'ios'); // On iOS, stay open; on Android, close
    if (selectedDate) setDueDate(selectedDate);
  };

  return (
    <View style={{ marginBottom: 10 }}>
      <TouchableOpacity onPress={() => setShowPicker(true)}>
        <Text
          style={{
            fontSize: 16,
            padding: 10,
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 5,
          }}
        >
          📅 Due Date: {dueDate.toDateString()}
        </Text>
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={dueDate}
          mode="date"
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
}
