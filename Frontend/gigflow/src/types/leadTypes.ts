export interface Lead {
  _id: string;
  name: string;
  email: string;
  status: "new" | "contacted" | "qualified" | "lost";
  source: "website" | "instagram" | "referral";
  createdAt: string;
}

export interface LeadsResponse {
  data: Lead[];
  totalPages: number;
  currentPage: number;
  totalLeads: number;
}