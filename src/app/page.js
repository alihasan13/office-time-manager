"use client"
import React from "react";
import DaySlider from "./components/DaySlider";
import Card from "./components/Card";

export default function Home() {
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Office Working Hours
      </h1>
      <div className="space-y-6">
        {days.map((day) => (
          <Card key={day} >
            <DaySlider day={day} />
          </Card>
        ))}
      </div>
    </div>
  );
}
