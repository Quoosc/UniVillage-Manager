import {
  Search,
  Filter,
  MoreVertical,
  Eye,
  Ban,
  CheckCircle,
  ShieldAlert,
  X,
  Mail,
  Calendar,
  MapPin,
  FileText,
  Map as MapIcon,
  MessageSquare,
  Check,
  XCircle,
} from "lucide-react";
import { useState } from "react";

// --- Component phụ trợ ---
const Avatar = ({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) => {
  const [error, setError] = useState(false);
  return (
    <img
      src={
        error
          ? `https://ui-avatars.com/api/?name=${encodeURIComponent(alt)}&background=random`
          : src
      }
      alt={alt}
      onError={() => setError(true)}
      className={`object-cover ${className}`}
    />
  );
};

const Modal = ({ isOpen, onClose, title, children }: any) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div
        className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <h3 className="font-bold text-lg text-gray-900">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

// --- Types & Data ---
interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: "Người dùng" | "Chủ cửa hàng" | "Admin";
  status: "Hoạt động" | "Bị khóa";
  joinDate: string;
  location: string;
  isRequestingStoreOwner?: boolean; // Cờ đánh dấu đang yêu cầu nâng quyền
  stats: {
    posts: number;
    tours: number;
    connections: number;
  };
}

// Mock Data: Thêm trường isRequestingStoreOwner = true cho một số user
const mockUsers: User[] = [
  {
    id: "#USER-001",
    name: "Nguyễn Văn A",
    email: "nguyenvana@university.edu.vn",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    role: "Người dùng",
    status: "Hoạt động",
    joinDate: "01/01/2024",
    location: "Khu A",
    stats: { posts: 12, tours: 5, connections: 24 },
  },
  {
    id: "#USER-002",
    name: "Trần Thị B",
    email: "tranthib@university.edu.vn",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    role: "Chủ cửa hàng",
    status: "Hoạt động",
    joinDate: "15/02/2024",
    location: "Làng Đại học",
    stats: { posts: 45, tours: 0, connections: 156 },
  },
  {
    id: "#USER-003",
    name: "Lê Hoàng C",
    email: "lehoangc@university.edu.vn",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    role: "Admin",
    status: "Hoạt động",
    joinDate: "10/11/2023",
    location: "Trung tâm",
    stats: { posts: 2, tours: 1, connections: 10 },
  },
  {
    id: "#USER-004",
    name: "Phạm Minh D",
    email: "phamminhd@university.edu.vn",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    role: "Người dùng",
    status: "Bị khóa",
    joinDate: "05/05/2024",
    location: "Khu B",
    stats: { posts: 0, tours: 0, connections: 0 },
  },
  {
    id: "#USER-005",
    name: "Vũ Thu E",
    email: "vuthue@university.edu.vn",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    role: "Chủ cửa hàng",
    status: "Hoạt động",
    joinDate: "20/01/2024",
    location: "Khu A",
    stats: { posts: 88, tours: 2, connections: 300 },
  },
  // 3 User đang yêu cầu nâng quyền
  {
    id: "#USER-006",
    name: "Đặng Quốc F",
    email: "dangquocf@university.edu.vn",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop",
    role: "Người dùng",
    status: "Hoạt động",
    isRequestingStoreOwner: true,
    joinDate: "12/12/2024",
    location: "Khu B",
    stats: { posts: 5, tours: 1, connections: 12 },
  },
  {
    id: "#USER-007",
    name: "Hoàng Thị G",
    email: "hoangthig@university.edu.vn",
    avatar:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop",
    role: "Người dùng",
    status: "Hoạt động",
    isRequestingStoreOwner: true,
    joinDate: "01/11/2024",
    location: "Trung tâm",
    stats: { posts: 8, tours: 0, connections: 5 },
  },
  {
    id: "#USER-008",
    name: "Bùi Văn H",
    email: "buivanh@university.edu.vn",
    avatar:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop",
    role: "Người dùng",
    status: "Hoạt động",
    isRequestingStoreOwner: true,
    joinDate: "09/09/2024",
    location: "Làng Đại học",
    stats: { posts: 10, tours: 2, connections: 30 },
  },
];

const roleColors = {
  "Người dùng": "bg-blue-50 text-blue-700 border-blue-100",
  "Chủ cửa hàng":
    "bg-purple-50 text-purple-700 border-purple-100",
  Admin: "bg-gray-100 text-gray-700 border-gray-200",
};

const statusColors = {
  "Hoạt động": "bg-green-50 text-green-700 ring-green-600/20",
  "Bị khóa": "bg-red-50 text-red-700 ring-red-600/20",
};

export function UserManagement() {
  const [activeTab, setActiveTab] = useState<
    "all" | "requests"
  >("all");
  const [openMenuId, setOpenMenuId] = useState<string | null>(
    null,
  );
  const [searchTerm, setSearchTerm] = useState("");

  // State cho Modal
  const [selectedUser, setSelectedUser] = useState<User | null>(
    null,
  );
  const [isProfileModalOpen, setIsProfileModalOpen] =
    useState(false);
  const [isWarningModalOpen, setIsWarningModalOpen] =
    useState(false);

  // State giả lập danh sách user (để demo chức năng xóa/duyệt)
  const [users, setUsers] = useState<User[]>(mockUsers);

  // Logic lọc dữ liệu
  const filteredUsers = users.filter((user) => {
    // Nếu tab là 'requests', chỉ lấy user có cờ isRequestingStoreOwner = true
    const matchesTab =
      activeTab === "all"
        ? true
        : user.isRequestingStoreOwner === true;
    const matchesSearch =
      user.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      user.email
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const handleAction = (
    user: User,
    action: "profile" | "warning" | "ban",
  ) => {
    setSelectedUser(user);
    setOpenMenuId(null);
    if (action === "profile") setIsProfileModalOpen(true);
    if (action === "warning") setIsWarningModalOpen(true);
  };

  // Logic Duyệt yêu cầu
  const handleApproveRequest = (user: User) => {
    if (
      confirm(
        `Xác nhận nâng quyền "Chủ cửa hàng" cho ${user.name}?`,
      )
    ) {
      setUsers((prev) =>
        prev.map((u) =>
          u.id === user.id
            ? {
                ...u,
                role: "Chủ cửa hàng",
                isRequestingStoreOwner: undefined,
              }
            : u,
        ),
      );
    }
  };

  // Logic Từ chối yêu cầu
  const handleRejectRequest = (user: User) => {
    if (confirm(`Từ chối yêu cầu của ${user.name}?`)) {
      setUsers((prev) =>
        prev.map((u) =>
          u.id === user.id
            ? { ...u, isRequestingStoreOwner: undefined }
            : u,
        ),
      );
    }
  };

  return (
    <div
      className="p-6 min-h-screen bg-gray-50/50"
      onClick={() => setOpenMenuId(null)}
    >
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
              Quản lý tài khoản
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Quản lý thành viên và quyền truy cập hệ thống
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
              <input
                type="text"
                placeholder="Tìm kiếm tài khoản..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full md:w-80 pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 text-gray-700 text-sm font-medium transition-colors shadow-sm focus:ring-2 focus:ring-gray-100">
              <Filter className="w-4 h-4" />
              <span>Lọc</span>
            </button>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="border-b border-gray-200">
          <div className="flex gap-6">
            <button
              onClick={() => setActiveTab("all")}
              className={`pb-4 px-2 relative text-sm font-medium transition-all duration-200 ${
                activeTab === "all"
                  ? "text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Tất cả người dùng
              {activeTab === "all" && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-t-full" />
              )}
            </button>
            <button
              onClick={() => setActiveTab("requests")}
              className={`pb-4 px-2 relative text-sm font-medium flex items-center gap-2 transition-all duration-200 ${
                activeTab === "requests"
                  ? "text-blue-600"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              Yêu cầu chủ cửa hàng
              {/* Badge số thông báo */}
              <span
                className={`px-2 py-0.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                  activeTab === "requests"
                    ? "bg-blue-100 text-blue-700" 
                    : "bg-red-500 text-white" 
                }`}
              >
                3
              </span>
              {/* Đường gạch dưới khi active */}
              {activeTab === "requests" && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600" />
              )}
            </button>
          </div>
        </div>

        {/* Data Table Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-100">
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Thông tin người dùng
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Vai trò
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Trạng thái
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Hành động
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <tr
                      key={user.id}
                      className="hover:bg-blue-50/30 transition-colors group"
                    >
                      <td className="px-6 py-4 text-sm font-mono text-gray-500">
                        {user.id}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <Avatar
                            src={user.avatar}
                            alt={user.name}
                            className="w-10 h-10 rounded-full ring-2 ring-white shadow-sm"
                          />
                          <span className="text-sm font-medium text-gray-900">
                            {user.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {user.email}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${roleColors[user.role]}`}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ring-1 ring-inset ${statusColors[user.status]}`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${user.status === "Hoạt động" ? "bg-green-600" : "bg-red-600"}`}
                          ></span>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right relative">
                        {/* LOGIC HÀNH ĐỘNG: Nếu ở tab Requests thì hiện nút Duyệt/Từ chối, nếu ở tab All thì hiện Menu */}
                        {activeTab === "requests" ? (
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() =>
                                handleApproveRequest(user)
                              }
                              title="Duyệt yêu cầu"
                              className="p-2 bg-green-50 text-green-600 hover:bg-green-100 rounded-lg transition-colors border border-green-200"
                            >
                              <Check size={18} />
                            </button>
                            <button
                              onClick={() =>
                                handleRejectRequest(user)
                              }
                              title="Từ chối yêu cầu"
                              className="p-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition-colors border border-red-200"
                            >
                              <X size={18} />
                            </button>
                            <button
                              onClick={() =>
                                handleAction(user, "profile")
                              }
                              title="Xem chi tiết"
                              className="p-2 bg-gray-50 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200"
                            >
                              <Eye size={18} />
                            </button>
                          </div>
                        ) : (
                          <>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setOpenMenuId(
                                  openMenuId === user.id
                                    ? null
                                    : user.id,
                                );
                              }}
                              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors focus:outline-none"
                            >
                              <MoreVertical className="w-4 h-4" />
                            </button>

                            {/* Dropdown Menu */}
                            {openMenuId === user.id && (
                              <div className="absolute right-8 top-10 w-48 bg-white rounded-xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] border border-gray-100 z-10 py-1 animation-scale-in">
                                <button
                                  onClick={() =>
                                    handleAction(
                                      user,
                                      "profile",
                                    )
                                  }
                                  className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2 group/item"
                                >
                                  <Eye className="w-4 h-4 text-gray-400 group-hover/item:text-blue-600" />
                                  Xem hồ sơ
                                </button>
                                <button
                                  onClick={() =>
                                    handleAction(
                                      user,
                                      "warning",
                                    )
                                  }
                                  className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2 group/item"
                                >
                                  <ShieldAlert className="w-4 h-4 text-gray-400 group-hover/item:text-orange-600" />
                                  Gửi cảnh báo
                                </button>
                                {user.status === "Hoạt động" ? (
                                  <button className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2">
                                    <Ban className="w-4 h-4" />
                                    Khóa tài khoản
                                  </button>
                                ) : (
                                  <button className="w-full text-left px-4 py-2.5 text-sm text-green-600 hover:bg-green-50 flex items-center gap-2">
                                    <CheckCircle className="w-4 h-4" />
                                    Mở khóa
                                  </button>
                                )}
                              </div>
                            )}
                          </>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-12 text-center text-gray-500"
                    >
                      Không tìm thấy người dùng phù hợp
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 border-t border-gray-200 bg-gray-50/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-gray-500">
              Hiển thị{" "}
              <span className="font-medium text-gray-900">
                1-{filteredUsers.length}
              </span>{" "}
              trong tổng số{" "}
              <span className="font-medium text-gray-900">
                {users.length}
              </span>{" "}
              người dùng
            </div>
            <div className="flex items-center gap-2">
              <button
                className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-500 bg-white hover:bg-gray-50 disabled:opacity-50"
                disabled
              >
                Trước
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-blue-600 text-white text-sm font-medium shadow-sm">
                1
              </button>
              <button className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                Sau
              </button>
            </div>
          </div>
        </div>

        {/* --- MODAL: XEM HỒ SƠ --- */}
        <Modal
          isOpen={isProfileModalOpen}
          onClose={() => setIsProfileModalOpen(false)}
          title="Hồ sơ người dùng"
        >
          {selectedUser && (
            <div className="space-y-6">
              {/* Header Info */}
              <div className="flex items-start gap-4 pb-6 border-b border-gray-100">
                <Avatar
                  src={selectedUser.avatar}
                  alt={selectedUser.name}
                  className="w-20 h-20 rounded-full ring-4 ring-gray-50"
                />
                <div className="space-y-1">
                  <h4 className="text-xl font-bold text-gray-900">
                    {selectedUser.name}
                  </h4>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Mail size={14} /> {selectedUser.email}
                  </div>
                  <div className="flex gap-2 mt-2">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${roleColors[selectedUser.role]}`}
                    >
                      {selectedUser.role}
                    </span>
                    <span
                      className={`flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ring-1 ring-inset ${statusColors[selectedUser.status]}`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${selectedUser.status === "Hoạt động" ? "bg-green-600" : "bg-red-600"}`}
                      ></span>
                      {selectedUser.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                    <Calendar size={12} /> Ngày tham gia
                  </p>
                  <p className="font-medium text-gray-900">
                    {selectedUser.joinDate}
                  </p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                    <MapPin size={12} /> Khu vực
                  </p>
                  <p className="font-medium text-gray-900">
                    {selectedUser.location}
                  </p>
                </div>
              </div>

              {/* Stats */}
              <div>
                <h5 className="text-sm font-semibold text-gray-900 mb-3">
                  Thống kê hoạt động
                </h5>
                <div className="grid grid-cols-3 gap-3">
                  <div className="text-center p-3 border border-gray-100 rounded-lg">
                    <FileText className="w-5 h-5 text-blue-500 mx-auto mb-1" />
                    <p className="text-xl font-bold text-gray-900">
                      {selectedUser.stats.posts}
                    </p>
                    <p className="text-xs text-gray-500">
                      Bài viết
                    </p>
                  </div>
                  <div className="text-center p-3 border border-gray-100 rounded-lg">
                    <MapIcon className="w-5 h-5 text-green-500 mx-auto mb-1" />
                    <p className="text-xl font-bold text-gray-900">
                      {selectedUser.stats.tours}
                    </p>
                    <p className="text-xs text-gray-500">
                      Tour đã đi
                    </p>
                  </div>
                  <div className="text-center p-3 border border-gray-100 rounded-lg">
                    <MessageSquare className="w-5 h-5 text-purple-500 mx-auto mb-1" />
                    <p className="text-xl font-bold text-gray-900">
                      {selectedUser.stats.connections}
                    </p>
                    <p className="text-xs text-gray-500">
                      Kết nối
                    </p>
                  </div>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  onClick={() => setIsProfileModalOpen(false)}
                  className="px-4 py-2 bg-white border border-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-50"
                >
                  Đóng
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 shadow-sm">
                  Nhắn tin
                </button>
              </div>
            </div>
          )}
        </Modal>

        {/* --- MODAL: GỬI CẢNH BÁO --- */}
        <Modal
          isOpen={isWarningModalOpen}
          onClose={() => setIsWarningModalOpen(false)}
          title="Gửi cảnh báo vi phạm"
        >
          {selectedUser && (
            <div className="space-y-4">
              <div className="bg-orange-50 p-4 rounded-lg border border-orange-100 flex gap-3">
                <ShieldAlert className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-orange-900">
                    Cảnh báo tới: {selectedUser.name}
                  </p>
                  <p className="text-xs text-orange-700 mt-1">
                    Cảnh báo sẽ được gửi qua email và thông báo
                    hệ thống.
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Loại vi phạm
                </label>
                <select className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none">
                  <option>Spam / Quảng cáo sai quy định</option>
                  <option>Ngôn từ đả kích / Xúc phạm</option>
                  <option>
                    Đăng tải nội dung không phù hợp
                  </option>
                  <option>Giả mạo thông tin</option>
                  <option>Khác</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Nội dung chi tiết
                </label>
                <textarea
                  rows={4}
                  className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none"
                  placeholder="Nhập nội dung cảnh báo chi tiết..."
                ></textarea>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={() => setIsWarningModalOpen(false)}
                  className="px-4 py-2 bg-white border border-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-50"
                >
                  Hủy bỏ
                </button>
                <button
                  onClick={() => setIsWarningModalOpen(false)}
                  className="px-4 py-2 bg-orange-600 text-white font-medium rounded-lg hover:bg-orange-700 shadow-sm flex items-center gap-2"
                >
                  <ShieldAlert size={16} /> Gửi cảnh báo
                </button>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
}