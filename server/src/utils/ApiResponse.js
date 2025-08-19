export class ApiResponse{
    constructor(statusCode=200, message="Success", data=null, meta=null) {
        this.success=statusCode>=200 && statusCode<300;
        this.statusCode=statusCode;
        this.message=message;
        this.data=data;
        if(meta) {
            this.meta=meta;
        }
    }
}   