import { Lead } from "../Models/LeadModel";
import { LeadPayload } from "../Utilities/interfaces";

// Create Lead
export const createLead = async (userId:string,payload: LeadPayload) => {
  try {

    if (!payload.name ||!payload.email ||!payload.source ||!userId) {
      return {
        statusCode: 400,
        message: "name, email, source or userId required.",
        data: null
      };
    }

    const existingLead = await Lead.findOne({email: payload.email});

    if (existingLead?._id) {
      return {
        statusCode: 400,
        message: "Lead already exists.",
        data: null
      };
    }

    payload.createdBy = userId;

    const newLead = await Lead.create(payload);

    const formattedData = {
        _id: newLead._id,
        name: newLead.name,
        email: newLead.email,
        status: newLead.status,
        source: newLead.source,
        createdBy: newLead.createdBy
        
    }

    if (!newLead?._id) {
      return {
        statusCode: 500,
        message: "Failed to insert lead.",
        data: null
      };
    }

    return {
      statusCode: 201,
      message: "Lead created successfully.",
      data: formattedData
    };

  } catch (error) {
    throw error;
  }
};

// Get All Leads
export const getAllLeads = async (query: any) => {
  try {
    const {
      page = 1,
      limit = 10,
      status,
      source,
      search,
      sort = "latest"
    } = query;

    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);

    // -------------------------
    // 1. Build Filter
    // -------------------------
    const filter: any = {};

    if (status) {
      filter.status = status;
    }

    if (source) {
      filter.source = source;
    }

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } }
      ];
    }

    // -------------------------
    // 2. Sorting
    // -------------------------
    let sortOption: any = { createdAt: -1 };

    if (sort === "oldest") {
      sortOption = { createdAt: 1 };
    }

    // -------------------------
    // 3. Pagination
    // -------------------------
    const skip = (pageNumber - 1) * limitNumber;

    // -------------------------
    // 4. DB Queries
    // -------------------------
    const [leads, total] = await Promise.all([
      Lead.find(filter)
        .populate("createdBy", "name email role")
        .sort(sortOption)
        .skip(skip)
        .limit(limitNumber),

      Lead.countDocuments(filter)
    ]);

    // -------------------------
    // 5. Metadata
    // -------------------------
    const totalPages = Math.ceil(total / limitNumber);

    return {
      statusCode: 200,
      message: "Leads fetched successfully",
      data: leads,
      meta: {
        totalRecords: total,
        totalPages,
        currentPage: pageNumber,
        pageSize: limitNumber
      }
    };

  } catch (error) {
    throw error;
  }
};

// Get Single Lead
export const getSingleLead = async (leadId: string) => {
  try {

    if(!leadId){
      return {
        statusCode: 400,
        message: "LeadId is required.",
        data: null
      };
    }

    const lead = await Lead.findOne({ _id: leadId }).populate("createdBy", "name email");

    if (!lead?._id) {
      return {
        statusCode: 404,
        message: "Lead not found.",
        data: null
      };
    }

    return {
      statusCode: 200,
      message: "Lead fetched successfully.",
      data: lead
    };

  } catch (error) {
    throw error;
  }
};

// Update Lead
export const updateLead = async (leadId: string,payload: LeadPayload) => {
  try {

        if(!leadId){
      return {
        statusCode: 400,
        message: "LeadId is required.",
        data: null
      };
    }

    const existingLead = await Lead.findOne({ _id: leadId });

    if (!existingLead?._id) {
      return {
        statusCode: 404,
        message: "Lead not found.",
        data: null
      };
    }

    const updatedLead = await Lead.updateOne({ _id: leadId },{ $set: payload },{runValidators: true});

    return {
      statusCode: 200,
      message: "Lead updated successfully.",
      data: updatedLead
    };

  } catch (error) {
    throw error;
  }
};

// Delete Lead
export const deleteLead = async (leadId: string) => {
  try {

    if(!leadId){
      return {
        statusCode: 400,
        message: "LeadId is required.",
        data: null
      };
    }

    const existingLead = await Lead.findOne({ _id: leadId });

    if (!existingLead?._id) {
      return {
        statusCode: 404,
        message: "Lead not found.",
        data: null
      };
    }

    await Lead.findByIdAndDelete(leadId);

    return {
      statusCode: 200,
      message: "Lead deleted successfully.",
      data: null
    };

  } catch (error) {
    throw error;
  }
};