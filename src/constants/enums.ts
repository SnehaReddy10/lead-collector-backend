export enum Role {
  User = 'user',
  Admin = 'admin',
}

export enum UserCategory {
  Student = 'student',
  Professional = 'professional',
}

export enum LeadSource {
  Organic = 'organic',
  Paid = 'paid',
  Referral = 'referral',
}

export enum InteractionType {
  SIGNUP = 'signup',
  LOGIN = 'login',
  COURSES = 'courses',
  ABOUT = 'about',
  ENROLL_COURSE = 'enroll_course',
  PURCHASE_COURSE = 'purchase_course',
  SUBSCRIBE = 'subscribe',
  INTEREST_COURSE = 'interest_course',
}

export const InteractionScore = {
  SIGNUP: 50,
  LOGIN: 20,
  COURSES: 40,
  ABOUT: 10,
  PURCHASE_COURSE: 100,
  ENROLL_COURSE: 70,
  SUBSCRIBE: 150,
  INTEREST_COURSE: 90,
};

export enum Course {
  PYTHON = 'python',
  JS = 'js',
  TYPESCRIPT = 'typescript',
  NODEJS = 'nodejs',
  EXPRESS = 'express',
  NESTJS = 'nestjs',
}
