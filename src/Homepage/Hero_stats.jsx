import { useState, useEffect , useRef} from "react";
import statsBg from "../assets/statsBg.png"
export function Stats(props){
  const [count, setCount] = useState(0);
   useEffect(() => {
     if (props.startAnimation) {
      const target = parseInt(props.stat);
      let current = 0;
      const timer = setInterval(() => {
        current++;
        if (current >= target) {
          clearInterval(timer);
        }
        setCount(current);
      }, 17);
     }
   }, [props.startAnimation]);
  return (
    <div className="flex flex-col h-3/5 w-2/5 justify-center items-center text-white">
      <h1 className="text-6xl mb-3 text-[#00C9A7]">
        {count}
        {props.stat.includes("K") && "K"}
        {props.stat.includes("+") && "+"}
        {props.stat.includes("%") && "%"}
      </h1>
      <h4>{props.message.toUpperCase()}</h4>
    </div>
  );
};
const Hero_stats = () => {
  const [startAnimation, setStartAnimation] = useState(false);
  const sectionRef = useRef(null);
  useEffect(()=>{
    const section = sectionRef.current;
    const observer = new IntersectionObserver((entries) => {
      const entry=entries[0];
      if(entry.isIntersecting){
        setStartAnimation(true);
      }
    });
    observer.observe(section);
  },[])
  return (
    <div
      ref={sectionRef}
      className="relative h-48 w-screen bg-cover bg-center before:absolute before:inset-0
             before:bg-black/10
             before:content-['']"
      style={{ backgroundImage: `url(${statsBg})` }}
    >
      <div className="relative z-10 h-full w-full flex flex-row justify-evenly items-center">
        <Stats
          stat="50K+"
          message="Health queries answered"
          startAnimation={startAnimation}
        />
        <Stats
          stat="10K+"
          message="Healthcare Providers Listed"
          startAnimation={startAnimation}
        />
        <Stats
          stat="98%"
          message="User Satisfaction"
          startAnimation={startAnimation}
        />
      </div>
    </div>
  );
};
export default Hero_stats;
