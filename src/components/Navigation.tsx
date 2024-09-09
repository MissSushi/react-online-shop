import { Link, useLocation } from "react-router-dom";

const Navigation = () => {
  const location = useLocation();
  return (
    <>
      <nav className="min-w-72 ml-4 p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="rounded-full bg-gray-100 px-4 py-1 flex items-center mt-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="size-5 text-black"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
            />
          </svg>
          <span className="ml-2 font-semibold">Dashboard</span>
        </div>
        <ul className="flex-col flex ml-4 mt-2 gap-4">
          <li>
            <Link
              to="/"
              className={
                location.pathname === "/" ? "font-bold" : "hover:text-gray-700"
              }
            >
              Produktübersicht
            </Link>
          </li>
        </ul>
        {/* <div className="border-t-4 border-dotted border-gray-400 my-6 ml-4 border-"></div> */}
        <div className="rounded-full bg-gray-100 px-4 py-1 flex items-center mt-8">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="size-5 text-black"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z"
            />
          </svg>

          <span className=" ml-2 font-semibold">Administration</span>
        </div>
        <ul className="flex-col flex ml-4 mt-2 mb-4 gap-4">
          <li>
            <Link
              to="/add-product"
              className={
                location.pathname === "/add-product"
                  ? "font-bold"
                  : "hover:text-gray-700"
              }
            >
              Produkt hinzufügen
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export { Navigation };
