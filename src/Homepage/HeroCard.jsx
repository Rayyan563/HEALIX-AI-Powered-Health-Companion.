const HeroCard = () => {
  return (
    <div className="hero-right-glass-card flex h-full w-full flex-col px-7 py-5">
      <div className="card-header flex h-10 w-full flex-row items-center justify-between text-white">
        <div className="card-header-left flex items-center gap-2 font-bold">
          <i className="fa-solid fa-circle text-[6px] text-[#00C9A7]"></i>
          <p className="text-xs">LIVE SYMPTOMS CHECK</p>
        </div>
        <div className="card-header-right flex items-center">
          <i className="fa-solid fa-ellipsis text-sm"></i>
        </div>
      </div>

      <div className="mt-4 rounded-tl-xl rounded-tr-xl rounded-br-xl bg-white/10 px-4 py-4 text-white">
        <p className="text-sm leading-5">
          "I have a mild, persistent headache with slight pressure around my
          temples, especially in the afternoon."
        </p>
        <p className="mt-2 text-right text-xs text-white/40">Just now</p>
      </div>

      <div className="mt-5 rounded-tl-xl rounded-tr-xl rounded-bl-xl border border-[#00C9A7]/40 bg-[#00C9A7]/10 px-4 py-4 text-white">
        <div className="flex items-center gap-2 text-[#00C9A7]">
          <i className="fa-solid fa-wand-magic-sparkles text-sm"></i>
          <p className="text-sm font-semibold">HEALIX Analysis</p>
        </div>

        <p className="mt-3 text-sm leading-5 text-white/90">
          Your description matches characteristics commonly associated with
          tension headaches. Stress, posture, or screen fatigue can contribute.
        </p>
        <div className="mt-4 flex items-center justify-between">
          <button className="text-xs font-medium text-[#00C9A7]">
            Explore 3 considerations
          </button>
          <button>
            <i className="fa-solid fa-arrow-right text-sm text-[#00C9A7]"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroCard;
