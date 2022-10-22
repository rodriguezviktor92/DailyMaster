const Calendar = (function(){
  let calendarShow = false;

  const create = function(events = [], calendarEl){
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

  const showCalendar = function(events){
  const calendarEl = document.getElementById('calendar');

    const calendar = create(events[0].events, calendarEl);
    if(!calendarShow){
      calendarEl.classList.remove("hidden");
      calendarShow=true
      calendar.render();
      return
    }
  
    calendarEl.classList.add("hidden");
    calendarShow=false;
  }
  
  return {
    showCalendar: showCalendar
  }
}({}))