import React, { useState, useEffect } from "react";
import { Pie, Bar } from "react-chartjs-2";
import { CircularProgress, Typography, Box } from "@mui/material";
import { useParties } from "../../hooks/use-parties"; // Custom hook to fetch parties
import eventTypesData from "../../datas/event-types.json"; // Import event types data
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip as TooltipChartJs,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { useTheme } from "@mui/material/styles";

ChartJS.register(
  ArcElement,
  TooltipChartJs,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

export const AdminPartiesStatistics = () => {
  const { parties, loading } = useParties(); // Fetching parties data
  const [chartData, setChartData] = useState({});
  const [monthlyChartData, setMonthlyChartData] = useState({});
  const [countryChartData, setCountryChartData] = useState({}); // State for country chart
  const theme = useTheme();

  // Function to process data for the Pie chart
  const processDataForChart = () => {
    if (!parties || !eventTypesData?.parties) {
      return;
    }

    const eventTypeCounts = {};
    eventTypesData.parties.forEach((type) => {
      eventTypeCounts[type] = 0;
    });

    parties.forEach((party) => {
      if (eventTypeCounts.hasOwnProperty(party.name_type)) {
        eventTypeCounts[party.name_type]++;
      }
    });

    const labels = Object.keys(eventTypeCounts);
    const data = Object.values(eventTypeCounts);
    const backgroundColors = labels.map((_, index) => {
      const hue = (index * 360) / labels.length;
      return `hsl(${hue}, 70%, 60%)`;
    });

    setChartData({
      labels: labels,
      datasets: [
        {
          label: "Parties by Event Type",
          data: data,
          backgroundColor: backgroundColors,
          hoverOffset: 4,
        },
      ],
    });
  };

  // Function to process monthly party count for the Bar chart
  const processMonthlyDataForChart = () => {
    if (!parties) return;

    const months = Array(12).fill(0); // Array to hold counts for each month (Jan-Dec)

    parties.forEach((party) => {
      const month = new Date(party.date_start).getMonth(); // Get month from date (0-indexed)
      if (month >= 0 && month < 12) {
        months[month]++; // Increment the count for the respective month
      }
    });

    const labels = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    setMonthlyChartData({
      labels: labels,
      datasets: [
        {
          label: "Events Created by Month",
          data: months,
          backgroundColor: theme.palette.primary.main,
        },
      ],
    });
  };

  // Function to process party data for country chart
  const processCountryDataForChart = () => {
    if (!parties) return;

    const countryCounts = {};

    // Brojimo događaje po državama
    parties.forEach((party) => {
      const country = party.name_country;
      if (countryCounts.hasOwnProperty(country)) {
        countryCounts[country]++;
      } else {
        countryCounts[country] = 1;
      }
    });

    // Sortiramo države po broju događaja u opadajućem redosledu
    const sortedCountries = Object.entries(countryCounts).sort(
      (a, b) => b[1] - a[1]
    );

    // Izaberemo top N država (npr. top 5)
    const topCountries = sortedCountries.slice(0, 5);

    // Preostale države grupišemo kao "Ostalo"
    const othersCount = sortedCountries
      .slice(5)
      .reduce((acc, curr) => acc + curr[1], 0);

    // Kreiramo nove podatke za chart
    const labels = topCountries.map((entry) => entry[0]);
    const data = topCountries.map((entry) => entry[1]);

    if (othersCount > 0) {
      labels.push("Ostalo");
      data.push(othersCount);
    }

    const backgroundColors = labels.map((_, index) => {
      const hue = (index * 360) / labels.length;
      return `hsl(${hue}, 70%, 60%)`;
    });

    setCountryChartData({
      labels: labels,
      datasets: [
        {
          label: "Events by Country",
          data: data,
          backgroundColor: backgroundColors,
          hoverOffset: 4,
        },
      ],
    });
  };

  useEffect(() => {
    if (parties && parties.length > 0) {
      processDataForChart();
      processMonthlyDataForChart();
      processCountryDataForChart(); // Process country data
    }
  }, [parties]);

  // Calculate total number of events
  const totalEvents = parties ? parties.length : 0;

  if (
    loading ||
    !chartData.datasets ||
    !monthlyChartData.datasets ||
    !countryChartData.datasets
  ) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="300px"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      mt={5}
      mx="auto"
      width="100%"
      maxWidth="1200px"
      borderRadius={3}
      boxShadow={3}
      p={4}
    >
      {/* Display Total Events */}
      <Typography
        variant="h4"
        fontWeight="bold"
        color="white"
        align="center"
        mb={3}
      >
        Total Parties Created: {totalEvents}
      </Typography>

      <Typography
        variant="h4"
        fontWeight="bold"
        color="white"
        align="center"
        mb={3}
      >
        Parties by Type:
      </Typography>

      {/* Pie chart for Event Types */}
      <Box
        width="100%"
        maxWidth="600px"
        height={{ xs: "250px", sm: "350px" }}
        position="relative"
        display="flex"
        justifyContent="center"
        alignItems="center"
        mb={5}
      >
        <Pie
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              tooltip: {
                callbacks: {
                  label: function (context) {
                    const label = context.label || "";
                    const value = context.parsed;
                    return `Event Type: ${label} (${value} parties)`; // Tooltip shows event type and party count
                  },
                },
              },
              legend: {
                position: "bottom", // Positioned below the chart
                labels: {
                  color: "white", // Set legend text color to match theme
                  font: {
                    size: 14, // Customize font size for the legend
                  },
                },
              },
            },
          }}
        />
      </Box>

      <Typography
        variant="h4"
        fontWeight="bold"
        color="white"
        align="center"
        mb={3}
      >
        Parties by Start Date:
      </Typography>

      {/* Bar chart for Monthly Events */}
      <Box
        width="100%"
        maxWidth="900px"
        height={{ xs: "250px", sm: "350px" }}
        position="relative"
        display="flex"
        justifyContent="center"
        alignItems="center"
        mb={5}
      >
        <Bar
          data={monthlyChartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              tooltip: {
                callbacks: {
                  label: function (context) {
                    const value = context.parsed.y;
                    return `Events: ${value}`;
                  },
                },
              },
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: "Month",
                  color: "white", // White color for x-axis title
                },
                ticks: {
                  color: "white", // White color for x-axis ticks
                },
              },
              y: {
                title: {
                  display: true,
                  text: "Number of Events",
                  color: "white", // White color for y-axis title
                },
                ticks: {
                  color: "white", // White color for y-axis ticks
                },
                beginAtZero: true,
              },
            },
          }}
        />
      </Box>
      <Typography
        variant="h4"
        fontWeight="bold"
        color="white"
        align="center"
        mb={3}
      >
        Parties by Countries:
      </Typography>

      {/* Pie chart for Events by Country */}
      <Box
        width="100%"
        maxWidth="600px"
        height={{ xs: "250px", sm: "350px" }}
        position="relative"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Pie
          data={countryChartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              tooltip: {
                callbacks: {
                  label: function (context) {
                    const label = context.label || "";
                    const value = context.parsed;
                    return `Country: ${label} (${value} events)`; // Tooltip shows country and event count
                  },
                },
              },
              legend: {
                position: "bottom", // Positioned below the chart
                labels: {
                  color: "white", // Set legend text color to match theme
                  font: {
                    size: 14, // Customize font size for the legend
                  },
                },
              },
            },
          }}
        />
      </Box>
    </Box>
  );
};
