import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
    updatedQuery: {
      type: String,
      required: true,
    },
    intent: {
      type: String,
      required: true,
    },
    entities: {
      type: [String],
      required: true,
      default: [],
    },
  },
  { timestamps: true },
);

export default mongoose.model("chatData", chatSchema);
