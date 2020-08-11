import {assert} from 'chai';
import {getSvgDash} from './module-timer';


describe(`Check svg animation with different parameters getSvgDash()`, () => {
  it(`should return full length and 0 in dashoffset`, () => {
    let fullTime = 150; let currentTime = 150; let radius = 88;
    assert.equal(553, Math.ceil(getSvgDash(fullTime, currentTime, radius).stroke));
    assert.equal(0, Math.ceil(getSvgDash(fullTime, currentTime, radius).offset));
  });

  it(`should return full length and 281 in dashoffset`, () => {
    let fullTime = 150; let currentTime = 74; let radius = 88;
    assert.equal(553, Math.ceil(getSvgDash(fullTime, currentTime, radius).stroke));
    assert.equal(281, Math.ceil(getSvgDash(fullTime, currentTime, radius).offset));
  });

  it(`should return full length and 4 in dashoffset`, () => {
    let fullTime = 150; let currentTime = 149; let radius = 88;
    assert.equal(553, Math.ceil(getSvgDash(fullTime, currentTime, radius).stroke));
    assert.equal(4, Math.ceil(getSvgDash(fullTime, currentTime, radius).offset));
  });

  it(`shouldn't return error with wrong parameters`, () => {
    let dash = {stroke: 0, offset: 0};
    assert.deepStrictEqual(dash, getSvgDash(0, 0, 0));
    assert.deepStrictEqual(dash, getSvgDash(`fullTime`, null, false));
    assert.deepStrictEqual(dash, getSvgDash(55, `hello`, 0));
    assert.deepStrictEqual(dash, getSvgDash(55, 60, 88));
    assert.deepStrictEqual(dash, getSvgDash(-8, -10, 88));
    assert.deepStrictEqual(dash, getSvgDash(null, -10, NaN));
  });
});

