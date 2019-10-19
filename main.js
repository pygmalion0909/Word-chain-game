const player_number = document.getElementById('player_number');
const player_nickname_Box = document.getElementById('player_nicknameBox');
const word_form = document.getElementById('word_form');
const word_input = document.getElementById('word_input');
const turn_display = document.getElementById('displayTurn_box');
let userNickname = [];
let checkSpaceName = [];
let standardWord;
let comparisonWord;
let turnCount = 0;
let stopGame = true;

// 설정모음
// 닉네임 입력란 만들기 설정
const makeNicknameObj = {
  btn : document.createElement('button'),
  createEl : function(number,targeting){
    for(let i = 0; i < number; i++){
      let player_name = document.createElement('input');
      let player_text = document.createElement('span');
      player_text.textContent = i + 1 + 'player: ';
      this.btn.textContent = '닉네임 설정 후 STATR';
      targeting.appendChild(player_text);
      targeting.appendChild(player_name);
      targeting.appendChild(this.btn);
    } 
  },
}

// 속성 설정
propertySet = {
  bundle : function(target, inner, place, text, tf){
    target.innerHTML = inner;
    target.placeholder = place;
    target.textContent = text;
    target.readOnly = tf;
  },
  falseToggle : function(){
    player_number_btn.textContent = '참가자 인원수';
    player_nickname_Box.innerHTML = '';
    word_input.placeholder = 'game close!';
    player_number.style.visibility = 'visible';
    turn_display.textContent = '';
    displayWord_box.innerHTML = '';
    userNickname = [];
    standardWord = null;
    comparisonWord = null;
    word_input.readOnly = true;
    toggleResetBtn = true;
    turnCount = 0;
  },
  trueToggle : function(){
    player_number_btn.textContent = 'RESET';
    player_number.style.visibility = 'hidden';
    toggleResetBtn = false;
    stopGame = true;
  },
}

// 게임단어를 화면에 보이기
function displayWord(){
  const displayWord_box = document.getElementById('displayWord_box');
  if(stopGame){
    displayWord_box.textContent = 'Turn Word : ' + standardWord;
  }
}

// 랜덤 턴 알림
function noticeTurn(){
  if(stopGame){
    let randeomTurn = parseInt(Math.random() * checkSpaceName.length);
    turnCount += 1;
    turn_display.textContent = `${turnCount}turn : ${checkSpaceName[randeomTurn]}님!`;
  }
}

// 시작단어랑 다음 단어 첫글자라 맞는지 확인
function checkWord(){
  if(standardWord.charAt(standardWord.length - 1) === comparisonWord.charAt(0)){
    standardWord = comparisonWord;
  }else{
    alert('마! 니 틀릿다! \n 게임이 최기화 됩니다!');
    propertySet.falseToggle();
    stopGame = false;
  }
}

// 끝말잇기 게임시작 단어 넣기
function enterWord(event){
  event.preventDefault();
  (!standardWord) ? standardWord = word_input.value : (comparisonWord = word_input.value, checkWord());
  noticeTurn();
  displayWord();
  word_input.value = '';
}

// 게임 단어 넣어서 게임 시작
word_form.addEventListener('submit', enterWord);

// 게임단어 입력창 활성화 시키기
function openGame(){
  propertySet.bundle(word_input, null, 'game start', null, false);
  word_input.focus();
}

// 닉네임 화면에 나타내기
function showNickname(){
  propertySet.bundle(player_nickname_Box, '', null, checkSpaceName, null);
}

// 닉네임 모두 입력 여부 and 빈값 체크
function checkNickname(){
  checkSpaceName = userNickname.filter(function(element){
    return element.replace(/(\s*)/g, "");  // 빈공간 빼고 배열에 담는다.
  })
  if(checkSpaceName.length === userNickname.length){
    showNickname();
    openGame();
    turn_display.textContent = `Start Player : ${checkSpaceName[0]} 님!! 시작단어를 입력하세요!`;
  }else{
    userNickname = [];
    checkSpaceName = [];
    propertySet.bundle(word_input, null, '닉네임 전부 입력 시 열림!');
  }
}

// 닉네임 배열에 담기(닉네임 저장)
function saveNickname(){
  const nickname_input = document.querySelectorAll('#player_nicknameBox > input');
  nickname_input.forEach(function(input){
    userNickname.push(input.value);
  })
  checkNickname();
}

// 닉네임 입력란 생성하기
function makeNicknameInput(number){
  makeNicknameObj.createEl(number, player_nickname_Box);
}

// 게임 참가자 2명 이상인지 확인하기
function checkNumber(){
  const startNumber = Number(player_number.value);
  if(startNumber < 2 || isNaN(startNumber)){
    propertySet.bundle(player_nickname_Box,null,null,'2명 이상 플레이 가능! RESET버튼!');
  }else{
    makeNicknameInput(startNumber);
  }
}

// 게임 리셋 버튼
let toggleResetBtn = true;

function SwitchToggle(){
  (toggleResetBtn) ? (checkNumber(), propertySet.trueToggle()) : propertySet.falseToggle();
}

// 플레이어 인원 버튼
player_number_btn.addEventListener('click', SwitchToggle);

// 닉네임 저장 버튼
makeNicknameObj.btn.addEventListener('click', saveNickname);


