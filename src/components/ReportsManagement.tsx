import {
  FileText, MessageCircle, User, MapPin, AlertTriangle,
  Clock, CheckCircle, XCircle, Eye, Search
} from 'lucide-react';
import { ImageWithFallback } from './asset/ImageWithFallback';
import { ResolveReportModal } from './ResolveReportModal';
import { useState } from 'react';

interface Report {
  id: string;
  reporter: { name: string; avatar: string };
  target: { type: 'Bài viết' | 'Bình luận' | 'Tài khoản' | 'Địa điểm'; content: string };
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
      content: 'Bài viết về địa điểm du lịch Đà Lạt',
    },
    violation: 'Spam',
    date: '10:30 AM - 02/12/2025',
    status: 'Chờ xử lý',
    details: {
      description: 'Bài viết chứa nhiều liên kết quảng cáo không liên quan đến nội dung chính',
      reportedContent: 'Khám phá Đà Lạt tuyệt vời! 🌸 Click vào link để nhận ưu đãi khủng!!! 🎉🎉🎉 www.example.com/promo... Đừng bỏ lỡ cơ hội này!!! Giảm giá 90% chỉ hôm nay!!!',
      targetUser: 'Trần Thị Bảo',
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
    date: '09:15 AM - 02/12/2025',
    status: 'Chờ xử lý',
    details: {
      description: 'Bình luận có lời lẽ xúc phạm và công kích cá nhân người dùng khác',
      reportedContent: 'Bình luận này chứa nội dung xúc phạm nghiêm trọng đến danh dự và nhân phẩm của người khác. Sử dụng ngôn từ không phù hợp với cộng đồng.',
      targetUser: 'Phạm Văn Cường',
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
      content: 'fake_admin@university.edu.vn',
    },
    violation: 'Lừa đảo',
    date: '08:45 AM - 02/12/2025',
    status: 'Chờ xử lý',
    details: {
      description: 'Tài khoản này giả mạo là quản trị viên hệ thống và yêu cầu thông tin cá nhân nhạy cảm',
      reportedContent: 'Tài khoản đã gửi tin nhắn giả mạo yêu cầu người dùng cung cấp mật khẩu, thông tin đăng nhập và dữ liệu ngân hàng. Đây là hành vi lừa đảo nghiêm trọng.',
      targetUser: 'fake_admin_2025',
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
      content: 'Quán cà phê ABC Coffee',
    },
    violation: 'Thông tin sai lệch',
    date: '07:20 AM - 02/12/2025',
    status: 'Chờ xử lý',
    details: {
      description: 'Địa điểm chứa thông tin hoàn toàn không chính xác về địa chỉ, giờ mở cửa và dịch vụ',
      reportedContent: 'Địa điểm được đăng với địa chỉ sai, giờ hoạt động không đúng thực tế. Nhiều người dùng đã tới nơi nhưng không tìm thấy quán. Nghi ngờ đây là địa chỉ giả mạo.',
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
      content: 'Review nhà hàng XYZ Restaurant',
    },
    violation: 'Spam',
    date: '06:50 AM - 02/12/2025',
    status: 'Chờ xử lý',
    details: {
      description: 'Bài review spam với nhiều link quảng cáo và nội dung không liên quan',
      reportedContent: 'Nhà hàng tuyệt vời!!! Click link nhận voucher: www.fake-promo.com... Đặt món ngay hôm nay giảm 80%!!! 💰💰💰 Link đăng ký thẻ tín dụng: www.scam.link...',
      targetUser: 'Nguyễn Văn Đạt',
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
    date: '28/11/2025',
    status: 'Đã xử lý',
    details: {
      description: 'Bình luận có ngôn từ không phù hợp, đã được xử lý và gỡ bỏ',
      reportedContent: 'Nội dung đã bị xóa do vi phạm quy định cộng đồng.',
      targetUser: 'Lê Văn Em',
    },
  },
  {
    id: 'R007',
    reporter: {
      name: 'Phạm Thị Hồng',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop',
    },
    target: {
      type: 'Bài viết',
      content: 'Chia sẻ kinh nghiệm du lịch Phú Quốc',
    },
    violation: 'Spam',
    date: '05:30 AM - 02/12/2025',
    status: 'Chờ xử lý',
    details: {
      description: 'Bài viết chứa quá nhiều link affiliate và quảng cáo ẩn',
      reportedContent: 'Du lịch Phú Quốc siêu tiết kiệm! Đặt tour tại www.affiliate-link.com để nhận hoa hồng... Mã giảm giá SUPER99 chỉ có hôm nay! Click ngay: bit.ly/xyz123',
      targetUser: 'Hoàng Minh Tâm',
    },
  },
  {
    id: 'R008',
    reporter: {
      name: 'Ngô Văn Thành',
      avatar: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=100&h=100&fit=crop',
    },
    target: {
      type: 'Tài khoản',
      content: 'bot_spammer_123',
    },
    violation: 'Spam',
    date: '04:15 AM - 02/12/2025',
    status: 'Chờ xử lý',
    details: {
      description: 'Tài khoản bot tự động spam bình luận quảng cáo trên nhiều bài viết',
      reportedContent: 'Tài khoản này đã spam hơn 50 bình luận quảng cáo sản phẩm trong vòng 1 giờ. Rõ ràng là bot tự động.',
      targetUser: 'bot_spammer_123',
    },
  },
  {
    id: 'R009',
    reporter: {
      name: 'Bùi Thị Nga',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop',
    },
    target: {
      type: 'Địa điểm',
      content: 'Khách sạn Dream Hotel',
    },
    violation: 'Thông tin sai lệch',
    date: '01/12/2025',
    status: 'Đã xử lý',
    details: {
      description: 'Thông tin về khách sạn không chính xác, đã được cập nhật',
      reportedContent: 'Thông tin đã được kiểm tra và cập nhật lại cho chính xác.',
    },
  },
  {
    id: 'R010',
    reporter: {
      name: 'Lý Hoàng Nam',
      avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&h=100&fit=crop',
    },
    target: {
      type: 'Bình luận',
      content: 'Bình luận review địa điểm Hồ Gươm',
    },
    violation: 'Ngôn từ đả kích',
    date: '03:00 AM - 02/12/2025',
    status: 'Chờ xử lý',
    details: {
      description: 'Bình luận chứa ngôn từ kỳ thị và phân biệt vùng miền',
      reportedContent: 'Bình luận này sử dụng ngôn từ kỳ thị, phân biệt đối xử về vùng miền và văn hóa, gây chia rẽ cộng đồng.',
      targetUser: 'Trần Văn Bình',
    },
  },
  {
    id: 'R011',
    reporter: {
      name: 'Đinh Thị Tuyết',
      avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&h=100&fit=crop',
    },
    target: {
      type: 'Bài viết',
      content: 'Hướng dẫn đi phượt Sapa',
    },
    violation: 'Lừa đảo',
    date: '02:45 AM - 02/12/2025',
    status: 'Chờ xử lý',
    details: {
      description: 'Bài viết lừa đảo đòi đặt cọc tiền mà không cung cấp dịch vụ',
      reportedContent: 'Đặt tour Sapa giá rẻ! Chuyển khoản trước 5 triệu để giữ chỗ! Không hoàn tiền! (Nhiều người đã bị lừa và mất tiền)',
      targetUser: 'Lê Văn Lừa',
    },
  },
  {
    id: 'R012',
    reporter: {
      name: 'Võ Minh Khang',
      avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop',
    },
    target: {
      type: 'Địa điểm',
      content: 'Chợ đêm Bến Thành',
    },
    violation: 'Thông tin sai lệch',
    date: '30/11/2025',
    status: 'Đã xử lý',
    details: {
      description: 'Giờ mở cửa và vị trí đã được cập nhật chính xác',
      reportedContent: 'Thông tin địa điểm đã được kiểm duyệt và sửa lại.',
    },
  },
];

const targetIcons = {
  'Bài viết': <FileText className="w-5 h-5" />,
  'Bình luận': <MessageCircle className="w-5 h-5" />,
  'Tài khoản': <User className="w-5 h-5" />,
  'Địa điểm': <MapPin className="w-5 h-5" />,
};

const violationColors: Record<string, string> = {
  'Spam': 'bg-orange-100 text-orange-700 border-orange-200',
  'Ngôn từ đả kích': 'bg-red-100 text-red-700 border-red-200',
  'Lừa đảo': 'bg-purple-100 text-purple-700 border-purple-200',
  'Thông tin sai lệch': 'bg-blue-100 text-blue-700 border-blue-200',
};

export function ReportsManagement() {
  const [selectedReport, setSelectedReport] = useState<Report | null>(mockReports[0]);
  const [isResolveModalOpen, setIsResolveModalOpen] = useState(false);
  const [reportToResolve, setReportToResolve] = useState<Report | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const pendingCount = mockReports.filter(r => r.status === 'Chờ xử lý').length;

  const filteredReports = mockReports.filter(r =>
    r.reporter.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.target.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.violation.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleResolveClick = (report: Report) => {
    setReportToResolve(report);
    setIsResolveModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50/70 p-6">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header + Stats */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Báo cáo vi phạm</h1>
            <p className="text-gray-600 mt-1">Theo dõi và xử lý các nội dung không phù hợp trong cộng đồng</p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 px-6 py-4 flex items-center gap-4">
              <div className="text-center">
                <p className="text-sm text-gray-600">Tổng báo cáo</p>
                <p className="text-2xl font-bold text-gray-900">{mockReports.length}</p>
              </div>
              <div className="h-12 w-px bg-gray-200" />
              <div className="text-center">
                <p className="text-sm text-gray-600">Chờ xử lý</p>
                <p className="text-2xl font-bold text-orange-600">{pendingCount}</p>
              </div>
            </div>

            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm kiếm báo cáo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-5 py-3.5 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all w-80 shadow-sm"
              />
            </div>
          </div>
        </div>

        {/* Main Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left: Report List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="p-5 border-b border-gray-100 bg-gray-50/50">
                <h2 className="font-semibold text-gray-900">Danh sách báo cáo</h2>
              </div>

              <div className="max-h-[calc(100vh-300px)] overflow-y-auto scrollbar-hide-default">
                {filteredReports.map((report) => (
                  <div
                    key={report.id}
                    onClick={() => setSelectedReport(report)}
                    className={`p-5 border-b border-gray-100 cursor-pointer transition-all hover:bg-blue-50/30 ${
                      selectedReport?.id === report.id ? 'bg-blue-50 border-l-4 border-l-blue-600' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <ImageWithFallback
                            src={report.reporter.avatar}
                            alt={report.reporter.name}
                            className="w-10 h-10 rounded-full ring-2 ring-white shadow-sm"
                          />
                          <div>
                            <p className="font-medium text-gray-900">{report.reporter.name}</p>
                            <p className="text-xs text-gray-500">{report.date}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 mt-3">
                          <div className="flex items-center gap-2">
                            <div className="p-2 bg-gray-100 rounded-lg">
                              {targetIcons[report.target.type]}
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">{report.target.type}</p>
                              <p className="text-xs text-gray-600 truncate max-w-xs">{report.target.content}</p>
                            </div>
                          </div>

                          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${violationColors[report.violation] || 'bg-gray-100 text-gray-700'}`}>
                            {report.violation}
                          </span>

                          <span className={`ml-auto px-3 py-1 rounded-full text-xs font-medium ${
                            report.status === 'Chờ xử lý'
                              ? 'bg-orange-100 text-orange-700'
                              : 'bg-emerald-100 text-emerald-700'
                          }`}>
                            {report.status === 'Chờ xử lý' ? 'Chờ xử lý' : 'Đã xử lý'}
                          </span>
                        </div>
                      </div>

                      {report.status === 'Chờ xử lý' && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleResolveClick(report);
                          }}
                          className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition shadow-sm whitespace-nowrap"
                        >
                          Xử lý
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Detail Panel */}
          <div className="lg:col-span-1">
            {selectedReport ? (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 sticky top-6">
                <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-red-50 to-orange-50">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-white rounded-xl shadow-sm">
                      <AlertTriangle className="w-6 h-6 text-red-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900">Chi tiết báo cáo #{selectedReport.id}</h3>
                      <div className="flex items-center gap-3 mt-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${violationColors[selectedReport.violation]}`}>
                          {selectedReport.violation}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          selectedReport.status === 'Chờ xử lý' ? 'bg-orange-100 text-orange-700' : 'bg-emerald-100 text-emerald-700'
                        }`}>
                          {selectedReport.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 space-y-6">
                  {/* Reporter */}
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-3">Người báo cáo</p>
                    <div className="flex items-center gap-4">
                      <ImageWithFallback
                        src={selectedReport.reporter.avatar}
                        alt={selectedReport.reporter.name}
                        className="w-12 h-12 rounded-full ring-4 ring-gray-50"
                      />
                      <div>
                        <p className="font-semibold text-gray-900">{selectedReport.reporter.name}</p>
                        <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                          <Clock className="w-4 h-4" /> {selectedReport.date}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Target */}
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-3">Đối tượng bị báo cáo</p>
                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-white rounded-lg shadow-sm">
                          {targetIcons[selectedReport.target.type]}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{selectedReport.target.type}</p>
                          <p className="text-sm text-gray-600">{selectedReport.target.content}</p>
                          {selectedReport.details.targetUser && (
                            <p className="text-xs text-gray-500 mt-1">Chủ sở hữu: {selectedReport.details.targetUser}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-3">Mô tả vi phạm</p>
                    <p className="text-gray-700 leading-relaxed">{selectedReport.details.description}</p>
                  </div>

                  {/* Reported Content */}
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-3">Nội dung bị báo cáo</p>
                    <div className="bg-gray-50 rounded-xl p-5 border border-dashed border-gray-300">
                      <p className="text-gray-700 whitespace-pre-wrap text-sm">{selectedReport.details.reportedContent}</p>
                    </div>
                  </div>

                  {/* Action */}
                  {selectedReport.status === 'Chờ xử lý' && (
                    <button
                      onClick={() => handleResolveClick(selectedReport)}
                      className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    >
                      Xử lý báo cáo này
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-12 text-center sticky top-6">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Eye className="w-12 h-12 text-gray-400" />
                </div>
                <p className="text-xl font-medium text-gray-600">Chọn một báo cáo để xem chi tiết</p>
                <p className="text-gray-500 mt-2">Nhấn vào bất kỳ báo cáo nào bên trái</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal xử lý báo cáo */}
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
        onSave={(action, note) => {
          console.log('Resolved:', action, note);
          setIsResolveModalOpen(false);
        }}
      />
    </div>
  );
}