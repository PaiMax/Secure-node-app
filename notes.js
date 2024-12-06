    const express=require('express');
    const notesRoutes=require('./router/notesRoutes');
    const bodyParser=require('body-parser');
    const cors=require('cors');
    const app=express();
    const port=4000;
    app.use(cors());


    app.use(bodyParser.json({extended:false}));
     app.use(express.static('public'));
    app.use('/',notesRoutes);
    app.listen(port,(err)=>{
        if(!err){
            console.log(`Server is running on ${port}`);

        }
        else
        console.log("error occured = ",err);
        
    });
    