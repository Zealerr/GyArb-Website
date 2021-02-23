const form = document.getElementsByClassName("signupForm")[0]
const usernameInput = document.getElementsByClassName("username")[0]
const passwordInput = document.getElementsByClassName("password")[0]
const confirm_passwordInput = document.getElementsByClassName("confirm_pass")[0]

if (form != undefined) {
  console.log("form exists")
  form.addEventListener("submit", function(event) {
    event.preventDefault()
    console.log("submition stopped")
    errormsg = []
    if (check_username() != undefined) {
      errormsg.push(["username",check_username()])
    }
    if (check_password() != undefined) {
    errormsg.push(["password",check_password()])
    }
    if (check_confirm_pass() != undefined) {
    errormsg.push(["confirm",check_confirm_pass()])
    }
    console.log(errormsg)
  })
}

function addError(type, errormsg) {
  console.log(errormsg.length)
  for (i = 0; errormsg.length; i++) {
    error = `
    <div class="errormsg ${type}-error">
      <p> ${errormsg[i]}
    </div>
    `
    if (type == "username") {

    }

  }
}

function check_username() {
  // check if username is longer than 3 letters, has big letter
  username = usernameInput.value
  if (username.length < 3) {
    return "username is too short."
  }
  if (username.length > 16) {
    return "username is too long."
  }
}

function check_password() {
  password = passwordInput.value
  if (password.length < 8) {
    return "password is too short."
  }
  if (username.length > 24) {
    return "password is too long."
  }
  capCounter = 0
  numCounter = 0
  for (i = 0; i < password.length; i++) {
    if (letterisNumber(password, i)) {
      numCounter++
    }
    if (letterIsCapital(password, i)) {
      capCounter++
    }
  }
  if (capCounter == 0) {
    return "password must contain at least 1 capitalized letter."
  }
  if (numCounter == 0) {
    return "password must contain at least 1 number"
  }
}

function check_confirm_pass() {
  password = passwordInput.value
  confirm_password = confirm_passwordInput.value

  if (confirm_password != password) {
    return "Passwords are not the same"
  }
}

function letterIsCapital(word, index){
  return /[A-Z]/.test(word.charAt(index))
}

function letterisNumber(word, index){
  return /[0-9]/.test(word.charAt(index))
}


console.log("errormsg.js is loaded")
console.log(/[^ -~]/.test(""))