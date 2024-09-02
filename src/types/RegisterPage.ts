export type FormValues = {
  // Step 1
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  state: string;
  country: string;
  password: string;
  linkedIn: string;
  twitter: string;

  // Step 2
  organizationName: string;
  role: string;
  requiredAssistance: string;
  requiredProjectAssistance: string;
  provideService: string;
  skill: string;

  // Step 3
  reasons: string[];
  heardAbout: string;
  seeFaith: string;
  interests: string[];

  // Step 4
  conferencePlatform: string;
  platform: string;
  platformThoughts: string;
  channelThoughts: string;
  additionalQuestions: string;
  interestedActivities: string[];
};

export type FormFieldName = keyof FormValues;
export type FormFieldValue = FormValues[FormFieldName];

export type FormStep = {
  id: string;
  name: string;
  title: string;
  component: React.FC;
  schema: Partial<FormValues>;
};

export type TextInputData = {
  name: FormFieldName;
  label: string;
  placeholder: string;
  onBlur?: (
    e: React.FocusEvent<HTMLInputElement, Element>,
    ...args: any[]
  ) => void;
};

export type CheckboxData = {
  name: FormFieldName;
  label: string;
  values: string[];
};

export type UserProfile = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  state: string;
  country: string;
  password: string;
  linkedIn: string;
  twitter: string;
};

export const FORM_CHECKBOX_OPTIONS: Partial<FormValues> = {
  reasons: [
    "Mentorship/Prayer/Free Guidance",
    "Projects/Service Providers",
    "Investors and Investments",
  ],
  interests: [
    "Artificial Intelligence",
    "Investors / Investments",
    "Builders",
    "Cybersecurity",
    "Governance",
    "Legal / Compliance",
    "Marketplaces",
    "Exchanges",
    "Education & Training",
    "Blockchain",
    "Interoperability",
    "Bitcoin",
    "Crypto",
    "NFTs",
    "DeFi",
    "dApps",
    "Tokenization",
    "Tokenomics",
    "DAOs",
    "Metaverse",
    "Gaming",
    "Digital Missions",
    "Social Impact",
  ],
  interestedActivities: [
    "Community Management",
    "Hosting a gathering in your local city",
    "Branding and website development for CiCB",
    "Developing a pitch deck to share with our community partners",
    "Fundraising towards hiring paid roles to run this as an organized global movement that can serve thousands of people in the near future",
    "Generating content (articles, blog posts, videos, etc.)",
    "Not interested now. Remind me next quarter :)",
  ],
};
