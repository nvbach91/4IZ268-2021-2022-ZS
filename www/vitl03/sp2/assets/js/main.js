const createTaskForm = document.querySelector("#new-task-form");
const createTaskField = document.querySelector("#new-task-input");
const dateTaskField = document.querySelector("#new-task-date");
const createTaskButton = document.querySelector(".add-btn");
const authorName = document.querySelector("#author-name");

const listsSelect = document.querySelector("#lists-select");
const taskListElement = document.querySelector("#tasks");
const hrefActive = document.querySelectorAll(".nav-href");
const linkActive = document.querySelectorAll(".nav-link");
const taskList = document.querySelector(".task-list");

const dateBox = document.querySelector(".date");
const CALENDAR_ID = "primary";
const isInCalendar = false;
const calendarBoxElement = document.querySelector("#calendar-big");

const svgDisplayElement = document.querySelector(".svg-display");
const focusPointsElement = document.querySelector("#focus-points");

const calendarClickElement = document.querySelector("#calendar-click");
const focusModeClickElement = document.querySelector("#focus-mode-click");
const calendarElement = document.querySelector("#calendar");
const focusModeElement = document.querySelector("#focus-mode");

const taskSectionElement = document.querySelector("#task-section");
const listSectionElement = document.querySelector("#list-section");
const calendarSectionElement = document.querySelector("#calendar-section");
const taskToggleElement = document.querySelector("#task-toggle");
const listToggleElement = document.querySelector("#list-toggle");
const calendarToggleElement = document.querySelector("#calendar-toggle");

const createListForm = document.querySelector("#new-list-form");
const createListField = document.querySelector("#new-list-input");
const createThemeField = document.querySelector("#new-list-theme-input");
const createListButton = document.querySelector(".add-btn");

const listElement = document.querySelector("#lists");
const listsList = document.querySelector(".lists-list");
const arrayListValues = [];

// tasks loading
const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
console.log(tasks);

// lists loading
const lists = JSON.parse(localStorage.getItem("lists")) || [];
console.log(lists);

// score loading
let score = JSON.parse(localStorage.getItem("score")) || 0;

// current date
let date = new Date();

// link click
hrefActive.forEach((l) => l.addEventListener("click", colorLink));
linkActive.forEach((l) => l.addEventListener("click", activeLink));

// spinner
const showSpinner = () => {
  const spinner = document.createElement("div");
  spinner.classList.add("spinner");
  const divElement = document.querySelector("#section-events");
  divElement.appendChild(spinner);
  return spinner;
};

// Tabs Calendar and Focus mode
loadTabs();

// themes loading
const listSelectFieldThemes = document.createElement("select");
const selectedOptionField1 = document.createElement("option");
const selectedOptionField2 = document.createElement("option");
const selectedOptionField3 = document.createElement("option");
const selectedOptionField4 = document.createElement("option");
loadThemes(
  listSelectFieldThemes,
  selectedOptionField1,
  selectedOptionField2,
  selectedOptionField3,
  selectedOptionField4
);

// settings for calendar
// date from the input field
date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
dateTaskField.value = date.toISOString().slice(0, -8);

dateTaskField.min = date.toISOString().slice(0, -8);

// format points
if (score === 1) {
  focusPointsElement.innerHTML = score + " point";
} else {
  focusPointsElement.innerHTML = score + " points";
}

// load lists
const listSelectFieldList = document.createElement("select");
listSelectFieldList.name = "potencial-lists";
listSelectFieldList.id = "potencial-lists";
listSelectFieldList.classList.add("custom-select", "sources");
loadLists(listSelectFieldList, lists);

// show select box options
showOptionsLists();
showOptionsTasks();

// Doughnut chart
const ctx = document.getElementById("myChart");

let completedTasks = 0;
let notCompletedTasks = 0;

tasks.forEach((task) => {
  if (task.checked === true) {
    completedTasks = completedTasks + 1;
  } else {
    notCompletedTasks = notCompletedTasks + 1;
  }
});

const myChart = new Chart(ctx, {
  type: "doughnut",
  data: {
    labels: ["Finished", "To do"],
    datasets: [
      {
        data: [0, 0],
        backgroundColor: ["rgb(0, 205, 86)", "rgb(255, 99, 132)"],
        hoverOffset: 4,
      },
    ],
  },
  options: {
    legend: {
      display: false,
    },
    plugins: {
      datalabels: {
        display: true,
        formatter: (val, ctx) => {
          return ctx.chart.data.labels[ctx.dataIndex];
        },
        color: "#fff",
        backgroundColor: "#404040",
      },
    },
  },
});

myChart.data.datasets[0].data[0] = completedTasks;
myChart.data.datasets[0].data[1] = notCompletedTasks;
myChart.update();

//Task list
tasks.forEach((data) => {
  onCreateTask({ data });
});

//Lists list
lists.forEach((data) => {
  onCreateList({ data });
});

// List filter
let valueOption = "";
$(".custom-option").on("click", function () {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  valueOption =
    listSelectFieldList.options[listSelectFieldList.selectedIndex].value;

  const tasksDocument = document.querySelectorAll(".task-input");

  tasksDocument.forEach((taskDocument) => {
    tasks.forEach((task) => {
      if (task.value === taskDocument.innerHTML) {
        if (valueOption === "All") {
          taskDocument.parentElement.parentElement.style.display = "flex";
        } else {
          if (task.list === valueOption) {
            taskDocument.parentElement.parentElement.style.display = "flex";
          } else {
            taskDocument.parentElement.parentElement.style.display = "none";
          }
        }
      }
    });
  });
});

// Create a new task
createTaskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const value = createTaskField.value;
  const dateEnd = new Date(dateTaskField.value);
  const description = "";
  const list = listSelectFieldList.value;

  if (value) {
    const data = {
      value,
      checked: false,
      dateEnd: dateEnd,
      description: description,
      isInCalendar: false,
      list,
    };

    storageCreate(data);
    onCreateTask({ data });
    updateListCount(data, "add");

    if (gapi.auth2.getAuthInstance().isSignedIn.get()) {
      const dateEndWithoutSeconds = WithoutSeconds(dateEnd);
      const dateWithoutSeconds = WithoutSeconds(date);

      if (dateEndWithoutSeconds.getTime() !== dateWithoutSeconds.getTime()) {
        makeNewEvent(data);
        data.isInCalendar = true;
      }
    }

    createTaskForm.reset();
    dateTaskField.value = date.toISOString().slice(0, -8);
  }
});

// Create a new list
createListForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = createListField.value;
  let numberOfTasks = 0;

  tasks.forEach((task) => {
    if (task.list === name) {
      numberOfTasks += 1;
    }
  });

  const theme = listSelectFieldThemes.value;

  if (name) {
    const data = {
      name,
      numberOfTasks,
      theme,
    };
    storageListCreate(data);
    onCreateList({ data });
    createListForm.reset();
  }
});

function onCreateTask({ data }) {
  const taskElement = document.createElement("div");
  taskElement.classList.add("task");
  taskElement.classList.add("row");

  const checkboxElement = document.createElement("input");
  checkboxElement.type = "checkbox";
  checkboxElement.checked = data.checked;
  checkboxElement.classList.add("checkbox");
  checkboxElement.classList.add("col-md-2");
  taskElement.appendChild(checkboxElement);

  if (checkboxElement.checked === true) {
    taskElement.classList.add("checked");
  }

  if (checkboxElement.checked === false) {
    taskElement.classList.remove("checked");
  }

  const inputElementBox = document.createElement("div");
  inputElementBox.classList.add("col-md-6");

  const inputElement = document.createElement("p");
  inputElement.contentEditable = true;
  inputElement.classList.add("task-input");
  inputElement.innerHTML = data.value;
  inputElement.id = data.token;

  const taskDescriptionInputElement = document.createElement("p");
  taskDescriptionInputElement.contentEditable = true;
  taskDescriptionInputElement.classList.add("task-input-description");
  taskDescriptionInputElement.innerHTML = data.description;
  taskDescriptionInputElement.id = data.token;

  inputElementBox.append(inputElement, taskDescriptionInputElement);

  const taskIconElementBox = document.createElement("div");
  taskIconElementBox.classList.add("col-md-4");
  taskIconElementBox.classList.add("row");

  const taskDescriptionElement = document.createElement("button");
  taskDescriptionElement.title = "Description";
  taskDescriptionElement.classList.add("description");
  taskDescriptionElement.classList.add("col-md-6");
  taskDescriptionElement.innerHTML = "<i class='fas fa-book'></i>";

  const taskDeleteElement = document.createElement("button");
  taskDeleteElement.title = "Delete item";
  taskDeleteElement.id = data.token;

  taskDeleteElement.classList.add("delete");
  taskDeleteElement.classList.add("col-md-6");
  taskDeleteElement.innerHTML = "<i class='fa fa-thin fa-trash'></i>";

  taskIconElementBox.append(taskDescriptionElement, taskDeleteElement);

  taskElement.append(checkboxElement, inputElementBox, taskIconElementBox);

  taskListElement.appendChild(taskElement);

  inputElement.addEventListener("input", () => {
    data.value = inputElement.innerHTML;
    storageUpdate(data);
  });

  taskDescriptionInputElement.addEventListener("input", () => {
    data.description = taskDescriptionInputElement.innerHTML;
    storageUpdate(data);
  });

  taskDeleteElement.addEventListener("click", (e) => {
    if (gapi.auth2.getAuthInstance().isSignedIn.get()) {
      deleteEvent(data.token);
    }
    updateListCount(data, "remove");
    storageDelete(data);
    taskElement.remove();
  });

  taskListElement.appendChild(taskElement);

  checkboxElement.addEventListener("input", function () {
    data.checked = checkboxElement.checked;
    toggleTaskStatus({ checked: data.checked, taskElement });
    storageUpdate(data);
  });

  taskDescriptionElement.addEventListener("click", () => {
    taskDescriptionInputElement.classList.add("task-input-description-show");
    taskDescriptionInputElement.focus();

    if (taskDescriptionInputElement.innerHTML !== "") {
      taskDescriptionInputElement.classList.add("task-input-description-show");
      taskDescriptionElement.classList.add("description-icon-hide");
    }
  });

  taskDescriptionInputElement.addEventListener("input", () => {
    if (taskDescriptionInputElement.innerHTML !== "") {
      taskDescriptionInputElement.classList.add("task-input-description-show");
      taskDescriptionElement.classList.add("description-icon-hide");
    }
  });

  if (taskDescriptionInputElement.innerHTML !== "") {
    taskDescriptionElement.classList.add("description-icon-hide");
    taskDescriptionInputElement.classList.add("task-input-description-show");
  }
}

function onCreateList({ data }) {
  const columnElement = document.createElement("div");
  columnElement.classList.add("col-md-6", "mt-4", "col-sm-6", "column-list");

  const cardElement = document.createElement("div");
  cardElement.classList.add("card", data.theme);

  const cardWrapperElement = document.createElement("div");
  cardWrapperElement.classList.add("card-statistic-3", "p-4", "card-wrapper");

  columnElement.appendChild(cardElement);
  cardElement.appendChild(cardWrapperElement);

  const cardTitleElement = document.createElement("div");
  cardTitleElement.classList.add("mb-4");

  const titleElement = document.createElement("h2");
  titleElement.classList.add("card-title", "mb-0");
  titleElement.contentEditable = true;
  titleElement.classList.add("task-input");
  titleElement.innerHTML = data.name;
  titleElement.id = data.token;

  cardTitleElement.appendChild(titleElement);

  const cardBodyElement = document.createElement("div");
  cardBodyElement.classList.add(
    "row",
    "align-items-center",
    "mb-2",
    "d-flex",
    "px-2"
  );

  const cardNumberElement = document.createElement("div");
  cardNumberElement.classList.add("col-md-8");

  const numberElement = document.createElement("h3");
  numberElement.classList.add("number");
  numberElement.id = data.token;
  if (data.numberOfTasks === 1) {
    numberElement.innerHTML = data.numberOfTasks + " task";
  } else {
    numberElement.innerHTML = data.numberOfTasks + " tasks";
  }

  numberElement.classList.add("d-flex", "align-items-center", "mb-0");

  cardNumberElement.appendChild(numberElement);

  const cardDeleteElement = document.createElement("div");
  cardDeleteElement.classList.add("col-md-4", "icon-delete-big");

  const deleteElement = document.createElement("button");
  deleteElement.title = "Delete list";
  deleteElement.id = data.token;
  deleteElement.classList.add("col-md-6");
  deleteElement.innerHTML = "<i class='fa fa-thin fa-trash'></i>";

  cardDeleteElement.appendChild(deleteElement);
  cardBodyElement.append(cardNumberElement, cardDeleteElement);

  cardWrapperElement.append(cardTitleElement, cardBodyElement);

  titleElement.addEventListener("input", () => {
    data.name = titleElement.innerHTML;
    storageListUpdate(data);
  });

  deleteElement.addEventListener("click", (e) => {
    storageListDelete(data);
    columnElement.remove();
  });

  listElement.appendChild(columnElement);
}

function toggleTaskStatus({ checked, taskElement }) {
  taskElement.classList[checked ? "add" : "remove"]("checked");
}

function storageCreate(data) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  data.token = getToken();
  tasks.push(data);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  updateGraph();
}

function storageUpdate(data) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  let index = getIndexByToken(data.token);

  if (index !== -1) {
    tasks[index] = data;

    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
  updateGraph();
}

// delete item from storage and list
function storageDelete(data) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  let index = getIndexByToken(data.token);

  if (index !== -1) {
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
  updateGraph();
}

// get index
function getIndexByToken(token) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].token === token) {
      return i;
    }
  }
  return -1;
}

// get index
function getIndexByTokenList(token) {
  const lists = JSON.parse(localStorage.getItem("lists")) || [];

  for (let i = 0; i < lists.length; i++) {
    if (lists[i].token === token) {
      return i;
    }
  }
  return -1;
}

function getToken() {
  const token = getRandomString(10);
  return token;
}

function getRandomString(length) {
  var randomChars = "abcdefghijklmnopqrstuv0123456789";
  var result = "";
  for (var i = 0; i < length; i++) {
    result += randomChars.charAt(
      Math.floor(Math.random() * randomChars.length)
    );
  }
  return result;
}

function updateGraph() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  let completedTasksNew = 0;
  let notCompletedTasksNew = 0;

  tasks.forEach((task) => {
    if (task.checked === true) {
      completedTasksNew = completedTasksNew + 1;
    } else {
      notCompletedTasksNew = notCompletedTasksNew + 1;
    }
  });

  myChart.data.datasets[0].data[0] = completedTasksNew;
  myChart.data.datasets[0].data[1] = notCompletedTasksNew;
  myChart.update();
}

function colorLink() {
  if (hrefActive) {
    hrefActive.forEach((l) => l.classList.remove("active-link"));
    this.classList.add("active-link");
  }
}

function activeLink() {
  if (linkActive) {
    linkActive.forEach((l) => l.classList.remove("active"));
    this.classList.add("active");
  }
}

// Calendar
function makeNewEvent(data) {
  var form = collectFormData(data);
  var event = formatEvent(form.id, form.startDate, form.endDate, form.summary);
  addEvent(event);
}

function collectFormData(data) {
  return {
    id: data.token,
    startDate: date.toISOString(),
    endDate: data.dateEnd,
    summary: data.value,
  };
}

function formatEvent(id, start, end, summary) {
  return {
    id: id,
    start: {
      dateTime: start,
    },
    end: {
      dateTime: end,
    },
    summary: summary,
  };
}

function addEvent(event) {
  var request = gapi.client.calendar.events.insert({
    calendarId: CALENDAR_ID,
    resource: event,
  });

  request.execute(function () {
    listUpcomingEvents();
  });
}

function deleteEvent(eventId) {
  var request = gapi.client.calendar.events.delete({
    calendarId: CALENDAR_ID,
    eventId: eventId,
  });

  request.execute(function () {
    listUpcomingEvents();
  });
}

function storageListCreate(data) {
  const lists = JSON.parse(localStorage.getItem("lists")) || [];
  data.token = getToken();
  lists.push(data);

  loadLists(listSelectFieldList, lists);

  localStorage.setItem("lists", JSON.stringify(lists));
}

function storageListUpdate(data) {
  const lists = JSON.parse(localStorage.getItem("lists")) || [];
  let index = getIndexByTokenList(data.token);

  if (index !== -1) {
    lists[index] = data;

    localStorage.setItem("lists", JSON.stringify(lists));
  }
}

// delete item from storage and list
function storageListDelete(data) {
  const lists = JSON.parse(localStorage.getItem("lists")) || [];

  let index = getIndexByTokenList(data.token);

  if (index !== -1) {
    lists.splice(index, 1);

    localStorage.setItem("lists", JSON.stringify(lists));
  }

  loadListsDelete(listSelectFieldList, lists);
}

function WithoutSeconds(dateTime) {
  var date = new Date(dateTime.getTime());
  date.setHours(dateTime.getHours(), dateTime.getMinutes(), 0, 0);
  return date;
}

function updateListCount(data, action) {
  const lists = JSON.parse(localStorage.getItem("lists")) || [];

  lists.forEach((list) => {
    if (list.name === data.list) {
      if (action === "add") {
        list.numberOfTasks = list.numberOfTasks + 1;
        $("#" + list.token + ".number").html(list.numberOfTasks + " tasks");
      }

      if (action === "remove") {
        list.numberOfTasks = list.numberOfTasks - 1;
        $("#" + list.token + ".number").html(list.numberOfTasks + " tasks");
      }

      let index = getIndexByTokenList(list.token);

      if (index !== -1) {
        lists[index] = list;

        localStorage.setItem("lists", JSON.stringify(lists));
      }
    }
  });
}

function loadLists(listSelectFieldList, localLists) {
  if (arrayListValues.length === 0) {
    const selectedOptionField = document.createElement("option");
    selectedOptionField.selected = true;
    selectedOptionField.innerHTML = "All lists";
    selectedOptionField.value = "All";

    listSelectFieldList.appendChild(selectedOptionField);
    listsSelect.appendChild(listSelectFieldList);

    localLists.forEach((list) => {
      const listOptionField = document.createElement("option");
      listOptionField.innerHTML = list.name;
      listOptionField.value = list.name;
      listSelectFieldList.appendChild(listOptionField);
      listsSelect.appendChild(listSelectFieldList);
    });

    $("#potencial-lists option").each(function () {
      var thisOptionValue = $(this).val();
      arrayListValues.push(thisOptionValue);
    });
  } else {
    const localListNames = [];
    localLists.forEach((localList) => {
      localListNames.push(localList.name);
    });

    let unique1 = localListNames.filter(
      (o) => arrayListValues.indexOf(o) === -1
    );
    let unique2 = arrayListValues.filter(
      (o) => localListNames.indexOf(o) === -1
    );

    let uniqueValues = unique1.concat(unique2);
    uniqueValues = uniqueValues.filter((e) => e !== "All");

    uniqueValues.forEach((uniqueValue) => {
      const listOptionField = document.createElement("option");
      listOptionField.innerHTML = uniqueValue;
      listOptionField.value = uniqueValue;
      listSelectFieldList.appendChild(listOptionField);
      arrayListValues.push(uniqueValue);
      addOptionTask(uniqueValue);
    });

    // List filter
    let valueOption = "";
    $(".custom-option").on("click", function () {
      const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      valueOption =
        listSelectFieldList.options[listSelectFieldList.selectedIndex].value;

      const tasksDocument = document.querySelectorAll(".task-input");

      tasksDocument.forEach((taskDocument) => {
        tasks.forEach((task) => {
          if (task.value === taskDocument.innerHTML) {
            if (valueOption === "All") {
              taskDocument.parentElement.parentElement.style.display = "flex";
            } else {
              if (task.list === valueOption) {
                taskDocument.parentElement.parentElement.style.display = "flex";
              } else {
                taskDocument.parentElement.parentElement.style.display = "none";
              }
            }
          }
        });
      });
    });
  }
}

function loadListsDelete(listSelectFieldList, localLists) {
  const localListNames = [];
  localLists.forEach((localList) => {
    localListNames.push(localList.name);
  });

  let uniqueDelete1 = localListNames.filter(
    (o) => arrayListValues.indexOf(o) === -1
  );
  let uniqueDelete2 = arrayListValues.filter(
    (o) => localListNames.indexOf(o) === -1
  );

  let uniqueDeleteValues = uniqueDelete1.concat(uniqueDelete2);
  uniqueDeleteValues = uniqueDeleteValues.filter((e) => e !== "All");

  uniqueDeleteValues.forEach((uniqueDeleteValue) => {
    var uniqueIndex = arrayListValues.indexOf(uniqueDeleteValue);
    arrayListValues.splice(uniqueIndex, 1);
    deleteOptionTask(uniqueDeleteValue);
  });

  // List filter
  let valueDeleteOption = "";
  $(".custom-option").on("click", function () {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    valueDeleteOption =
      listSelectFieldList.options[listSelectFieldList.selectedIndex].value;

    const tasksDocument = document.querySelectorAll(".task-input");

    tasksDocument.forEach((taskDocument) => {
      tasks.forEach((task) => {
        if (task.value === taskDocument.innerHTML) {
          if (valueDeleteOption === "All") {
            taskDocument.parentElement.parentElement.style.display = "flex";
          } else {
            if (task.list === valueDeleteOption) {
              taskDocument.parentElement.parentElement.style.display = "flex";
            } else {
              taskDocument.parentElement.parentElement.style.display = "none";
            }
          }
        }
      });
    });
  });
}

function loadThemes(
  listSelectFieldThemes,
  selectedOptionField1,
  selectedOptionField2,
  selectedOptionField3,
  selectedOptionField4
) {
  listSelectFieldThemes.name = "potencial";
  listSelectFieldThemes.id = "potencial";
  listSelectFieldThemes.classList.add("custom-select-list", "sources");

  selectedOptionField1.selected = true;
  selectedOptionField1.innerHTML = "Pink theme";
  selectedOptionField1.value = "l-bg-cherry";
  selectedOptionField1.classList.remove(
    "custom-option",
    "hover-class-1",
    "hover-class-2",
    "hover-class-3",
    "hover-class-4"
  );
  selectedOptionField1.classList.add("hover-class-1");

  selectedOptionField2.innerHTML = "Blue theme";
  selectedOptionField2.value = "l-bg-blue-dark";
  selectedOptionField2.classList.remove(
    "custom-option",
    "hover-class-1",
    "hover-class-2",
    "hover-class-3",
    "hover-class-4"
  );
  selectedOptionField2.classList.add("hover-class-2");

  selectedOptionField3.innerHTML = "Green theme";
  selectedOptionField3.value = "l-bg-green-dark";
  selectedOptionField3.classList.remove(
    "custom-option",
    "hover-class-1",
    "hover-class-2",
    "hover-class-3",
    "hover-class-4"
  );
  selectedOptionField3.classList.add("hover-class-3");

  selectedOptionField4.innerHTML = "Orange theme";
  selectedOptionField4.value = "l-bg-orange-dark";
  selectedOptionField4.classList.remove(
    "custom-option",
    "hover-class-1",
    "hover-class-2",
    "hover-class-3",
    "hover-class-4"
  );
  selectedOptionField4.classList.add("hover-class-4");

  listSelectFieldThemes.append(
    selectedOptionField1,
    selectedOptionField2,
    selectedOptionField3,
    selectedOptionField4
  );
  createThemeField.appendChild(listSelectFieldThemes);
}

function loadTabs() {
  calendarClickElement.addEventListener("click", () => {
    focusModeElement.classList.add("d-block");
    focusModeElement.classList.add("d-none");
    calendarElement.classList.remove("d-none");
    calendarElement.classList.add("d-block");
  });

  focusModeClickElement.addEventListener("click", () => {
    calendarElement.classList.remove("d-block");
    calendarElement.classList.add("d-none");
    focusModeElement.classList.remove("d-none");
    focusModeElement.classList.add("d-block");
  });

  // Tabs tasks and lists
  taskToggleElement.addEventListener("click", () => {
    taskSectionElement.classList.remove("d-none");
    listSectionElement.classList.remove("d-block");
    calendarSectionElement.classList.remove("d-block");

    taskSectionElement.classList.add("d-block");
    listSectionElement.classList.add("d-none");
    calendarSectionElement.classList.add("d-none");
  });

  listToggleElement.addEventListener("click", () => {
    listSectionElement.classList.remove("d-none");
    taskSectionElement.classList.remove("d-block");
    calendarSectionElement.classList.remove("d-block");

    listSectionElement.classList.add("d-block");
    taskSectionElement.classList.add("d-none");
    calendarSectionElement.classList.add("d-none");
  });

  calendarToggleElement.addEventListener("click", () => {
    calendarSectionElement.classList.remove("d-none");
    taskSectionElement.classList.remove("d-block");
    listSectionElement.classList.remove("d-block");

    calendarSectionElement.classList.add("d-block");
    taskSectionElement.classList.add("d-none");
    listSectionElement.classList.add("d-none");
  });
}

// Focus mode timer // Credit base timer: Mateusz Rybczonec
class Timer {
  constructor(root) {
    root.innerHTML = Timer.getHTML();

    this.el = {
      minutes: root.querySelector(".timer-part-minutes"),
      seconds: root.querySelector(".timer-part-seconds"),
      control: root.querySelector(".timer-btn-control"),
      reset: root.querySelector(".timer-btn-reset"),
    };

    this.interval = null;
    this.remainingSeconds = 0;
    this.minutes = 0;

    this.el.control.addEventListener("click", () => {
      if (this.interval === null) {
        this.start();
      } else {
        this.stop();
      }
    });

    this.el.reset.addEventListener("click", () => {
      const inputMinutes = prompt("Enter number of minutes:");

      if (inputMinutes < 60) {
        clearInterval(this.interval);
        this.interval = null;
        this.updateInterfaceControls();

        svgDisplayElement.classList.remove("d-block");
        svgDisplayElement.classList.add("d-none");

        this.remainingSeconds = inputMinutes * 60;
        this.minutes = inputMinutes;
        this.updateInterfaceTime();
      }
    });
  }

  updateInterfaceTime() {
    const minutes = Math.floor(this.remainingSeconds / 60);
    const seconds = this.remainingSeconds % 60;

    this.el.minutes.textContent = minutes.toString().padStart(2, "0");
    this.el.seconds.textContent = seconds.toString().padStart(2, "0");
  }

  updateInterfaceControls() {
    if (this.interval === null) {
      this.el.control.innerHTML = `<span class="material-icons">play_arrow</span>`;
      this.el.control.classList.add("timer-btn-start");
      this.el.control.classList.remove("timer-btn-stop");
    } else {
      this.el.control.innerHTML = `<span class="material-icons">stop</span>`;
      this.el.control.classList.add("timer-btn-stop");
      this.el.control.classList.remove("timer-btn-start");
    }
  }

  start() {
    if (this.remainingSeconds === 0) return;

    if (svgDisplayElement) {
      svgDisplayElement.classList.remove("d-none");
      svgDisplayElement.classList.add("d-block");
    }

    const minutes = this.minutes;
    const remainingSeconds = this.remainingSeconds;
    const controlButton = this.el.control;

    var duration1 = 20 * minutes;
    var duration2 = 30 * minutes;
    var duration3 = 40 * minutes;
    var delay1 = 0;
    var delay2 = 10 * minutes;
    var delay3 = 20 * minutes;

    // growing plant
    var drawMainStem = function () {
      var paths = document.querySelectorAll(".main-stem");
      for (var i = 0; i < paths.length; i++) {
        var path = paths[i];
        var length = path.getTotalLength();
        path.style.transition = path.style.WebkitTransition = "none";
        path.style.strokeDasharray = length + " " + length;
        path.style.strokeDashoffset = length;
        path.getBoundingClientRect();
        path.style.transition = path.style.WebkitTransition =
          "stroke-dashoffset " + duration1 + "s 0s ease-in-out";
        path.style.strokeDashoffset = "0";
      }
    };

    var drawStems = function () {
      var paths = document.querySelectorAll(".outer-stems");
      for (var i = 0; i < paths.length; i++) {
        var path = paths[i];
        var length = path.getTotalLength();
        path.style.transition = path.style.WebkitTransition = "none";
        path.style.strokeDasharray = length + " " + length;
        path.style.strokeDashoffset = length;
        path.getBoundingClientRect();
        path.style.transition = path.style.WebkitTransition =
          "stroke-dashoffset " + duration2 + "s " + delay2 + "s ease-in-out";
        path.style.strokeDashoffset = "0";
      }
    };

    var drawLeaves = function () {
      var paths = document.querySelectorAll(".leaves path");
      for (var i = 0; i < paths.length; i++) {
        var path = paths[i];
        var length = path.getTotalLength();
        path.style.transition = path.style.WebkitTransition = "none";
        path.style.strokeDasharray = length + " " + length;
        path.style.strokeDashoffset = length;
        path.getBoundingClientRect();
        path.style.transition = path.style.WebkitTransition =
          "stroke-dashoffset " + duration3 + "s " + delay3 + "s ease-in-out";
        path.style.strokeDashoffset = "0";
      }
    };

    if (
      remainingSeconds === minutes * 60 &&
      controlButton.classList.contains("timer-btn-start")
    ) {
      drawMainStem();
      drawStems();
      drawLeaves();
    }

    this.interval = setInterval(() => {
      this.remainingSeconds--;
      this.updateInterfaceTime();

      if (this.remainingSeconds === 0) {
        clearInterval(this.interval);
        this.interval = null;
        this.updateInterfaceControls();

        score = score + 1 * minutes;
        if (score === 1) {
          focusPointsElement.innerHTML = score + " point";
        } else {
          focusPointsElement.innerHTML = score + " points";
        }
        localStorage.setItem("score", JSON.stringify(score));
      }
    }, 1000);

    this.updateInterfaceControls();
  }

  stop() {
    if (this.el.control.classList.contains("timer-btn-stop")) {
      if (confirm("Are you sure you want to give up?")) {
        clearInterval(this.interval);
        this.interval = null;
        this.updateInterfaceControls();

        this.remainingSeconds = 0;
        this.minutes = 0;
        this.updateInterfaceTime();

        svgDisplayElement.classList.remove("d-block");
        svgDisplayElement.classList.add("d-none");

        if (score > 0) {
          score = score - 1;
          if (score === 1) {
            focusPointsElement.innerHTML = score + " point";
          } else {
            focusPointsElement.innerHTML = score + " points";
          }
          localStorage.setItem("score", JSON.stringify(score));
        }
      }
    }
  }

  static getHTML() {
    return `
			<span class="timer-part timer-part-minutes">00</span>
			<span class="timer-part">:</span>
			<span class="timer-part timer-part-seconds">00</span>
			<button type="button" class="timer-btn timer-btn-control timer-btn-start">
				<span class="material-icons">play_arrow</span>
			</button>
			<button type="button" class="timer-btn timer-btn-reset">
				<span class="material-icons">timer</span>
			</button>
		`;
  }
}

new Timer(document.querySelector(".timer"));

// add select option
function addOptionTask(value) {
  $(".custom-options").append(
    '<span class="custom-option" data-value="' +
      value +
      '">' +
      value +
      "</span>"
  );
  $(".custom-option").on("click", function () {
    $(this)
      .parents(".custom-select-wrapper")
      .find("select")
      .val($(this).data("value"));
    $(this)
      .parents(".custom-options")
      .find(".custom-option")
      .removeClass("selection");
    $(this).addClass("selection");
    $(this).parents(".custom-select").removeClass("opened");
    $(this)
      .parents(".custom-select")
      .find(".custom-select-trigger")
      .text($(this).text());
  });
}

// delete select option
function deleteOptionTask(value) {
  $("#potencial-lists option[value='" + value + "']").each(function () {
    $(this).remove();
  });
  $(".custom-options span:contains('" + value + "')").each(function () {
    $(this).remove();
  });
}

// select box custom // Credit base: Luís Carvalho
function showOptionsTasks() {
  $(".custom-select").each(function () {
    var classes = $(this).attr("class"),
      id = $(this).attr("id"),
      name = $(this).attr("name");
    var template = '<div class="' + classes + '">';
    template +=
      '<span class="custom-select-trigger">' + "All lists" + "</span>";
    template += '<div class="custom-options">';
    $(this)
      .find("option")
      .each(function () {
        template +=
          '<span class="custom-option ' +
          $(this).attr("class") +
          '" data-value="' +
          $(this).attr("value") +
          '">' +
          $(this).html() +
          "</span>";
      });
    template += "</div></div>";

    $(this).wrap('<div class="custom-select-wrapper"></div>');
    $(this).hide();
    $(this).after(template);
  });

  $(".custom-select-trigger").on("click", function () {
    $("html").one("click", function () {
      $(".custom-select").removeClass("opened");
    });
    $(this).parents(".custom-select").toggleClass("opened");
    event.stopPropagation();
  });
  $(".custom-option").on("click", function () {
    $(this)
      .parents(".custom-select-wrapper")
      .find("select")
      .val($(this).data("value"));
    $(this)
      .parents(".custom-options")
      .find(".custom-option")
      .removeClass("selection");
    $(this).addClass("selection");
    $(this).parents(".custom-select").removeClass("opened");
    $(this)
      .parents(".custom-select")
      .find(".custom-select-trigger")
      .text($(this).text());
  });
}

// select box custom
function showOptionsLists() {
  $(".custom-select-list").each(function () {
    var classes = $(this).attr("class"),
      id = $(this).attr("id"),
      name = $(this).attr("name");
    var template = '<div class="' + classes + '">';
    template +=
      '<span class="custom-select-trigger">' + "Pink theme" + "</span>";
    template += '<div class="custom-options">';
    $(this)
      .find("option")
      .each(function () {
        template +=
          '<span class="custom-option ' +
          $(this).attr("class") +
          '" data-value="' +
          $(this).attr("value") +
          '">' +
          $(this).html() +
          "</span>";
      });
    template += "</div></div>";

    $(this).wrap('<div class="custom-select-wrapper"></div>');
    $(this).hide();
    $(this).after(template);
  });
  $(".custom-option:first-of-type").hover(
    function () {
      $(this).parents(".custom-options").addClass("option-hover");
    },
    function () {
      $(this).parents(".custom-options").removeClass("option-hover");
    }
  );
  $(".custom-select-trigger").on("click", function () {
    $("html").one("click", function () {
      $(".custom-select-list").removeClass("opened");
    });
    $(this).parents(".custom-select-list").toggleClass("opened");
    event.stopPropagation();
  });
  $(".custom-option").on("click", function () {
    $(this)
      .parents(".custom-select-wrapper")
      .find("select")
      .val($(this).data("value"));
    $(this)
      .parents(".custom-options")
      .find(".custom-option")
      .removeClass("selection");
    $(this).addClass("selection");
    $(this).parents(".custom-select-list").removeClass("opened");
    $(this)
      .parents(".custom-select-list")
      .find(".custom-select-trigger")
      .text($(this).text());
  });
}
