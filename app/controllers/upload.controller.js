module.exports= {
	showUpload: 	showUpload,
}

function showUpload(req, res){
        // render the page and pass in any flash data if it exists
        res.render('pages/upload')//, { message: req.flash('loginMessage') }); 
    }

