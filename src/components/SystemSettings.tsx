import { Save, Search, Clock, Eye, X, CheckCircle, ArrowRight } from 'lucide-react';
import { ImageWithFallback } from './asset/ImageWithFallback';
import { useState, useEffect } from 'react';

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
    searchRadius: '2.0',
    maxResults: '50',
    imageUploadLimit: '5',
    channelMemberLimit: '100',
  });

  const [searchRadius, setSearchRadius] = useState('2.0');
  const [maxResults, setMaxResults] = useState('50');
  const [imageUploadLimit, setImageUploadLimit] = useState('5');
  const [channelMemberLimit, setChannelMemberLimit] = useState('100');

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
    const changes: {
      field: string;
      oldValue: string;
      newValue: string;
    }[] = [];

    if (searchRadius !== initialValues.searchRadius)
      changes.push({
        field: 'Bán kính tìm kiếm',
        oldValue: `${initialValues.searchRadius} km`,
        newValue: `${searchRadius} km`,
      });

    if (maxResults !== initialValues.maxResults)
      changes.push({
        field: 'Số kết quả tối đa',
        oldValue: `${initialValues.maxResults} kết quả`,
        newValue: `${maxResults} kết quả`,
      });

    if (imageUploadLimit !== initialValues.imageUploadLimit)
      changes.push({
        field: 'Giới hạn ảnh upload',
        oldValue: `${initialValues.imageUploadLimit} MB`,
        newValue: `${imageUploadLimit} MB`,
      });

    if (channelMemberLimit !== initialValues.channelMemberLimit)
      changes.push({
        field: 'Giới hạn thành viên Channel',
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
      .toLocaleString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      })
      .replace(' ', '');
    const timestamp = `${time12h} - ${now.toLocaleDateString('vi-VN')}`;

    const newLogs: AuditLog[] = changes.map((change, i) => ({
      id: `AL${String(auditLogs.length + i + 1).padStart(3, '0')}`,
      timestamp,
      admin: {
        name: 'Nguyễn Văn Admin',
        avatar:
          'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
      },
      action: change.field,
      previousValue: change.oldValue,
      newValue: change.newValue,
    }));

    setAuditLogs([...newLogs, ...auditLogs]);
    setShowSuccessToast(true);
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
        <div className="max-w-7xl mx-auto space-y-6">

          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Cấu hình hệ thống</h1>
              <p className="text-sm text-gray-500 mt-1">
                Quản lý các thiết lập toàn cục của ứng dụng
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handlePreview}
                disabled={!hasChanges()}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-xl border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Eye className="w-4 h-4" />
                Xem trước
              </button>
              <button
                onClick={handleSave}
                disabled={!hasChanges()}
                className="inline-flex items-center gap-2 px-6 py-2.5 text-sm rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium hover:bg-blue-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save className="w-4 h-4" />
                Lưu thay đổi
              </button>
            </div>
          </div>

          {/* Layout: Settings + Logs */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* General Settings Card */}
            <div className="lg:col-span-1 bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-200 flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Search className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Cài đặt chung</h2>
                  <p className="text-xs text-gray-500">
                    Thiết lập phạm vi tìm kiếm & giới hạn hệ thống
                  </p>
                </div>
              </div>

              <div className="p-6 space-y-5">
                {/* Search Radius */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Bán kính tìm kiếm mặc định
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      step="0.1"
                      value={searchRadius}
                      onChange={(e) => setSearchRadius(e.target.value)}
                      className="w-full pl-4 pr-12 py-2.5 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-xs font-medium">
                      km
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">
                    Khoảng cách tối đa để tìm kiếm người dùng gần đó.
                  </p>
                </div>

                {/* Max Results */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Số kết quả tối đa
                  </label>
                  <input
                    type="number"
                    value={maxResults}
                    onChange={(e) => setMaxResults(e.target.value)}
                    className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                  />
                  <p className="text-xs text-gray-500">
                    Giới hạn số bản ghi trả về trong mỗi truy vấn.
                  </p>
                </div>

                {/* Image Upload Limit */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Giới hạn ảnh upload
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={imageUploadLimit}
                      onChange={(e) => setImageUploadLimit(e.target.value)}
                      className="w-full pl-4 pr-12 py-2.5 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-xs font-medium">
                      MB
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">
                    Dung lượng tối đa cho mỗi ảnh được upload.
                  </p>
                </div>

                {/* Channel Member Limit */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Giới hạn thành viên Channel
                  </label>
                  <input
                    type="number"
                    value={channelMemberLimit}
                    onChange={(e) => setChannelMemberLimit(e.target.value)}
                    className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                  />
                  <p className="text-xs text-gray-500">
                    Số lượng thành viên tối đa trong một kênh.
                  </p>
                </div>
              </div>
            </div>

            {/* Audit Logs Card */}
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-200 flex items-center justify-between bg-gray-50/70">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shadow">
                    <Clock className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                      Nhật ký hoạt động
                    </h2>
                    <p className="text-xs text-gray-500">
                      Ghi lại lịch sử thay đổi cấu hình hệ thống.
                    </p>
                  </div>
                </div>
                <div className="text-xs font-medium text-gray-600 bg-white px-3 py-1.5 rounded-xl border border-gray-200">
                  {auditLogs.length} bản ghi
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                        Thời gian
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                        Quản trị viên
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                        Hành động
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                        Cũ
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-blue-600 uppercase tracking-wider">
                        Mới
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {auditLogs.slice(0, 8).map((log) => (
                      <tr
                        key={log.id}
                        className="hover:bg-blue-50/40 transition-colors duration-200"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2 text-gray-700 text-sm">
                            <Clock className="w-4 h-4 text-gray-400" />
                            <span className="font-medium">{log.timestamp}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <ImageWithFallback
                              src={log.admin.avatar}
                              alt={log.admin.name}
                              className="w-10 h-10 rounded-full ring-2 ring-white shadow"
                            />
                            <div>
                              <p className="text-sm font-semibold text-gray-900">
                                {log.admin.name}
                              </p>
                              <p className="text-xs text-gray-500">Quản trị viên</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700">
                            {log.action}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500 font-medium">
                          {log.previousValue}
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold bg-green-50 text-green-700 border border-green-200">
                            {log.newValue}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between bg-gray-50">
                <p className="text-xs text-gray-600 font-medium">
                  Hiển thị 1–8 trong{' '}
                  <span className="text-blue-600 font-semibold">
                    {auditLogs.length}
                  </span>{' '}
                  bản ghi
                </p>
                <div className="flex items-center gap-2 text-xs">
                  <button
                    className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 font-medium transition"
                    disabled
                  >
                    Trước
                  </button>
                  <button className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold shadow-sm">
                    1
                  </button>
                  <button className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 font-medium transition">
                    2
                  </button>
                  <button className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 font-medium transition">
                    3
                  </button>
                  <button className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 font-medium transition">
                    Sau
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Preview Modal */}
        {isPreviewOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[85vh] overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="px-6 py-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Eye className="w-8 h-8" />
                    <div>
                      <h3 className="text-xl font-bold">Xem trước thay đổi</h3>
                      <p className="text-xs opacity-90">
                        Kiểm tra kỹ trước khi áp dụng vào hệ thống.
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsPreviewOpen(false)}
                    className="text-white/80 hover:text-white"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-4 overflow-y-auto max-h-[55vh]">
                {getChanges().map((change, i) => (
                  <div
                    key={i}
                    className="bg-gray-50 rounded-xl p-5 border border-gray-200"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-9 h-9 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold shadow">
                        {i + 1}
                      </div>
                      <h4 className="text-sm font-semibold text-gray-900">
                        {change.field}
                      </h4>
                    </div>
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                      <div className="flex-1 bg-white rounded-lg p-4 border border-red-200">
                        <p className="text-xs text-red-600 font-semibold mb-1">
                          Giá trị cũ
                        </p>
                        <p className="text-sm font-bold text-red-700">
                          {change.oldValue}
                        </p>
                      </div>
                      <ArrowRight className="w-6 h-6 text-blue-600 shrink-0 hidden sm:block" />
                      <div className="flex-1 bg-blue-50 rounded-lg p-4 border border-blue-200">
                        <p className="text-xs text-blue-600 font-semibold mb-1">
                          Giá trị mới
                        </p>
                        <p className="text-sm font-bold text-blue-800">
                          {change.newValue}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
                <p className="text-sm font-medium text-gray-700">
                  Sẵn sàng áp dụng{' '}
                  <span className="text-blue-600 font-bold">
                    {getChanges().length}
                  </span>{' '}
                  thay đổi.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setIsPreviewOpen(false)}
                    className="px-6 py-2.5 rounded-xl border border-gray-300 bg-white text-gray-700 text-sm font-semibold hover:bg-gray-50 transition"
                  >
                    Hủy
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-8 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-semibold shadow hover:shadow-md transition flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    Xác nhận & lưu
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Success Toast */}
        {showSuccessToast && (
          <div className="fixed top-6 right-6 z-50 animate-in slide-in-from-bottom-2 duration-300">
            <div className="bg-white rounded-2xl shadow-2xl border border-green-200 p-4 flex items-center gap-4 w-72">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shadow">
                <CheckCircle className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-bold text-gray-900">
                  Thay đổi đã được lưu!
                </h4>
                <p className="text-xs text-gray-600 mt-1">
                  Hệ thống đã cập nhật thành công {getChanges().length} thiết lập.
                </p>
              </div>
              <button
                onClick={() => setShowSuccessToast(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
