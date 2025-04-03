import {
    Area,
    AreaChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from "recharts";
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip as TooltipChartJs, Legend } from 'chart.js';
import {
    fetchAnalyticsDataForWeek,
    fetchAnalyticsDataForPreviousWeek,
    fetchAnalyticsDataForCurrentMonth,
    fetchAnalyticsDataForToday,
    fetchAnalyticsDataForYesterday
} from "../../components/GoogleAnalytics.jsx";
import {useEffect, useState} from "react";
import {Button} from "antd";
ChartJS.register(ArcElement, TooltipChartJs, Legend);





const data1 = {
    labels: ['Admin', 'User', 'Guest'],
    datasets: [
        {
            label: 'User Roles',
            data: [50, 30, 20],
            backgroundColor: ['#8884d8', '#82ca9d', '#ff7300'],
            hoverOffset: 4,
        },
    ],
};
const dataAge = {
    labels: ['18-24', '25-34', '35-44', '45+'], // Četiri starosne grupe
    datasets: [
        {
            label: 'Number of Users',
            data: [120, 300, 180, 100],  // Broj korisnika po starosnim grupama
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'], // Boje za svaku grupu
            hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],  // Boje pri hoveru
        },
    ],
};
const options = {
    responsive: true,
    plugins: {
        legend: {
            labels: {
                color: 'white',
                font: {
                    weight: 'bold',
                    size: '12px'
                },
            },
        },
    },
};


export const AdminUsersChart = () => {
    const [data, setData] = useState([]);
    const [option, setOption] = useState("thisweek");

    const loadThisWeek = async () => {
        try{
            const r = await fetchAnalyticsDataForWeek();
            setData(r);
        }catch (err){}
    }

    const loadToday = async () => {
        try{
            const r = await fetchAnalyticsDataForToday();
            setData(r);
        }catch (err){}
    }

    const loadYesterday = async () => {
        try{
            const r = await fetchAnalyticsDataForYesterday();
            setData(r);
        }catch (err){}
    }

    const loadPreviousWeek = async () => {
        try{
            const r = await fetchAnalyticsDataForPreviousWeek();
            setData(r);
        }catch (err){}
    }

    const loadThisMonth = async () => {
        try{
            const r = await fetchAnalyticsDataForCurrentMonth();
            setData(r);
        }catch (err){}
    }

    useEffect(() => {
        switch (option){
            case ('thisweek'):
                loadThisWeek();
                break;
            case ('thismonth'):
                loadThisMonth();
                break;
            case ('previousweek'):
                loadPreviousWeek();
                break
            case ('today'):
                loadToday();
                break;
            case ('yesterday'):
                loadYesterday();
                break;
        }
    }, [option])


    return (
        <>
            <h1 className={"text-white text-2xl text-center mb-5"}>ACTIVE USERS CHART</h1>
            <ResponsiveContainer height={300} className={"z-0 user-activity-graph"}>
                <div className={"w-full flex justify-between my-5"}>
                    <Button onClick={() => setOption("thisweek")}>This week</Button>
                    <Button onClick={() => setOption("thismonth")}>This month</Button>
                    <Button onClick={() => setOption("previousweek")}>Previous week</Button>
                    <Button onClick={() => setOption("today")}>Today</Button>
                    <Button onClick={() => setOption("yesterday")}>Yesterday</Button>
                </div>
                <AreaChart
                    data={data}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                        <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Area
                        type="monotone"
                        dataKey="users"
                        stroke="#82ca9d"
                        fillOpacity={1}
                        fill="url(#colorUsers)"
                    />
                </AreaChart>
            </ResponsiveContainer>
            <div className={"w-full flex flex-col sm:flex-row justify-around my-10"}>
                <div className={"w-full sm:w-1/3 mt-5"}>
                    <Pie data={data1} options={options}/>
                </div>
                <div className={"w-full sm:w-1/3 mt-5"}>
                    <Pie data={dataAge} options={options}/>
                </div>
            </div>
        </>
    );
}