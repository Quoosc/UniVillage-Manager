import {
  FileText,
  MessageCircle,
  User,
  MapPin,
  AlertTriangle,
  Clock,
  Eye,
  Search,
} from "lucide-react";
import { ImageWithFallback } from "./asset/ImageWithFallback";
import { ResolveReportModal } from "./ResolveReportModal";
import { useState } from "react";

interface Report {
  id: string;
  reporter: { name: string; avatar: string };
  target: {
    type: "Bài viết" | "Bình luận" | "Tài khoản" | "Địa điểm";
    content: string;
  };
  violation: string;
  date: string;
  status: "Chờ xử lý" | "Đã xử lý";
  details: {
    description: string;
    reportedContent: string;
    targetUser?: string;
  };
}

const mockReports: Report[] = [
  {
    id: "R001",
    reporter: {
      name: "Trần Minh Quang",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    },
    target: {
      type: "Bài viết",
      content: "Bài viết về địa điểm du lịch Đà Lạt",
    },
    violation: "Spam",
    date: "10:30 AM - 02/12/2025",
    status: "Chờ xử lý",
    details: {
      description:
        "Bài viết chứa nhiều liên kết quảng cáo không liên quan đến nội dung chính",
      reportedContent:
        "Khám phá Đà Lạt tuyệt vời! 🌸 Click vào link để nhận ưu đãi khủng!!! 🎉🎉🎉 www.example.com/promo... Đừng bỏ lỡ cơ hội này!!! Giảm giá 90% chỉ hôm nay!!!",
      targetUser: "Trần Minh Quang",
    },
  },
  {
    id: "R002",
    reporter: {
      name: "Hồ Ngọc Quỳnh",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    },
    target: {
      type: "Bình luận",
      content: "Bình luận trên bài viết #123",
    },
    violation: "Ngôn từ đả kích",
    date: "09:15 AM - 02/12/2025",
    status: "Chờ xử lý",
    details: {
      description:
        "Bình luận có lời lẽ xúc phạm và công kích cá nhân người dùng khác",
      reportedContent:
        "Bình luận này chứa nội dung xúc phạm nghiêm trọng đến danh dự và nhân phẩm của người khác. Sử dụng ngôn từ không phù hợp với cộng đồng.",
      targetUser: "Hồ Ngọc Quỳnh",
    },
  },
  {
    id: "R003",
    reporter: {
      name: "Võ Sĩ Trí Thông",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    },
    target: {
      type: "Tài khoản",
      content: "fake_admin@university.edu.vn",
    },
    violation: "Lừa đảo",
    date: "08:45 AM - 02/12/2025",
    status: "Chờ xử lý",
    details: {
      description:
        "Tài khoản này giả mạo là quản trị viên hệ thống và yêu cầu thông tin cá nhân nhạy cảm",
      reportedContent:
        "Tài khoản đã gửi tin nhắn giả mạo yêu cầu người dùng cung cấp mật khẩu, thông tin đăng nhập và dữ liệu ngân hàng. Đây là hành vi lừa đảo nghiêm trọng.",
      targetUser: "Võ Sĩ Trí Thông",
    },
  },
  {
    id: "R004",
    reporter: {
      name: "Nguyễn Minh Đức",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    },
    target: {
      type: "Địa điểm",
      content: "Quán cà phê ABC Coffee",
    },
    violation: "Thông tin sai lệch",
    date: "07:20 AM - 02/12/2025",
    status: "Chờ xử lý",
    details: {
      description:
        "Địa điểm chứa thông tin hoàn toàn không chính xác về địa chỉ, giờ mở cửa và dịch vụ",
      reportedContent:
        "Địa điểm được đăng với địa chỉ sai, giờ hoạt động không đúng thực tế. Nhiều người dùng đã tới nơi nhưng không tìm thấy quán. Nghi ngờ đây là địa chỉ giả mạo.",
    },
  },
  {
    id: "R005",
    reporter: {
      name: "Vũ Thị Lan",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    },
    target: {
      type: "Bài viết",
      content: "Review nhà hàng XYZ Restaurant",
    },
    violation: "Spam",
    date: "06:50 AM - 02/12/2025",
    status: "Chờ xử lý",
    details: {
      description:
        "Bài review spam với nhiều link quảng cáo và nội dung không liên quan",
      reportedContent:
        "Nhà hàng tuyệt vời!!! Click link nhận voucher: www.fake-promo.com... Đặt món ngay hôm nay giảm 80%!!! 💰💰💰 Link đăng ký thẻ tín dụng: www.scam.link...",
      targetUser: "Nguyễn Văn Đạt",
    },
  },
  {
    id: "R006",
    reporter: {
      name: "Trần Minh Đức",
      avatar:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop",
    },
    target: {
      type: "Bình luận",
      content: "Bình luận trên địa điểm #456",
    },
    violation: "Ngôn từ đả kích",
    date: "28/11/2025",
    status: "Đã xử lý",
    details: {
      description:
        "Bình luận có ngôn từ không phù hợp, đã được xử lý và gỡ bỏ",
      reportedContent:
        "Nội dung đã bị xóa do vi phạm quy định cộng đồng.",
      targetUser: "Lê Văn Em",
    },
  },
  {
    id: "R007",
    reporter: {
      name: "Phạm Thị Hồng",
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop",
    },
    target: {
      type: "Bài viết",
      content: "Chia sẻ kinh nghiệm du lịch Phú Quốc",
    },
    violation: "Spam",
    date: "05:30 AM - 02/12/2025",
    status: "Chờ xử lý",
    details: {
      description:
        "Bài viết chứa quá nhiều link affiliate và quảng cáo ẩn",
      reportedContent:
        "Du lịch Phú Quốc siêu tiết kiệm! Đặt tour tại www.affiliate-link.com để nhận hoa hồng... Mã giảm giá SUPER99 chỉ có hôm nay! Click ngay: bit.ly/xyz123",
      targetUser: "Hoàng Minh Tâm",
    },
  },
  {
    id: "R008",
    reporter: {
      name: "Ngô Văn Thành",
      avatar:
        "https://images.unsplash.com/photo-1463453091185-61582044d556?w=100&h=100&fit=crop",
    },
    target: {
      type: "Tài khoản",
      content: "bot_spammer_123",
    },
    violation: "Spam",
    date: "04:15 AM - 02/12/2025",
    status: "Chờ xử lý",
    details: {
      description:
        "Tài khoản bot tự động spam bình luận quảng cáo trên nhiều bài viết",
      reportedContent:
        "Tài khoản này đã spam hơn 50 bình luận quảng cáo sản phẩm trong vòng 1 giờ. Rõ ràng là bot tự động.",
      targetUser: "bot_spammer_123",
    },
  },
  {
    id: "R009",
    reporter: {
      name: "Bùi Thị Nga",
      avatar:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop",
    },
    target: {
      type: "Địa điểm",
      content: "Khách sạn Dream Hotel",
    },
    violation: "Thông tin sai lệch",
    date: "01/12/2025",
    status: "Đã xử lý",
    details: {
      description:
        "Thông tin về khách sạn không chính xác, đã được cập nhật",
      reportedContent:
        "Thông tin đã được kiểm tra và cập nhật lại cho chính xác.",
    },
  },
  {
    id: "R010",
    reporter: {
      name: "Lý Hoàng Nam",
      avatar:
        "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&h=100&fit=crop",
    },
    target: {
      type: "Bình luận",
      content: "Bình luận review địa điểm Hồ Gươm",
    },
    violation: "Ngôn từ đả kích",
    date: "03:00 AM - 02/12/2025",
    status: "Chờ xử lý",
    details: {
      description:
        "Bình luận chứa ngôn từ kỳ thị và phân biệt vùng miền",
      reportedContent:
        "Bình luận này sử dụng ngôn từ kỳ thị, phân biệt đối xử về vùng miền và văn hóa, gây chia rẽ cộng đồng.",
      targetUser: "Trần Văn Bình",
    },
  },
  {
    id: "R011",
    reporter: {
      name: "Đinh Thị Tuyết",
      avatar:
        "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&h=100&fit=crop",
    },
    target: {
      type: "Bài viết",
      content: "Hướng dẫn đi phượt Sapa",
    },
    violation: "Lừa đảo",
    date: "02:45 AM - 02/12/2025",
    status: "Chờ xử lý",
    details: {
      description:
        "Bài viết lừa đảo đòi đặt cọc tiền mà không cung cấp dịch vụ",
      reportedContent:
        "Đặt tour Sapa giá rẻ! Chuyển khoản trước 5 triệu để giữ chỗ! Không hoàn tiền! (Nhiều người đã bị lừa và mất tiền)",
      targetUser: "Lê Văn Lừa",
    },
  },
  {
    id: "R012",
    reporter: {
      name: "Võ Minh Khang",
      avatar:
        "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop",
    },
    target: {
      type: "Địa điểm",
      content: "Chợ đêm Bến Thành",
    },
    violation: "Thông tin sai lệch",
    date: "30/11/2025",
    status: "Đã xử lý",
    details: {
      description: "Giờ mở cửa và vị trí đã được cập nhật chính xác",
      reportedContent:
        "Thông tin địa điểm đã được kiểm duyệt và sửa lại.",
    },
  },
];

const targetIcons = {
  "Bài viết": <FileText className="h-5 w-5" />,
  "Bình luận": <MessageCircle className="h-5 w-5" />,
  "Tài khoản": <User className="h-5 w-5" />,
  "Địa điểm": <MapPin className="h-5 w-5" />,
};

// Violation pill palettes (bg + text + border + ring)
const violationColors: Record<string, string> = {
  Spam: "bg-orange-100 text-orange-700 border-orange-200 ring-orange-600/20",
  "Ngôn từ đả kích": "bg-red-100 text-red-700 border-red-200 ring-red-600/20",
  "Lừa đảo": "bg-fuchsia-100 text-fuchsia-700 border-fuchsia-200 ring-fuchsia-600/20",
  "Thông tin sai lệch": "bg-blue-100 text-blue-700 border-blue-200 ring-blue-600/20",
};

// Row background tint by status
const rowBgByStatus: Record<Report['status'], string> = {
  "Chờ xử lý": "hover:bg-amber-50/50",
  "Đã xử lý": "hover:bg-emerald-50/50",
};

// Status pill palettes (bg must be green for “Đã xử lý”)
const statusColors: Record<Report['status'], string> = {
  "Chờ xử lý": "bg-amber-100 text-amber-700 border-amber-200 ring-amber-600/20",
  "Đã xử lý": "bg-emerald-100 text-emerald-700 border-emerald-200 ring-emerald-600/20",
};

export function ReportsManagement() {
  const [selectedReport, setSelectedReport] = useState<Report | null>(
    mockReports[0]
  );
  const [isResolveModalOpen, setIsResolveModalOpen] = useState(false);
  const [reportToResolve, setReportToResolve] = useState<Report | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const pendingCount = mockReports.filter(
    (r) => r.status === "Chờ xử lý"
  ).length;

  const filteredReports = mockReports.filter(
    (r) =>
      r.reporter.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.target.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.violation.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleResolveClick = (report: Report) => {
    setReportToResolve(report);
    setIsResolveModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#F4F6FB] px-8 py-6">
      <div className="mx-auto max-w-6xl space-y-8">
        {/* HEADER + STATS */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Báo cáo vi phạm</h1>
            <p className="mt-1 text-sm text-gray-500">
              Theo dõi và xử lý các nội dung không phù hợp trong cộng đồng
            </p>
          </div>

          <div className="flex items-center gap-4 flex-nowrap">
            {/* Stats card */}
            <div className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white px-6 py-4 shadow-sm">
              <div className="text-center">
                <p className="text-xs text-gray-500">Tổng báo cáo</p>
                <p className="mt-1 text-xl font-semibold text-gray-900">
                  {mockReports.length}
                </p>
              </div>
              <span className="h-10 w-px bg-gray-200" />
              <div className="text-center">
                <p className="text-xs text-gray-500">Chờ xử lý</p>
                <p className="mt-1 text-xl font-semibold text-orange-600">
                  {pendingCount}
                </p>
              </div>
            </div>

            {/* Search box */}
            <div className="relative group flex-1 min-w-[280px]">
              <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 transition-colors group-focus-within:text-blue-600" />
              <input
                type="text"
                placeholder="Tìm kiếm báo cáo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full lg:w-80 rounded-2xl border border-gray-200 bg-white pl-10 pr-4 py-3 text-sm text-gray-900 placeholder-gray-400 shadow-sm outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:shadow-md"
              />
            </div>
          </div>
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* LEFT: LIST */}
          <div className="lg:col-span-2">
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
              <div className="border-b border-gray-100 bg-gray-50/80 px-6 py-4">
                <h2 className="text-sm font-semibold text-gray-900">
                  Danh sách báo cáo
                </h2>
              </div>

              <div className="max-h-[calc(100vh-280px)] overflow-y-auto">
                {filteredReports.map((report) => {
                  const isActive = selectedReport?.id === report.id;
                  const rowTint = rowBgByStatus[report.status];
                  return (
                    <div
                      key={report.id}
                      onClick={() => setSelectedReport(report)}
                      className={[
                        "cursor-pointer border-b border-gray-100 px-6 py-4 transition-colors",
                        isActive
                          ? "bg-blue-50/80 pl-[22px] border-l-4 border-l-blue-600"
                          : rowTint,
                      ].join(" ")}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0 flex-1">
                          {/* Reporter */}
                          <div className="mb-2 flex items-center gap-3">
                            <ImageWithFallback
                              src={report.reporter.avatar}
                              alt={report.reporter.name}
                              className="h-10 w-10 rounded-full ring-2 ring-white shadow-sm"
                            />
                            <div className="leading-tight">
                              <p className="text-sm font-semibold text-gray-900">
                                {report.reporter.name}
                              </p>
                              <p className="mt-1 text-[11px] text-gray-500">
                                {report.date}
                              </p>
                            </div>
                          </div>

                          {/* Target + tags */}
                          <div className="mt-2 flex flex-wrap items-center gap-3">
                            <div className="flex items-center gap-2">
                              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100 text-gray-600">
                                {targetIcons[report.target.type]}
                              </div>
                              <div className="leading-tight">
                                <p className="text-xs font-semibold text-gray-900">
                                  {report.target.type}
                                </p>
                                <p className="mt-1 max-w-xs truncate text-xs text-gray-500">
                                  {report.target.content}
                                </p>
                              </div>
                            </div>

                            {/* Violation pill with background */}
                            <span
                              className={`inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-semibold ring-1 ring-inset ${
                                violationColors[report.violation] ??
                                "bg-gray-100 text-gray-700 border-gray-200 ring-gray-600/20"
                              }`}
                            >
                              {report.violation}
                            </span>

                            {/* Status pill with background; “Đã xử lý” is green */}
                            <span
                              className={`ml-auto inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold border ring-1 ring-inset ${
                                statusColors[report.status]
                              }`}
                            >
                              {report.status}
                            </span>
                          </div>
                        </div>

                        {report.status === "Chờ xử lý" && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleResolveClick(report);
                            }}
                            className="whitespace-nowrap rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-blue-700"
                          >
                            Xử lý
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* RIGHT: DETAIL PANEL */}
          <div className="lg:col-span-1">
            {selectedReport ? (
              <div className="sticky top-6 rounded-2xl border border-gray-200 bg-white shadow-sm">
                {/* Header */}
                <div className="border-b border-gray-100 bg-gradient-to-r from-orange-50 to-amber-50 px-6 py-5">
                  <div className="flex items-start gap-3">
                    <div className="rounded-xl bg-white p-3 shadow-sm">
                      <AlertTriangle className="h-5 w-5 text-red-500" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold text-gray-900">
                        Chi tiết báo cáo #{selectedReport.id}
                      </h3>
                      <div className="mt-2 flex flex-wrap items-center gap-2">
                        <span
                          className={`inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-semibold ${
                            violationColors[selectedReport.violation]
                          }`}
                        >
                          {selectedReport.violation}
                        </span>
                        <span
                          className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] font-medium ${
                            selectedReport.status === "Chờ xử lý"
                              ? "bg-amber-100 text-amber-700"
                              : "bg-emerald-100 text-emerald-700"
                          }`}
                        >
                          {selectedReport.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Body */}
                <div className="space-y-6 px-6 py-6">
                  {/* Reporter */}
                  <div>
                    <p className="mb-3 text-xs font-semibold text-gray-500">
                      Người báo cáo
                    </p>
                    <div className="flex items-center gap-4">
                      <ImageWithFallback
                        src={selectedReport.reporter.avatar}
                        alt={selectedReport.reporter.name}
                        className="h-11 w-11 rounded-full ring-4 ring-gray-50"
                      />
                      <div className="leading-tight">
                        <p className="text-sm font-semibold text-gray-900">
                          {selectedReport.reporter.name}
                        </p>
                        <p className="mt-1 flex items-center gap-1 text-[11px] text-gray-500">
                          <Clock className="h-3.5 w-3.5" />
                          {selectedReport.date}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Target */}
                  <div>
                    <p className="mb-3 text-xs font-semibold text-gray-500">
                      Đối tượng bị báo cáo
                    </p>
                    <div className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-white p-2.5 shadow-sm">
                          {targetIcons[selectedReport.target.type]}
                        </div>
                        <div className="leading-tight">
                          <p className="text-sm font-semibold text-gray-900">
                            {selectedReport.target.type}
                          </p>
                          <p className="mt-1 text-xs text-gray-600">
                            {selectedReport.target.content}
                          </p>
                          {selectedReport.details.targetUser && (
                            <p className="mt-1 text-[11px] text-gray-500">
                              Chủ sở hữu: {selectedReport.details.targetUser}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <p className="mb-3 text-xs font-semibold text-gray-500">
                      Mô tả vi phạm
                    </p>
                    <p className="text-sm leading-relaxed text-gray-700">
                      {selectedReport.details.description}
                    </p>
                  </div>

                  {/* Reported content */}
                  <div>
                    <p className="mb-3 text-xs font-semibold text-gray-500">
                      Nội dung bị báo cáo
                    </p>
                    <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 px-4 py-4">
                      <p className="whitespace-pre-wrap text-sm text-gray-700">
                        {selectedReport.details.reportedContent}
                      </p>
                    </div>
                  </div>

                  {/* Action button */}
                  {selectedReport.status === "Chờ xử lý" && (
                    <button
                      onClick={() => handleResolveClick(selectedReport)}
                      className="mt-2 w-full transform rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 py-3.5 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg"
                    >
                      Xử lý báo cáo này
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="sticky top-6 rounded-2xl border border-gray-200 bg-white p-12 text-center shadow-sm">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
                  <Eye className="h-10 w-10 text-gray-400" />
                </div>
                <p className="text-sm font-semibold text-gray-700">
                  Chọn một báo cáo để xem chi tiết
                </p>
                <p className="mt-2 text-xs text-gray-500">
                  Nhấn vào bất kỳ báo cáo nào ở danh sách bên trái
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MODAL XỬ LÝ BÁO CÁO */}
      <ResolveReportModal
        isOpen={isResolveModalOpen}
        report={
          reportToResolve
            ? {
                id: reportToResolve.id,
                contentType: "text",
                content: reportToResolve.details.reportedContent,
                reportedBy: reportToResolve.reporter.name,
                reason: reportToResolve.violation,
              }
            : null
        }
        onClose={() => setIsResolveModalOpen(false)}
        onSave={(action, note) => {
          console.log("Resolved:", action, note);
          setIsResolveModalOpen(false);
        }}
      />
    </div>
  );
}
