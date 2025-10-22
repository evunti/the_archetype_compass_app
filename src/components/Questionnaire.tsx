import React, { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { toast } from "sonner";

export const questions: Array<{ id: string; text: string; scores: any }> = [
  // Cowboy (The Pure Spirit)
  {
    id: "q1",
    text: "I tend to see the best in people, even when others don't.",
    scores: {
      stronglyDisagree: { Cowboy: 0, Pirate: 2, Werewolf: 1, Vampire: 5 },
      disagree: { Cowboy: 1, Pirate: 3, Werewolf: 2, Vampire: 4 },
      neutral: { Cowboy: 3, Pirate: 0, Werewolf: 0, Vampire: 0 },
      agree: { Cowboy: 4, Pirate: 2, Werewolf: 2, Vampire: 1 },
      stronglyAgree: { Cowboy: 5, Pirate: 1, Werewolf: 1, Vampire: 0 },
    },
  },
  {
    id: "q2",
    text: "I'd rather keep the peace than win an argument.",
    scores: {
      stronglyDisagree: { Cowboy: 0, Pirate: 2, Werewolf: 1, Vampire: 5 },
      disagree: { Cowboy: 1, Pirate: 3, Werewolf: 2, Vampire: 4 },
      neutral: { Cowboy: 3, Pirate: 0, Werewolf: 0, Vampire: 0 },
      agree: { Cowboy: 4, Pirate: 2, Werewolf: 2, Vampire: 1 },
      stronglyAgree: { Cowboy: 5, Pirate: 1, Werewolf: 1, Vampire: 0 },
    },
  },
  {
    id: "q3",
    text: "I believe everything happens for a reason.",
    scores: {
      stronglyDisagree: { Cowboy: 0, Pirate: 2, Werewolf: 2, Vampire: 5 },
      disagree: { Cowboy: 1, Pirate: 3, Werewolf: 3, Vampire: 4 },
      neutral: { Cowboy: 3, Pirate: 0, Werewolf: 0, Vampire: 0 },
      agree: { Cowboy: 4, Pirate: 2, Werewolf: 2, Vampire: 1 },
      stronglyAgree: { Cowboy: 5, Pirate: 1, Werewolf: 1, Vampire: 0 },
    },
  },
  {
    id: "q4",
    text: "I'm easily moved by acts of kindness or sincerity.",
    scores: {
      stronglyDisagree: { Cowboy: 0, Pirate: 2, Werewolf: 1, Vampire: 5 },
      disagree: { Cowboy: 1, Pirate: 3, Werewolf: 2, Vampire: 4 },
      neutral: { Cowboy: 3, Pirate: 0, Werewolf: 0, Vampire: 0 },
      agree: { Cowboy: 4, Pirate: 2, Werewolf: 2, Vampire: 1 },
      stronglyAgree: { Cowboy: 5, Pirate: 1, Werewolf: 1, Vampire: 0 },
    },
  },
  {
    id: "q5",
    text: "I often find myself forgiving people, even when they don't apologize.",
    scores: {
      stronglyDisagree: { Cowboy: 0, Pirate: 2, Werewolf: 1, Vampire: 5 },
      disagree: { Cowboy: 1, Pirate: 3, Werewolf: 2, Vampire: 4 },
      neutral: { Cowboy: 3, Pirate: 0, Werewolf: 0, Vampire: 0 },
      agree: { Cowboy: 4, Pirate: 2, Werewolf: 2, Vampire: 1 },
      stronglyAgree: { Cowboy: 5, Pirate: 1, Werewolf: 1, Vampire: 0 },
    },
  },
  {
    id: "q6",
    text: "I prefer to follow someone I trust rather than take charge myself.",
    scores: {
      stronglyDisagree: { Cowboy: 0, Pirate: 2, Werewolf: 1, Vampire: 5 },
      disagree: { Cowboy: 1, Pirate: 3, Werewolf: 2, Vampire: 4 },
      neutral: { Cowboy: 3, Pirate: 0, Werewolf: 0, Vampire: 0 },
      agree: { Cowboy: 4, Pirate: 2, Werewolf: 2, Vampire: 1 },
      stronglyAgree: { Cowboy: 5, Pirate: 1, Werewolf: 1, Vampire: 0 },
    },
  },
  {
    id: "q7",
    text: "I try to stay hopeful, even when things go wrong.",
    scores: {
      stronglyDisagree: { Cowboy: 0, Pirate: 2, Werewolf: 1, Vampire: 5 },
      disagree: { Cowboy: 1, Pirate: 3, Werewolf: 2, Vampire: 4 },
      neutral: { Cowboy: 3, Pirate: 0, Werewolf: 0, Vampire: 0 },
      agree: { Cowboy: 4, Pirate: 2, Werewolf: 2, Vampire: 1 },
      stronglyAgree: { Cowboy: 5, Pirate: 1, Werewolf: 1, Vampire: 0 },
    },
  },

  // Pirate (The Balanced Rogue)
  {
    id: "q8",
    text: "I adapt quickly when plans change.",
    scores: {
      stronglyDisagree: { Cowboy: 2, Pirate: 0, Werewolf: 4, Vampire: 2 },
      disagree: { Cowboy: 3, Pirate: 1, Werewolf: 3, Vampire: 3 },
      neutral: { Cowboy: 0, Pirate: 3, Werewolf: 0, Vampire: 0 },
      agree: { Cowboy: 2, Pirate: 4, Werewolf: 2, Vampire: 2 },
      stronglyAgree: { Cowboy: 1, Pirate: 5, Werewolf: 1, Vampire: 1 },
    },
  },
  {
    id: "q9",
    text: "I rarely let stress get the best of me.",
    scores: {
      stronglyDisagree: { Cowboy: 2, Pirate: 0, Werewolf: 4, Vampire: 2 },
      disagree: { Cowboy: 3, Pirate: 1, Werewolf: 3, Vampire: 3 },
      neutral: { Cowboy: 0, Pirate: 3, Werewolf: 0, Vampire: 0 },
      agree: { Cowboy: 2, Pirate: 4, Werewolf: 2, Vampire: 2 },
      stronglyAgree: { Cowboy: 1, Pirate: 5, Werewolf: 1, Vampire: 1 },
    },
  },
  {
    id: "q10",
    text: "I'm good at finding humor, even in difficult situations.",
    scores: {
      stronglyDisagree: { Cowboy: 2, Pirate: 0, Werewolf: 4, Vampire: 2 },
      disagree: { Cowboy: 3, Pirate: 1, Werewolf: 3, Vampire: 3 },
      neutral: { Cowboy: 0, Pirate: 3, Werewolf: 0, Vampire: 0 },
      agree: { Cowboy: 2, Pirate: 4, Werewolf: 2, Vampire: 2 },
      stronglyAgree: { Cowboy: 1, Pirate: 5, Werewolf: 1, Vampire: 1 },
    },
  },
  {
    id: "q11",
    text: "I'd rather enjoy life than overthink it.",
    scores: {
      stronglyDisagree: { Cowboy: 2, Pirate: 0, Werewolf: 4, Vampire: 2 },
      disagree: { Cowboy: 3, Pirate: 1, Werewolf: 3, Vampire: 3 },
      neutral: { Cowboy: 0, Pirate: 3, Werewolf: 0, Vampire: 0 },
      agree: { Cowboy: 2, Pirate: 4, Werewolf: 2, Vampire: 2 },
      stronglyAgree: { Cowboy: 1, Pirate: 5, Werewolf: 1, Vampire: 1 },
    },
  },
  {
    id: "q12",
    text: "I don't hold grudges for long.",
    scores: {
      stronglyDisagree: { Cowboy: 2, Pirate: 0, Werewolf: 4, Vampire: 2 },
      disagree: { Cowboy: 3, Pirate: 1, Werewolf: 3, Vampire: 3 },
      neutral: { Cowboy: 0, Pirate: 3, Werewolf: 0, Vampire: 0 },
      agree: { Cowboy: 2, Pirate: 4, Werewolf: 2, Vampire: 2 },
      stronglyAgree: { Cowboy: 1, Pirate: 5, Werewolf: 1, Vampire: 1 },
    },
  },
  {
    id: "q13",
    text: "I'm comfortable going with the flow instead of planning everything.",
    scores: {
      stronglyDisagree: { Cowboy: 2, Pirate: 0, Werewolf: 4, Vampire: 2 },
      disagree: { Cowboy: 3, Pirate: 1, Werewolf: 3, Vampire: 3 },
      neutral: { Cowboy: 0, Pirate: 3, Werewolf: 0, Vampire: 0 },
      agree: { Cowboy: 2, Pirate: 4, Werewolf: 2, Vampire: 2 },
      stronglyAgree: { Cowboy: 1, Pirate: 5, Werewolf: 1, Vampire: 1 },
    },
  },
  {
    id: "q14",
    text: "I can stay calm and centered even when others around me are upset.",
    scores: {
      stronglyDisagree: { Cowboy: 2, Pirate: 0, Werewolf: 4, Vampire: 2 },
      disagree: { Cowboy: 3, Pirate: 1, Werewolf: 3, Vampire: 3 },
      neutral: { Cowboy: 0, Pirate: 3, Werewolf: 0, Vampire: 0 },
      agree: { Cowboy: 2, Pirate: 4, Werewolf: 2, Vampire: 2 },
      stronglyAgree: { Cowboy: 1, Pirate: 5, Werewolf: 1, Vampire: 1 },
    },
  },

  // Werewolf (The Wild Heart)
  {
    id: "q15",
    text: "I feel emotions very intensely.",
    scores: {
      stronglyDisagree: { Cowboy: 2, Pirate: 1, Werewolf: 0, Vampire: 5 },
      disagree: { Cowboy: 3, Pirate: 2, Werewolf: 1, Vampire: 4 },
      neutral: { Cowboy: 0, Pirate: 0, Werewolf: 3, Vampire: 0 },
      agree: { Cowboy: 2, Pirate: 2, Werewolf: 4, Vampire: 2 },
      stronglyAgree: { Cowboy: 1, Pirate: 1, Werewolf: 5, Vampire: 0 },
    },
  },
  {
    id: "q16",
    text: "I can go from calm to passionate in a matter of seconds.",
    scores: {
      stronglyDisagree: { Cowboy: 2, Pirate: 1, Werewolf: 0, Vampire: 5 },
      disagree: { Cowboy: 3, Pirate: 2, Werewolf: 1, Vampire: 4 },
      neutral: { Cowboy: 0, Pirate: 0, Werewolf: 3, Vampire: 0 },
      agree: { Cowboy: 2, Pirate: 2, Werewolf: 4, Vampire: 2 },
      stronglyAgree: { Cowboy: 1, Pirate: 1, Werewolf: 5, Vampire: 0 },
    },
  },
  {
    id: "q17",
    text: "When I care about something, I throw myself into it completely.",
    scores: {
      stronglyDisagree: { Cowboy: 2, Pirate: 1, Werewolf: 0, Vampire: 5 },
      disagree: { Cowboy: 3, Pirate: 2, Werewolf: 1, Vampire: 4 },
      neutral: { Cowboy: 0, Pirate: 0, Werewolf: 3, Vampire: 0 },
      agree: { Cowboy: 2, Pirate: 2, Werewolf: 4, Vampire: 2 },
      stronglyAgree: { Cowboy: 1, Pirate: 1, Werewolf: 5, Vampire: 0 },
    },
  },
  {
    id: "q18",
    text: "My emotions often show on my face, even when I try to hide them.",
    scores: {
      stronglyDisagree: { Cowboy: 2, Pirate: 1, Werewolf: 0, Vampire: 5 },
      disagree: { Cowboy: 3, Pirate: 2, Werewolf: 1, Vampire: 4 },
      neutral: { Cowboy: 0, Pirate: 0, Werewolf: 3, Vampire: 0 },
      agree: { Cowboy: 2, Pirate: 2, Werewolf: 4, Vampire: 2 },
      stronglyAgree: { Cowboy: 1, Pirate: 1, Werewolf: 5, Vampire: 0 },
    },
  },
  {
    id: "q19",
    text: "I have strong gut reactions to people and situations.",
    scores: {
      stronglyDisagree: { Cowboy: 2, Pirate: 1, Werewolf: 0, Vampire: 5 },
      disagree: { Cowboy: 3, Pirate: 2, Werewolf: 1, Vampire: 4 },
      neutral: { Cowboy: 0, Pirate: 0, Werewolf: 3, Vampire: 0 },
      agree: { Cowboy: 2, Pirate: 2, Werewolf: 4, Vampire: 2 },
      stronglyAgree: { Cowboy: 1, Pirate: 1, Werewolf: 5, Vampire: 0 },
    },
  },
  {
    id: "q20",
    text: "I sometimes regret how strongly I react in the moment.",
    scores: {
      stronglyDisagree: { Cowboy: 2, Pirate: 1, Werewolf: 0, Vampire: 5 },
      disagree: { Cowboy: 3, Pirate: 2, Werewolf: 1, Vampire: 4 },
      neutral: { Cowboy: 0, Pirate: 0, Werewolf: 3, Vampire: 0 },
      agree: { Cowboy: 2, Pirate: 2, Werewolf: 4, Vampire: 2 },
      stronglyAgree: { Cowboy: 1, Pirate: 1, Werewolf: 5, Vampire: 0 },
    },
  },
  {
    id: "q21",
    text: "When I love someone or something, I'm fiercely protective.",
    scores: {
      stronglyDisagree: { Cowboy: 2, Pirate: 1, Werewolf: 0, Vampire: 5 },
      disagree: { Cowboy: 3, Pirate: 2, Werewolf: 1, Vampire: 4 },
      neutral: { Cowboy: 0, Pirate: 0, Werewolf: 3, Vampire: 0 },
      agree: { Cowboy: 2, Pirate: 2, Werewolf: 4, Vampire: 2 },
      stronglyAgree: { Cowboy: 1, Pirate: 1, Werewolf: 5, Vampire: 0 },
    },
  },

  // Vampire (The Power Player)
  {
    id: "q22",
    text: "I like to be in control of my surroundings.",
    scores: {
      stronglyDisagree: { Cowboy: 5, Pirate: 2, Werewolf: 2, Vampire: 0 },
      disagree: { Cowboy: 4, Pirate: 3, Werewolf: 3, Vampire: 1 },
      neutral: { Cowboy: 0, Pirate: 0, Werewolf: 0, Vampire: 3 },
      agree: { Cowboy: 2, Pirate: 2, Werewolf: 2, Vampire: 4 },
      stronglyAgree: { Cowboy: 1, Pirate: 1, Werewolf: 1, Vampire: 5 },
    },
  },
  {
    id: "q23",
    text: "I'm good at reading people and understanding their motives.",
    scores: {
      stronglyDisagree: { Cowboy: 5, Pirate: 2, Werewolf: 2, Vampire: 0 },
      disagree: { Cowboy: 4, Pirate: 3, Werewolf: 3, Vampire: 1 },
      neutral: { Cowboy: 0, Pirate: 0, Werewolf: 0, Vampire: 3 },
      agree: { Cowboy: 2, Pirate: 2, Werewolf: 2, Vampire: 4 },
      stronglyAgree: { Cowboy: 1, Pirate: 1, Werewolf: 1, Vampire: 5 },
    },
  },
  {
    id: "q24",
    text: "I rarely show my emotions unless I choose to.",
    scores: {
      stronglyDisagree: { Cowboy: 5, Pirate: 2, Werewolf: 2, Vampire: 0 },
      disagree: { Cowboy: 4, Pirate: 3, Werewolf: 3, Vampire: 1 },
      neutral: { Cowboy: 0, Pirate: 0, Werewolf: 0, Vampire: 3 },
      agree: { Cowboy: 2, Pirate: 2, Werewolf: 2, Vampire: 4 },
      stronglyAgree: { Cowboy: 1, Pirate: 1, Werewolf: 1, Vampire: 5 },
    },
  },
  {
    id: "q25",
    text: "I prefer to lead rather than follow.",
    scores: {
      stronglyDisagree: { Cowboy: 5, Pirate: 2, Werewolf: 2, Vampire: 0 },
      disagree: { Cowboy: 4, Pirate: 3, Werewolf: 3, Vampire: 1 },
      neutral: { Cowboy: 0, Pirate: 0, Werewolf: 0, Vampire: 3 },
      agree: { Cowboy: 2, Pirate: 2, Werewolf: 2, Vampire: 4 },
      stronglyAgree: { Cowboy: 1, Pirate: 1, Werewolf: 1, Vampire: 5 },
    },
  },
  {
    id: "q26",
    text: "I often think a few steps ahead in social situations.",
    scores: {
      stronglyDisagree: { Cowboy: 5, Pirate: 2, Werewolf: 2, Vampire: 0 },
      disagree: { Cowboy: 4, Pirate: 3, Werewolf: 3, Vampire: 1 },
      neutral: { Cowboy: 0, Pirate: 0, Werewolf: 0, Vampire: 3 },
      agree: { Cowboy: 2, Pirate: 2, Werewolf: 2, Vampire: 4 },
      stronglyAgree: { Cowboy: 1, Pirate: 1, Werewolf: 1, Vampire: 5 },
    },
  },
  {
    id: "q27",
    text: "I'm skilled at influencing others without them realizing it.",
    scores: {
      stronglyDisagree: { Cowboy: 5, Pirate: 2, Werewolf: 2, Vampire: 0 },
      disagree: { Cowboy: 4, Pirate: 3, Werewolf: 3, Vampire: 1 },
      neutral: { Cowboy: 0, Pirate: 0, Werewolf: 0, Vampire: 3 },
      agree: { Cowboy: 2, Pirate: 2, Werewolf: 2, Vampire: 4 },
      stronglyAgree: { Cowboy: 1, Pirate: 1, Werewolf: 1, Vampire: 5 },
    },
  },
  {
    id: "q28",
    text: "I feel more comfortable when others see me as confident or composed.",
    scores: {
      stronglyDisagree: { Cowboy: 5, Pirate: 2, Werewolf: 2, Vampire: 0 },
      disagree: { Cowboy: 4, Pirate: 3, Werewolf: 3, Vampire: 1 },
      neutral: { Cowboy: 0, Pirate: 0, Werewolf: 0, Vampire: 3 },
      agree: { Cowboy: 2, Pirate: 2, Werewolf: 2, Vampire: 4 },
      stronglyAgree: { Cowboy: 1, Pirate: 1, Werewolf: 1, Vampire: 5 },
    },
  },
];

interface QuestionnaireProps {
  sessionId: string;
  onComplete: () => void;
}

export default function Questionnaire({
  sessionId,
  onComplete,
}: QuestionnaireProps) {
  // ...existing code...
  // Add keydown handler for Enter
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        // Only allow if an answer is selected
        const originalIndex = shuffledQuestions[currentQuestionIndex].originalIndex;
        if (answers[originalIndex] !== 0) {
          if (currentQuestionIndex < 27) {
            setCurrentQuestionIndex((idx) => idx + 1);
          } else {
            handleSubmit();
          }
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentQuestionIndex, answers]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // Shuffle questions once on component mount and store them in state
  const [shuffledQuestions] = useState(() => {
    // Add originalIndex to each question
    const array = questions.map((q, idx) => ({ ...q, originalIndex: idx }));
    // Fisher-Yates shuffle algorithm
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  });

  // Answers are stored in an array that maps to the *original* question order
  const [answers, setAnswers] = useState<number[]>(new Array(28).fill(0));

  // Add keydown handler for Enter
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        // Only allow if an answer is selected
        const originalIndex = shuffledQuestions[currentQuestionIndex].originalIndex;
        if (answers[originalIndex] !== 0) {
          if (currentQuestionIndex < 27) {
            setCurrentQuestionIndex((idx) => idx + 1);
          } else {
            handleSubmit();
          }
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentQuestionIndex, answers, shuffledQuestions]);
  const saveTestResult = useMutation(api.tests.saveTestResult);

  const handleAnswer = (value: number) => {
    const originalIndex = shuffledQuestions[currentQuestionIndex].originalIndex;
    const newAnswers = [...answers];
    newAnswers[originalIndex] = value;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    const originalIndex = shuffledQuestions[currentQuestionIndex].originalIndex;
    if (answers[originalIndex] === 0) {
      toast.error("Please select an answer before continuing");
      return;
    }

    if (currentQuestionIndex < 27) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = async () => {
    const lastOriginalIndex =
      shuffledQuestions[currentQuestionIndex].originalIndex;
    if (answers[lastOriginalIndex] === 0) {
      toast.error("Please select an answer before continuing");
      return;
    }

    // 🧮 Calculate scores for all types
    const totals = { Cowboy: 0, Pirate: 0, Werewolf: 0, Vampire: 0 };

    answers.forEach((answerValue, idx) => {
      const question = questions[idx];
      if (!question || answerValue === 0) return;

      // Map numeric answer (1–5) to the correct label in question.scores
      const choiceMap: Record<number, keyof typeof question.scores> = {
        1: "stronglyDisagree",
        2: "disagree",
        3: "neutral",
        4: "agree",
        5: "stronglyAgree",
      };
      const choiceKey = choiceMap[answerValue];
      const scoreSet = question.scores[choiceKey];

      totals.Cowboy += scoreSet.Cowboy;
      totals.Pirate += scoreSet.Pirate;
      totals.Werewolf += scoreSet.Werewolf;
      totals.Vampire += scoreSet.Vampire;
    });

    console.log("Final totals:", totals);

    try {
      // Save both raw answers + computed totals to Convex
      await saveTestResult({ sessionId, answers });
      toast.success("Results saved!");
      onComplete();
    } catch (error) {
      console.error(error);
      toast.error("Failed to save results. Please try again.");
    }
  };

  const progress = ((currentQuestionIndex + 1) / 28) * 100;
  const currentQuestion = shuffledQuestions[currentQuestionIndex];
  const currentAnswer = answers[currentQuestion.originalIndex];

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Personality Assessment
        </h2>
        <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
          <div
            className="bg-purple-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-gray-600">
          Question {currentQuestionIndex + 1} of 28
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-6 text-center">
          {currentQuestion.text}
        </h3>

        <div className="space-y-3">
          {[
            { value: 1, label: "Strongly Disagree" },
            { value: 2, label: "Disagree" },
            { value: 3, label: "Neutral" },
            { value: 4, label: "Agree" },
            { value: 5, label: "Strongly Agree" },
          ].map(({ value, label }) => (
            <button
              key={value}
              onClick={() => handleAnswer(value)}
              className={`w-full p-4 text-left rounded-lg border-2 transition-colors ${
                currentAnswer === value
                  ? "border-purple-600 bg-purple-50 text-purple-800"
                  : "border-gray-200 hover:border-gray-300 text-gray-700"
              }`}
            >
              <div className="flex items-center space-x-3">
                <div
                  className={`w-4 h-4 rounded-full border-2 ${
                    currentAnswer === value
                      ? "border-purple-600 bg-purple-600"
                      : "border-gray-300"
                  }`}
                ></div>
                <span className="font-medium">{label}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
          className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-400 transition-colors"
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          className="px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors"
        >
          {currentQuestionIndex === 27 ? "Complete Test" : "Next"}
        </button>
      </div>
    </div>
  );
}
