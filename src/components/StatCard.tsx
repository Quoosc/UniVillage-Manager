import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import React from "react";

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend: string;
  trendUp?: boolean; 
  color:
    | "blue"
    | "green"
    | "orange"
    | "red"
    | "purple"
    | "indigo";
}

const colorStyles = {
  blue: {
    bg: "bg-blue-50",
    text: "text-blue-600",
    ring: "group-hover:ring-blue-100",
  },
  green: {
    bg: "bg-green-50",
    text: "text-green-600",
    ring: "group-hover:ring-green-100",
  },
  orange: {
    bg: "bg-orange-50",
    text: "text-orange-600",
    ring: "group-hover:ring-orange-100",
  },
  red: {
    bg: "bg-red-50",
    text: "text-red-600",
    ring: "group-hover:ring-red-100",
  },
  purple: {
    bg: "bg-purple-50",
    text: "text-purple-600",
    ring: "group-hover:ring-purple-100",
  },
  indigo: {
    bg: "bg-indigo-50",
    text: "text-indigo-600",
    ring: "group-hover:ring-indigo-100",
  },
};

export function StatCard({
  title,
  value,
  icon,
  trend,
  trendUp,
  color,
}: StatCardProps) {
  const styles = colorStyles[color] || colorStyles.blue;

  return (
    <div className="group bg-white rounded-2xl p-6 border border-gray-100 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_16px_-4px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1">
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <p className="text-sm font-medium text-gray-500">
            {title}
          </p>
          <h3 className="text-3xl font-bold text-gray-900 tracking-tight">
            {value}
          </h3>
        </div>

        <div
          className={`p-3 rounded-xl transition-colors duration-300 ${styles.bg} ${styles.text} ring-1 ring-transparent ${styles.ring}`}
        >
          {/* Clone icon để đảm bảo size chuẩn */}
          {React.isValidElement(icon)
            ? React.cloneElement(icon as React.ReactElement, {
                size: 24,
                strokeWidth: 2.5,
              })
            : icon}
        </div>
      </div>

      <div className="mt-4 flex items-center gap-3">
        <div
          className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${
            trendUp === true
              ? "bg-green-50 text-green-700 border border-green-100"
              : trendUp === false
                ? "bg-red-50 text-red-700 border border-red-100"
                : "bg-gray-50 text-gray-600 border border-gray-100"
          }`}
        >
          {trendUp === true && <TrendingUp size={14} />}
          {trendUp === false && <TrendingDown size={14} />}
          {trendUp === undefined && <Minus size={14} />}
          <span>{trend}</span>
        </div>
        <span className="text-xs text-gray-400 font-medium">
          so với tháng trước
        </span>
      </div>
    </div>
  );
}