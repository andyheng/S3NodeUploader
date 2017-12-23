//Dependencies
const express = require("express");
const router = express.Router();
const aws = require("aws-sdk");

//Private env variables
const accessKey = process.env.AWS_ACCESS_KEY;
const secretKey = process.env.AWS_SECRET_KEY;
const bucketName = process.env.S3_BUCKET;

//Create a signed URL with AWS S3
router.get("/sign", (req, res) => {
  //Config
  aws.config.update({
    accessKeyId: accessKey,
    secretAccessKey: secretKey,
    region: "ca-central-1"
  });
  //New service object
  const s3 = new aws.S3();
  const fileName = req.query["file_name"];
  const fileType = req.query["file_type"];
  const params = {
    Bucket: bucketName,
    Key: fileName,
    ContentType: fileType,
    Expires: 60,
    ACL: "public-read"
  }

  //Get and return a pre-signed URL and URL to upload to
  s3.getSignedUrl("putObject", params, (err, data) => {
    if (err) {
      return res.send(err);
    }
    res.json({
      signed_request: data,
      url: `https://s3.ca-central-1.amazonaws.com/${S3_BUCKET}/${req.query.file_name}`
    });
  });
});

module.exports = router;