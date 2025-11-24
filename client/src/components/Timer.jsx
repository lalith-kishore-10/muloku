function Timer({ timer, isMyTurn, maxTimer }) {
  const percentage = (timer / (maxTimer || 45)) * 100;
  const isLow = timer <= Math.max(10, maxTimer * 0.2);

  return (
    <div className="timer-container">
      <div className="timer-display">
        <span className={`timer-value ${isLow ? "timer-low" : ""}`}>
          {timer}s
        </span>
      </div>
      <div className="timer-bar">
        <div
          className={`timer-fill ${isLow ? "timer-fill-low" : ""}`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}

export default Timer;
