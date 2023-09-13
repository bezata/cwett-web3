const LoadingAlert = ({ message }) => {
  return (
    <div
      className="fixed top-20 left-0 text-center text-slate-50 rounded backdrop-blur-md w-full bg-black/20 px-6 py-3"
      role="alert"
    >
      <p className="font-bold">{message || "Loading..."}</p>
    </div>
  );
};

export default LoadingAlert;