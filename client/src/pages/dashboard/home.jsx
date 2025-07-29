import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
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
  Avatar,
  Tooltip,
  Progress,
} from "@material-tailwind/react";
import { PieChart } from '@mui/x-charts/PieChart';
import { BarChart } from '@mui/x-charts/BarChart';
import {
  EllipsisVerticalIcon,
  ArrowUpIcon,
} from "@heroicons/react/24/outline";
import { StatisticsCard } from "@/widgets/cards";
import {
  statisticsCardsData,
  projectsTableData,
  ordersOverviewData,
} from "@/data";
import { CheckCircleIcon, ClockIcon, ArrowPathIcon } from "@heroicons/react/24/solid";

export function Home() {

  const [updatedAt, setUpdatedAt] = useState(Date.now());
  const [text, setText] = useState("Just Updated");
  const [spinning, setSpinning] = useState(false);


  useEffect(() => {
    const interval = setInterval(() => {
      const seconds = Math.floor((Date.now() - updatedAt) / 1000);
      if (seconds < 2) setText("Just Updated");
      else if (seconds < 60) setText(`Updated ${seconds}s ago`);
      else setText(`Updated ${Math.floor(seconds / 60)}m ago`);
    }, 1000);
    return () => clearInterval(interval);
  }, [updatedAt]);


  const handleRefresh = () => {
    setSpinning(true);
    setUpdatedAt(Date.now());
    setTimeout(() => setSpinning(false), 500); // stop spin after 0.5s
  };



  return (
    <div className="mt-12">
      <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
        {statisticsCardsData.map(({ icon, title, footer, ...rest }) => (
          <StatisticsCard
            key={title}
            {...rest}
            title={title}
            icon={React.createElement(icon, {
              className: "w-6 h-6 text-white",
            })}
            footer={
              <Typography className="font-normal text-blue-gray-600">
                <strong className={footer.color}>{footer.value}</strong>
                &nbsp;{footer.label}
              </Typography>
            }
          />
        ))}
      </div>
      <div className="mb-6 grid grid-cols-1 gap-y-12 gap-x-6 md:grid-cols-2 xl:grid-cols-3">
        <div className="w-full flex flex-col lg:flex-row justify-between items-center gap-6">
          <BarChart
            xAxis={[
              {
                data: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
                scaleType: 'band',
              },
            ]}
            series={[
              { data: [1, 4, 5, 3, 2, 4, 6], label: 'Active Users' },
              { data: [2, 3, 4, 1, 3, 5, 2], label: 'New Users' },
              { data: [3, 2, 1, 4, 5, 1, 3], label: 'Expiring Users' },
            ]}
            width={window.innerWidth < 768 ? 300 : 600}
            height={300}
          />
          <PieChart
            series={[
              {
                data: [
                  { id: 0, value: 10, label: 'Active Users' },
                  { id: 1, value: 15, label: 'New Users' },
                  { id: 2, value: 20, label: 'Expiring Users' },
                ],
              },
            ]}
            width={window.innerWidth < 768 ? 300 : 400}
            height={350}
          />
        </div>


      </div>
      <div className="mb-4 grid grid-cols-1 gap-6 xl:grid-cols-3">
        <Card className="overflow-hidden xl:col-span-2 border border-blue-gray-100 shadow-sm">
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 flex items-center justify-between p-6"
          >
            <div>
              <Typography variant="h6" color="blue-gray" className="mb-1">
                Newly Joined Users
              </Typography>
              <Typography
                variant="small"
                className="flex items-center gap-1 font-normal text-blue-gray-600"
              >
                <div className="flex items-center gap-2">
                  <strong>{text}</strong>
                  <ArrowPathIcon
                    strokeWidth={3}
                    onClick={handleRefresh}
                    className={`h-4 w-4 text-blue-gray-800 cursor-pointer transition-transform duration-500 cursor-pointer ${spinning ? "animate-spin" : ""
                      }`}
                  />
                </div>
              </Typography>
            </div>
            <Menu placement="left-start">
              <MenuHandler>
                <IconButton size="sm" variant="text" color="blue-gray">
                  <EllipsisVerticalIcon
                    strokeWidth={3}
                    fill="currenColor"
                    className="h-6 w-6"
                  />
                </IconButton>
              </MenuHandler>
              <MenuList>
                <MenuItem>Action</MenuItem>
                <MenuItem>Another Action</MenuItem>
                <MenuItem>Something else here</MenuItem>
              </MenuList>
            </Menu>
          </CardHeader>
          <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
            <table className="w-full min-w-[640px] table-auto">
              <thead>
                <tr>
                  {["users", "names", "budget", "status"].map(
                    (el) => (
                      <th
                        key={el}
                        className="border-b border-blue-gray-50 py-3 px-6 text-left"
                      >
                        <Typography
                          variant="small"
                          className="text-[11px] font-medium uppercase text-blue-gray-400"
                        >
                          {el}
                        </Typography>
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {projectsTableData.map(
                  ({ img, name, members, budget, completion }, key) => {
                    const className = `py-3 px-5 ${key === projectsTableData.length - 1
                        ? ""
                        : "border-b border-blue-gray-50"
                      }`;

                    return (
                      <tr key={name}>
                        <td className={className}>
                          <div className="flex items-center gap-4">
                            <Avatar src={img} alt={name} size="sm" />
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-bold"
                            >
                              {name}
                            </Typography>
                          </div>
                        </td>
                        <td className={className}>
                          {members.map(({ img, name }, key) => (
                            <Tooltip key={name} content={name}>
                              <Avatar
                                src={img}
                                alt={name}
                                size="xs"
                                variant="circular"
                                className={`cursor-pointer border-2 border-white ${key === 0 ? "" : "-ml-2.5"
                                  }`}
                              />
                            </Tooltip>
                          ))}
                        </td>
                        <td className={className}>
                          <Typography
                            variant="small"
                            className="text-xs font-medium text-blue-gray-600"
                          >
                            {budget}
                          </Typography>
                        </td>
                        <td className={className}>
                          <div className="w-10/12">
                            <Typography
                              variant="small"
                              className="mb-1 block text-xs font-medium text-blue-gray-600"
                            >
                              {completion}%
                            </Typography>
                            <Progress
                              value={completion}
                              variant="gradient"
                              color={completion === 100 ? "green" : "blue"}
                              className="h-1"
                            />
                          </div>
                        </td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
          </CardBody>
        </Card>
        <Card className="border border-blue-gray-100 shadow-sm">
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 p-6"
          >
            <Typography variant="h6" color="blue-gray" className="mb-2">
              Orders Overview
            </Typography>
            <Typography
              variant="small"
              className="flex items-center gap-1 font-normal text-blue-gray-600"
            >
              <ArrowUpIcon
                strokeWidth={3}
                className="h-3.5 w-3.5 text-green-500"
              />
              <strong>24%</strong> this month
            </Typography>
          </CardHeader>
          <CardBody className="pt-0">
            {ordersOverviewData.map(
              ({ icon, color, title, description }, key) => (
                <div key={title} className="flex items-start gap-4 py-3">
                  <div
                    className={`relative p-1 after:absolute after:-bottom-6 after:left-2/4 after:w-0.5 after:-translate-x-2/4 after:bg-blue-gray-50 after:content-[''] ${key === ordersOverviewData.length - 1
                        ? "after:h-0"
                        : "after:h-4/6"
                      }`}
                  >
                    {React.createElement(icon, {
                      className: `!w-5 !h-5 ${color}`,
                    })}
                  </div>
                  <div>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="block font-medium"
                    >
                      {title}
                    </Typography>
                    <Typography
                      as="span"
                      variant="small"
                      className="text-xs font-medium text-blue-gray-500"
                    >
                      {description}
                    </Typography>
                  </div>
                </div>
              )
            )}
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

export default Home;
