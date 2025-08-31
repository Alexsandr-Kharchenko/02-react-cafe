import type { VoteType } from "../../types/votes"; // type-only import
import css from "./VoteOptions.module.css";

interface VoteOptionsProps {
  onVote: (type: VoteType) => void;
  onReset: () => void;
  canReset: boolean;
}

export default function VoteOptions({
  onVote,
  onReset,
  canReset,
}: VoteOptionsProps) {
  const voteButtons: { label: string; type: VoteType }[] = [
    { label: "Good", type: "good" },
    { label: "Neutral", type: "neutral" },
    { label: "Bad", type: "bad" },
  ];

  return (
    <div className={css.container}>
      {voteButtons.map((button) => (
        <button
          key={button.type}
          className={css.button}
          onClick={() => onVote(button.type)}
        >
          {button.label}
        </button>
      ))}

      {canReset && (
        <button className={`${css.button} ${css.reset}`} onClick={onReset}>
          Reset
        </button>
      )}
    </div>
  );
}
