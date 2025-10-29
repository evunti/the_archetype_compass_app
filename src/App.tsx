import { Authenticated, Unauthenticated, useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { SignInForm } from "./SignInForm";
import { Toaster } from "sonner";
import React, { useState, useEffect } from "react";
import LandingPage from "./components/LandingPage";
import Questionnaire from "./components/Questionnaire";
import Results from "./components/Results";
import SavedResults from "./components/SavedResults";

type Page = "landing" | "test" | "results" | "history";

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("landing");
  const [sessionId, setSessionId] = useState<string>("");
  const [overrideResult, setOverrideResult] = useState<any>(null);

  const handleStartTest = () => {
    // Reuse an existing sessionId if present (persisted for anonymous users),
    // otherwise generate and persist a new one so anonymous results survive reloads.
    let newSessionId = sessionId;
    if (!newSessionId) {
      newSessionId = Math.random().toString(36).substring(2, 15);
      try {
        localStorage.setItem("sessionId", newSessionId);
      } catch (e) {
        console.warn("Failed to persist sessionId", e);
      }
      setSessionId(newSessionId);
    }
    // Clear any overrideResult (viewing a historical result) so the test
    // workflow starts fresh and subsequent results fetch the new submission.
    setOverrideResult(null);
    setCurrentPage("test");
  };

  // On mount, restore a persisted sessionId if present (client-only)
  React.useEffect(() => {
    try {
      const stored = localStorage.getItem("sessionId");
      if (stored) setSessionId(stored);
    } catch (e) {
      // ignore
    }
  }, []);

  const handleTestComplete = () => {
    // Ensure we don't accidentally keep an old overrideResult when showing
    // the newly-submitted result.
    setOverrideResult(null);
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
        <div className="flex items-center gap-4">
          <button
            onClick={() => setCurrentPage("history")}
            className="text-sm text-gray-600 hover:text-gray-800"
          >
            History
          </button>
        </div>
      </header>
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-4xl mx-auto">
          <Content
            currentPage={currentPage}
            sessionId={sessionId}
            onStartTest={handleStartTest}
            onTestComplete={handleTestComplete}
            onRetakeTest={handleRetakeTest}
            setSessionId={setSessionId}
            setCurrentPage={setCurrentPage}
            setOverrideResult={setOverrideResult}
            overrideResult={overrideResult}
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
  onRetakeTest,
  setSessionId,
  setCurrentPage,
  setOverrideResult,
  overrideResult,
}: {
  currentPage: Page;
  sessionId: string;
  onStartTest: () => void;
  onTestComplete: () => void;
  onRetakeTest: () => void;
  setSessionId: (s: string) => void;
  setCurrentPage: (p: Page) => void;
  setOverrideResult: (r: any) => void;
  overrideResult: any;
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

  if (currentPage === "history") {
    return (
      <SavedResults
        onView={(result: any) => {
          // Always open the exact saved item by passing it as an overrideResult.
          // Previously we switched to using the sessionId which caused the
          // Results view to fetch the most recent record for that session.
          // Passing the full result object ensures the UI shows the specific
          // historical submission the user selected.
          setOverrideResult(result);
          // Also set sessionId when available so downstream flows that rely
          // on it (e.g., sharing/retake) behave consistently.
          if (result && result.sessionId) {
            setSessionId(result.sessionId);
          }
          setCurrentPage("results");
        }}
      />
    );
  }

  if (currentPage === "results") {
    return (
      <Results
        sessionId={sessionId}
        onRetakeTest={onRetakeTest}
        overrideResult={overrideResult}
      />
    );
  }

  return null;
}
