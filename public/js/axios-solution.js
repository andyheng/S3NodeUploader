// Creates the signed URL by hitting the "/sign" route
function signRequest(file, cb) {
  const url = `/sign?file_name=${file.name}&file_type=${file.type}`;
  axios.get(url)
    .then(res => {
      const signedReqObj = res.data;
      cb(signedReqObj);
    })
}

// Handles the uploading
function uploader(file, signedReq, url, cb) {
  //Required if using axios to retain proper header:
  delete axios.defaults.headers.put["Content-Type"];
  //Request
  axios.put(signedReq, file)
    .then(() => {
      cb();
    });
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