"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, Edit2, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useLanguage } from "@/lib/language-context";
import { API_BASE_URL } from "@/lib/api";
import { useFetchUserProfile } from "@/lib/hooks/useFetchUserProfile";
import { AddressModal } from "./modals/address-modal";

interface AddressData {
  id: number;
  label?: string;
  street: string;
  city: string;
  state?: string;
  postalCode: string;
  country: string;
  isPrimary: boolean;
}

interface AddressesProps {
  onRefresh?: () => void;
}

export function Addresses({ onRefresh }: AddressesProps) {
  const { t } = useLanguage();
  const { userProfile, isLoading } = useFetchUserProfile();
  const [addresses, setAddresses] = useState<AddressData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<AddressData | null>(
    null
  );
  const [isDeletingId, setIsDeletingId] = useState<number | null>(null);

  useEffect(() => {
    if (userProfile?.addresses) {
      setAddresses(userProfile.addresses);
    }
  }, [userProfile]);

  const handleAddClick = () => {
    setSelectedAddress(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (address: AddressData) => {
    setSelectedAddress(address);
    setIsModalOpen(true);
  };

  const handleDeleteClick = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this address?")) {
      return;
    }

    setIsDeletingId(id);
    try {
      const token = localStorage.getItem("access_token");

      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await fetch(`${API_BASE_URL}/user/addresses/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete address");
      }

      setAddresses((prev) => prev.filter((addr) => addr.id !== id));
      toast.success("Address deleted successfully");
      onRefresh?.();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "An error occurred"
      );
    } finally {
      setIsDeletingId(null);
    }
  };

  const handleModalSuccess = () => {
    setIsModalOpen(false);
    setSelectedAddress(null);
    onRefresh?.();
  };

  if (isLoading) {
    return (
      <div className="bg-neutral-900 rounded-lg shadow-sm p-8 border border-neutral-700">
        <h2 className="text-2xl font-semibold text-white mb-6">
          {t.profile.addresses.title}
        </h2>
        <p className="text-neutral-400">Loading...</p>
      </div>
    );
  }

  const maxAddressesReached = addresses.length >= 3;

  return (
    <>
      <div className="bg-neutral-900 rounded-lg shadow-sm p-8 border border-neutral-700">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-white">
            {t.profile.addresses.title}
          </h2>
          {!maxAddressesReached && (
            <Button
              onClick={handleAddClick}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
            >
              <Plus size={16} />
              {t.profile.addresses.addNew || "Add Address"}
            </Button>
          )}
        </div>

        {addresses.length === 0 ? (
          <div className="text-center py-12 border border-dashed border-neutral-700 rounded-lg bg-neutral-800">
            <p className="text-neutral-400 text-base">
              {t.profile.addresses.noAddresses || "No addresses yet"}
            </p>
            {!maxAddressesReached && (
              <Button
                onClick={handleAddClick}
                variant="outline"
                className="mt-4"
              >
                <Plus size={16} className="mr-2" />
                Add your first address
              </Button>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {addresses.map((address) => (
              <div
                key={address.id}
                className="border border-neutral-700 p-6 rounded-lg bg-neutral-800 hover:border-neutral-600 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-white">
                        {address.label || "Address"}
                      </h3>
                      {address.isPrimary && (
                        <span className="text-xs bg-blue-100 text-blue-900 px-2 py-1 rounded">
                          Primary
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-neutral-300 mb-1">
                      {address.street}
                    </p>
                    <p className="text-sm text-neutral-300">
                      {address.city}
                      {address.state ? `, ${address.state}` : ""}
                      {address.postalCode ? `, ${address.postalCode}` : ""}
                    </p>
                    <p className="text-sm text-neutral-400">
                      {address.country}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => handleEditClick(address)}
                      className="p-2 hover:bg-neutral-700 rounded transition-colors cursor-pointer text-neutral-300 hover:text-white"
                      title="Edit"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteClick(address.id)}
                      disabled={isDeletingId === address.id}
                      className="p-2 hover:bg-neutral-700 rounded transition-colors cursor-pointer text-red-400 hover:text-red-500 disabled:opacity-50"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {maxAddressesReached && addresses.length > 0 && (
          <div className="mt-4 p-4 bg-amber-900/20 border border-amber-700/50 rounded-lg">
            <p className="text-sm text-amber-200">
              Maximum 3 addresses allowed. Delete one to add another.
            </p>
          </div>
        )}
      </div>

      {/* Address Modal */}
      <AddressModal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        initialData={
          selectedAddress
            ? {
                id: selectedAddress.id,
                label: selectedAddress.label,
                street: selectedAddress.street,
                city: selectedAddress.city,
                state: selectedAddress.state,
                postalCode: selectedAddress.postalCode,
                country: selectedAddress.country,
                isPrimary: selectedAddress.isPrimary,
              }
            : undefined
        }
        onSuccess={handleModalSuccess}
      />
    </>
  );
}
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
