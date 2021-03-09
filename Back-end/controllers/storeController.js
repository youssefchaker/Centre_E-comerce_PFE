const Store = require('../models/store');
const User = require('../models/user');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const APIFeatures = require('../utils/apiFeatures');
const ErrorHandler = require('../utils/errorHandler');



// Create new store   =>   /api/mall/store/new
exports.newStore = catchAsyncErrors(async (req, res, next) => {

    const existingStore = await Store.findOne({name:req.body.name});
    if (existingStore) {

        return next(new ErrorHandler('this store already exist',404));

        }
    req.body.user=req.user.id;
    const store = await Store.create(req.body);
    const user = await User.findByIdAndUpdate({ _id: req.user.id },{ role: 'Seller' });

    res.status(201).json({
        success: true,
        store,
        user
    })
})

// Get all stores   =>   /api/mall/stores?keyword=bershka
exports.getStores = catchAsyncErrors(async (req, res, next) => {


    const resPerPage = 9;
    const storesCount = await Store.countDocuments();

    const apiFeatures = new APIFeatures(Store.find(), req.query)
        .search()
        .filter()
        .pagination(resPerPage);

    const stores = await apiFeatures.query;

    res.status(200).json({
        success: true,
        storesCount,
        stores
    })

})

// Admin Get all stores   =>   /api/mall/stores
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
