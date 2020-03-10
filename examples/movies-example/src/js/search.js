(function() {
  document.querySelector('[data-search-input]').addEventListener('input', (e) => {
    const query = e.target.value
    const url = document.querySelector('[data-search-form]').getAttribute('action')

    history.replaceState({}, '', '/search?query=' + query)

    fetch(url + '?query=' + query + '&async=true')
      .then(res => res.text())
      .then(html => {
        document.querySelector('main').innerHTML = html
      })
  })
}())
