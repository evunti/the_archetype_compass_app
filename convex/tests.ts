import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

// ✅ Save test result mutation
export const saveTestResult = mutation({
  args: {
    sessionId: v.string(),
    answers: v.array(v.number()),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);

    // Calculate total scores per group
    const cowboy = args.answers.slice(0, 7).reduce((sum, val) => sum + val, 0);
    const pirate = args.answers.slice(7, 14).reduce((sum, val) => sum + val, 0);
    const werewolf = args.answers
      .slice(14, 21)
      .reduce((sum, val) => sum + val, 0);
    const vampire = args.answers
      .slice(21, 28)
      .reduce((sum, val) => sum + val, 0);

    const scores = {
      cowboy,
      pirate,
      werewolf,
      vampire,
    };

    // Find dominant type(s)
    const maxScore = Math.max(cowboy, pirate, werewolf, vampire);
    const topTypes = Object.entries(scores)
      .filter(([_, score]) => score >= maxScore - 3)
      .map(([type]) => type)
      .sort();

    let dominantType: string;
    if (topTypes.length === 4) {
      dominantType = "All Four";
    } else if (topTypes.length === 3) {
      dominantType = topTypes.join(" + ");
    } else if (topTypes.length === 2) {
      dominantType = topTypes.join(" + ");
    } else {
      dominantType = topTypes[0];
    }

    // Save to DB
    const resultId = await ctx.db.insert("testResults", {
      userId: userId || undefined,
      sessionId: args.sessionId,
      answers: args.answers,
      scores,
      dominantType,
      completedAt: Date.now(),
    });

    return { resultId, scores, dominantType };
  },
});

export const getTestResult = query({
  args: { sessionId: v.string() },
  handler: async (ctx, args) => {
    const result = await ctx.db
      .query("testResults")
      .withIndex("by_session", (q) => q.eq("sessionId", args.sessionId))
      .order("desc")
      .first();

    return result;
  },
});
