"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface PasswordInputProps {
  id: string;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function PasswordInput({
  id,
  placeholder,
  disabled = false,
  error,
  value,
  onChange,
  className,
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col gap-2">
      <div className="relative">
        <Input
          id={id}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          disabled={disabled}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          disabled={disabled}
          className="absolute right-3 top-3.5"
        >
          {showPassword ? (
            <EyeOff size={16} className="text-gray-400" />
          ) : (
            <Eye size={16} className="text-gray-400" />
          )}
        </button>
      </div>
      {error && <p className="text-red-600 text-xs">{error}</p>}
    </div>
  );
}
