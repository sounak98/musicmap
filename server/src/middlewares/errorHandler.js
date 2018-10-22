/**
 * error handling middleware module
 */

const handleErrors = (error, req, res, next) => {
    if(error){
        let request = (Object.keys(req.query).length === 0)? req.body : req.query;
        let resp = Object.assign({}, request); 
        let message = error.message ? error.message : error;
        //remove general 'Error:' if it's thrown by us
        if(message.includes('<Custom Error')){
            message = message.replace(/Error:/,'').trim();
        }
        resp.success = false;
        resp.message = message;
        res.status(500).json(resp);
        next();
    }
}


export { handleErrors } 