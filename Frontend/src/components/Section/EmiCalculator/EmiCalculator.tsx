
import { useState } from "react";
import {
  Grid,
  Typography,
  TextField,
  Button,
  Paper,
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Line } from "react-chartjs-2";
import * as yup from "yup";
import { useFormik } from "formik";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import animationData from "../../../assets/Animation.json";
import Lottie from "react-lottie";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const validationSchema = yup.object({
  principal: yup
    .number()
    .positive("Principal must be positive")
    .required("Principal is required"),
  interestRate: yup
    .number()
    .positive("Interest rate must be positive")
    .max(100, "Interest rate cannot exceed 100%")
    .required("Interest rate is required"),
  tenure: yup
    .number()
    .positive("Tenure must be positive")
    .integer("Tenure must be a whole number")
    .max(30, "Tenure cannot exceed 30 years")
    .required("Tenure is required"),
});

const EMICalculator = () => {
  const [emiResult, setEMIResult] = useState<number | null>(null);
  const [chartData, setChartData] = useState<any>(null);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [totalPayment, setTotalPayment] = useState<number>(0);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const formik = useFormik({
    initialValues: {
      principal: 0,
      interestRate: 0,
      tenure: 0,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleCalculateEMI(values);
    },
  });

  const handleCalculateEMI = (values: {
    principal: number;
    interestRate: number;
    tenure: number;
  }) => {
    const { principal, interestRate, tenure } = values;
    const monthlyInterestRate = interestRate / 12 / 100;
    const months = tenure * 12;

    const emiValue =
      (principal *
        monthlyInterestRate *
        Math.pow(1 + monthlyInterestRate, months)) /
      (Math.pow(1 + monthlyInterestRate, months) - 1);

    setEMIResult(emiValue);

    const labels = [];
    const principalData = [];
    const interestData = [];
    const totalPaymentData = [];

    let remainingPrincipal = principal;
    let totalInterestPaid = 0;
    let totalPrincipalPaid = 0;

    for (let i = 1; i <= months; i++) {
      labels.push(`Month ${i}`);
      const interestPayment = remainingPrincipal * monthlyInterestRate;
      const principalPayment = emiValue - interestPayment;
      remainingPrincipal -= principalPayment;

      totalInterestPaid += interestPayment;
      totalPrincipalPaid += principalPayment;

      principalData.push(totalPrincipalPaid);
      interestData.push(totalInterestPaid);
      totalPaymentData.push(totalPrincipalPaid + totalInterestPaid);
    }

    setTotalInterest(totalInterestPaid);
    setTotalPayment(totalPrincipalPaid + totalInterestPaid);

    setChartData({
      labels: labels,
      datasets: [
        {
          label: "Principal Paid",
          data: principalData,
          borderColor: "rgba(75, 192, 192, 1)",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          fill: true,
        },
        {
          label: "Interest Paid",
          data: interestData,
          borderColor: "rgba(255, 99, 132, 1)",
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          fill: true,
        },
        {
          label: "Total Payment",
          data: totalPaymentData,
          borderColor: "rgba(54, 162, 235, 1)",
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          fill: false,
          borderWidth: 2,
        },
      ],
    });
  };

  return (
    <Box sx={{ width: "100%", pt: "2vh", backgroundColor: "transparent" }}>
      <Paper
        elevation={3}
        sx={{
          p: { xs: 2, sm: 3, md: 4 },
          bgcolor: "transparent",
          maxWidth: "lg",
          mx: "auto",
          display: "flex",
          flexDirection: { xs: "column-reverse", sm: "column", md: "row" },
          borderRadius: "15px",
          boxShadow: "none",
          "&:hover": {
            transform: "translateY(-10px)",
            boxShadow: "none",
          },
          transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
        }}
      >
        <Box
          className="left-side"
          sx={{
            flex: "1 1 50%",
            pr: { xs: 0, md: 4 },
          }}
        >
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              color: "#006400",
              mb: 3,
              fontWeight: "bold",
              fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" },
            }}
          >
            EMI Calculator
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="principal"
                  name="principal"
                  type="number"
                  label="Loan Amount (₹)"
                  variant="outlined"
                  value={formik.values.principal}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.principal && Boolean(formik.errors.principal)
                  }
                  helperText={
                    formik.touched.principal && formik.errors.principal
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="interestRate"
                  name="interestRate"
                  type="number"
                  label="Interest Rate (%)"
                  variant="outlined"
                  value={formik.values.interestRate}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.interestRate &&
                    Boolean(formik.errors.interestRate)
                  }
                  helperText={
                    formik.touched.interestRate && formik.errors.interestRate
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="tenure"
                  name="tenure"
                  type="number"
                  label="Loan Tenure (Years)"
                  variant="outlined"
                  value={formik.values.tenure}
                  onChange={formik.handleChange}
                  error={formik.touched.tenure && Boolean(formik.errors.tenure)}
                  helperText={formik.touched.tenure && formik.errors.tenure}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  sx={{
                    mt: 2,
                    mb: 3,
                    py: 1.5,
                    backgroundColor: "#4caf50",
                    color: "white",
                    "&:hover": { backgroundColor: "#388e3c" },
                    borderRadius: "25px",
                    fontWeight: "bold",
                    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                  }}
                >
                  Calculate EMI
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
        <Box
          className="right-side"
          sx={{
            flex: "1 1 50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: { xs: 300, sm: 400 },
          }}
        >
          <Lottie
            options={{
              loop: true,
              autoplay: true,
              animationData: animationData,
              rendererSettings: {
                preserveAspectRatio: "xMidYMid slice",
              },
            }}
            height={400}
            width={400}
            isClickToPauseDisabled
          />
        </Box>
      </Paper>
      {emiResult !== null && (
        <Box
          sx={{
            mt: 4,
            p: { xs: 2, sm: 3 },
            bgcolor: "transparent",
            borderRadius: 2,
            boxShadow: "none",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              color: "#006400",
              mb: 2,
              fontWeight: "bold",
              fontSize: { xs: "1.2rem", sm: "1.5rem" },
            }}
          >
            Results
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <Typography variant="subtitle1">Monthly EMI:</Typography>
              <Typography variant="h6">₹ {emiResult.toFixed(2)}</Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="subtitle1">Total Interest:</Typography>
              <Typography variant="h6">₹ {totalInterest.toFixed(2)}</Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="subtitle1">Total Payment:</Typography>
              <Typography variant="h6">₹ {totalPayment.toFixed(2)}</Typography>
            </Grid>
          </Grid>
        </Box>
      )}
      {chartData && (
        <Box sx={{ mt: 4 }}>
          <Paper
            elevation={3}
            sx={{
              p: { xs: 2, sm: 3, md: 4 },
              borderRadius: "15px",
              boxShadow: "none",
              "&:hover": {
                transform: "translateY(-10px)",
                boxShadow: "none",
              },
              transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
            }}
          >
            <Box sx={{ height: { xs: 300, sm: 400 }, width: "100%" }}>
              <Line
                data={chartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    y: {
                      beginAtZero: true,
                      title: {
                        display: !isMobile,
                        text: "Amount (₹)",
                      },
                      ticks: {
                        callback: (value: any) =>
                          isMobile
                            ? `₹${value / 1000}K`
                            : `₹${value.toLocaleString()}`,
                      },
                    },
                    x: {
                      title: {
                        display: !isMobile,
                        text: "Months",
                      },
                      ticks: {
                        maxTicksLimit: isMobile ? 6 : 12,
                      },
                    },
                  },
                  plugins: {
                    tooltip: {
                      mode: "index",
                      intersect: false,
                      callbacks: {
                        label: (context) =>
                          `${
                            context.dataset.label
                          }: ₹${context.parsed.y.toFixed(2)}`,
                      },
                    },
                    legend: {
                      position: "top" as const,
                      labels: {
                        boxWidth: isMobile ? 10 : 40,
                        font: {
                          size: isMobile ? 10 : 12,
                        },
                      },
                    },
                  },
                }}
              />
            </Box>
          </Paper>
        </Box>
      )}
    </Box>
  );
};

export default EMICalculator;
