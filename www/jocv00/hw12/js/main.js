/**
 * Git The Hub
 */
// It is best practice to create variables and functions under one object to avoid global polution
const App = {
    app: $('#app'),
    form: $('#search-form'),
    input: $('input[name="username"]'),
    profile: $('#user-profile'),
    repositories: $('#repositories'),
    client_id: '9652ad03d6890270c9c1',
    client_secret: '326b66426b486c579bdf38ed6918dba8fd8e9d60',
    baseApiUrl: 'https://api.github.com'
};

$(document).ready(() => {
    App.init();
});

App.init = () => {
    App.form.submit((event) => {
        event.preventDefault();
        App.fetchUserData(App.input.val());
        App.fetchRepositories(App.input.val());
    });
};

// render the user's information
App.fetchUserData = (username) => {
    App.profile.empty();

    $.getJSON(`${App.baseApiUrl}/users/${username}?client_id=${App.client_id}&client_secret=${App.client_secret}`).done((data) => {
        App.createUser(data);
    }).fail((resp) => {
        App.profile.append($('<p>User not found</p>'));
    });
};

App.createUser = (data) => {
    const container = $('<div></div>').addClass('main');

    const username = $('<div></div>').addClass('username').text(data.login);
    
    const image = $('<img/>').attr('src', data.avatar_url).attr('alt', 'user avatar');
    const imageColumn = $('<div></div>');
    imageColumn.append(image);

    const valuesColumn = $(`<div>
    <div><strong>Name: </strong></div>
    <div><strong>Bio: </strong></div>
    <div><strong>Location: </strong></div>
    <div><strong>Email: </strong></div>
    <div><strong>Followers: </strong></div>
    <div><strong>Date joined: </strong></div>
    <div><strong>Hireable: </strong></div>
    <div><strong>Company: </strong></div>
    </div>`).addClass('column');

    const descriptionColumn = $('<div></div>').addClass('column');

    const login = $('<div></div>').text(data.login);
    const bio = $('<div></div>').text(App.checkNull(data.bio));
    const location = $('<div></div>').text(App.checkNull(data.location));
    const email = $('<div></div>').text(App.checkNull(data.email));
    const followers = $('<div></div>').text(App.checkNull(data.followers));
    const dateText = data.created_at.split('T')[0];
    const registered = $('<div></div>').text(dateText);
    const hireable = $('<div></div>').text(data.hireable == true? 'Yes' : 'No');
    const company = $('<div></div>').text(App.checkNull(data.company));
    const profile = $('<a></a>').attr('href', data.html_url).text('Visit profile');
    descriptionColumn.append(login, bio, location, email, followers, registered,hireable,company, profile);
    container.append(imageColumn, valuesColumn,descriptionColumn);
    App.profile.append(username,container);
}
App.checkNull = (text) => {
    if (text == null) {
        return '-';
    } else {
        return text;
    }
}

// a function that fetches repositories of users based on their username
App.fetchRepositories = (username) => {
    App.repositories.empty();
    $.getJSON(`${App.baseApiUrl}/users/${username}/repos?client_id=${App.client_id}&client_secret=${App.client_secret}`).done((data) => {
        App.createRepositories(data);
    }).fail((resp) => {
        return null;
    });
};

App.createRepositories = (data) => {
    let count = 0;
    let nameContainer = $('<div></div>').addClass('column');
    let urlContainer = $('<div></div>').addClass('column');
    data.forEach(project => {
        const projectName = $(`<div>${project.name}</div>`);
        const projectUrl = $(`<a></a>`).attr('href', `${project.html_url}`).text('visit project');
        nameContainer.append(projectName);
        urlContainer.append(projectUrl);
        count++;
    });
    const projectContainer = $('<div></div>').addClass('row');
    projectContainer.append(nameContainer,urlContainer);
    const countDiv = $(`<div><strong>Number of projects: </strong>${count}</div>`).addClass('counter');
    App.repositories.append(countDiv, projectContainer);
}
