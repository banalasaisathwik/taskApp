import { Text, View, ScrollView, TouchableOpacity, StatusBar } from "react-native";
import { useState, useCallback } from "react";
import { Feather } from '@expo/vector-icons';
import Animated, { 
  FadeIn,
  FadeInDown,
  Layout,
  SlideInRight
} from 'react-native-reanimated';
import Form from './components/Form';

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export default function Index() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: "Complete React Native Tutorial", completed: false },
    { id: 2, title: "Design Task List UI", completed: true },
    { id: 3, title: "Implement Google Authentication", completed: false },
    { id: 4, title: "Add Backend Integration", completed: false },
    { id: 5, title: "Write Unit Tests", completed: false },
    { id: 6, title: "Deploy to App Store", completed: true },
    { id: 7, title: "Update Documentation", completed: false },
    { id: 8, title: "Refactor Codebase", completed: false },
    { id: 9, title: "Optimize Performance", completed: false },
    { id: 10, title: "Conduct User Testing", completed: false },
    { id: 11, title: "Gather Feedback", completed: false },
    { id: 12, title: "Plan Next Steps", completed: false },
    { id: 13, title: "Create Marketing Strategy", completed: false },
  ]);

  const [showForm, setShowForm] = useState(false);

  const toggleTask = useCallback((id: number) => {
    setTasks(prev => 
      prev.map(task => 
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }, []);

  const handleAddTask = (title: string) => {
    const newTask: Task = {
      id: Date.now(),
      title,
      completed: false
    };
    setTasks(prev => [...prev, newTask]);
  };

  return (
    <View className="flex-1 bg-slate-50">
      <StatusBar barStyle="light-content" />
      
      {/* Header */}
      <Animated.View 
        entering={FadeInDown.duration(500)}
        className="bg-indigo-600 pt-12 pb-6 px-4 rounded-b-3xl shadow-xl"
      >
        <Text className="text-3xl font-bold text-white">Tasks</Text>
        <View className="flex-row items-center mt-2">
          <Text className="text-lg text-indigo-100">
            {tasks.filter(t => !t.completed).length} remaining
          </Text>
          <Text className="text-lg text-indigo-200 mx-2">•</Text>
          <Text className="text-lg text-indigo-100">
            {tasks.filter(t => t.completed).length} completed
          </Text>
        </View>
      </Animated.View>

      {/* Task List */}
      <ScrollView 
        className="flex-1 px-4 pt-6"
        showsVerticalScrollIndicator={false}
      >
        {tasks.map((task, index) => (
          <AnimatedTouchable
            key={task.id}
            entering={SlideInRight.delay(index * 100)}
            layout={Layout.springify()}
            onPress={() => toggleTask(task.id)}
            className={`flex-row items-center p-4 rounded-2xl mb-3
              ${task.completed ? 'bg-slate-100' : 'bg-white shadow-sm'}`}
          >
            <View className={`w-7 h-7 rounded-full border-2 mr-4 items-center justify-center
              ${task.completed 
                ? 'bg-green-500 border-green-500' 
                : 'border-indigo-400'}`}
            >
              {task.completed && (
                <Animated.View entering={FadeIn}>
                  <Feather name="check" size={16} color="white" />
                </Animated.View>
              )}
            </View>
            <Text className={`flex-1 text-base font-medium
              ${task.completed 
                ? 'text-slate-400 line-through' 
                : 'text-slate-700'}`}>
              {task.title}
            </Text>
          </AnimatedTouchable>
        ))}
        <View className="h-24" />
      </ScrollView>

      {/* Add Task Button */}
      <Animated.View 
        entering={FadeInDown.delay(500)}
        className="absolute bottom-8 right-8"
      >
        <TouchableOpacity 
          className="w-16 h-16 bg-indigo-600 rounded-full items-center justify-center shadow-lg"
          activeOpacity={0.8}
          onPress={() => setShowForm(true)}
        >
          <Feather name="plus" size={28} color="white" />
        </TouchableOpacity>
      </Animated.View>

      {/* Task Form */}
      {showForm && (
        <Form 
          onSubmit={handleAddTask}
          onClose={() => setShowForm(false)}
        />
      )}
    </View>
  );
}
