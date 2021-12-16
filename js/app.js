/**
 * Git The Hub
 */
// It is best practice to create variables and functions under one object to avoid global polution
const App = {
    form: $('#search-form'),
    input: $('input[name="username"]'),
    userProfile: $('#user-profile'),
    userRepositories: $('#repositories')
};
// INSERT CLIENT ID FROM GITHUB
App.client_id = '7557c97de86a845e4673';
// INSERT CLIENT SECRET FROM GITHUB
App.client_secret = 'f6f5d83bcb20c3ca84b6148e196fd1ca7c5ad0ff';
App.baseApiUrl = 'https://api.github.com';
App.loader = $('<div class="loader"></div>');

App.getUserData = (username) => {
    App.userProfile.append(App.loader);
    $.getJSON(`${App.baseApiUrl}/users/${username}?client_id=${App.client_id}&client_secret=${App.client_secret}`)
        .done((data) => {
            App.loader.remove();
            App.renderUser(data);
            App.fetchRepositories(data.login);
        }).fail((resp) => {
        App.userRepositories.empty();
        App.userProfile.html(`<h2>No such user</h2>`);
    });
};

// render the user's information
App.renderUser = (user) => {
    App.userProfile.empty();
    //login, avatar_url, bio, location, followers, created_at, html_url
    const createdDate = new Date(user.created_at).toLocaleDateString('cs-CZ');
    const html = `
            <h2>${user.name}</h2>
            <div class="profile-information">
                <div class="avatar">
                    <img src="${user.avatar_url}" alt="User avatar">
                </div>
                <div class="profile-parameters">
                    <div class="profile-parameter">
                        <div class="parameter-name">Login:</div>
                        <div class="parameter-value">${user.login}</div>
                    </div>
                    <div class="profile-parameter">
                        <div class="parameter-name">Bio:</div>
                        <div class="parameter-value">${user.bio}</div>
                    </div>
                    <div class="profile-parameter">
                        <div class="parameter-name">Location:</div>
                        <div class="parameter-value">${user.location}</div>
                    </div>
                    <div class="profile-parameter">
                        <div class="parameter-name">Followers:</div>
                        <div class="parameter-value">${user.followers}</div>
                    </div>
                    <div class="profile-parameter">
                        <div class="parameter-name">Created at:</div>
                        <div class="parameter-value">${createdDate}</div>
                    </div>
                    <div class="profile-parameter">
                        <div class="parameter-name">Profile URL:</div>
                        <div class="parameter-value"><a href="${user.html_url}" target="_blank">${user.html_url}</a></div>
                    </div>
                </div>
            </div>
    `;

    App.userProfile.html(html);
};

App.renderRepositories = (repositories) => {
    App.userRepositories.empty();

    var html = `
        <p>This user have ${repositories.length} repositories.</p>
    `;

    repositories.forEach((repository) => {
        html += `
            <li class="repository">
                <div class="repository-name">${repository.name}</div>
                <div class="repository-url"><a href="${repository.html_url}" target="_blank">${repository.html_url}</a></div>
            </li>
        `
    });

    App.userRepositories.html(html);
};

// a function that fetches repositories of users based on their username
App.fetchRepositories = (username) => {
    App.userRepositories.append(App.loader);
    $.getJSON(`${App.baseApiUrl}/users/${username}/repos?client_id=${App.client_id}&client_secret=${App.client_secret}&per_page=100`).done((data) => {
        App.loader.remove();
        App.renderRepositories(data);
    }).fail((resp) => {

    });
};

// prepare application
App.init = () => {
    App.form.submit((e) => {
        e.preventDefault();
        App.getUserData(App.input.val());
    });
};

// wait for the page to load, then execute the main processes
$(document).ready(() => {
    App.init();
});
