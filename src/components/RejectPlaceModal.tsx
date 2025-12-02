import { X } from 'lucide-react';
import { useState } from 'react';

interface RejectPlaceModalProps {
  isOpen: boolean;
  placeName: string;
  onClose: () => void;
  onConfirm: (reason: string) => void;
}

export function RejectPlaceModal({ isOpen, placeName, onClose, onConfirm }: RejectPlaceModalProps) {
  const [reason, setReason] = useState('');

  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm(reason);
    setReason('');
  };

  const handleClose = () => {
    setReason('');
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
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-lg mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-gray-900">Từ chối địa điểm</h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-gray-700 mb-4">
            Bạn có chắc chắn muốn từ chối đề xuất địa điểm: <span className="text-gray-900">{placeName}</span>?
          </p>

          <div>
            <label htmlFor="rejectReason" className="block text-gray-700 mb-2">
              Lý do từ chối
            </label>
            <textarea
              id="rejectReason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Vui lòng nhập lý do (ví dụ: Sai địa chỉ, Trùng lặp)..."
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
          <button
            onClick={handleClose}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Hủy bỏ
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Xác nhận từ chối
          </button>
        </div>
      </div>
    </div>
  );
}
