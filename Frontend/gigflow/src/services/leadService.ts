import axiosInstance from "../api/axios";


export const getAllLeads = async(  page = 1,search = "",status = "",source = "",sort="latest")=>{
    try {
        const response = await axiosInstance.get(`/leads/get-leads?page=${page}&search=${search}&status=${status}&source=${source}&sort=${sort}`);
        return response
    } catch (error:any) {
        throw error;
    }
}

export const createLead = async (payload: any) => {
  const response = await axiosInstance.post("/leads/create", payload);
  return response.data;
};



export const updateLead = async (leadId: string,payload: any) => {
  const response = await axiosInstance.put(`/leads/${leadId}`,payload);
  return response.data;
};

export const deleteLead = async (leadId: string) => {
  const response = await axiosInstance.delete(`/leads/${leadId}`);
  return response.data;
};