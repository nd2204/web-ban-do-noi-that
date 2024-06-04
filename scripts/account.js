document.addEventListener("DOMContentLoaded", function() {
  const login_form = document.getElementById('login-form')
  const signup_form = document.getElementById('signup-form')

  if (login_form) {
    login_form.addEventListener("submit", function() {
      let data = new FormData(login_form)
      console.log(data)
    })
  }
})
