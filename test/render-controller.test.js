import {assert} from 'chai';
import {isValidAnswer, getSongs, nextQuestion} from './render-controller';
import levels from "../data/data";
import songsData from "../data/songs-data";


let question = nextQuestion(`levelGenre`);
let levelData = getSongs(levels[`levelGenre`], songsData, question); levelData.title = question[0];
let genredSongs = levelData.answers.filter((song) => song.genre === question[1]);


describe(`Check answer validity isValidAnswer()`, () => {
  it(`should return true, when answers right`, () => {
    let checkedSongs = genredSongs;
    assert.equal(true, isValidAnswer(`levelGenre`, levelData, checkedSongs));
  });

  it(`should return false, when answer wrong`, () => {
    let checkedSongs = [levelData.answers.find((song) => song.genre !== question[1])];
    assert.equal(false, isValidAnswer(`levelGenre`, levelData, checkedSongs));
  });

  it(`should return false, when some answers wrong`, () => {
    let checkedSongs = levelData.answers.filter((song) => song.genre !== question[1]);
    checkedSongs.pop();
    assert.equal(false, isValidAnswer(`levelGenre`, levelData, checkedSongs));
  });

  it(`should return false, when one answer true, but other false`, () => {
    let checkedSongs = genredSongs;
    let falseSong = [levelData.answers.find((song) => song.genre !== question[1])];
    checkedSongs = checkedSongs.concat(falseSong);
    assert.equal(false, isValidAnswer(`levelGenre`, levelData, checkedSongs));
    assert.equal(false, isValidAnswer(`levelGenre`, levelData, levelData.answers));
  });
});

