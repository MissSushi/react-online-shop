type PaginationProps = {
  onClickNext: React.MouseEventHandler<HTMLButtonElement>;
  onClickPrevious: React.MouseEventHandler<HTMLButtonElement>;
  disabledNext: boolean;
  disabledPrevious: boolean;
  count: number;
  limit: number;
  page: number;
};

const Pagination = ({
  onClickNext,
  onClickPrevious,
  disabledPrevious,
  disabledNext,
  limit,
  count,
  page,
}: PaginationProps) => {
  let minItemCount = 0;
  // if page is 1 and count is 0 then keep count at 0, because it means there is no entries.
  if  (page !== 1 || count !== 0) {
    minItemCount = limit * (page - 1) + 1;
  }
  const maxItemCount = Math.min(limit * page, count);

  return (
    <>
      <div className="flex flex-col items-center mt-8">
        <span className="text-sm text-gray-700">
          Es werden {""}
          <span className="font-semibold">
            {minItemCount === maxItemCount
              ? minItemCount
              : `${minItemCount} bis ${maxItemCount}`}
          </span>{" "}
          von {""}
          <span className="font-semibold">{count}</span> Einträgen angezeigt
        </span>
        <div className="inline-flex mt-2">
          <button
            className="flex items-center justify-center px-4 h-10 text-base font-medium rounded-s hover:bg-gray-50 border disabled:bg-gray-200"
            onClick={onClickPrevious}
            disabled={disabledPrevious}
          >
            <svg
              className="w-3.5 h-3.5 me-2 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 5H1m0 0 4 4M1 5l4-4"
              />
            </svg>
            Zurück
          </button>
          <button
            className="flex items-center justify-center px-4 h-10 text-base font-medium border border-s rounded-e hover:bg-gray-50 disabled:bg-gray-200"
            onClick={onClickNext}
            disabled={disabledNext}
          >
            Weiter
            <svg
              className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};

export { Pagination };
