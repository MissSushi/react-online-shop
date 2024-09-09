import { useEffect, useState } from "react";
import { Navigation } from "../components/Navigation";

type ProductApiItem = {
  id: number;
  productName: string;
  description: string;
  price: number;
  status: number;
};

const useFetch = () => {
  const [data, setData] = useState<ProductApiItem[]>([]);
  useEffect(() => {
    const abortController = new AbortController();
    async function getData() {
      try {
        const response = await fetch("http://localhost/api/items", {
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
  }, []);

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
const ProductView = () => {
  const data = useFetch();
  return (
    <>
      <div className="rounded-lg p-2 flex gap-8 h-full">
        <Navigation></Navigation>

        <div className="w-full">
          <h1 className="font-bold border-b-2 border-black text-3xl mb-16 text-slate-900">
            Produktübersicht
          </h1>
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
                {data.map((entry) => {
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
          </div>
        </div>
      </div>
    </>
  );
};

export { ProductView, type ProductApiItem };
