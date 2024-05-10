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
const sendEmail = require('../Utils/email')


let DATE = new Date()
let YY = DATE.getFullYear()

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


    
    ///
    //4 SEND THE TOKEN TO THE USER VIA EMAIL 



    const message = `<html><body>
    <p>
    Hi ${req.body.name}</p> 
    
    Your resume (CV) has been received succesffully.
    <p>
    We will notify you about your next step, please await our response.
    </p>
    
    
    <p>
    For information on ${process.env.ORG_NAME} visit <a href='${process.env.ORG_WEBSIT}'>${process.env.ORG_WEBSIT}</a>
    </p>
    
    WITH ${process.env.ORG_NAME.toUpperCase()}, </br>
    YOUR FUTURE AS A TECH ENGINEER IS BRIGHT.
    
    <p>
    Thank you for choosing ${process.env.ORG_NAME}.
    </p>
    
    <p>
    ${req.protocol}://${HOST}
    </p>
   
    <p>
    ${YY} ${process.env.ORG_NAME}, Ensuring the best of service.
    </p>

    </body></html>`;



    // let emailverificationMessage;
    let tries = 0
    let success = 0
    let errormessage = ''
    let Subject= ''
    const sendAnEmail = async () => {
        tries += 1
        try{
            await sendEmail({
                email: req.body.email,
                subject: "Resume received",
                message: message
            })
            Subject = "Resume received",
            success += 1
        }
        catch(err){
            // destroy the saved token and then throw error 
            errormessage =`There is an error sending email. Please try again later`

        }
    }
    while(tries < 5 && success < 1){
        await sendAnEmail () // allows 5 tries to send email before proceeding
    }
     console.log( `proceeding after attempts: ${tries} and success: ${success}`)
     if (success < 1){
        // return next(new CustomError(errormessage, 500))
     }
    ///

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