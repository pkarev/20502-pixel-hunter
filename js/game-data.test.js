import {assert} from "chai";

describe(`Array`, () => {
  describe(`#indexOf()`, () => {
    it(`should return -1 when value is not present`, () => {
      assert.equal(-1, [1, 2, 3].indexOf(4));
    });
  });
});
