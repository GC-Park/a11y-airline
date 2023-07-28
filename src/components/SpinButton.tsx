import React, { useState, MouseEvent, useEffect } from 'react';
import './SpinButton.css';
const SpinButton: React.FC = () => {
  const [count, setCount] = useState<number>(0);
  const [isTooltipVisible, setIsTooltipVisible] = useState<boolean>(false);
  const [announceText, setAnnounceText] = useState<string>('성인 승객 1명');
  const increment = () => {
    if (count === 3) {
      setAnnounceText("3까지만 추가할 수 있습니다.");
      return};
    if (count === 0) {
      setAnnounceText(`성인 ${count + 1} 텍스트 숫자만 수정 `);
      setCount(prevCount => prevCount + 1);
      return;
    }
    setCount(prevCount => prevCount + 1);
    setAnnounceText(`성인 승객 추가 ${count + 1}`);
  };
  const decrement = () => {
    if (count === 0) {
      setAnnounceText("0까지만 감소할 수 있습니다.");
      return};
    setCount(prevCount => prevCount - 1);
    setAnnounceText(`성인 승객 감소 ${count - 1}`);
  };
  const toggleTooltip = (event: MouseEvent<HTMLDivElement>) => {
    setIsTooltipVisible(!isTooltipVisible);
  };
  useEffect(() => {
    // Announce text updates to screen readers
    if (announceText) {
      const liveRegion = document.getElementById('live-region');
      if (liveRegion) {
        liveRegion.innerText = announceText;
      }
    }
  }, [announceText]);
  return (
    <section className="spinButtonContainer">
      <div>
        <h1>승객 선택</h1>
        <div className="spinButtonLabel">
          <label>성인</label>
          <div className="helpIcon" onMouseEnter={toggleTooltip} onMouseLeave={toggleTooltip}>
            ?{isTooltipVisible && <span className="tooltip">최대 인원수는 3명까지 가능합니다</span>}
          </div>
        </div>
        <button onClick={decrement} className="spinButton" aria-label="성인 탑승자 한명 줄이기 버튼">
          -
        </button>
        <input
          type="text"
          role="spinbutton"
          readOnly
          className="spinButtonInput"
          value={count}
        />
        <button onClick={increment} className="spinButton" aria-label="성인 탑승자 한명 늘리기 버튼">
          +
        </button>
      </div>
      <div id="live-region" aria-live="assertive" style={{ position: 'absolute', left: '-9999px' }}></div>
    </section>
  );
};
export default SpinButton;
