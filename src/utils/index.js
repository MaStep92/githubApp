export const mergeLangs = (state, arr) => {
  const langs = state.concat()

  arr.forEach(lang => {
    if (!langs.includes(lang)) {
      langs.push(lang)
    }
  })

  return langs
}

export function sortRepos(arr, sortOrder, prop) {
  if (prop === 'name') {
    return sortByName(arr, sortOrder)
  }

  if (prop === 'stargazers_count') {
    return sortByStars(arr, sortOrder)
  }

  if (prop === 'open_issues_count') {
    return sortByIssues(arr, sortOrder)
  }

  if (prop === 'updated_at') {
    return sortByUpdated(arr, sortOrder)
  }

  return arr.sort(function(a, b) {
    return sortOrder === 'asc' ? a[prop] - b[prop] : b[prop] - a[prop]
  })
}

const sortByName = (repos, sortOrder) => {
  return repos.sort((a, b) => {
    return sortOrder === 'asc'
      ? a.name.toLowerCase().localeCompare(b.name.toLowerCase())
      : b.name.toLowerCase().localeCompare(a.name.toLowerCase())
  })
}

const sortByStars = (repos, sortOrder) => {
  return repos.sort((a, b) => {
    return sortOrder === 'asc'
      ? a.stargazers_count - b.stargazers_count
      : b.stargazers_count - a.stargazers_count
  })
}

const sortByIssues = (repos, sortOrder) => {
  return repos.sort((a, b) => {
    return sortOrder === 'asc'
      ? a.open_issues_count - b.open_issues_count
      : b.open_issues_count - a.open_issues_count
  })
}

const sortByUpdated = (repos, sortOrder) => {
  return repos.sort((a, b) => {
    return sortOrder === 'asc'
      ? new Date(a.updated_at) - new Date(b.updated_at)
      : new Date(b.updated_at) - new Date(a.updated_at)
  })
}

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

export const formateDate = time => {
  const date = new Date((time || '').replace(/-/g, '/').replace(/[TZ]/g, ' '))
  const diff = (new Date().getTime() - date.getTime()) / 1000
  const dayDiff = Math.floor(diff / 86400)
  const currentYear = new Date().getFullYear()
  const dateYear = date.getFullYear()
  const dateMonth = months[date.getMonth()]
  const dateDay = date.getDate()

  if (isNaN(dayDiff) || dayDiff < 0) return
  if (dateYear !== currentYear) return `on ${dateDay} ${dateMonth} ${dateYear}`

  return (
    (dayDiff === 0 &&
      ((diff < 60 && 'Just now') ||
        (diff < 120 && '1 minute ago') ||
        (diff < 3600 && Math.floor(diff / 60) + ' minutes ago') ||
        (diff < 7200 && '1 hour ago') ||
        (diff < 86400 && Math.floor(diff / 3600) + ' hours ago'))) ||
    (dayDiff === 1 && 'a day ago') ||
    (dayDiff < 7 && dayDiff + ' days ago') ||
    (dayDiff < 31 && Math.ceil(dayDiff / 7) + ' weeks ago') ||
    `on ${dateDay} ${dateMonth}`
  )
}

export const getLanguages = repos => {
  const language = []

  repos.forEach(repo => {
    if (!language.includes(repo.language)) {
      language.push(repo.language)
    }
  })

  return language
}

// link
export const parseURL = link => {
  const href = link || window.location.href
  let owner = href.match(/#.*\?/) && href.match(/#.*\?/)[0]
  owner = owner ? owner.slice(1, -1) : owner
  let params = href.match(/\?.*/) && href.match(/\?.*/)[0]
  params = params ? params.slice(1).split('&') : []

  const paramsObj = {}
  const filtersParams = {}
  const sortingParams = {}
  const stateParams = {}

  const sortingParamsMap = {
    sort: 'sortBy',
    order: 'sortOrder',
  }

  const stateParamsMap = {
    page: 'numberOfPages',
  }

  params.forEach(param => {
    if (~param.indexOf('=')) {
      const [key, value] = param.split('=')
      paramsObj[key] = value
    } else {
      paramsObj[param] = true
    }
  })

  for (const key in paramsObj) {
    if (key in stateParamsMap) {
      const value = paramsObj[key]
      const newKey = stateParamsMap[key]
      stateParams[newKey] = value
    } else if (key in sortingParamsMap) {
      const value = paramsObj[key]
      const newKey = sortingParamsMap[key]
      sortingParams[newKey] = paramsObj[key]
    } else {
      filtersParams[key] = paramsObj[key]
    }
  }

  return Object.assign(
    {},
    { owner },
    stateParams,
    { filtersParams },
    { sortingParams },
  )
}
