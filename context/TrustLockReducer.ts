// context/TrustLockReducer.ts
import { TrustLockState } from "./initialState";
import { Job, JobOffer, Contract, PaymentPreferences } from "../types/escrow";

export type TrustLockAction =
  | { type: "SWITCH_VIEW"; payload: "client" | "freelancer" }
  | {
      type: "CREATE_JOB";
      payload: Omit<Job, "id" | "client" | "status" | "aiScore" | "files">;
    }
  | { type: "UPDATE_JOB"; payload: Partial<Job> & { id: string } }
  | { type: "DELETE_JOB"; payload: string }
  | { type: "ACCEPT_JOB_OFFER"; payload: string }
  | {
      type: "UPLOAD_FILES";
      payload: {
        jobId: string;
        files: string[];
        userType: "client" | "freelancer";
      };
    }
  | {
      type: "SUBMIT_FOR_VERIFICATION";
      payload: {
        jobToVerify: string;
        notes?: string;
      };
    }
  | { type: "RELEASE_FUNDS"; payload: string }
  | { type: "CREATE_CONTRACT"; payload: Contract }
  | { type: "UPDATE_CONTRACT"; payload: Partial<Contract> & { id: string } }
  | { type: "DELETE_CONTRACT"; payload: string }
  | { type: "UPDATE_PAYMENT_PREFERENCES"; payload: Partial<PaymentPreferences> }
  | { type: "CREATE_JOB_OFFER"; payload: Omit<JobOffer, "id"> }
  | { type: "UPDATE_JOB_OFFER"; payload: Partial<JobOffer> & { id: string } }
  | { type: "DELETE_JOB_OFFER"; payload: string };

export const trustLockReducer = (
  state: TrustLockState,
  action: TrustLockAction
): TrustLockState => {
  switch (action.type) {
    case "SWITCH_VIEW":
      return { ...state, userType: action.payload };

    case "CREATE_JOB":
      const newJob = {
        id: `job-${state.jobs.length + state.freelancerJobs.length + 1}`,
        client: "you.near",
        status: "In Progress" as const,
        aiScore: null,
        files: [],
        ...action.payload,
      };

      // For now, we'll just update the state without DB operations
      // Database operations should be handled in a separate service layer
      // or using React Query mutations for proper async handling

      // Example of how you would save to DB in a real implementation:
      /*
      try {
        await prisma.job.create({
          data: {
            title: newJob.title,
            description: newJob.description,
            requirements: newJob.requirements,
            clientStake: newJob.amount.toString(),
            clientId: "your-user-id", // This would come from auth
            status: "OPEN",
            deadline: new Date(Date.now() + newJob.deadline * 24 * 60 * 60 * 1000),
          },
        });
      } catch (error) {
        console.error("Failed to save job to database:", error);
      }
      */

      return {
        ...state,
        jobs: [...state.jobs, newJob],
      };

    case "UPDATE_JOB":
      return {
        ...state,
        jobs: state.jobs.map((job) =>
          job.id === action.payload.id ? { ...job, ...action.payload } : job
        ),
        freelancerJobs: state.freelancerJobs.map((job) =>
          job.id === action.payload.id ? { ...job, ...action.payload } : job
        ),
      };

    case "DELETE_JOB":
      return {
        ...state,
        jobs: state.jobs.filter((job) => job.id !== action.payload),
        freelancerJobs: state.freelancerJobs.filter(
          (job) => job.id !== action.payload
        ),
      };

    case "ACCEPT_JOB_OFFER":
      // Move a job offer to freelancer jobs
      const acceptedOffer = state.jobOffers.find(
        (offer) => offer.id === action.payload
      );
      if (!acceptedOffer) return state;

      const newFreelancerJob: Job = {
        id: `job-${state.jobs.length + state.freelancerJobs.length + 1}`,
        client: acceptedOffer.client,
        title: acceptedOffer.title,
        amount: acceptedOffer.amount,
        freelancer: "you.near",
        daysLeft: acceptedOffer.duration,
        status: "In Progress" as const,
        aiScore: null,
        files: [],
        requirements: acceptedOffer.description,
        deadline: acceptedOffer.duration,
        description: acceptedOffer.description,
      };

      return {
        ...state,
        freelancerJobs: [...state.freelancerJobs, newFreelancerJob],
        jobOffers: state.jobOffers.filter(
          (offer) => offer.id !== action.payload
        ),
        wallet: {
          ...state.wallet,
          btcBalance: state.wallet.btcBalance - acceptedOffer.required,
          stakes: {
            ...state.wallet.stakes,
            total: state.wallet.stakes.total + acceptedOffer.required,
            atRisk: state.wallet.stakes.atRisk + acceptedOffer.required,
          },
        },
      };

    case "UPLOAD_FILES":
      const { jobId, files, userType } = action.payload;
      const jobsKey = userType === "client" ? "jobs" : "freelancerJobs";

      return {
        ...state,
        [jobsKey]: state[jobsKey].map((job) =>
          job.id === jobId ? { ...job, files: [...job.files, ...files] } : job
        ),
        uploadedFiles: [...state.uploadedFiles, ...files],
      };

    case "SUBMIT_FOR_VERIFICATION":
      const { jobToVerify, notes } = action.payload;

      return {
        ...state,
        freelancerJobs: state.freelancerJobs.map((job) =>
          job.id === jobToVerify
            ? {
                ...job,
                status: "Submitted",
                aiScore: Math.floor(Math.random() * (95 - 60) + 60), // Simulate AI score
                notes,
              }
            : job
        ),
      };

    case "RELEASE_FUNDS":
      const jobToRelease = state.jobs.find((job) => job.id === action.payload);
      if (!jobToRelease) return state;

      return {
        ...state,
        jobs: state.jobs.map((job) =>
          job.id === action.payload ? { ...job, status: "Completed" } : job
        ),
        wallet: {
          ...state.wallet,
          btcBalance: state.wallet.btcBalance - jobToRelease.amount,
        },
      };

    case "CREATE_CONTRACT":
      return {
        ...state,
        contracts: [...state.contracts, action.payload],
      };

    case "UPDATE_CONTRACT":
      return {
        ...state,
        contracts: state.contracts.map((contract) =>
          contract.id === action.payload.id
            ? { ...contract, ...action.payload }
            : contract
        ),
      };

    case "DELETE_CONTRACT":
      return {
        ...state,
        contracts: state.contracts.filter(
          (contract) => contract.id !== action.payload
        ),
      };

    case "UPDATE_PAYMENT_PREFERENCES":
      return {
        ...state,
        paymentPreferences: {
          ...state.paymentPreferences,
          ...action.payload,
        },
      };

    case "CREATE_JOB_OFFER":
      const newJobOffer: JobOffer = {
        id: `offer-${state.jobOffers.length + 1}`,
        ...action.payload,
      };

      return {
        ...state,
        jobOffers: [...state.jobOffers, newJobOffer],
      };

    case "UPDATE_JOB_OFFER":
      return {
        ...state,
        jobOffers: state.jobOffers.map((offer) =>
          offer.id === action.payload.id
            ? { ...offer, ...action.payload }
            : offer
        ),
      };

    case "DELETE_JOB_OFFER":
      return {
        ...state,
        jobOffers: state.jobOffers.filter(
          (offer) => offer.id !== action.payload
        ),
      };

    default:
      return state;
  }
};
