const express = require('express');
const fileUpload = require('express-fileupload');
const appFileUpload = express();


  

// default options
appFileUpload.use(fileUpload());
appFileUpload.get('/pages/upload', function(req,res){
res.render('pages/upload', { msg:''});
});

appFileUpload.post('/pages/upload', function(req, res) {

  //res.render('pages/upload', { msg:''});
  if (!req.files)
    return res.status(400).send('No files were uploaded.');
    //res.render('pages/upload');
 
  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let sampleFile = req.files.sampleFile;
  if(!sampleFile)
    res.render('pages/upload', { msg:'Seleccione un archivo'});
  //Use the mv() method to place the file somewhere on your server
  sampleFile.mv('./uploads/filename.jpg', function(err) {
    if (err)
      return res.status(500).send(err);
 
    //res.send('File uploaded!');
    res.render('pages/upload', { msg:'Archivo subido'});
  });

});

//exporto router para que sea accesible
module.exports = appFileUpload;