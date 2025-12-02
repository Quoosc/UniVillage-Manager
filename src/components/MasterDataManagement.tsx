import { Plus, Pencil, Trash2, Utensils, Camera, MapPin, Coffee, ShoppingBag, Dumbbell } from 'lucide-react';
import { useState } from 'react';

interface Category {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  iconName: string;
}

const mockCategories: Category[] = [
  {
    id: 'CAT-01',
    name: 'Ăn uống',
    description: 'Các quán ăn, nhà hàng, street food',
    icon: <Utensils className="w-5 h-5 text-orange-600" />,
    iconName: 'Utensils',
  },
  {
    id: 'CAT-02',
    name: 'Tiện ích',
    description: 'ATM, siêu thị, nhà thuốc, văn phòng phẩm',
    icon: <ShoppingBag className="w-5 h-5 text-blue-600" />,
    iconName: 'ShoppingBag',
  },
  {
    id: 'CAT-03',
    name: 'Check-in',
    description: 'Các địa điểm đẹp, phù hợp chụp ảnh, giải trí',
    icon: <Camera className="w-5 h-5 text-pink-600" />,
    iconName: 'Camera',
  },
  {
    id: 'CAT-04',
    name: 'Tham quan',
    description: 'Di tích lịch sử, công viên, bảo tàng',
    icon: <MapPin className="w-5 h-5 text-green-600" />,
    iconName: 'MapPin',
  },
  {
    id: 'CAT-05',
    name: 'Cà phê',
    description: 'Quán cà phê, trà sữa, đồ uống',
    icon: <Coffee className="w-5 h-5 text-amber-700" />,
    iconName: 'Coffee',
  },
  {
    id: 'CAT-06',
    name: 'Thể thao',
    description: 'Sân thể thao, phòng gym, thể dục ngoài trời',
    icon: <Dumbbell className="w-5 h-5 text-red-600" />,
    iconName: 'Dumbbell',
  },
];

interface Area {
  id: string;
  name: string;
  description: string;
}

const mockAreas: Area[] = [
  {
    id: 'AREA-01',
    name: 'Khu A',
    description: 'Khu vực ký túc xá A, gần cổng chính',
  },
  {
    id: 'AREA-02',
    name: 'Khu B',
    description: 'Khu vực ký túc xá B, gần thư viện',
  },
  {
    id: 'AREA-03',
    name: 'Làng Đại học',
    description: 'Khu vực xung quanh trường, các dịch vụ sinh viên',
  },
  {
    id: 'AREA-04',
    name: 'Trung tâm',
    description: 'Khu vực trung tâm, giảng đường, hành chính',
  },
];

export function MasterDataManagement() {
  const [activeTab, setActiveTab] = useState<'areas' | 'categories'>('categories');

  const handleEdit = (id: string, name: string) => {
    console.log(`Editing: ${id} - ${name}`);
    // Handle edit logic here
  };

  const handleDelete = (id: string, name: string) => {
    console.log(`Deleting: ${id} - ${name}`);
    // Handle delete logic here
  };

  const handleAddNew = () => {
    console.log('Add new clicked');
    // Handle add new logic here
  };

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h1>Quản lý Danh mục</h1>
          <button
            onClick={handleAddNew}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span>Thêm mới</span>
          </button>
        </div>

        {/* Tabs - Segmented Control */}
        <div className="mb-6">
          <div className="inline-flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('areas')}
              className={`px-6 py-2 rounded-md transition-all ${
                activeTab === 'areas'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Khu vực
            </button>
            <button
              onClick={() => setActiveTab('categories')}
              className={`px-6 py-2 rounded-md transition-all ${
                activeTab === 'categories'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Loại địa điểm
            </button>
          </div>
        </div>

        {/* Place Categories View */}
        {activeTab === 'categories' && (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-gray-700 w-32">ID</th>
                  <th className="px-6 py-4 text-left text-gray-700">Tên</th>
                  <th className="px-6 py-4 text-left text-gray-700">Mô tả</th>
                  <th className="px-6 py-4 text-left text-gray-700 w-20">Icon</th>
                  <th className="px-6 py-4 text-left text-gray-700 w-32">Hành động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {mockCategories.map((category) => (
                  <tr key={category.id} className="hover:bg-gray-50 transition-colors">
                    {/* ID Column */}
                    <td className="px-6 py-4">
                      <span className="text-gray-600">{category.id}</span>
                    </td>

                    {/* Name Column */}
                    <td className="px-6 py-4">
                      <span className="text-gray-900">{category.name}</span>
                    </td>

                    {/* Description Column */}
                    <td className="px-6 py-4">
                      <span className="text-gray-500">{category.description}</span>
                    </td>

                    {/* Icon Column */}
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center w-10 h-10 bg-gray-50 rounded-lg">
                        {category.icon}
                      </div>
                    </td>

                    {/* Actions Column */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEdit(category.id, category.name)}
                          className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Chỉnh sửa"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(category.id, category.name)}
                          className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Xóa"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Areas View */}
        {activeTab === 'areas' && (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-gray-700 w-32">ID</th>
                  <th className="px-6 py-4 text-left text-gray-700">Tên</th>
                  <th className="px-6 py-4 text-left text-gray-700">Mô tả</th>
                  <th className="px-6 py-4 text-left text-gray-700 w-32">Hành động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {mockAreas.map((area) => (
                  <tr key={area.id} className="hover:bg-gray-50 transition-colors">
                    {/* ID Column */}
                    <td className="px-6 py-4">
                      <span className="text-gray-600">{area.id}</span>
                    </td>

                    {/* Name Column */}
                    <td className="px-6 py-4">
                      <span className="text-gray-900">{area.name}</span>
                    </td>

                    {/* Description Column */}
                    <td className="px-6 py-4">
                      <span className="text-gray-500">{area.description}</span>
                    </td>

                    {/* Actions Column */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEdit(area.id, area.name)}
                          className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Chỉnh sửa"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(area.id, area.name)}
                          className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Xóa"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
