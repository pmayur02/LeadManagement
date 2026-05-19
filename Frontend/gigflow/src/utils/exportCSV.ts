import type { Lead } from "../types/leadTypes";

export const exportToCSV = (data: Lead[]) => {
  const headers = ["Name", "Email", "Status", "Source", "Created At"];

  const rows = data.map((lead) => [
    lead.name,
    lead.email,
    lead.status,
    lead.source,
    new Date(lead.createdAt).toLocaleDateString()
  ]);

  const csvContent =
    [headers, ...rows]
      .map((row) => row.join(","))
      .join("\n");

  const blob = new Blob([csvContent], {
    type: "text/csv;charset=utf-8;"
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "leads.csv");

  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
};