"use client";
import { useState } from "react";
import Chat from "./components/Chat";
import Dashboard from "./components/Dashboard";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"chat" | "dashboard">("chat");

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-white/10 px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg" />
          <span className="text-xl font-bold tracking-tight">Velora</span>
          <span className="text-xs text-white/40 ml-2">AI Beauty Agent</span>
        </div>
        <nav className="flex gap-1 bg-white/5 rounded-lg p-1">
          <button
            onClick={() => setActiveTab("chat")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              activeTab === "chat"
                ? "bg-white text-black"
                : "text-white/60 hover:text-white"
            }`}
          >
            AI Agent
          </button>
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              activeTab === "dashboard"
                ? "bg-white text-black"
                : "text-white/60 hover:text-white"
            }`}
          >
            Dashboard
          </button>
        </nav>
      </header>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-8 py-8">
        {activeTab === "chat" ? <Chat /> : <Dashboard />}
      </div>
    </main>
  );
}