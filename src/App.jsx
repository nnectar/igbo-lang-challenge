import React, { useState, useEffect } from 'react';
import './App.css';

const questions = [
  {
    question: 'What is the Igbo word for "Hello"?',
    options: ['Nde-ewo', 'Kedu', 'Mma', 'Ọla'],
    answer: 'Kedu'
  },
  {
    question: 'What is the Igbo word for "No"?',
    options: ['Mba', 'Asi', 'Nna', 'Isi'],
    answer: 'Mba'
  },
  {
    question: 'What is the Igbo word for "yes"?',
    options: ['Ee', 'Ihe', 'Olee', 'Dia'],
    answer: 'Ee'
  },
  {
    question: 'What is the Igbo word for "water"?',
    options: ['Mmiri', 'Mmadu', 'Mmirioma', 'Mmalite'],
    answer: 'Mmiri'
  },
  {
    question: 'What is the Igbo word for "food"?',
    options: ['Nni', 'Ude', 'Oha', 'Igba'],
    answer: 'Nni'
  },
  {
    question: 'What is the Igbo word for "money"?',
    options: ['Ego', 'Uzo', 'Ndu', 'Onye'],
    answer: 'Ego'
  },
  {
    question: 'What is the Igbo word for "father"?',
    options: ['Nna', 'Mama', 'Onye', 'Okpala'],
    answer: 'Nna'
  },
  {
    question: 'What is the Igbo word for "mother"?',
    options: ['Mama', 'Nna', 'Nne', 'Ada'],
    answer: 'Nne'
  },
  {
    question: 'What is the Igbo word for "family"?',
    options: ['Mmadu', 'Mgbada', 'Nneoma', 'Ọnwụ'],
    answer: 'Mgbada'
  },
  {
    question: 'What is the Igbo word for "love"?',
    options: ['Ọyị', 'Ọna', 'Ụlọ', 'Ụmụnna'],
    answer: 'Ụlọ'
  },
  // Other questions
];

function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [timer, setTimer] = useState(0);
  const [personalBest, setPersonalBest] = useState(null);
  const [correct, setCorrect] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer + 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const checkAnswer = () => {
    if (selectedOption === questions[currentQuestionIndex].answer) {
      setCorrect(true);
    } else {
      setCorrect(false);
    }
  };

  const nextQuestion = () => {
    setSelectedOption(null);
    setCorrect(null);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      if (personalBest === null || timer < personalBest) {
        setPersonalBest(timer);
      }
      alert('You have completed the Igbo Language Challenge!');
      setCurrentQuestionIndex(0);
      setTimer(0);
    }
  };

  return (
    <div className="App">
      <header>
        <h1>Igbo Language Challenge</h1>
      </header>
      <main>
        <div className="timer">
          Time: {timer} sec | Personal Best: {personalBest !== null ? `${personalBest} sec` : 'N/A'}
        </div>
        <div className="question-container">
          <h2>{questions[currentQuestionIndex].question}</h2>
          <div className="options-container">
            {questions[currentQuestionIndex].options.map((option, index) => {
              const isCorrect = correct === true && selectedOption === option;
              const isIncorrect = correct === false && selectedOption === option;
              const isCorrectAnswer = correct === false && option === questions[currentQuestionIndex].answer;
              return (
                <button
                  key={index}
                  className={`option${selectedOption === option ? ' selected' : ''}${isCorrect ? ' correct' : ''}${isIncorrect ? ' wrong' : ''}${isCorrectAnswer ? ' correct-answer' : ''}`}
                  onClick={() => {
                    if (correct === null) {
                      setSelectedOption(option);
                    }
                  }}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>
        <button
          className="next-btn"
          onClick={() => {
            if (selectedOption) {
              if (correct === null) {
                checkAnswer();
              } else {
                nextQuestion();
              }
            } else {
              alert('Please select an option');
            }
          }}
        >
          {correct === null ? 'Check' : 'Next'}
        </button>
        {correct === true && <div className="modal">Correct!</div>}
        {correct === false && <div
          className="modal">Incorrect! The correct answer is {questions[currentQuestionIndex].answer}.</div>}
      </main>
    </div>
  );
}

export default App;
