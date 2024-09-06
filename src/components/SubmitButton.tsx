type SubmitButtonProps = React.ComponentProps<"button">;

const SubmitButton = ({ onSubmit, children, className }: SubmitButtonProps) => {
  return (
    <>
      <button
        type="submit"
        className={`${className} bg-slate-800 rounded-full py-2 px-4 text-white font-medium hover:bg-slate-900 focus:border-slate-800 focus:ring-2 ring-slate-800 ring-offset-2`}
        onSubmit={onSubmit}
      >
        {children}
      </button>
    </>
  );
};

export { SubmitButton };
