export type HospitalStatus = "Available" | "Busy";

export interface Hospital {
  _id?: string;
  name: string;
  address?: string;
  city: string;
  state?: string;
  specialties?: string[];
  status: HospitalStatus;
  contact: string;
  distance?: string;
  rating?: number;
  reviews?: number;
  fee?: number;
}
