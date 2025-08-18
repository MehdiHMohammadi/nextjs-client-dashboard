'use client';
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { useState, useEffect } from 'react';
import Head from 'next/head';

// تعریف نوع برای شرکت حقوقی
interface LawFirm {
  name: string;
  specialization: string;
  location: string;
  languages: string;
  size: string;
  website?: string;
  email?: string;
  phone?: string;
  experience?: string;
  googleReviews?: string;
  legal500: boolean;
}

// تعریف نوع برای فیلترها
interface Filters {
  name: string;
  specialization: string;
  language: string;
  size: string;
}

export default function FileFlow() {
  const [lawFirms, setLawFirms] = useState<LawFirm[]>([]);
  const [filteredFirms, setFilteredFirms] = useState<LawFirm[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filters, setFilters] = useState<Filters>({
    name: '',
    specialization: '',
    language: '',
    size: '',
  });
  // حالت‌های جدید برای صفحه‌بندی
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10); // پیش‌فرض 10 رکورد در هر صفحه

// حالت برای مودال
const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
const [newFirm, setNewFirm] = useState<LawFirm>({
  name: '',
  specialization: '',
  location: '',
  languages: '',
  size: '',
  website: '',
  email: '',
  phone: '',
  experience: '',
  googleReviews: '',
  legal500: false,
});

useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch('/api/lawfirms');
      const data: LawFirm[] = await response.json();
      setLawFirms(data);
      setFilteredFirms(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data from API:', error);
      setLoading(false);
    }
  };
  fetchData();
}, []);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value
    }));
    setCurrentPage(1); // بازگشت به صفحه اول هنگام تغییر فیلتر
  };

  useEffect(() => {
    const filterLawFirms = () => {
      let filtered: LawFirm[] = [...lawFirms];
      if (filters.name) {
        filtered = filtered.filter(firm => 
          firm.name.toLowerCase().includes(filters.name.toLowerCase())
        );
      }
      if (filters.specialization) {
        filtered = filtered.filter(firm => 
          firm.specialization.toLowerCase().includes(filters.specialization.toLowerCase())
        );
      }
      if (filters.language) {
        filtered = filtered.filter(firm => 
          firm.languages.toLowerCase().includes(filters.language.toLowerCase())
        );
      }
      if (filters.size) {
        filtered = filtered.filter(firm => 
          firm.size.toLowerCase().includes(filters.size.toLowerCase())
        );
      }
      setFilteredFirms(filtered);
    };
    filterLawFirms();
  }, [filters, lawFirms]);

  // محاسبه تعداد کل صفحات
  const totalPages = Math.ceil(filteredFirms.length / itemsPerPage);

  // برش داده‌ها برای صفحه فعلی
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentFirms = filteredFirms.slice(indexOfFirstItem, indexOfLastItem);

  // تغییر تعداد رکوردها در هر صفحه
  const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // بازگشت به صفحه اول هنگام تغییر تعداد رکوردها
  };

  // تغییر صفحه
  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };
// مدیریت تغییرات فرم مودال
const handleNewFirmChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
  const { name, value, type } = e.target;
  setNewFirm(prev => ({
    ...prev,
    [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
  }));
};

// ارسال فرم و اضافه کردن شرکت جدید
const handleAddFirm = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    const response = await fetch('/api/lawfirms', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newFirm),
    });
    if (response.ok) {
      const updatedFirms = await response.json();
      setLawFirms(updatedFirms);
      setFilteredFirms(updatedFirms);
      setNewFirm({
        name: '',
        specialization: '',
        location: '',
        languages: '',
        size: '',
        website: '',
        email: '',
        phone: '',
        experience: '',
        googleReviews: '',
        legal500: false,
      });
      setIsModalOpen(false);
    } else {
      console.error('Error adding firm:', response.statusText);
    }
  } catch (error) {
    console.error('Error sending data to API:', error);
  }
};

  return (
    <div>
      <Breadcrumb pageName="شرکت‌های حقوقی دبی" />
{/* دکمه برای باز کردن مودال */}
<div className="mb-4">
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          اضافه کردن شرکت جدید
        </button>
      </div>

      {/* مودال */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">اضافه کردن شرکت حقوقی</h2>
            <form onSubmit={handleAddFirm}>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="نام شرکت"
                  value={newFirm.name}
                  onChange={handleNewFirmChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
                <input
                  type="text"
                  name="specialization"
                  placeholder="تخصص"
                  value={newFirm.specialization}
                  onChange={handleNewFirmChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
                <input
                  type="text"
                  name="location"
                  placeholder="مکان"
                  value={newFirm.location}
                  onChange={handleNewFirmChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
                <input
                  type="text"
                  name="languages"
                  placeholder="زبان‌ها"
                  value={newFirm.languages}
                  onChange={handleNewFirmChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
                <select
                  name="size"
                  value={newFirm.size}
                  onChange={handleNewFirmChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                >
                  <option value="">انتخاب اندازه</option>
                  <option value="Small">کوچک</option>
                  <option value="Medium">متوسط</option>
                  <option value="Large">بزرگ</option>
                </select>
                <input
                  type="text"
                  name="website"
                  placeholder="وب‌سایت (اختیاری)"
                  value={newFirm.website}
                  onChange={handleNewFirmChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="ایمیل (اختیاری)"
                  value={newFirm.email}
                  onChange={handleNewFirmChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
                <input
                  type="text"
                  name="phone"
                  placeholder="تلفن (اختیاری)"
                  value={newFirm.phone}
                  onChange={handleNewFirmChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
                <input
                  type="text"
                  name="experience"
                  placeholder="سال‌های تجربه (اختیاری)"
                  value={newFirm.experience}
                  onChange={handleNewFirmChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
                <input
                  type="text"
                  name="googleReviews"
                  placeholder="نظرات گوگل (اختیاری)"
                  value={newFirm.googleReviews}
                  onChange={handleNewFirmChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="legal500"
                    checked={newFirm.legal500}
                    onChange={handleNewFirmChange}
                    className="mr-2"
                  />
                  <label htmlFor="legal500" className="text-sm text-gray-700">Legal 500</label>
                </div>
              </div>
              <div className="mt-6 flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                >
                  لغو
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  اضافه کردن
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">فیلترها</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* فیلترها بدون تغییر */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">نام شرکت</label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="جستجو بر اساس نام"
              value={filters.name}
              onChange={handleFilterChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoComplete="organization"
            />
          </div>
          <div>
      <label htmlFor="specialization" className="block text-sm font-medium text-gray-700 mb-1">تخصص</label>
      <input
        id="specialization"
        type="text"
        name="specialization"
        placeholder="جستجو بر اساس تخصص"
        value={filters.specialization}
        onChange={handleFilterChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
    <div>
      <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-1">زبان</label>
      <input
        id="language"
        type="text"
        name="language"
        placeholder="جستجو بر اساس زبان"
        value={filters.language}
        onChange={handleFilterChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
    <div>
      <label htmlFor="size" className="block text-sm font-medium text-gray-700 mb-1">اندازه شرکت</label>
      <select
        id="size"
        name="size"
        value={filters.size}
        onChange={handleFilterChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">همه اندازه‌ها</option>
        <option value="Small">کوچک</option>
        <option value="Medium">متوسط</option>
        <option value="Large">بزرگ</option>
      </select>
    </div>
        </div>
      </div>


      <div className="grid grid-cols-1 gap-9 sm:grid-cols-1">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  {/* سرستون‌ها بدون تغییر */}
                  <tr>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ردیف
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider min-w-75">
                      نام
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider min-w-96">
                      تخصص(ها)
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider min-w-80">
                      مکان
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider min-w-75">
                      زبان‌ها
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider min-w-52">
                      اندازه
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider min-w-52">
                      وب‌سایت
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider min-w-52">
                      ایمیل
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider min-w-52">
                      تلفن
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      سال‌های تجربه
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      نظرات گوگل
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Legal 500
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentFirms.length > 0 ? (
                    currentFirms.map((firm, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                          {indexOfFirstItem + index + 1} {/* شماره ردیف بر اساس صفحه */}
                        </td>
                        <td className="px-6 py-4  text-sm font-medium text-gray-900">
                          {firm.name}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {firm.specialization}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {firm.location}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {firm.languages}
                        </td>
                        <td className="px-6 py-4  text-sm text-gray-500">
                          {firm.size}
                        </td>
                        <td className="px-6 py-4  text-sm text-gray-500">
                          {firm.website && (
                            <a href={firm.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                              {firm.website}
                            </a>
                          )}
                        </td>
                        <td className="px-6 py-4  text-sm text-gray-500">
                          {firm.email}
                        </td>
                        <td className="px-6 py-4  text-sm text-gray-500">
                          {firm.phone}
                        </td>
                        <td className="px-6 py-4  text-sm text-gray-500">
                          {firm.experience}
                        </td>
                        <td className="px-6 py-4  text-sm text-gray-500">
                          {firm.googleReviews}
                        </td>
                        <td className="px-6 py-4  text-sm text-gray-500">
                          {firm.legal500 ? 
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              بله
                            </span> : 
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                              خیر
                            </span>
                          }
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={11} className="px-6 py-4 text-right  text-lg text-gray-700">
                        هیچ نتیجه‌ای یافت نشد.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* کنترل‌های ناوبری */}
            <div className="flex justify-between items-center p-4">
              <button
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-300"
              >
                صفحه قبل
              </button>
              <span className="text-sm text-gray-700">
                صفحه {currentPage} از {totalPages}
              </span>
              <button
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-300"
              >
                صفحه بعد
              </button>
            </div>

      {/* انتخاب تعداد رکوردها در هر صفحه */}
      <div className="mb-4">
        <label htmlFor="itemsPerPage" className="text-sm font-medium text-gray-700 mr-2">تعداد رکوردها در هر صفحه:</label>
        <select
          id="itemsPerPage"
          value={itemsPerPage}
          onChange={handleItemsPerPageChange}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
      </div>
          </div>
        )}
      </div>
     
    </div>
  );
}



