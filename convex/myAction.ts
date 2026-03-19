// Polyfill for performance object in Convex runtime
if (typeof performance === "undefined") {
//   eslint-disable-next-line @typescript-eslint/no-explicit-any
  (globalThis as any).performance = {
    now: () => Date.now(),
  };
}

import { ConvexVectorStore } from "@langchain/community/vectorstores/convex";
import { action } from "./_generated/server.js";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { TaskType } from "@google/generative-ai";
import { v } from "convex/values";

export const ingest = action({
  args: {
    splitText: v.any(),
    fileId: v.any(),
  },
  handler: async (ctx, args) => {
    await ConvexVectorStore.fromTexts(
        args.splitText,
        args.fileId,
        new GoogleGenerativeAIEmbeddings({
            apiKey: process.env.GOOGLE_API_KEY,
            model: "gemini-embedding-001", // 768 dimensions
            taskType: TaskType.RETRIEVAL_DOCUMENT,
            title: "Document title",
        }),
      { ctx }
    );
  },
});
