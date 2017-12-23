document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("img").value = "";
})

//XHR is annoying but it's the first one that worked
function signRequest(file, cb) {
  const url = `/sign?file_name=${file.name}&file_type=${file.type}`;
  const xhr = new XMLHttpRequest();
  xhr.open("GET", url);
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const response = JSON.parse(xhr.responseText);
      cb(response);
    }
  }
  xhr.send()
}

function uploader(file, signedReq, url, cb) {
  let xhr = new XMLHttpRequest();
  xhr.open("PUT", signedReq);
  xhr.setRequestHeader('x-amz-acl', 'public-read');
  xhr.onload = function() {
    if (xhr.status === 200) {
      cb();
    }
  }
  xhr.send(file);
}

// Checks for event on file upload
function listenForImage() {
  document.getElementById("img").addEventListener("change", function() {
    const file = document.getElementById("img").files[0];
    console.log(file);
    if (!file) return;
    signRequest(file, function(signed) {
      uploader(file, signed.signed_request, signed.url, function() {
        document.getElementById("preview").src = signed.url;
      })
    })
  })
}

listenForImage();