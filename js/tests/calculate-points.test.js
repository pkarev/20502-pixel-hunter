import {assert} from 'chai';
import calculateGamePoints, {ANSWERS_NORMAL_LENGTH} from './../calculate-points';
import {AnswerSpeed} from "../game-utils";

const Answer = function (isCorrect, speed) {
  this.isCorrect = isCorrect;
  this.speed = speed;
};

const generateMockAnswers = (isCorrect, speed) => {
  let answers = [];
  for (let i = 0; i < ANSWERS_NORMAL_LENGTH; i++) {
    answers.push(new Answer(isCorrect, speed));
  }

  return answers;
};

const allCorrectNormal = generateMockAnswers(true, AnswerSpeed.NORMAL);
const allCorrectFast = generateMockAnswers(true, AnswerSpeed.FAST);
const allCorrectSlow = generateMockAnswers(true, AnswerSpeed.SLOW);
const allIncorrectNormal = generateMockAnswers(false, AnswerSpeed.NORMAL);
const allIncorrectFast = generateMockAnswers(false, AnswerSpeed.FAST);
const allIncorrectSlow = generateMockAnswers(false, AnswerSpeed.SLOW);
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
