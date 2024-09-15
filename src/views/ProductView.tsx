import { useEffect, useReducer, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Navigation } from "../components/Navigation";
import { Pagination } from "../components/Pagination";

type ProductApiItem = {
  id: number;
  productName: string;
  description: string;
  price: number;
  status: number;
};

type PaginationApiResult = {
  count: number;
  countPages: number;
  products: ProductApiItem[];
};

const useFetch = (
  limit: number,
  page: number,
  sort: string,
  filter: string,
  search: string
) => {
  const [data, setData] = useState<PaginationApiResult>({
    count: 0,
    countPages: 0,
    products: [],
  });

  useEffect(() => {
    const abortController = new AbortController();
    async function getData() {
      const url = new URL("/api/items", "http:localhost");
      url.searchParams.append("limit", limit.toString());
      url.searchParams.append("page", page.toString());
      url.searchParams.append("sortBy", sort);
      url.searchParams.append("filterBy", filter);
      url.searchParams.append("search", search);

      try {
        const response = await fetch(url, {
          signal: abortController.signal,
        });
        if (!response.ok) {
          throw new Error("Response not ok.");
        }

        const result = await response.json();

        setData(result);
      } catch (error) {
        if (error instanceof Error) {
          if (error.name === "AbortError") return;
          console.error(`error message: ${error.message}`);
        }
      }
    }

    getData();
    return () => {
      abortController.abort();
    };
  }, [limit, page, sort, filter, search]);

  return data;
};

async function deleteProduct(id: number) {
  if (!window.confirm("Möchten Sie das Produkt wirklich löschen?")) return;
  else {
    try {
      const response = await fetch(`http://localhost/api/items/${id}`, {
        method: "DELETE",
        body: JSON.stringify({
          productId: id,
        }),
      });

      if (!response.ok) {
        throw new Error("Response not ok.");
      }
      window.location.href = "/";
    } catch (error) {
      if (error instanceof Error) {
        console.error(`error message: ${error.message}`);
      }
    }
  }
}

type ReducerState = {
  limit: number;
  page: number;
  sort: string;
  filter: string;
  search: string;
};

type ReducerAction =
  | {
      type: "nextPage";
      maxPage: number;
    }
  | {
      type: "previousPage";
    }
  | {
      type: "setLimit";
      limit: number;
    }
  | {
      type: "sortBy";
      sort: string;
    }
  | {
      type: "filterBy";
      filter: string;
    }
  | {
      type: "search";
      search: string;
    };

function reducer(state: ReducerState, action: ReducerAction): ReducerState {
  switch (action.type) {
    case "setLimit":
      return {
        ...state,
        limit: action.limit,
      };
    case "sortBy":
      return {
        ...state,
        sort: action.sort,
      };
    case "nextPage":
      if (state.page === action.maxPage) return state;

      return {
        ...state,
        page: state.page + 1,
      };
    case "previousPage":
      if (state.page === 1) return state;

      return {
        ...state,
        page: state.page - 1,
      };
    case "filterBy":
      return {
        ...state,
        filter: action.filter,
      };
    case "search":
      return {
        ...state,
        search: action.search,
      };
  }
}

const ProductView = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialState = {
    limit: searchParams.get("limit")
      ? parseInt(searchParams.get("limit")!)
      : 10,
    page: searchParams.get("page") ? parseInt(searchParams.get("page")!) : 1,
    sort: searchParams.get("sortBy") || "id",
    filter: searchParams.get("filterBy") || "all",
    search: searchParams.get("search") || "",
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  // to avoid that limit and page jump back to the default value when
  // the url has different values

  // For query params in the URL.
  useEffect(() => {
    setSearchParams({
      limit: state.limit.toString(),
      page: state.page.toString(),
      sortBy: state.sort,
      filterBy: state.filter,
      search: state.search,
    });
  }, [state.limit, state.page, state.sort, state.filter]);

  const data = useFetch(
    state.limit,
    state.page,
    state.sort,
    state.filter,
    state.search
  );
  return (
    <>
      <div className="rounded-lg p-2 flex gap-8 h-full">
        <Navigation></Navigation>

        <div className="w-full">
          <div className="border border-gray-200 rounded-lg shadow-sm p-8 bg-white mb-8 flex flex-col">
            <h1 className="font-bold border-b-2 border-black text-3xl mb-16 text-slate-900">
              Produktübersicht
            </h1>
            <div className="flex flex-row justify-between">
              <div className="flex flex-col w-1/6">
                <label htmlFor="entriesPerPage">Anzahl pro Seite</label>
                <select
                  className="border rounded px-4 py-2"
                  name="entriesPerPage"
                  id="entriesPerPage"
                  value={state.limit}
                  onChange={(e) => {
                    dispatch({
                      type: "setLimit",
                      limit: parseInt(e.target.value),
                    });
                  }}
                >
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                </select>
              </div>

              <div className="flex flex-col w-1/6">
                <label htmlFor="sortBy">Sortieren nach</label>
                <select
                  name="sortBy"
                  id="sortBy"
                  className="border rounded px-4 py-2"
                  value={state.sort}
                  onChange={(e) => {
                    dispatch({
                      type: "sortBy",
                      sort: e.target.value,
                    });
                  }}
                >
                  <option value="id">ID</option>
                  <option value="name">Name</option>
                  <option value="price">Preis</option>
                </select>
              </div>

              <div className="flex flex-col w-1/6">
                <label htmlFor="filterBy">Filtern nach</label>
                <select
                  name="filterBy"
                  id="filterBy"
                  className="border rounded px-4 py-2"
                  onChange={(e) => {
                    dispatch({
                      type: "filterBy",
                      filter: e.target.value,
                    });
                  }}
                >
                  <option value="all">Alle</option>
                  <option value="active">Aktiv</option>
                  <option value="inactive">Inaktiv</option>
                </select>
              </div>

              <div>
                <form>
                  <label htmlFor="search" className="r-only">
                    Suche
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                      <svg
                        className="w-4 h-4"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 20"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                        />
                      </svg>
                    </div>
                    <input
                      type="search"
                      id="search"
                      name="search"
                      className="p-4 px-10 text-sm border border-gray-200 rounded-lg w-96"
                      placeholder="Suche nach Name oder ID"
                    />
                    <button
                      type="submit"
                      onSubmit={(e) => {
                        e.preventDefault();
                        const formData = new FormData(
                          e.target as HTMLFormElement
                        );
                        const searchInput = formData.get("search");
                        if (typeof searchInput !== "string") {
                          return;
                        }
                        dispatch({
                          type: "search",
                          search: searchInput,
                        });
                      }}
                      className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Suche
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="border border-gray-200 rounded-lg shadow-sm p-8 bg-white">
            <table className="w-full">
              <thead className="border-b-2 border-black text-left">
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Preis</th>
                  <th>Beschreibung</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {data.products === null
                  ? "keine Einträge"
                  : data.products.map((entry) => {
                      return (
                        <tr
                          className="border-b-2 border-neutral-200"
                          key={entry["id"]}
                        >
                          <td className="my-2">{entry["id"]}</td>
                          <td className="my-2">{entry["productName"]}</td>
                          <td className="my-2">{entry["price"]}€</td>
                          <td className="my-2 max-w-[5ch] truncate">
                            {entry["description"]}
                          </td>
                          <td>
                            {entry["status"] === 0 ? (
                              <div className="rounded-full px-2 py-1 text-sm text-red-700 bg-red-200 inline-block">
                                Inaktiv
                              </div>
                            ) : (
                              <div className="rounded-full px-2 py-1 text-sm text-green-700 bg-green-200 inline-block">
                                Aktiv
                              </div>
                            )}
                          </td>
                          <td>
                            <div className="flex gap-4 justify-end my-2">
                              <a
                                href={`/update-product/${entry.id}`}
                                className="text-slate-700 text-sm hover:text-slate-900"
                              >
                                Bearbeiten
                              </a>
                              <button
                                onClick={() => deleteProduct(entry.id)}
                                className="text-red-500 text-sm hover:text-red-600"
                              >
                                Löschen
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
              </tbody>
            </table>
            <Pagination
              page={state.page}
              limit={state.limit}
              count={data.count}
              disabledNext={state.page >= data.countPages}
              disabledPrevious={state.page <= 1}
              onClickNext={() => {
                dispatch({
                  type: "nextPage",
                  maxPage: data.countPages,
                });
              }}
              onClickPrevious={() => {
                dispatch({
                  type: "previousPage",
                });
              }}
            ></Pagination>
          </div>
        </div>
      </div>
    </>
  );
};

export { ProductView, type ProductApiItem };
