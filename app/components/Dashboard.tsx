"use client";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function Dashboard() {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchAppointments(); }, []);

  const fetchAppointments = async () => {
    const { data } = await supabase.from("appointments").select("*").order("created_at", { ascending: false });
    setAppointments(data || []);
    setLoading(false);
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
          <p className="text-white/40 text-xs mb-2">Umumi rezervasiyalar</p>
          <p className="text-2xl font-bold">{appointments.length}</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
          <p className="text-white/40 text-xs mb-2">Gozleyenler</p>
          <p className="text-2xl font-bold">{appointments.filter(a => a.status === "pending").length}</p>
        </div>
      </div>
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">Rezervasiyalar</h2>
          <button onClick={fetchAppointments} className="text-xs text-white/40 hover:text-white">Yenile</button>
        </div>
        {loading ? <p className="text-white/40">Yuklenilir...</p> : appointments.length === 0 ? <p className="text-white/40">Rezervasiya yoxdur</p> : (
          <div className="space-y-3">
            {appointments.map((apt) => (
              <div key={apt.id} className="flex items-center justify-between py-3 border-b border-white/5">
                <div>
                  <p className="text-sm font-medium">{apt.customer_name}</p>
                  <p className="text-xs text-white/40">{apt.service} - {apt.date} - {apt.time}</p>
                </div>
                <span className="text-xs px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-400">{apt.status}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
