const multer  = require('multer');
const mkdirp = require('mkdirp');


// تنظیمات فایل اصلی
const sliderStore = multer.diskStorage({

    destination : ( req , file , callback) => {

        let dir = `./upload/slider`;
        // ----------------------------------------------

        mkdirp(dir).then(answer => callback( null , dir)).catch(error => callback( error , dir))

    },
    filename : ( req , file , callback ) => {
        callback( null , Date.now() +  file.originalname )
    }
});

const productsStore = multer.diskStorage({

    destination : ( req , file , callback) => {

        let dir = `./upload/products`;
        // ----------------------------------------------

        mkdirp(dir).then(answer => callback( null , dir)).catch(error => callback( error , dir))

    },
    filename : ( req , file , callback ) => {
        callback( null , Date.now() +  file.originalname )
    }
});


const products = multer({
    storage : productsStore,
});



const slider = multer({
    storage : sliderStore,
});

module.exports =  {
    products,
    categories,
    slider
}

