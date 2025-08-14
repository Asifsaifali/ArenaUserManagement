import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  Avatar,
  Typography,
  Button,
  Tooltip,
  Input,
} from "@material-tailwind/react";
import { PencilIcon } from "@heroicons/react/24/solid";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import axios from "axios";
import { motion } from "framer-motion";

export function Profile() {
  const [adminInfo, setAdminInfo] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [achievements, setAchievements] = useState([
    "Employee of the Month - June 2024",
    "Completed 100+ project reviews",
    "Launched 5 successful internal tools",
  ]);

  const [accountInfo, setAccountInfo] = useState({
    status: "Active",
    joined: "10 July 2025",
    lastLogin: "2 hours ago",
  });

  const [editAchievements, setEditAchievements] = useState(false);
  const [editAccountInfo, setEditAccountInfo] = useState(false);

  useEffect(() => {
    const fetchAdminDetails = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get(
          "http://localhost:3000/api/v1/admin/admin-details",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setAdminInfo(res.data);
      } catch (error) {
        console.error("Error fetching admin:", error);
      }
    };
    fetchAdminDetails();
  }, []);

  const updateProfile = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch("http://localhost:3000/api/v1/admin/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(adminInfo),
      });

      if (!res.ok) throw new Error("Failed to update profile");

      toast.success("Profile updated successfully");
      setEditMode(false);
    } catch (error) {
      toast.error("Error updating profile");
      console.error(error);
    }
  };

  return (
    <>
      {/* Background Image */}
      <motion.div
        className="relative mt-8 h-72 w-full overflow-hidden rounded-xl bg-[url('/img/background-image.png')] bg-cover bg-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 h-full w-full bg-gray-900/70" />
      </motion.div>

      {/* Profile Card */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <Card className="mx-3 -mt-16 mb-6 lg:mx-4 border border-blue-gray-100 shadow-md">
          <CardBody className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            {/* Left: Admin Details */}
            <motion.div
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-6 mb-8">
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Avatar
                    src="https://avatar.iran.liara.run/public/8"
                    alt="admin-avatar"
                    size="xl"
                    variant="rounded"
                    className="rounded-lg shadow-lg"
                  />
                </motion.div>
                <div>
                  <Typography variant="h5" color="blue-gray" className="mb-1">
                    {adminInfo?.name || "Admin"}
                  </Typography>
                  <Typography variant="small" className="text-blue-gray-600">
                    Admin Profile
                  </Typography>
                </div>
              </div>

              {!editMode ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-4"
                >
                  <div className="flex justify-between items-center">
                    <Typography variant="h6" color="blue-gray">
                      Profile Information
                    </Typography>
                    <Tooltip content="Edit Profile">
                      <PencilIcon
                        className="h-5 w-5 cursor-pointer text-blue-gray-500 hover:text-blue-700"
                        onClick={() => setEditMode(true)}
                      />
                    </Tooltip>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-blue-gray-700">
                    <p>
                      <strong>Name:</strong> {adminInfo?.name}
                    </p>
                    <p>
                      <strong>Email:</strong> {adminInfo?.email}
                    </p>
                    <p>
                      <strong>Mobile:</strong> +91-9664524865
                    </p>
                    <p>
                      <strong>Location:</strong> India
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-4"
                >
                  <Typography variant="h6" color="blue-gray">
                    Edit Profile
                  </Typography>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="First Name"
                      value={adminInfo.firstName}
                      onChange={(e) =>
                        setAdminInfo({ ...adminInfo, firstName: e.target.value })
                      }
                    />
                    <Input
                      label="Email"
                      value={adminInfo.email}
                      onChange={(e) =>
                        setAdminInfo({ ...adminInfo, email: e.target.value })
                      }
                    />
                    <Input
                      label="Mobile"
                      value={adminInfo.mobile}
                      onChange={(e) =>
                        setAdminInfo({ ...adminInfo, mobile: e.target.value })
                      }
                    />
                    <Input
                      label="Location"
                      value={adminInfo.location}
                      onChange={(e) =>
                        setAdminInfo({ ...adminInfo, location: e.target.value })
                      }
                    />
                  </div>
                  <div className="flex gap-4 mt-4">
                    <Button color="blue" onClick={updateProfile}>
                      Save
                    </Button>
                    <Button color="gray" onClick={() => setEditMode(false)}>
                      Cancel
                    </Button>
                  </div>
                </motion.div>
              )}
            </motion.div>

            {/* Right: Lottie Animation */}
            <motion.div
              className="hidden lg:flex justify-center items-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-full max-w-xs">
                <DotLottieReact
                  src="https://lottie.host/31097b5c-555c-47b3-b91d-b2ca09197e46/YGZqOiu5qQ.lottie"
                  loop
                  autoplay
                  style={{ width: "100%", height: "auto" }}
                />
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="text-center mt-4 text-sm"
                >
                  Keep your profile updated ✨
                </Typography>
              </div>
            </motion.div>
          </CardBody>

          {/* Bottom Section */}
          <motion.div
            className="mx-3 lg:mx-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-10"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { staggerChildren: 0.15 },
              },
            }}
          >
            {/* Achievements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Card className="p-4 shadow-md hover:shadow-lg transition">
                <Typography variant="h6">Achievements</Typography>
                {!editAchievements ? (
                  <ul className="list-disc list-inside mt-3">
                    {achievements.map((a, i) => (
                      <li key={i}>{a}</li>
                    ))}
                  </ul>
                ) : (
                  <div>
                    <Input
                      label="Edit Achievements"
                      value={achievements.join(", ")}
                      onChange={(e) =>
                        setAchievements(e.target.value.split(", "))
                      }
                    />
                  </div>
                )}
                <Button
                  variant="outlined"
                  size="sm"
                  className="mt-3"
                  onClick={() => setEditAchievements(!editAchievements)}
                >
                  {editAchievements ? "Save" : "Edit"}
                </Button>
              </Card>
            </motion.div>

            {/* Account Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <Card className="p-4 shadow-md hover:shadow-lg transition">
                <Typography variant="h6">Account Info</Typography>
                {!editAccountInfo ? (
                  <div className="mt-3 space-y-2">
                    <p>Status: {accountInfo.status}</p>
                    <p>Joined: {accountInfo.joined}</p>
                    <p>Last Login: {accountInfo.lastLogin}</p>
                  </div>
                ) : (
                  <div>
                    <Input
                      label="Status"
                      value={accountInfo.status}
                      onChange={(e) =>
                        setAccountInfo({
                          ...accountInfo,
                          status: e.target.value,
                        })
                      }
                    />
                  </div>
                )}
                <Button
                  variant="outlined"
                  size="sm"
                  className="mt-3"
                  onClick={() => setEditAccountInfo(!editAccountInfo)}
                >
                  {editAccountInfo ? "Save" : "Edit"}
                </Button>
              </Card>
            </motion.div>

            {/* Performance Overview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <Card className="p-4 shadow-md hover:shadow-lg transition">
                <Typography variant="h6">Performance Overview</Typography>
                <p className="mt-3">
                  You’ve completed 15 tasks this month, 20% more than last month.
                </p>
              </Card>
            </motion.div>

            {/* Team Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <Card className="p-4 shadow-md hover:shadow-lg transition">
                <Typography variant="h6">Team Summary</Typography>
                <p className="mt-3">
                  Your team has achieved 95% of quarterly goals.
                </p>
              </Card>
            </motion.div>

            {/* Pinned Note */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              <Card className="p-4 shadow-md hover:shadow-lg transition bg-gradient-to-r from-indigo-500 to-blue-500 text-white">
                <Typography variant="h6">Pinned Note</Typography>
                <p className="mt-3">Remember to update team roadmap by Friday.</p>
              </Card>
            </motion.div>
          </motion.div>
        </Card>
      </motion.div>
    </>
  );
}

export default Profile;
