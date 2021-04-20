
const mailchimp =  require("@mailchimp/mailchimp_marketing");
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');


mailchimp.setConfig({
    apiKey: "3a5fda0ae93e82b580bdbbf53df72da3-us1",
    server: "us1",
  });







// user  subscribe to the news letter Mailchip.com   =>   api/mall/newsletter/subscribe

exports.subscribe = catchAsyncErrors(async (req, res, next) => {

    const {email, status } = req.body;    
    

    const response = await mailchimp.lists.addListMember("356dd18afc", {
        email_address: email,
        status: status,
      });

      
    if (!response) {
        return next(new ErrorHandler('cant subscribe right now, please try later !', 404));
    }

        res.status(201).json({
            success: true,
            message:"Thanks for Subscribing to our Newsletter !",
            response
        })
    
})

