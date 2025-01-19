import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Animated, Alert, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Quiz = () => {
  const result = require("../../assets/result.png");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({}); 
  const [selectedAnswer, setSelectedAnswer] = useState(null); 
  const [progress] = useState(new Animated.Value(0));
  const [quizSubmitted, setQuizSubmitted] = useState(false); 

  const totalQuestions = 15;

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

  useEffect(() => {
    Animated.timing(progress, {
      toValue: (currentQuestion + 1) / totalQuestions,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [currentQuestion]);

  const handleAnswer = (answer) => {
    if (selectedAnswer !== null) return; 
  
    setSelectedAnswer(answer);
    const isCorrect = answer === questions[currentQuestion].correctAnswer;
    const answerState = { answer, isCorrect };
  
    setAnswers((prev) => ({
      ...prev,
      [questions[currentQuestion].id]: answerState,
    }));
  
    // Wait for 3 seconds before moving to the next question
    setTimeout(() => {
      nextQuestion();
    }, 1000);
  };

  const getButtonStyle = (option) => {
    const answerState = answers[questions[currentQuestion].id];

    if (answerState) {
      if (answerState.answer === option) {
        return {
          backgroundColor: answerState.isCorrect ? "rgba(0, 255, 0, 0.3)" : "rgba(255, 0, 0, 0.3)",
          pointerEvents: 'none', // Disable further clicking on the selected answer
        };
      } else if (option === questions[currentQuestion].correctAnswer) {
        return {
          backgroundColor: 'rgba(0, 255, 0, 0.3)', // Correct answer (green)
          pointerEvents: 'none', // Disable further clicking
        };
      }
    }

    return {};
  };

  const calculateScore = () => {
    let score = 0;
    for (let i = 0; i < totalQuestions; i++) {
      const question = questions[i];
      if (answers[question.id]?.isCorrect) {
        score += 1;
      }
    }
    return score;
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(answers[questions[currentQuestion + 1]?.id]?.answer || null);
    } else {
      // Check if all questions have been answered before allowing submission
      if (Object.keys(answers).length === totalQuestions) {
        setQuizSubmitted(true); // Set quiz as submitted
        const score = calculateScore();
      } else {
        
      }
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(answers[questions[currentQuestion - 1]?.id]?.answer || null);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white', padding: 20 }}>
      {quizSubmitted ? (
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
        </View>
      ) : (
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
                width: `${(currentQuestion + 1) / totalQuestions * 100}%`,
              }}
            />
          </View>

          <Text style={{ color: 'black', fontSize: 18, marginBottom: 5, fontFamily: 'QuicksandMedium', textAlign: 'justify' }}>
            {questions[currentQuestion]?.question}
          </Text>

          <View>
            {questions[currentQuestion]?.options.map((option, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleAnswer(option)}
                style={[{
                  padding: 15,
                  borderRadius: 10,
                  marginBottom: 10,
                  borderColor: '#6a5be2',
                  borderWidth: 0.5,
                }, getButtonStyle(option)]}
                disabled={selectedAnswer !== null} // Disable all choices once answered
              >
                <Text style={{ color: 'black', fontSize: 16, fontFamily: 'QuicksandMedium' }}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
            <TouchableOpacity
              onPress={prevQuestion}
              disabled={currentQuestion === 0}
              style={{
                backgroundColor: '#6a5be2',
                padding: 10,
                borderRadius: 5,
                opacity: currentQuestion === 0 ? 0.5 : 1,
              }}
            >
              <Text style={{ color: 'white', fontSize: 14, fontFamily: 'QuicksandBold' }}>Back</Text>
            </TouchableOpacity>

            <TouchableOpacity
            onPress={nextQuestion}
            disabled={selectedAnswer === null}  // Disable the Next button if no answer is selected
            style={{
              backgroundColor: '#6a5be2',
              padding: 10,
              borderRadius: 5,
              opacity: selectedAnswer === null ? 0.5 : 1,  // Change opacity when disabled
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

export default Quiz;