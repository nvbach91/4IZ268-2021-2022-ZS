const authID = '48eca5a20d8e458e1110';
const authSecret = '335c3d21f203c3f89b2e537e383d5a06be34e805';

$(document).ready(() => {

    const nameInput = $('#name-input');
    const form = $('#form');
    const userContainer = $('#user-container');
    const repositoriesContainer = $('#repositories-container');

    form.submit((e) => {
        e.preventDefault();
        const inputValue = nameInput.val();
        $.getJSON('https://api.github.com/users/' + inputValue + '?client_id=' + authID + '&client_secret=' + authSecret).done((user) => {
            userContainer.empty();
            repositoriesContainer.empty();
            renderUser(user);
            fetchRepositories(user.login);
        }).fail(() => {
            userContainer.empty().append('<p>User not found</p>');
        });
    });

    function renderUser(user) {
        const login = user.login;
        let bio = user.bio;
        let location = user.location;
        let email = user.email;
        const followers = user.followers;
        let registered = user.created_at;
        const link = user.html_url;
        const pic = user.avatar_url;

        if(bio === null){
            bio = '';
        }

        if(location === null){
            location = '';
        }
        
        if(email === null){
            email = '';
        }

        registered = registered.substring(0,10);

        const userHeaderContainer = $('<div>').text(login).addClass('user-header');
        const loginContainer = $(`<div> <span>Login</span> <span class='user-data'>${login}</span></div>`).addClass('info-frame');
        const bioContainer = $(`<div> <span>Bio</span> <span class='user-data'>${bio}</span></div>`).addClass('info-frame');
        const locationContainer = $(`<div> <span>Location</span> <span class='user-data'>${location}</span></div>`).addClass('info-frame');
        const emailContainer = $(`<div> <span>Email</span> <span class='user-data'>${email}</span></div>`).addClass('info-frame');
        const followersContainer = $(`<div> <span>Followers</span> <span class='user-data'>${followers}</span></div>`).addClass('info-frame');
        const registeredContainer = $(`<div> <span>Registered</span> <span class='user-data'>${registered}</span></div>`).addClass('info-frame');
        const linkContainer = $('<div> <span>Link</span> </div>').addClass('info-frame');
        const linkAnchor = $('<a>').attr('href', link).text(link);
        linkContainer.append(linkAnchor);
        const picContainer = $('<img>').attr('src', pic);   
        const userInfoWrapper = $('<div>').addClass('user-info-wrapper').append(loginContainer, bioContainer, locationContainer, emailContainer, followersContainer, registeredContainer, linkContainer);
        const userWrapper = $('<div>').addClass('user-wrapper').append(picContainer, userInfoWrapper);
        userContainer.append(userHeaderContainer, userWrapper);
    }

    function fetchRepositories(userLogin) {
        $.getJSON('https://api.github.com/users/' + userLogin + '/repos' + '?client_id=' + authID + '&client_secret=' + authSecret).done((userRepositories) => {
            renderRepositories(userRepositories);
        }).fail(() => {
            console.log(':(');
        });
    }

    function renderRepositories(userRepositories){
        const repositoriesCount = userRepositories.length;
        const countContainer = $('<p>').text('This user has ' + repositoriesCount + ' repositories');
        repositoriesContainer.append('<h2> Repositories </h2>', countContainer);
        if(repositoriesCount > 0){
            userRepositories.forEach(repository => {
                const repositoryContainer = $('<div>').text(repository.name + '  ............  ' + repository.html_url).addClass('repository-frame');
                repositoriesContainer.append(repositoryContainer);
            });
        }
    }
});