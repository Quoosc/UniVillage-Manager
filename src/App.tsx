import { TopNav } from "./components/TopNav";
import { Sidebar } from "./components/Sidebar";
import { StatCard } from "./components/StatCard";
import { UserManagement } from "./components/UserManagement";
import { PlaceManagement } from "./components/PlaceManagement";
import { ReportsManagement } from "./components/ReportsManagement";
import { SystemSettings } from "./components/SystemSettings";
import { MasterDataManagement } from "./components/MasterDataManagement"; 
import {
  Users,
  MapPin,
  Clock,
  AlertCircle,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useState } from "react";

const newPostsData = [
  { month: "Jan", posts: 45 },
  { month: "Feb", posts: 52 },
  { month: "Mar", posts: 61 },
  { month: "Apr", posts: 58 },
  { month: "May", posts: 70 },
  { month: "Jun", posts: 85 },
];

const trendingLocationsData = [
  { location: "Campus Park", visits: 234 },
  { location: "Library", visits: 198 },
  { location: "Student Center", visits: 176 },
  { location: "Coffee Shop", visits: 145 },
  { location: "Sports Complex", visits: 132 },
];

export default function App() {
  const [activePage, setActivePage] = useState("Dashboard");

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNav />

        <main className="flex-1 overflow-y-auto">
          {activePage === "Dashboard" && (
            <div className="p-6">
              <div className="max-w-7xl mx-auto">
                <h1 className="text-2xl font-bold mb-6 text-gray-800">
                  Dashboard Overview
                </h1>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <StatCard
                    title="Total Users"
                    value="2,847"
                    icon={<Users className="w-6 h-6" />}
                    trend="+12.5%"
                    trendUp={true}
                    color="blue"
                  />
                  <StatCard
                    title="Total Places"
                    value="1,234"
                    icon={<MapPin className="w-6 h-6" />}
                    trend="+8.2%"
                    trendUp={true}
                    color="green"
                  />
                  <StatCard
                    title="Pending Approvals"
                    value="47"
                    icon={<Clock className="w-6 h-6" />}
                    trend="-3.1%"
                    trendUp={false}
                    color="orange"
                  />
                  <StatCard
                    title="Reports"
                    value="23"
                    icon={<AlertCircle className="w-6 h-6" />}
                    trend="+5.4%"
                    trendUp={true}
                    color="red"
                  />
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Line Chart */}
                  <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-semibold mb-4 text-gray-800">
                      New Posts Over Time
                    </h3>
                    <ResponsiveContainer
                      width="100%"
                      height={300}
                    >
                      <LineChart data={newPostsData}>
                        <CartesianGrid
                          strokeDasharray="3 3"
                          stroke="#f0f0f0"
                        />
                        <XAxis
                          dataKey="month"
                          stroke="#6b7280"
                        />
                        <YAxis stroke="#6b7280" />
                        <Tooltip />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="posts"
                          stroke="#3b82f6"
                          strokeWidth={2}
                          dot={{ fill: "#3b82f6", r: 4 }}
                          activeDot={{ r: 6 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Bar Chart */}
                  <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-semibold mb-4 text-gray-800">
                      Top Trending Locations
                    </h3>
                    <ResponsiveContainer
                      width="100%"
                      height={300}
                    >
                      <BarChart data={trendingLocationsData}>
                        <CartesianGrid
                          strokeDasharray="3 3"
                          stroke="#f0f0f0"
                        />
                        <XAxis
                          dataKey="location"
                          stroke="#6b7280"
                        />
                        <YAxis stroke="#6b7280" />
                        <Tooltip />
                        <Legend />
                        <Bar
                          dataKey="visits"
                          fill="#10b981"
                          radius={[4, 4, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activePage === "User Management" && (
            <UserManagement />
          )}

          {activePage === "Place Management" && (
            <PlaceManagement />
          )}

          {/* 2. Thêm điều kiện hiển thị Master Data */}
          {activePage === "Master Data" && (
            <MasterDataManagement />
          )}

          {activePage === "Reports" && <ReportsManagement />}

          {activePage === "Settings" && <SystemSettings />}
        </main>
      </div>
    </div>
  );
}