import {AnswerSpeed} from "./game";

export const ANSWERS_NORMAL_LENGTH = 10;

export const PointsPer = {
  LIVE_LEFT: 50,
  CORRECT_ANSWER: 100,
  FAST_ANSWER: 50,
  SLOW_ANSWER: -50
};

const calculateGamePoints = (answers, livesLeft) => {
  let points = 0;

  if (answers.length < ANSWERS_NORMAL_LENGTH) {
    return -1;
  }

  if (answers.length > ANSWERS_NORMAL_LENGTH) {
    return -1;
  }

  for (const answer of answers) {
    if (answer.isCorrect) {
      points += PointsPer.CORRECT_ANSWER;
    }
    if (answer.speed === AnswerSpeed.FAST) {
      points += PointsPer.FAST_ANSWER;
    }
    if (answer.speed === AnswerSpeed.SLOW) {
      points += PointsPer.SLOW_ANSWER;
    }
  }

  points += livesLeft * PointsPer.LIVE_LEFT;

  return points;
};

export default calculateGamePoints;
