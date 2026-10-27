import { Link } from "react-router-dom";
const Home_Card = (props) => {
  return (
    <div className="flex flex-col rounded-xl border border-black/10 shadow-md p-5 gap-5">
      <div className="flex gap-3 items-center">
        <div className="w-10 h-10 rounded-xl bg-[#E5F9F5] flex items-center justify-center">
          <span className="text-[#008C78] text-xl">
            {props.icon}
          </span>
        </div>
        <div>
          <h2 className="text-3xl font-serif w-full">{props.header}</h2>
        </div>
      </div>
      <p className="leading-6 text-black/60">
        {props.info}
      </p>
      <Link to={props.path} className="text-[#008C78] font-serif font-medium">
        {props.link} →
      </Link>
    </div>
  );
};
export default Home_Card;
