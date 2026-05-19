export interface JwtUserPayload {
  id?: string;
  email?: string;
  role?: string;
  adminDetail?:string;
}

export interface ResponseBody {
  statusCode: number;
  message: string;
  data: any;
}

export interface LeadPayload {
  name: string;
  email: string;
  status?: "new" | "contacted" | "qualified" | "lost";
  source: "website" | "instagram" | "referral";
  createdBy: string;
}