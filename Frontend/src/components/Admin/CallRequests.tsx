// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Grid,
//   Paper,
//   Typography,
//   Card,
//   CardContent,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Avatar,
//   Button,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
//   SelectChangeEvent,
// } from "@mui/material";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   PieChart,
//   Pie,
//   Cell,
//   Legend,
//   LineChart,
//   Line,
// } from "recharts";
// import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
// import AccessTimeIcon from "@mui/icons-material/AccessTime";
// import EventIcon from "@mui/icons-material/Event";
// import TrendingUpIcon from "@mui/icons-material/TrendingUp";
// import axiosInstance from "../apiAxios/axiosInstance";

// const COLORS = ["#4CAF50", "#2196F3", "#FF9800", "#E91E63", "#9C27B0"];

// const callRequestsData = [
//   { status: "Pending", count: 15 },
//   { status: "Scheduled", count: 8 },
//   { status: "Completed", count: 22 },
// ];

// const dailyRequestsData = [
//   { day: "Mon", requests: 5 },
//   { day: "Tue", requests: 8 },
//   { day: "Wed", requests: 12 },
//   { day: "Thu", requests: 10 },
//   { day: "Fri", requests: 7 },
//   { day: "Sat", requests: 3 },
//   { day: "Sun", requests: 2 },
// ];

// const weeklyTrendData = [
//   { week: "Week 1", requests: 30 },
//   { week: "Week 2", requests: 35 },
//   { week: "Week 3", requests: 25 },
//   { week: "Week 4", requests: 40 },
// ];

// interface CallRequest {
//   _id: string;
//   ApplicantId: string;
//   name: string;
//   createdAt: string;
//   preferredCallTime: string;
//   reasonForCall: string;
//   additionalNotes: string;
//   status: string;
// }

// interface MetricCardProps {
//   title: string;
//   value: string | number;
//   icon: React.ReactNode;
//   color: string;
// }

// const MetricCard: React.FC<MetricCardProps> = ({
//   title,
//   value,
//   icon,
//   color,
// }) => (
//   <Card elevation={3} sx={{ height: "100%" }}>
//     <CardContent>
//       <Box display="flex" justifyContent="space-between" alignItems="center">
//         <Box>
//           <Typography variant="subtitle2" color="textSecondary">
//             {title}
//           </Typography>
//           <Typography variant="h4" sx={{ my: 1, color }}>
//             {value}
//           </Typography>
//         </Box>
//         <Box
//           sx={{
//             backgroundColor: `${color}22`,
//             borderRadius: "50%",
//             p: 1,
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//           }}
//         >
//           {icon}
//         </Box>
//       </Box>
//     </CardContent>
//   </Card>
// );

// const CallsRequested: React.FC = () => {
//   const [callRequests, setCallRequests] = useState<CallRequest[]>([]);
//   const [openDialog, setOpenDialog] = useState(false);
//   const [selectedRequest, setSelectedRequest] = useState<CallRequest | null>(
//     null
//   );
//   const [selectedStatus, setSelectedStatus] = useState<string>("");

//   const bank = "State Bank Of India";

//   useEffect(() => {
//     axiosInstance
//       .get<CallRequest[]>(`http://localhost:3000/api/v1/getCallsRequests`, {
//         params: {
//           bank: bank,
//         },
//       })
//       .then((response) => {
//         setCallRequests(response?.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching call requests:", error);
//       });
//   }, []);

//   const handleOpenDialog = (request: CallRequest) => {
//     setSelectedRequest(request);
//     setSelectedStatus(request.status || "");
//     setOpenDialog(true);
//   };

//   const handleCloseDialog = () => {
//     setOpenDialog(false);
//     setSelectedStatus("");
//   };

//   const handleStatusChange = (event: SelectChangeEvent<string>) => {
//     setSelectedStatus(event.target.value);
//   };

//   const handleUpdateStatus = () => {
//     if (selectedRequest) {
//       console.log(
//         `Updating status for request ${selectedRequest.ApplicantId} to ${selectedStatus}`
//       );

//       axiosInstance
//         .put<CallRequest[]>(`http://localhost:3000/api/v1/updateCallRequest`, {
//           params: {
//             ApplicantId: selectedRequest.ApplicantId,
//             status: selectedStatus,
//           },
//         })
//         .then((response) => {
//           setCallRequests(response.data);
//         })
//         .catch((error) => {
//           console.error("Error fetching call requests:", error);
//         });

//       handleCloseDialog();
//     }
//   };

//   return (
//     <Box sx={{ flexGrow: 1, p: 3 }}>
//       <Typography
//         variant="h6"
//         component="h1"
//         gutterBottom
//         fontWeight="bold"
//         sx={{
//           borderBottom: "2px solid",
//           borderColor: "#C9E7CB",
//           paddingBottom: 2,
//           marginBottom: 3,
//           textTransform: "uppercase",
//           letterSpacing: 1.2,
//           color: "#007A33",
//         }}
//       >
//         Calls Requested
//       </Typography>
//       <Grid container spacing={3}>
//         {/* Key Metrics */}
//         <Grid item xs={12} sm={6} md={3}>
//           <MetricCard
//             title="Total Requests"
//             value={45}
//             icon={<PhoneInTalkIcon sx={{ color: COLORS[0], fontSize: 40 }} />}
//             color={COLORS[0]}
//           />
//         </Grid>
//         <Grid item xs={12} sm={6} md={3}>
//           <MetricCard
//             title="Pending Calls"
//             value={15}
//             icon={<AccessTimeIcon sx={{ color: COLORS[1], fontSize: 40 }} />}
//             color={COLORS[1]}
//           />
//         </Grid>
//         <Grid item xs={12} sm={6} md={3}>
//           <MetricCard
//             title="Scheduled Calls"
//             value={8}
//             icon={<EventIcon sx={{ color: COLORS[2], fontSize: 40 }} />}
//             color={COLORS[2]}
//           />
//         </Grid>
//         <Grid item xs={12} sm={6} md={3}>
//           <MetricCard
//             title="Avg. Response Time"
//             value="1.5 days"
//             icon={<TrendingUpIcon sx={{ color: COLORS[3], fontSize: 40 }} />}
//             color={COLORS[3]}
//           />
//         </Grid>

//         {/* Call Requests Status Chart */}
//         <Grid item xs={12} md={6}>
//           <Paper sx={{ p: 2, height: "100%" }}>
//             <Typography variant="h6" component="h2" gutterBottom>
//               Call Requests Status
//             </Typography>
//             <Box sx={{ height: 300 }}>
//               <ResponsiveContainer width="100%" height="100%">
//                 <PieChart>
//                   <Pie
//                     data={callRequestsData}
//                     cx="50%"
//                     cy="50%"
//                     innerRadius={60}
//                     outerRadius={100}
//                     fill="#8884d8"
//                     paddingAngle={5}
//                     dataKey="count"
//                     label={({ name, percent }) =>
//                       `${name} ${(percent * 100).toFixed(0)}%`
//                     }
//                   >
//                     {callRequestsData.map((_, index) => (
//                       <Cell
//                         key={`cell-${index}`}
//                         fill={COLORS[index % COLORS.length]}
//                       />
//                     ))}
//                   </Pie>
//                   <Tooltip />
//                   <Legend verticalAlign="bottom" height={36} />
//                 </PieChart>
//               </ResponsiveContainer>
//             </Box>
//           </Paper>
//         </Grid>

//         {/* Daily Requests Chart */}
//         <Grid item xs={12} md={6}>
//           <Paper sx={{ p: 2, height: "100%" }}>
//             <Typography variant="h6" component="h2" gutterBottom>
//               Daily Call Requests
//             </Typography>
//             <Box sx={{ height: 300 }}>
//               <ResponsiveContainer width="100%" height="100%">
//                 <BarChart
//                   data={dailyRequestsData}
//                   margin={{
//                     top: 5,
//                     right: 30,
//                     left: 20,
//                     bottom: 5,
//                   }}
//                 >
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="day" />
//                   <YAxis />
//                   <Tooltip />
//                   <Bar dataKey="requests" fill={COLORS[4]}>
//                     {dailyRequestsData.map((_, index) => (
//                       <Cell
//                         key={`cell-${index}`}
//                         fill={COLORS[index % COLORS.length]}
//                       />
//                     ))}
//                   </Bar>
//                 </BarChart>
//               </ResponsiveContainer>
//             </Box>
//           </Paper>
//         </Grid>

//         {/* Weekly Trend Chart */}
//         <Grid item xs={12}>
//           <Paper sx={{ p: 10, height: 500 }}>
//             <Typography variant="h6" component="h2" gutterBottom>
//               Weekly Call Requests Trend
//             </Typography>
//             <Box sx={{ height: "100%" }}>
//               <ResponsiveContainer width="100%" height="100%">
//                 <LineChart
//                   data={weeklyTrendData}
//                   margin={{
//                     top: 2,
//                     right: 30,
//                     left: 20,
//                     bottom: 5,
//                   }}
//                 >
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="week" />
//                   <YAxis />
//                   <Tooltip />
//                   <Line
//                     type="monotone"
//                     dataKey="requests"
//                     stroke={COLORS[0]}
//                     activeDot={{ r: 8 }}
//                   />
//                 </LineChart>
//               </ResponsiveContainer>
//             </Box>
//           </Paper>
//         </Grid>

//         {/* Pending Call Requests */}
//         <Grid item xs={12}>
//           <Paper sx={{ p: 2 }}>
//             <Typography variant="h6" component="h2" gutterBottom>
//               Pending Call Requests
//             </Typography>
//             <TableContainer>
//               <Table>
//                 <TableHead>
//                   <TableRow>
//                     <TableCell>Applicant</TableCell>
//                     <TableCell>Name</TableCell>
//                     <TableCell>Current Status</TableCell>
//                     <TableCell>Request Time</TableCell>
//                     <TableCell>Preferred Time</TableCell>
//                     <TableCell>Action</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {callRequests.map((request) => (
//                     <TableRow key={request?._id}>
//                       <TableCell>
//                         <Box display="flex" alignItems="center">
//                           <Avatar sx={{ mr: 2 }}>{}</Avatar>
//                           {request?.ApplicantId}
//                         </Box>
//                       </TableCell>
//                       <TableCell>{request?.name}</TableCell>
//                       <TableCell>{request?.status}</TableCell>
//                       <TableCell>{request?.createdAt}</TableCell>
//                       <TableCell>{request?.preferredCallTime}</TableCell>
//                       <TableCell>
//                         <Button
//                           variant="contained"
//                           size="small"
//                           onClick={() => handleOpenDialog(request)}
//                         >
//                           Update Status
//                         </Button>
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           </Paper>
//         </Grid>
//       </Grid>

//       {/* View and Update Status Dialog */}
//       <Dialog open={openDialog} onClose={handleCloseDialog}>
//         <DialogTitle>View and Update Call Request</DialogTitle>
//         <DialogContent>
//           {selectedRequest && (
//             <Box>
//               <Typography variant="body1">
//                 <strong>Applicant:</strong> {selectedRequest.ApplicantId}
//               </Typography>
//               <Typography variant="body1">
//                 <strong>Reason For Call:</strong>{" "}
//                 {selectedRequest.reasonForCall}
//               </Typography>
//               <Typography variant="body1">
//                 <strong>Preferred Time:</strong>{" "}
//                 {selectedRequest.preferredCallTime}
//               </Typography>
//               <Typography variant="body1" sx={{ mt: 2 }}>
//                 <strong>Additional Notes:</strong>
//               </Typography>
//               <Typography variant="body2">
//                 {selectedRequest.additionalNotes}
//               </Typography>
//               <FormControl fullWidth sx={{ mt: 2 }}>
//                 <InputLabel id="status-select-label">Status</InputLabel>
//                 <Select
//                   labelId="status-select-label"
//                   id="status-select"
//                   value={selectedStatus}
//                   label="Status"
//                   onChange={handleStatusChange}
//                 >
//                   <MenuItem value="pending">Pending</MenuItem>
//                   <MenuItem value="scheduled">Scheduled</MenuItem>
//                   <MenuItem value="completed">Completed</MenuItem>
//                   <MenuItem value="cancelled">Cancelled</MenuItem>
//                 </Select>
//               </FormControl>
//             </Box>
//           )}
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseDialog}>Cancel</Button>
//           <Button
//             onClick={handleUpdateStatus}
//             variant="contained"
//             color="primary"
//           >
//             Confirm Status
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// };

// export default CallsRequested;

import React, { useState, useEffect } from "react";
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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
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
import axiosInstance from "../apiAxios/axiosInstance";

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

interface CallRequest {
  _id: string;
  ApplicantId: string;
  name: string;
  createdAt: string;
  preferredCallTime: string;
  reasonForCall: string;
  additionalNotes: string;
  status: string;
}

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  icon,
  color,
}) => (
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

const CallsRequested: React.FC = () => {
  const [callRequests, setCallRequests] = useState<CallRequest[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<CallRequest | null>(
    null
  );
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const bank = "State Bank Of India";

  useEffect(() => {
    setLoading(true);
    axiosInstance
      .get<CallRequest[]>(`http://localhost:3000/api/v1/getCallsRequests`, {
        params: {
          bank: bank,
        },
      })
      .then((response) => {
        setCallRequests(response.data);
        setError(null);
      })
      .catch((error) => {
        console.error("Error fetching call requests:", error);
        setError("Error fetching call requests. Please try again later.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleOpenDialog = (request: CallRequest) => {
    setSelectedRequest(request);
    setSelectedStatus(request.status || "");
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedStatus("");
  };

  const handleStatusChange = (event: SelectChangeEvent<string>) => {
    setSelectedStatus(event.target.value);
  };

  const handleUpdateStatus = () => {
    if (selectedRequest) {
      axiosInstance
        .put<CallRequest>(`http://localhost:3000/api/v1/updateCallRequest`, {
          ApplicantId: selectedRequest.ApplicantId,
          status: selectedStatus,
        })
        .then((response) => {
          console.log("Updated call request status:", response.data);
          setCallRequests((prevRequests) =>
            prevRequests.map((request) =>
              request.ApplicantId === selectedRequest.ApplicantId
                ? { ...request, status: selectedStatus }
                : request
            )
          );
          setError(null);
        })
        .catch((error) => {
          console.error("Error updating call request status:", error);
          setError("Error updating call request status. Please try again.");
        })
        .finally(() => {
          handleCloseDialog();
        });
    }
  };

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
          color: "#007A33",
        }}
      >
        Calls Requested
      </Typography>

      {loading && <Typography>Loading...</Typography>}
      {error && <Typography color="error">{error}</Typography>}

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
        {/* Pending Call Requests */}
        <Grid item xs={12} sx={{mb:'2vh'}}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" component="h2" gutterBottom>
              Pending Call Requests
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Applicant</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Current Status</TableCell>
                    <TableCell>Request Time</TableCell>
                    <TableCell>Preferred Time</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {callRequests.map((request) => (
                    <TableRow key={request?._id}>
                      <TableCell>
                        <Box display="flex" alignItems="center">
                          <Avatar sx={{ mr: 2 }}>
                            {request?.name.charAt(0)}
                          </Avatar>
                          {request?.ApplicantId}
                        </Box>
                      </TableCell>
                      <TableCell>{request?.name}</TableCell>
                      <TableCell>{request?.status}</TableCell>
                      <TableCell>{request?.createdAt}</TableCell>
                      <TableCell>{request?.preferredCallTime}</TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          size="small"
                          onClick={() => handleOpenDialog(request)}
                        >
                          Update Status
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
      {/* Call Requests Status Chart */}
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 2, height: "100%" }}>
          <Typography variant="h6" component="h2" gutterBottom>
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
                  {callRequestsData.map((_, index) => (
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
          <Typography variant="h6" component="h2" gutterBottom>
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
                  {dailyRequestsData.map((_, index) => (
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
          <Typography variant="h6" component="h2" gutterBottom>
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

      {/* View and Update Status Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>View and Update Call Request</DialogTitle>
        <DialogContent>
          {selectedRequest && (
            <Box>
              <Typography variant="body1">
                <strong>Applicant:</strong> {selectedRequest.ApplicantId}
              </Typography>
              <Typography variant="body1">
                <strong>Reason For Call:</strong>{" "}
                {selectedRequest.reasonForCall}
              </Typography>
              <Typography variant="body1">
                <strong>Preferred Time:</strong>{" "}
                {selectedRequest.preferredCallTime}
              </Typography>
              <Typography variant="body1" sx={{ mt: 2 }}>
                <strong>Additional Notes:</strong>
              </Typography>
              <Typography variant="body2">
                {selectedRequest.additionalNotes}
              </Typography>
              <FormControl fullWidth sx={{ mt: 2 }}>
                <InputLabel id="status-select-label">Status</InputLabel>
                <Select
                  labelId="status-select-label"
                  id="status-select"
                  value={selectedStatus}
                  label="Status"
                  onChange={handleStatusChange}
                >
                  <MenuItem value="pending">Pending</MenuItem>
                  <MenuItem value="scheduled">Scheduled</MenuItem>
                  <MenuItem value="completed">Completed</MenuItem>
                  <MenuItem value="cancelled">Cancelled</MenuItem>
                </Select>
              </FormControl>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            onClick={handleUpdateStatus}
            variant="contained"
            color="primary"
          >
            Confirm Status
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CallsRequested;
