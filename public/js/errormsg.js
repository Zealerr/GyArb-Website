const form = document.getElementsByClassName("userForm")[0]
const usernameInput = document.getElementsByClassName("username")[0]
const passwordInput = document.getElementsByClassName("password")[0]
const confirm_passwordInput = document.getElementsByClassName("confirm_pass")[0]

if (form != undefined) {
  form.addEventListener("submit", function(event) {
    console.log("submition startet")
    event.preventDefault()
    console.log("submition stopped")
    // check if username is longer than 3 letters, has big letter
    username = usernameInput.nodeValue()
    console.log(username)
  })
}

console.log("errormsg.js is loaded")