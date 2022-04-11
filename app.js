const startBtn = document.querySelector(".start-btn");
const newBoardBtn = document.querySelector('.new-board-btn');
const container = document.getElementById("container");
const boardField = document.querySelector('.board-field');

let cellWidth = 69;
let boardHeight = 92;

let currentMatrix;
let playfieldSize;
let playfield;
let characterStorage = new Array(0);
let character;
let storage = new Array(0);
let characterCoordinateStorage = new Array(0);
let posX;
let posY;
let rabbitNewPositionX;
let rabbitNewPositionY;
let distance;
let distanceByX;
let distanceByY;
let wolfNewPositionX;
let wolfNewPositionY;
let minDistance;
let moveButtons;
let moveingToRight;
let moveingToDown;
let moveingToLeft;
let moveingToUp;
let board;
let matrixStorage = new Array(0);
let boardStorage = new Array(0);
let playfieldStorage = new Array(0);
let moveButtonStorage = new Array(0);
let currentElementsIndex;
let serialNumber = 0;
let currentBoard;
let currentPlayfieldName;
let currentButton;
let currentButtonElement;
let rabbitWinBoard;
let rabbitWinAnnouncement;
let wolvesWinBoard;
let wolvesWinAnnouncement;
let points = 0;
let rabbitWinAnnouncementPoints;
let rabbitMoveDirection;
let currentButtonClassName;
let currentButtonListElement;

const characters = {
  freeCell: 0,
  rabbitCell: 1,
  wolfCell: 2,
  houseCell: 3,
  fenceCell: 4,
  carrotCell: 5,
};

const characterItems = {
  0: "freeCell",
  1: "rabbitCell",
  2: "wolfCell",
  3: "houseCell",
  4: "fenceCell",
  5: "carrotCell",
};

newBoardBtn.addEventListener("click", function () {
  newBoard();
});

const newBoard = () => {
  serialNumber++;
  createCurrentMatrix();
  makeCharacterStorage();
  setCharacters();
  drawPlayfield();
  makeBoardStorage();
  makePlayfieldStorage();
}

function makeBoardStorage(){
  boardStorage.push(board.id);
  console.log(boardStorage);
}

function makePlayfieldStorage(){
  playfieldStorage.push(playfield.id);
  console.log(playfieldStorage);
}

function makeButtonStorage(){
  moveButtonStorage.push(currentButtonElement);
  console.log(moveButtonStorage);
}

function findCurrentBoardIndex(){
  currentElementsIndex = playfieldStorage.indexOf(currentPlayfieldName);
  console.log(currentElementsIndex);
}

function determineCharacterCounts() {
  wolfCount = (playfieldSize * 40) / 100;
  fenceCount = (playfieldSize * 40) / 100;
  carrotCount = (playfieldSize * 40) / 100;
}

function makeCharacterStorage() {
  determineCharacterCounts();
  characterStorage.push(characters.rabbitCell);
  characterStorage.push(characters.houseCell);
  for (let m = 0; m < wolfCount; m++) {
    characterStorage.push(characters.wolfCell);
  }
  for (let n = 0; n < fenceCount; n++) {
    characterStorage.push(characters.fenceCell);
  }
  for (let n = 0; n < carrotCount; n++) {
    characterStorage.push(characters.carrotCell);
  }
}

function setCharacters() {
  const characterStorageLength = characterStorage.length;
  let k = 0;
  do {
    setRandomPositionForCharacters();
    k++;
  } while (k < characterStorageLength);
}

function createCurrentMatrix() {
  playfieldSize = parseInt(document.getElementById("select-size").value);
  currentMatrix = new Array(playfieldSize)
    .fill(0)
    .map(() => new Array(playfieldSize).fill(0));
  matrixStorage.push(currentMatrix);
  return console.log(matrixStorage);
}

function random() {
  return Math.floor(Math.random() * playfieldSize);
}

function randomCharacter() {
  return characterStorage.shift();
}

function setRandomPositionForCharacters(){
  const i = random();
  const j = random();
  if (currentMatrix[i][j] === characters.freeCell) {
    currentMatrix[i][j] = randomCharacter();
  } else {
    return setRandomPositionForCharacters();
  }
}

function drawPlayfield() {
  makeBoard();
  makePlayfield();
  makeMoveButtonsDiv();
  board.appendChild(playfield);
  board.appendChild(moveButtons);
  makeMoveButtons(moveingToRight, "move-right", rabbitMove);
  makeMoveButtons(moveingToDown, "move-bottom", rabbitMove);
  makeMoveButtons(moveingToLeft, "move-left", rabbitMove);
  makeMoveButtons(moveingToUp, "move-top", rabbitMove);
  currentMatrix.forEach((element) => {
    element.forEach((item) => {
      addCharacters(element, item);
    });
  });
}

function drawPlayfieldAfterMove(){
  isThereAPlayfield();
  makePlayfieldAfterMove();  
  currentMatrix.forEach((element) => {
    element.forEach((item) => {
      addCharacters(element, item);
    });
  });
}

function makeBoard(){
  board = document.createElement("div");
  board.classList.add('board');
  board.style.width = `${playfieldSize * cellWidth}px`;
  board.style.height = `${(currentMatrix.length - 1) * boardHeight}px`;
  board.setAttribute('id', `board${serialNumber}`);
  boardField.appendChild(board);
}

function makePlayfield(){
  playfield = document.createElement("div");
  playfield.classList.add('playfield');
  playfield.setAttribute('id', `playfield${serialNumber}`);
  playfield.style.width = `${playfieldSize * cellWidth}px`;
}

function makePlayfieldAfterMove(){
  playfield = document.createElement("div");
  playfield.classList.add('playfield');
  playfield.setAttribute('id', currentPlayfieldName);
  document.getElementById(currentBoard).appendChild(playfield);
}

function makeMoveButtonsDiv(){
  moveButtons = document.createElement("div");
  moveButtons.classList.add('side-buttons');
  moveButtons.setAttribute('id', `moveButton${serialNumber}`);
}

function makeMoveButtons(sideOfButton, moveSide, rabbitMoveSide){
  sideOfButton = document.createElement("button");
  sideOfButton.setAttribute('class', `moveSide${serialNumber}`);
  sideOfButton.setAttribute('id', moveSide);
  sideOfButton.addEventListener('click', rabbitMoveSide);
  sideOfButton.setAttribute('name', `playfield${serialNumber}`);
  moveButtons.appendChild(sideOfButton);
}

function addCharacters(element, item, characterItem) {
  createCurrentElement(element, item, characterItem);
}

function createCurrentElement(element, item, characterItem) {
  characterItem = item;
  createElement(characterItems[characterItem], characterItems[characterItem]);
}

function isThereAPlayfield() {
  if (document.getElementById(currentPlayfieldName) !== null) {
    document.getElementById(currentPlayfieldName).remove();
  }
}

function createElement(itemName, className) {
  itemName = document.createElement("div");
  itemName.classList.add(className);
  playfield.appendChild(itemName);
}

function characterCurrentCoordinate(character) {
  characterCoordinateStorage = new Array(0);
  for (let i = 0; i < currentMatrix.length; i++) {
    if (currentMatrix[i].includes(character)) {  
      for(let j = 0; j < currentMatrix[i].length; j++){
        if(currentMatrix[i][j] === character){
          posX = i;
          posY = j;
          characterCoordinateStorage.push([posX, posY]);
        }
      }
    }    
  }
}

function rabbitMove(eventName){
  setCurrentButtonElement(eventName);
  makeButtonStorage();
  currentButton = moveButtonStorage[0];
  moveButtonStorage.length = 0;
  points++;
  determineRabbitMoveDirection(eventName);
  setCurrentPlayfield(eventName);
  findCurrentBoardIndex();
  currentMatrix = matrixStorage[currentElementsIndex];
  currentBoard = boardStorage[currentElementsIndex];
  currentButtonClassName = '.' + currentButton;
  currentButtonListElement = document.querySelectorAll(currentButtonClassName);
  characterCurrentCoordinate(characters.rabbitCell);
  switch(rabbitMoveDirection){
    case 'move-right':
      rabbitMoveRight();
      break;
    case 'move-bottom':
      rabbitMoveBottom();
      break;
    case 'move-left':
      rabbitMoveLeft();
      break;
    case 'move-top':
      rabbitMoveTop();
      break;
  }
  if(rabbitCanMove(rabbitNewPositionX, rabbitNewPositionY, points)){
    moveCharacter(characters.rabbitCell, rabbitNewPositionX, rabbitNewPositionY);
  }
  updateWolvesPositions();
  drawPlayfieldAfterMove(eventName);
}

function determineRabbitMoveDirection(event){
  rabbitMoveDirection = event.target.id;
  console.log(rabbitMoveDirection);
}

function rabbitMoveRight(){
  if(posY === (playfieldSize - 1)){
    rabbitNewPositionX = posX, rabbitNewPositionY = 0;
  }else{
    rabbitNewPositionX = posX, rabbitNewPositionY = (posY + 1);
  }
}

function rabbitMoveBottom(){
  if(posX === (playfieldSize - 1)){
    rabbitNewPositionX = 0, rabbitNewPositionY = posY;
  }
  else{
    rabbitNewPositionX = (posX + 1), rabbitNewPositionY = posY;
  }
}

function rabbitMoveLeft(){
  if(posY === 0){
    rabbitNewPositionX = posX, rabbitNewPositionY = (playfieldSize - 1);
  }else{
    rabbitNewPositionX = posX, rabbitNewPositionY = (posY - 1);
  }
}

function rabbitMoveTop(){
  if(posX === 0){
    rabbitNewPositionX = (playfieldSize - 1), rabbitNewPositionY = posY;
  }else{
    rabbitNewPositionX = (posX - 1), rabbitNewPositionY = posY;
  }
}

function setCurrentPlayfield(event){
  currentPlayfieldName = event.target.name;
  console.log(currentPlayfieldName);
}

function setCurrentButtonElement(event){
  currentButtonElement = event.target.className;
  console.log(currentButton);
}

function updateWolvesPositions() {
  characterCurrentCoordinate(characters.wolfCell);
  while(characterCoordinateStorage.length !== 0){
    currentWolf();
    wolfNewPosition();
    if(wolfCanMove(wolfNewPositionX, wolfNewPositionY)){
    moveCharacter(characters.wolfCell, wolfNewPositionX, wolfNewPositionY);
    }  
  }
}

function moveCharacter(character, characterPositionX, characterPositionY){
  currentMatrix[posX].splice(posY, 1, characters.freeCell);
  currentMatrix[characterPositionX].splice(characterPositionY, 1, character);
}

function rabbitCanMove(characterPositionX, characterPositionY, sumPoints){
  let rabbitNextPosition = currentMatrix[characterPositionX][characterPositionY];
  if(rabbitNextPosition == characters.fenceCell){
    return false;
  }
  if(rabbitNextPosition == characters.wolfCell){
    gameStatusBoard(characters.wolfCell);
    return false;
  }
  if(rabbitNextPosition == characters.houseCell){
    gameStatusBoard(characters.rabbitCell, sumPoints);
    return false;
  }
  if(rabbitNextPosition == characters.carrotCell){
    points += 2;
  }
  return true;
}

function currentWolf(){
  for(let m = 0; m < characterCoordinateStorage.length; m++){
    posX = characterCoordinateStorage[m][0];
    posY = characterCoordinateStorage[m][1];
    characterCoordinateStorage.shift();
    return posX, posY;
  }
}

function wolfNewPosition(){
  determineClosestDistance(posX, posY);
}

function determineClosestDistance(posX, posY){
let closestDistanceStorage = new Array(0);
if(wolfProbablePositionY = posY + 1){
  distanceByX = Math.abs(posX - rabbitNewPositionX);
  distanceByY = Math.abs(wolfProbablePositionY - rabbitNewPositionY);
  calculateDistance(closestDistanceStorage);
}
if(wolfProbablePositionX = posX + 1){
  distanceByX = Math.abs(wolfProbablePositionX - rabbitNewPositionX);
  distanceByY = Math.abs(posY - rabbitNewPositionY);
  calculateDistance(closestDistanceStorage);
}
if(wolfProbablePositionY = posY - 1){
  distanceByX = Math.abs(posX - rabbitNewPositionX);
  distanceByY = Math.abs(wolfProbablePositionY - rabbitNewPositionY);
  calculateDistance(closestDistanceStorage);
}
if(wolfProbablePositionX = posX - 1){
  distanceByX = Math.abs(wolfProbablePositionX - rabbitNewPositionX);
  distanceByY = Math.abs(posY - rabbitNewPositionY);
  calculateDistance(closestDistanceStorage);
}
setWolfNewPositionCoordinates(closestDistanceStorage);
}

function calculateDistance(distanceStorage){
  distance = Math.floor(Math.sqrt(Math.pow(distanceByX, 2) + Math.pow(distanceByY, 2)));
  distanceStorage.push(distance);
}

function setWolfNewPositionCoordinates(storage){
  if(storage.length !== 0){
    minDistance = Math.min(...storage);
    if(minDistance === storage[0]){
      wolfNewPositionX = posX, wolfNewPositionY = posY + 1;
    }
    if(minDistance === storage[1]){
      wolfNewPositionX = posX + 1, wolfNewPositionY = posY;
    }
    if(minDistance === storage[2]){
      wolfNewPositionX = posX, wolfNewPositionY = posY - 1;
    }
    if(minDistance === storage[3]){
      wolfNewPositionX = posX - 1, wolfNewPositionY = posY;
    }
  }else{
    wolfNewPositionX = posX; wolfNewPositionY = posY;
  }
}

function wolfCanMove(characterPositionX, characterPositionY){
  let wolfNextPosition = currentMatrix[characterPositionX][characterPositionY];
  if(wolfNextPosition == characters.fenceCell
    || wolfNextPosition == characters.wolfCell
    || wolfNextPosition == characters.houseCell
    || wolfNextPosition == undefined){
    return false;
  }
  if(wolfNextPosition == characters.rabbitCell && rabbitIsWin){
    return false;
  }
  if(wolfNextPosition == characters.rabbitCell){
    gameStatusBoard(characters.wolfCell);
  }
  return true;
}

function gameStatusBoard(winnerCharacter, sumPoints){
  if(winnerCharacter == characters.wolfCell){
    makeWolvesWinBoard();
  }  
  if(winnerCharacter == characters.rabbitCell){
    makeRabbitWinBoard(sumPoints);
  }
}

function makeWolvesWinBoard(){
  wolvesWinBoard = document.createElement('div');
  wolvesWinBoard.classList.add('wolvesWinAnnouncement');
  wolvesWinBoard.innerHTML = `
              <h2> Wolves Won ! </h2>`;
  document.getElementById(currentBoard).appendChild(wolvesWinBoard);
  points = 0;
  wolvesWinBoard.style.zIndex = 1;
  removeEvent(currentButtonListElement);
}

function makeRabbitWinBoard(sumPoints){  
  rabbitIsWin = true;
  rabbitWinBoard = document.createElement('div');
  rabbitWinBoard.classList.add('rabbitWinAnnouncement');
  board.appendChild(rabbitWinBoard);
  rabbitWinBoard.innerHTML = `
              <h2> Congratulations ! </h2>
              <h2> Rabbit Win !</h2>`;
  rabbitWinAnnouncementPoints = document.createElement('h2');
  rabbitWinAnnouncementPoints.classList.add('rabbitWinAnnouncementPoints');
  rabbitWinAnnouncementPoints.innerText = `You scored ${sumPoints} points !`;
  rabbitWinBoard.appendChild(rabbitWinAnnouncementPoints);
  document.getElementById(currentBoard).appendChild(rabbitWinBoard);
  points = 0;
  rabbitWinBoard.style.zIndex = '1';
  removeEvent(currentButtonListElement);
}

function removeEvent(listElement){
  listElement[0].removeEventListener('click', rabbitMove);
  listElement[1].removeEventListener('click', rabbitMove);
  listElement[2].removeEventListener('click', rabbitMove);
  listElement[3].removeEventListener('click', rabbitMove);
}
