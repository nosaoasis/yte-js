import loading from "../../images/downloadgif.gif";

const Loading = (props) => {
  const {message} = props
  return (
    <>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 zindex w-full h-full bg-black opacity-70 text-white font-bold text-center text-xl">
        <div className="h-full flex items-center justify-center">
          <img className="h-20 w-auto" src={loading} alt="loading" />
          <h3 className="ml-2 text-2xl">{message}</h3>
        </div>
      </div>
    </>
  );
};

export default Loading;
