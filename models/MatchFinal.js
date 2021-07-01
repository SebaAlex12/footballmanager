const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MatchFinalSchema = new Schema({
  matchId: {
    type: String,
    require: true
  },
  userId: {
    type: String,
    require: true
  },
  firstHalfPoints: {
    type: Number,
    require: true
  },
  secondHalfPoints: {
    type: Number,
    require: true
  },
  overtimePoints: {
    type: Number,
    require: true
  },
  firstHalfHitWinner: {
    type: Number,
    require: true
  },
  secondHalfHitWinner: {
    type: Number,
    require: true
  },
  overtimeHitWinner: {
    type: Number,
    require: true
  },
  firstHalfHitResult: {
    type: Number,
    require: true
  },
  secondHalfHitResult: {
    type: Number,
    require: true
  },
  overtimeHitResult: {
    type: Number,
    require: true
  },
  totalPoints: {
    type: Number,
    require: true
  },
  matchDate: {
    type: Date,
  }
});

module.exports = MatchFinal = mongoose.model("matchFinal", MatchFinalSchema);
