onload = function () {

    // verificamos que el navegador soporte Web Storage
    if ('localStorage' in window && window['localStorage'] !== null) {
        showTask();
    } else {
        alert('localStorage is not supported in de browser');
    }
}

function saveTask() {
  // getting de task from the imput
  var task = document.getElementById("taskInput").value;
  
  // checking the empty inmputs
  if (task == "") {
    alert("Please, enter a valid task");
    return false;
  }

  // getting the tasklist from localStorage
  var storage = JSON.parse(localStorage.getItem('Tasklist'));

  // getting the number of elements
  //var numElements = storage.length;

  // storing a new task
  storage.push(task);

  try {
    localStorage.setItem('Tasklist', JSON.stringify(storage));
  } catch (e) {
    if (e == QUOTA_EXCEEDED_ERR) {
      alert('The storage is full');
    }
  }
  task.value = "";
  // show all existing tasks
  showTask();
  clrearInput();
  return false;
}

function clrearInput() {
    var task = document.getElementById("taskInput");
    task.value = '';
}

function showTask() {
  
  // getting the taslist from localStorage
  var storage = JSON.parse(localStorage.getItem('Tasklist'));
  
  // in case of the list not exist, create it
  if (!storage) {
    storage = [];

    try {
      localStorage.setItem('Tasklist', JSON.stringify(storage));
    } catch (e) {
      if (e == QUOTA_EXCEEDED_ERR) {
        alert('The storage is full');
      }
    }
  }

  // getting the element that contains the actual list
  var list = document.getElementById("list");
  list.innerHTML = "";

  // charging all notes
  for (var i = 0; i < storage.length; i++) {
    var newTask = document.createElement("li"),
        link = document.createElement("a"),
        content = document.createTextNode(storage[i]);
    link.appendChild(content);
    link.setAttribute("href", "#");
    link.setAttribute("id", i);
    link.className = "collection-item";
    link.setAttribute("onclick", "removeTask(" + i + ")");
    newTask.appendChild(link);
    list.appendChild(newTask);
  }
  return false;
}

function removeTask(itemId) {
  // getting the tasklist
  var storage = JSON.parse(localStorage.getItem('Tasklist'));
  var list = document.getElementById("list");
  
  if(confirm("Are you sure?")==false){
    return false;
  }
  // removing the task
  storage.splice(itemId, 1);
  list.removeChild(document.getElementById(itemId).parentNode);

  //saving the storage again
  try {
    localStorage.setItem('Tasklist', JSON.stringify(storage));
  } catch (e) {
    if (e == QUOTA_EXCEEDED_ERR) {
      alert('The storage is full');
    }
  }

  showTask();
}