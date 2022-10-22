const Events = (function() {
  const create = function(users) {
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
      
  async function save(users, events) {
    const eventsId = events[0]._id;
    events = create(users);
    
    try {      
      const result = await fetch(`http://localhost:3001/api/events/${eventsId}`, {
        method: 'PUT',
        body: JSON.stringify(events),
        headers:{
          'Content-Type': 'application/json'
        }
      });

      return await result.json()
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return {
    save
  }
}({}))