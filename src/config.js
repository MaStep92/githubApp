import axios from 'axios'

export const appName = 'githubApp'

axios.defaults.headers.common['Accept'] = 'application/vnd.github.mercy-preview+json'
