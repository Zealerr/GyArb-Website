const form = document.getElementsByClassName("signupForm")[0]
const usernameInput = document.getElementsByClassName("username")[0]
const passwordInput = document.getElementsByClassName("password")[0]
const confirm_passwordInput = document.getElementsByClassName("confirm_pass")[0]

form.addEventListener("submit", function(event) {
  event.preventDefault()

  // check if username is longer than 3 letters, has big letter
  username = usernameInput.nodeValue()
  console.log(username)
})