import { useState, useEffect } from "react";
import type { Lead } from "../../types/leadTypes";

import {
    getAllLeads,
    updateLead,
    deleteLead
} from "../../services/leadService";

import DashboardLayout from "../../components/layouts/DashboardLayout";

import { useDebounce } from "../../hooks/useDebounce";

import { exportToCSV } from "../../utils/exportCSV";

const Leads = () => {

    const [leads, setLeads] = useState<Lead[]>([]);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const [search, setSearch] = useState("");

    const [status, setStatus] = useState("");

    const [source, setSource] = useState("");

    const [page, setPage] = useState(1);

    const [totalPages, setTotalPages] = useState(1);

    // EDIT MODE
    const [editLeadId, setEditLeadId] = useState("");

    const [sort, setSort] = useState("latest");

    // INLINE EDIT FORM
    const [editFormData, setEditFormData] = useState({
        name: "",
        email: "",
        status: "",
        source: ""
    });

    const debouncedSearch = useDebounce(search, 500);

    // FETCH LEADS
    const fetchLeads = async () => {

        try {

            setLoading(true);

            const response = await getAllLeads(
                page,
                debouncedSearch,
                status,
                source,
                sort
            );

            if (response?.data?.statusCode !== 200) {

                setError(response.data.message);

            }

            setLeads(response.data.data);

            setTotalPages(response.data.meta.totalPages);

        } catch (error: any) {

            setError(
                error.response?.data?.message ||
                "Failed to fetch leads"
            );

        } finally {

            setLoading(false);

        }
    };

    useEffect(() => {

        fetchLeads();

    }, [page, debouncedSearch, status, source,sort]);

    return (

<DashboardLayout>

  <div className="max-w-7xl mx-auto">

   
    <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800">
      Leads
    </h1>


    <div className="bg-white p-4 rounded-2xl shadow-sm mb-6">

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

      
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 p-3 rounded-lg text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        />

        
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border border-gray-300 p-3 rounded-lg text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        >
          <option value="">All Status</option>
          <option value="new">New</option>
          <option value="contacted">Contacted</option>
          <option value="qualified">Qualified</option>
          <option value="lost">Lost</option>
        </select>

      
        <select
          value={source}
          onChange={(e) => setSource(e.target.value)}
          className="border border-gray-300 p-3 rounded-lg text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        >
          <option value="">All Source</option>
          <option value="website">Website</option>
          <option value="instagram">Instagram</option>
          <option value="referral">Referral</option>
        </select>

      
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="border border-gray-300 p-3 rounded-lg text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        >
          <option value="latest">Latest</option>
          <option value="oldest">Oldest</option>
        </select>

      </div>

    </div>

   
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">

      <button
        onClick={() => exportToCSV(leads)}
        className="bg-green-600 hover:bg-green-700 transition text-white px-5 py-2.5 rounded-lg text-sm sm:text-base"
      >
        Export CSV
      </button>

    </div>


    {
      loading && (
        <div className="bg-blue-100 text-blue-700 px-4 py-3 rounded-lg mb-4">
          Loading leads...
        </div>
      )
    }

   
    {
      error && (
        <div className="bg-red-100 text-red-600 px-4 py-3 rounded-lg mb-4">
          {error}
        </div>
      )
    }

  
    {
      !loading && leads.length === 0 && (
        <div className="bg-gray-100 text-gray-600 px-4 py-3 rounded-lg">
          No leads found
        </div>
      )
    }

    
    {
      !loading && leads.length > 0 && (

        <div className="overflow-x-auto bg-white rounded-2xl shadow-md">

          <table className="min-w-full text-sm">

            <thead className="bg-gray-100 text-gray-700">

              <tr>
                <th className="p-4 text-left font-semibold">Name</th>
                <th className="p-4 text-left font-semibold">Email</th>
                <th className="p-4 text-left font-semibold">Status</th>
                <th className="p-4 text-left font-semibold">Source</th>
                <th className="p-4 text-left font-semibold">Created</th>
                <th className="p-4 text-left font-semibold">Actions</th>
              </tr>

            </thead>

            <tbody>

              {
                leads.map((lead, idx) => (

                  <tr
                    key={idx}
                    className="border-t hover:bg-gray-50 transition"
                  >

                  
                    <td className="p-4">
                      {
                        editLeadId === lead._id ? (
                          <input
                            value={editFormData.name}
                            onChange={(e) =>
                              setEditFormData({
                                ...editFormData,
                                name: e.target.value
                              })
                            }
                            className="border border-gray-300 p-2 rounded-lg w-full"
                          />
                        ) : (
                          lead.name
                        )
                      }
                    </td>

                    
                    <td className="p-4">
                      {
                        editLeadId === lead._id ? (
                          <input
                            value={editFormData.email}
                            onChange={(e) =>
                              setEditFormData({
                                ...editFormData,
                                email: e.target.value
                              })
                            }
                            className="border border-gray-300 p-2 rounded-lg w-full"
                          />
                        ) : (
                          lead.email
                        )
                      }
                    </td>

                  
                    <td className="p-4">
                      {
                        editLeadId === lead._id ? (
                          <select
                            value={editFormData.status}
                            onChange={(e) =>
                              setEditFormData({
                                ...editFormData,
                                status: e.target.value
                              })
                            }
                            className="border border-gray-300 p-2 rounded-lg"
                          >
                            <option value="new">New</option>
                            <option value="contacted">Contacted</option>
                            <option value="qualified">Qualified</option>
                            <option value="lost">Lost</option>
                          </select>
                        ) : (
                          <span className="capitalize">
                            {lead.status}
                          </span>
                        )
                      }
                    </td>

                   
                    <td className="p-4">
                      {
                        editLeadId === lead._id ? (
                          <select
                            value={editFormData.source}
                            onChange={(e) =>
                              setEditFormData({
                                ...editFormData,
                                source: e.target.value
                              })
                            }
                            className="border border-gray-300 p-2 rounded-lg"
                          >
                            <option value="website">Website</option>
                            <option value="instagram">Instagram</option>
                            <option value="referral">Referral</option>
                          </select>
                        ) : (
                          <span className="capitalize">
                            {lead.source}
                          </span>
                        )
                      }
                    </td>

                 
                    <td className="p-4 whitespace-nowrap">
                      {new Date(lead.createdAt).toLocaleDateString()}
                    </td>

               
                    <td className="p-4">

                      <div className="flex flex-wrap gap-2">

                        {
                          editLeadId === lead._id ? (
                            <>
                              <button
                                onClick={async () => {
                                  try {

                                    await updateLead(
                                      lead._id,
                                      editFormData
                                    );

                                    alert("Lead updated");

                                    setEditLeadId("");

                                    fetchLeads();

                                  } catch (error: any) {

                                    alert(
                                      error.response?.data?.message ||
                                      "Update failed"
                                    );
                                  }
                                }}
                                className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg text-xs sm:text-sm"
                              >
                                Save
                              </button>

                              <button
                                onClick={() => {
                                  setEditLeadId("");
                                }}
                                className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-2 rounded-lg text-xs sm:text-sm"
                              >
                                Cancel
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                onClick={() => {

                                  setEditLeadId(lead._id);

                                  setEditFormData({
                                    name: lead.name,
                                    email: lead.email,
                                    status: lead.status,
                                    source: lead.source
                                  });

                                }}
                                className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded-lg text-xs sm:text-sm"
                              >
                                Edit
                              </button>

                              <button
                                onClick={async () => {

                                  const confirmDelete =
                                    window.confirm(
                                      "Are you sure?"
                                    );

                                  if (!confirmDelete) return;

                                  try {

                                    await deleteLead(
                                      lead._id
                                    );

                                    alert("Lead deleted");

                                    fetchLeads();

                                  } catch (error: any) {

                                    alert(
                                      error.response?.data?.message ||
                                      "Delete failed"
                                    );
                                  }

                                }}
                                className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg text-xs sm:text-sm"
                              >
                                Delete
                              </button>
                            </>
                          )
                        }

                      </div>

                    </td>

                  </tr>

                ))
              }

            </tbody>

          </table>

        </div>

      )
    }

   
    <div className="flex flex-wrap justify-center items-center mt-8 gap-2">

   
      <button
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
        className="px-4 py-2 border rounded-lg bg-white hover:bg-gray-100 disabled:opacity-50"
      >
        Prev
      </button>

    
      {
        [...Array(totalPages)].map((_, index) => (

          <button
            key={index}
            onClick={() => setPage(index + 1)}
            className={`px-4 py-2 border rounded-lg transition ${
              page === index + 1
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white hover:bg-gray-100"
            }`}
          >
            {index + 1}
          </button>

        ))
      }

     
      <button
        disabled={page === totalPages}
        onClick={() => setPage(page + 1)}
        className="px-4 py-2 border rounded-lg bg-white hover:bg-gray-100 disabled:opacity-50"
      >
        Next
      </button>

    </div>

  </div>

</DashboardLayout>
    );
};

export default Leads;