import React, { useEffect, useState, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import axios from "axios";

import Error from "./Error";
import Graph from "./Graph";
import LiveData from "./LiveData";
import { StatisticsCard } from "@/widgets/cards";

import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";

import {
  EllipsisVerticalIcon,
  ArrowUpIcon,
  ArrowPathIcon,
  UserPlusIcon,
  UsersIcon,
  ChartBarIcon,
  ExclamationTriangleIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";

export function Home() {
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [updatedAt, setUpdatedAt] = useState(Date.now());
  const [text, setText] = useState("Just Updated");
  const [spinning, setSpinning] = useState(false);
  const [month, setThisMonth] = useState({});
  const [latestUsers, setLatestUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [expiringSoonUsers, setExpiringSoonUsers] = useState([]);
  const [expiredUsers, setExpiredUsers] = useState([]);

  const fetchData = useCallback(async () => {
    try {
      const [latestUsersRes, totalUsersRes, monthlyUserRes] = await Promise.all([
        axios.get("/api/v1/latest-users"),
        axios.get("/api/v1/total-users"),
        axios.get("/api/v1/monthly-users-stats"),
      ]);

      // console.log("Latest user:", latestUsersRes.data.latestUsers.length);

      setLatestUsers(latestUsersRes.data.latestUsers || []);
      // Adjust depending on whether totalUsers is a number or array
      const totalUsersData = totalUsersRes.data.totalUsers;
      setTotalUsers(Array.isArray(totalUsersData) ? totalUsersData.length : totalUsersData || 0);
      setThisMonth(monthlyUserRes.data || {});

      const expiringSoon = totalUsersData.filter(user => {
        const daysLeft = user.subscription?.daysLeft;
        const status = user.subscription?.status?.toLowerCase();
        return status === "active" && daysLeft > 0 && daysLeft <= 10;
      });

      const expired = totalUsersData.filter(user => {
        return user.subscription?.status?.toLowerCase() === "expired";
      });

      setExpiringSoonUsers(expiringSoon);
      setExpiredUsers(expired);

    } catch (error) {
      console.error("Fetch error:", error);
    }
  }, []);


  useEffect(() => {
    fetchData();

    const updateTime = setInterval(() => setLastUpdated(new Date()), 10000);

    const timeText = setInterval(() => {
      const seconds = Math.floor((Date.now() - updatedAt) / 1000);
      setText(
        seconds < 2
          ? "Just Updated"
          : seconds < 60
            ? `Updated ${seconds}s ago`
            : `Updated ${Math.floor(seconds / 60)}m ago`
      );
    }, 1000);

    return () => {
      clearInterval(updateTime);
      clearInterval(timeText);
    };
  }, [updatedAt, fetchData]);

  const handleRefresh = () => {
    setSpinning(true);
    setUpdatedAt(Date.now());
    fetchData();
    setTimeout(() => setSpinning(false), 500);
  };

  const getInitials = (name) => {
    const parts = name.trim().split(" ");
    return (parts[0]?.[0] || "") + (parts[1]?.[0] || "");
  };
  const thisMonth = Number(month?.thisMonthCount) || 0;
  const lastMonth = Number(month?.lastMonthCount) || 0;

  const percent =
    lastMonth === 0
      ? thisMonth === 0
        ? 0
        : Infinity
      : ((thisMonth - lastMonth) / lastMonth) * 100;

  const footer = useMemo(() => {
    const thisMonth = Number(month?.thisMonthCount) || 0;
    const lastMonth = Number(month?.lastMonthCount) || 0;

    const percent =
      lastMonth === 0
        ? thisMonth === 0
          ? 0
          : 100
        : ((thisMonth - lastMonth) / lastMonth) * 100;

    return {
      color:
        percent === 0
          ? "text-gray-500"
          : percent > 0
            ? "text-green-500"
            : "text-red-500",
      value: `${percent > 0 ? "+" : ""}${percent.toFixed(1)}%`,
      label:
        lastMonth === 0
          ? thisMonth === 0
            ? "no change"
            : `${thisMonth} new users this month`
          : "than last month",
    };
  }, [month]);

  const statisticsCardsData = [
    {
      color: "gray",
      icon: UsersIcon,
      title: "Total Members",
      value: `${totalUsers} Users`,
      footer,
    },
    {
      color: "gray",
      icon: UserPlusIcon,
      title: "Newly Joined",
      value: `${latestUsers.length} Users`,
      footer: {
        color: "text-green-500",
        value: latestUsers?.[4]?.subscription?.startDate
          ? `📅 Last Joined on ${new Date(latestUsers[4].subscription.startDate).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}`
          : "📅 Date not available",

      }

    },
    {
      color: "orange",
      icon: ExclamationTriangleIcon,
      title: "Expiring Soon",
      value: `${expiringSoonUsers.length} Users`,
      footer: {
        color: "text-orange-600",
        value: "⏰",
        label: "Need attention in 10 days",
      },
    },
    {
      color: "red",
      icon: XCircleIcon,
      title: "Expired Subscriptions",
      value: `${expiredUsers.length} Users`,
      footer: {
        color: "text-red-600",
        value: "⚠️",
        label: "Inactive and not renewed",
      },
    }

  ];



  return (
    <div className="mt-12">
      {/* Statistics Cards */}
      <motion.div
        className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        {statisticsCardsData.map(({ icon, title, footer, ...rest }) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <StatisticsCard
              {...rest}
              title={title}
              icon={React.createElement(icon, {
                className: "w-6 h-6 text-white",
              })}
              footer={
                <Typography className="font-normal text-blue-gray-600">
                  <strong className={footer.color}>{footer.value}</strong>&nbsp;{footer.label}
                </Typography>
              }
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Graph Section */}
      <div className="mb-6 grid grid-cols-1 gap-y-12 gap-x-6 md:grid-cols-2 xl:grid-cols-3">
        <Graph />
      </div>

      {/* New Users & Live Stock Data */}
      <motion.div
        className="mb-4 grid grid-cols-1 gap-6 xl:grid-cols-3"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        {/* Newly Joined Users */}
        <Card className="overflow-hidden xl:col-span-2 border border-blue-gray-100 shadow-sm">
          <CardHeader className="m-0 flex items-center justify-between p-6">
            <div>
              <Typography variant="h6" color="blue-gray" className="mb-1">
                Newly Joined Users
              </Typography>
              <Typography variant="small" className="flex items-center gap-1 font-normal text-blue-gray-600">
                <div className="flex items-center gap-2">
                  <strong>{text}</strong>
                  <ArrowPathIcon
                    strokeWidth={3}
                    onClick={handleRefresh}
                    className={`h-4 w-4 text-blue-gray-800 cursor-pointer transition-transform duration-500 ${spinning ? "animate-spin" : ""
                      }`}
                  />
                </div>
              </Typography>
            </div>
            <Menu placement="left-start">
              <MenuHandler>
                <IconButton size="sm" variant="text" color="blue-gray">
                  <EllipsisVerticalIcon strokeWidth={3} className="h-6 w-6" />
                </IconButton>
              </MenuHandler>
              <MenuList>
                <MenuItem>Action</MenuItem>
                <MenuItem>Another Action</MenuItem>
                <MenuItem>Something else here</MenuItem>
              </MenuList>
            </Menu>
          </CardHeader>
          <CardBody className="overflow-x-auto px-0 pt-0 pb-2">
            <table className="w-full min-w-[640px] table-auto">
              <thead>
                <tr>
                  {["Profile", "username", "names", "Day Remaining", "Status"].map((el) => (
                    <th key={el} className="border-b border-blue-gray-50 py-3 px-6 text-left">
                      <Typography variant="small" className="text-[11px] font-medium uppercase text-blue-gray-400">
                        {el}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {latestUsers.map((user, key) => {
                  const isLast = key === latestUsers.length - 1;
                  const className = `py-3 px-5 ${!isLast ? "border-b border-blue-gray-50" : ""}`;

                  return (
                    <tr key={user._id} className="hover:bg-blue-gray-50">
                      <td className={className}>
                        <Stack direction="row" spacing={2}>
                          <Avatar sx={{ bgcolor: "black", color: "white" }} alt="Avatar">
                            {getInitials(`${user.firstName} ${user.lastName}`)}
                          </Avatar>
                        </Stack>
                      </td>
                      <td className={className}>{user.username}</td>
                      <td className={className}>
                        <Typography variant="small" className="text-xs font-medium text-blue-gray-600">
                          {user.firstName + " " + user.lastName}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography variant="small" className="text-xs font-medium text-blue-gray-600">
                          {user.subscription.daysLeft}
                        </Typography>
                      </td>
                      <td className={className}>
                        <div
                          className={`rounded-full px-4 py-1 text-xs font-semibold text-white text-center ${user.subscription.status.toLowerCase() === "active"
                            ? "bg-green-600"
                            : user.subscription.status.toLowerCase() === "expiring"
                              ? "bg-orange-500"
                              : "bg-red-600"
                            }`}
                          style={{ width: "100px" }}
                        >
                          {user.subscription.status.toUpperCase()}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </CardBody>
        </Card>

        {/* Live Stock Market */}
        <Card className="border border-blue-gray-100 shadow-sm">
          <CardHeader className="m-0 p-6">
            <Typography variant="h6" color="blue-gray" className="mb-2">
              Live Stock Market Data
            </Typography>
            <Typography variant="small" className="flex items-center gap-1 font-normal text-blue-gray-600">
              <ArrowUpIcon strokeWidth={3} className="h-3.5 w-3.5 text-green-500" />
              <span>
                ⏰ Last updated at <strong>{lastUpdated.toLocaleTimeString()}</strong>
              </span>
            </Typography>
          </CardHeader>
          <LiveData />
        </Card>
      </motion.div>
    </div>
  );
}

export default Home;
