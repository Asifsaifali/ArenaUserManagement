import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  groupTitle:{
    type : String,
    default : "User Testing Group"
  },
  chatId: {
    type: Number,
    required: true,
  },
  userId: {
    type: Number,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    default: '',
  },
  username: {
    type: String,
    default: 'anonymous',
  },
  joinedAt: {
    type: Date,
    default: Date.now,
  },
  subscription: {
    startDate: {
      type: Date,
      default: Date.now,
    },
    endDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ['active', 'expired'],
      default: 'active',
    },
  },
});

UserSchema.index({ chatId: 1, userId: 1 }, { unique: true });

const User = mongoose.model('User', UserSchema);
export default User;
