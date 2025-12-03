"use client";

import { useEffect, useState } from "react";
import { Briefcase, FlaskConical, Users } from "lucide-react";

export default function DashboardPage() {
  const [stats, setStats] = useState({
    internships: 0,
    research: 0,
    partners: 0,
  });

  const [loading, setLoading] = useState(true);

  const fetchWithAuth = async (url: string) => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    if (!token) throw new Error("No token");

    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) {
      throw new Error("API error");
    }

    return res.json();
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const [internshipRes, researchRes, partnersRes] = await Promise.all([
          fetchWithAuth(
            "https://catalog-api.humicprototyping.net/api/admin/products?type=internship"
          ),
          fetchWithAuth(
            "https://catalog-api.humicprototyping.net/api/admin/products?type=research"
          ),
          fetchWithAuth(
            "https://catalog-api.humicprototyping.net/api/admin/partners"
          ),
        ]);

        setStats({
          internships: internshipRes.data?.length ?? 0,
          research: researchRes.data?.length ?? 0,
          partners: partnersRes.data?.length ?? 0,
        });
      } catch (err) {
        console.error("Failed loading dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const cards = [
    {
      title: "Total Internships",
      value: stats.internships,
      icon: <Briefcase className="w-5 h-5 text-red-700" />,
    },
    {
      title: "Total Researchs",
      value: stats.research,
      icon: <FlaskConical className="w-5 h-5 text-red-700" />,
    },
    {
      title: "Total Partners",
      value: stats.partners,
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
        {loading
          ? [...Array(3)].map((_, i) => (
              <div
                key={i}
                className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm animate-pulse"
              >
                <div className="h-5 bg-gray-200 w-24 rounded"></div>
                <div className="h-8 bg-gray-300 w-16 rounded mt-4"></div>
              </div>
            ))
          : cards.map((item, idx) => (
              <div
                key={idx}
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