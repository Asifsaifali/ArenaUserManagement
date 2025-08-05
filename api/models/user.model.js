import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid';

const vipMemberSchema = new mongoose.Schema({
  chatId: {
    type: String,
    required: false,
    default: "chat_" + Math.floor(Math.random() * 1000000),
  },
  userId: {
    type: String,
    required: false,
    default: () => "user_" + uuidv4(), 
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  username: {
    type: String,
    default: "@anonymous_user",
  },
  subscription: {
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "expired"],
      default: "active",
    },
    daysLeft: {
      type: Number,
      default: 30,
    },
    expired: {
      type: Boolean,
      default: false,
    },
  },
}, {
  timestamps: true,
});

vipMemberSchema.index({ chatId: 1, userId: 1 }, { unique: true });

const VipMember = mongoose.model("VipMember", vipMemberSchema);
export default VipMember;


