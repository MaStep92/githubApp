import axios from 'axios'
import { getLanguages } from '../utils'

const API_PREFIX = 'https://api.github.com'

export function getUsers(query) {
  return axios.get(`${API_PREFIX}/search/users?q=${query}`)
}

export function getUserInfo(query) {
  return axios.get(`${API_PREFIX}/users/${query}`)
}

export async function getUserRepos(user, page = 1) {
  let response = await axios.get(
    `${API_PREFIX}/users/${user}/repos?page=${page}`,
  )
  let repos = await response.data

  const langs = await getLanguages(repos)

  return { repos, langs }
}

export async function getRepoDetails(userName, repoName) {
  const [repo, languages, contributors, comments] = await Promise.all([
    axios.get(`${API_PREFIX}/repos/${userName}/${repoName}`),
    axios.get(`${API_PREFIX}/repos/${userName}/${repoName}/languages`),
    axios.get(`${API_PREFIX}/repos/${userName}/${repoName}/contributors`),
    axios.get(`${API_PREFIX}/repos/${userName}/${repoName}/comments`),
  ]).then(r => r.map(res => res.data))

  const filteredLanguages = Object.keys(languages).reduce((acc, lang) => {
    if (languages[lang] > 1024) acc.push({ lang: lang, size: languages[lang] })
    return acc
  }, [])
  const filteredContributors = contributors.slice(0, 3)

  return { repo, filteredLanguages, filteredContributors }
}

export default {
  getUsers,
  getUserInfo,
  getUserRepos,
  getRepoDetails,
}
