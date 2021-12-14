/**
 * Git The Hub
 */
// It is best practice to create variables and functions under one object to avoid global polution
const App = {
  appContainer: $("#app"),
  form: $("#search-form"),
  input: $("#user-input"),
  profile: $("#user-profile").addClass("container"),
  repositories: $("#repositories"),
  loader: $("<div>").addClass("loader"),
};

// INSERT CLIENT ID FROM GITHUB
App.client_id = "64b003d6c38025e0e635";
// INSERT CLIENT SECRET FROM GITHUB
App.client_secret = "fd56a3cce138f340bc0d4fda75ffaaa8cfc352c5";
App.baseApiUrl = "https://api.github.com";

// render the user's information
App.renderUser = function (user) {
  App.repositories.append(App.loader);

  const infoElement = $("<div>").addClass("user-info row");

  const avatarElement = $("<div>")
    .addClass("user-avatar item col-md-6")
    .css("background-image", "url(" + user.avatar_url + ")");

  const profileBoxElement = $("<div>").addClass("user-profile-box col-md-6");

  const loginElement = $("<div>").addClass("user-login item row");
  const loginLabelElement = $("<h5>").html("Login").addClass("col-md-6");
  const loginTextElement = $("<div>").html(user.login).addClass("col-md-6");
  loginElement.append(loginLabelElement, loginTextElement);

  const bioElement = $("<div>").addClass("user-bio item row");
  const bioLabelElement = $("<h5>").html("Bio").addClass("col-md-6");
  const bioTextElement = $("<div>").html(user.bio).addClass("col-md-6");
  bioElement.append(bioLabelElement, bioTextElement);

  const locationElement = $("<div>").addClass("user-location item row");
  const locationLabelElement = $("<h5>").html("Location").addClass("col-md-6");
  const locationTextElement = $("<div>")
    .html(user.location)
    .addClass("col-md-6");
  locationElement.append(locationLabelElement, locationTextElement);

  const blogElement = $("<div>").addClass("user-blog item row");
  const blogLabelElement = $("<h5>").html("Blog").addClass("col-md-6");
  const blogTextElement = $("<div>").html(user.blog).addClass("col-md-6");
  blogElement.append(blogLabelElement, blogTextElement);

  const followersElement = $("<div>").addClass("user-followers item row");
  const followersLabelElement = $("<h5>")
    .html("Followers")
    .addClass("col-md-6");
  const followersTextElement = $("<div>")
    .html(user.followers)
    .addClass("col-md-6");
  followersElement.append(followersLabelElement, followersTextElement);

  const emailElement = $("<div>").addClass("user-email item row");
  const emailLabelElement = $("<h5>").html("Email").addClass("col-md-6");
  const emailTextElement = $("<div>").html(user.email).addClass("col-md-6");
  emailElement.append(emailLabelElement, emailTextElement);

  const createdElement = $("<div>").addClass("user-created item row");
  const createdLabelElement = $("<h5>").html("Created").addClass("col-md-6");
  const createdTextElement = $("<div>")
    .html(new Date(user.created_at).toLocaleDateString("cs-CZ"))
    .addClass("col-md-6");
  createdElement.append(createdLabelElement, createdTextElement);

  const profileElement = $("<div>").addClass("user-profile item row");
  const profileLabelElement = $("<h5>").html("Profile").addClass("col-md-6");
  const profileLinkElement = $("<a>")
    .html(user.html_url || "")
    .attr("href", user.html_url)
    .attr("target", "_blank")
    .addClass("user-link col-md-6");

  profileElement.append(profileLabelElement, profileLinkElement);

  profileBoxElement.append(
    loginElement,
    bioElement,
    locationElement,
    blogElement,
    followersElement,
    emailElement,
    createdElement,
    profileElement
  );

  infoElement.append(avatarElement, profileBoxElement);

  App.profile.html(infoElement);
};

// a function that fetches repositories of users based on their username
App.fetchRepositories = (username) => {
  App.repositories.append(App.loader);

  $.ajax({
    url: App.baseApiUrl + "/users/" + username + "/repos",
    data: {
      client_id: App.client_id,
      client_secret: App.client_secret,
    },
  }).done(function (repositories) {
    App.loader.remove();

    const repositoryCounterElement = $("<div>")
      .addClass("repository-counter")
      .html("User has " + repositories.length + " repositories.");
    const repositoryBox = $("<div>").addClass("repository-box");

    repositories.forEach(function (repository) {
      const repositoryListElement = $("<li>").addClass("repository-list row");

      const repositoryNameElement = $("<div>")
        .addClass("repository-name col-md-6")
        .html(repository.name);

      const repositoryUrlElement = $("<a>")
        .html(repository.html_url || "")
        .attr("href", repository.html_url)
        .attr("target", "_blank")
        .addClass("col-md-6");

      repositoryListElement.append(repositoryNameElement, repositoryUrlElement);
      repositoryBox.append(repositoryListElement);
    });

    App.repositories.empty().append(repositoryCounterElement, repositoryBox);
  });
};

App.init = () => {
  App.form.submit((e) => {
    e.preventDefault();

    var input = App.input.val();
    if (!input) {
      return false;
    }

    App.profile.append(App.loader);

    $.ajax({
      url: App.baseApiUrl + "/users/" + input,
      data: {
        client_id: App.client_id,
        client_secret: App.client_secret,
      },
    })
      .done(function (user) {
        App.renderUser(user);
        App.fetchRepositories(user.login);
      })
      .fail(function () {
        const notFoundElement = $("<div>")
          .html("User not found")
          .addClass("not-found");
        App.profile.html(notFoundElement);
        App.repositories.empty();
      });
  });
};

// wait for the page to load, then execute the main processes
$(document).ready(() => {
  App.init();
});
