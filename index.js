const form = document.querySelector('#contact-form')
const path = form.getAttribute('action')
const responseDiv = document.querySelector('#submit-response')

form.addEventListener('submit', e => {
  e.preventDefault()

  const data = {}
  const formElements = Array.from(form)
  formElements.pop()
  formElements.map(input => (data[input.name] = input.value))

  fetch(path, {
    mode: 'cors',
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(res => res.json())
    .then(json => (responseDiv.innerHTML = json.message))
})
