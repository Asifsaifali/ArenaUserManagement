import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Button,
  Select,
  Option,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
export function Users() {

  const [loading, setLoading] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [users, setUsers] = useState([]);
  const itemsPerPage = 6;
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("");
  const baseUsers = filteredUsers.length > 0 ? filteredUsers : users;

  const sortedUsers = [...baseUsers].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return (a.firstName + a.lastName).localeCompare(b.firstName + b.lastName);
      case "dayleft":
        return a.subscription.daysLeft - b.subscription.daysLeft;
      case "date":
        return new Date(a.subscription.startDate) - new Date(b.subscription.startDate);
      case "active":
        return a.subscription.status === "active" ? -1 : 1;
      case "expiry":
        return a.subscription.status === "expired" ? -1 : 1;
      default:
        return 0;
    }
  });

  const totalPages = Math.ceil(sortedUsers.length / itemsPerPage);
  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const paginatedData = sortedUsers.slice(start, end);

  const handleSearch = () => {
    const trimmed = searchQuery.trim();
    if (!trimmed) {
      setFilteredUsers([]);
      return;
    }

    const result = users.filter((user) =>
      user.username.toLowerCase().includes(trimmed.toLowerCase())
    );
    setFilteredUsers(result);
    setPage(1);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handlePageChange = (newPage) => {
    setLoading(true);
    setTimeout(() => {
      setPage(newPage);
      setLoading(false);
    }, 300); // Adjust delay to match transition
  };

  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [openAdd, setOpenAdd] = useState(false);
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    subscription: {
      startDate: "",
      endDate: "",
      status: "active",
      daysLeft: 0
    }
  });
  const handleAddUser = async () => {
    try {
      await axios.post("/api/v1/users", newUser);
      setOpenAdd(false);
      window.location.reload();
    } catch (err) {
      console.error("Error adding new user:", err);
    }
  };


  const handleEdit = (user) => {
    console.time("Edit Click");
    setSelectedUser(user);
    setOpen(true);
    console.timeEnd("Edit Click");
  };


  const handleSave = async () => {
    try {
      await axios.put(`/api/v1/users/${selectedUser._id}`, selectedUser);
      setOpen(false);
      window.location.reload();
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/v1/users");
        setUsers(response.data.totalUsers);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Card>
          <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
            <div className="flex justify-between items-center">
              {/* Title on the left */}
              <Typography variant="h6" color="white">
                Arena Members
              </Typography>

              {/* Search bar on the right */}
              <div className="flex gap-2">
                <Input
                  variant="outlined"
                  placeholder="Search by @username"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-60 transition-all duration-300 ease-in-out text-white"
                />
                <Button
  onClick={handleSearch}
  className="flex items-center justify-center px-8 py-2 border border-transparent focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 transition-all duration-200"
>
  Search
</Button>


              </div>
            </div>


          </CardHeader>
          <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex justify-end items-center gap-4 px-6 mb-4 flex-wrap"
            >
              <div className="flex justify-between items-center gap-4">
                {/* Sort By - Left */}
                <div className="w-60">
                  <Select
                    label="Sort By"
                    value={sortBy}
                    onChange={(val) => setSortBy(val)}
                  >
                    <Option value="name">Name (A-Z)</Option>
                    <Option value="dayleft">Day Left</Option>
                    <Option value="date">Joining Date</Option>
                    <Option value="active">Active First</Option>
                    <Option value="expiry">Expired First</Option>
                  </Select>
                </div>
              </div>


              {/* ===== Add New User button ===== */}
              <Button
                color="green"
                onClick={() => {
                  setNewUser({
                    username: "",
                    firstName: "",
                    lastName: "",
                    email: "",
                    subscription: { startDate: "", endDate: "", daysLeft: 0, status: "Active" },
                  });
                  setOpenAdd(true);
                }}
              >
                Add New User
              </Button>
              {/* ========================================== */}

            </motion.div>

            <motion.table
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="w-full min-w-[640px] table-auto"
            >
              <thead>
                <tr>
                  {["username", "name", "joining date", "Day remaining", "status"].map((el) => (
                    <th
                      key={el}
                      className="border-b border-blue-gray-50 py-3 px-5 text-left"
                    >
                      <Typography
                        variant="small"
                        className="text-[11px] font-bold uppercase text-blue-gray-400"
                      >
                        {el}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <AnimatePresence mode="wait">
                  {!loading && paginatedData.map((user, key) => {
                    const className = `py-3 px-5 ${key === paginatedData.length - 1 ? "" : "border-b border-blue-gray-50"}`;

                    return (
                      <motion.tr
                        key={user._id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                      >
                        <td className={className}>
                          <Typography variant="small" color="blue-gray" className="font-semibold">
                            {user.username}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography variant="small" color="gray" className="font-semibold">
                            <strong>{user.firstName} {user.lastName}</strong>
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography variant="small" color="dark-gray" className="font-semibold">
                            {new Date(user.subscription.startDate).toLocaleDateString()}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography variant="small" color="dark-gray" className="font-semibold">
                            {user.subscription.daysLeft} days
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
                            {user.subscription.status.charAt(0).toUpperCase() + user.subscription.status.slice(1)}
                          </div>
                        </td>
                        <td className={className}>
                          <motion.button
                            whileTap={{ scale: 0.95 }}
                            transition={{ duration: 0.1 }}
                          >
                            <Button color="blue" size="sm" onClick={() => handleEdit(user)}>
                              Edit
                            </Button>
                          </motion.button>
                        </td>
                      </motion.tr>
                    );
                  })}
                </AnimatePresence>
              </tbody>

            </motion.table>

            {/* Pagination Controls */}
            <motion.div
              className="flex justify-center px-6 py-4 gap-2 flex-wrap items-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {page > 1 && (
                <button
                  onClick={() => handlePageChange(page - 1)}
                  className="px-3 py-1 rounded text-sm font-medium bg-black text-white hover:bg-gray-800"
                >
                  Prev
                </button>
              )}
              {Array.from({ length: 3 }, (_, i) => {
                const startPage = Math.max(1, Math.min(page - 1, totalPages - 2));
                const pageNumber = startPage + i;
                if (pageNumber > totalPages) return null;

                return (
                  <button
                    onClick={() => handlePageChange(pageNumber)}
                    className={`px-3 py-1 rounded text-sm font-medium ${pageNumber === page
                      ? "bg-black text-white"
                      : "bg-black text-white hover:bg-gray-800"
                      }`}
                  >
                    {pageNumber}
                  </button>
                );
              })}

              {page < totalPages && (
                <button
                  onClick={() => handlePageChange(page + 1)}
                  className="px-3 py-1 rounded text-sm font-medium bg-black text-white hover:bg-gray-800"
                >
                  Next
                </button>
              )}
            </motion.div>

            {/* Edit Modal */}
            <Dialog open={open} handler={() => setOpen(false)}>
              <DialogHeader>Edit User</DialogHeader>
              <DialogBody>
                <div className="flex flex-col gap-4">
                  <Input
                    label="Username"
                    value={selectedUser?.username || ""}
                    onChange={(e) =>
                      setSelectedUser({ ...selectedUser, username: e.target.value })
                    }
                  />
                  <Input
                    label="Name"
                    value={
                      selectedUser
                        ? `${selectedUser.firstName || ""} ${selectedUser.lastName || ""}`
                        : ""
                    }
                    onChange={(e) =>
                      setSelectedUser({ ...selectedUser, fullName: e.target.value })
                    }
                  />
                  <Input
                    label="Day Remaining"
                    value={selectedUser?.subscription?.daysLeft || ""}
                    onChange={(e) =>
                      setSelectedUser({
                        ...selectedUser,
                        subscription: {
                          ...selectedUser.subscription,
                          daysLeft: e.target.value,
                        },
                      })
                    }
                  />
                  <Select
                    label="Status"
                    placeholder="Select Status"
                    value={selectedUser?.subscription?.status || ""}
                    onChange={(val) =>
                      setSelectedUser({
                        ...selectedUser,
                        subscription: {
                          ...selectedUser.subscription,
                          status: val,
                        },
                      })
                    }
                  >
                    <Option value="Active">Active</Option>
                    <Option value="Expiring">Expiring</Option>
                    <Option value="Expired">Expired</Option>
                  </Select>
                </div>
              </DialogBody>
              <DialogFooter>
                <Button variant="text" onClick={() => setOpen(false)} color="gray">
                  Cancel
                </Button>
                <Button variant="gradient" color="green" onClick={handleSave}>
                  Save
                </Button>
              </DialogFooter>
            </Dialog>
            {/* ===== Add New User Dialog (paste after your existing Edit Dialog) ===== */}
            <Dialog open={openAdd} handler={() => setOpenAdd(false)}>
              <DialogHeader>Add New User</DialogHeader>
              <DialogBody>
                <div className="flex flex-col gap-4">
                  <Input
                    label="Username"
                    value={newUser.username}
                    onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                  />
                  <Input
                    label="First Name"
                    value={newUser.firstName}
                    onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })}
                  />
                  <Input
                    label="Last Name"
                    value={newUser.lastName}
                    onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })}
                  />
                  <Input
                    label="Email"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  />
                  <Input
                    type="date"
                    label="Start Date"
                    value={newUser.subscription.startDate}
                    onChange={(e) =>
                      setNewUser({
                        ...newUser,
                        subscription: { ...newUser.subscription, startDate: e.target.value },
                      })
                    }
                  />
                  <Input
                    type="date"
                    label="End Date"
                    value={newUser.subscription.endDate}
                    onChange={(e) =>
                      setNewUser({
                        ...newUser,
                        subscription: { ...newUser.subscription, endDate: e.target.value },
                      })
                    }
                  />
                  <Input
                    type="number"
                    label="Days Left"
                    value={newUser.subscription.daysLeft}
                    onChange={(e) =>
                      setNewUser({
                        ...newUser,
                        subscription: { ...newUser.subscription, daysLeft: e.target.value },
                      })
                    }
                  />
                  <Select
                    label="Status"
                    value={newUser.subscription.status}
                    onChange={(val) =>
                      setNewUser({
                        ...newUser,
                        subscription: { ...newUser.subscription, status: val },
                      })
                    }
                  >
                    <Option value="Active">Active</Option>
                    <Option value="Expiring">Expiring</Option>
                    <Option value="Expired">Expired</Option>
                  </Select>
                </div>
              </DialogBody>
              <DialogFooter>
                <Button variant="text" onClick={() => setOpenAdd(false)} color="gray">
                  Cancel
                </Button>
                <Button variant="gradient" color="green" onClick={handleAddUser}>
                  Save
                </Button>
              </DialogFooter>
            </Dialog>
            {/* ====================================================================== */}
          </CardBody>
        </Card>
      </motion.div>
    </div>

  );
}

export default Users;
