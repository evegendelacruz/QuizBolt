import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, KeyboardAvoidingView, Platform, Keyboard, Alert } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { Feather } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from '../styles/styles';
import { useRouter } from 'expo-router';
import { supabase } from "../api/supabase";

const Welcome = () => {
  const router = useRouter();
  const logo = require("../assets/Logo.png");
  const [logoSize, setLogoSize] = useState(220);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const [fullName, setFullName] = useState("");
  const [studentID, setStudentID] = useState(""); // This will store student ID (password)
  const [email, setEmail] = useState("");
  const [isLoginLoading, setIsLoginLoading] = useState(false);

  const [isStudentIDTyping, setIsStudentIDTyping] = useState(false);
  const [isEmailTyping, setIsEmailTyping] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setLogoSize(100);
      setIsKeyboardVisible(true);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setLogoSize(220);
      setIsKeyboardVisible(false);
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const [testId, setTestId] = useState(null);

  const handleStartQuiz = async () => {
    setIsLoginLoading(true); // Show loading during the quiz start attempt
  
    if (!fullName || !studentID || !email) {
      Alert.alert("Error", "Please fill in all the fields.");
      setIsLoginLoading(false);
      return;
    }
  
    try {
      // Insert data into the quiz table
      const { data, error } = await supabase
        .from("quiz")
        .insert([{
          quiz_fullname: fullName,
          quiz_student_id: studentID, // Ensure the column name matches your table
          quiz_email: email,
        }])
        .select("quiz_id") 
        .single(); 
  
      if (error) {
        throw error; // Handle insertion error
      }
  
      const quizId = data[0]?.quiz_id; // Get quiz_id from inserted row
  
      // 🎉 Successfully inserted, start quiz
      setTestId(quizId); 
      router.replace('dashboard'); // Navigate to dashboard
  
    } catch (error) {
      Alert.alert("Error", error.message || "Something went wrong.");
    } finally {
      setIsLoginLoading(false); // Hide loading after process is complete
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ justifyContent: 'center', alignItems: 'center' }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
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
          onChangeText={(newFullName) => setFullName(newFullName)}
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
            setStudentID(newStudentID);
            if (newStudentID.length > 0) {
              setIsStudentIDTyping(true);
            }
          }}
          style={[style.textInput, { fontFamily: "Quicksand" }]}
          maxLength={10}
        />
        {isStudentIDTyping && studentID.length !== 10 && (
          <Text style={{ color: 'red', fontFamily: "QuicksandMedium", fontSize: 12, textAlign:'left' , alignSelf:'left', marginLeft: 10}}>
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
            setEmail(newEmail);
            if (newEmail.length > 0) {
              setIsEmailTyping(true);
            }
          }}
          style={[style.textInput, { fontFamily: "Quicksand" }]}
          autoCapitalize="none"
        />
        {isEmailTyping && !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email) && (
          <Text style={{ color: 'red', fontFamily: "QuicksandMedium", fontSize: 12, textAlign:'left' , alignSelf:'left', marginLeft: 10}}>
            Invalid email
          </Text>
        )}
      </View>

      <View style={{ alignItems: 'center', marginBottom: isKeyboardVisible ? -100 : 0 }}>
        <Button
          mode="contained"
          onPress={handleStartQuiz}
          buttonColor="#6a5be2"
          labelStyle={{
            fontSize: 18,
            textAlign: 'center',
            color: 'white',
            fontFamily: "QuicksandBold",
            lineHeight: 25,
          }}
          style={[styles.button, { borderRadius: 5, width: 280, height: 50 }]}
          loading={isLoginLoading}
          disabled={isLoginLoading}
        >
          START
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default Welcome;

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
