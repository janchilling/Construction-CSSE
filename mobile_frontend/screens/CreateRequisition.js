import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, TouchableOpacity } from 'react-native';
import axios from 'axios';

export default function NewWorkoutPlan() {
  const [workoutName, setWorkoutName] = useState('');
  const [workoutDescription, setWorkoutDescription] = useState('');
  const [workoutDuration, setWorkoutDuration] = useState('');
  const [workoutPlan, setWorkoutPlan] = useState([]);

  const handleCreateWorkoutPlan = () => {
    // Your logic for creating a workout plan  
      const newWorkoutPlan = {
        userID,
        workoutName,
        workoutDescription,
        workoutDuration,
        workoutPlan
      }
      axios.post("http://192.168.8.115:8070/auth//newRequisition", newWorkoutPlan).then(()=>{
        alert("Workour Added")
        navigate(`/MyWorkouts`);
      }).catch((err)=>{
        alert(err)
      })
  };

  const handleWorkoutNameChange = (text) => {
    setWorkoutName(text);
  };

  const handleWorkoutDescriptionChange = (text) => {
    setWorkoutDescription(text);
  };

  const handleWorkoutDurationChange = (text) => {
    setWorkoutDuration(text);
  };

  const handleWorkoutPlanChange = (text, dayIndex, index) => {
    // Your logic for handling workout plan change
  };

  const addDay = () => {
    // Your logic for adding a day
  };

  const addExercise = (index) => {
    // Your logic for adding an exercise
  };

  const removeDay = (index) => {
    // Your logic for removing a day
  };

  const removeExercise = (dayIndex, exerciseIndex) => {
    // Your logic for removing an exercise
  };

  return (
    <ScrollView>
      <View style={{ padding: 20 }}>
        <Text>Create a new Workout Plan</Text>
        <TextInput
          placeholder="Workout Name"
          value={workoutName}
          onChangeText={handleWorkoutNameChange}
        />
        <TextInput
          placeholder="Workout Description"
          value={workoutDescription}
          onChangeText={handleWorkoutDescriptionChange}
        />
        <TextInput
          placeholder="How many months are you hoping to continue the Workout Plan?"
          value={workoutDuration}
          onChangeText={handleWorkoutDurationChange}
        />

        {/* Workout Plan UI */}
        {workoutPlan.map((day, dayIndex) => (
          <View key={dayIndex}>
            <Text>{`Day ${dayIndex + 1}`}</Text>
            {day.map((exercise, exerciseIndex) => (
              <View key={exerciseIndex}>
                <Text>{`Exercise ${exerciseIndex + 1}`}</Text>
                {/* Render exercise details here */}
              </View>
            ))}
          </View>
        ))}

        <TouchableOpacity onPress={addDay}>
          <Text>Add Day</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleCreateWorkoutPlan}>
          <Text>Confirm Workout Plan</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
