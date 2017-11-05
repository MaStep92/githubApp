import { sortRepos } from '../utils/'

export function reposMapping(repos, filters, sortBy, sortOrder) {
  let finalRepos = repos ? repos.concat() : []

  filters.forEach(f => {
    switch (f.filterType) {
      case 'lang':
        if (f.lang !== 'all') {
          finalRepos = finalRepos.filter(r => r.language === f.lang)
          break
        }
        break

      case 'type':
        if (f.data === 'forks') {
          finalRepos = finalRepos.filter(r => r.fork)
          break
        }

        if (f.data === 'sources') {
          finalRepos = finalRepos.filter(r => !r.fork)
          break
        }
        break

      case 'started':
        finalRepos = finalRepos.filter(r => r.stargazers_count >= f.data)
        break

      case 'hasTopics':
        if (f.checked) {
          finalRepos = repos.filter(r => r.topics.length)
          break
        }

        break

      case 'openIssues':
        if (f.checked) {
          finalRepos = finalRepos.filter(r => r.open_issues_count)
          break
        }
        break

      case 'updateAfter':
        finalRepos = finalRepos.filter(
          r => Date.parse(r.updated_at) >= Date.parse(f.date),
        )
        break
    }
  })

  finalRepos = sortRepos(finalRepos, sortOrder, sortBy)

  return finalRepos
}
