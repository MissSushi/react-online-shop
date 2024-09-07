import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CancelButton } from "../components/CancelButton";
import { ErrorMessage } from "../components/ErrorMessage";
import { FormElements } from "../components/FormElements";
import { SubmitButton } from "../components/SubmitButton";
import { ProductApiItem } from "./ProductView";

type Status = "pending" | "success" | "error";

const UpdateProductView = () => {
  const { id } = useParams();
  const [status, setStatus] = useState<Status>();
  const [data, setData] = useState<ProductApiItem>();
  useEffect(() => {
    const abortController = new AbortController();
    async function getData() {
      try {
        const response = await fetch(`http://localhost/api/items/${id}`, {
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
      return data;
    }
    getData();
    return () => {
      abortController.abort();
    };
  }, []);

  return (
    <>
      {status === "error" ? (
        <ErrorMessage className="mb-8 max-w-3xl flex justify-center mx-auto">
          Etwas ist schiefgelaufen. Bitte wenden Sie sich an den Support.
        </ErrorMessage>
      ) : null}
      <div className="border rounded-lg px-8 py-8 shadow-sm max-w-3xl mx-auto">
        <form
          onSubmit={async (e) => {
            e.preventDefault();

            setStatus("pending");
            const formData = new FormData(e.target as HTMLFormElement);
            const name = formData.get("productName");
            const price = formData.get("price");
            const description = formData.get("productDescription");

            if (
              typeof name !== "string" ||
              typeof price !== "string" ||
              typeof description !== "string"
            ) {
              setStatus("error");
              return;
            }

            try {
              const response = await fetch(`http://localhost/api/items/${id}`, {
                method: "PUT",
                body: JSON.stringify({
                  name: name,
                  price: parseInt(price),
                  description: description,
                }),
              });

              if (!response.ok) {
                throw new Error("Response not ok.");
              }
              window.location.href = "/";
            } catch (error) {
              setStatus("error");
            }
          }}
        >
          <div className="flex flex-col items-center">
            <FormElements product={data}></FormElements>
            <div className="flex flex-col sm:flex-row gap-8 mt-16">
              <SubmitButton className="relative">
                {status === "pending" ? (
                  <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-slate-950 overflow-hidden rounded-full">
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  </div>
                ) : null}
                Speichern
              </SubmitButton>
              <CancelButton>Abbrechen</CancelButton>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export { UpdateProductView };
