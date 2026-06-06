import { Schema, model, models } from "mongoose";


interface ISubmission { 
  fullName: string;
  email: string;
  phone: string;
  service: string;
  preferredDate: string;
  message: string;
  createdAt: Date;
  reviewed: boolean;
}

const submissionSchema = new Schema<ISubmission>({
  fullName: {
    type: String,
    required: [true, "Full name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  phone: {
    type: String,
    required: [true, "Phone number is required"],
  },
  service: {
    type: String,
    required: [true, "Service is required"],
  },
  preferredDate: {
    type: String,
    required: [true, "Preferred date is required"],
  },
  message: {
    type: String,
    required: [true, "Message is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  reviewed: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

const Submission = models.Submission || model<ISubmission>("Submission", submissionSchema);

export default Submission;