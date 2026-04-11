"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Plus, Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface Address {
  id: string;
  name: string;
  phone: string;
  address: string;
  city: string;
  district: string;
  ward: string;
  isDefault: boolean;
}

interface AddressesProps {
  addresses?: Address[];
  onAddAddress?: (address: Address) => void;
  onDeleteAddress?: (id: string) => void;
}

export function Addresses({
  addresses,
  onAddAddress,
  onDeleteAddress,
}: AddressesProps) {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [formErrors, setFormErrors] = useState<Partial<Address>>({});
  const [formData, setFormData] = useState<Partial<Address>>({
    name: "",
    phone: "",
    address: "",
    city: "",
    district: "",
    ward: "",
  });

  const dummyAddresses: Address[] = [
    {
      id: "1",
      name: "Nhà riêng",
      phone: "090132648",
      address: "123 Đường ABC, Phường XYZ",
      city: "TP. Hồ Chí Minh",
      district: "Quận 1",
      ward: "Phường Bến Nghé",
      isDefault: true,
    },
  ];

  const displayAddresses =
    addresses && addresses.length > 0 ? addresses : dummyAddresses;

  const validateForm = () => {
    const newErrors: Partial<Address> = {};

    if (!formData.name) {
      newErrors.name = "Vui lòng nhập tên địa chỉ";
    }

    if (!formData.phone) {
      newErrors.phone = "Vui lòng nhập số điện thoại";
    }

    if (!formData.city) {
      newErrors.city = "Vui lòng nhập thành phố/tỉnh";
    }

    if (!formData.district) {
      newErrors.district = "Vui lòng nhập quận/huyện";
    }

    if (!formData.ward) {
      newErrors.ward = "Vui lòng nhập phường/xã";
    }

    setFormErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (onAddAddress) {
      onAddAddress({
        id: Date.now().toString(),
        name: formData.name || "",
        phone: formData.phone || "",
        address: formData.address || "",
        city: formData.city || "",
        district: formData.district || "",
        ward: formData.ward || "",
        isDefault: false,
      });
    }

    setFormData({
      name: "",
      phone: "",
      address: "",
      city: "",
      district: "",
      ward: "",
    });
    setFormErrors({});
    setIsFormVisible(false);
    toast.success("Địa chỉ đã được thêm");
  };

  const FormField = ({
    label,
    name,
    value,
    onChange,
    placeholder,
    error,
  }: {
    label: string;
    name: string;
    value: string | undefined;
    onChange: (value: string) => void;
    placeholder?: string;
    error?: string;
  }) => (
    <div>
      <label className="block text-sm font-medium text-neutral-300 mb-2">
        {label}
      </label>
      <Input
        placeholder={placeholder}
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        className={`bg-neutral-800 border-neutral-700 text-white placeholder-neutral-500 ${
          error ? "border-red-500" : ""
        }`}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );

  return (
    <div className="bg-neutral-900 rounded-lg shadow-sm p-8 border border-neutral-700">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-white">Địa chỉ</h2>
        {!isFormVisible && (
          <button
            onClick={() => setIsFormVisible(true)}
            className="flex items-center gap-2 bg-amber-100 text-black px-4 py-2 rounded cursor-pointer hover:bg-amber-200"
          >
            <Plus size={16} />
            Thêm địa chỉ
          </button>
        )}
      </div>

      {isFormVisible && (
        <div className="mb-6 border border-neutral-700 bg-neutral-800 p-6 rounded-lg">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                label="Tên địa chỉ"
                name="name"
                value={formData.name}
                onChange={(value) =>
                  setFormData((prev) => ({ ...prev, name: value }))
                }
                placeholder="VD: Nhà riêng, Công ty..."
                error={formErrors.name}
              />

              <FormField
                label="Số điện thoại"
                name="phone"
                value={formData.phone}
                onChange={(value) =>
                  setFormData((prev) => ({ ...prev, phone: value }))
                }
                placeholder="090xxx"
                error={formErrors.phone}
              />

              <FormField
                label="Thành phố/Tỉnh"
                name="city"
                value={formData.city}
                onChange={(value) =>
                  setFormData((prev) => ({ ...prev, city: value }))
                }
                error={formErrors.city}
              />

              <FormField
                label="Quận/Huyện"
                name="district"
                value={formData.district}
                onChange={(value) =>
                  setFormData((prev) => ({ ...prev, district: value }))
                }
                error={formErrors.district}
              />

              <FormField
                label="Phường/Xã"
                name="ward"
                value={formData.ward}
                onChange={(value) =>
                  setFormData((prev) => ({ ...prev, ward: value }))
                }
                error={formErrors.ward}
              />

              <FormField
                label="Địa chỉ chi tiết"
                name="address"
                value={formData.address}
                onChange={(value) =>
                  setFormData((prev) => ({ ...prev, address: value }))
                }
              />
            </div>

            <div className="flex gap-2 mt-6">
              <button
                type="submit"
                className="bg-amber-100 text-black px-6 py-2 rounded cursor-pointer hover:bg-amber-200"
              >
                Lưu địa chỉ
              </button>
              <button
                type="button"
                className="border border-neutral-700 text-neutral-300 px-6 py-2 rounded hover:bg-neutral-800 cursor-pointer"
                onClick={() => {
                  setIsFormVisible(false);
                  setFormData({
                    name: "",
                    phone: "",
                    address: "",
                    city: "",
                    district: "",
                    ward: "",
                  });
                  setFormErrors({});
                }}
              >
                Hủy
              </button>
            </div>
          </form>
        </div>
      )}

      {displayAddresses.length === 0 ? (
        <div className="text-center py-12 border border-dashed border-neutral-700 rounded-lg bg-neutral-800">
          <p className="text-neutral-400 text-base">Chưa có địa chỉ nào</p>
        </div>
      ) : (
        <div className="space-y-4">
          {displayAddresses.map((address) => (
            <div
              key={address.id}
              className={`border p-6 rounded-lg ${
                address.isDefault
                  ? "border-amber-500 bg-neutral-800"
                  : "border-neutral-700 bg-neutral-800"
              }`}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-white">{address.name}</h3>
                    {address.isDefault && (
                      <span className="text-xs bg-amber-100 text-amber-900 px-2 py-1 rounded">
                        Mặc định
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-neutral-300 mb-1">
                    {address.phone}
                  </p>
                  <p className="text-sm text-neutral-300">{address.address}</p>
                  <p className="text-sm text-neutral-300">
                    {address.ward}, {address.district}, {address.city}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    className="p-2 hover:bg-neutral-700 rounded transition-colors cursor-pointer text-neutral-300"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    type="button"
                    className="p-2 hover:bg-neutral-700 rounded transition-colors cursor-pointer text-red-400 hover:text-red-500"
                    onClick={() =>
                      onDeleteAddress && onDeleteAddress(address.id)
                    }
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
