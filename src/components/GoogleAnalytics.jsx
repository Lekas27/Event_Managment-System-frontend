import axios from "axios";


const PROPERTY_ID = "properties/464662106"; // Zameni sa tvojim Google Analytics ID-jem
import dayjs from 'dayjs';
// const refreshToken = "1//04QMuvuUEVIvrCgYIARAAGAQSNwF-L9Iru3WP6pFPRKUR44NySHr_uKn8N32Qnj-d7ZAZlWTzObk_DAyC5hBBcxWf-sQQMtlma-s";
const ACCESS_TOKEN = "ya29.a0AeXRPp6nmMvJKsrDShpVr0GYOdqkHiGQbU38lmLnZLKQlvtYdP5luS8gbIgGnpEvzjU0FEKZmKKVjqieuEkSMMFobJjFirB0u_ln9VnlGWLAOfLXvaUwBeL6zMS71vjsQnx6yTimHf2eYFJh_2n2mTMid_og7VdEDyNssmCeaCgYKAXASARESFQHGX2MiqfzeFD4pIrqd6xiKcNuaWw0175";








const fetchAnalyticsDataForWeek = async () => {
    try {
        const today = new Date();

        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - today.getDay() + 1);
        const startDate = startOfWeek.toISOString().split('T')[0];

        const endDate = today.toISOString().split('T')[0];

        const response = await axios.post(
            `https://analyticsdata.googleapis.com/v1beta/${PROPERTY_ID}:runReport`,
            {
                dateRanges: [{ startDate, endDate }],
                metrics: [{ name: "sessions" }],
                dimensions: [{ name: "date" }],
            },
            {
                headers: {
                    Authorization: `Bearer ${ACCESS_TOKEN}`,
                    "Content-Type": "application/json",
                },
            }
        );



        const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
        const formattedData = daysOfWeek.map(day => ({
            name: day,
            users: 0,
        }));

        response?.data?.rows?.forEach(row => {
            const date = row.dimensionValues[0].value;
            const visits = parseInt(row.metricValues[0].value, 10);
            const dayOfWeek = dayjs(date, 'YYYYMMDD').format('dddd');

            const index = daysOfWeek.indexOf(dayOfWeek);
            if (index !== -1) {
                formattedData[index].users = visits;
            }
        });

        return formattedData;
    } catch (error) {
        console.error("Error with fetching", error.response?.data || error);
    }
};

const fetchAnalyticsDataForPreviousWeek = async () => {
    const today = new Date();

    const previousMonday = new Date(today);
    previousMonday.setDate(today.getDate() - today.getDay() - 6);
    const startDate = previousMonday.toISOString().split('T')[0];

    const previousSunday = new Date(today);
    previousSunday.setDate(today.getDate() - today.getDay() - 1);
    const endDate = previousSunday.toISOString().split('T')[0];

    try {
        const response = await axios.post(
            `https://analyticsdata.googleapis.com/v1beta/${PROPERTY_ID}:runReport`,
            {
                dateRanges: [{ startDate, endDate }],
                metrics: [{ name: "sessions" }],
                dimensions: [{ name: "date" }],
            },
            {
                headers: {
                    Authorization: `Bearer ${ACCESS_TOKEN}`,
                    "Content-Type": "application/json",
                },
            }
        );

        const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
        const formattedData = daysOfWeek.map(day => ({
            name: day,
            users: 0,
        }));

        response?.data?.rows?.forEach(row => {
            const date = row.dimensionValues[0].value;
            const visits = parseInt(row.metricValues[0].value, 10);
            const dayOfWeek = dayjs(date, 'YYYYMMDD').format('dddd');

            const index = daysOfWeek.indexOf(dayOfWeek);
            if (index !== -1) {
                formattedData[index].users = visits;
            }
        });

        return formattedData;
    } catch (error) {
        console.error("Error with fetching", error.response?.data || error);
    }
};




const fetchAnalyticsDataForCurrentMonth = async () => {
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = (`0${date.getMonth() + 1}`).slice(-2);
        const day = (`0${date.getDate()}`).slice(-2);
        return `${year}-${month}-${day}`;
    };

    const startDate = formatDate(startOfMonth);
    const endDate = formatDate(today);

    try {
        const response = await axios.post(
            `https://analyticsdata.googleapis.com/v1beta/${PROPERTY_ID}:runReport`,
            {
                dateRanges: [{ startDate, endDate }],
                metrics: [{ name: "sessions" }],
                dimensions: [{ name: "date" }],
            },
            {
                headers: {
                    Authorization: `Bearer ${ACCESS_TOKEN}`,
                    "Content-Type": "application/json",
                },
            }
        );

        const dataMap = new Map();
        response?.data?.rows?.forEach(row => {
            const day = parseInt(row.dimensionValues[0].value.slice(-2), 10);
            dataMap.set(day, parseInt(row.metricValues[0].value, 10));
        });

        const result = [];
        for (let day = 1; day <= today.getDate(); day++) {
            result.push({
                name: day,
                users: dataMap.get(day) || 0
            });
        }

        return result;
    } catch (error) {
        console.error("Error with fetching", error.response?.data || error);
    }
};


const fetchAnalyticsDataForToday = async () => {
    const today = new Date();

    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = (`0${date.getMonth() + 1}`).slice(-2);
        const day = (`0${date.getDate()}`).slice(-2);
        return `${year}-${month}-${day}`;
    };

    const todayFormatted = formatDate(today);

    try {
        const response = await axios.post(
            `https://analyticsdata.googleapis.com/v1beta/${PROPERTY_ID}:runReport`,
            {
                dateRanges: [{ startDate: todayFormatted, endDate: todayFormatted }],
                metrics: [{ name: "sessions" }],
                dimensions: [{ name: "date" }, { name: "hour" }],
            },
            {
                headers: {
                    Authorization: `Bearer ${ACCESS_TOKEN}`,
                    "Content-Type": "application/json",
                },
            }
        );

        // const formatData = (response) => {
        //     const data = Array.from({ length: 24 }, (_, i) => ({
        //         name: i.toString(),
        //         users: 0,
        //     }));
        //
        //     response.forEach((row) => {
        //         const hour = parseInt(row.dimensionValues[1].value, 10);
        //         const visits = parseInt(row.metricValues[0].value, 10);
        //         // Dodaj posete u odgovarajući sat
        //         for (let i = hour; i < 24; i++) {
        //             data[i].users += visits;
        //         }
        //     });
        //
        //     return data;
        // };
        // const data = formatData(response.data.rows);

        const data = Array.from({ length: 24 }, (_, i) => ({
            name: i.toString(),
            users: 0,
        }));

        response?.data?.rows?.forEach((row) => {
            const hour = parseInt(row.dimensionValues[1].value, 10);
            const visits = parseInt(row.metricValues[0].value, 10);
            data[hour].users = visits;
        });

        return data;
    } catch (error) {
        console.error("Error with fetching", error.response?.data || error);
    }
};


const fetchAnalyticsDataForYesterday = async () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = (`0${date.getMonth() + 1}`).slice(-2);
        const day = (`0${date.getDate()}`).slice(-2);
        return `${year}-${month}-${day}`;
    };

    const yesterdayFormatted = formatDate(yesterday);

    try {
        const response = await axios.post(
            `https://analyticsdata.googleapis.com/v1beta/${PROPERTY_ID}:runReport`,
            {
                dateRanges: [{ startDate: yesterdayFormatted, endDate: yesterdayFormatted }],
                metrics: [{ name: "sessions" }],
                dimensions: [{ name: "date" }, { name: "hour" }],
            },
            {
                headers: {
                    Authorization: `Bearer ${ACCESS_TOKEN}`,
                    "Content-Type": "application/json",
                },
            }
        );

        const data = Array.from({ length: 24 }, (_, i) => ({
            name: i.toString(),
            users: 0,
        }));

        response?.data?.rows?.forEach((row) => {
            const hour = parseInt(row.dimensionValues[1].value, 10);
            const visits = parseInt(row.metricValues[0].value, 10);
            data[hour].users = visits;
        });

        return data;
    } catch (error) {
        console.error("Error with fetching", error.response?.data || error);
    }
};



export {fetchAnalyticsDataForWeek, fetchAnalyticsDataForCurrentMonth,
    fetchAnalyticsDataForPreviousWeek, fetchAnalyticsDataForToday,
    fetchAnalyticsDataForYesterday};
