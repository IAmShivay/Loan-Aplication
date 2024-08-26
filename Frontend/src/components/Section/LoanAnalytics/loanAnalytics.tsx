

import React from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  LinearProgress,
} from '@mui/material';
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
} from 'recharts';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const applicationStatusData = [
  { name: 'Approved', value: 45 },
  { name: 'Pending', value: 30 },
  { name: 'Rejected', value: 25 },
];

const monthlyApplicationsData = [
  { month: 'Jan', applications: 65, approvals: 40 },
  { month: 'Feb', applications: 59, approvals: 38 },
  { month: 'Mar', applications: 80, approvals: 55 },
  { month: 'Apr', applications: 81, approvals: 60 },
  { month: 'May', applications: 56, approvals: 42 },
  { month: 'Jun', applications: 55, approvals: 40 },
];

const loanAmountData = [
  { amount: '0-5k', count: 20 },
  { amount: '5k-10k', count: 35 },
  { amount: '10k-20k', count: 25 },
  { amount: '20k-50k', count: 15 },
  { amount: '50k+', count: 5 },
];

const COLORS = ['#4CAF50', '#2196F3', '#FF9800', '#E91E63', '#9C27B0'];

const LoanAnalytics: React.FC = () => {

  const MetricCard: React.FC<{
    title: string;
    value: string | number;
    icon: React.ReactNode;
    change: number;
    color: string;
  }> = ({ title, value, icon, change, color }) => (
    <Card elevation={3}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="subtitle2" color="textSecondary">
              {title}
            </Typography>
            <Typography variant="h4" sx={{ my: 1, color }}>
              {value}
            </Typography>
            <Box display="flex" alignItems="center">
              {change >= 0 ? (
                <TrendingUpIcon fontSize="small" sx={{ color: 'success.main', mr: 0.5 }} />
              ) : (
                <TrendingDownIcon fontSize="small" sx={{ color: 'error.main', mr: 0.5 }} />
              )}
              <Typography
                variant="body2"
                sx={{ color: change >= 0 ? 'success.main' : 'error.main' }}
              >
                {Math.abs(change)}% from last month
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              backgroundColor: `${color}22`,
              borderRadius: '50%',
              p: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Loan Application Analytics
      </Typography>
      <Grid container spacing={3}>
        {/* Key Metrics */}
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Total Applications"
            value={356}
            icon={<TrendingUpIcon sx={{ color: COLORS[0], fontSize: 40 }} />}
            change={5.2}
            color={COLORS[0]}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Approval Rate"
            value="68%"
            icon={<TrendingUpIcon sx={{ color: COLORS[1], fontSize: 40 }} />}
            change={2.1}
            color={COLORS[1]}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Avg. Loan Amount"
            value="$12,500"
            icon={<AttachMoneyIcon sx={{ color: COLORS[2], fontSize: 40 }} />}
            change={-1.5}
            color={COLORS[2]}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Avg. Processing Time"
            value="3.2 days"
            icon={<AccessTimeIcon sx={{ color: COLORS[3], fontSize: 40 }} />}
            change={-0.5}
            color={COLORS[3]}
          />
        </Grid>

        {/* Application Status Chart */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: 400 }}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Application Status
            </Typography>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={applicationStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {applicationStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Monthly Applications Chart */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: 400 }}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Monthly Applications & Approvals
            </Typography>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={monthlyApplicationsData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="applications" stroke={COLORS[0]} activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="approvals" stroke={COLORS[1]} />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Loan Amount Distribution */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2, height: 400 }}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Loan Amount Distribution
            </Typography>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={loanAmountData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="amount" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill={COLORS[4]}>
                  {loanAmountData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Top Loan Purposes */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Top Loan Purposes
            </Typography>
            {[
              { purpose: 'Home Improvement', percentage: 30 },
              { purpose: 'Debt Consolidation', percentage: 25 },
              { purpose: 'Business', percentage: 20 },
              { purpose: 'Education', percentage: 15 },
              { purpose: 'Other', percentage: 10 },
            ].map((item, index) => (
              <Box key={item.purpose} sx={{ mb: 2 }}>
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="body2">{item.purpose}</Typography>
                  <Typography variant="body2" fontWeight="bold">
                    {item.percentage}%
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={item.percentage}
                  sx={{ 
                    height: 8, 
                    borderRadius: 5,
                    backgroundColor: `${COLORS[index]}22`,
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: COLORS[index],
                    }
                  }}
                />
              </Box>
            ))}
          </Paper>
        </Grid>

        {/* Recent Activity */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Recent Activity
            </Typography>
            {[
              { action: 'Loan Approved', amount: '$15,000', applicant: 'John Doe', time: '2 hours ago' },
              { action: 'New Application', amount: '$8,000', applicant: 'Jane Smith', time: '5 hours ago' },
              { action: 'Loan Rejected', amount: '$25,000', applicant: 'Mike Johnson', time: '1 day ago' },
              { action: 'Loan Disbursed', amount: '$12,000', applicant: 'Sarah Williams', time: '2 days ago' },
            ].map((item, index) => (
              <Box key={index} sx={{ mb: 2, pb: 2, borderBottom: index < 3 ? 1 : 0, borderColor: 'divider' }}>
                <Typography variant="subtitle2" fontWeight="bold">
                  {item.action}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {item.amount} - {item.applicant}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  {item.time}
                </Typography>
              </Box>
            ))}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LoanAnalytics;