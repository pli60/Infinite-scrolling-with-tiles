"use strict";

/* global XXH */
/* exported --
    p3_preload
    p3_setup
    p3_worldKeyChanged
    p3_tileWidth
    p3_tileHeight
    p3_tileClicked
    p3_drawBefore
    p3_drawTile
    p3_drawSelectedTile
    p3_drawAfter
*/

function p3_preload() { }

function p3_setup() { }

let worldSeed;

function p3_worldKeyChanged(key) {
  worldSeed = XXH.h32(key, 0);
  noiseSeed(worldSeed);
  randomSeed(worldSeed);
}

function p3_tileWidth() {
  return 32;
}
function p3_tileHeight() {
  return 32;
}

let [tw, th] = [p3_tileWidth(), p3_tileHeight()];

let clicks = {};

function p3_tileClicked(i, j) {
  let key = [i, j];
  clicks[key] = 1 + (clicks[key] | 0);
  console.log(i, j);
}

function p3_drawBefore() { }

function isWater(value) {
  if (0.4 < value) {
    return true;
  }
  return false;
}

function isSand(value) {
  if (0.3 <= value && value <= 0.4) {
    return true;
  }
  return false;
}

function isGrass(value) {
  if (value < 0.3) {
    return true;
  }
  return false;
}

function p3_drawTile(i, j) {
  let tilevalue = noise(i, j);

  noStroke();

  push();

  if (isWater(tilevalue)) {
    fill(47, 104, 182);
  }
  if (isSand(tilevalue)) {
    fill(218, 221, 111);
  }
  if (isGrass(tilevalue)) {
    fill(135, 193, 77);
  }

  beginShape();
  vertex(0, 0);
  vertex(0, tw);
  vertex(th, tw);
  vertex(th, 0);
  endShape(CLOSE);

  if (isWater(tilevalue)) {
    fill(255, 255, 255);

    beginShape();
    vertex(0, th * 0.25);
    vertex(tw * 0.25, th * 0.4);
    vertex(tw * 0.5, th * 0.25);
    vertex(tw * 0.75, th * 0.4);
    vertex(tw, th * 0.25);
    vertex(tw, th * 0.25 + 1);
    vertex(tw * 0.75, th * 0.4 + 1);
    vertex(tw * 0.5, th * 0.25 + 1);
    vertex(tw * 0.25, th * 0.4 + 1);
    vertex(0, th * 0.25 + 1);
    endShape(CLOSE);

    beginShape();
    vertex(0, th * 0.5);
    vertex(tw * 0.25, th * 0.65);
    vertex(tw * 0.5, th * 0.5);
    vertex(tw * 0.75, th * 0.65);
    vertex(tw, th * 0.5);
    vertex(tw, th * 0.5 + 2);
    vertex(tw * 0.75, th * 0.65 + 2);
    vertex(tw * 0.5, th * 0.5 + 2);
    vertex(tw * 0.25, th * 0.65 + 2);
    vertex(0, th * 0.5 + 2);
    endShape(CLOSE);

    // water left is land
    if (isSand(noise(i - 1, j)) && !isGrass(noise(i - 1, j))) {
      fill(255, 255, 255);
      beginShape();
      vertex(0, th * 0.25);
      vertex(-tw * 0.25 / 3, th * 0.4);
      vertex(-tw * 0.5 / 3, th * 0.25);
      vertex(-tw * 0.75 / 3, th * 0.4);
      vertex(-tw / 3, th * 0.25);
      vertex(-tw / 3, th * 0.25 + 1);
      vertex(-tw * 0.75 / 3, th * 0.4 + 1);
      vertex(-tw * 0.5 / 3, th * 0.25 + 1);
      vertex(-tw * 0.25 / 3, th * 0.4 + 1);
      vertex(0, th * 0.25 + 1);
      endShape(CLOSE);

      beginShape();
      vertex(0, th * 0.5);
      vertex(-tw * 0.25 / 3, th * 0.65);
      vertex(-tw * 0.5 / 3, th * 0.5);
      vertex(-tw * 0.75 / 3, th * 0.65);
      vertex(-tw / 3, th * 0.5);
      vertex(-tw / 3, th * 0.5 + 1);
      vertex(-tw * 0.75 / 3, th * 0.65 + 1);
      vertex(-tw * 0.5 / 3, th * 0.5 + 1);
      vertex(-tw * 0.25 / 3, th * 0.65 + 1);
      vertex(0, th * 0.5 + 1);
      endShape(CLOSE);
    }

    // right
    if (isSand(noise(i + 1, j)) && !isGrass(noise(i + 1, j))) {
      fill(175, 157, 89);
      triangle(tw, 0, tw * 0.75, th * 0.5, tw, th * 0.5);
      fill(175, 157, 89);
      triangle(tw, th * 0.5, tw * 0.75, th * 0.5, tw, th);
    }
  }

  if (isGrass(tilevalue)) {

    beginShape();
    ellipseMode(CENTER);
    rectMode(CENTER);
    fill(134, 119, 82);
    rect(tw / 2, th / 2, 5, 20);
    fill(0, 255, 0);
    ellipse(tw / 2, th / 2 - 5, 20, 12);

    endShape(CLOSE);
  }

  let n = clicks[[i, j]] | 0;
  if (n % 2 == 1) {
    fill(121, 105, 93);
    beginShape();
    vertex(0, 0);
    vertex(0, 20);
    vertex(17, 32);
    vertex(32, 18);
    vertex(20, 0);
    endShape(CLOSE);
  }

  pop();
}

function p3_drawSelectedTile(i, j) {
  noFill();
  stroke(0, 255, 0, 128);

  beginShape();
  vertex(0, 0);
  vertex(0, tw);
  vertex(th, tw);
  vertex(th, 0);
  endShape(CLOSE);

  noStroke();
  fill(0);
  text("(" + [i, j] + ")", 0, 0);
}

function p3_drawAfter() { }
