const menuButton = document.querySelector('#menu-button')
const menuItems = document.querySelector('#menu-items')
const menuIcon = document.querySelector('#menu-icon')

menuButton.addEventListener('click', e => {
  e.preventDefault()
  menuItems.classList.toggle('hidden')
  menuItems.classList.toggle('flex')

  menuIcon.classList.toggle('fa-ellipsis')
  menuIcon.classList.toggle('fa-times')
})