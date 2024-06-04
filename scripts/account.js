import { is_valid_email, mark_invalid_input } from "./utils/validate.js"

function alertEntries(data) {
  let content = ""
  data.entries().forEach((pair) => {
    content += `${pair[0]}: ${pair[1]}\n`
  });
  alert(content)
}

document.addEventListener("DOMContentLoaded", function() {
  const login_form = document.getElementById('login-form')
  const signup_form = document.getElementById('signup-form')

  if (login_form) {
    login_form.addEventListener("submit", function(event) {
      event.preventDefault();
      let data = new FormData(login_form)
      console.log(data.entries())
      alertEntries(data);
    })
  }

  if (signup_form) {
    let email = document.querySelector('#email');
    console.log(email);

    email.onkeyup = function() {
      let original_style = email.style;
      if (!is_valid_email(email.value)) {
        mark_invalid_input(email)
      }
      else {
        email.style = original_style;
      }
    }

    signup_form.addEventListener("submit", function(event) {
      event.preventDefault()
      if (!is_valid_email(email.value)) {
        email.focus()
        return;
      }
      let data = new FormData(signup_form)
      alertEntries(data)
      return;
    })
  }
})
