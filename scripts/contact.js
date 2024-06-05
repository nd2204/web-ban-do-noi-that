import { is_valid_email, mark_invalid_input } from "./utils/validate.js"

function alertEntries(data) {
  let content = ""
  data.entries().forEach((pair) => {
    content += `${pair[0]}: ${pair[1]}\n`
  });
  alert(content)
}

document.addEventListener("DOMContentLoaded", () => {
  const contact_form = document.getElementById('contact-form')

  if (contact_form) {
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

    contact_form.addEventListener("submit", function(event) {
      event.preventDefault()
      if (!is_valid_email(email.value)) {
        email.focus()
        return;
      }
      let data = new FormData(contact_form)
      alertEntries(data)
      return;
    })
  }
})
