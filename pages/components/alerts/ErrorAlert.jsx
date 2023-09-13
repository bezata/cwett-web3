const ErrorAlert = ({ message }) => {
  return (
    <div
      className="fixed top-20 left-0 bg-red-400/50 border border-red-400 text-red-700 px-6 py-3 text-center text-slate-50 rounded backdrop-blur-md w-full mx-auto"
      role="alert"
    >
      <span className="block sm:inline">{message}</span>
    </div>
  );
};

export default ErrorAlert;