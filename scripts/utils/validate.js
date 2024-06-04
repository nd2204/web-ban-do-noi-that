export function is_valid_email(email) {
  const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
  return regex.test(email);
}

export function is_valid_phone(phoneNr) {
  const regex = /^[0-9]{4,15}$/
  return regex.test(phoneNr);
}

export function mark_invalid_input(elem) {
  elem.style.borderColor = "#f1828d";
  elem.style.backgroundColor = "#f4efef";
}
