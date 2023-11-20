import React, { useState, useEffect, useContext } from "react";
import {
  Container,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  TextField,
  TableSortLabel,
  IconButton,
  Grid,
} from "@mui/material";
import ListIcon from "@mui/icons-material/List";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { Record, SortConfig, FilterConfig } from "../types/types";
import ConfirmationModal from "../components/ConfirmationModal";
import { RecordContext } from "../contexts/RecordContext";

const ListPage: React.FC = () => {
  const navigate = useNavigate();
  const { records, setRecords } = useContext(RecordContext);
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: "",
    direction: "",
  });
  const [filterConfig, setFilterConfig] = useState<FilterConfig>({
    name: "",
    phone: "",
    email: "",
    country: "",
    state: "",
    createdDate: "",
    updatedDate: "",
  });
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedRecordId, setSelectedRecordId] = useState<number | null>(null);
  const location = useLocation();
  const recordId = location.state?.recordId;

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/records");
        setRecords(response.data);
      } catch (error) {
        console.error("Error fetching records:", error);
      }
    };

    fetchRecords();
  }, [setRecords]);

  // Functions for sorting and filtering
  const getNestedSortedData = (data: Record[]): Record[] => {
    return [...data].sort((a, b) => {
      // Primary sort by country
      if (a.country < b.country) return -1;
      if (a.country > b.country) return 1;

      // Secondary sort by state within the same country
      if (a.state < b.state) return -1;
      if (a.state > b.state) return 1;

      return 0;
    });
  };
  const getStandardSortedData = (
    data: Record[],
    config: SortConfig
  ): Record[] => {
    if (!config.key || !config.direction) return data;

    return [...data].sort((a, b) => {
      const aValue = a[config.key as keyof Record] || ""; // Ensure key is valid and handle undefined
      const bValue = b[config.key as keyof Record] || "";

      return (
        (config.direction === "asc" ? 1 : -1) *
        (aValue < bValue ? -1 : aValue > bValue ? 1 : 0)
      );
    });
  };

  // Memoized sorted and filtered records
  const sortedRecords = React.useMemo(() => {
    if (sortConfig.key === "geo") {
      return getNestedSortedData(records);
    }
    return getStandardSortedData(records, sortConfig);
  }, [records, sortConfig]);
  const filteredRecords = React.useMemo(() => {
    return sortedRecords.filter(
      (record) =>
        record.name.toLowerCase().includes(filterConfig.name.toLowerCase()) &&
        record.phone.toLowerCase().includes(filterConfig.phone.toLowerCase()) &&
        record.email.toLowerCase().includes(filterConfig.email.toLowerCase()) &&
        record.country
          .toLowerCase()
          .includes(filterConfig.country.toLowerCase()) &&
        record.state.toLowerCase().includes(filterConfig.state.toLowerCase()) &&
        record.createdDate
          .toLowerCase()
          .includes(filterConfig.createdDate.toLowerCase()) &&
        record.updatedDate
          .toLowerCase()
          .includes(filterConfig.updatedDate.toLowerCase())
    );
  }, [sortedRecords, filterConfig]);

  // Event handlers for filter, sort, edit, and delete actions
  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    filterKey: keyof FilterConfig
  ) => {
    setFilterConfig((prevConfig) => ({
      ...prevConfig,
      [filterKey]: e.target.value,
    }));
  };
  const handleSortRequest = (column: keyof Record) => {
    setSortConfig((prevConfig) => ({
      key: column,
      direction:
        prevConfig.key === column && prevConfig.direction === "asc"
          ? "desc"
          : "asc",
    }));
  };
  const handleEdit = (recordId: number): void => {
    navigate(`/edit/${recordId}`);
  };
  const handleDeleteClick = (recordId: number) => {
    setSelectedRecordId(recordId);
    setDeleteModalOpen(true);
  };
  const handleConfirmDelete = async () => {
    if (selectedRecordId !== null) {
      await deleteRecord(selectedRecordId);

      // Compute the new state
      const newRecords = records.filter(
        (record) => record.id !== selectedRecordId
      );

      // Set the new state
      setRecords(newRecords);

      // Reset the selected record ID and close the modal
      setSelectedRecordId(null);
      setDeleteModalOpen(false);
    }
  };
  const deleteRecord = async (recordId: number) => {
    try {
      await axios.delete(`http://localhost:3001/api/records/${recordId}`);
      console.log(`Record with ID: ${recordId} deleted successfully.`);
    } catch (error) {
      console.error("Error deleting record:", error);
    }
  };
  const handleCancelDelete = () => {
    setDeleteModalOpen(false);
  };

  // Render filter input fields for each column
  const renderFilterInputs = () => {
    return (
      <Grid container spacing={2} justifyContent="center">
        {(Object.keys(filterConfig) as Array<keyof FilterConfig>).map((key) => (
          <Grid item key={key}>
            <TextField
              label={`Filter by ${key.charAt(0).toUpperCase() + key.slice(1)}`}
              variant="outlined"
              size="small"
              value={filterConfig[key]}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleFilterChange(e, key as keyof FilterConfig)
              }
            />
          </Grid>
        ))}
      </Grid>
    );
  };

  return (
    <Container maxWidth="lg">
      {/* Filtering UI */}
      {renderFilterInputs()}
      {/* Table displaying filteredRecords */}
      <Paper
        elevation={3}
        sx={{
          mt: 4,
          p: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" component="h1" pb="2%" gutterBottom>
          <ListIcon color="primary" sx={{ mr: 2, verticalAlign: "middle" }} />
          Record List
        </Typography>

        <TableContainer component={Paper}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              {/* Table headers with sorting */}
              <TableRow>
                {/* Data cells */}
                <TableCell>
                  <TableSortLabel
                    active={sortConfig.key === "name"}
                    direction={
                      sortConfig.key === "name"
                        ? sortConfig.direction || "asc"
                        : "asc"
                    }
                    onClick={() => handleSortRequest("name")}
                  >
                    Name
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortConfig.key === "phone"}
                    direction={
                      sortConfig.key === "phone"
                        ? sortConfig.direction || "asc"
                        : "asc"
                    }
                    onClick={() => handleSortRequest("phone")}
                  >
                    Phone
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortConfig.key === "email"}
                    direction={
                      sortConfig.key === "email"
                        ? sortConfig.direction || "asc"
                        : "asc"
                    }
                    onClick={() => handleSortRequest("email")}
                  >
                    Email
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortConfig.key === "country"}
                    direction={
                      sortConfig.key === "country"
                        ? sortConfig.direction || "asc"
                        : "asc"
                    }
                    onClick={() => handleSortRequest("country")}
                  >
                    Country
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortConfig.key === "state"}
                    direction={
                      sortConfig.key === "state"
                        ? sortConfig.direction || "asc"
                        : "asc"
                    }
                    onClick={() => handleSortRequest("state")}
                  >
                    State
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortConfig.key === "createdDate"}
                    direction={
                      sortConfig.key === "createdDate"
                        ? sortConfig.direction || "asc"
                        : "asc"
                    }
                    onClick={() => handleSortRequest("createdDate")}
                  >
                    Created Date
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortConfig.key === "updatedDate"}
                    direction={
                      sortConfig.key === "updatedDate"
                        ? sortConfig.direction || "asc"
                        : "asc"
                    }
                    onClick={() => handleSortRequest("updatedDate")}
                  >
                    Updated Date
                  </TableSortLabel>
                </TableCell>
                <TableCell>Edit</TableCell>
                <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRecords.length > 0 ? (
                filteredRecords.map((row) => (
                  <TableRow
                    key={row.id}
                    style={
                      row.id === recordId
                        ? { backgroundColor: "ButtonHighlight" }
                        : {}
                    }
                  >
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.phone}</TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>{row.country}</TableCell>
                    <TableCell>{row.state}</TableCell>
                    <TableCell>{row.createdDate}</TableCell>
                    <TableCell>{row.updatedDate}</TableCell>
                    <TableCell>
                      <IconButton
                        color="primary"
                        onClick={() => handleEdit(row.id)}
                      >
                        <EditIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      <IconButton
                        color="default"
                        onClick={() => handleDeleteClick(row.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={9} align="center">
                    No records found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <ConfirmationModal
          open={deleteModalOpen}
          title="Confirm Deletion"
          content="Are you sure you want to delete this record?"
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      </Paper>
    </Container>
  );
};

export default ListPage;
