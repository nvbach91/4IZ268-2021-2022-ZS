const createTaskForm = document.querySelector("#new-task-form");
const createTaskField = document.querySelector("#new-task-input");
const dateTaskField = document.querySelector('#new-task-date');
const createTaskButton = document.querySelector('.add-btn');

const listElement = document.querySelector("#tasks");
const linkActive = document.querySelectorAll(".nav-link");
const taskList = document.querySelector(".task-list");

const dateBox = document.querySelector(".date");

// current date
let date = new Date();
var dd = String(date.getDate()).padStart(2, '0');
var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = date.getFullYear();

const dateFormatted = dd + '/' + mm + '/' + yyyy;

// settings for calendar
// date from the input field
dateTaskField.valueAsDate = new Date();
dateTaskField.min = new Date().toISOString().split("T")[0];

var ddTaskField = String(dateTaskField.valueAsDate.getDate()).padStart(2, '0');
var mmTaskField = String(dateTaskField.valueAsDate.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyyTaskField = dateTaskField.valueAsDate.getFullYear();

const dateFormattedTaskField = ddTaskField + '/' + mmTaskField + '/' + yyyyTaskField;
// tasks loading
const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Doughnut chart
const ctx = document.getElementById('myChart');

let completedTasks = 0;
let notCompletedTasks = 0;

tasks.forEach(task => {
	if(task.checked === true){
		completedTasks = completedTasks + 1;
	} else {
		notCompletedTasks = notCompletedTasks + 1;
	}
});

const myChart = new Chart(ctx, {
	type: 'doughnut',
	data: {
		labels: ["Finished","To do"],
		datasets: [{
			
			data: [0, 0],
			backgroundColor: [
			  'rgb(0, 205, 86)',
			  'rgb(255, 99, 132)',
			],
			hoverOffset: 4
		}]
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
			color: '#fff',
			backgroundColor: '#404040'
		  },
		}
	  }
});

myChart.data.datasets[0].data[0] = completedTasks;
myChart.data.datasets[0].data[1] = notCompletedTasks;
myChart.update();

//Task list

tasks.forEach((data) => {
  onCreateTask({ data });
});
 
// Create a new task
createTaskForm.addEventListener('submit', (e) => {
	e.preventDefault();

	const value = createTaskField.value;
	const dateEnd = dateTaskField.value;
	const description = '';

  	if (value) {
   	 const data = {
		value,
		checked: false,
		dateEnd: dateEnd,
		description: description
	}
	storageCreate(data);
	onCreateTask({ data });
	createTaskForm.reset();
  }
});

function onCreateTask({ data }) {
	dateBox.innerHTML = 'Date: <span>'+ dateFormatted +'</span>';
	const taskElement = document.createElement('div');
	taskElement.classList.add('task');
	taskElement.classList.add('row');

	const checkboxElement = document.createElement('input');
	checkboxElement.type = 'checkbox';
	checkboxElement.checked = data.checked;
	checkboxElement.classList.add('checkbox');
	checkboxElement.classList.add('col-md-2');
	taskElement.appendChild(checkboxElement);

	if(checkboxElement.checked === true) {
		taskElement.classList.add('checked');
	} 
	
	if(checkboxElement.checked === false) {
		taskElement.classList.remove('checked');
	}

	const inputElementBox = document.createElement('div');
	inputElementBox.classList.add('col-md-6');

	const inputElement = document.createElement('p');
	inputElement.contentEditable = true;
	inputElement.classList.add('task-input');
	inputElement.innerHTML = data.value;
	inputElement.id = data.token;

	const taskDescriptionInputElement = document.createElement('p');
	taskDescriptionInputElement.contentEditable = true;
	taskDescriptionInputElement.classList.add('task-input');
	taskDescriptionInputElement.classList.add('task-input-description');
	// taskDescriptionElement.classList.add('col-md-6');
	taskDescriptionInputElement.innerHTML = data.description;
	//taskDescriptionInputElement.innerHTML = data.description;
	taskDescriptionInputElement.id = data.token;

	inputElementBox.append(inputElement,taskDescriptionInputElement);

	const taskIconElementBox = document.createElement('div');
	taskIconElementBox.classList.add('col-md-4');
	taskIconElementBox.classList.add('row');

	const taskDescriptionElement = document.createElement('button');
	taskDescriptionElement.title = "Description";
	taskDescriptionElement.classList.add('description');
	taskDescriptionElement.classList.add('col-md-6');
	taskDescriptionElement.innerHTML = '<i class="fas fa-book"></i>';

	const taskDeleteElement = document.createElement('button');
	taskDeleteElement.title = "Delete item";
	taskDeleteElement.id = data.token;

	taskDeleteElement.classList.add('delete');
	taskDeleteElement.classList.add('col-md-6');
	taskDeleteElement.innerHTML = '<i class="fa fa-thin fa-trash"></i>';

	taskIconElementBox.append(taskDescriptionElement, taskDeleteElement)

	taskElement.append(checkboxElement, inputElementBox, taskIconElementBox);

	listElement.appendChild(taskElement);

	inputElement.addEventListener('input', () => {
		data.value = inputElement.innerHTML;
		storageUpdate(data);
	});

	taskDescriptionInputElement.addEventListener('input', () => {
		data.description = taskDescriptionInputElement.innerHTML;
		storageUpdate(data);
	});

	taskDeleteElement.addEventListener('click', (e) => {
		storageDelete(data);
		taskElement.remove();
	});

	listElement.appendChild(taskElement);

	checkboxElement.addEventListener('input', function() {
			data.checked = checkboxElement.checked;
			toggleTaskStatus({checked: data.checked, taskElement});
			storageUpdate(data);
	});

	taskDescriptionElement.addEventListener('click', ()=>{
		taskDescriptionInputElement.classList.add('task-input-description-show');
		taskDescriptionInputElement.focus();

		if (taskDescriptionInputElement.innerHTML !== '') {
			taskDescriptionInputElement.classList.add('task-input-description-show');
			taskDescriptionElement.classList.add('description-icon-hide');
		}
	});

	taskDescriptionInputElement.addEventListener('input', ()=>{
		if (taskDescriptionInputElement.innerHTML !== '') {
			taskDescriptionInputElement.classList.add('task-input-description-show');
			taskDescriptionElement.classList.add('description-icon-hide');
		}
	});

	if (taskDescriptionInputElement.innerHTML !== '') {
		taskDescriptionElement.classList.add('description-icon-hide');
		taskDescriptionInputElement.classList.add('task-input-description-show');
	}

/* 	var event = {
		'summary': 'Google I/O 2015',
		'location': '800 Howard St., San Francisco, CA 94103',
		'description': 'A chance to hear more about Google\'s developer products.',
		'start': {
		  'dateTime': '2015-05-28T09:00:00-07:00',
		  'timeZone': 'America/Los_Angeles'
		},
		'end': {
		  'dateTime': '2015-05-28T17:00:00-07:00',
		  'timeZone': 'America/Los_Angeles'
		},
		'recurrence': [
		  'RRULE:FREQ=DAILY;COUNT=2'
		],
		'attendees': [
		  {'email': 'lpage@example.com'},
		  {'email': 'sbrin@example.com'}
		],
		'reminders': {
		  'useDefault': false,
		  'overrides': [
			{'method': 'email', 'minutes': 24 * 60},
			{'method': 'popup', 'minutes': 10}
		  ]
		}
	  };
	  
	  var request = gapi.client.calendar.events.insert({
		'calendarId': 'lukysekvit@gmail.com',
		'resource': event
	  });
	  
	  request.execute(function(event) {
		appendPre('Event created: ' + event.htmlLink);
	  }); */
}

function toggleTaskStatus({checked, taskElement}) {
	taskElement.classList[checked ? 'add' : 'remove']('checked');
}

function storageCreate(data) {
	const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
	data.token = getToken();
	tasks.push(data);
	localStorage.setItem('tasks', JSON.stringify(tasks));
	updateGraph();
}

function storageUpdate(data) {
	const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
	let index = getIndexByToken(data.token);

	if (index !== -1) {
		tasks[index] = data;

		localStorage.setItem('tasks', JSON.stringify(tasks));
	}
	updateGraph();
}

// delete item from storage and list
function storageDelete(data) {
	const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
	let index = getIndexByToken(data.token);

    if (index !== -1) {
      tasks.splice(index, 1);

      localStorage.setItem('tasks', JSON.stringify(tasks));
	}
	updateGraph();
}

// get index
function getIndexByToken(token) {
	const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

	for (let i = 0; i < tasks.length; i++) {
		if (tasks[i].token === token) {
		  return i;
		}
	  }
	return -1;
}

function getToken() {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
}

function updateGraph() {
	const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

	let completedTasksNew = 0;
	let notCompletedTasksNew = 0;

	tasks.forEach(task => {
	if(task.checked === true){
		completedTasksNew = completedTasksNew + 1;
	} else {
		notCompletedTasksNew = notCompletedTasksNew + 1;
	}
	});
	
	myChart.data.datasets[0].data[0] = completedTasksNew;
	myChart.data.datasets[0].data[1] = notCompletedTasksNew;
	myChart.update();
}

function colorLink(){
	if(linkActive){
		linkActive.forEach(l=> l.classList.remove('active'))
		this.classList.add('active')
		}
	}
linkActive.forEach(l=> l.addEventListener('click', colorLink));



