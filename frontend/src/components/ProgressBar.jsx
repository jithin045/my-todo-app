
"use client";

export default function ProgressBar({ progress }) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm mb-8">

      <div className="flex justify-between items-center mb-3">

        <div>
          <h3 className="font-semibold text-gray-700">
            Overall Progress
          </h3>

          <p className="text-xs text-gray-400 mt-1">
            Track your productivity
          </p>
        </div>

        <span className="font-bold text-indigo-600 text-lg">
          {progress}%
        </span>

      </div>

      <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">

        <div
          className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />

      </div>

    </div>
  );
}
