import { X, AlertTriangle, User, Clock, XCircle, CheckCircle, Save } from 'lucide-react';
import { ImageWithFallback } from './asset/ImageWithFallback';
import { useState } from 'react';

interface ResolveReportModalProps {
  isOpen: boolean;
  report: {
    id: string;
    contentType: 'text' | 'image';
    content: string;
    reportedBy: string;
    reportedUser?: string;
    reason: string;
    timestamp: string;
  } | null;
  onClose: () => void;
  onSave: (action: string, note: string) => void;
}

export function ResolveReportModal({ isOpen, report, onClose, onSave }: ResolveReportModalProps) {
  const [action, setAction] = useState('Cảnh báo');
  const [note, setNote] = useState('');

  if (!isOpen || !report) return null;

  const handleSave = () => {
    onSave(action, note);
    setAction('Cảnh báo');
    setNote('');
    onClose();
  };

  const handleClose = () => {
    setAction('Cảnh báo');
    setNote('');
    onClose();
  };

  const actions = [
    { value: 'Cảnh báo', icon: AlertTriangle, color: 'text-orange-700', bg: 'bg-orange-50', border: 'border-orange-200' },
    { value: 'Khóa tạm thời (7 ngày)', icon: Clock, color: 'text-amber-700', bg: 'bg-amber-50', border: 'border-amber-200' },
    { value: 'Khóa vĩnh viễn', icon: XCircle, color: 'text-red-700', bg: 'bg-red-50', border: 'border-red-200' },
    { value: 'Không vi phạm', icon: CheckCircle, color: 'text-emerald-700', bg: 'bg-emerald-50', border: 'border-emerald-200' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={handleClose} />

      {/* Modal – gọn đẹp, max-width 448px */}
      <div className="relative w-full max-w-md mx-4 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-200 bg-gradient-to-r from-red-50 to-rose-50">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-red-100 flex items-center justify-center">
              <AlertTriangle className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Xử lý báo cáo vi phạm</h2>
              <p className="text-xs text-gray-500">
                ID: <span className="font-mono">{report.id}</span>
              </p>
            </div>
          </div>
          <button onClick={handleClose} className="text-gray-400 hover:text-gray-600 transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-5">
          {/* Summary */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 p-3">
              <div className="h-9 w-9 rounded-md bg-white flex items-center justify-center border border-gray-200">
                <User className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Người báo cáo</p>
                <p className="text-sm font-medium text-gray-900">{report.reportedBy}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 p-3">
              <div className="h-9 w-9 rounded-md bg-white flex items-center justify-center border border-gray-200">
                <AlertTriangle className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Lý do</p>
                <p className="text-sm font-medium text-red-700">{report.reason}</p>
              </div>
            </div>
          </div>

          {/* Reported content */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Nội dung bị báo cáo</label>
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
              {report.contentType === 'text' ? (
                <p className="text-sm text-gray-800 whitespace-pre-wrap leading-relaxed">{report.content}</p>
              ) : (
                <div className="flex justify-center">
                  <ImageWithFallback
                    src={report.content}
                    alt="Nội dung bị báo cáo"
                    className="max-h-80 w-auto rounded-md border border-gray-300 shadow-sm"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Hình thức xử lý <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 gap-3">
              {actions.map((opt) => {
                const Icon = opt.icon;
                const isActive = action === opt.value;
                return (
                  <button
                    key={opt.value}
                    onClick={() => setAction(opt.value)}
                    className={`flex items-center gap-2.5 rounded-lg border px-4 py-3 text-sm font-medium transition-all ${
                      isActive
                        ? `${opt.bg} ${opt.border} ${opt.color} ring-2 ring-blue-500/30 shadow-sm`
                        : 'bg-white border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="h-[18px] w-[18px]" />
                    <span>{opt.value}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Internal note */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ghi chú nội bộ (không gửi cho người dùng)
            </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={4}
              placeholder="Ghi chú chi tiết về quyết định xử lý..."
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-800 placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition resize-none outline-none"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-5 border-t border-gray-200 bg-gray-50">
          <button
            onClick={handleClose}
            className="px-5 py-2.5 rounded-lg border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
          >
            Hủy bỏ
          </button>
          <button
            onClick={handleSave}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition"
          >
            <Save className="w-[18px] h-[18px]" />
            Lưu kết quả xử lý
          </button>
        </div>
      </div>
    </div>
  );
}