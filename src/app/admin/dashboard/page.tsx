"use client";

import { useEffect, useState } from "react";
import { Briefcase, FlaskConical, Users } from "lucide-react";

export default function DashboardPage() {
  const baseURL = "https://catalog-api.humicprototyping.net/api";
  
  const [stats, setStats] = useState({
    internships: 0,
    research: 0,
    partners: 0,
  });

  const [activities, setActivities] = useState<
    { text: string; time_ago: string }[]
  >([]);

  const [loading, setLoading] = useState(true);

  const fetchWithAuth = async (
    url: string, 
    options: RequestInit = {}
  ) => {
    const token = localStorage.getItem("token");

    if (!token) throw new Error("No token");

    const res = await fetch(url, {
      ...options,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        ...(options.headers || {}),
      },
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("API ERROR:", res.status, text);
      throw new Error(`API error ${res.status}`);
    }
    return res.json();
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        // dashboard counts
        const res = await fetchWithAuth(`${baseURL}/dashboard/counts`);
        const data = res.data;

        setStats({
          internships: data.products?.["Internship Project"] ?? 0,
          research: data.products?.["Research Project"] ?? 0,
          partners: data.partners ?? 0,
        });

        // recent activity
        const activityRes = await fetchWithAuth(
          `${baseURL}/dashboard/status`
        );

        setActivities(activityRes.data ?? []);
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
    <div className="p-6 flex flex-col h-screen">
      <div className="space-y-6 shrink-0">
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
      </div>

      {/* Recent Activity */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm flex flex-col flex-1 mt-6 min-h-0">
        <div className="p-5 border-b border-gray-100">
          <h3 className="text-base font-semibold text-gray-800">
            Recent Activity
          </h3>
          <p className="text-sm text-gray-500">
            Latest updates across all catalogs
          </p>
        </div>
        <div className="divide-y divide-gray-100 flex-1 overflow-y-auto">
          {loading ? (
            <div className="p-5 text-sm text-gray-400">Loading activity...</div>
          ) : activities.length === 0 ? (
            <div className="p-5 text-sm text-gray-400">No recent activity</div>
          ) : (
            activities.map((item, idx) => (
              <div key={idx} className="p-5 flex flex-col gap-1">
                <p className="text-sm text-gray-700">{item.text}</p>
                <span className="text-xs text-gray-400">{item.time_ago}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}