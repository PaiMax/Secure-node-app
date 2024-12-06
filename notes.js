    const express=require('express');
    const notesRoutes=require('./router/notesRoutes');
    //const fileUpload = require('express-fileupload');
    const bodyParser=require('body-parser');
    const app=express();
    const port=4000;
    app.use(bodyParser.json({extended:false}));
    // app.use(fileUpload({
    //     limits: {
    //         fileSize: 10000000, // Around 10MB
    //     },
    //     abortOnLimit: true,
    // }));
    app.use(express.static('public'));
    app.use('/',notesRoutes);

    // app.post('/upload', (req, res) => {
    //     // Check if a file is included in the request
    //     if (!req.files || Object.keys(req.files).length === 0) {
    //         return res.status(400).send('No files were uploaded.');
    //     }
    
    //     // Access the uploaded file
    //     const uploadedFile = req.files.image; // 'image' is the name of the file field in the request
    
    //     // Define the upload directory and file path
    //     const uploadDir = path.join(__dirname, 'uploads');
    //     const uploadPath = path.join(uploadDir, uploadedFile.name);
    
    //     // Ensure the uploads directory exists
    //     if (!fs.existsSync(uploadDir)) {
    //         fs.mkdirSync(uploadDir);
    //     }
    
    //     // Move the file to the upload directory
    //     uploadedFile.mv(uploadPath, (err) => {
    //         if (err) {
    //             return res.status(500).send(err.message);
    //         }
    //         res.send(`File uploaded successfully: ${uploadedFile.name}`);
    //     });
    // });








    app.listen(port,(err)=>{
        if(!err){
            console.log(`Server is running on ${port}`);

        }
        else
        console.log("error occured = ",err);
        
    });
    