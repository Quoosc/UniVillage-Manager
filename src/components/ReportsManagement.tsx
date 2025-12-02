import { FileText, MessageCircle, User, MapPin, AlertTriangle } from 'lucide-react';
import { ImageWithFallback } from './asset/ImageWithFallback';
import { ResolveReportModal } from './ResolveReportModal';
import { useState } from 'react';

interface Report {
  id: string;
  reporter: {
    name: string;
    avatar: string;
  };
  target: {
    type: 'Bài viết' | 'Bình luận' | 'Tài khoản' | 'Địa điểm';
    content: string;
  };
  violation: string;
  date: string;
  status: 'Chờ xử lý' | 'Đã xử lý';
  details: {
    description: string;
    reportedContent: string;
    targetUser?: string;
  };
}

const mockReports: Report[] = [
  {
    id: 'R001',
    reporter: {
      name: 'Nguyễn Văn An',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    },
    target: {
      type: 'Bài viết',
      content: 'Bài viết về địa điểm du lịch',
    },
    violation: 'Spam',
    date: '10:30 AM - 12/11/2025',
    status: 'Chờ xử lý',
    details: {
      description: 'Bài viết chứa nhiều liên kết quảng cáo không liên quan',
      reportedContent: 'Khám phá địa điểm tuyệt vời! Click vào link để nhận ưu đãi khủng!!! 🎉🎉🎉 www.example.com/promo... Đừng bỏ lỡ cơ hội này!!!',
      targetUser: 'Trần Thị B',
    },
  },
  {
    id: 'R002',
    reporter: {
      name: 'Lê Minh Tuấn',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
    },
    target: {
      type: 'Bình luận',
      content: 'Bình luận trên bài viết #123',
    },
    violation: 'Ngôn từ đả kích',
    date: '09:15 AM - 12/11/2025',
    status: 'Chờ xử lý',
    details: {
      description: 'Bình luận có lời lẽ xúc phạm người khác',
      reportedContent: 'Bình luận này chứa nội dung xúc phạm và không phù hợp với cộng đồng của chúng tôi.',
      targetUser: 'Phạm Văn C',
    },
  },
  {
    id: 'R003',
    reporter: {
      name: 'Hoàng Thị Mai',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    },
    target: {
      type: 'Tài khoản',
      content: 'user@university.edu.vn',
    },
    violation: 'Lừa đảo',
    date: '08:45 AM - 12/11/2025',
    status: 'Chờ xử lý',
    details: {
      description: 'Tài khoản này giả mạo là quản trị viên và yêu cầu thông tin cá nhân',
      reportedContent: 'Tài khoản này đã gửi tin nhắn yêu cầu thông tin đăng nhập và dữ liệu cá nhân của người dùng.',
      targetUser: 'fake_admin_123',
    },
  },
  {
    id: 'R004',
    reporter: {
      name: 'Đỗ Quang Huy',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    },
    target: {
      type: 'Địa điểm',
      content: 'Quán cà phê ABC',
    },
    violation: 'Thông tin sai lệch',
    date: '07:20 AM - 12/11/2025',
    status: 'Chờ xử lý',
    details: {
      description: 'Địa điểm này chứa thông tin không chính xác về địa chỉ và giờ mở cửa',
      reportedContent: 'Địa điểm được đăng với địa chỉ và thông tin không đúng sự thật, gây hiểu lầm cho người dùng.',
    },
  },
  {
    id: 'R005',
    reporter: {
      name: 'Vũ Thị Lan',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    },
    target: {
      type: 'Bài viết',
      content: 'Review địa điểm XYZ',
    },
    violation: 'Spam',
    date: '06:50 AM - 12/11/2025',
    status: 'Chờ xử lý',
    details: {
      description: 'Bài viết spam quảng cáo',
      reportedContent: 'Bài review này chứa nhiều liên kết quảng cáo và nội dung không liên quan đến địa điểm.',
      targetUser: 'Nguyễn Văn D',
    },
  },
  {
    id: 'R006',
    reporter: {
      name: 'Trần Minh Đức',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop',
    },
    target: {
      type: 'Bình luận',
      content: 'Bình luận trên địa điểm #456',
    },
    violation: 'Ngôn từ đả kích',
    date: '11/10/2025',
    status: 'Đã xử lý',
    details: {
      description: 'Bình luận có ngôn từ không phù hợp',
      reportedContent: 'Bình luận đã được xử lý và gỡ bỏ khỏi hệ thống.',
      targetUser: 'Lê Văn E',
    },
  },
];

const targetIcons = {
  'Bài viết': <FileText className="w-4 h-4" />,
  'Bình luận': <MessageCircle className="w-4 h-4" />,
  'Tài khoản': <User className="w-4 h-4" />,
  'Địa điểm': <MapPin className="w-4 h-4" />,
};

export function ReportsManagement() {
  const [selectedReport, setSelectedReport] = useState<Report | null>(mockReports[0]);
  const [isResolveModalOpen, setIsResolveModalOpen] = useState(false);
  const [reportToResolve, setReportToResolve] = useState<Report | null>(null);

  const pendingCount = mockReports.filter(r => r.status === 'Chờ xử lý').length;
  const totalCount = mockReports.length;

  const handleResolveClick = (report: Report) => {
    setReportToResolve(report);
    setIsResolveModalOpen(true);
  };

  const handleSaveResolution = (action: string, note: string) => {
    console.log(`Resolving report: ${reportToResolve?.id}, Action: ${action}, Note: ${note}`);
    // Handle resolve logic here
    setIsResolveModalOpen(false);
    setReportToResolve(null);
  };

  return (
    <div className="p-6">
      <div className="max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="mb-4">Báo cáo vi phạm</h1>
          
          {/* Summary Cards */}
          <div className="grid grid-cols-2 gap-4 max-w-md">
            <div className="bg-white rounded-lg shadow p-4">
              <p className="text-gray-600 mb-1">Tổng số báo cáo</p>
              <p className="text-gray-900">{totalCount}</p>
            </div>
            <div className="bg-white rounded-lg shadow p-4">
              <p className="text-gray-600 mb-1">Đang chờ xử lý</p>
              <p className="text-orange-600">{pendingCount}</p>
            </div>
          </div>
        </div>

        {/* Split View: Table + Preview Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Data Table - Left Side (2/3 width) */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-4 py-3 text-left text-gray-700">Người báo cáo</th>
                      <th className="px-4 py-3 text-left text-gray-700">Đối tượng</th>
                      <th className="px-4 py-3 text-left text-gray-700">Vi phạm</th>
                      <th className="px-4 py-3 text-left text-gray-700">Thời gian</th>
                      <th className="px-4 py-3 text-left text-gray-700">Trạng thái</th>
                      <th className="px-4 py-3 text-left text-gray-700">Hành động</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {mockReports.map((report) => (
                      <tr
                        key={report.id}
                        onClick={() => setSelectedReport(report)}
                        className={`cursor-pointer transition-colors ${
                          selectedReport?.id === report.id
                            ? 'bg-blue-50'
                            : 'hover:bg-gray-50'
                        }`}
                      >
                        {/* Reporter Column */}
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-3">
                            <ImageWithFallback
                              src={report.reporter.avatar}
                              alt={report.reporter.name}
                              className="w-8 h-8 rounded-full object-cover"
                            />
                            <span className="text-gray-700">{report.reporter.name}</span>
                          </div>
                        </td>

                        {/* Target Column */}
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-2">
                            <div className="p-1 bg-gray-100 rounded">
                              {targetIcons[report.target.type]}
                            </div>
                            <div>
                              <p className="text-gray-700">{report.target.type}</p>
                              <p className="text-gray-500">{report.target.content}</p>
                            </div>
                          </div>
                        </td>

                        {/* Violation Column */}
                        <td className="px-4 py-4">
                          <span className="text-red-600">{report.violation}</span>
                        </td>

                        {/* Date Column */}
                        <td className="px-4 py-4">
                          <span className="text-gray-600">{report.date}</span>
                        </td>

                        {/* Status Column */}
                        <td className="px-4 py-4">
                          <span
                            className={`px-3 py-1 rounded-full ${
                              report.status === 'Chờ xử lý'
                                ? 'bg-yellow-100 text-yellow-700'
                                : 'bg-green-100 text-green-700'
                            }`}
                          >
                            {report.status}
                          </span>
                        </td>

                        {/* Action Column */}
                        <td className="px-4 py-4">
                          {report.status === 'Chờ xử lý' && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleResolveClick(report);
                              }}
                              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                              Xử lý
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Preview Panel - Right Side (1/3 width) */}
          <div className="lg:col-span-1">
            {selectedReport ? (
              <div className="bg-white rounded-lg shadow p-6 sticky top-6">
                <div className="flex items-start gap-3 mb-4">
                  <div className="p-2 bg-red-50 rounded-lg">
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <h3 className="text-gray-900 mb-1">Chi tiết báo cáo</h3>
                    <p className="text-gray-600">ID: {selectedReport.id}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Reporter */}
                  <div>
                    <p className="text-gray-600 mb-2">Người báo cáo:</p>
                    <div className="flex items-center gap-3">
                      <ImageWithFallback
                        src={selectedReport.reporter.avatar}
                        alt={selectedReport.reporter.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <span className="text-gray-900">{selectedReport.reporter.name}</span>
                    </div>
                  </div>

                  {/* Target */}
                  <div>
                    <p className="text-gray-600 mb-2">Đối tượng bị báo cáo:</p>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="p-1 bg-gray-100 rounded">
                        {targetIcons[selectedReport.target.type]}
                      </div>
                      <span className="text-gray-900">{selectedReport.target.type}</span>
                    </div>
                    <p className="text-gray-700">{selectedReport.target.content}</p>
                    {selectedReport.details.targetUser && (
                      <p className="text-gray-600 mt-1">Chủ sở hữu: {selectedReport.details.targetUser}</p>
                    )}
                  </div>

                  {/* Violation */}
                  <div>
                    <p className="text-gray-600 mb-2">Lý do vi phạm:</p>
                    <p className="text-red-600">{selectedReport.violation}</p>
                  </div>

                  {/* Description */}
                  <div>
                    <p className="text-gray-600 mb-2">Mô tả:</p>
                    <p className="text-gray-700">{selectedReport.details.description}</p>
                  </div>

                  {/* Reported Content */}
                  <div>
                    <p className="text-gray-600 mb-2">Nội dung bị báo cáo:</p>
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <p className="text-gray-700">{selectedReport.details.reportedContent}</p>
                    </div>
                  </div>

                  {/* Date */}
                  <div>
                    <p className="text-gray-600 mb-2">Thời gian:</p>
                    <p className="text-gray-700">{selectedReport.date}</p>
                  </div>

                  {/* Status */}
                  <div>
                    <p className="text-gray-600 mb-2">Trạng thái:</p>
                    <span
                      className={`px-3 py-1 rounded-full ${
                        selectedReport.status === 'Chờ xử lý'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-green-100 text-green-700'
                      }`}
                    >
                      {selectedReport.status}
                    </span>
                  </div>

                  {/* Action Button */}
                  {selectedReport.status === 'Chờ xử lý' && (
                    <div className="pt-4">
                      <button
                        onClick={() => handleResolveClick(selectedReport)}
                        className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Xử lý báo cáo
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow p-12 text-center">
                <p className="text-gray-500">Chọn một báo cáo để xem chi tiết</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Resolve Report Modal */}
      <ResolveReportModal
        isOpen={isResolveModalOpen}
        report={reportToResolve ? {
          id: reportToResolve.id,
          contentType: 'text',
          content: reportToResolve.details.reportedContent,
          reportedBy: reportToResolve.reporter.name,
          reason: reportToResolve.violation,
        } : null}
        onClose={() => setIsResolveModalOpen(false)}
        onSave={handleSaveResolution}
      />
    </div>
  );
}
