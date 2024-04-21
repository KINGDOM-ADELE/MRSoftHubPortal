const Feed = require('../Models/FeedModel')
const User = require('../Models/userModel')
const ApiFeatures = require('../Utils/ApiFeatures')
const asyncErrorHandler = require('../Utils/asyncErrorHandler');
const CustomError = require('../Utils/CustomError');
const paginationCrossCheck = require('../Utils/paginationCrossCheck')
const UnlinkMultipleFiles = require('../Utils/UnlinkMultipleFiles')
const ProcessMultipleFilesArrayOfObjects = require('../Utils/ProcessMultipleFilesArrayOfObjects')
const HTMLspecialChars = require('../Utils/HTMLspecialChars')
const GetUserDetailsFromHeader = require('../Utils/GetUserDetailsFromHeader')
const limitUserDetailsServeFields = require('../Utils/limitUserDetailsServeFields')





exports.getFeeds = asyncErrorHandler(async (req, res, next) => {

    let features = new ApiFeatures(Feed.find(), req.query).filter().sort().limitfields().limitfields2().paginate()
 

       // const query = Feed.aggregate([
    //     {
    //       $lookup: {
    //         from: 'users', // Use the actual collection name here
    //         localField: 'createdBy',
    //         foreignField: '_id',
    //         as: 'userDetails',
    //       },
    //     },
    //   ]);

    // const features = new ApiFeatures(query, req.query)
    // .aggfilter()
    // .aggsort()
    // .limitfields()
    // .limitfields2()
    // .paginate();


    let feeds = await features.query

    req.query.page && paginationCrossCheck(feeds.length)

    res.status(200).json({ 
        status : "success",
        resource : "feed",
        lenght : feeds.length,
        data : feeds
       })  
})

exports.postFeed = asyncErrorHandler(async (req, res, next) => {
    const testToken = req.headers.authorization
    const decodedToken =  await GetUserDetailsFromHeader(testToken)
    req.body.createdBy = decodedToken._id
    req.body = HTMLspecialChars(req.body)

    if(req.files){
    let filesArrayOfObjects = ProcessMultipleFilesArrayOfObjects(req)
    req.body.files = filesArrayOfObjects
    }
    
    const feed = await Feed.create(req.body) // create the support

    res.status(201).json({ 
        status : "success",
        resource : "feed",
        lenght : feed.length,
        data : feed
    })  
})


exports.getFeed = asyncErrorHandler(async (req, res, next) => {
    // const movie = await movie.find({_id: req.param._id})
    const feed = await Feed.findById(req.params._id)
    if(!feed){
        const error = new CustomError(`feed with ID: ${req.params._id} is not found`, 404)
        //return to prevent further execution of the rest of the codes
        return next(error)
    }



    const user = await User.findById(feed.createdBy);
    if (!user) {
        const error = new CustomError(`User with ID: ${feed.createdBy} is not found`, 404);
        return next(error);
    }
    limitedUser = limitUserDetailsServeFields(user)


    feed.createdBy = limitedUser

    res.status(200).json({ 
        status : "success",
        resource : "feed",
        lenght : feed.length,
        data : feed
    })  
})

exports.patchFeed = asyncErrorHandler(async (req, res, next) => {
    req.body = HTMLspecialChars(req.body)

    const feed = await Feed.findByIdAndUpdate(req.params._id, req.body, {new: true, runValidators: true})
    if(!feed){
        const error = new CustomError(`Feed with ID: ${req.params._id} is not found`, 404)
        return next(error)
    }



    res.status(200).json({ 
        status : "success",
        resource : "feed",
        action: "patch",
        lenght : feed.length,
        data : feed
    })  
})

exports.putFeed = asyncErrorHandler(async (req, res, next) => {
    req.body = HTMLspecialChars(req.body)
    const feed = await Feed.findByIdAndUpdate(req.params._id, req.body, {new: true, runValidators: true})
    if(!feed){
        const error = new CustomError(`Feed with ID: ${req.params._id} is not available`, 404)
        return next(error)
    }



    res.status(200).json({ 
        status : "success",
        resource : "feed",
        action : "put",
        lenght : feed.length,
        data : feed
    })  
})

exports.deleteFeed = asyncErrorHandler(async (req, res, next) => {
    const feed = await Feed.findByIdAndDelete(req.params._id, req.body, {new: true, runValidators: true})
    if(!feed){
        const error = new CustomError(`Feed with ID: ${req.params._id} is not available`, 404)
        return next(error)
    }

        //// unlink multiple files
        if(feed.files){
            UnlinkMultipleFiles(feed.files, req)
        }

    // res.status(204).json({ 
    //     status : "success",
    //     resource : "feed",
    //     message: 'deleted'
    // })  

    res.status(200).json({  
        status : "success",
        resource : "feed",
        message: 'deleted'
    }) 
})


// exports.getFeedByStack = asyncErrorHandler(async (req, res, next) => {
//     //allows us access to the aggregation pipeline
//     const mystack = req.params.stack
//     const feed = await Feed.aggregate([
//         {$unwind: '$stack'},
//         { $group: {
//             _id: '$stack',
//             feedCount: {$sum: 1},
//             feed:{$push: '$name'}
//         }},
//         {$addFields: {stack: "$_id"}}, //adds a firld stack
//         {$project: {_id: 0}}, // removes the _id field from selection by setting it to zero
//         {$sort: {feedCount: -1}}, // sort in decending order by setting -1
//         { $match: {stack: mystack}},
//     ]) 

//     res.status(200).json({ 
//         status : "success",
//         resource : "feed",
//         action : "aggregatation",
//         lenght : feed.length,
//         data: feed
//     }) 
// })


// exports.getFeedByTechnology = asyncErrorHandler(async (req, res, next) => {
//     //allows us access to the aggregation pipeline
//     const mytechnology = req.params.technology
//     const feed = await Feed.aggregate([
//         {$unwind: '$technology'},
//         { $group: {
//             _id: '$technology',
//             feedCount: {$sum: 1},
//             feeds:{$push: '$name'}
//         }},
//         {$addFields: {technology: "$_id"}}, //adds a field technology
//         {$project: {_id: 0}}, // removes the _id field from selection by setting it to zero
//         {$sort: {feedCount: -1}}, // sort in decending order by setting -1
//         {$match: {technology: mytechnology}},


//     ]) 

//     res.status(200).json({ 
//         status : "success",
//         resource : "feed",
//         action : "aggregatation",
//         lenght : feed.length,
//         data: feed
//     }) 
// })