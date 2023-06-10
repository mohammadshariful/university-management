import { Request, Response, NextFunction } from "express";
import config from "../../config";
import { IGenericErrorMessage } from "../../interfaces/error";
import handleValidationError from "../../errors/handleValidationError";
import ApiError from "../../errors/ApiError";


const globalErrorHandler = (err, req: Request, res: Response, next: NextFunction) => {

    let statusCode = 500;
    let message = 'Something went wrong';
    let errorMessage: IGenericErrorMessage[] = [];

    if (err?.name === 'ValidationError') {
        const simplifiedError = handleValidationError(err)
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessage = simplifiedError.errorMessages
    } else if (err instanceof ApiError) {
        statusCode = err?.statusCode;
        message = err?.message;
        errorMessage = err?.message ? [
            {
                path: '',
                message: err?.message
            }
        ] : []

    } else if (err instanceof Error) {
        message = err?.message;
        errorMessage = err?.message ? [{
            path: '',
            message: err?.message
        }] : []
    }

    res.status(statusCode).json({
        success: false,
        message,
        errorMessage,
        stack: config.env !== 'production' ? err?.stack : undefined
    })

    next()
}

export default globalErrorHandler;