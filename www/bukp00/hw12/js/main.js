const CLIENT_ID = '99fe00da6f55d6e0f48e'
const CLIENT_SECRET = 'f93c6b55bd6fee7abed727bcd9d74854c921087e'

const baseApiUrl = 'https://api.github.com'

const App = {};

App.renderUser = (user) => {
  const formattedDate = new Date(user.created_at).toLocaleDateString('cs-CZ')
  const userHtml = `
    <div class="user-info">
      <h2 class="user-name">${user.name || ''}</div>
      <div class="user-avatar" style="background-image: url(${user.avatar_url})"></div>
      <div class="user-table">
        <div class="table-row">
          <div>Login</div>
          <div>${user.login}</div>
        </div>
        <div class="table-row">
          <div>Bio</div>
          <div>${user.company || ''}</div>
        </div>
        <div class="table-row">
          <div>Location</div>
          <div>${user.location || ''}</div>
        </div>
        <div class="table-row">
          <div>Description</div>
          <div>${user.bio || ''}</div>
        </div>
        <div class="table-row">
          <div>Email</div>
          <div>${user.email || ''}</div>
        </div>
        <div class="table-row">
          <div>Followers</div>
          <div>${user.followers || ''}</div>
        </div>
        <div class="table-row">
          <div>Registered</div>
          <div>${formattedDate}</div>
        </div>
        <a class="table-full-row" href="${user.html_url || ''}" target="_blank">
          View profile
        </a>
      </div>
    </div>
    `
  $('#user-profile').html(userHtml)
};

App.renderRepositories = (repositories) => {
  let repsHtml = ''
  repositories.forEach((repository) => {
    repsHtml += `
        <li class="repository">
          <div class="repo-name">${repository.name}</div>
          <div class="repo-url"><a href="${repository.html_url}">${repository.html_url}</a></div>
        </li>
        `;
  })
  if (repsHtml.length === 0) {
    repsHtml = '<li class="empty-repo">No active repository</li>'
  }
  $('#repositories').html(repsHtml)
}

App.fetchRepositories = (userLogin) => {
  const url = `${baseApiUrl}/users/${userLogin}/repos?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`
  $('#repo-title').removeClass('hidden')
  $.getJSON(url).done((repos) => {
    App.renderRepositories(repos)
  }).fail(() => {
    $('#repositores').html('<p>Repositories not found</p>')
  })
}

App.fetchUser = (userName) => {
  const url = `${baseApiUrl}/users/${userName}?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`

  $.getJSON(url).done((user) => {
    App.renderUser(user)
    App.fetchRepositories(user.login)
  }).fail(() => {
    $('#user-profile').html('<p>User not found</p>')
  });
}

$('#search-form').submit((ev) => {
  ev.preventDefault()
  var data = $('#search-input').val();
  if (!data) {
    return;
  }
  App.fetchUser(data)
})