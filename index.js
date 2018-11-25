const form = document.querySelector('#contact-form')
const path = form.getAttribute('action')
const responseDiv = document.querySelector('#submit-response')
const submitButton = document.querySelector('#form-submit')

submitButton.blur()
form.blur()
responseDiv.blur()

// const about = document.querySelector('#about-nav')
// const work = document.querySelector('#work-nav')
// const contact = document.querySelector('#contact-nav')

// work.addEventListener('click', {
//   // ...
// })

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

// SMOOTH SCROLL STUFF

function currentYPosition() {
  // Firefox, Chrome, Opera, Safari
  if (self.pageYOffset) return self.pageYOffset
  // Internet Explorer 6 - standards mode
  if (document.documentElement && document.documentElement.scrollTop)
    return document.documentElement.scrollTop
  // Internet Explorer 6, 7 and 8
  if (document.body.scrollTop) return document.body.scrollTop
  return 0
}

function elmYPosition(eID) {
  var elm = document.getElementById(eID)
  var y = elm.offsetTop
  var node = elm
  while (node.offsetParent && node.offsetParent != document.body) {
    node = node.offsetParent
    y += node.offsetTop
  }
  return y
}

function smoothScroll(eID) {
  var startY = currentYPosition()
  var stopY = elmYPosition(eID)
  var distance = stopY > startY ? stopY - startY : startY - stopY
  if (distance < 100) {
    scrollTo(0, stopY)
    return
  }
  var speed = Math.round(distance / 100)
  if (speed >= 20) speed = 20
  var step = Math.round(distance / 25)
  var leapY = stopY > startY ? startY + step : startY - step
  var timer = 0
  if (stopY > startY) {
    for (var i = startY; i < stopY; i += step) {
      setTimeout('window.scrollTo(0, ' + leapY + ')', timer * speed)
      leapY += step
      if (leapY > stopY) leapY = stopY
      timer++
    }
    return
  }
  for (var i = startY; i > stopY; i -= step) {
    setTimeout('window.scrollTo(0, ' + leapY + ')', timer * speed)
    leapY -= step
    if (leapY < stopY) leapY = stopY
    timer++
  }
  return false
}
