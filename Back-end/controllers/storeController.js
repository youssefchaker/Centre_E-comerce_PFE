const Store = require('../models/store');
const User = require('../models/user');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const APIFeatures = require('../utils/apiFeatures');
const ErrorHandler = require('../utils/errorHandler');
const cloudinary = require('cloudinary')



// Create new store   =>   /api/mall/store/new
exports.newStore = catchAsyncErrors(async (req, res, next) => {

    const existingStore = await Store.findOne({name:req.body.name});
    if (existingStore) {

        return next(new ErrorHandler('this store already exist',404));

        }
      /*const result = await cloudinary.v2.uploader.upload(req.body.avatar,{
          folder: 'stores'
      })*/
    //const {name,phoneNumber,email,buisnessDomaine,address,city,postalCode,country,subscriptionPrice} = req.body;
    
    
     image = req.body.avatar

    
        const result = await cloudinary.v2.uploader.upload(image, {
            folder: 'stores'
        });

        const imagesLinks = {
            public_id: result.public_id,
            url: result.secure_url
        };
        console.log(imagesLinks);
    

    req.body.avatar = imagesLinks
    req.body.user=req.user.id;




    const store = await Store.create(
        req.body
       
    
    );
    const user = await User.findByIdAndUpdate({ _id: req.user.id },{ role: 'Seller' });

    res.status(201).json({
        success: true,
        store,
        user
    })
})

// Get all stores   =>   /api/mall/stores?keyword=bershka
exports.getStores = catchAsyncErrors(async (req, res, next) => {


    const resPerPage = 50;
    const storesCount = await Store.countDocuments();

    const apiFeatures = new APIFeatures(Store.find(), req.query)
        .search()
        .filter()
        .pagination(resPerPage);

    const stores = await apiFeatures.query;

    res.status(200).json({
        success: true,
        storesCount,
        resPerPage,
        stores
    })

})

// Admin Get all stores   =>   /api/mall/admin/stores
exports.getStoresAdmin = catchAsyncErrors(async (req, res, next) => {

    const stores = await Store.find();
    if (!stores){ return next(new ErrorHandler('there are no',404))}
    res.status(200).json({
        success: true,
        storescount: stores.length,
        stores
    })

})

// Get single store    =>   /api/mall/store/:id
exports.getSingleStore = catchAsyncErrors(async (req, res, next) => {

    const store = await Store.findById(req.params.id);

    if (!store) {
        return next(new ErrorHandler('store not found', 404));
    }


    res.status(200).json({
        success: true,
        store
    })

})

// user and admin Update store   =>   /api/mall/user/store/:id   &&   /api/mall/admin/store/:id
exports.updateStore = catchAsyncErrors(async (req, res, next) => {
    let store = await Store.findById(req.params.id);

    if (!store) {
        return next(new ErrorHandler('store not found', 404));
    }
  
    image = req.body.avatar
 
    
    const result = await cloudinary.v2.uploader.upload(image, {
        folder: 'stores'
    });

    const imagesLinks = {
        public_id: result.public_id,
        url: result.secure_url
    };
    console.log(imagesLinks);


    req.body.avatar = imagesLinks

    
    store = await Store.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        store
    })

})

// admin Delete store   =>   /api/mall/admin/store/:id
exports.deleteStore = catchAsyncErrors(async (req, res, next) => {
    const store = await Store.findById(req.params.id);
    if (!store) {
        return next(new ErrorHandler('store not found', 404));
    }
    await store.remove();

    res.status(200).json({
        success: true,
        message: 'store is deleted.'
    })

})


// Get profile store    =>   /api/mall/mystore
exports.getProfileStore = catchAsyncErrors(async (req, res, next) => {

    const store = await Store.findOne({ user: req.user.id });

    if (!store) {
        return next(new ErrorHandler('store not found', 404));
    }


    res.status(200).json({
        success: true,
        store
    })

})

