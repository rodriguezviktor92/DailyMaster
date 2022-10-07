var Events = (function() {
  var create = function(users) {
    if(!users.length){
      return []
    }

    function getDaysInMonth(year, month) {
      return new Date(year, month, 0).getDate();
    }
    
    const date = new Date();
    const day = date.getDate();
    const currentMonth = String(date.getMonth() + 1).padStart(2, '0');
    const currentYear = date.getFullYear();
    
    // �️ Current Month
    const daysInCurrentMonth = getDaysInMonth(currentYear, currentMonth);
    
    const events = [];
    let counter = 0;
    
    const getUser = (users) => {
      if(counter === users.length) counter = 0
      const user = users[counter].name;
      counter++;
      return user
    }
    
    for (let i = day; i <= daysInCurrentMonth; i++) {
      const day = i < 10 ? `0${i}` : i;
      const dayOfWeek = new Date(`${currentMonth}-${day}-${currentYear}`).getDay();
      const SUNDAY = 0;
      const SATURDAY = 6;

      if(dayOfWeek !== SUNDAY && dayOfWeek !== SATURDAY){
        const event = {title: getUser(users), start: `${currentYear}-${currentMonth}-${day}`};
        events.push(event);
      }
    }
    return events;
  }
  
  return {
    create: create
  }
}({}))