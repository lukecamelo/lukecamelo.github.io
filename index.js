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
  submitButton.innerHTML = '<i class="fas fa-check text-white"></i>'
}

function callback() {
  setTimeout(() => {
    submitButton.classList.remove('validate')
    submitButton.innerHTML = 'Submit'
  }, 1250)
}
