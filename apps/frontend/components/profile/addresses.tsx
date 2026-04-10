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
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <Input
        placeholder={placeholder}
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        className={error ? "border-red-500" : ""}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow-sm p-8 border border-gray-200">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">Địa chỉ</h2>
        {!isFormVisible && (
          <Button onClick={() => setIsFormVisible(true)} className="gap-2">
            <Plus size={16} />
            Thêm địa chỉ
          </Button>
        )}
      </div>

      {isFormVisible && (
        <Card className="mb-6 border border-gray-200 bg-white p-6">
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
              <Button type="submit">Lưu địa chỉ</Button>
              <Button
                type="button"
                variant="outline"
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
              </Button>
            </div>
          </form>
        </Card>
      )}

      {displayAddresses.length === 0 ? (
        <div className="text-center py-12 border border-dashed border-gray-300 rounded-lg bg-gray-50">
          <p className="text-gray-500 text-base">Chưa có địa chỉ nào</p>
        </div>
      ) : (
        <div className="space-y-4">
          {displayAddresses.map((address) => (
            <Card
              key={address.id}
              className={`border p-6 ${address.isDefault ? "border-blue-500 bg-blue-50" : "border-gray-200 bg-white"}`}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-gray-900">
                      {address.name}
                    </h3>
                    {address.isDefault && (
                      <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
                        Mặc định
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{address.phone}</p>
                  <p className="text-sm text-gray-600">{address.address}</p>
                  <p className="text-sm text-gray-600">
                    {address.ward}, {address.district}, {address.city}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button type="button" variant="ghost" size="icon">
                    <Edit size={16} />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() =>
                      onDeleteAddress && onDeleteAddress(address.id)
                    }
                  >
                    <Trash2 size={16} className="text-red-600" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
