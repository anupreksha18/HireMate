import {asyncHandler} from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
 ///SUCCESS
export const pingServer = asyncHandler(async (req, res) => {
    return res
    .status(200).json(new ApiResponse(200,{server:"HireMate Server is running"},"Ping successful "));
}); 

//ERROR
export const failServer = asyncHandler(async (req, res) => {
    throw new ApiError(500, "TEST error from ping controller");
})