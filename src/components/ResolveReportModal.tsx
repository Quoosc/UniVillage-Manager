import { X } from 'lucide-react';
import { ImageWithFallback } from './asset/ImageWithFallback';
import { useState } from 'react';

interface ResolveReportModalProps {
  isOpen: boolean;
  report: {
    id: string;
    contentType: 'text' | 'image';
    content: string;
    reportedBy: string;
    reason: string;
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
  };

  const handleClose = () => {
    setAction('Cảnh báo');
    setNote('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={handleClose}
      ></div>

      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-gray-900">Xử lý vi phạm</h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Report Info */}
          <div className="space-y-2">
            <p className="text-gray-700">
              <span className="text-gray-900">Người báo cáo:</span> {report.reportedBy}
            </p>
            <p className="text-gray-700">
              <span className="text-gray-900">Lý do:</span> {report.reason}
            </p>
          </div>

          {/* Reported Content Preview */}
          <div>
            <label className="block text-gray-700 mb-2">
              Nội dung bị báo cáo
            </label>
            <div className="bg-gray-100 rounded-lg p-4 border border-gray-200">
              {report.contentType === 'text' ? (
                <p className="text-gray-800">{report.content}</p>
              ) : (
                <ImageWithFallback
                  src={report.content}
                  alt="Reported content"
                  className="w-full h-auto rounded-lg"
                />
              )}
            </div>
          </div>

          {/* Action Dropdown */}
          <div>
            <label htmlFor="actionSelect" className="block text-gray-700 mb-2">
              Hình thức xử lý
            </label>
            <select
              id="actionSelect"
              value={action}
              onChange={(e) => setAction(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            >
              <option value="Cảnh báo">Cảnh báo</option>
              <option value="Khóa tạm thời (7 ngày)">Khóa tạm thời (7 ngày)</option>
              <option value="Khóa vĩnh viễn">Khóa vĩnh viễn</option>
              <option value="Không vi phạm">Không vi phạm</option>
            </select>
          </div>

          {/* Admin Note */}
          <div>
            <label htmlFor="adminNote" className="block text-gray-700 mb-2">
              Ghi chú của Admin
            </label>
            <textarea
              id="adminNote"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Nhập ghi chú nội bộ..."
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
          <button
            onClick={handleClose}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Đóng
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Lưu kết quả
          </button>
        </div>
      </div>
    </div>
  );
}
