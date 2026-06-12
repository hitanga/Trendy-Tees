export interface Inquiry {
  id: string;
  name: string;
  email: string;
  serviceInterest: string;
  message: string;
  status: 'Pending' | 'Reviewing' | 'Contacted' | 'Completed';
  createdAt: string;
}

export interface BespokeOrder {
  id: string;
  userId: string;
  style: 'Blazer' | 'T-Shirt' | 'Knitwear';
  fabric: string;
  color: string;
  size: 'S' | 'M' | 'L' | 'XL' | 'Custom';
  customMeasurements?: {
    chest: number;
    waist: number;
    length: number;
  };
  printedText?: string;
  price: number;
  status: 'Drafting' | 'Reviewing' | 'Tailoring' | 'Completed';
  createdAt: string;
}

export interface Appointment {
  id: string;
  userId: string;
  serviceType: 'Bespoke Design' | 'Custom Printing' | 'Corporate Consultation';
  date: string;
  time: string;
  notes: string;
  status: 'Scheduled' | 'Confirmed' | 'Completed' | 'Cancelled';
  createdAt: string;
}

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  mfaEnabled: boolean;
  mfaSecret?: string;
  recoveryCodes?: string[];
  theme: 'light' | 'dark';
  preferredStyle?: string;
}
