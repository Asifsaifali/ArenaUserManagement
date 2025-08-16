import React, { useEffect, useState } from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { BarChart } from '@mui/x-charts/BarChart';
import axios from 'axios';

const Graph = () => {
  const [weeklyData, setWeeklyData] = useState({
    days: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
    activeUsers: Array(7).fill(0),
    expiringUsers: Array(7).fill(0),
    expiredUsers : Array(7).fill(0),
  });

  const [summary, setSummary] = useState({
    active: 0,
    expiring: 0,
    expired: 0,
  });

  useEffect(() => {
    const fetchGraphData = async () => {
      try {
        const res = await axios.get('/api/v1/graph-data'); 
        setWeeklyData({
          days: res?.data?.weekly?.days || weeklyData.days,
          activeUsers: res?.data?.weekly?.activeUsers || Array(7).fill(0),
          expiringUsers: res?.data?.weekly?.expiringUsers || Array(7).fill(0),
          expiredUsers: res?.data?.weekly?.expiredUsers || Array(7).fill(0),
        });
        setSummary(res?.data?.summary || summary);
      } catch (error) {
        console.error("Failed to fetch graph data", error);
      }
    };

    fetchGraphData();
  }, []);

  return (
    <div className="w-full flex flex-col lg:flex-row justify-between items-center gap-6">
      <BarChart
        xAxis={[{ data: weeklyData.days, scaleType: 'band' }]}
        series={[
          { data: weeklyData.activeUsers, label: 'Active Users' },
          { data: weeklyData.expiringUsers, label: 'Expiring Soon' },
          { data: weeklyData.expiredUsers, label: 'Expired User' },
        ]}
        width={window.innerWidth < 768 ? 300 : 600}
        height={300}
      />
      <PieChart
        series={[
          {
            data: [
              { id: 0, value: summary.active, label: 'Active Users' },
              { id: 1, value: summary.expiring, label: 'Expiring Soon' },
              { id: 2, value: summary.expired, label: 'Expired Users' },
            ],
          },
        ]}
        width={window.innerWidth < 768 ? 300 : 400}
        height={350}
      />
    </div>
  );
};

export default Graph;
