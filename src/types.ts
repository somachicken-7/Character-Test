export enum PersonalityColor {
  RED = "RED",       // Dominant, Goal-oriented, Decisive
  YELLOW = "YELLOW",   // Social, Optimistic, Enthusiastic
  BLUE = "BLUE",       // Perfectionist, Analytical, Devoted
  WHITE = "WHITE"      // Peacekeeper, Easy-going, Amiable
}

export interface UserProfile {
  name: string;
  age: number;
  gender: "Laki-laki" | "Perempuan" | "Male" | "Female" | "";
  occupation: string;
}

export interface Question {
  id: number;
  questionId: string; // key for translations
  options: {
    color: PersonalityColor;
    textId: string; // key for translations
  }[];
}

export interface ColorScore {
  color: PersonalityColor;
  percentage: number;
  count: number;
}

export interface AnalysisResult {
  id: string;
  userId?: string;
  date: string;
  userProfile: UserProfile;
  scores: ColorScore[];
  dominantColor: PersonalityColor;
  secondaryColor: PersonalityColor;
  hobbies: string[];
  jobs: string[];
  learningStyle: string;
  isPremium: boolean;
}

export interface UserAccount {
  id: string;
  emailOrPhone: string;
  name: string;
  password?: string;
  provider: "local" | "google";
  createdAt: string;
}

export interface Transaction {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  date: string;
  amount: number;
  paymentMethod: "Bank Transfer" | "Saweria" | "OVO" | "GOPAY";
  status: "Pending" | "Success" | "Failed";
  whatsappNumber: string;
  receiptUrl?: string;
  notes?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  type: "success" | "info" | "warning";
}
