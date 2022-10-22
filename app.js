chrome.runtime.onMessage.addListener(async function (msg, sender, sendResponse) {
  if (msg.text === 'click') {

    async function showProject(){
      const template = document.createElement('div');
      template.innerHTML = `<div id="daily-master" class="container one_colum">
      <section id="select_projects">
      <header>
      <label>Selecionar un proyecto</label>
      <?xml version="1.0" ?><svg class="feather feather-move" fill="none" height="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><polyline points="5 9 2 12 5 15"/><polyline points="9 5 12 2 15 5"/><polyline points="15 19 12 22 9 19"/><polyline points="19 9 22 12 19 15"/><line x1="2" x2="22" y1="12" y2="12"/><line x1="12" x2="12" y1="2" y2="22"/></svg>
      </header>
        <select name="" id="listprojects" class="select_project"></select>
        <div class="separator">or</div>
        <div class="add_project">
          <input id="project" placeholder="Add new project">
          <button id="btn_add_project" class="btn btn_red btn_width">ADD</button>
        </div>
      </section>
      </div>`;

      document.body.appendChild(template);

      // dragrable
      const wrapper = document.querySelector("#daily-master"), header = wrapper.querySelector("header");

      function onDrag({movementX, movementY}){
        let getStyle = window.getComputedStyle(wrapper);
        let leftVal = parseInt(getStyle.left);
        let topVal = parseInt(getStyle.top);
        wrapper.style.left = `${leftVal + movementX}px`;
        wrapper.style.top = `${topVal + movementY}px`;
      }

      header.addEventListener("mousedown", ()=>{
        header.classList.add("active");
        header.addEventListener("mousemove", onDrag);
      });

      document.addEventListener("mouseup", ()=>{
        header.classList.remove("active");
        header.removeEventListener("mousemove", onDrag);
      });
      // dragrable

      const listprojects = document.getElementById('listprojects');
      const inputProject = document.getElementById('project');
      const btn_add_project = document.getElementById('btn_add_project');
      
      const select_projects = document.getElementById('select_projects');

      btn_add_project.addEventListener('click', addProject);

      let projects = await Services.getData('http://localhost:3001/api/projects');

      const createListProjects = (projects) => {
        listprojects.innerHTML = '';
        listprojects.innerHTML = '<option value="none" selected disabled hidden>Select an Project</option>';
        for (const project of projects) {
          listprojects.innerHTML += `<option value="${project.name}" id="${project._id}">${project.name}</option>`
        }
      } 

      if(projects){
        createListProjects(projects);
      }

      function addProject () {
        const inputValue = inputProject.value;

        if(!inputValue){
          console.log('Escriba el nombre del usuario.')
          return
        }

        const project = {
          "name": inputValue,
        };

        fetch('http://localhost:3001/api/projects', {
          method: 'POST',
          body: JSON.stringify(project),
          headers:{
            'Content-Type': 'application/json'
          }
        }).then(res => res.json())
        .then(async () => {
          projects = await Services.getData('http://localhost:3001/api/projects');
          
          createListProjects(projects);
          inputProject.value = '';
        })
        .catch(error => console.error('Error:', error));

      }

      listprojects.addEventListener('change', (event)=>{
        const daily_master = document.getElementById('daily-master');
        const projectName = event.target.value;
        const projectId = event.target.options[event.target.selectedIndex].id;

        daily_master.classList.remove('one_colum');
        daily_master.classList.add('two_colum');
        select_projects.remove();
        counter(projectName, projectId, daily_master);
      })
    }

    showProject();

    async function counter(projectName, projectId, daily_master){
    
      let users = await Services.getData(`http://localhost:3001/api/users/${projectName}`);

      daily_master.innerHTML += `<header id="project" class="project_selected">
      <select><option value="none" selected="" disabled="" hidden=""></option>
      <option value="change">Change</option>
      <option value="delete">Delete</option>
      </select>
      <label>${projectName}</label>
      <?xml version="1.0" ?><svg class="feather feather-move" fill="none" height="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><polyline points="5 9 2 12 5 15"/><polyline points="9 5 12 2 15 5"/><polyline points="15 19 12 22 9 19"/><polyline points="19 9 22 12 19 15"/><line x1="2" x2="22" y1="12" y2="12"/><line x1="12" x2="12" y1="2" y2="22"/></svg>
      </header>
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
      
      
      <div id="divListUsers" class="usersStyle hidden">
      <ul>
      </ul>
      </div>
      <div id="calendar" class="calendarStyle hidden"></div>`;

      // dragrable
      const wrapper = document.querySelector("#daily-master"), header = wrapper.querySelector("header");

      function onDrag({movementX, movementY}){
        let getStyle = window.getComputedStyle(wrapper);
        let leftVal = parseInt(getStyle.left);
        let topVal = parseInt(getStyle.top);
        wrapper.style.left = `${leftVal + movementX}px`;
        wrapper.style.top = `${topVal + movementY}px`;
      }

      header.addEventListener("mousedown", ()=>{
        header.classList.add("active");
        header.addEventListener("mousemove", onDrag);
      });

      document.addEventListener("mouseup", ()=>{
        header.classList.remove("active");
        header.removeEventListener("mousemove", onDrag);
      });
      // dragrable

      const selectedProject = document.getElementById('project');

      selectedProject.addEventListener('change', (event) => {
        const optionSelected = event.target.value;

        if( optionSelected === 'change'){
          daily_master.classList.remove('two_colum');
          daily_master.classList.add('one_colum');
          daily_master.remove();
          showProject();
        }

        if(optionSelected === 'delete'){
          daily_master.classList.remove('two_colum');
          daily_master.classList.add('one_colum');
          daily_master.remove();
          deleteProject();
        }

        function deleteProject(){
          fetch(`http://localhost:3001/api/projects/${projectId}`, {
            method: 'DELETE',        
          })
          .then(res => res.json())
          .then(async (data) => {
            if(data.deletedCount){
              showProject();
            }
          })
          .catch(error => console.error('Error:', error));
        }
      })

      const countdown_minutes = document.getElementById('countdown_minutes');
      const countdown_seconds = document.getElementById('countdown_seconds');
      const btn_countdown = document.getElementById('btn_countdown');
      
      const btn_calendar = document.getElementById('btn_calendar');
      const btn_users = document.getElementById('btn_users');
      const btn_create_events = document.getElementById('btn_create_events');
      const divListUsers = document.getElementById('divListUsers');
      const listUsers = divListUsers.querySelector('ul');
      const img_calendar = document.getElementById('img_calendar');
      const btn_add_user = document.getElementById('btn_add_user');
      const inputAdd_user = document.getElementById('add_user');
      let btn_delete = '';

      img_calendar.src = chrome.runtime.getURL("images/calendar.png");
      

      const createListUsers = (users) => {
        listUsers.innerHTML = '';
        for (const user of users) {
          listUsers.innerHTML += `<li>user ${user.name} <button class="btn_delete" id="${user._id}">Delete</button></li>`
        }
        btn_delete = document.querySelectorAll('.btn_delete');

        for (var i=0;i<btn_delete.length;i++) {
          btn_delete[i].onclick=function(event) {
            event.preventDefault();
            deleteUser(event.target.id)
          }
        }
      } 

      function deleteUser(id){
        fetch(`http://localhost:3001/api/users/${id}`, {
          method: 'DELETE',        
        })
        .then(res => res.json())
        .then(async (data) => {
          if(data.deletedCount){
            users = await Services.getData(`http://localhost:3001/api/users/${projectName}`);
            createListUsers(users);
          }
        })
        .catch(error => console.error('Error:', error));
      }
      
      const addUser = async () => {
        const inputValue = inputAdd_user.value;

        if(!inputValue){
          console.log('Escriba el nombre del usuario.')
          return
        }

        const user = {
          "name": inputValue,
          "project": projectName
        };

        try {
          const saveUser = await Services.saveUser(user, projectName)
  
          if(saveUser._id){
            users = await Services.getData(`http://localhost:3001/api/users/${projectName}`);
            createListUsers(users);
            inputAdd_user.value = '';
          }
        } catch (error) {
          console.error('Error:', error)
        }
      }

      function displayUsers() {
        if (divListUsers.classList.contains('hidden')) {
          divListUsers.classList.remove('hidden');
        } else {
          divListUsers.classList.add('hidden');
        }
      }

      if(users){
        createListUsers(users)
      }
      let startingMinutes = 0;

      function difference(dt1, dt2 = new Date()){
        const lastSesion = new Date(dt1)
        Difference_In_Time = dt2.getTime() - lastSesion.getTime();
        return (Difference_In_Time/1000) / 60;
      }

      const lastSesion = sessionStorage.getItem('time');

      if(lastSesion){
        data = JSON.parse(lastSesion);

        if(difference(data.date) < 10){
          startingMinutes = data.time / 60;
        }
      }
      
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
      btn_add_user.addEventListener('click', addUser)
      
      function updateCoutndown() {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        
        countdown_minutes.innerHTML = minutes < 10 ? `0${minutes}` : minutes;
        countdown_seconds.innerHTML = seconds < 10 ? `0${seconds}` : seconds;
      
        time++;
        if(seconds === 0 || seconds === 30){
          const lastSesion = {
            date: new Date(),
            time
          }
          sessionStorage.setItem('time', JSON.stringify(lastSesion));
        }
      }

      let events = await Services.getData(`http://localhost:3001/api/events/${projectName}`);

      btn_calendar.addEventListener('click', () => Calendar.showCalendar(events));
      btn_users.addEventListener('click', displayUsers);
      btn_create_events.addEventListener('click', saveEvents);
      
      async function saveEvents() {
        try {
          const result = await Events.save(users, events, projectName)

          if (await result.modifiedCount) {
            events = await Services.getData(`http://localhost:3001/api/events/${projectName}`);
          }
        } catch (error) {
          console.error('Error:', error)
        }
      }
    }
  }
});