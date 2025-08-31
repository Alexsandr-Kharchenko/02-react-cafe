import { useState } from "react";
import CafeInfo from "./components/CafeInfo/CafeInfo";
import VoteOptions from "./components/VoteOptions/VoteOptions";
import VoteStats from "./components/VoteStats/VoteStats";
import Notification from "./components/Notification/Notification";
import type { Votes, VoteType } from "./types/votes";
import css from "./App.module.css";

export default function App() {
  // ====== Стан голосів ======
  const [votes, setVotes] = useState<Votes>({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  // ====== Обробка голосування ======
  const handleVote = (type: VoteType) => {
    setVotes((prev) => ({ ...prev, [type]: prev[type] + 1 }));
  };

  // ====== Скидання голосів ======
  const resetVotes = () => {
    setVotes({ good: 0, neutral: 0, bad: 0 });
  };

  // ====== Обчислення статистики ======
  const totalVotes = votes.good + votes.neutral + votes.bad;
  const positiveRate = totalVotes
    ? Math.round((votes.good / totalVotes) * 100)
    : 0;

  // ====== Рендер компонентів ======
  return (
    <div className={css.app}>
      {/* Інформація про кафе */}
      <CafeInfo />

      {/* Кнопки голосування */}
      <VoteOptions
        onVote={handleVote}
        onReset={resetVotes}
        canReset={totalVotes > 0} // кнопка Reset з'являється лише при голосах
      />

      {/* Статистика або повідомлення про відсутність голосів */}
      {totalVotes > 0 ? (
        <VoteStats
          votes={votes}
          totalVotes={totalVotes}
          positiveRate={positiveRate}
        />
      ) : (
        <Notification />
      )}
    </div>
  );
}
