const CLIENT_ID = '0a45b32602af062c3675'
const CLIENT_SECRET = '26382133219d44788c416fe67c9763c4cb9dd243'
const apiUrl = 'https://api.github.com'

// Get input elements
const formEl = document.getElementById('search-form')
const inputEl = document.getElementById('username')
const submitEl = document.getElementById('submit')

// Get output elements
const userProfileEl = document.getElementById('user-profile')
const reposEl = document.getElementById('repos')

submitEl.addEventListener('click', (event) => {
  event.preventDefault()

  // Loader
  const loader =
    '<div class="lds-ring"><div></div><div></div><div></div><div></div></div>'
  userProfileEl.innerHTML = loader
  reposEl.innerHTML = ''

  const username = inputEl.value

  const url = `${apiUrl}/users/${username}?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`
  const reposUrl = `${apiUrl}/users/${username}/repos?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`

  fetchData(url)
    .then((data) => renderUser(data))
    .catch((error) => renderError(error))

  fetchData(reposUrl)
    .then((data) => renderRepositories(data))
    .catch((error) => renderError(error))

  formEl.reset()
})

const renderUser = (data) => {
  // Desired user data
  const {
    avatar_url,
    html_url,
    name,
    login,
    location,
    company,
    created_at,
    followers,
    following,
  } = data

  let list = ''

  if (name) {
    list += createListItem('Name', name)
  }

  if (login) {
    list += createListItem('Login', login)
  }

  if (location) {
    list += createListItem('Location', location)
  }

  if (company) {
    list += createListItem('Company', company)
  }

  if (created_at) {
    const date = new Date(created_at).toLocaleDateString('en-GB')
    list += createListItem('User created on', date)
  }

  if (followers) {
    list += createListItem('Followers', followers)
  }

  if (following) {
    list += createListItem('Following', following)
  }

  const result = `<div class='container flex'>
                    <div>
                      <a href="${html_url}" target="blank">
                        <img
                          src='${avatar_url}'
                          alt='${login}'
                        />
                      </a>
                    </div>
                    <ul>
                      ${list}
                    </ul>
                  </div>`

  userProfileEl.innerHTML = result
}

const renderRepositories = (data) => {
  let repos = ''

  data.forEach((repo) => {
    repos += createListItem(
      repo.language || 'Multiple',
      repo.full_name,
      repo.html_url
    )
  })

  const result = `<div class='container'>
                    <h3>${
                      data.length
                        ? 'Public repositories'
                        : 'User has no public repositories'
                    }</h3>
                    <ul>
                      ${repos}
                    </ul>
                  </div>`

  reposEl.innerHTML = result
}

const renderError = (error) => {
  const result = `<div>
                    <h3>This user doesn't exist</h3>
                    <p>${error}</p>
                  </div>`

  userProfileEl.innerHTML = result
}

const createListItem = (title, content, link = '') => {
  return `<li class='flex'>
            <span class='pill'>${title}</span>
            ${
              link
                ? `<a href="${link}" rel="nofollow" target="_blank">
                    <span>${content}</span>
                  </a>`
                : `<span>${content}</span>`
            }
          </li>`
}

async function fetchData(url) {
  const response = await fetch(url)

  if (!response.ok) {
    const message = `An error has occured: ${response.status}`
    throw new Error(message)
  }

  const data = await response.json()
  return data
}
