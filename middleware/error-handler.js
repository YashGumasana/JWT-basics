import CustomAPIError from '../error/custom-error.js';

const errorHandlerMiddleware = (err, req, res, next) => {
    if (err instanceof CustomAPIError) {
        return res.status(err.statusCode).json({ msg: err.message })
    }
    console.log(err);
    return res.status(500).send('Somthing went wrong try agian later');

}

export default errorHandlerMiddleware;