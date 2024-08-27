import React, { useState } from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CommentIcon from "@mui/icons-material/Comment";

const responseData = [
  { status: "Approved", count: 45 },
  { status: "Rejected", count: 25 },
  { status: "Pending", count: 30 },
];

const responseTimeData = [
  { day: "Mon", avgTime: 2.5 },
  { day: "Tue", avgTime: 1.8 },
  { day: "Wed", avgTime: 3.2 },
  { day: "Thu", avgTime: 2.1 },
  { day: "Fri", avgTime: 2.7 },
  { day: "Sat", avgTime: 1.5 },
  { day: "Sun", avgTime: 1.2 },
];

const COLORS = ["#4CAF50", "#FF9800", "#2196F3", "#E91E63", "#9C27B0"];

const MyResponses: React.FC = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedResponse, setSelectedResponse] = useState<any>(null);

  const handleOpenDialog = (response: any) => {
    setSelectedResponse(response);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const MetricCard: React.FC<{
    title: string;
    value: string | number;
    icon: React.ReactNode;
    color: string;
  }> = ({ title, value, icon, color }) => (
    <Card elevation={3} sx={{ height: "100%" }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="subtitle2" color="textSecondary">
              {title}
            </Typography>
            <Typography variant="h4" sx={{ my: 1, color }}>
              {value}
            </Typography>
          </Box>
          <Box
            sx={{
              backgroundColor: `${color}22`,
              borderRadius: "50%",
              p: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );

  const recentResponses = [
    {
      id: 1,
      applicant: "John Doe",
      amount: "$15,000",
      status: "Approved",
      time: "2 hours ago",
    },
    {
      id: 2,
      applicant: "Jane Smith",
      amount: "$8,000",
      status: "Pending",
      time: "5 hours ago",
    },
    {
      id: 3,
      applicant: "Mike Johnson",
      amount: "$25,000",
      status: "Rejected",
      time: "1 day ago",
    },
    {
      id: 4,
      applicant: "Sarah Williams",
      amount: "$12,000",
      status: "Approved",
      time: "2 days ago",
    },
    {
      id: 5,
      applicant: "Robert Brown",
      amount: "$20,000",
      status: "Pending",
      time: "3 days ago",
    },
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography
        variant="h6"
        component="h1"
        gutterBottom
        fontWeight="bold"
        sx={{
          borderBottom: "2px solid",
          borderColor: "#C9E7CB",
          paddingBottom: 2,
          marginBottom: 3,
          textTransform: "uppercase",
          letterSpacing: 1.2,
          color: "#007A33", // Example darker green
        }}
      >
        My Responses
      </Typography>
      <Grid container spacing={3}>
        {/* Key Metrics */}
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Total Responses"
            value={100}
            icon={<CommentIcon sx={{ color: COLORS[0], fontSize: 40 }} />}
            color={COLORS[0]}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Approval Rate"
            value="45%"
            icon={<CheckCircleIcon sx={{ color: COLORS[1], fontSize: 40 }} />}
            color={COLORS[1]}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Rejection Rate"
            value="25%"
            icon={<CancelIcon sx={{ color: COLORS[2], fontSize: 40 }} />}
            color={COLORS[2]}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Avg. Response Time"
            value="2.1 days"
            icon={<AccessTimeIcon sx={{ color: COLORS[3], fontSize: 40 }} />}
            color={COLORS[3]}
          />
        </Grid>

        {/* Response Status Chart */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: "100%" }}>
            <Typography
              variant="h6"
              component="h1"
              gutterBottom
              fontWeight="bold"
              sx={{
                borderBottom: "2px solid",
                borderColor: "#C9E7CB",
                paddingBottom: 2,
                marginBottom: 3,
                textTransform: "uppercase",
                letterSpacing: 1.2,
                color: "#007A33", // Example darker green
              }}
            >
              Response Status
            </Typography>
            <Box sx={{ height: 350 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={responseData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="count"
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {responseData.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>

        {/* Response Time Chart */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: "100%" }}>
            <Typography
              variant="h6"
              component="h1"
              gutterBottom
              fontWeight="bold"
              sx={{
                borderBottom: "2px solid",
                borderColor: "#C9E7CB",
                paddingBottom: 2,
                marginBottom: 3,
                textTransform: "uppercase",
                letterSpacing: 1.2,
                color: "#007A33", // Example darker green
              }}
            >
              Average Response Time by Day
            </Typography>
            <Box sx={{ height: 350 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={responseTimeData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="avgTime" fill={COLORS[4]}>
                    {responseTimeData.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>

        {/* Recent Responses */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography
              variant="h6"
              component="h1"
              gutterBottom
              fontWeight="bold"
              sx={{
                borderBottom: "2px solid",
                borderColor: "#C9E7CB",
                paddingBottom: 2,
                marginBottom: 3,
                textTransform: "uppercase",
                letterSpacing: 1.2,
                color: "#007A33", // Example darker green
              }}
            >
              Recent Responses
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Applicant</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Time</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {recentResponses.map((response) => (
                    <TableRow key={response.id}>
                      <TableCell>
                        <Box display="flex" alignItems="center">
                          <Avatar sx={{ mr: 2 }}>
                            {response.applicant[0]}
                          </Avatar>
                          {response.applicant}
                        </Box>
                      </TableCell>
                      <TableCell>{response.amount}</TableCell>
                      <TableCell>
                        <Chip
                          label={response.status}
                          color={
                            response.status === "Approved"
                              ? "success"
                              : response.status === "Rejected"
                              ? "error"
                              : "warning"
                          }
                          size="small"
                        />
                      </TableCell>
                      <TableCell>{response.time}</TableCell>
                      <TableCell>
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => handleOpenDialog(response)}
                        >
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>

      {/* Response Details Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Response Details</DialogTitle>
        <DialogContent>
          {selectedResponse && (
            <Box>
              <Typography variant="body1">
                <strong>Applicant:</strong> {selectedResponse.applicant}
              </Typography>
              <Typography variant="body1">
                <strong>Amount:</strong> {selectedResponse.amount}
              </Typography>
              <Typography variant="body1">
                <strong>Status:</strong> {selectedResponse.status}
              </Typography>
              <Typography variant="body1">
                <strong>Time:</strong> {selectedResponse.time}
              </Typography>
              <Typography variant="body1" sx={{ mt: 2 }}>
                <strong>Additional Comments:</strong>
              </Typography>
              <Typography variant="body2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MyResponses;
