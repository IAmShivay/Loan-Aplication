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
  LineChart,
  Line,
} from "recharts";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EventIcon from "@mui/icons-material/Event";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

const COLORS = ["#4CAF50", "#2196F3", "#FF9800", "#E91E63", "#9C27B0"];

const callRequestsData = [
  { status: "Pending", count: 15 },
  { status: "Scheduled", count: 8 },
  { status: "Completed", count: 22 },
];

const dailyRequestsData = [
  { day: "Mon", requests: 5 },
  { day: "Tue", requests: 8 },
  { day: "Wed", requests: 12 },
  { day: "Thu", requests: 10 },
  { day: "Fri", requests: 7 },
  { day: "Sat", requests: 3 },
  { day: "Sun", requests: 2 },
];

const weeklyTrendData = [
  { week: "Week 1", requests: 30 },
  { week: "Week 2", requests: 35 },
  { week: "Week 3", requests: 25 },
  { week: "Week 4", requests: 40 },
];

const CallsRequested: React.FC = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<any>(null);

  const handleOpenDialog = (request: any) => {
    setSelectedRequest(request);
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

  const pendingCallRequests = [
    {
      id: 1,
      applicant: "John Doe",
      loanAmount: "$15,000",
      requestTime: "2 hours ago",
      preferredTime: "2023-05-10 14:00",
    },
    {
      id: 2,
      applicant: "Jane Smith",
      loanAmount: "$8,000",
      requestTime: "5 hours ago",
      preferredTime: "2023-05-11 10:00",
    },
    {
      id: 3,
      applicant: "Mike Johnson",
      loanAmount: "$25,000",
      requestTime: "1 day ago",
      preferredTime: "2023-05-12 16:00",
    },
    {
      id: 4,
      applicant: "Sarah Williams",
      loanAmount: "$12,000",
      requestTime: "2 days ago",
      preferredTime: "2023-05-13 11:00",
    },
    {
      id: 5,
      applicant: "Robert Brown",
      loanAmount: "$20,000",
      requestTime: "3 days ago",
      preferredTime: "2023-05-14 15:00",
    },
  ];

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
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
        Calls Requested
      </Typography>
      <Grid container spacing={3}>
        {/* Key Metrics */}
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Total Requests"
            value={45}
            icon={<PhoneInTalkIcon sx={{ color: COLORS[0], fontSize: 40 }} />}
            color={COLORS[0]}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Pending Calls"
            value={15}
            icon={<AccessTimeIcon sx={{ color: COLORS[1], fontSize: 40 }} />}
            color={COLORS[1]}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Scheduled Calls"
            value={8}
            icon={<EventIcon sx={{ color: COLORS[2], fontSize: 40 }} />}
            color={COLORS[2]}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Avg. Response Time"
            value="1.5 days"
            icon={<TrendingUpIcon sx={{ color: COLORS[3], fontSize: 40 }} />}
            color={COLORS[3]}
          />
        </Grid>

        {/* Call Requests Status Chart */}
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
              Call Requests Status
            </Typography>
            <Box sx={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={callRequestsData}
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
                    {callRequestsData.map((entry, index) => (
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

        {/* Daily Requests Chart */}
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
              Daily Call Requests
            </Typography>
            <Box sx={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={dailyRequestsData}
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
                  <Bar dataKey="requests" fill={COLORS[4]}>
                    {dailyRequestsData.map((entry, index) => (
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

        {/* Weekly Trend Chart */}
        <Grid item xs={12}>
          <Paper sx={{ p: 10, height: 500 }}>
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
              Weekly Call Requests Trend
            </Typography>
            <Box sx={{ height: "100%" }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={weeklyTrendData}
                  margin={{
                    top: 2,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="requests"
                    stroke={COLORS[0]}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>

        {/* Pending Call Requests */}
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
              Pending Call Requests
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Applicant</TableCell>
                    <TableCell>Loan Amount</TableCell>
                    <TableCell>Request Time</TableCell>
                    <TableCell>Preferred Time</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {pendingCallRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell>
                        <Box display="flex" alignItems="center">
                          <Avatar sx={{ mr: 2 }}>{request.applicant[0]}</Avatar>
                          {request.applicant}
                        </Box>
                      </TableCell>
                      <TableCell>{request.loanAmount}</TableCell>
                      <TableCell>{request.requestTime}</TableCell>
                      <TableCell>{request.preferredTime}</TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          size="small"
                          onClick={() => handleOpenDialog(request)}
                        >
                          Schedule Call
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

      {/* Schedule Call Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Schedule Call</DialogTitle>
        <DialogContent>
          {selectedRequest && (
            <Box>
              <Typography variant="body1">
                <strong>Applicant:</strong> {selectedRequest.applicant}
              </Typography>
              <Typography variant="body1">
                <strong>Loan Amount:</strong> {selectedRequest.loanAmount}
              </Typography>
              <Typography variant="body1">
                <strong>Preferred Time:</strong> {selectedRequest.preferredTime}
              </Typography>
              <Typography variant="body1" sx={{ mt: 2 }}>
                <strong>Additional Notes:</strong>
              </Typography>
              <Typography variant="body2">
                The applicant has requested a call to discuss their loan
                application. Please schedule the call at their preferred time or
                propose an alternative time slot.
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            onClick={handleCloseDialog}
            variant="contained"
            color="primary"
          >
            Confirm Schedule
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CallsRequested;
