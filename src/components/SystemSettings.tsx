import { Save, Search, Clock, Eye, X, CheckCircle, ArrowRight } from "lucide-react";
import { ImageWithFallback } from "./asset/ImageWithFallback";
import { useState, useEffect } from "react";

interface AuditLog {
  id: string;
  timestamp: string;
  admin: { name: string; avatar: string };
  action: string;
  previousValue: string;
  newValue: string;
}

const mockAuditLogs: AuditLog[] = [
  {
    id: 'AL001',
    timestamp: '10:30 AM - 02/12/2025',
    admin: {
      name: 'Quốcproplayer',
      avatar: 'https://photo.znews.vn/w660/Uploaded/xbhunku/2017_07_03/16.jpg',
    },
    action: 'Cập nhật bán kính tìm kiếm',
    previousValue: '1.5 km',
    newValue: '2.0 km',
  },
  {
    id: 'AL002',
    timestamp: '09:15 AM - 02/12/2025',
    admin: {
      name: 'Trần Minh Quang',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    },
    action: 'Thay đổi giới hạn thành viên',
    previousValue: '50 người',
    newValue: '100 người',
  },
  {
    id: 'AL003',
    timestamp: '08:45 AM - 02/12/2025',
    admin: {
      name: 'Hồ Ngọc Quỳnh',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
    },
    action: 'Cập nhật kích thước ảnh',
    previousValue: '3 MB',
    newValue: '5 MB',
  },
  {
    id: 'AL004',
    timestamp: '07:20 AM - 02/12/2025',
    admin: {
      name: 'Hoàng Thị Mai',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    },
    action: 'Thay đổi số kết quả tối đa',
    previousValue: '30 kết quả',
    newValue: '50 kết quả',
  },
  {
    id: 'AL005',
    timestamp: '06:50 AM - 02/12/2025',
    admin: {
      name: 'Phạm Văn Cường',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    },
    action: 'Kích hoạt tính năng mới',
    previousValue: 'Tắt',
    newValue: 'Bật',
  },
  {
    id: 'AL006',
    timestamp: '01/12/2025 11:30 PM',
    admin: {
      name: 'Đỗ Quang Huy',
      avatar: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=100&h=100&fit=crop',
    },
    action: 'Cập nhật bán kính tìm kiếm',
    previousValue: '1.0 km',
    newValue: '1.5 km',
  },
  {
    id: 'AL007',
    timestamp: '01/12/2025 10:15 PM',
    admin: {
      name: 'Vũ Thị Lan',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop',
    },
    action: 'Thay đổi timeout session',
    previousValue: '30 phút',
    newValue: '60 phút',
  },
  {
    id: 'AL008',
    timestamp: '01/12/2025 09:00 PM',
    admin: {
      name: 'Nguyễn Văn Admin',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    },
    action: 'Cập nhật giới hạn API',
    previousValue: '100 requests/min',
    newValue: '200 requests/min',
  },
  {
    id: 'AL009',
    timestamp: '01/12/2025 08:30 PM',
    admin: {
      name: 'Bùi Thị Nga',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop',
    },
    action: 'Thay đổi múi giờ hệ thống',
    previousValue: 'UTC+0',
    newValue: 'UTC+7',
  },
  {
    id: 'AL010',
    timestamp: '01/12/2025 07:15 PM',
    admin: {
      name: 'Trần Thị Quản Lý',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    },
    action: 'Cập nhật cache duration',
    previousValue: '5 phút',
    newValue: '10 phút',
  },
  {
    id: 'AL011',
    timestamp: '01/12/2025 06:00 PM',
    admin: {
      name: 'Lê Minh Tuấn',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
    },
    action: 'Bật chế độ bảo trì',
    previousValue: 'Hoạt động bình thường',
    newValue: 'Chế độ bảo trì',
  },
  {
    id: 'AL012',
    timestamp: '01/12/2025 05:30 PM',
    admin: {
      name: 'Ngô Văn Thành',
      avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&h=100&fit=crop',
    },
    action: 'Cập nhật phiên bản API',
    previousValue: 'v1.2.3',
    newValue: 'v1.3.0',
  },
  {
    id: 'AL013',
    timestamp: '01/12/2025 04:15 PM',
    admin: {
      name: 'Đinh Thị Tuyết',
      avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&h=100&fit=crop',
    },
    action: 'Thay đổi độ dài mật khẩu',
    previousValue: '6 ký tự',
    newValue: '8 ký tự',
  },
  {
    id: 'AL014',
    timestamp: '01/12/2025 03:00 PM',
    admin: {
      name: 'Võ Minh Khang',
      avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop',
    },
    action: 'Cập nhật email template',
    previousValue: 'Template cũ',
    newValue: 'Template mới',
  },
  {
    id: 'AL015',
    timestamp: '01/12/2025 02:30 PM',
    admin: {
      name: 'Lý Hoàng Nam',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop',
    },
    action: 'Bật xác thực 2 yếu tố',
    previousValue: 'Tắt',
    newValue: 'Bật',
  },
  {
    id: 'AL016',
    timestamp: '01/12/2025 01:15 PM',
    admin: {
      name: 'Hoàng Thị Mai',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    },
    action: 'Thay đổi backup frequency',
    previousValue: 'Hằng ngày',
    newValue: 'Mỗi 12 giờ',
  },
  {
    id: 'AL017',
    timestamp: '01/12/2025 12:00 PM',
    admin: {
      name: 'Phạm Văn Cường',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    },
    action: 'Cập nhật storage limit',
    previousValue: '10 GB',
    newValue: '20 GB',
  },
  {
    id: 'AL018',
    timestamp: '01/12/2025 11:00 AM',
    admin: {
      name: 'Đỗ Quang Huy',
      avatar: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=100&h=100&fit=crop',
    },
    action: 'Bật log chi tiết',
    previousValue: 'Log cơ bản',
    newValue: 'Log chi tiết',
  },
  {
    id: 'AL019',
    timestamp: '01/12/2025 10:30 AM',
    admin: {
      name: 'Vũ Thị Lan',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop',
    },
    action: 'Cập nhật notification delay',
    previousValue: 'Ngay lập tức',
    newValue: '30 giây',
  },
  {
    id: 'AL020',
    timestamp: '01/12/2025 09:45 AM',
    admin: {
      name: 'Nguyễn Văn Admin',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    },
    action: 'Thay đổi rate limiting',
    previousValue: 'Nghiêm ngặt',
    newValue: 'Bình thường',
  },
  {
    id: 'AL021',
    timestamp: '01/12/2025 08:30 AM',
    admin: {
      name: 'Bùi Thị Nga',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop',
    },
    action: 'Cập nhật CORS policy',
    previousValue: 'Restricted',
    newValue: 'Allowed domains',
  },
  {
    id: 'AL022',
    timestamp: '01/12/2025 07:00 AM',
    admin: {
      name: 'Trần Thị Quản Lý',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    },
    action: 'Bật auto-scaling',
    previousValue: 'Manual scaling',
    newValue: 'Auto-scaling',
  },
  {
    id: 'AL023',
    timestamp: '30/11/2025 11:30 PM',
    admin: {
      name: 'Lê Minh Tuấn',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
    },
    action: 'Cập nhật SSL certificate',
    previousValue: 'Cert 2024',
    newValue: 'Cert 2025',
  },
  {
    id: 'AL024',
    timestamp: '30/11/2025 10:15 PM',
    admin: {
      name: 'Ngô Văn Thành',
      avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&h=100&fit=crop',
    },
    action: 'Thay đổi database pool',
    previousValue: '10 connections',
    newValue: '20 connections',
  },
  {
    id: 'AL025',
    timestamp: '30/11/2025 09:00 PM',
    admin: {
      name: 'Đinh Thị Tuyết',
      avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&h=100&fit=crop',
    },
    action: 'Cập nhật CDN config',
    previousValue: 'Region Asia',
    newValue: 'Global CDN',
  },
];

export function SystemSettings() {
  const [initialValues] = useState({
    searchRadius: "2.0",
    maxResults: "50",
    imageUploadLimit: "5",
    channelMemberLimit: "100",
  });

  const [searchRadius, setSearchRadius] = useState("2.0");
  const [maxResults, setMaxResults] = useState("50");
  const [imageUploadLimit, setImageUploadLimit] = useState("5");
  const [channelMemberLimit, setChannelMemberLimit] = useState("100");

  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(mockAuditLogs);

  const hasChanges = () => {
    return (
      searchRadius !== initialValues.searchRadius ||
      maxResults !== initialValues.maxResults ||
      imageUploadLimit !== initialValues.imageUploadLimit ||
      channelMemberLimit !== initialValues.channelMemberLimit
    );
  };

  const getChanges = () => {
    const changes: { field: string; oldValue: string; newValue: string }[] = [];
    if (searchRadius !== initialValues.searchRadius)
      changes.push({
        field: "Bán kính tìm kiếm",
        oldValue: `${initialValues.searchRadius} km`,
        newValue: `${searchRadius} km`,
      });
    if (maxResults !== initialValues.maxResults)
      changes.push({
        field: "Số kết quả tối đa",
        oldValue: `${initialValues.maxResults} kết quả`,
        newValue: `${maxResults} kết quả`,
      });
    if (imageUploadLimit !== initialValues.imageUploadLimit)
      changes.push({
        field: "Giới hạn ảnh upload",
        oldValue: `${initialValues.imageUploadLimit} MB`,
        newValue: `${imageUploadLimit} MB`,
      });
    if (channelMemberLimit !== initialValues.channelMemberLimit)
      changes.push({
        field: "Giới hạn thành viên Channel",
        oldValue: `${initialValues.channelMemberLimit} người`,
        newValue: `${channelMemberLimit} người`,
      });
    return changes;
  };

  const handlePreview = () => hasChanges() && setIsPreviewOpen(true);

  const handleSave = () => {
    if (!hasChanges()) return;

    const changes = getChanges();
    const now = new Date();
    const time12h = now
      .toLocaleString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
      .replace(" ", "");
    const timestamp = `${time12h} - ${now.toLocaleDateString("vi-VN")}`;

    const newLogs: AuditLog[] = changes.map((change, i) => ({
      id: `AL${String(auditLogs.length + i + 1).padStart(3, "0")}`,
      timestamp,
      admin: {
        name: "Nguyễn Văn Admin",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
      },
      action: change.field,
      previousValue: change.oldValue,
      newValue: change.newValue,
    }));

    setAuditLogs([...newLogs, ...auditLogs]);
    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 4000);
    setIsPreviewOpen(false);
  };

  useEffect(() => {
    if (showSuccessToast) {
      const timer = setTimeout(() => setShowSuccessToast(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [showSuccessToast]);

  return (
    <>
      <div className="p-6 min-h-screen bg-gray-50/50">
        <div className="mx-auto max-w-7xl space-y-6">
          {/* PAGE HEADER */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Cấu hình hệ thống
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Quản lý các thiết lập toàn cục của ứng dụng
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handlePreview}
                disabled={!hasChanges()}
                className="inline-flex items-center gap-2 rounded-2xl border border-indigo-300 bg-white px-5 py-2.5 text-sm font-medium text-indigo-600 shadow-sm hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Eye className="h-4 w-4 text-indigo-600" />
                Xem trước thay đổi
              </button>
              <button
                onClick={handleSave}
                disabled={!hasChanges()}
                className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 text-sm font-medium transition-colors shadow-sm"
              >
                <Save className="h-4 w-4" />
                Lưu thay đổi
              </button>
            </div>
          </div>

          {/* GENERAL SETTINGS CARD */}
          <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="flex items-center gap-3 border-b border-gray-200 px-6 py-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                <Search className="h-4 w-4" />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-gray-900">
                  Cài đặt chung
                </h2>
                <p className="text-xs text-gray-500">
                  Các thông số ảnh hưởng tới toàn bộ trải nghiệm người dùng
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 px-6 py-6 md:grid-cols-2">
              {/* Search Radius */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-gray-700">
                  Bán kính tìm kiếm mặc định
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.1"
                    value={searchRadius}
                    onChange={(e) => setSearchRadius(e.target.value)}
                    className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                  />
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 inline-flex items-center rounded-lg border border-gray-200 bg-gray-50 px-2 py-0.5 text-[11px] font-medium text-gray-500">km</span>
                </div>
                <p className="text-xs text-gray-400">
                  Khoảng cách tối đa để tìm kiếm người dùng gần đó
                </p>
              </div>

              {/* Max Results */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-gray-700">
                  Số kết quả tối đa
                </label>
                <input
                  type="number"
                  value={maxResults}
                  onChange={(e) => setMaxResults(e.target.value)}
                  className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                />
                <p className="text-xs text-gray-400">
                  Giới hạn số lượng kết quả mỗi truy vấn
                </p>
              </div>

              {/* Image Upload Limit */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-gray-700">
                  Giới hạn ảnh upload
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={imageUploadLimit}
                    onChange={(e) => setImageUploadLimit(e.target.value)}
                    className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                  />
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 inline-flex items-center rounded-lg border border-gray-200 bg-gray-50 px-2 py-0.5 text-[11px] font-medium text-gray-500">MB</span>
                </div>
                <p className="text-xs text-gray-400">
                  Dung lượng tối đa cho mỗi ảnh người dùng upload
                </p>
              </div>

              {/* Channel Member Limit */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-gray-700">
                  Giới hạn thành viên Channel
                </label>
                <input
                  type="number"
                  value={channelMemberLimit}
                  onChange={(e) => setChannelMemberLimit(e.target.value)}
                  className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                />
                <p className="text-xs text-gray-400">
                  Số lượng thành viên tối đa trong một channel
                </p>
              </div>
            </div>
          </div>

          {/* AUDIT LOGS CARD */}
          <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-purple-50 text-purple-600">
                  <Clock className="h-4 w-4" />
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-gray-900">
                    Nhật ký hoạt động
                  </h2>
                  <p className="text-xs text-gray-500">
                    Ghi nhận mọi thay đổi cấu hình hệ thống
                  </p>
                </div>
              </div>
              <div className="rounded-full bg-gray-50 px-3 py-1 text-xs font-medium text-gray-600 border border-gray-200">
                Tổng cộng{" "}
                <span className="font-semibold text-blue-600">
                  {auditLogs.length}
                </span>{" "}
                bản ghi
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-100 border-b border-gray-300">
                    <th className="px-8 py-3 text-center text-[12px] font-semibold uppercase tracking-wide text-gray-700">
                      Thời gian
                    </th>
                    <th className="px-8 py-3 text-center text-[12px] font-semibold uppercase tracking-wide text-gray-700">
                      Quản trị viên
                    </th>
                    <th className="px-8 py-3 text-center text-[12px] font-semibold uppercase tracking-wide text-gray-700">
                      Hành động
                    </th>
                    <th className="px-8 py-3 text-center text-[12px] font-semibold uppercase tracking-wide text-gray-700">
                      Giá trị cũ
                    </th>
                    <th className="px-8 py-3 text-center text-[12px] font-semibold uppercase tracking-wide text-gray-700">
                      Giá trị mới
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {auditLogs.slice(0, 8).map((log) => (
                    <tr key={log.id} className="transition-colors hover:bg-gray-50">
                      {/* Time */}
                      <td className="px-8 py-4 text-center">
                        <div className="mx-auto flex items-center justify-center gap-2 text-xs text-gray-600">
                          <span className="inline-flex h-2 w-2 rounded-full bg-green-500" />
                          <span>{log.timestamp}</span>
                        </div>
                      </td>

                      {/* Admin */}
                      <td className="px-8 py-4 text-center">
                        <div className="mx-auto flex items-center justify-center gap-3">
                          <ImageWithFallback
                            src={log.admin.avatar}
                            alt={log.admin.name}
                            className="h-9 w-9 rounded-full border border-white shadow-sm"
                          />
                          <div className="leading-tight text-left">
                            <p className="text-sm font-semibold text-gray-900">
                              {log.admin.name}
                            </p>
                            <p className="text-[11px] text-gray-400">
                              Quản trị viên
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Action */}
                      <td className="px-8 py-4 text-center">
                        <span className="inline-flex items-center justify-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                          {log.action}
                        </span>
                      </td>

                      {/* Old value */}
                      <td className="px-8 py-4 text-center">
                        <span className="inline-flex items-center justify-center rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-medium text-gray-700">
                          {log.previousValue}
                        </span>
                      </td>

                      {/* New value */}
                      <td className="px-8 py-4 text-center">
                        <span className="inline-flex items-center justify-center rounded-full border border-green-200 bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                          {log.newValue}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Footer / Pagination */}
            <div className="flex items-center justify-between border-t border-gray-200 px-6 py-4">
              <p className="text-xs text-gray-500">
                Hiển thị 1–8 trong tổng số{" "}
                <span className="font-semibold text-blue-600">
                  {auditLogs.length}
                </span>{" "}
                bản ghi
              </p>
              <div className="flex items-center gap-2 text-xs">
                <button className="rounded-2xl border border-gray-200 bg-white px-3 py-1.5 text-gray-600 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500/30">
                  Trước
                </button>
                <button className="rounded-2xl bg-blue-600 px-3 py-1.5 font-semibold text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40">
                  1
                </button>
                <button className="rounded-2xl border border-gray-200 bg-white px-3 py-1.5 text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500/30">
                  2
                </button>
                <button className="rounded-2xl border border-gray-200 bg-white px-3 py-1.5 text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500/30">
                  3
                </button>
                <button className="rounded-2xl border border-gray-200 bg-white px-3 py-1.5 text-gray-600 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500/30">
                  Sau
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* PREVIEW MODAL */}
        {isPreviewOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
            <div className="max-h-[85vh] w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-2xl">
              {/* Modal header */}
              <div className="flex items-center justify-between bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 text-white">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-white/10">
                    <Eye className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold">
                      Xem trước thay đổi
                    </h3>
                    <p className="text-xs text-white/80">
                      Kiểm tra kỹ trước khi áp dụng cho toàn hệ thống
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsPreviewOpen(false)}
                  className="rounded-full p-1 text-white/80 hover:bg-white/10 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Modal body */}
              <div className="max-h-[55vh] space-y-4 overflow-y-auto px-6 py-5">
                {getChanges().map((change, i) => (
                  <div
                    key={i}
                    className="rounded-2xl border border-gray-200 bg-gray-50/70 px-5 py-4"
                  >
                    <div className="mb-3 flex items-center gap-3">
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 text-xs font-semibold text-white">
                        {i + 1}
                      </div>
                      <h4 className="text-sm font-semibold text-gray-900">
                        {change.field}
                      </h4>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex-1 rounded-xl border border-red-200 bg-white px-4 py-3">
                        <p className="text-[11px] font-semibold text-red-500">
                          Giá trị cũ
                        </p>
                        <p className="mt-1 text-sm font-semibold text-red-700">
                          {change.oldValue}
                        </p>
                      </div>
                      <ArrowRight className="h-6 w-6 flex-shrink-0 text-gray-400" />
                      <div className="flex-1 rounded-xl border border-green-200 bg-green-50 px-4 py-3">
                        <p className="text-[11px] font-semibold text-green-600">
                          Giá trị mới
                        </p>
                        <p className="mt-1 text-sm font-semibold text-green-800">
                          {change.newValue}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Modal footer */}
              <div className="flex items-center justify-between border-t border-gray-200 px-6 py-4 bg-gray-50">
                <p className="text-sm text-gray-700">
                  Sẵn sàng áp dụng{" "}
                  <span className="font-semibold text-blue-600">
                    {getChanges().length}
                  </span>{" "}
                  thay đổi
                </p>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsPreviewOpen(false)}
                    className="rounded-2xl border border-gray-200 bg-white px-5 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400/30"
                  >
                    Hủy bỏ
                  </button>
                  <button
                    onClick={handleSave}
                    className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-2 text-sm font-semibold text-white shadow-[0_6px_20px_-6px_rgba(79,70,229,.5)] hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  >
                    <Save className="h-4 w-4" />
                    Xác nhận &amp; lưu lại
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SUCCESS TOAST */}
        {showSuccessToast && (
          <div className="fixed right-6 top-6 z-50">
            <div className="flex min-w-[320px] items-center gap-4 rounded-2xl border border-green-200 bg-white px-5 py-4 shadow-xl">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-emerald-500 shadow-md">
                <CheckCircle className="h-7 w-7 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-gray-900">
                  Thay đổi đã được lưu
                </h4>
                <p className="mt-1 text-xs text-gray-500">
                  Hệ thống đã cập nhật thành công{" "}
                  <span className="font-semibold">
                    {getChanges().length} thiết lập
                  </span>
                  .
                </p>
              </div>
              <button
                onClick={() => setShowSuccessToast(false)}
                className="text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300/30 rounded-full p-1"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}