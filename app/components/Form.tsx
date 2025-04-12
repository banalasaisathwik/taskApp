import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import { useState } from 'react';
import { Feather } from '@expo/vector-icons';
import Animated, { FadeInUp, FadeOutDown } from 'react-native-reanimated';

interface FormProps {
  onSubmit: (title: string) => void;
  onClose: () => void;
}

export default function Form({ onSubmit, onClose }: FormProps) {
  const [title, setTitle] = useState('');

  const handleSubmit = () => {
    if (title.trim()) {
      onSubmit(title.trim());
      setTitle('');
      onClose();
    }
  };

  return (
    <Animated.View
      entering={FadeInUp}
      exiting={FadeOutDown}
      className="absolute bottom-0 left-0 right-0 bg-white p-4 rounded-t-3xl shadow-xl"
    >
      <View className="flex-row items-center space-x-4">
        <View className="flex-1 bg-gray-100 rounded-xl px-4 py-3">
          <TextInput
            value={title}
            onChangeText={setTitle}
            placeholder="Add a new task..."
            placeholderTextColor="#94a3b8"
            className="text-base text-gray-800"
            autoFocus
            returnKeyType="done"
            onSubmitEditing={handleSubmit}
          />
        </View>
        <TouchableOpacity
          onPress={handleSubmit}
          className="bg-indigo-600 p-3 rounded-xl"
          disabled={!title.trim()}
        >
          <Feather name="check" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onClose}
          className="bg-gray-200 p-3 rounded-xl"
        >
          <Feather name="x" size={24} color="#64748b" />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}