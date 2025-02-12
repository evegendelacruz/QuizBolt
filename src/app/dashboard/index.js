import React, { useState, useEffect } from 'react'; // Import React and hooks (useState, useEffect)
import { View, Text, TouchableOpacity, Animated, Alert, Image } from 'react-native'; // Import necessary components from react-native
import { SafeAreaView } from 'react-native-safe-area-context'; // Import SafeAreaView for safe area rendering

const Quiz = () => {
  const result = require("../../assets/result.png"); // Load the result image
  const [currentQuestion, setCurrentQuestion] = useState(0); // State to track the current question index
  const [answers, setAnswers] = useState({}); // State to store user answers
  const [selectedAnswer, setSelectedAnswer] = useState(null); // State to track the selected answer
  const [progress] = useState(new Animated.Value(0)); // State to manage progress animation
  const [quizSubmitted, setQuizSubmitted] = useState(false); // State to track if the quiz is submitted

  const totalQuestions = 15; // Total number of questions

  // Array of questions with their options and correct answers
  const questions = [
    { id: 1, question: "What is the first phase of the Software Development Life Cycle (SDLC)?", options: ["Design", "Planning", "Development", "Testing"], correctAnswer: "Planning" },
    { id: 2, question: "Which SDLC phase involves gathering requirements from stakeholders?", options: ["Design", "Planning", "Analysis", "Testing"], correctAnswer: "Analysis" },
    { id: 3, question: "In which SDLC phase does the actual coding or programming happen?", options: ["Design", "Planning", "Development", "Testing"], correctAnswer: "Development" },
    { id: 4, question: "Which SDLC phase focuses on evaluating the software for bugs and issues?", options: ["Design", "Development", "Testing", "Maintenance"], correctAnswer: "Testing" },
    { id: 5, question: "What is the purpose of the Maintenance phase in the SDLC?", options: ["Deploy the software", "Fix bugs", "Update and improve the software", "None of the above"], correctAnswer: "Update and improve the software" },
    { id: 6, question: "Which of the following is not a type of SDLC model?", options: ["Waterfall", "Agile", "V-Model", "MVP Model"], correctAnswer: "MVP Model" },
    { id: 7, question: "In the Waterfall model, which phase follows the Requirements Gathering phase?", options: ["Design", "Development", "Testing", "Maintenance"], correctAnswer: "Design" },
    { id: 8, question: "Which SDLC model allows for more flexibility and changes during the development process?", options: ["Waterfall", "Agile", "V-Model", "Spiral"], correctAnswer: "Agile" },
    { id: 9, question: "What does 'iteration' refer to in the Agile SDLC model?", options: ["The completion of each phase", "A loop of repetitive phases", "The process of defining requirements", "The final release of the software"], correctAnswer: "A loop of repetitive phases" },
    { id: 10, question: "What is the primary goal of the SDLC?", options: ["To design the software", "To reduce development costs", "To create software that meets customer needs", "To test the software"], correctAnswer: "To create software that meets customer needs" },
    { id: 11, question: "What is the main advantage of the V-Model in SDLC?", options: ["Its focus on flexibility", "It does not require detailed planning", "The relationship between each development stage and its corresponding testing phase", "It is faster than other models"], correctAnswer: "The relationship between each development stage and its corresponding testing phase" },
    { id: 12, question: "Which SDLC phase focuses on designing the software architecture and system?", options: ["Planning", "Design", "Development", "Testing"], correctAnswer: "Design" },
    { id: 13, question: "Which of the following best describes the Spiral model of SDLC?", options: ["A model focused on fast delivery", "A model based on iterative cycles and risk analysis", "A model focused on design and prototyping", "A model where all phases are completed sequentially"], correctAnswer: "A model based on iterative cycles and risk analysis" },
    { id: 14, question: "Which SDLC model is best suited for small projects with well-defined requirements?", options: ["Waterfall", "Agile", "Spiral", "V-Model"], correctAnswer: "Waterfall" },
    { id: 15, question: "In the SDLC, who is primarily responsible for writing the code?", options: ["Project Manager", "Software Developer", "Tester", "Business Analyst"], correctAnswer: "Software Developer" },
  ];

  // Effect to animate progress bar when the current question changes
  useEffect(() => {
    Animated.timing(progress, {
      toValue: (currentQuestion + 1) / totalQuestions, // Update progress based on current question
      duration: 500, // Animation duration
      useNativeDriver: false, // Disable native driver for this animation
    }).start();
  }, [currentQuestion]); // Trigger effect when currentQuestion changes

  // Function to handle user's answer selection
  const handleAnswer = (answer) => {
    if (selectedAnswer !== null) return; // Prevent multiple selections

    setSelectedAnswer(answer); // Set the selected answer
    const isCorrect = answer === questions[currentQuestion].correctAnswer; // Check if the answer is correct
    const answerState = { answer, isCorrect }; // Store answer state

    // Update answers state with the current question's answer
    setAnswers((prev) => ({
      ...prev,
      [questions[currentQuestion].id]: answerState,
    }));

    // Move to the next question after 1 second
    setTimeout(() => {
      nextQuestion();
    }, 1000);
  };

  const retakeQuiz = () => {
    setCurrentQuestion(0); // Reset to the first question
    setSelectedAnswer(null); // Clear selected answer
    setAnswers({}); // Reset answers
    setQuizSubmitted(false); // Go back to quiz mode
  };
  

  // Function to determine button style based on the selected answer
  const getButtonStyle = (option) => {
    const answerState = answers[questions[currentQuestion].id];

    if (answerState) {
      if (answerState.answer === option) {
        return {
          backgroundColor: answerState.isCorrect ? "rgba(0, 255, 0, 0.3)" : "rgba(255, 0, 0, 0.3)", // Green for correct, red for incorrect
          pointerEvents: 'none', // Disable further clicking on the selected answer
        };
      } else if (option === questions[currentQuestion].correctAnswer) {
        return {
          backgroundColor: 'rgba(0, 255, 0, 0.3)', // Highlight correct answer in green
          pointerEvents: 'none', // Disable further clicking
        };
      }
    }

    return {}; 
  };

  // Function to calculate the user's score
  const calculateScore = () => {
    let score = 0;
    for (let i = 0; i < totalQuestions; i++) {
      const question = questions[i];
      if (answers[question.id]?.isCorrect) {
        score += 1; // Increment score for each correct answer
      }
    }
    return score; // Return total score
  };

  // Function to move to the next question
  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1); // Move to the next question
      setSelectedAnswer(answers[questions[currentQuestion + 1]?.id]?.answer || null); // Set selected answer for the next question
    } else {
      // Check if all questions have been answered before allowing submission
      if (Object.keys(answers).length === totalQuestions) {
        setQuizSubmitted(true); // Set quiz as submitted
        const score = calculateScore(); // Calculate final score
      } else {
        // Handle case where not all questions are answered
      }
    }
  };

  // Function to move to the previous question
  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1); // Move to the previous question
      setSelectedAnswer(answers[questions[currentQuestion - 1]?.id]?.answer || null); // Set selected answer for the previous question
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white', padding: 20 }}>
      {quizSubmitted ? ( // Render quiz completion screen if quiz is submitted
        <View style={{ alignItems: 'center', flex: 1, marginTop: 60 }}>
          <Text style={{ fontSize: 24, fontFamily: 'QuicksandBold', color: '#6a5be2' }}>
            Quiz Completed!
          </Text>
          <Image source={result} style={{ width: 200, height: 200 }} /> 
          <Text style={{ fontSize: 20, fontFamily: 'QuicksandMedium', marginTop: 10 }}>
            Total score: 
            <Text style={{ color: '#6a5be2', fontFamily:'QuicksandBold'}}> {calculateScore()} /</Text> 
            <Text style={{ color: '#6a5be2',  fontFamily:'QuicksandBold'}}> {totalQuestions} </Text>
          </Text>
          <Text style={{ fontSize: 14, fontFamily: 'Quicksand', marginTop: 10 }}>Great job! Keep up the good work!</Text>

          <TouchableOpacity
            onPress={retakeQuiz}
            style={{
              backgroundColor: '#6a5be2',
              width: 280,
              height: 50,
              borderRadius: 5,
              marginTop: 40,
            }}
          >
            <Text style={{ color: 'white', fontSize: 18, fontFamily: 'QuicksandBold', textAlign:'center', marginVertical:10 }}>
              RETAKE
            </Text>
          </TouchableOpacity>
        </View>
      ) : ( // Render quiz questions if quiz is not submitted
        <View>
          <Text style={{ color: '#6a5be2', fontSize: 18, fontFamily: 'QuicksandBold', textAlign: 'center' }}>
            Question {currentQuestion + 1} of {totalQuestions} 
          </Text>

          <View style={{ marginTop: 20 }}>
            <Animated.View
              style={{
                height: 10,
                backgroundColor: '#6a5be2',
                marginTop: -5,
                borderRadius: 10,
                marginBottom: 20,
                width: `${(currentQuestion + 1) / totalQuestions * 100}%`, // Animated progress bar width
              }}
            />
          </View>

          <Text style={{ color: 'black', fontSize: 18, marginBottom: 5, fontFamily: 'QuicksandMedium', textAlign: 'justify' }}>
            {questions[currentQuestion]?.question} 
          </Text>

          <View>
            {questions[currentQuestion]?.options.map((option, index) => ( // Render answer options
              <TouchableOpacity
                key={index}
                onPress={() => handleAnswer(option)} // Handle answer selection
                style={[{
                  padding: 15,
                  borderRadius: 10,
                  marginBottom: 10,
                  borderColor: '#6a5be2',
                  borderWidth: 0.5,
                }, getButtonStyle(option)]} // Apply dynamic button styles
                disabled={selectedAnswer !== null} // Disable all choices once answered
              >
                <Text style={{ color: 'black', fontSize: 16, fontFamily: 'QuicksandMedium' }}>{option}</Text> 
              </TouchableOpacity>
            ))}
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
            <TouchableOpacity
              onPress={prevQuestion} // Handle previous question navigation
              disabled={currentQuestion === 0} // Disable if on the first question
              style={{
                backgroundColor: '#6a5be2',
                padding: 10,
                borderRadius: 5,
                opacity: currentQuestion === 0 ? 0.5 : 1, // Change opacity when disabled
              }}
            >
              <Text style={{ color: 'white', fontSize: 14, fontFamily: 'QuicksandBold' }}>Back</Text> 
            </TouchableOpacity>

            <TouchableOpacity
              onPress={nextQuestion} // Handle next question navigation
              disabled={selectedAnswer === null} // Disable if no answer is selected
              style={{
                backgroundColor: '#6a5be2',
                padding: 10,
                borderRadius: 5,
                opacity: selectedAnswer === null ? 0.5 : 1, // Change opacity when disabled
              }}
            >
              <Text style={{ color: 'white', fontSize: 14, fontFamily: 'QuicksandBold' }}>
                {currentQuestion === questions.length - 1 ? 'Submit' : 'Next'} 
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Quiz; // Export Quiz component