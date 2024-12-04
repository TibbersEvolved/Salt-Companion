type props = {
  currentStreak: number;
  recordStreak: number;
  cardsFlipped: number;
};

export default function Stat(prop: props) {
  return (
    <div className="stats shadow w-full font-light">
      <div className="stat">
        <div className="stat-figure text-secondary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block h-8 w-8 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              stroke="#f35b7e"
              strokeWidth="3"
              d="M12,21c-3.9,0-7-2-7-7s5-5,5-11c3,2,4.37,4.1,5,8a5,5,0,0,0,2-3c1,1,2,4,2,6C19,17.14,17.72,21,12,21Z"
            ></path>
          </svg>
        </div>
        <div className="stat-title text-[#424242]">Current Streak</div>
        <div className="stat-value text-[#424242]">
          {prop.currentStreak} <span className="text-2xl">days</span>
        </div>
      </div>

      <div className="stat">
        <div className="stat-figure text-secondary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            width={32}
            height={32}
            viewBox="0 0 36 36"
            className="inline-block h-8 w-8 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              stroke="#f35b7e"
              d="M27.19,34a2.22,2.22,0,0,1-1.24-.38l-7.46-5a.22.22,0,0,0-.25,0l-7.46,5A2.22,2.22,0,0,1,7.4,31.21l2.45-8.64a.23.23,0,0,0-.08-.24L2.71,16.78a2.22,2.22,0,0,1,1.29-4l9-.34a.23.23,0,0,0,.2-.15l3.1-8.43a2.22,2.22,0,0,1,4.17,0l3.1,8.43a.23.23,0,0,0,.2.15l9,.34a2.22,2.22,0,0,1,1.29,4L27,22.33a.22.22,0,0,0-.08.24l2.45,8.64A2.23,2.23,0,0,1,27.19,34Zm-8.82-7.42A2.21,2.21,0,0,1,19.6,27l7.46,5a.22.22,0,0,0,.34-.25l-2.45-8.64a2.21,2.21,0,0,1,.77-2.35l7.06-5.55a.22.22,0,0,0-.13-.4l-9-.34a2.22,2.22,0,0,1-2-1.46l-3.1-8.43a.22.22,0,0,0-.42,0L15.06,13a2.22,2.22,0,0,1-2,1.46l-9,.34a.22.22,0,0,0-.13.4L11,20.76a2.22,2.22,0,0,1,.77,2.35L9.33,31.75a.21.21,0,0,0,.08.24.2.2,0,0,0,.26,0l7.46-5A2.22,2.22,0,0,1,18.36,26.62Z"
            ></path>
          </svg>
        </div>
        <div className="stat-title text-[#424242]">Record Streak</div>
        <div className="stat-value text-[#424242]">
          {prop.recordStreak} days
        </div>
      </div>

      <div className="stat">
        <div className="stat-figure text-secondary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="#f35b7e"
            width={32}
            height={32}
            viewBox="0 0 256 256"
            className="inline-block h-8 w-8 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              stroke="#f35b7e"
              d="M180.00781,72h-144a20.02229,20.02229,0,0,0-20,20V204a20.02229,20.02229,0,0,0,20,20h144a20.02229,20.02229,0,0,0,20-20V92A20.02229,20.02229,0,0,0,180.00781,72Zm-4,128h-136V96h136Zm64-148V176a12,12,0,0,1-24,0V56h-152a12,12,0,0,1,0-24h156A20.02229,20.02229,0,0,1,240.00781,52Z"
            ></path>
          </svg>
        </div>
        <div className="stat-title text-[#424242]">Total Cards Flipped</div>
        <div className="stat-value text-[#424242]">{prop.cardsFlipped}</div>
      </div>
    </div>
  );
}
