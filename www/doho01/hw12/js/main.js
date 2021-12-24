// Příklad volání na GitHub API
const CLIENT_ID = '5496461421f31df6ae95';     // client_id získáte po registraci OAuth účtu
const CLIENT_SECRET = '05aecbcca4b15e0fac347921913075273f2b9ed8'; // client_secret získáte po registraci OAuth účtu
const baseApiUrl = 'https://api.github.com';
// sestavujeme URL, který obsahuje parametry CLIENT_ID a CLIENT_SECRET
// každý parametr se určuje v podobě klíč=hodnota, parametry se oddělují ampersandem, 
// na začátek přidáme otazník
// např. ?client_id=abcdef&client_secret=fedcba
//const url = `${baseApiUrl}/users/${searchValue}?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`;

const userProfileContainer = $('#user-profile')

const renderUser = (user) => {
    // Here we crate html elements for each user's atributes
    const userBox = $(`
    <div class="user-basic-info">
        <img class="bi user-avatar" src="${user.avatar_url || ''}" alt="user image">
        <div class="bi user-name">Name: ${user.name || ''}</div>
        <div class="bi user-login">Login: ${user.login || ''}</div>
        <div class="bi user-company">Company: ${user.company || ''}</div>
        <div class="bi user-location">Location: ${user.location || ''}</div>
        <div class="bi user-location">Bio: ${user.bio || ''}</div>
        <div class="bi user-email">Email: ${user.email || ''}</div>
        <div class="bi user-followers">Followers: ${user.followers}</div>
        <div class="bi user-registered">${new Date(user.created_at).toLocaleDateString("cs-CZ")}</div>
        <div class="bi user-profile"><a href="${user.html_url || ''}">${user.html_url || ''}</a></div>
        <a class="bi user-view" href="${user.html_url || ''}" target="_blank">View profile</a>
    </div>`);
    $('#user-profile').empty().append(userBox);
};

const fetchRepositories = (userLogin) => {
    // Here we fetch repositories of a user with Ajax and then each repository (if user has any) we will show in html (list of items)
    $.ajax({
        url: baseApiUrl + "/users/" + userLogin + "/repos",
        data: {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        },
    }).done((repositories) => {
        const repositoryCounter = $("<div>")
        .addClass("repository-counter")
        .html(`This user has ${repositories.length} repositories.`);
        

        const repositoryBox = $("<div>").addClass("repository-box");
        repositories.forEach((repository) => {
            const repositoryItem = $('<div>').addClass("bi repository");
            const repositoryName = $('<div>').addClass("repo-name").html(repository.name);
            const repostoryURL = $('<div>').addClass("repo-url").html(repository.html_url)
            .attr("href", repository.html_url)
            .attr("target", "_blank");
        repositoryItem.append(repositoryName, repostoryURL);
        repositoryBox.append(repositoryItem);
        });
        $('#repositories').empty().append(repositoryCounter, repositoryBox);
    });
};

//Search after submitting username (login)
$(document).ready(() => {
    const h2 = $('h2');
    h2.hide();

    $('#user-form').submit((event) => {
        event.preventDefault(); 
        
        let input = $('#user-input').val();
        if (!input) {
            return false;
        }
    
        $.ajax({
            url: baseApiUrl + "/users/" + input,
            data: {
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            },
        }).done((user) => {
            renderUser(user);
            h2.show();
            fetchRepositories(user.login);
        }).fail(() => {
            userProfileContainer.empty().append('<p>Error404: User not found</p>');
            h2.hide();
            $('#repositories').empty();
        });
    });
});

