import { ApiError } from "../utils/ApiError.js";

export const notFound = (req, res, next) => {
    next(new ApiError(404,`Route not found :${req.method} ${req.originalUrl}`));
}


export const errorHandler = (err, req, res, next) => {
    const statusCode=err.statusCode || 500;
    res.status(statusCode).json({
        success: false,
        message: err.message || "Internal Server Error",    
        error: err.error || [],
        stack: process.env.NODE_ENV === "production" ? null : err.stack
    });
}
