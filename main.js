const player_nickname_Box = document.getElementById('player_nicknameBox');
const player_number = document.getElementById('player_number');
const player_number_btn = document.getElementById('player_number_btn');
const play_content = document.getElementById('displayWord_box');
const game_turn = document.getElementById('playerList_box');
const turn = document.getElementById('displayTurn_box');
const word_form = document.getElementById('word_form');
const word_input = document.getElementById('word_input');
let nickame = [];
let start_word;
let answer_word;
let player_reset = 0;
let nickame_reset = 0;

// 닉네임 전부 입력했을때 랜덤으로 턴 알림
function noticeTurn(){
  let count = parseInt(Math.random() * nickame.length);
  turn.textContent = nickame[count] + ' 님 턴 입니다!';
}
// 닉네임 설정시 화면에 닉네임 표시
function noticeNickname(inputLength){
  let nickname_span = document.createElement('span');
  if(nickame.length === inputLength.length){
    player_nickname_Box.innerHTML = '';
    nickname_span.textContent = 'player List : ' + nickame
    game_turn.appendChild(nickname_span);
    word_input.focus();
    noticeTurn();
  }else{
    nickname_span.textContent = '모든 닉네임을 입력하세요!'
    game_turn.appendChild(nickname_span);
  }
}
// 인원수 뽑아서 닉네임 설정
function displayNickname(nick_btn){
  let Nickname_value = player_nickname_Box.querySelectorAll('input');
  nick_btn.addEventListener('click',function(){
    Nickname_value.forEach(function(input, index){
      if(input.value === ""){
        word_input.readOnly = true;
        word_input.placeholder = '닉네임 입력 시 열림!';
        nickame = [];
        return false;
      }else{
        nickame.push(input.value);
        word_input.readOnly = false;
        word_input.placeholder = 'Game Start!';
        input.value = '';
        game_turn.innerHTML = '';
      }
    })
    noticeNickname(Nickname_value);
  })
}

function game_set_number(){
  let player_total = parseInt(player_number.value);
  if(player_reset === 0){
    if(player_total < 2 || isNaN(player_total)){
      alert('2명 이상 플레이 가능!');
      player_number.focus();
      player_number.value = '';
    }else{
      player_reset = 1;
      player_number_btn.textContent = 'Reset';
      player_number.readOnly = true;
      const player_name_btn = document.createElement('button');
      player_name_btn.textContent = '닉네임 설정 후 게임시작!';
      for(let i = 0; i < player_total; i++){
        var player_name = document.createElement('input');
        let player_text = document.createElement('span');
        player_text.textContent = i + 1 + 'player: ';
        player_nickname_Box.appendChild(player_text);
        player_nickname_Box.appendChild(player_name);
        player_nickname_Box.appendChild(player_name_btn);
      }
      displayNickname(player_name_btn);
      player_number.value = '';
    } 
  }else{
    player_number.readOnly = false;
    word_input.readOnly = true;
    word_input.placeholder = 'game close!';
    player_reset = 0;
    player_number_btn.textContent = '참가자 인원수';
    player_nickname_Box.innerHTML = '';
    game_turn.innerHTML = '';
    turn.textContent = '';
    play_content.innerHTML = '';
    start_word = undefined;
    answer_word = undefined;
    nickame = [];
  }
}
// 끝말잇기 단어 비교;
function formSubmit(event){
  event.preventDefault();
  answer_word = word_input.value;
  if(start_word === undefined){
    start_word = word_input.value
    play_content.textContent = start_word;
  }else if(start_word.charAt(start_word.length - 1) === answer_word.charAt(0)){
    let word_text = document.createElement('span');
    word_text.textContent = '-' + answer_word;
    play_content.appendChild(word_text);
    start_word = answer_word;
  }else{
    start_word = undefined;
    answer_word = undefined;
    play_content.innerHTML = '';
    word_input.readOnly = true;
    word_input.placeholder = 'game end';
    player_number.focus();
    alert('마! 니 틀릿다!');
  }
  word_input.value = '';
  noticeTurn();
}

word_form.addEventListener('submit',formSubmit);
player_number_btn.addEventListener('click',game_set_number);

