import {Question, QuestionTask} from "./game";

const paintings = [
  {
    src: `https://k42.kn3.net/CF42609C8.jpg`,
    isPainting: true
  },
  {
    src: `https://k42.kn3.net/D2F0370D6.jpg`,
    isPainting: true
  },
  {
    src: `https://k32.kn3.net/5C7060EC5.jpg`,
    isPainting: true
  }
];

const photos = [
  {
    src: `http://i.imgur.com/1KegWPz.jpg`,
    isPainting: false
  },
  {
    src: `https://i.imgur.com/DiHM5Zb.jpg`,
    isPainting: false
  },
  {
    src: `http://i.imgur.com/DKR1HtB.jpg`,
    isPainting: false
  },
];

const allImages = Array.of(...paintings, ...photos);

const getShuffledCopy = (array) => {
  const copy = Array.from(array);
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.
    floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }

  return copy;
};

const getRandomItem = (array) => array[Math.floor(Math.random() * array.length)];

class MockQuestion {
  constructor(type, images) {
    this.type = type;
    this.task = QuestionTask[type];
    this.images = images;
  }
}

export const mockQuestions = getShuffledCopy([
  new MockQuestion(Question.GUESS_ONE, [getRandomItem(allImages)]),
  new MockQuestion(Question.GUESS_TWO, getShuffledCopy(allImages).slice(0, 2)),
  new MockQuestion(Question.FIND_PHOTO, getShuffledCopy(photos).slice(0, 3)),
  new MockQuestion(Question.FIND_PAINTING, getShuffledCopy(paintings).slice(0, 3)),
  new MockQuestion(Question.GUESS_ONE, [getRandomItem(allImages)]),
  new MockQuestion(Question.GUESS_TWO, getShuffledCopy(allImages).slice(0, 2)),
  new MockQuestion(Question.FIND_PHOTO, getShuffledCopy(photos).slice(0, 3)),
  new MockQuestion(Question.FIND_PAINTING, getShuffledCopy(paintings).slice(0, 3)),
  new MockQuestion(Question.GUESS_ONE, [getRandomItem(allImages)]),
  new MockQuestion(Question.GUESS_TWO, getShuffledCopy(allImages).slice(0, 2)),
]);
