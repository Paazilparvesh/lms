// import React, { useState } from "react";
// import { Crown, Flame } from "lucide-react";
// import { useNavigate } from "react-router-dom"; // ✅ Add this at the top

// const topUsersData = {
//   Weekly: [
//     {
//       name: "Sarah Johnson",
//       level: 15,
//       xp: 4500,
//       avatar: "👑",
//       position: 1,
//     },
//     {
//       name: "Michael Chen",
//       level: 14,
//       xp: 4200,
//       avatar: "🧔🏾",
//       position: 2,
//     },
//     {
//       name: "Emma Wilson",
//       level: 14,
//       xp: 4000,
//       avatar: "😊",
//       position: 3,
//     },
//   ],
//   Monthly: [
//     {
//       name: "James Wilson",
//       level: 14,
//       xp: 5500,
//       avatar: "👨🏻‍⚕️",
//       position: 1,
//     },
//     {
//       name: "Maria Garcia",
//       level: 13,
//       xp: 5300,
//       avatar: "👩🏾",
//       position: 2,
//     },
//     {
//       name: "Lisa Patel",
//       level: 13,
//       xp: 5100,
//       avatar: "👩🏼",
//       position: 3,
//     },
//   ],
//   "All Time": [
//     {
//       name: "Sarah Johnson",
//       level: 20,
//       xp: 9500,
//       avatar: "👑",
//       position: 1,
//     },
//     {
//       name: "Michael Chen",
//       level: 19,
//       xp: 9200,
//       avatar: "🧔🏾",
//       position: 2,
//     },
//     {
//       name: "Emma Wilson",
//       level: 19,
//       xp: 9100,
//       avatar: "😊",
//       position: 3,
//     },
//   ],
// };

// const leaderboardData = {
//   Weekly: [
//     { name: "David Kim", avatar: "🧑🏽‍💼", level: 13, xp: 3800, streak: 8 },
//     { name: "Lisa Patel", avatar: "👩🏼", level: 13, xp: 3600, streak: 7 },
//     { name: "James Wilson", avatar: "👨🏻‍⚕️", level: 12, xp: 3400, streak: 6 },
//     { name: "Maria Garcia", avatar: "👩🏾", level: 12, xp: 3200, streak: 5 },
//     { name: "Alex Thompson", avatar: "🧑🏽‍🦰", level: 11, xp: 3000, streak: 4 },
//     { name: "Sophie Lee", avatar: "👩🏻", level: 11, xp: 2800, streak: 3 },
//     { name: "Ryan Miller", avatar: "👨🏼‍🦳", level: 10, xp: 2600, streak: 2 },
//   ],
//   Monthly: [
//     { name: "Ryan Miller", avatar: "👨🏼‍🦳", level: 12, xp: 4800, streak: 6 },
//     { name: "Alex Thompson", avatar: "🧑🏽‍🦰", level: 12, xp: 4600, streak: 5 },
//   ],
//   "All Time": [
//     { name: "David Kim", avatar: "🧑🏽‍💼", level: 18, xp: 9000, streak: 25 },
//   ],
// };

// export default function Leaderboard({ onStartChallenge }) {
//   const [activeTab, setActiveTab] = useState("Weekly");
//   const navigate = useNavigate(); // ✅ Hook to navigate

//   return (
//     <div className="min-h-screen bg-orange-50 font-mono px-4 sm:px-8 py-6">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-2">
//         <h1 className="text-3xl font-bold text-orange-700">Leaderboard</h1>
//         <button
//           onClick={onStartChallenge}
//           className="bg-orange-500 text-white px-4 py-2 rounded-full font-semibold shadow hover:bg-orange-600 transition"
//         >
//           Start Challenge
//         </button>
//       </div>

//       <p className="text-orange-600 mb-6 text-sm sm:text-base">
//         See how you rank against other learners
//       </p>

//       {/* Tabs */}
//       <div className="flex gap-3 mb-6 flex-wrap">
//         {["Weekly", "Monthly", "All Time"].map((tab) => (
//           <button
//             key={tab}
//             onClick={() => setActiveTab(tab)}
//             className={`px-4 py-2 rounded-full font-semibold text-sm transition-all duration-200 ${activeTab === tab
//               ? "bg-orange-500 text-white shadow"
//               : "bg-white text-orange-500 border border-orange-300 hover:bg-orange-100"
//               }`}
//           >
//             {tab}
//           </button>
//         ))}
//       </div>

//       {/* Leaderboard Card */}
//       <div className="bg-white rounded-xl p-6 shadow-md border border-orange-100">
//         <h2 className="text-md font-semibold text-orange-700 mb-6">
//           {activeTab} Leaderboard
//         </h2>

//         {/* Top Performers (shown for all tabs) */}
//         <div className="flex justify-center gap-6 sm:gap-10 mb-10 flex-wrap">
//           {topUsersData[activeTab]
//             .sort((a, b) => a.position - b.position)
//             .map((user) => (
//               <div
//                 key={user.name}
//                 className="text-center relative w-24 sm:w-28"
//               >
//                 <div
//                   className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full mx-auto text-3xl sm:text-4xl flex items-center justify-center border-4 ${user.position === 1
//                     ? "border-orange-500 scale-110"
//                     : "border-orange-200"
//                     }`}
//                 >
//                   {user.avatar}
//                 </div>
//                 {user.position === 1 && (
//                   <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 text-orange-500">
//                     <Crown size={20} />
//                   </div>
//                 )}
//                 <p className="mt-2 font-semibold text-orange-700 text-sm sm:text-base">
//                   {user.name}
//                 </p>
//                 <p className="text-xs text-orange-400">
//                   Level {user.level} • {user.xp} XP
//                 </p>
//                 {user.position === 1 && (
//                   <span className="mt-1 inline-block bg-orange-600 text-white text-[10px] px-2 py-0.5 rounded-full">
//                     Top Performer
//                   </span>
//                 )}
//               </div>
//             ))}
//         </div>

//         {/* Leaderboard Table */}
//         <div className="overflow-x-auto">
//           <table className="w-full text-left text-sm text-orange-700">
//             <thead>
//               <tr className="border-b border-orange-200">
//                 <th className="py-2">Rank</th>
//                 <th>User</th>
//                 <th>Level</th>
//                 <th>XP</th>
//                 <th>Streak</th>
//               </tr>
//             </thead>
//             <tbody>
//               {leaderboardData[activeTab].map((user, index) => (
//                 <tr
//                   key={index}
//                   className="border-b border-orange-100 hover:bg-orange-50"
//                 >
//                   <td className="py-2">{index + 4}</td>
//                   <td className="flex items-center gap-2 py-2 whitespace-nowrap">
//                     <span>{user.avatar}</span> {user.name}
//                   </td>
//                   <td>{user.level}</td>
//                   <td>{user.xp}</td>
//                   <td className="flex items-center gap-1">
//                     <Flame className="text-orange-500" size={16} />
//                     {user.streak}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }





import React, { useState, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Crown, Flame } from "lucide-react";
import { ChallengeContext } from "/src/App"; // Adjust the path if needed

const topUsersData = {
  Weekly: [
    { name: "Sarah Johnson", level: 15, xp: 4500, avatar: "👑", position: 1 },
    { name: "Michael Chen", level: 14, xp: 4200, avatar: "🧔🏾", position: 2 },
    { name: "Emma Wilson", level: 14, xp: 4000, avatar: "😊", position: 3 },
  ],
  Monthly: [
    { name: "James Wilson", level: 14, xp: 5500, avatar: "👨🏻‍⚕️", position: 1 },
    { name: "Maria Garcia", level: 13, xp: 5300, avatar: "👩🏾", position: 2 },
    { name: "Lisa Patel", level: 13, xp: 5100, avatar: "👩🏼", position: 3 },
  ],
  "All Time": [
    { name: "Sarah Johnson", level: 20, xp: 9500, avatar: "👑", position: 1 },
    { name: "Michael Chen", level: 19, xp: 9200, avatar: "🧔🏾", position: 2 },
    { name: "Emma Wilson", level: 19, xp: 9100, avatar: "😊", position: 3 },
  ],
};

const leaderboardData = {
  Weekly: [
    { name: "David Kim", avatar: "🧑🏽‍💼", level: 13, xp: 380, streak: 8 },
    { name: "Lisa Patel", avatar: "👩🏼", level: 13, xp: 360, streak: 7 },
    { name: "James Wilson", avatar: "👨🏻‍⚕️", level: 12, xp: 340, streak: 6 },
    { name: "Maria Garcia", avatar: "👩🏾", level: 12, xp: 320, streak: 5 },
    { name: "Alex Thompson", avatar: "🧑🏽‍🦰", level: 11, xp: 300, streak: 4 },
    { name: "Sophie Lee", avatar: "👩🏻", level: 1, xp: 28, streak: 3 },
    { name: "Ryan Miller", avatar: "👨🏼‍🦳", level: 0, xp: 20, streak: 2 },
  ],
  Monthly: [
    { name: "Ryan Miller", avatar: "👨🏼‍🦳", level: 12, xp: 1800, streak: 6 },
    { name: "Alex Thompson", avatar: "🧑🏽‍🦰", level: 12, xp: 1600, streak: 5 },
  ],
  "All Time": [
    { name: "David Kim", avatar: "🧑🏽‍💼", level: 18, xp: 4000, streak: 25 },
  ],
};

export default function Leaderboard({ onStartChallenge }) {
  const [activeTab, setActiveTab] = useState("Weekly");
  const { challengeName, challengeScore } = useContext(ChallengeContext);

  // Merge user data with dummy leaderboard
  const fullLeaderboard = useMemo(() => {
    const base = leaderboardData[activeTab] || [];

    const currentUser =
      challengeName && challengeScore > 0
        ? {
            name: challengeName,
            avatar: "🧑🏻",
            level: Math.floor(challengeScore / 100),
            xp: challengeScore,
            streak: Math.floor(challengeScore / 100),
            isCurrentUser: true,
          }
        : null;

    const merged = currentUser
      ? [...base.filter((u) => u.name !== challengeName), currentUser]
      : base;

    return merged.sort((a, b) => b.xp - a.xp);
  }, [activeTab, challengeName, challengeScore]);

  return (
    <div className="min-h-screen bg-orange-50 font-mono px-4 sm:px-8 py-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-2">
        <h1 className="text-3xl font-bold text-orange-700">Leaderboard</h1>
        <button
          onClick={onStartChallenge}
          className="bg-orange-500 text-white px-4 py-2 rounded-full font-semibold shadow hover:bg-orange-600 transition"
        >
          Start Challenge
        </button>
      </div>

      <p className="text-orange-600 mb-6 text-sm sm:text-base">
        See how you rank against other learners
      </p>

      {/* Tabs */}
      <div className="flex gap-3 mb-6 flex-wrap">
        {["Weekly", "Monthly", "All Time"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-full font-semibold text-sm transition-all duration-200 ${
              activeTab === tab
                ? "bg-orange-500 text-white shadow"
                : "bg-white text-orange-500 border border-orange-300 hover:bg-orange-100"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Leaderboard Card */}
      <div className="bg-white rounded-xl p-6 shadow-md border border-orange-100">
        <h2 className="text-md font-semibold text-orange-700 mb-6">
          {activeTab} Leaderboard
        </h2>

        {/* Top Performers */}
        <div className="flex justify-center gap-6 sm:gap-10 mb-10 flex-wrap">
          {topUsersData[activeTab]
            .sort((a, b) => a.position - b.position)
            .map((user) => (
              <div key={user.name} className="text-center relative w-24 sm:w-28">
                <div
                  className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full mx-auto text-3xl sm:text-4xl flex items-center justify-center border-4 ${
                    user.position === 1
                      ? "border-orange-500 scale-110"
                      : "border-orange-200"
                  }`}
                >
                  {user.avatar}
                </div>
                {user.position === 1 && (
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 text-orange-500">
                    <Crown size={20} />
                  </div>
                )}
                <p className="mt-2 font-semibold text-orange-700 text-sm sm:text-base">
                  {user.name}
                </p>
                <p className="text-xs text-orange-400">
                  Level {user.level} • {user.xp} XP
                </p>
                {user.position === 1 && (
                  <span className="mt-1 inline-block bg-orange-600 text-white text-[10px] px-2 py-0.5 rounded-full">
                    Top Performer
                  </span>
                )}
              </div>
            ))}
        </div>

        {/* Leaderboard Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-orange-700">
            <thead>
              <tr className="border-b border-orange-200">
                <th className="py-2">Rank</th>
                <th>User</th>
                <th>Level</th>
                <th>XP</th>
                <th>Streak</th>
              </tr>
            </thead>
            <tbody>
              {fullLeaderboard.map((user, index) => (
                <tr
                  key={user.name + index}
                  className={`border-b border-orange-100 hover:bg-orange-50 ${
                    user.isCurrentUser ? "bg-orange-100 font-bold" : ""
                  }`}
                >
                  <td className="py-2">{index + 1}</td>
                  <td className="flex items-center gap-2 py-2 whitespace-nowrap">
                    <span>{user.avatar}</span> {user.name}
                  </td>
                  <td>{user.level}</td>
                  <td>{user.xp}</td>
                  <td className="flex items-center gap-1">
                    <Flame className="text-orange-500" size={16} />
                    {user.streak}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
