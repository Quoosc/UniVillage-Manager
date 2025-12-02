import {
  Plus, Pencil, Trash2, Utensils, Camera, MapPin, Coffee,
  ShoppingBag, Dumbbell, Building2, X, Save, AlertCircle
} from 'lucide-react';
import { useState } from 'react';

interface Category {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  iconName: string;
}

interface Area {
  id: string;
  name: string;
  description: string;
}

const iconOptions = [
  { name: 'Utensils', Icon: Utensils, color: 'text-orange-600' },
  { name: 'ShoppingBag', Icon: ShoppingBag, color: 'text-blue-600' },
  { name: 'Camera', Icon: Camera, color: 'text-pink-600' },
  { name: 'MapPin', Icon: MapPin, color: 'text-green-600' },
  { name: 'Coffee', Icon: Coffee, color: 'text-amber-700' },
  { name: 'Dumbbell', Icon: Dumbbell, color: 'text-red-600' },
  { name: 'Building2', Icon: Building2, color: 'text-purple-600' },
] as const;

const iconMap = { Utensils, ShoppingBag, Camera, MapPin, Coffee, Dumbbell, Building2 } as const;

const initialCategories: Category[] = [
  { id: 'CAT-01', name: 'Ăn uống', description: 'Các quán ăn, nhà hàng, street food', icon: <Utensils className="w-5 h-5 text-orange-600" />, iconName: 'Utensils' },
  { id: 'CAT-02', name: 'Tiện ích', description: 'ATM, siêu thị, nhà thuốc, văn phòng phẩm', icon: <ShoppingBag className="w-5 h-5 text-blue-600" />, iconName: 'ShoppingBag' },
  { id: 'CAT-03', name: 'Check-in', description: 'Các địa điểm đẹp, phù hợp chụp ảnh, giải trí', icon: <Camera className="w-5 h-5 text-pink-600" />, iconName: 'Camera' },
  { id: 'CAT-04', name: 'Tham quan', description: 'Di tích lịch sử, công viên, bảo tàng', icon: <MapPin className="w-5 h-5 text-green-600" />, iconName: 'MapPin' },
  { id: 'CAT-05', name: 'Cà phê', description: 'Quán cà phê, trà sữa, đồ uống', icon: <Coffee className="w-5 h-5 text-amber-700" />, iconName: 'Coffee' },
  { id: 'CAT-06', name: 'Thể thao', description: 'Sân thể thao, phòng gym, thể dục ngoài trời', icon: <Dumbbell className="w-5 h-5 text-red-600" />, iconName: 'Dumbbell' },
];

const initialAreas: Area[] = [
  { id: 'AREA-01', name: 'Khu A', description: 'Khu vực ký túc xá A, gần cổng chính' },
  { id: 'AREA-02', name: 'Khu B', description: 'Khu vực ký túc xá B, gần thư viện' },
  { id: 'AREA-03', name: 'Làng Đại học', description: 'Khu vực xung quanh trường, các dịch vụ sinh viên' },
  { id: 'AREA-04', name: 'Trung tâm', description: 'Khu vực trung tâm, giảng đường, hành chính' },
];

// Modal giống hệt hình
const Modal = ({ isOpen, onClose, title, children }: any) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 bg-gray-50 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={20} />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

export function MasterDataManagement() {
  const [activeTab, setActiveTab] = useState<'areas' | 'categories'>('categories');
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [areas, setAreas] = useState<Area[]>(initialAreas);

  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isAreaModalOpen, setIsAreaModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [deletingItem, setDeletingItem] = useState<any>(null);

  const [formData, setFormData] = useState({ name: '', description: '', iconName: 'Utensils' });

  const handleOpenCategoryModal = (item?: Category) => {
    if (item) {
      setEditingItem(item);
      setFormData({ name: item.name, description: item.description, iconName: item.iconName });
    } else {
      setEditingItem(null);
      setFormData({ name: '', description: '', iconName: 'Utensils' });
    }
    setIsCategoryModalOpen(true);
  };

  const handleOpenAreaModal = (item?: Area) => {
    if (item) {
      setEditingItem(item);
      setFormData({ name: item.name, description: item.description, iconName: '' });
    } else {
      setEditingItem(null);
      setFormData({ name: '', description: '', iconName: '' });
    }
    setIsAreaModalOpen(true);
  };

  const handleSaveCategory = () => {
    if (!formData.name.trim()) return;
    const iconInfo = iconOptions.find(i => i.name === formData.iconName)!;
    const IconComponent = iconMap[formData.iconName as keyof typeof iconMap];
    const newCategory: Category = {
      id: editingItem?.id || `CAT-${String(categories.length + 1).padStart(2, '0')}`,
      name: formData.name,
      description: formData.description,
      icon: <IconComponent className={`w-5 h-5 ${iconInfo.color}`} />,
      iconName: formData.iconName,
    };

    if (editingItem) {
      setCategories(prev => prev.map(c => c.id === editingItem.id ? newCategory : c));
    } else {
      setCategories(prev => [...prev, newCategory]);
    }
    setIsCategoryModalOpen(false);
    setEditingItem(null);
  };

  const handleSaveArea = () => {
    if (!formData.name.trim()) return;
    const newArea: Area = {
      id: editingItem?.id || `AREA-${String(areas.length + 1).padStart(2, '0')}`,
      name: formData.name,
      description: formData.description,
    };
    if (editingItem) {
      setAreas(prev => prev.map(a => a.id === editingItem.id ? newArea : a));
    } else {
      setAreas(prev => [...prev, newArea]);
    }
    setIsAreaModalOpen(false);
    setEditingItem(null);
  };

  const handleDelete = () => {
    if (!deletingItem) return;
    if (activeTab === 'categories') {
      setCategories(prev => prev.filter(c => c.id !== deletingItem.id));
    } else {
      setAreas(prev => prev.filter(a => a.id !== deletingItem.id));
    }
    setIsDeleteModalOpen(false);
    setDeletingItem(null);
  };

  const currentData = activeTab === 'categories' ? categories : areas;

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Header + Button */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Quản lý Danh mục & Khu vực</h1>
            <p className="text-sm text-gray-500 mt-1">Cấu hình loại địa điểm và phân vùng trên bản đồ</p>
          </div>
          <button
            onClick={() => activeTab === 'categories' ? handleOpenCategoryModal() : handleOpenAreaModal()}
            className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-sm"
          >
            <Plus className="w-5 h-5" />
            Thêm mới
          </button>
        </div>

        {/* Tabs giống hệt hình */}
        <div className="flex gap-4">
          <button
            onClick={() => setActiveTab('categories')}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${activeTab === 'categories' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
          >
            Loại địa điểm ({categories.length})
          </button>
          <button
            onClick={() => setActiveTab('areas')}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${activeTab === 'areas' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
          >
            Khu vực ({areas.length})
          </button>
        </div>

        {/* Table giống hệt hình */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">ID</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Tên</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Mô tả</th>
                {activeTab === 'categories' && <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Icon</th>}
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {currentData.map((item: any) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <span className="font-mono text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">{item.id}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-semibold text-gray-900">{item.name}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600">{item.description}</span>
                  </td>
                  {activeTab === 'categories' && (
                    <td className="px-6 py-4 text-center">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        {item.icon}
                      </div>
                    </td>
                  )}
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <button
                        onClick={() => activeTab === 'categories' ? handleOpenCategoryModal(item) : handleOpenAreaModal(item)}
                        className="text-blue-600 hover:text-blue-800"
                        title="Chỉnh sửa"
                      >
                        <Pencil className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => { setDeletingItem(item); setIsDeleteModalOpen(true); }}
                        className="text-red-600 hover:text-red-800"
                        title="Xóa"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
<Modal 
  isOpen={isCategoryModalOpen} 
  onClose={() => setIsCategoryModalOpen(false)} 
  title={editingItem ? "Chỉnh sửa danh mục" : "Thêm danh mục mới"}
>
  <div className="space-y-6">
    {/* Tên danh mục */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Tên danh mục <span className="text-red-500">*</span>
      </label>
      <input
        type="text"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
        placeholder="VD: Ăn uống"
      />
    </div>

    {/* Mô tả */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Mô tả</label>
      <textarea
        rows={3}
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none"
        placeholder="Mô tả ngắn về danh mục này..."
      />
    </div>

    {/* CHỌN ICON – Gọn và đồng bộ */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-3">Chọn icon</label>
      <div className="grid grid-cols-4 gap-3">
        {iconOptions.map((opt) => {
          const Icon = opt.Icon;
          const active = formData.iconName === opt.name;
          return (
            <button
              key={opt.name}
              onClick={() => setFormData({ ...formData, iconName: opt.name })}
              className={`flex flex-col items-center justify-center gap-2 px-3 py-3 rounded-xl border transition-all min-h-[76px]
                ${active ? 'border-blue-500 bg-blue-50 ring-1 ring-blue-500/20 shadow-sm' : 'border-gray-200 bg-white hover:border-gray-300'}`}
            >
              {/* Use explicit size to avoid any inherited text size overriding SVG */}
              <Icon size={24} className={opt.color} />
              <span className="text-[11px] leading-4 text-gray-700 font-medium truncate w-full text-center">{opt.name}</span>
            </button>
          );
        })}
      </div>
    </div>

    {/* Nút Hủy + Thêm/Cập nhật */}
    <div className="flex justify-end gap-3 pt-4">
      <button
        onClick={() => setIsCategoryModalOpen(false)}
        className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition"
      >
        Hủy
      </button>
      <button
        onClick={handleSaveCategory}
        className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition shadow-sm"
      >
        <Save className="w-4 h-4" />
        {editingItem ? 'Cập nhật' : 'Thêm mới'}
      </button>
    </div>
  </div>
</Modal>

      <Modal isOpen={isAreaModalOpen} onClose={() => setIsAreaModalOpen(false)} title={editingItem ? "Chỉnh sửa khu vực" : "Thêm khu vực mới"}>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tên khu vực *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="VD: Khu A"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Mô tả</label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
              placeholder="Mô tả khu vực này..."
            />
          </div>
          <div className="flex justify-end gap-3">
            <button onClick={() => setIsAreaModalOpen(false)} className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
              Hủy
            </button>
            <button onClick={handleSaveArea} className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
              <Save className="w-4 h-4" />
              {editingItem ? 'Cập nhật' : 'Thêm mới'}
            </button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} title="Xác nhận xóa">
        <div className="space-y-6">
          <div className="flex items-start gap-4 p-4 bg-red-50 rounded-xl border border-red-200">
            <AlertCircle className="w-8 h-8 text-red-600 mt-1" />
            <div>
              <p className="font-semibold text-red-900">Bạn có chắc chắn muốn xóa?</p>
              <p className="text-sm text-red-700 mt-1">
                {deletingItem && `"${deletingItem.name}"`} sẽ bị xóa vĩnh viễn và không thể khôi phục.
              </p>
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <button onClick={() => setIsDeleteModalOpen(false)} className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
              Hủy
            </button>
            <button onClick={handleDelete} className="px-5 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700">
              Xóa vĩnh viễn
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}