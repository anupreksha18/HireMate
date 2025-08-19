export class ApiError extends Error {
    constructor(statusCode,message,errors=[],stack="")
    {
        this.statusCode=statusCode;
        this.message=message;
        this.error=Array.isArray(errors) ? errors : [errors];
        this.success=false;

        if(stack) {
            this.stack=stack;
        }
        else{
            Error.captureStackTrace(this, this.constructor);
        }
    }
}