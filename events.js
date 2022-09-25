var Events = (function() {
  var create = function(users) {
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
    
    const getUser = () => {
      if(counter === users.length) counter = 0
      const user = users[counter];
      counter++;
      return user
    }
    
    for (let i = day; i <= daysInCurrentMonth; i++) {
      const event = {title: getUser(), start: `${currentYear}-${currentMonth}-${i}`};
      events.push(event);
    }
    return events;
  }
  
  return {
    create: create
  }
}({}))