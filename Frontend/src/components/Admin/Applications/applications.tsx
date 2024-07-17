// // Application Approval Details

// import React, { useState ,useEffect} from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   TextField,
//   IconButton,
//   Typography,
//   Box,
//   useMediaQuery,
//   useTheme,
//   Card,
//   CardContent,
//   Grid,
//   Chip,
// } from "@mui/material";
// import SendIcon from "@mui/icons-material/Send";
// import VisibilityIcon from "@mui/icons-material/Visibility";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";
// import CancelIcon from "@mui/icons-material/Cancel";
// import ApplicationDetailsModal from "../Applications/view";
// import axios from "axios";
// import { LoanApplications } from "./type";
// export interface LoanApplication {
//   id: number;
//   name: string;
//   status: "Submited" | "Approved" | "Rejected";
//   comment: string;
//   Bank?:string
//   isSubmitted: boolean;
// }

// const LoanApplicationTable: React.FC = () => {

//   const [applications, setApplications] = useState<LoanApplications[]>([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get("http://localhost:3000/api/v1/getAllapplications");
//         console.log(response.data); // Log the fetched data
//         setApplications(response.data.loanApplications);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, []);
// console.log(applications)
// const Bank = "UCO BANK"
//   // const [applications, setApplications] = useState<LoanApplication[]>([
//   //   { id: 1, name: "John Doe", status: "Submited", comment: "",  isSubmitted: false },
//   //   { id: 2, name: "Jane Smith", status: "Submited", comment: "", isSubmitted: false },
//   //   { id: 3, name: "Michael Johnson", status: "Submited", comment: "", isSubmitted: false },
//   // ]);

//   const [selectedApplication, setSelectedApplication] = useState<LoanApplications | null>(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [errors, setErrors] = useState<Record<number, string>>({});

//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

//   const handleStatusChange = (id: number, status: "Approved" | "Rejected") => {
//     setApplications(applications.map((app) =>
//       app.user === id ? { ...app, status } : app
//     ));
//     if (status === "Approved") {
//       console.log(`Your response has been sent to ${applications.find((app) => app.user === id)?.name}`);
//     }
//   };

//   const handleCommentChange = (id: number, comment: string) => {
//     setApplications(applications.map((app) =>
//       app.user === id ? { ...app, comment } : app
//     ));
//     setErrors((prev) => ({ ...prev, [id]: "" }));
//   };

//   const validateComment = (id: number): boolean => {
//     const application = applications.find((app) => app.user === id);
//     if (!application || application.comment.trim() === "") {
//       setErrors((prev) => ({ ...prev, [id]: "Comment is required" }));
//       return false;
//     }
//     return true;
//   };

//   const handleSubmit = (id: number) => {
//     if (validateComment(id)) {
//       const application = applications.find((app) => app.user === id);
//       if (application) {
//         console.log("Submitting application:", application);
//         setApplications(applications.map((app) =>
//           app.user === id ? { ...app, isSubmitted: true } : app
//         ));
//       }
//     }
//   };

//   const handleViewClick = (application: LoanApplications) => {
//     setSelectedApplication(application);
//     setIsModalOpen(true);
//   };

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case "Approved":
//         return "success";
//       case "Rejected":
//         return "error";
//       default:
//         return "default";
//     }
//   };

//   const renderDesktopView = () => (
//     <TableContainer component={Paper}>
//       <Table>
//         <TableHead>
//           <TableRow>
//             <TableCell>ID</TableCell>
//             <TableCell>Name</TableCell>
//             <TableCell>Status</TableCell>
//             <TableCell>Comment</TableCell>
//             <TableCell>Bank</TableCell>
//             <TableCell>Actions</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {applications.map((app) => (
//             <TableRow key={app.user}>
//               <TableCell>{app.user}</TableCell>
//               <TableCell>{app.name}</TableCell>
//               <TableCell>
//                 <Chip
//                   label={app.status}
//                   color={getStatusColor(app.status)}
//                   size="small"
//                 />
//               </TableCell>
//               <TableCell>
//                 <TextField
//                   required
//                   id={`comment-${app.user}`}
//                   label="Add Comments"
//                   value={app.comment}
//                   onChange={(e) => handleCommentChange(app.user, e.target.value)}
//                   disabled={app.isSubmitted}
//                   error={!!errors[app.user]}
//                   helperText={errors[app.user]}
//                 />
//               </TableCell>
//               <TableCell>
//                 <TextField
//                   value={Bank}
//                   disabled
//                   fullWidth
//                 />
//               </TableCell>
//               <TableCell>
//                 <IconButton
//                   color="primary"
//                   onClick={() => handleStatusChange(app.user, "Approved")}
//                   disabled={app.status !== "Submited" || app.isSubmitted}
//                 >
//                   <CheckCircleIcon />
//                 </IconButton>
//                 <IconButton
//                   color="secondary"
//                   onClick={() => handleStatusChange(app.user, "Rejected")}
//                   disabled={app.status !== "Submited" || app.isSubmitted}
//                 >
//                   <CancelIcon />
//                 </IconButton>
//                 <IconButton
//                   color="default"
//                   onClick={() => handleSubmit(app.user)}
//                   // disabled={app.comment.trim() === "" || app.isSubmitted}
//                 >
//                   <SendIcon />
//                 </IconButton>
//                 <IconButton
//                   color="primary"
//                   onClick={() => handleViewClick(app)}
//                 >
//                   <VisibilityIcon />
//                 </IconButton>
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );

//   const renderMobileView = () => (
//     <Box sx={{ padding: 2 }}>
//       {applications.map((app) => (
//         <Card key={app.user} sx={{ marginBottom: 2 }}>
//           <CardContent>
//             <Typography variant="h6">{app.name}</Typography>
//             <Typography variant="subtitle1" color="text.secondary">
//               ID: {app.user}
//             </Typography>
//             <Chip
//               label={app.status}
//               color={getStatusColor(app.status)}
//               size="small"
//               sx={{ marginBottom: 1 }}
//             />
//             <TextField
//               value={app.comment}
//               onChange={(e) => handleCommentChange(app.user, e.target.value)}
//               fullWidth
//               variant="outlined"
//               size="small"
//               multiline
//               rows={2}
//               sx={{ marginBottom: 1 }}
//               required
//               error={!!errors[app.user]}
//               helperText={errors[app.user] || "Comment is required"}
//               disabled={app.isSubmitted}
//             />
//             <TextField
//               value={Bank}
//               disabled
//               fullWidth
//               variant="outlined"
//               size="small"
//               sx={{ marginBottom: 1 }}
//             />
//             <Grid container spacing={1}>
//               <Grid item>
//                 <IconButton
//                   color="primary"
//                   onClick={() => handleStatusChange(app.user, "Approved")}
//                   disabled={app.status !== "Submited" || app.isSubmitted}
//                 >
//                   <CheckCircleIcon />
//                 </IconButton>
//               </Grid>
//               <Grid item>
//                 <IconButton
//                   color="secondary"
//                   onClick={() => handleStatusChange(app.user, "Rejected")}
//                   disabled={app.status !== "Submited" || app.isSubmitted}
//                 >
//                   <CancelIcon />
//                 </IconButton>
//               </Grid>
//               <Grid item>
//                 <IconButton
//                   color="default"
//                   onClick={() => handleSubmit(app.user)}
//                   disabled={app.comment.trim() === "" || app.isSubmitted}
//                 >
//                   <SendIcon />
//                 </IconButton>
//               </Grid>
//               <Grid item>
//                 <IconButton
//                   color="primary"
//                   onClick={() => handleViewClick(app)}
//                 >
//                   <VisibilityIcon />
//                 </IconButton>
//               </Grid>
//             </Grid>
//           </CardContent>
//         </Card>
//       ))}
//     </Box>
//   );

//   return (
//     <>
//       <Typography variant="h4" gutterBottom>
//         Loan Applications
//       </Typography>
//       {isMobile ? renderMobileView() : renderDesktopView()}
//       <ApplicationDetailsModal
//         open={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         application={selectedApplication}
//       />
//     </>
//   );
// };

// export default LoanApplicationTable;

import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  IconButton,
  Typography,
  Box,
  useMediaQuery,
  useTheme,
  Card,
  CardContent,
  Grid,
  Chip,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import ApplicationDetailsModal from "../Applications/view";
import axios from "axios";
import { LoanApplications } from "./type";
export interface LoanApplication {
  user: number;
  name: string;
  status: "Submitted" | "Approved" | "Rejected";
  comment: string;
  Bank?: string;
  isSubmitted: boolean;
}

const LoanApplicationTable: React.FC = () => {
  const [applications, setApplications] = useState<LoanApplication[]>([]);
  const [selectedApplication, setSelectedApplication] =
    useState<LoanApplications | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errors, setErrors] = useState<Record<number, string>>({});

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const Bank = "UCO BANK";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/getAllapplications"
        );
        setApplications(
          response.data.loanApplications.map((app: any) => ({
            ...app,
            status: app.status || "Submitted",
            isSubmitted: false,
            Bank: Bank,
          }))
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleStatusChange = (id: number, status: "Approved" | "Rejected") => {
    setApplications(
      applications.map((app) =>
        app.user === id ? { ...app, status, isSubmitted: true } : app
      )
    );
    if (status === "Approved") {
      console.log(
        `Your response has been sent to ${
          applications.find((app) => app.user === id)?.name
        }`
      );
    }
  };

  const handleCommentChange = (id: number, comment: string) => {
    setApplications(
      applications.map((app) => (app.user === id ? { ...app, comment } : app))
    );
    setErrors((prev) => ({ ...prev, [id]: "" }));
  };

  const validateComment = (id: number): boolean => {
    const application = applications.find((app) => app.user === id);
    if (!application || application.comment.trim() === "") {
      setErrors((prev) => ({ ...prev, [id]: "Comment is required" }));
      return false;
    }
    return true;
  };

  const handleSubmit = (id: number) => {
    if (validateComment(id)) {
      const application = applications.find((app) => app.user === id);
      if (application) {
        console.log("Submitting application:", application);
        setApplications(
          applications.map((app) =>
            app.user === id ? { ...app, isSubmitted: true } : app
          )
        );
      }
    }
  };

  const handleViewClick = (application: any) => {
    setSelectedApplication(application);
    setIsModalOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "success";
      case "Rejected":
        return "error";
      default:
        return "default";
    }
  };

  const renderDesktopView = () => (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Comment</TableCell>
            <TableCell>Bank</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {applications.map((app) => (
            <TableRow key={app.user}>
              <TableCell>{app.user}</TableCell>
              <TableCell>{app.name}</TableCell>
              <TableCell>
                <Chip
                  label={app.status}
                  color={getStatusColor(app.status)}
                  size="small"
                />
              </TableCell>
              <TableCell>
                <TextField
                  required
                  id={`comment-${app.user}`}
                  label="Add Comments"
                  value={app.comment}
                  onChange={(e) =>
                    handleCommentChange(app.user, e.target.value)
                  }
                  disabled={app.isSubmitted}
                  error={!!errors[app.user]}
                  helperText={errors[app.user]}
                />
              </TableCell>
              <TableCell>
                <TextField value={app.Bank} disabled fullWidth />
              </TableCell>
              <TableCell>
                <IconButton
                  color="primary"
                  onClick={() => handleStatusChange(app.user, "Approved")}
                  disabled={app.status !== "Submitted" || app.isSubmitted}
                >
                  <CheckCircleIcon />
                </IconButton>
                <IconButton
                  color="secondary"
                  onClick={() => handleStatusChange(app.user, "Rejected")}
                  disabled={app.status !== "Submitted" || app.isSubmitted}
                >
                  <CancelIcon />
                </IconButton>
                <IconButton
                  color="default"
                  onClick={() => handleSubmit(app.user)}
                  disabled={app.isSubmitted}
                >
                  <SendIcon />
                </IconButton>
                <IconButton
                  color="primary"
                  onClick={() => handleViewClick(app)}
                >
                  <VisibilityIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  const renderMobileView = () => (
    <Box sx={{ padding: 2 }}>
      {applications.map((app) => (
        <Card key={app.user} sx={{ marginBottom: 2 }}>
          <CardContent>
            <Typography variant="h6">{app.name}</Typography>
            <Typography variant="subtitle1" color="text.secondary">
              ID: {app.user}
            </Typography>
            <Chip
              label={app.status}
              color={getStatusColor(app.status)}
              size="small"
              sx={{ marginBottom: 1 }}
            />
            <TextField
              value={app.comment}
              onChange={(e) => handleCommentChange(app.user, e.target.value)}
              fullWidth
              variant="outlined"
              size="small"
              multiline
              rows={2}
              sx={{ marginBottom: 1 }}
              required
              error={!!errors[app.user]}
              helperText={errors[app.user] || "Comment is required"}
              disabled={app.isSubmitted}
            />
            <TextField
              value={app.Bank}
              disabled
              fullWidth
              variant="outlined"
              size="small"
              sx={{ marginBottom: 1 }}
            />
            <Grid container spacing={1}>
              <Grid item>
                <IconButton
                  color="primary"
                  onClick={() => handleStatusChange(app.user, "Approved")}
                  disabled={app.status !== "Submitted" || app.isSubmitted}
                >
                  <CheckCircleIcon />
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton
                  color="secondary"
                  onClick={() => handleStatusChange(app.user, "Rejected")}
                  disabled={app.status !== "Submitted" || app.isSubmitted}
                >
                  <CancelIcon />
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton
                  color="default"
                  onClick={() => handleSubmit(app.user)}
                  disabled={app.isSubmitted}
                >
                  <SendIcon />
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton
                  color="primary"
                  onClick={() => handleViewClick(app)}
                >
                  <VisibilityIcon />
                </IconButton>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      ))}
    </Box>
  );

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Loan Applications
      </Typography>
      {isMobile ? renderMobileView() : renderDesktopView()}
      <ApplicationDetailsModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        application={selectedApplication}
      />
    </>
  );
};

export default LoanApplicationTable;
