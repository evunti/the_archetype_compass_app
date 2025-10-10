import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { toast } from "sonner";

const archetypeColors = {
  cowboy: "sky",
  pirate: "emerald", 
  werewolf: "orange",
  vampire: "purple"
};

const archetypeEmojis = {
  cowboy: "🐴",
  pirate: "☠️",
  werewolf: "🐺",
  vampire: "🦇"
};

const personalityBlurbs = {
  "cowboy": {
    title: "The Pure Spirit",
    description: "You are optimistic, kind, sincere, and hopeful. Your genuine nature draws people to you, but you may need to work on setting better boundaries to protect your generous heart."
  },
  "pirate": {
    title: "The Balanced Rogue", 
    description: "You are calm, adaptable, funny, and resilient. You navigate life's storms with grace and humor, though you should consider showing your deeper, more vulnerable side more often."
  },
  "werewolf": {
    title: "The Wild Heart",
    description: "You are intense, emotional, and fiercely loyal. Your passion is your strength, but learning to channel it constructively will help you achieve your goals without burning out."
  },
  "vampire": {
    title: "The Power Player",
    description: "You are confident, strategic, and naturally influential. Your ability to lead and persuade is remarkable, though showing vulnerability occasionally will deepen your connections."
  },
  "cowboy+pirate": {
    title: "The Peaceful Drifter",
    description: "You blend optimism with adaptability, creating a harmonious approach to life. While you value peace and go with the flow, remember that asserting yourself when needed is equally important."
  },
  "cowboy+werewolf": {
    title: "The Tender Wildling",
    description: "You combine warmth with intense emotion, making you deeply caring yet sometimes reactive. Finding grounding practices will help you channel your passionate nature more effectively."
  },
  "cowboy+vampire": {
    title: "The Gentle Influencer",
    description: "You merge moral conviction with persuasive power, making you a natural leader who inspires through kindness. Leading with transparency will enhance your already strong influence."
  },
  "pirate+werewolf": {
    title: "The Passionate Rebel",
    description: "You're adventurous, deeply feeling, and spontaneous. Your zest for life is infectious, but remember to build in time for rest and reflection to sustain your energetic approach."
  },
  "pirate+vampire": {
    title: "The Smooth Operator",
    description: "You combine poise with charm, making you naturally magnetic. While your composed exterior serves you well, sharing your honest thoughts and feelings will create deeper connections."
  },
  "werewolf+vampire": {
    title: "The Storm and the Shadow",
    description: "You blend emotional intensity with strategic thinking, creating a powerful combination. Balancing your compassionate heart with your desire for control will make you an exceptional leader."
  },
  "cowboy+pirate+werewolf": {
    title: "The Golden-Hearted Hothead",
    description: "You're joyful, passionate, and full of life. Your enthusiasm is contagious, but learning to slow down and think before acting will help you avoid unnecessary conflicts and regrets."
  },
  "pirate+werewolf+vampire": {
    title: "The Charismatic Wildcard",
    description: "You're a magnetic leader with emotional depth and strategic thinking. Your natural charisma draws people in, but creating more structure in your approach will help you achieve lasting success."
  },
  "cowboy+pirate+vampire": {
    title: "The Gentle Strategist",
    description: "You combine kindness with effectiveness, making you both approachable and capable. Your balanced nature is a strength—just remember to maintain firm boundaries when necessary."
  },
  "cowboy+werewolf+vampire": {
    title: "The Devoted Manipulator",
    description: "You blend emotional depth with moral conviction and influence. Your ability to lead with both heart and strategy is powerful—ensure you're always leading with empathy at the forefront."
  },
  "all four": {
    title: "Balanced Soul",
    description: "You embody all four archetypes, making you versatile, adaptable, passionate, and wise. Your ability to draw from different aspects of your personality is remarkable—just remember to stay grounded in your core values."
  }
};

interface ResultsProps {
  sessionId: string;
  onRetakeTest: () => void;
}

export default function Results({ sessionId, onRetakeTest }: ResultsProps) {
  const result = useQuery(api.tests.getTestResult, { sessionId });

  if (!result) {
    return (
      <div className="flex justify-center items-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  const { scores, dominantType } = result;
  const personality = personalityBlurbs[dominantType as keyof typeof personalityBlurbs];

  const handleShare = () => {
    const shareText = `I just discovered I'm ${personality.title} on The Archetype Compass! 🧭`;
    if (navigator.share) {
      navigator.share({
        title: "My Archetype Result",
        text: shareText,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(shareText);
      toast.success("Result copied to clipboard!");
    }
  };

  // Calculate percentages
  const percentages = {
    cowboy: Math.round((scores.cowboy / 35) * 100),
    pirate: Math.round((scores.pirate / 35) * 100),
    werewolf: Math.round((scores.werewolf / 35) * 100),
    vampire: Math.round((scores.vampire / 35) * 100)
  };

  // Quadrant chart positioning (X = Emotion, Y = Control)
  const emotionScore = (scores.werewolf + scores.cowboy) - (scores.vampire + scores.pirate);
  const controlScore = (scores.vampire + scores.cowboy) - (scores.werewolf + scores.pirate);
  
  // Normalize to 0-100 range for positioning
  const xPos = 50 + (emotionScore / 28) * 40; // emotion axis
  const yPos = 50 - (controlScore / 28) * 40; // control axis (inverted for screen coordinates)

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-2">Your Results</h2>
        <p className="text-gray-600">Discover your unique archetype blend</p>
      </div>

      {/* Main Result */}
      <div className="bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="text-6xl mb-4">
          {dominantType.includes('+') || dominantType === 'all four' 
            ? '🧭' 
            : archetypeEmojis[dominantType as keyof typeof archetypeEmojis]
          }
        </div>
        <h3 className="text-3xl font-bold text-gray-800 mb-4">{personality.title}</h3>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          {personality.description}
        </p>
      </div>

      {/* Bar Chart */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h4 className="text-xl font-semibold text-gray-800 mb-6 text-center">Score Breakdown</h4>
        <div className="space-y-6">
          {Object.entries(scores).map(([type, score]) => (
            <div key={type} className="flex items-center space-x-4">
              <div className="flex items-center space-x-3 w-32">
                <div className="text-xl">
                  {archetypeEmojis[type as keyof typeof archetypeEmojis]}
                </div>
                <div className="text-sm font-medium text-gray-700 capitalize">
                  {type}
                </div>
              </div>
              <div className="flex-1 bg-gray-200 rounded-full h-8 relative">
                <div 
                  className={`bg-${archetypeColors[type as keyof typeof archetypeColors]}-500 h-8 rounded-full transition-all duration-1000 ease-out`}
                  style={{ width: `${percentages[type as keyof typeof percentages]}%` }}
                ></div>
                <div className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-white">
                  {percentages[type as keyof typeof percentages]}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quadrant Chart */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h4 className="text-xl font-semibold text-gray-800 mb-4 text-center">Personality Quadrant</h4>
        <div className="relative w-full h-80 rounded-lg overflow-hidden" style={{
          background: 'linear-gradient(135deg, #e0f2fe 0%, #f3e8ff 25%, #fff7ed 50%, #ecfdf5 75%, #e0f2fe 100%)'
        }}>
          {/* Quadrant Background Colors */}
          <div className="absolute inset-0">
            {/* Top Left - Cowboy + Vampire (High Control, Low Emotion) */}
            <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-to-br from-purple-100 to-sky-100 opacity-60"></div>
            {/* Top Right - Cowboy + Werewolf (High Control, High Emotion) */}
            <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-orange-100 to-sky-100 opacity-60"></div>
            {/* Bottom Left - Pirate + Vampire (Low Control, Low Emotion) */}
            <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-purple-100 to-emerald-100 opacity-60"></div>
            {/* Bottom Right - Pirate + Werewolf (Low Control, High Emotion) */}
            <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-orange-100 to-emerald-100 opacity-60"></div>
          </div>
          
          {/* Axes */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full h-0.5 bg-gray-400 shadow-sm"></div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-full w-0.5 bg-gray-400 shadow-sm"></div>
          </div>
          
          {/* Corner Archetype Icons */}
          <div className="absolute top-4 left-4 text-2xl opacity-70">🐴🦇</div>
          <div className="absolute top-4 right-4 text-2xl opacity-70">🐴🐺</div>
          <div className="absolute bottom-4 left-4 text-2xl opacity-70">☠️🦇</div>
          <div className="absolute bottom-4 right-4 text-2xl opacity-70">☠️🐺</div>
          
          {/* Labels */}
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 text-sm font-medium text-gray-700 bg-white/80 px-2 py-1 rounded">
            High Control
          </div>
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-sm font-medium text-gray-700 bg-white/80 px-2 py-1 rounded">
            Low Control
          </div>
          <div className="absolute left-2 top-1/2 transform -translate-y-1/2 -rotate-90 text-sm font-medium text-gray-700 bg-white/80 px-2 py-1 rounded">
            Low Emotion
          </div>
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 rotate-90 text-sm font-medium text-gray-700 bg-white/80 px-2 py-1 rounded">
            High Emotion
          </div>
          
          {/* User Point */}
          <div 
            className="absolute w-6 h-6 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full transform -translate-x-1/2 -translate-y-1/2 border-3 border-white shadow-lg animate-pulse"
            style={{ 
              left: `${Math.max(10, Math.min(90, xPos))}%`, 
              top: `${Math.max(10, Math.min(90, yPos))}%` 
            }}
          >
            <div className="absolute inset-0 bg-white rounded-full animate-ping opacity-30"></div>
          </div>
        </div>
        <p className="text-center text-sm text-gray-600 mt-2">
          Your position on the Emotion vs Control spectrum
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={handleShare}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Share Results
        </button>
        <button
          onClick={onRetakeTest}
          className="px-6 py-3 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition-colors"
        >
          Retake Test
        </button>
      </div>
    </div>
  );
}
