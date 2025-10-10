import { Authenticated, Unauthenticated } from "convex/react";
import { SignInForm } from "../SignInForm";

interface LandingPageProps {
  onStartTest: () => void;
}

export default function LandingPage({ onStartTest }: LandingPageProps) {
  return (
    <div className="text-center space-y-8">
      <div className="space-y-4">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">
          The Archetype Compass
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Discover your inner archetype through our unique personality
          assessment. Are you a Cowboy, Pirate, Werewolf, or Vampire? Find out
          where you stand on the spectrum of emotion and control.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
        <div className="bg-emerald-100 p-4 rounded-lg border-2 border-emerald-200">
          <div className="text-2xl mb-2">🤠</div>
          <h3 className="font-semibold text-emerald-800">Cowboy</h3>
          <p className="text-sm text-emerald-600">
            Innocent · Optimistic · Trusting
          </p>
        </div>
        <div className="bg-sky-100 p-4 rounded-lg border-2 border-sky-200">
          <div className="text-2xl mb-2">☠️</div>
          <h3 className="font-semibold text-sky-800">Pirate</h3>
          <p className="text-sm text-sky-600">
            Easygoing · Balanced · Free-spirited
          </p>
        </div>
        <div className="bg-orange-100 p-4 rounded-lg border-2 border-orange-200">
          <div className="text-2xl mb-2">🐺</div>
          <h3 className="font-semibold text-orange-800">Werewolf</h3>
          <p className="text-sm text-orange-600">
            Emotional · Reactive · Passionate
          </p>
        </div>
        <div className="bg-purple-100 p-4 rounded-lg border-2 border-purple-200">
          <div className="text-2xl mb-2">🦇</div>
          <h3 className="font-semibold text-purple-800">Vampire</h3>
          <p className="text-sm text-purple-600">
            Controlled · Dominant · Intimidating
          </p>
        </div>
      </div>

      <Authenticated>
        <button
          onClick={onStartTest}
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-8 rounded-lg text-xl transition-colors shadow-lg hover:shadow-xl"
        >
          Take the Test
        </button>
      </Authenticated>

      <Unauthenticated>
        <div className="space-y-6">
          <p className="text-gray-600">
            Sign in to take the test and save your results
          </p>
          <div className="max-w-md mx-auto">
            <SignInForm />
          </div>
        </div>
      </Unauthenticated>
    </div>
  );
}
