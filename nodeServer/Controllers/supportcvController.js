const Supportcv = require('../Models/supportcvModel')
// const SupportTicket = require('../Models/supportTicketModel')
const ApiFeatures = require('../Utils/ApiFeatures')
const asyncErrorHandler = require('../Utils/asyncErrorHandler');
const CustomError = require('../Utils/CustomError');
const paginationCrossCheck = require('../Utils/paginationCrossCheck')
const UnlinkMultipleFiles = require('../Utils/UnlinkMultipleFiles')
const ProcessMultipleFilesArrayOfObjects = require('../Utils/ProcessMultipleFilesArrayOfObjects')
const HTMLspecialChars = require('../Utils/HTMLspecialChars')
const GetUserDetailsFromHeader = require('../Utils/GetUserDetailsFromHeader')



exports.getSupportcvs = asyncErrorHandler(async (req, res, next) => {
    let features = new ApiFeatures(Supportcv.find(), req.query).countDocuments().filter().sort().limitfields().limitfields2().paginate();

    // Execute the query and get the result
    let supportcv = await features.query;

    // Get the total count of records
    let totalCount = await features.totalCountPromise;

    console.log('RecordsEstimate', totalCount)

    
    res.status(200).json({ 
        status: "success",
        resource: "supportcv",
        RecordsEstimate: totalCount,
        action: "getAll",
        length: supportcv.length,
        data: supportcv
    });
});



exports.getAllSupportcvsOn_ticket_id = asyncErrorHandler(async (req, res, next) => {

    const supportcv = await Supportcv.find({ supportcvTicketId: req.params._id });
    // const supportcv = await Supportcv.findById(req.params._id)
    if(!supportcv){
        const error = new CustomError(`Supportcv with supportcvTicketId ID: ${req.params._id} is not found`, 404)
        //return to prevent further execution of the rest of the codes
        return next(error)
    }


    res.status(200).json({ 
        status : "success",
        resource : "supportcv",
        supportcv : "created",
        lenght : supportcv.length,
        data : supportcv
    })  
})


exports.postSupportcv = asyncErrorHandler(async (req, res, next) => {
    req.body = HTMLspecialChars(req.body)
    if(req.files){
    let filesArrayOfObjects = ProcessMultipleFilesArrayOfObjects(req)
    req.body.files = filesArrayOfObjects
    }
    
    const supportcv = await Supportcv.create(req.body) // create the supportcv

    res.status(201).json({ 
        status : "success",
        resource : "supportcv",
        supportcv : "created",
        lenght : supportcv.length,
        data : supportcv
    })  
})



exports.getSupportcv = asyncErrorHandler(async (req, res, next) => {
    // const movie = await movie.find({_id: req.param._id})
    const supportcv = await Supportcv.findById(req.params._id)
    if(!supportcv){
        const error = new CustomError(`Supportcv with ID: ${req.params._id} is not found`, 404)
        //return to prevent further execution of the rest of the codes
        return next(error)
    }

    res.status(200).json({ 
        status : "success",
        resource : "supportcv",
        supportcv : "created",
        lenght : supportcv.length,
        data : supportcv
    })  
})


exports.patchSupportcv = asyncErrorHandler(async (req, res, next) => {
    req.body = HTMLspecialChars(req.body)
    const supportcv = await Supportcv.findByIdAndUpdate(req.params._id, req.body, {new: true, runValidators: true})
    if(!supportcv){
        const error = new CustomError(`Supportcv with ID: ${req.params._id} is not found`, 404)
        return next(error)
    }

    res.status(200).json({ 
        status : "success",
        resource : "supportcv",
        action: "patch",
        lenght : supportcv.length,
        data : supportcv
    })  
})


exports.putSupportcv = asyncErrorHandler(async (req, res, next) => {
    req.body = HTMLspecialChars(req.body)
    const supportcv = await Supportcv.findByIdAndUpdate(req.params._id, req.body, {new: true, runValidators: true})
    if(!supportcv){
        const error = new CustomError(`Supportcv with ID: ${req.params._id} is not available`, 404)
        return next(error)
    }

    res.status(200).json({ 
        status : "success",
        resource : "supportcv",
        action : "put",
        lenght : supportcv.length,
        data : supportcv
    })  
})



exports.deleteSupportcv = asyncErrorHandler(async (req, res, next) => {
    const supportcv = await Supportcv.findByIdAndDelete(req.params._id, req.body, {new: true, runValidators: true})
    if(!supportcv){
        const error = new CustomError(`Supportcv with ID: ${req.params._id} is not available`, 404)
        return next(error)
    }

    //// unlink multiple files
    if(supportcv.files){
        UnlinkMultipleFiles(supportcv.files, req)
    }

    res.status(204).json({ 
        status : "success",
        resource : "supportcv",
        message: 'deleted'
    })  
})

exports.filesToSupportcvsPath = asyncErrorHandler(async (req, res, next) => {
    SetUploadsfilePathHandler(req, `./uploads/supportcvs`)
    next()
  })

exports.checkBrut = asyncErrorHandler(async (req, res, next) => {
    SetUploadsfilePathHandler(req, `./uploads/supportcvs`)
    next()
  }) 