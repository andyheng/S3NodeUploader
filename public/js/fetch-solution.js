//Fetch solution

document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("img").value = "";
})

//Get the signed request
function signRequest(file, cb) {
  const url = `/sign?file_name=${file.name}&file_type=${file.type}`;
  fetch(url)
    .then(res => {
      return res.json();
    })
    .then(data => {
      cb(data);
    })
}

//Handles the uploader
function uploader(file, signedReq, url, cb) {
  fetch(signedReq, {
    method: "PUT",
    body: file
  })
    .then(() => {
      cb();
    })
}

// Checks for event on file upload
function listenForImage() {
  document.getElementById("img").addEventListener("change", function() {
    const file = document.getElementById("img").files[0];
    if (!file) return;
    signRequest(file, function(signed) {
      uploader(file, signed.signed_request, signed.url, function() {
        document.getElementById("preview").src = signed.url;
      })
    })
  })
}

listenForImage();