"use client";

import { useState } from "react";
import { Dropdown } from "antd";
import { useLanguage } from "@/lib/language-context";
import DownOutlined from "@ant-design/icons/lib/icons/DownOutlined";

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  const items = [
    {
      key: "en",
      label: "EN",
      onClick: () => setLanguage("en"),
    },
    {
      key: "vi",
      label: "VI",
      onClick: () => setLanguage("vi"),
    },
  ];

  return (
    <Dropdown menu={{ items }} placement="bottom" trigger={["click"]}>
      <button className="text-foreground text-sm font-bold hover:text-foreground/70 transition-all duration-300 ease-out flex items-center gap-1 cursor-pointer border border-foreground hover:border-foreground/70 rounded px-2 py-1 ">
        {language.toUpperCase()}
        <DownOutlined style={{ fontSize: "10px" }} />
      </button>
    </Dropdown>
  );
}
