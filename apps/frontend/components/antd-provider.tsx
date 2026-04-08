"use client";

import { ConfigProvider, theme } from "antd";
import type React from "react";

export function AntdProvider({ children }: { children: React.ReactNode }) {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          // Colors from global.css
          colorBgBase: "#05090c",
          colorTextBase: "#fffce1",
          colorPrimary: "#fffce1",
          colorBgContainer: "#05090c",
          colorBgElevated: "#05090c",
          colorBorder: "#fffce1",
          colorSuccess: "#52c41a",
          colorError: "#d97706", // oklch(0.577 0.245 27.325)
          colorWarning: "#faad14",
          colorInfo: "#1890ff",

          // Typography from global.css
          fontSize: 16,
          fontFamily: "'Helvetica Neue', Arial, sans-serif",
          fontFamilyCode: "'Geist Mono', monospace",

          // Border & Spacing
          borderRadius: 4, // --radius-xl: 0.5rem = 8px, using smaller baseline
          borderRadiusSM: 2, // --radius-sm: 0.125rem
          borderRadiusLG: 6, // --radius-lg: 0.375rem
          controlHeight: 40,
          margin: 16,
          marginXS: 8,
          lineHeight: 1.5,

          // Component spacing
          controlPaddingHorizontal: 16,
        },
        components: {
          Button: {
            controlHeight: 40,
            borderRadius: 4,
            primaryColor: "#fffce1",
            colorPrimary: "#fffce1",
          },
          Input: {
            controlHeight: 40,
            borderRadius: 4,
            colorBgContainer: "#05090c",
            colorBorder: "#fffce1",
            colorTextPlaceholder: "rgb(156, 163, 175)",
            colorIcon: "rgb(156, 163, 175)",
            colorIconHover: "#fffce1",
          },
          InputNumber: {
            controlHeight: 40,
            borderRadius: 4,
            colorBgContainer: "#05090c",
            colorBorder: "#fffce1",
          },
          Card: {
            borderRadius: 4,
            colorBgContainer: "#05090c",
            boxShadow: "none",
          },
          Modal: {
            borderRadius: 4,
            colorBgContainer: "#05090c",
            boxShadow: "none",
          },
          Select: {
            controlHeight: 40,
            borderRadius: 4,
            colorBgContainer: "#05090c",
            colorBorder: "#fffce1",
          },
          DatePicker: {
            controlHeight: 40,
            borderRadius: 4,
            colorBgContainer: "#05090c",
            colorBorder: "#fffce1",
          },
          Tabs: {
            colorPrimary: "#fffce1",
            colorBgContainer: "#05090c",
          },
          Popover: {
            colorBgContainer: "#05090c",
            colorBorder: "#fffce1",
            borderRadius: 4,
          },
          Dropdown: {
            colorBgContainer: "#05090c",
            colorBorder: "#fffce1",
            borderRadius: 4,
          },
          Menu: {
            colorBgContainer: "#05090c",
            colorBgElevated: "#05090c",
            colorItemBg: "#05090c",
            colorItemBgHover: "rgba(255, 252, 225, 0.1)",
            colorItemBgSelected: "rgba(255, 252, 225, 0.15)",
            colorItemBgSelectedHorizontal: "rgba(255, 252, 225, 0.1)",
            colorItemText: "rgba(255, 252, 225, 0.4)",
            colorItemTextHover: "#fffce1",
            colorItemTextSelected: "#fffce1",
            itemHeight: 32,
            itemPaddingInline: 12,
            itemBorderRadius: 4,
          },
          Form: {
            labelColor: "rgba(255, 252, 225, 0.7)",
          },
          Spin: {
            colorPrimary: "#fffce1",
          },
          Badge: {
            colorError: "#ff4d4f",
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}
