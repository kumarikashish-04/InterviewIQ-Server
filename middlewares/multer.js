const multer=require("multer")


const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"public")
    },
    fileName: function(req,file,cb){
        const filename = Date.now()+" "+file.originalName;
        cb(null,filename)
    }
})


const upload= multer({
    storage,
    limits:{fileSize:5*1024*1024},//5MB
});




module.exports={upload,storage}