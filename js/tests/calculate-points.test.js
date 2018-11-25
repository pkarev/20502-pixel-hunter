import {assert} from 'chai';
import calculateGamePoints, {ANSWERS_NORMAL_LENGTH} from './../calculate-points';

const Answer = function (isCorrect, isFast, isSlow) {
  this.isCorrect = isCorrect;
  this.isFast = isFast;
  this.isSlow = isSlow;
};

const generateMockAnswers = (isCorrect, isFast, isSlow) => {
  let answers = [];
  for (let i = 0; i < ANSWERS_NORMAL_LENGTH; i++) {
    answers.push(new Answer(isCorrect, isFast, isSlow));
  }

  return answers;
};

const allCorrectNormal = generateMockAnswers(true, false, false);
const allCorrectFast = generateMockAnswers(true, true, false);
const allCorrectSlow = generateMockAnswers(true, false, true);
const allIncorrectNormal = generateMockAnswers(false, false, false);
const allIncorrectFast = generateMockAnswers(false, true, false);
const allIncorrectSlow = generateMockAnswers(false, false, true);
const notEnoughAnswers = new Array(5);
const emptyAnswers = [];
const tooManyAnswers = [];

describe(`Calculate game points`, () => {
  it(`should calculate points correct`, () => {
    assert.equal(calculateGamePoints(allCorrectNormal, 3), 1150);
    assert.equal(calculateGamePoints(allCorrectFast, 2), 1600);
    assert.equal(calculateGamePoints(allCorrectSlow, 0), 500);
    assert.equal(calculateGamePoints(allIncorrectNormal, 1), 50);
    assert.equal(calculateGamePoints(allIncorrectFast, 0), 500);
    assert.equal(calculateGamePoints(allIncorrectSlow, 0), -500);
  });
  it(`Should return -1 if answers length is less than 10`, () => {
    assert.equal(calculateGamePoints(notEnoughAnswers, 0), -1);
    assert.equal(calculateGamePoints(emptyAnswers, 0), -1);
    assert.equal(calculateGamePoints(tooManyAnswers, 0), -1);
  });
});
