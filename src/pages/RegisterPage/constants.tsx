import { AssistStep, CreateStep, FinalStep, InterestStep } from "./Steps";
import { FormStep } from "@/types/RegisterPage";

export const STEPS: FormStep[] = [
  {
    id: "step1",
    name: "Personal Info",
    title: "Create an account!",
    component: CreateStep,
    schema: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      state: "",
      country: "",
      password: "",
      linkedIn: "",
      twitter: "",
    },
  },
  {
    id: "step2",
    name: "Business/Service Needs",
    title: "How can CW3 assist you?",
    component: AssistStep,
    schema: {
      organizationName: "",
      role: "",
      requiredAssistance: "",
      requiredProjectAssistance: "",
      provideService: "",
      skill: "",
    },
  },
  {
    id: "step3",
    name: "Interest/Expertise/Engagement",
    title: "Interest in CW3?",
    component: InterestStep,
    schema: {
      reasons: [],
      heardAbout: "",
      seeFaith: "",
      interests: [],
    },
  },
  {
    id: "step4",
    name: "Community Engagement",
    title: "You are almost done!",
    component: FinalStep,
    schema: {
      conferencePlatform: "",
      platform: "",
      platformThoughts: "",
      channelThoughts: "",
      additionalQuestions: "",
      interestedActivities: [],
    },
  },
];
