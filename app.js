const ghx_header = document.getElementById('ghx-header');

ghx_header.innerHTML += `<div id="daily-master" class="container">
<section class="timer">
<label id="countdown_minutes" class="timer_label">00</label>
<label id="countdown_seconds" class="timer_label">00</label>
</section>

<section>
<button id="btn_countdown" class="btn btn_primary btn_start">START</button>
<button id="btn_create_events" class="btn btn_primary btn_generate">GENERATE</button>
</section>

<section class="div_secondary">
<button id="btn_users" class="btn btn_red btn_users">USERS</button>
<input type="text" class="input_add_user" name="add user" placeholder="Add new user" id="add_user">
</section>

<section class="flex div_secondary">
<button id="btn_add_user" class="btn btn_secondary btn_red">ADD</button>

<button type="button" id="btn_calendar" class="btn_calendar">
<img id="img_calendar" height ="44" width="50" />
</button>
</section>


<div id="users" class="usersStyle hidden">
<ul>
  <li>user 1 <button>delete</button></li>
  <li>user 2 <button>delete</button></li>
  <li>user 3 <button>delete</button></li>
  <li>user 4 <button>delete</button></li>
  <li>user 5 <button>delete</button></li>
</ul>
</div>
<div id="calendar" class="calendarStyle hidden"></div>
</div>`;

const ghx_modes_tools = document.getElementById('ghx-modes-tools');
const ghx_view_selector = document.getElementById('ghx-view-selector');
const daily_master = document.getElementById('daily-master');
const countdown_minutes = document.getElementById('countdown_minutes');
const countdown_seconds = document.getElementById('countdown_seconds');
const btn_countdown = document.getElementById('btn_countdown');
const ghx_avatar_img = document.getElementsByClassName('ghx-avatar-img');
const btn_calendar = document.getElementById('btn_calendar');
const btn_users = document.getElementById('btn_users');
const btn_create_events = document.getElementById('btn_create_events');
const users = document.getElementById('users');
const img_calendar = document.getElementById('img_calendar');

img_calendar.src = chrome.extension.getURL("images/calendar.png");

ghx_header.setAttribute("style","display: grid;grid-template-columns: repeat(4, 1fr);grid-auto-flow: dense;direction: rtl;");
ghx_modes_tools.setAttribute("style","direction: ltr");
ghx_view_selector.setAttribute("style","display: grid;grid-column: span 2;direction: ltr");


const startingMinutes = 0;
let time = startingMinutes * 60;

let timer;
let active=false;

const start = () => {
  if(!active){
    timer = setInterval(updateCoutndown, 1000);
    active=true;
    btn_countdown.innerHTML='PAUSE'
    return
  }
  clearInterval(timer);
  active=false;
  btn_countdown.innerHTML='START'
}

btn_countdown.addEventListener('click',start);


function updateCoutndown() {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  
  countdown_minutes.innerHTML = minutes < 10 ? `0${minutes}` : minutes;
  countdown_seconds.innerHTML = seconds < 10 ? `0${seconds}` : seconds;

  time++;
}

const mySet1 = new Set()

for (const elem of ghx_avatar_img) {
  mySet1.add(elem.alt.slice(10));
}

btn_calendar.addEventListener('click',displayCalendar);
btn_users.addEventListener('click', displayUsers);
btn_create_events.addEventListener('click', createEvents);

function displayUsers() {
  if (users.classList.contains('hidden')) {
    users.classList.remove('hidden');
  } else {
    users.classList.add('hidden');
  }
}

//const myArr = Array.from(mySet1)

function getRandomUser(max) {
  let random = Math.round(Math.random() * max)
  console.log(mySet1)
  //console.log(myArr)
  console.log(random)
  console.log([...mySet1]);
}


let events = [];

function createEvents() {
  events = Events.create([...mySet1]);
}

const calendarEl = document.getElementById('calendar');


function createCalendar(events = []) {
  return new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    timeZone: 'local',
    editable: true,
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    events: events
  });
}

let calendarShow = false;

function displayCalendar(){
  const calendar = createCalendar(events);
  if(!calendarShow){
    calendarEl.classList.remove("hidden");
    calendarShow=true
    calendar.render();
    return
  }

  calendarEl.classList.add("hidden");
  calendarShow=false;
}