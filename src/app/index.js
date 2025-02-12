import React, { useState, useEffect } from "react"; // Import React and hooks (useState, useEffect)
import { View, Text, StyleSheet, Image, KeyboardAvoidingView, Platform, Keyboard, Alert } from 'react-native'; // Import necessary components from react-native
import { Button, TextInput } from 'react-native-paper'; // Import Button and TextInput from react-native-paper
import { SafeAreaView } from 'react-native-safe-area-context'; // Import SafeAreaView for safe area rendering
import styles from '../styles/styles'; // Import custom styles
import { useRouter } from 'expo-router'; // Import useRouter for navigation
import { supabase } from "../api/supabase"; // Import supabase for database operations

const Welcome = () => {
  const router = useRouter(); // Initialize router for navigation
  const logo = require("../assets/Logo.png"); // Load the logo image
  const [logoSize, setLogoSize] = useState(220); // State to manage logo size
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false); // State to track if keyboard is visible
  const [fullName, setFullName] = useState(""); // State to store full name input
  const [studentID, setStudentID] = useState(""); // State to store student ID input (password)
  const [email, setEmail] = useState(""); // State to store email input
  const [isLoginLoading, setIsLoginLoading] = useState(false); // State to manage loading state during login

  const [isStudentIDTyping, setIsStudentIDTyping] = useState(false); // State to track if student ID is being typed
  const [isEmailTyping, setIsEmailTyping] = useState(false); // State to track if email is being typed

  useEffect(() => {
    // Add listeners for keyboard show and hide events
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setLogoSize(100); // Reduce logo size when keyboard is shown
      setIsKeyboardVisible(true); // Set keyboard visibility to true
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setLogoSize(220); // Reset logo size when keyboard is hidden
      setIsKeyboardVisible(false); // Set keyboard visibility to false
    });

    return () => {
      // Clean up listeners when component unmounts
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []); // Empty dependency array ensures this runs only once on mount

  const [testId, setTestId] = useState(null); // State to store quiz ID

  const handleStartQuiz = async () => {
    setIsLoginLoading(true);
  
    if (!fullName || !studentID || !email) {
      Alert.alert("Invalid", "Please fill in all the fields.");
      setIsLoginLoading(false);
      return;
    }
  
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      Alert.alert("Invalid", "Please enter a valid email address.");
      setIsLoginLoading(false);
      return;
    }
  
    if (studentID.length !== 10 || !/^\d{10}$/.test(studentID)) {
      Alert.alert("Invalid", "Student ID must be exactly 10 digits.");
      setIsLoginLoading(false);
      return;
    }
  
    try {
      const { data, error } = await supabase
        .from("quiz")
        .insert([
          {
            quiz_fullname: fullName,
            quiz_student_id: studentID,
            quiz_email: email,
          },
        ])
        .select("quiz_id")
        .single();
  
      if (error) {
        throw error;
      }
  
      const quizId = data.quiz_id;
      setTestId(quizId);
      router.replace("dashboard");
    } catch (error) {
      Alert.alert("Error", error.message || "Something went wrong.");
    } finally {
      setIsLoginLoading(false);
    }
  };
  

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ justifyContent: 'center', alignItems: 'center' }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // Adjust behavior based on platform
      />
      <Image source={logo} style={[style.logoImage, { width: logoSize, height: logoSize }]} /> 
      <View style={{ marginHorizontal: 40, alignItems: 'center', marginTop: -15 }}>
        <Text style={style.title}>Welcome, Boltz!</Text> 
        <Text style={style.subtitle}>Join the quiz now and expand your insight into the Software Development Life Cycle!</Text> 
      </View>

      <View style={{ alignItems: 'center', marginVertical: 15 }}>
        <TextInput
          label='Full Name'
          value={fullName}
          mode="outlined"
          activeOutlineColor="#6a5be2"
          outlineColor="#6a5be2"
          textColor="black"
          onChangeText={(newFullName) => setFullName(newFullName)} // Update full name state on text change
          style={[style.textInput, { fontFamily: "Quicksand" }]}
        />

        <TextInput
          label='Student ID'
          value={studentID}
          mode="outlined"
          activeOutlineColor="#6a5be2"
          outlineColor="#6a5be2"
          textColor="black"
          keyboardType="numeric"
          onChangeText={(newStudentID) => {
            setStudentID(newStudentID); // Update student ID state on text change
            if (newStudentID.length > 0) {
              setIsStudentIDTyping(true); // Set typing state to true if student ID is being typed
            }
          }}
          style={[style.textInput, { fontFamily: "Quicksand" }]}
          maxLength={10}
        />
        {isStudentIDTyping && studentID.length !== 10 && ( // Show error if student ID is not 10 digits
          <Text style={{ color: 'red', fontFamily: "QuicksandMedium", 
            fontSize: 12, textAlign:'left' , alignSelf:'left', 
            marginLeft: 10}}>
            Student ID must be 10 digits
          </Text>
        )}

        <TextInput
          label='Email'
          value={email}
          mode="outlined"
          activeOutlineColor="#6a5be2"
          outlineColor="#6a5be2"
          textColor="black"
          onChangeText={(newEmail) => {
            setEmail(newEmail); // Update email state on text change
            if (newEmail.length > 0) {
              setIsEmailTyping(true); // Set typing state to true if email is being typed
            }
          }}
          style={[style.textInput, { fontFamily: "Quicksand" }]}
          autoCapitalize="none"
        />
        {isEmailTyping && !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email) && ( // Show error if email is invalid
          <Text style={{ color: 'red', fontFamily: "QuicksandMedium", fontSize: 12, textAlign:'left' , alignSelf:'left', marginLeft: 10}}>
            Invalid email
          </Text>
        )}
      </View>

      <View style={{ alignItems: 'center', marginBottom: isKeyboardVisible ? -100 : 0 }}>
        <Button
          mode="contained"
          onPress={handleStartQuiz} // Trigger handleStartQuiz on button press
          buttonColor="#6a5be2"
          labelStyle={{
            fontSize: 18,
            textAlign: 'center',
            color: 'white',
            fontFamily: "QuicksandBold",
            lineHeight: 25,
          }}
          style={[styles.button, { borderRadius: 5, width: 280, height: 50 }]}
          loading={isLoginLoading} // Show loading indicator if login is in progress
          disabled={isLoginLoading} // Disable button if login is in progress
        >
          START
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default Welcome; // Export Welcome component

const style = StyleSheet.create({
  ...styles,

  title: {
    fontFamily: 'QuicksandBold',
    color: '#6a5be2',
    fontSize: 30,
  },

  subtitle: {
    fontFamily: 'QuicksandMedium',
    fontSize: 14,
    textAlign: 'center',
  },

  logoImage: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginTop: 10,
  },

  textInput: {
    fontFamily: 'Quicksand',
    fontSize: 14,
    width: 280,
    height: 50,
    borderWidth: 0,
    margin: 10,
    paddingHorizontal: 10,
  },
});
