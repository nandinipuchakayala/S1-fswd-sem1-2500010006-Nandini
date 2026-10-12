
import { useState } from "react";
import "./App.css";

const questions = [
  {
    question: "Which language is used to build React applications?",
    options: ["Python", "JavaScript", "C", "PHP"],
    answer: "JavaScript",
  },
  {
    question: "Which React hook is used to manage state?",
    options: ["useEffect", "useRef", "useState", "useMemo"],
    answer: "useState",
  },
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "High Text Machine Language",
      "Hyper Transfer Markup Language",
      "Home Tool Markup Language",
    ],
    answer: "Hyper Text Markup Language",
  },
  {
    question: "Which symbol checks strict equality in JavaScript?",
    options: ["=", "==", "===", "!="],
    answer: "===",
  },
  {
    question: "Which method is commonly used to display a list in React?",
    options: ["forEach()", "map()", "push()", "pop()"],
    answer: "map()",
  },
];

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [finished, setFinished] = useState(false);

  const question = questions[currentQuestion];

  const score = questions.filter(
    (item, index) => answers[index] === item.answer
  ).length;

  function chooseAnswer(option) {
    setAnswers((previous) => ({
      ...previous,
      [currentQuestion]: option,
    }));
  }

  function nextQuestion() {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((previous) => previous + 1);
    } else {
      setFinished(true);
    }
  }

  function restartQuiz() {
    setCurrentQuestion(0);
    setAnswers({});
    setFinished(false);
  }

  return (
    <main className="app">
      <section className="quiz-card">
        <div className="quiz-icon">📝</div>

        <h1>Quiz Management</h1>
        <p className="subtitle">
          Test your knowledge and discover your score!
        </p>

        {finished ? (
          <div className="result">
            <div className="trophy">🏆</div>
            <h2>Quiz Completed!</h2>
            <p className="score">
              {score} / {questions.length}
            </p>
            <p className="result-message">
              You scored {Math.round((score / questions.length) * 100)}%!
            </p>
            <button className="next-button" onClick={restartQuiz}>
              Try Again ↻
            </button>
          </div>
        ) : (
          <>
            <div className="progress-info">
              <span>
                Question {currentQuestion + 1} of {questions.length}
              </span>
              <span>
                {Math.round(
                  ((currentQuestion + 1) / questions.length) * 100
                )}%
              </span>
            </div>

            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{
                  width: `${
                    ((currentQuestion + 1) / questions.length) * 100
                  }%`,
                }}
              />
            </div>

            <h2 className="question">{question.question}</h2>

            <div className="options">
              {question.options.map((option, index) => (
                <button
                  type="button"
                  key={option}
                  className={`option ${
                    answers[currentQuestion] === option ? "selected" : ""
                  }`}
                  onClick={() => chooseAnswer(option)}
                >
                  <span className="option-letter">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span>{option}</span>
                </button>
              ))}
            </div>

            <button
              type="button"
              className="next-button"
              onClick={nextQuestion}
              disabled={!answers[currentQuestion]}
            >
              {currentQuestion === questions.length - 1
                ? "Submit Quiz ✓"
                : "Next Question →"}
            </button>
          </>
        )}
      </section>

      <p className="footer-text">Learn something new every day ✨</p>
    </main>
  );
}

export default App;
