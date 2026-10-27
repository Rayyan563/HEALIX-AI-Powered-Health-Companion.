import featurecardphoto from "../assets/feature-card-photo.png";
import featurecardphoto1 from "../assets/feature-card-photo1.png";
import featurecardphoto2 from "../assets/feature-card-photo2.png";
export function SymptompsCard(props){
  return (
    <div className="w-[30%] h-[400px] rounded-3xl shadow-2xl border-gray-100  transition-all ease-in duration-500 hover:scale-105 hover:shadow-[0_0_50px_rgba(6,16,33,0.35)]">
      <div className="h-3/5 w-full object-cover">
        <img
          src={props.image}
          alt="card1"
          className="w-full h-full object-cover rounded-t-3xl p-0 m-0"
        />
      </div>
      <div>
        <h3 className="text-3xl font-serif p-5">{props.heading}</h3>
        <p className="px-5 text-base leading-6 text-black/60">{props.para}</p>
      </div>
    </div>
  );
};
const Hero_features = () => {
  return (
    <div id="features" className="features w-screen h-[720px] flex flex-col bg-white items-center justify-center gap-14">
      <div className="features-header w-11/12 h-24 flex flex-col justify-center">
        <p className="text-lg text-[#00C9A7] font-sans font-medium mt-10">
          CAPABILITIES
        </p>
        <h1 className="text-5xl font-serif">
          Everything you need to understand your health
        </h1>
      </div>
      <div className="features-grid w-11/12 h-[70%] flex flex-row justify-between gap-10">
        <SymptompsCard
          image={featurecardphoto}
          heading="Symptom Analysis"
          para="Describe your symptoms in plain language and get AI-powered insights into potential causes."
        />
        <SymptompsCard
          image={featurecardphoto1}
          heading="Find Care Nearby"
          para="Locate healthcare providers, clinics, and specialists near you with real-time availability."
        />
        <SymptompsCard
          image={featurecardphoto2}
          heading="Cost Transparency"
          para="Get approximate cost ranges for procedures and visits so you can plan ahead with confidence."
        />
        {/* <SymptompsCard /> */}
      </div>
    </div>
  );
}
export default Hero_features