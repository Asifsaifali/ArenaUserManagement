import mongoose from "mongoose";

const vipMemberSchema = new mongoose.Schema({
  chatId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
    unique: true,
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
    default: "anonymous",
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


