import mongoose from "mongoose";

const educationSchema = new mongoose.Schema(
  {
    school: { type: String, required: true },
    degree: { type: String, required: true },
    year: { type: String },
  },
  { timestamps: true }
);

const experienceSchema = new mongoose.Schema(
  {
    company: { type: String, },
    role: { type: String,},
    duration: { type: String },
  },
  { timestamps: true }
);

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, },
    description: { type: String },
    link: { type: String },
  },
  { timestamps: true }
);

const certificationSchema = new mongoose.Schema(
  {
    name: { type: String,  },
    issuer: { type: String },
    year: { type: String },
  },
  { timestamps: true }
);

const achievementSchema = new mongoose.Schema(
  {
    title: { type: String },
    description: { type: String },
  },
  { timestamps: true }
);

const resumeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    headline: {
      type: String,
      required: true,
      trim: true,
    },
    summary: {
      type: String,
      required: true,
      trim: true,
    },
    education: [educationSchema],
    experience: [experienceSchema],
    projects: [projectSchema],
    certifications: [certificationSchema],
    achievements: [achievementSchema],
    skills: {
      type: [String],
      default: [],
    },
    resumeFileUrl: {
      type: String,
      default: "",
    },
    githubUrl: {
      type: String,
      default: "",
    },
    linkedinUrl: {
      type: String,
      default: "",
    },
    portfolioUrl: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export const Resume = mongoose.model("Resume", resumeSchema);
