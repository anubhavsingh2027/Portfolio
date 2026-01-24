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
  },
  { timeStamp: true },
);

export default mongoose.model("chatData", chatSchema);
