const asyncHandler = (requestHandler)=>{
    return (req,res, next)=>{
        Promise.resolve(requestHandler(req,res,next))
        .catch((err)=> next(err))
    }
}

export {asyncHandler}

//requestHandler are just async functions needed to be handled with try/catch wrapper or promises.
//HigherOrder Function : It can acept functions as parameters and can return them.
// const asyncHandler = (fn)=> { async (req,res,next) => {
//     try{
//         await fn(req, res, next)
//     } catch(err) {
//         res.status(err.code || 500).json({
//             success: false,
//             message: err.message
//         })
//     }
// }}

