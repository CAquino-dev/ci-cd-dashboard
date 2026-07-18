type ErrorMessageProps = {
  message: string;
};

const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return (
    <div className="rounded-xl border border-red-700 bg-red-900/20 p-6 text-center">
      <p className="font-medium text-red-400">
        {message}
      </p>
    </div>
  );
};

export default ErrorMessage;