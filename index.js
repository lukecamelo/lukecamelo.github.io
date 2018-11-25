const form = document.querySelector('#contact-form')
const path = form.getAttribute('action')
const responseDiv = document.querySelector('#submit-response')
const submitButton = document.querySelector('#form-submit')

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
    .then(json => {
      if (json.message === 'Success!') {
        validate()
        formElements.forEach(field => {
          field.value = ''
        })
        callback()
      } else {
        submitError()
      }
    })
    .catch(err => console.log('error sending message: ', err))
})

// ANIMATED BUTTON STUFF

submitButton.addEventListener('click', function() {
  submitButton.classList.add('onclic')
})

function validate() {
  submitButton.classList.remove('onclic')
  submitButton.classList.add('validate')
}

function submitError() {
  submitButton.classList.remove('onclic')
  submitButton.classList.add('submit-error')
}

function callback() {
  setTimeout(() => {
    submitButton.classList.remove('validate')
    submitButton.classList.remove('submit-error')
  }, 1250)
}

// BUTTON FOCUS STUFF

function handleFirstTab(e) {
  if (e.keyCode === 9) {
    document.body.classList.add('user-is-tabbing')
    window.removeEventListener('keydown', handleFirstTab)
  }
}

window.addEventListener('keydown', handleFirstTab)
