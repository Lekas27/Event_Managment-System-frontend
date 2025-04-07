import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import {
  Button,
  CircularProgress,
  Typography,
  Box,
  Card,
  CardContent,
} from "@mui/material";
import { useUsers } from "../../hooks/use-users"; // Custom hook to fetch users
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip as TooltipChartJs,
  Legend,
} from "chart.js";
import { useTheme } from "@mui/material/styles";

ChartJS.register(ArcElement, TooltipChartJs, Legend);

export const AdminUsersChart = () => {
  const { users, loading } = useUsers(); // Fetching user data (with roles)
  const [chartData, setChartData] = useState({});
  const [option, setOption] = useState("thisweek");

  const theme = useTheme(); // Optional: Customize the theme

  // Function to process data and update the Pie chart
  const processDataForChart = () => {
    const roleCounts = {
      Admin: 0,
      User: 0,
    };

    let totalAge = 0;
    let activeUsersCount = 0;

    // Count the roles and additional statistics
    users.forEach((user) => {
      user.roles.forEach((role) => {
        if (role.name === "admin") roleCounts.Admin += 1;
        if (role.name === "user") roleCounts.User += 1;
      });

      // Assuming you have an age or a similar field for users
      if (user.age) totalAge += user.age;

      // Assuming there's a status field like `isActive` or something to mark active users
      if (user.isActive) activeUsersCount += 1;
    });

    // Calculate average age
    const averageAge = totalAge / users.length;

    // Set chart data
    setChartData({
      labels: ["Admin", "User"],
      datasets: [
        {
          label: "User Roles",
          data: [roleCounts.Admin, roleCounts.User],
          backgroundColor: [
            theme.palette.primary.main,
            theme.palette.secondary.main,
          ],
          hoverOffset: 4,
        },
      ],
    });

    // Display the calculated stats in the UI
    setStats({
      totalUsers: users.length,
      averageAge: averageAge.toFixed(2),
      activeUsers: activeUsersCount,
    });
  };

  const [stats, setStats] = useState({
    totalUsers: 0,
    averageAge: 0,
    activeUsers: 0,
  });

  // Process data when users are updated
  useEffect(() => {
    if (users && users.length > 0) {
      processDataForChart();
    }
  }, [users]);

  // Check if chartData is defined before passing to Pie chart
  if (loading || !chartData.datasets) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      spacing={2}
      mt={4}
    >
      <Typography variant="h4" color="white" align="center" gutterBottom>
        User Role Distribution
      </Typography>

      {/* Display Pie chart with smaller size using wrapper div */}
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        style={{
          width: "300px", // Adjust this width to make it smaller
          height: "300px", // Adjust this height to make it smaller
        }}
      >
        <Pie
          data={chartData}
          options={{ responsive: true, maintainAspectRatio: false }}
        />
      </Box>

      {/* Buttons to filter options */}

      {/* Display statistical data in cards */}
      <Box display="flex" justifyContent="center" mt={4} gap={4}>
        <Card sx={{ maxWidth: 300 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Total Users
            </Typography>
            <Typography variant="h4">{stats.totalUsers}</Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};
