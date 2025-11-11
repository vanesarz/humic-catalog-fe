"use client";

import { Briefcase, FlaskConical, Users } from "lucide-react";

export default function DashboardPage() {
  const stats = [
    {
      title: "Total Internships",
      value: 3,
      icon: <Briefcase className="w-5 h-5 text-red-700" />,
    },
    {
      title: "Total Research",
      value: 3,
      icon: <FlaskConical className="w-5 h-5 text-red-700" />,
    },
    {
      title: "Total Partners",
      value: 4,
      icon: <Users className="w-5 h-5 text-red-700" />,
    },
  ];

  return (
    <div className="p-6 space-y-6 flex flex-col">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500">
        <span className="font-medium">Admin Panel</span> &gt;{" "}
        <span className="text-gray-700 font-semibold">Dashboard</span>
      </div>

      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
        <p className="text-sm text-gray-500">
          Overview of your catalog management system
        </p>
      </div>

      {/* Statistic Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((item, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-700">
                {item.title}
              </h3>
              {item.icon}
            </div>
            <p className="text-2xl font-bold text-gray-800 mt-3">
              {item.value}
            </p>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
        <div className="p-5 border-b border-gray-100">
          <h3 className="text-base font-semibold text-gray-800">
            Recent Activity
          </h3>
          <p className="text-sm text-gray-500">
            Latest updates across all catalogs
          </p>
        </div>
        <div className="h-40 flex items-center justify-center text-sm text-gray-400">
          <p>No recent activity</p>
        </div>
      </div>
    </div>
  );
}