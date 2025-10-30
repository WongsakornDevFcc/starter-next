import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { UsersResponse } from "@/types/userType";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "email", headerName: "Email", width: 200 },
  { field: "created_at", headerName: "Created At", width: 150 },
  {
    field: "updated_at",
    headerName: "Updated At",
    width: 150,
  },
  {
    field: "user_role",
    headerName: "User Role",
    description: "This column shows the role of the user",
    width: 160,
  },
];

const paginationModel = { page: 0, pageSize: 5 };

export default function DataTable({ rowData }: { rowData: UsersResponse | null }) {
  return (
    <Paper sx={{ height: "100%", width: "100%", padding: 2 }}>
      <DataGrid
        rows={rowData?.users || []}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        // checkboxSelection
        sx={{ border: 0 }}
      />
    </Paper>
  );
}
