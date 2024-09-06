type CancelButtonProps = {
  children: React.ReactNode;
  className?: string;
};

const CancelButton = ({ children, className }: CancelButtonProps) => {
  return (
    <>
      <a
        href="/"
        className={`${className} border border-slate-800 rounded-full py-2 px-4 font-medium bg-white hover:bg-gray-100/50 focus:border-slate-800 focus:ring-2 ring-slate-800 ring-offset-2`}
      >
        {children}
      </a>
    </>
  );
};

export { CancelButton };
