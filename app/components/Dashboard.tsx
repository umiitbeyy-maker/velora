export default function Dashboard() {
  const stats = [
    { label: "Bugünkü rezervasiyalar", value: "12", change: "+3" },
    { label: "Aylıq gəlir", value: "2,840 AZN", change: "+12%" },
    { label: "Aktiv müştərilər", value: "148", change: "+8" },
    { label: "Ortalama reytinq", value: "4.9 ⭐", change: "+0.1" },
  ];

  const appointments = [
    { time: "09:00", name: "Aynur Həsənova", service: "Saç boyama", status: "confirmed" },
    { time: "10:30", name: "Leyla Məmmədova", service: "Manikür", status: "confirmed" },
    { time: "12:00", name: "Nigar Əliyeva", service: "Üz baxımı", status: "pending" },
    { time: "14:00", name: "Günel Hüseynova", service: "Saç kəsimi", status: "confirmed" },
    { time: "15:30", name: "Sevinc Rəsulova", service: "Pedikür", status: "pending" },
    { time: "17:00", name: "Rəna Quliyeva", service: "Makeup", status: "confirmed" },
  ];

  return (
    <div className="space-y-8">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-5">
            <p className="text-white/40 text-xs mb-2">{stat.label}</p>
            <p className="text-2xl font-bold text-white">{stat.value}</p>
            <p className="text-green-400 text-xs mt-1">{stat.change} bu həftə</p>
          </div>
        ))}
      </div>

      {/* Appointments */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
          📅 <span>Bugünkü Rezervasiyalar</span>
        </h2>
        <div className="space-y-3">
          {appointments.map((apt, i) => (
            <div
              key={i}
              className="flex items-center justify-between py-3 border-b border-white/5 last:border-0"
            >
              <div className="flex items-center gap-4">
                <span className="text-white/40 text-sm w-12">{apt.time}</span>
                <div>
                  <p className="text-sm font-medium text-white">{apt.name}</p>
                  <p className="text-xs text-white/40">{apt.service}</p>
                </div>
              </div>
              <span
                className={`text-xs px-3 py-1 rounded-full ${
                  apt.status === "confirmed"
                    ? "bg-green-500/20 text-green-400"
                    : "bg-yellow-500/20 text-yellow-400"
                }`}
              >
                {apt.status === "confirmed" ? "Təsdiqləndi" : "Gözləyir"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}