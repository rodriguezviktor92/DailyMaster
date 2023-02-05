const Services = (function () {
  const getData = async function getData(url) {
    try {
      const response = await fetch(url, { method: 'GET' });
      return await response.json();      
    } catch (error) {
      return []
    }
  }

  const saveUser = async function saveUSer(user) {
    try {
      const response = await fetch('https://dailymaster.onrender.com/api/users', {
        method: 'POST',
        body: JSON.stringify(user),
        headers:{
          'Content-Type': 'application/json'
        }
      });
      return await response.json();
    } catch (error) {
      return []
    }
  }

  const deleteUser = async function deleteUser(userId) {
    try {
      const response = await fetch(`https://dailymaster.onrender.com/api/users/${userId}`, {
        method: 'DELETE',
      });
      return await response.json();
    } catch (error) {
      return []
    }
  }

  return {
    getData, saveUser
  }
}({}))