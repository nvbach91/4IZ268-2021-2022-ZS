/**
 * Git The Hub
 */
// It is best practice to create variables and functions under one object to avoid global polution
const App = {
    userApp: $('#app'),
    userForm: $('#search-form'),
    userInput: $('input[name="username"]'),
    userProfile: $('#user-profile'),
    userRepositories: $('#repositories'),
  };
  // INSERT CLIENT ID FROM GITHUB
  App.client_id = '226d5171b3208f085677';
  // INSERT CLIENT SECRET FROM GITHUB
  App.client_secret = 'd194d022b3bdcff1c4ffb002e12b85af352381f7';
  App.baseApiUrl = 'https://api.github.com';
  
  // render the user's information
  App.renderUser = (user) => {
    App.userProfile.empty().append(App.createrUserProfile(user));
  };
  
  App.renderRepositories = (repositories) => {
    App.userRepositories.empty().append(App.createRepositories(repositories));
  };
  
  App.renderUserFail = () => {
    const userElement = $(`
      <div>
      not found
      </div>
    `);
    App.userProfile.empty().append(userElement);
  };
  
  App.renderRepositoriesFail = () => {
    const repositoryElement = $(`
      <div>not found</div>
    `);
    App.userRepositories.empty().append(repositoryElement);
  };
  
  App.fetchRepositories = (username) => {
    $.getJSON(`${App.baseApiUrl}/users/${username}/repos?client_id=${App.client_id}&client_secret=${App.client_secret}&per_page=100`).done((data) => {
      console.log(data);
      App.renderRepositories(data);
    }).fail((resp) => {
      console.log(resp);
      App.renderRepositoriesFail();
    });
  
  };
  App.init = () => {
   
  
    App.userForm.submit((e) => {
      e.preventDefault();
      App.createLoader();
      App.getUser(App.userInput.val());
    });
  
  };
  
  App.getUser = (username) => {
    $.getJSON(`${App.baseApiUrl}/users/${username}?client_id=${App.client_id}&client_secret=${App.client_secret}`).done((data) => {
      console.log(data);
      App.renderUser(data);
      App.fetchRepositories(data.login);
    }).fail((resp) => {
      console.log(resp);
      App.renderUserFail();
      App.renderRepositoriesFail();
    });
  };
  
  App.createLoader = () => {
    const loaderElement = $(`<div class="loader"><div>`);
    App.userProfile.empty().append(loaderElement);
    App.userRepositories.empty().append(loaderElement);
  };
  
  App.createrUserProfile = (data) => {
    Object.keys(data).forEach(function (key) {
      if (data[key] === null) {
        data[key] = '';
      }
    });
  
    const userElement = $(`
  <h2 class ="user-title">${data.login}</h2>
  <div class="user">
    <div class="avatar-box">
      <div class="user-avatar">
        <img class src="${data.avatar_url}" alt="user image"></img>
      </div>
    </div>
    <div class="info-box">
      <div class="user-info user-login">
        <div>Login</div>
        <div class="added">${data.login}</div>
      </div>
      <div class="user-info user-bio">
        <div>Bio</div>
        <div class="added">${data.bio}</div>
      </div>
      <div class="user-info user-location">
        <div>Location</div>
        <div class="added">${data.location}</div>
      </div>
      <div class="user-info user-blog">
        <div>Blog</div>
        <a class="added" href="${data.blog}" target="_blank">${data.blog}</a>
      </div>
      <div class="user-info user-followers">
        <div>Followers</div>
        <div class="added">${data.followers}</div>
      </div>
      <div class="user-info user-email">
        <div>Email</div>
        <div class="added">${data.email}</div>
      </div>
      <div class="user-info user-created_at">
        <div>Created</div>
        <div class="added">${new Date(data.created_at).toLocaleDateString('en-EN')}</div>
      </div>
      <div class="user-info user-url">
        <div>Profile</div>
        <a class="added" href="${data.html_url}" target="_blank">${data.html_url}</a>
      </div>
    </div>
  </div>
    `);
    return userElement;
  };
  
  App.createRepositories = (data) => {
    let htmlBuilder;
    if (data.length !== 1) {
      htmlBuilder = `<li class ="repo-count">This user has ${data.length} repositories</li>`;
    } else {
      htmlBuilder = `<li class ="repo-count">This user has ${data.length} repository</li>`;
    }
    Object.keys(data).forEach(function (key) {
      htmlBuilder += `
      <li class="repo">
        <div>${data[key].name}</div>
        <a href="${data[key].html_url}">${data[key].html_url}</a>
      </li>`;
    });
    const repoElement = $(htmlBuilder);
    return repoElement;
  };
  
  $(document).ready(() => {
    App.init();
  });