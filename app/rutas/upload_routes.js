const express            = require('express'),
	router                 = express.Router();//creo nuevo objeto router
	mainController         = require('../controllers/main.controller');//llamo al archivo main.controller
	eventsController       = require('../controllers/events.controller');
  loginController        = require('../controllers/login.controller');
  passport               = require('passport');
  uploadController			=require('../controllers/uploadController');
 
const fileUpload = require('express-fileupload');


router.use(fileUpload({ safeFileNames: true, preserveExtension: true }));


router.get('/pages/upload',        uploadController.showUpload);

// default options
// router.use(fileUpload({
//   limits: { fileSize: 50 * 1024 * 1024 },
// }));
router.use(fileUpload({ safeFileNames: true, preserveExtension: true }));

router.get('/pages/upload',  function(req, res) {
        res.render('pages/upload');
    });
 
router.post('/pages/upload', function(req, res,err) {
  if (!req.files)
    return res.status(400).send('No files were uploaded.');
  if (err)
  
res.render('pages/upload', { message: req.flash('signupMessage') });

 
 
  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let sampleFile = req.files.sampleFile;
 
  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv('./uploads/filename.jpg', function(err) {
    if (err)
      return res.status(500).send(err);
    
    //res.send('File uploaded!');
    res.render('pages/upload');
  });
});


//proceso logeo
// router.post('/pages/upload', function(req, res) {
//         successRedirect : '/pages/profile', // redirect to the secure profile section
//         failureRedirect : '/pages/login', // redirect back to the signup page if there is an error
//         failureFlash : true // allow flash messages
//     });