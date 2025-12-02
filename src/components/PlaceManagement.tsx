import {
  Check, X, MapPin, Filter, Search, MoreVertical,
  LayoutGrid, List, Plus, Map as MapIcon, Info, ExternalLink, Image as ImageIcon
} from 'lucide-react';
import { useState } from 'react';

// --- Component phụ trợ ---
const Modal = ({ isOpen, onClose, title, children }: any) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200" onClick={(e) => e.stopPropagation()}>
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <h3 className="font-bold text-lg text-gray-900">{title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors">
            <X size={20} />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

const Badge = ({ children, color }: { children: React.ReactNode, color: string }) => {
  const styles: any = {
    orange: "bg-orange-50 text-orange-700 border-orange-200 ring-orange-600/20",
    blue: "bg-blue-50 text-blue-700 border-blue-200 ring-blue-600/20",
    green: "bg-green-50 text-green-700 border-green-200 ring-green-600/20",
    purple: "bg-purple-50 text-purple-700 border-purple-200 ring-purple-600/20",
    gray: "bg-gray-50 text-gray-700 border-gray-200 ring-gray-600/20",
    red: "bg-red-50 text-red-700 border-red-200 ring-red-600/20",
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ring-1 ring-inset ${styles[color] || styles.gray}`}>
      {children}
    </span>
  );
};

// --- Types & Data ---
interface Place {
  id: string;
  name: string;
  address: string;
  thumbnail: string;
  category: 'Ăn uống' | 'Tham quan' | 'Tiện ích' | 'Cà phê';
  area: string;
  status: 'Open' | 'Pending' | 'Rejected';
  rating: number;
  proposer: { name: string; avatar: string; role: string };
}

const initialPlaces: Place[] = [
  { id: 'P001', name: 'Hồ Đá', address: 'Khu đô thị ĐHQG, Đông Hòa, Dĩ An', thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop', category: 'Tham quan', area: 'Làng Đại học', status: 'Pending', rating: 0, proposer: { name: 'Trần Minh Quang', avatar: 'https://i.pravatar.cc/150?u=10', role: 'Sinh viên' } },
  { id: 'P002', name: 'Tiệm Photo Tuấn', address: '45 Đường Lý Thường Kiệt, Khu A', thumbnail: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&h=300&fit=crop', category: 'Tiện ích', area: 'Khu A', status: 'Pending', rating: 0, proposer: { name: 'Nguyễn Thị Lan', avatar: 'https://i.pravatar.cc/150?u=11', role: 'Chủ cửa hàng' } },
  { id: 'P003', name: 'Quán Cà Phê Guitar Mộc', address: '78 Đường Vành Đai, KTX Khu B', thumbnail: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop', category: 'Cà phê', area: 'Khu B', status: 'Pending', rating: 0, proposer: { name: 'Lê Văn Hùng', avatar: 'https://i.pravatar.cc/150?u=12', role: 'Sinh viên' } },
  { id: 'P004', name: 'Cơm Tấm Kiều Giang', address: 'Cổng chính KTX Khu A', thumbnail: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop', category: 'Ăn uống', area: 'Khu A', status: 'Open', rating: 4.5, proposer: { name: 'Admin System', avatar: 'https://i.pravatar.cc/150?u=admin', role: 'Admin' } },
  { id: 'P005', name: 'Nhà Văn Hóa Sinh Viên', address: 'Quảng trường sáng tạo', thumbnail: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&h=300&fit=crop', category: 'Tiện ích', area: 'Trung tâm', status: 'Open', rating: 4.8, proposer: { name: 'Admin System', avatar: 'https://i.pravatar.cc/150?u=admin', role: 'Admin' } },
];

const categoryColors: Record<string, string> = {
  'Ăn uống': 'orange',
  'Tham quan': 'blue',
  'Tiện ích': 'green',
  'Cà phê': 'purple',
};

export function PlaceManagement() {
  const [places, setPlaces] = useState<Place[]>(initialPlaces);
  const [activeTab, setActiveTab] = useState<'list' | 'pending'>('pending');
  const [searchTerm, setSearchTerm] = useState('');

  // Modal states
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [rejectReason, setRejectReason] = useState('');

  // Form thêm mới
  const [newPlaceData, setNewPlaceData] = useState({
    name: '', category: 'Ăn uống' as const, area: 'Làng Đại học', address: ''
  });

  const filteredPlaces = places.filter(place => {
    const matchesTab = activeTab === 'list' ? place.status === 'Open' : place.status === 'Pending';
    const matchesSearch = place.name.toLowerCase().includes(searchTerm.toLowerCase()) || place.address.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  // === XỬ LÝ DUYỆT ===
  const openApproveModal = (place: Place) => {
    setSelectedPlace(place);
    setIsApproveModalOpen(true);
  };

  const handleConfirmApprove = () => {
    if (selectedPlace) {
      setPlaces(prev => prev.map(p => p.id === selectedPlace.id ? { ...p, status: 'Open' } : p));
      setIsApproveModalOpen(false);
      setSelectedPlace(null);
      setActiveTab('list');
    }
  };

  // === XỬ LÝ TỪ CHỐI ===
  const openRejectModal = (place: Place) => {
    setSelectedPlace(place);
    setRejectReason('');
    setIsRejectModalOpen(true);
  };

  const handleConfirmReject = () => {
    if (selectedPlace) {
      setPlaces(prev => prev.filter(p => p.id !== selectedPlace.id));
      setIsRejectModalOpen(false);
      setSelectedPlace(null);
    }
  };

  // === XỬ LÝ THÊM MỚI ===
  const handleAddNewPlace = () => {
    if (!newPlaceData.name.trim() || !newPlaceData.address.trim()) return;

    const newPlace: Place = {
      id: `P${Date.now()}`,
      name: newPlaceData.name,
      category: newPlaceData.category,
      area: newPlaceData.area,
      address: newPlaceData.address,
      thumbnail: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop',
      status: 'Open',
      rating: 0,
      proposer: { name: 'Admin System', avatar: 'https://i.pravatar.cc/150?u=admin', role: 'Admin' }
    };

    setPlaces(prev => [newPlace, ...prev]);
    setIsAddModalOpen(false);
    setActiveTab('list');
    setNewPlaceData({ name: '', category: 'Ăn uống', area: 'Làng Đại học', address: '' });
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50/50">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Quản lý địa điểm</h1>
            <p className="text-sm text-gray-500 mt-1">Kiểm duyệt đề xuất và quản lý dữ liệu bản đồ uniVillage</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
              <input
                type="text" placeholder="Tìm địa điểm..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full md:w-72 pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm"
              />
            </div>
            <button onClick={() => setIsAddModalOpen(true)} className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 text-sm font-medium transition-colors shadow-sm">
              <Plus className="w-4 h-4" /> Thêm mới
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center justify-between border-b border-gray-200">
          <div className="flex gap-6">
            <button onClick={() => setActiveTab('list')} className={`pb-4 px-2 relative text-sm font-medium flex items-center gap-2 transition-all ${activeTab === 'list' ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>
              <LayoutGrid size={18} /> Danh sách địa điểm
              {activeTab === 'list' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600" />}
            </button>

            <button onClick={() => setActiveTab('pending')} className={`pb-4 px-2 relative text-sm font-medium flex items-center gap-2 transition-all ${activeTab === 'pending' ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>
              <List size={18} /> Chờ duyệt
              <span className={`ml-1.5 px-2 py-0.5 rounded-full text-xs font-semibold transition-all ${activeTab === 'pending' ? 'bg-blue-100 text-blue-700' : 'bg-red-500 text-white'}`}>
                {places.filter(p => p.status === 'Pending').length}
              </span>
              {activeTab === 'pending' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600" />}
            </button>
          </div>
          <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mb-2">
            <Filter size={16} /> Lọc nâng cao
          </button>
        </div>

        {/* Pending Table */}
        {activeTab === 'pending' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {filteredPlaces.length > 0 ? (
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50/50 border-b border-gray-100">
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Thông tin địa điểm</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Danh mục</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Khu vực</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Người đề xuất</th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Hành động</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredPlaces.map((place) => (
                    <tr key={place.id} className="hover:bg-blue-50/30 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-start gap-4">
                          <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 border border-gray-100 shadow-sm">
                            <ImageWithFallback src={place.thumbnail} alt={place.name} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-gray-900">{place.name}</p>
                            <p className="text-xs text-gray-500 mt-1 flex items-center gap-1"><MapPin size={10} /> {place.address}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4"><Badge color={categoryColors[place.category]}>{place.category}</Badge></td>
                      <td className="px-6 py-4 text-sm text-gray-700">{place.area}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img src={place.proposer.avatar} alt="" className="w-8 h-8 rounded-full ring-2 ring-white" />
                          <div>
                            <p className="text-sm font-medium text-gray-900">{place.proposer.name}</p>
                            <p className="text-xs text-gray-500">{place.proposer.role}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button onClick={() => openApproveModal(place)} className="flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-700 hover:bg-green-100 rounded-lg border border-green-200 shadow-sm transition-all">
                            <Check size={16} strokeWidth={2.5} /> <span className="text-xs font-bold">Duyệt</span>
                          </button>
                          <button onClick={() => openRejectModal(place)} className="flex items-center gap-1.5 px-3 py-1.5 bg-white text-red-600 hover:bg-red-50 rounded-lg border border-gray-200 hover:border-red-200 shadow-sm transition-all">
                            <X size={16} strokeWidth={2.5} /> <span className="text-xs font-medium">Từ chối</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="py-16 text-center">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4"><Check size={32} className="text-gray-400" /></div>
                <h3 className="text-lg font-medium text-gray-900">Không có yêu cầu nào</h3>
                <p className="text-gray-500 mt-1">Tuyệt vời! Bạn đã xử lý hết các địa điểm chờ duyệt.</p>
              </div>
            )}
          </div>
        )}

        {/* Active List */}
        {activeTab === 'list' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPlaces.map(place => (
              <div key={place.id} className="group bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col">
                <div className="relative h-48 overflow-hidden">
                  <img src={place.thumbnail} alt={place.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-3 left-3"><Badge color="green">Đang hoạt động</Badge></div>
                  <div className="absolute top-3 right-3 p-1.5 bg-white/90 backdrop-blur-sm rounded-lg shadow-sm"><MoreVertical size={16} /></div>
                  <div className="absolute bottom-0 left-0 w-full h-2/3 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-3 left-3 text-white">
                    <p className="text-xs font-medium opacity-90 flex items-center gap-1 mb-1"><MapIcon size={12} /> {place.area}</p>
                    <h3 className="text-lg font-bold">{place.name}</h3>
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-3">
                    <Badge color={categoryColors[place.category]}>{place.category}</Badge>
                    <div className="flex items-center text-xs font-medium text-yellow-600 bg-yellow-50 px-2 py-1 rounded-md border border-yellow-100">⭐ {place.rating}</div>
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2 mb-4 flex-1"><span className="font-medium text-gray-900">Địa chỉ:</span> {place.address}</p>
                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                    <div className="text-xs text-gray-500">Đăng bởi <span className="font-medium text-gray-700">{place.proposer.name}</span></div>
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1 hover:underline">Chi tiết <ExternalLink size={14} /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* === MODAL DUYỆT === */}
      <Modal isOpen={isApproveModalOpen} onClose={() => setIsApproveModalOpen(false)} title="Duyệt địa điểm">
        <div className="space-y-4">
          <div className="bg-green-50 p-4 rounded-xl border border-green-100 flex gap-3">
            <Info className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-green-900">Bạn đang duyệt: <strong>{selectedPlace?.name}</strong></p>
              <p className="text-xs text-green-700 mt-1">Địa điểm sẽ xuất hiện ngay trên bản đồ uniVillage.</p>
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <button onClick={() => setIsApproveModalOpen(false)} className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50">Hủy</button>
            <button onClick={handleConfirmApprove} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2">
              <Check size={16} strokeWidth={2.5} /> Xác nhận duyệt
            </button>
          </div>
        </div>
      </Modal>

      {/* === MODAL TỪ CHỐI === */}
      <Modal isOpen={isRejectModalOpen} onClose={() => setIsRejectModalOpen(false)} title="Từ chối đề xuất">
        <div className="space-y-4">
          <div className="bg-red-50 p-4 rounded-xl border border-red-100 flex gap-3">
            <Info className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-red-900">Bạn đang từ chối: {selectedPlace?.name}</p>
              <p className="text-xs text-red-700 mt-1">Hành động này sẽ xóa khỏi danh sách chờ duyệt.</p>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Lý do từ chối <span className="text-red-500">*</span></label>
            <textarea rows={4} value={rejectReason} onChange={(e) => setRejectReason(e.target.value)}
              className="w-full border border-gray-300 rounded-xl p-3 text-sm focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none"
              placeholder="Thông tin không chính xác, hình ảnh mờ, trùng lặp..."
            />
          </div>
          <div className="flex justify-end gap-3">
            <button onClick={() => setIsRejectModalOpen(false)} className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50">Hủy</button>
            <button disabled={!rejectReason.trim()} onClick={handleConfirmReject} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 flex items-center gap-2">
              <X size={16} strokeWidth={2.5} /> Xác nhận từ chối
            </button>
          </div>
        </div>
      </Modal>

      {/* === MODAL THÊM MỚI === */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Thêm địa điểm mới">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tên địa điểm <span className="text-red-500">*</span></label>
            <input type="text" value={newPlaceData.name} onChange={(e) => setNewPlaceData({...newPlaceData, name: e.target.value})}
              className="w-full border border-gray-300 rounded-xl p-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="VD: Khu du lịch Suối Tiên" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Loại hình</label>
              <select value={newPlaceData.category} onChange={(e) => setNewPlaceData({...newPlaceData, category: e.target.value as any})}
                className="w-full border border-gray-300 rounded-xl p-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none">
                <option>Ăn uống</option><option>Tham quan</option><option>Tiện ích</option><option>Cà phê</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Khu vực</label>
              <select value={newPlaceData.area} onChange={(e) => setNewPlaceData({...newPlaceData, area: e.target.value})}
                className="w-full border border-gray-300 rounded-xl p-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none">
                <option>Làng Đại học</option><option>Khu A</option><option>Khu B</option><option>Trung tâm</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Địa chỉ chi tiết <span className="text-red-500">*</span></label>
            <textarea rows={2} value={newPlaceData.address} onChange={(e) => setNewPlaceData({...newPlaceData, address: e.target.value})}
              className="w-full border border-gray-300 rounded-xl p-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="Số nhà, đường..." />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Hình ảnh mô tả</label>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center text-gray-500 hover:border-blue-500 hover:bg-blue-50 transition-colors cursor-pointer">
              <ImageIcon className="w-8 h-8 mb-2" />
              <p className="text-xs">Nhấn để tải ảnh lên (Mô phỏng)</p>
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <button onClick={() => setIsAddModalOpen(false)} className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50">Hủy</button>
            <button onClick={handleAddNewPlace} disabled={!newPlaceData.name || !newPlaceData.address}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2">
              <Plus size={16} /> Lưu địa điểm
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

const ImageWithFallback = ({ src, alt, className }: { src: string, alt: string, className?: string }) => {
  const [error, setError] = useState(false);
  return (
    <img src={error ? 'https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=200&h=200&fit=crop' : src} alt={alt}
      onError={() => setError(true)} className={className} />
  );
};