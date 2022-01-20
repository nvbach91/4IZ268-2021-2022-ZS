const taskList = document.querySelector(".taskList");
const newTaskBtn = document.querySelector(".newTaskBtn");
const tasksDiv = document.querySelector(".tasks");
const newTaskDiv = document.querySelector(".newTask");
const addBtn = document.querySelector(".createTaskBtn");
const deleteAllBtn = document.querySelector(".deleteAllBtn");
const sortNameBtn = document.querySelector(".sortNameBtn");
const sortPriorityBtn = document.querySelector(".sortPriorityBtn");
const sortDateBtn = document.querySelector(".sortDateBtn");

const alertDiv = document.querySelector(".alert");
const alertBtn = document.querySelector(".alert span");
const alertText = document.querySelector(".alert p");

const taskName = document.querySelector(".taskName");
const taskDescription = document.querySelector(".taskDescription");
const taskDate = document.querySelector(".taskDate");
const taskTime = document.querySelector(".taskTime");
const taskFrequency = document.querySelector(".taskFrequency");
const taskPriority = document.querySelector(".taskPriority");

const nameBox = document.querySelector('#name');
const descriptionBox = document.querySelector('#description');
const datetimeBox = document.querySelector('#datetime');
const frequencyBox = document.querySelector('#frequency');
const priorityBox = document.querySelector('#priority');
const searchBox = document.querySelector('#search');

clearTaskDescription();
showTasks();

newTaskBtn.onclick = () => {
  newTaskDiv.style.display = 'inherit';
  nameBox.value = '';
  descriptionBox.value = '';
  datetimeBox.value = new Date().toISOString().slice(0, 16);
  frequencyBox.value = 'None';
  priorityBox.value = 'Medium';
  tasksDiv.style.display = 'none';
};

function clearTaskDescription() {
  taskName.textContent = 'Select a task';
  taskDescription.textContent = '';
  taskDate.textContent = '';
  taskTime.textContent = '';
  taskFrequency.textContent = '';
  taskPriority.textContent = '';


  addBtn.onclick = () => {
    if (nameBox.value.trim() == '') {
      nameBox.value = '';
      showAlert('Fill name of the task!');
    } else {
      let createdTask = [{
        name: nameBox.value.trim(),
        description: descriptionBox.value,
        datetime: datetimeBox.value,
        frequency: frequencyBox.value,
        priority: priorityBox.value,
        done: false
      }];
      localStorage.setItem(localStorage.length, JSON.stringify(createdTask));
      showTasks();
      newTaskDiv.style.display = 'none';
      tasksDiv.style.display = 'inherit';
      showAlert('Task has been added to the list!', true);
    }
  };

  sortNameBtn.onclick = () => { showTasks(true, false, false); };
  sortPriorityBtn.onclick = () => { showTasks(false, true, false); };
  sortDateBtn.onclick = () => { showTasks(false, false, true); };

  function showTasks(sortByNames = false, sortByPriority = false, sortByDate = false) {
    let newLiTag = '';
    if (localStorage.length > 0) {
      let myTasks = [];
      for (let i = 0; i < localStorage.length; i++) {
        let getLocalStorageData = localStorage.getItem(i);
        Array.prototype.push.apply(myTasks, JSON.parse(getLocalStorageData));
      }

      if (sortByNames) {
        myTasks.sort(function (a, b) {
          if (a.name < b.name) { return -1; }
          if (a.name > b.name) { return 1; }
          return 0;
        });
      }

      if (sortByPriority) {
        myTasks.sort(function (a, b) {
          //highPriority = 0; mediumPriority = 1; lowPriority = 2;
          let priorityA, priorityB;
          if (a.priority == 'High') priorityA = 0;
          if (a.priority == 'Medium') priorityA = 1;
          if (a.priority == 'Low') priorityA = 2;

          if (b.priority == 'High') priorityB = 0;
          if (b.priority == 'Medium') priorityB = 1;
          if (b.priority == 'Low') priorityB = 2;

          if (priorityA < priorityB) { return -1; }
          if (priorityA > priorityB) { return 1; }
          return 0;
        });
      }


      if (sortByDate) {
        myTasks.sort(function (a, b) {
          return new Date(b.datetime) - new Date(a.datetime);
        });
      }

      myTasks.forEach((element, index) => {
        if (new Date().toISOString().slice(0, 16) >= element.datetime) element.done = true;
        if (element.done) newLiTag += '<li class="disableLi">' + element.name + '<span class="icon" onclick="deleteTask(' + index + ')"><img src="img/trash.png"></span></li>';
        else newLiTag += '<li onclick="viewTask(' + index + ')">' + element.name + '<span class="icon" onclick="deleteTask(' + index + ')"><img src="img/trash.png"></span></li>';
        //newLiTag += `<li onclick="viewTask(${index})">${element.name}<span class="icon" onclick="deleteTask(${index})"><img src="img/trash.png"></span></li>`;
      });
    }
    taskList.innerHTML = newLiTag;
  }

  function clickPress(event) {
    if (event.keyCode == 13) {
      if (searchBox.value.trim() != '') {
        if (localStorage.length > 0) {
          let myTasks = [];
          for (let i = 0; i < localStorage.length; i++) {
            let getLocalStorageData = localStorage.getItem(i);
            Array.prototype.push.apply(myTasks, JSON.parse(getLocalStorageData));
          }
          for (let i = 0; i < myTasks.length; i++) {
            if (myTasks[i].name.includes(searchBox.value.trim())) {
              //`Hodnota byla nalezena! Myslíte Task ${myTasks[i].name} - Priorita: ${myTasks[i].priority}?`;
              showAlert('Searched value found! Do you meen task with name: ' + myTasks[i].name + ' and priorit: ' + myTasks[i].priority + '?', true);
            } else {
              searchBox.value = '';
              showAlert('Searched value was not found.');
            }
          }
        } else {
          searchBox.value = '';
          showAlert('There is no list of tasks where I can search. Please, create new task first.');
        }
      } else {
        searchBox.value = '';
        showAlert('Search field is required.');
      }
    }
  };

  function deleteTask(index) {
    if (localStorage.getItem(index + 1) == null) {
      localStorage.removeItem(index);
    } else {
      let i = index;
      while (localStorage.getItem(i + 1) != null) {
        localStorage.setItem(i, localStorage.getItem(i + 1));
        localStorage.removeItem(i + 1);
        i++;
      }
    }
    showAlert('The task has been deleted from the list.', true);
    clearTaskDescription();
    showTasks();
  }

  function viewTask(index) {
    if (localStorage.length > 0) {
      if (localStorage.getItem(index) != null) {
        let getLocalStorageData = localStorage.getItem(index);
        let myTasks = JSON.parse(getLocalStorageData);
        myTasks.forEach((element) => {
          if (new Date().toISOString().slice(0, 16) >= element.datetime) {
            //showAlert('This task is already done.');
            showTasks();
          } else {
            taskName.textContent = element.name;
            taskDescription.textContent = element.description;

            let year = element.datetime.slice(0, 4);
            let month = element.datetime.slice(5, 7);
            let day = element.datetime.slice(8, 10);
            let hour = element.datetime.slice(11, 13);
            let minutes = element.datetime.slice(14, 16);

            taskDate.textContent = day + '.' + month + '.' + year; //`${day}.${month}.${year}`;
            taskTime.textContent = hour + ':' + minutes;
            taskFrequency.textContent = element.frequency;
            taskPriority.textContent = element.priority;
          }
        });
      }
    }
  }

  deleteAllBtn.onclick = () => {
    if (localStorage.length == 0) {
      showAlert('There are no more tasks.');
    } else {
      localStorage.clear();
      clearTaskDescription();
      showTasks();
      showAlert('All tasks have been deleted.', true);
    }
  };

  function showAlert(text, greenColor = false) {
    alertText.textContent = text;
    if (greenColor) alertDiv.style.backgroundColor = '#5DAE8B';
    else alertDiv.style.backgroundColor = '#DD0A35';
    alertDiv.style.opacity = '1';
    alertDiv.style.display = 'inherit';
    scroll(0, 0);
    setTimeout(function () { alertDiv.style.opacity = '0'; alertDiv.style.display = 'none'; }, 3000);
  }

  alertBtn.onclick = () => {
    alertDiv.style.opacity = '0';
    alertDiv.style.display = 'none';
  };
}