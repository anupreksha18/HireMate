import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Resume } from "../models/resume.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";


export const createOrUpdateResume = asyncHandler(async (req, res, next) => {
  const { headline, summary, education, experience, skills, resumeFileUrl, githubUrl, linkedinUrl, portfolioUrl } = req.body;

  let resume = await Resume.findOne({ user: req.user.id });

  if (resume) {
    // Update only if provided
    if (headline) resume.headline = headline;
    if (summary) resume.summary = summary;
    if (education) resume.education = education;
    if (experience) resume.experience = experience;
    if (skills) resume.skills = skills;
    if (resumeFileUrl) resume.resumeFileUrl = resumeFileUrl;
    if (githubUrl) resume.githubUrl = githubUrl;
    if (linkedinUrl) resume.linkedinUrl = linkedinUrl;
    if (portfolioUrl) resume.portfolioUrl = portfolioUrl;

    await resume.save();
    return res.status(200).json(new ApiResponse(200, "Resume updated successfully",resume));
  } else {
    // Create new resume
    resume = new Resume({
      user: req.user.id,
      headline,
      summary,
      education,
      experience,
      skills,
      resumeFileUrl,
      githubUrl,
      linkedinUrl,
      portfolioUrl,
    });
    await resume.save();
    return res.status(201).json(new ApiResponse(201, "Resume created successfully", resume));
  }
});

// Get logged-in user's resume
export const getMyResume = asyncHandler(async (req, res, next) => {
  const resume = await Resume.findOne({ user: req.user.id });

  if (!resume) {
    return next(new ApiError(404,"Resume not found"));
  }

  return res
    .status(200)
    .json(new ApiResponse( 200, "Resume fetched successfully",resume));
});

//delete resume
export const deleteResume=asyncHandler(async(req,res,next)=>{
    const resume=await Resume.findOneAndDelete({user:req.user.id});
    if(!resume){
        return next(new ApiError(404,"Resume not found"));
    }
    return res.status(200).json(new ApiResponse(200,'Resume deleted successfully',{}));
});

