export function loadJson(path) {
  let xhttp = new XMLHttpRequest();
  let data;

  xhttp.onload = function() {
    if (this.readyState == 4 && this.status == 200) {
      data = JSON.parse(this.response)
    }
  }

  xhttp.open("GET", path, false);
  xhttp.send();

  return data;
};

