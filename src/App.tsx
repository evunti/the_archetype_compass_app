import { Authenticated, Unauthenticated, useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { SignInForm } from "./SignInForm";
import { SignOutButton } from "./SignOutButton";
import { Toaster } from "sonner";
import { useState } from "react";
import LandingPage from "./components/LandingPage";
import Questionnaire from "./components/Questionnaire";
import Results from "./components/Results";

type Page = "landing" | "test" | "results";

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("landing");
  const [sessionId, setSessionId] = useState<string>("");

  const handleStartTest = () => {
    const newSessionId = Math.random().toString(36).substring(2, 15);
    setSessionId(newSessionId);
    setCurrentPage("test");
  };

  const handleTestComplete = () => {
    setCurrentPage("results");
  };

  const handleRetakeTest = () => {
    setCurrentPage("landing");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm h-16 flex justify-between items-center border-b shadow-sm px-4">
        <button 
          onClick={() => setCurrentPage("landing")}
          className="text-xl font-semibold text-purple-600 hover:text-purple-700 transition-colors"
        >
          The Archetype Compass
        </button>
        <SignOutButton />
      </header>
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-4xl mx-auto">
          <Content 
            currentPage={currentPage}
            sessionId={sessionId}
            onStartTest={handleStartTest}
            onTestComplete={handleTestComplete}
            onRetakeTest={handleRetakeTest}
          />
        </div>
      </main>
      <Toaster />
    </div>
  );
}

function Content({ 
  currentPage, 
  sessionId, 
  onStartTest, 
  onTestComplete, 
  onRetakeTest 
}: {
  currentPage: Page;
  sessionId: string;
  onStartTest: () => void;
  onTestComplete: () => void;
  onRetakeTest: () => void;
}) {
  const loggedInUser = useQuery(api.auth.loggedInUser);

  if (loggedInUser === undefined) {
    return (
      <div className="flex justify-center items-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (currentPage === "landing") {
    return <LandingPage onStartTest={onStartTest} />;
  }

  if (currentPage === "test") {
    return <Questionnaire sessionId={sessionId} onComplete={onTestComplete} />;
  }

  if (currentPage === "results") {
    return <Results sessionId={sessionId} onRetakeTest={onRetakeTest} />;
  }

  return null;
}
