import {assert} from "chai";

const PointsPer = {
  LIVE_LEFT: 50,
  CORRECT_ANSWER: 100,
  FAST_ANSWER: 50,
  SLOW_ANSWER: -50
};

const ANSWERS_NORMAL_LENGTH = 10;

const Answer = function (isCorrect, isFast, isSlow) {
  this.isCorrect = isCorrect;
  this.isFast = isFast;
  this.isSlow = isSlow;
};

const generateMockAnwers = (isCorrect, isFast, isSlow) => {
  let answers = [];
  for (let i = 0; i < ANSWERS_NORMAL_LENGTH; i++) {
    answers.push(new Answer(isCorrect, isFast, isSlow));
  }

  return answers;
};

const allCorrectNormal = generateMockAnwers(true, false, false);
const allCorrectFast = generateMockAnwers(true, true, false);
const allCorrectSlow = generateMockAnwers(true, false, true);
const allIncorrectNormal = generateMockAnwers(false, false, false);
const allIncorrectFast = generateMockAnwers(false, true, false);
const allIncorrectSlow = generateMockAnwers(false, false, true);
const notEnoughAnswers = new Array(5);
const emptyAnswers = [];
const tooManyAnswers = [];

const caclulateGamePoints = (answers, livesLeft) => {
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
    if (answer.isFast) {
      points += PointsPer.FAST_ANSWER;
    }
    if (answer.isSlow) {
      points += PointsPer.SLOW_ANSWER;
    }
  }

  points += livesLeft * PointsPer.LIVE_LEFT;

  return points;
};

describe(`Calculate game points`, () => {
  it(`should calculate points correct`, () => {
    assert.equal(caclulateGamePoints(allCorrectNormal, 3), 1150);
    assert.equal(caclulateGamePoints(allCorrectFast, 2), 1600);
    assert.equal(caclulateGamePoints(allCorrectSlow, 0), 500);
    assert.equal(caclulateGamePoints(allIncorrectNormal, 1), 50);
    assert.equal(caclulateGamePoints(allIncorrectFast, 0), 500);
    assert.equal(caclulateGamePoints(allIncorrectSlow, 0), -500);
  });
  it(`should return -1 if answers length is less than 10`, () => {
    assert.equal(caclulateGamePoints(notEnoughAnswers, 0), -1);
    assert.equal(caclulateGamePoints(emptyAnswers, 0), -1);
    assert.equal(caclulateGamePoints(tooManyAnswers, 0), -1);
  });
});
