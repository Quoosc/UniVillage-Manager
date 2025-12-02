import { Save } from 'lucide-react';
import { ImageWithFallback } from './asset/ImageWithFallback';
import { useState } from 'react';

interface AuditLog {
  id: string;
  timestamp: string;
  admin: {
    name: string;
    avatar: string;
  };
  action: string;
  previousValue: string;
  newValue: string;
}

const mockAuditLogs: AuditLog[] = [
  {
    id: 'LOG-001',
    timestamp: '14:30 - 02/12/2025',
    admin: {
      name: 'Admin User',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    },
    action: 'Changed search radius',
    previousValue: '1.5 km',
    newValue: '2.0 km',
  },
  {
    id: 'LOG-002',
    timestamp: '13:15 - 02/12/2025',
    admin: {
      name: 'Nguyễn Văn A',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
    },
    action: 'Updated max results',
    previousValue: '30',
    newValue: '50',
  },
  {
    id: 'LOG-003',
    timestamp: '11:45 - 02/12/2025',
    admin: {
      name: 'Trần Thị B',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    },
    action: 'Changed image upload limit',
    previousValue: '3 MB',
    newValue: '5 MB',
  },
  {
    id: 'LOG-004',
    timestamp: '10:20 - 02/12/2025',
    admin: {
      name: 'Admin User',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    },
    action: 'Updated channel member limit',
    previousValue: '50',
    newValue: '100',
  },
  {
    id: 'LOG-005',
    timestamp: '09:30 - 01/12/2025',
    admin: {
      name: 'Lê Minh C',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    },
    action: 'Changed search radius',
    previousValue: '2.0 km',
    newValue: '1.5 km',
  },
];

export function SystemSettings() {
  const [searchRadius, setSearchRadius] = useState('2.0');
  const [maxResults, setMaxResults] = useState('50');
  const [imageUploadLimit, setImageUploadLimit] = useState('5');
  const [channelMemberLimit, setChannelMemberLimit] = useState('100');

  const handleSave = () => {
    console.log('Saving settings:', {
      searchRadius,
      maxResults,
      imageUploadLimit,
      channelMemberLimit,
    });
    // Handle save logic here
  };

  return (
    <div className="p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1>Cấu hình hệ thống</h1>
        </div>

        {/* Section 1: General Settings */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="mb-6">Cài đặt chung</h2>

          <div className="space-y-6 max-w-2xl">
            {/* Search Radius */}
            <div>
              <label htmlFor="searchRadius" className="block text-gray-700 mb-2">
                Bán kính tìm kiếm mặc định (km)
              </label>
              <input
                id="searchRadius"
                type="number"
                step="0.1"
                value={searchRadius}
                onChange={(e) => setSearchRadius(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Max Results */}
            <div>
              <label htmlFor="maxResults" className="block text-gray-700 mb-2">
                Số kết quả tối đa
              </label>
              <input
                id="maxResults"
                type="number"
                value={maxResults}
                onChange={(e) => setMaxResults(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Image Upload Limit */}
            <div>
              <label htmlFor="imageUploadLimit" className="block text-gray-700 mb-2">
                Giới hạn ảnh upload (MB)
              </label>
              <input
                id="imageUploadLimit"
                type="number"
                value={imageUploadLimit}
                onChange={(e) => setImageUploadLimit(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Channel Member Limit */}
            <div>
              <label htmlFor="channelMemberLimit" className="block text-gray-700 mb-2">
                Giới hạn thành viên Channel
              </label>
              <input
                id="channelMemberLimit"
                type="number"
                value={channelMemberLimit}
                onChange={(e) => setChannelMemberLimit(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Save Button */}
            <div className="pt-4">
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Save className="w-5 h-5" />
                <span>Lưu thay đổi</span>
              </button>
            </div>
          </div>
        </div>

        {/* Section 2: Audit Logs */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2>Nhật ký hoạt động</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-gray-700">Thời gian</th>
                  <th className="px-6 py-4 text-left text-gray-700">Quản trị viên</th>
                  <th className="px-6 py-4 text-left text-gray-700">Hành động</th>
                  <th className="px-6 py-4 text-left text-gray-700">Giá trị cũ</th>
                  <th className="px-6 py-4 text-left text-gray-700">Giá trị mới</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {mockAuditLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                    {/* Timestamp Column */}
                    <td className="px-6 py-4">
                      <span className="text-gray-600">{log.timestamp}</span>
                    </td>

                    {/* Admin Column */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <ImageWithFallback
                          src={log.admin.avatar}
                          alt={log.admin.name}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <span className="text-gray-700">{log.admin.name}</span>
                      </div>
                    </td>

                    {/* Action Column */}
                    <td className="px-6 py-4">
                      <span className="text-gray-900">{log.action}</span>
                    </td>

                    {/* Previous Value Column */}
                    <td className="px-6 py-4">
                      <span className="text-gray-600">{log.previousValue}</span>
                    </td>

                    {/* New Value Column */}
                    <td className="px-6 py-4">
                      <span className="text-blue-600">{log.newValue}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
            <div className="text-gray-600">
              Hiển thị 1-5 trong tổng số 25 bản ghi
            </div>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 text-gray-600 disabled:opacity-50" disabled>
                Trước
              </button>
              <button className="px-3 py-1 bg-blue-600 text-white rounded">
                1
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 text-gray-600">
                2
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 text-gray-600">
                3
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 text-gray-600">
                Sau
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
