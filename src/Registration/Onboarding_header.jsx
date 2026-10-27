const Onboarding_header = (props) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="font-serif text-5xl">{props.header}</h1>
      <p className="text-base text-black/60 tracking-wider font-serif py-2">
       {props.info}
      </p>
    </div>
  );
}
export default Onboarding_header