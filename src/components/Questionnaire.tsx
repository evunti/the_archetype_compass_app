import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { toast } from "sonner";

// All questions in their original, categorized order, mapped to include their original index
const allQuestions = [
  // Cowboy Statements (0-6)
  "I tend to see the best in people, even when others don't.",
  "I'd rather keep the peace than win an argument.",
  "I believe everything happens for a reason.",
  "I'm easily moved by acts of kindness or sincerity.",
  "I often find myself forgiving people, even when they don't apologize.",
  "I prefer to follow someone I trust rather than take charge myself.",
  "I try to stay hopeful, even when things go wrong.",
  // Pirate Statements (7-13)
  "I adapt quickly when plans change.",
  "I rarely let stress get the best of me.",
  "I'm good at finding humor, even in difficult situations.",
  "I'd rather enjoy life than overthink it.",
  "I don't hold grudges for long.",
  "I'm comfortable going with the flow instead of planning everything.",
  "I can stay calm and centered even when others around me are upset.",
  // Werewolf Statements (14-20)
  "I feel emotions very intensely.",
  "I can go from calm to passionate in a matter of seconds.",
  "When I care about something, I throw myself into it completely.",
  "My emotions often show on my face, even when I try to hide them.",
  "I have strong gut reactions to people and situations.",
  "I sometimes regret how strongly I react in the moment.",
  "When I love someone or something, I'm fiercely protective.",
  // Vampire Statements (21-27)
  "I like to be in control of my surroundings.",
  "I'm good at reading people and understanding their motives.",
  "I rarely show my emotions unless I choose to.",
  "I prefer to lead rather than follow.",
  "I often think a few steps ahead in social situations.",
  "I'm skilled at influencing others without them realizing it.",
  "I feel more comfortable when others see me as confident or composed."
].map((text, originalIndex) => ({ text, originalIndex }));

interface QuestionnaireProps {
  sessionId: string;
  onComplete: () => void;
}

export default function Questionnaire({ sessionId, onComplete }: QuestionnaireProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  
  // Shuffle questions once on component mount and store them in state
  const [shuffledQuestions] = useState(() => {
    const array = [...allQuestions];
    // Fisher-Yates shuffle algorithm
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  });

  // Answers are stored in an array that maps to the *original* question order
  const [answers, setAnswers] = useState<number[]>(new Array(28).fill(0));
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
    const lastOriginalIndex = shuffledQuestions[currentQuestionIndex].originalIndex;
    if (answers[lastOriginalIndex] === 0) {
      toast.error("Please select an answer before continuing");
      return;
    }
    
    try {
      await saveTestResult({ sessionId, answers });
      onComplete();
    } catch (error) {
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
        <p className="text-gray-600">Question {currentQuestionIndex + 1} of 28</p>
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
            { value: 5, label: "Strongly Agree" }
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
                <div className={`w-4 h-4 rounded-full border-2 ${
                  currentAnswer === value
                    ? "border-purple-600 bg-purple-600"
                    : "border-gray-300"
                }`}></div>
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
