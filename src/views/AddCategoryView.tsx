import { CancelButton } from "../components/CancelButton";
import { ErrorMessage } from "../components/ErrorMessage";
import { SubmitButton } from "../components/SubmitButton";
import { SuccessMessage } from "../components/SuccessMessage";
import { Navigation } from "../components/Navigation";
import { FileUpload } from "../components/FileUpload";
import { useState } from "react";
import { type Status } from "./AddProductView";

async function toBase64(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });
}

const AddCategoryView = () => {
  const [status, setStatus] = useState<Status>();
  return (
    <>
      {status === "success" ? (
        <SuccessMessage className="max-w-3xl flex justify-center mx-auto mb-8">
          Die Kategorie wurde erfolgreich erstellt!
        </SuccessMessage>
      ) : null}

      {status === "error" ? (
        <ErrorMessage className="mb-8 max-w-3xl flex justify-center mx-auto">
          Etwas ist schiefgelaufen. Bitte wenden Sie sich an den Support.
        </ErrorMessage>
      ) : null}

      <div className="rounded-lg p-2 flex h-full">
        <Navigation></Navigation>
        <div className="w-full">
          <div className="border border-gray-200 rounded-lg px-8 py-8 shadow-sm bg-white">
            <h1 className="font-bold text-3xl mb-16 text-slate-900">
              Kategorie erstellen
            </h1>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const formData = new FormData(e.target as HTMLFormElement);
                const category = formData.get("categoryName");
                const status = formData.get("status");
                const description = formData.get("description");
                const image = formData.get("dropzone-file");

                if (
                  typeof category !== "string" ||
                  typeof status !== "string" ||
                  typeof description !== "string" ||
                  !(image instanceof File)
                ) {
                  setStatus("error");
                  return;
                }
                const base64Image = await toBase64(image);

                try {
                  const response = await fetch(
                    "http://localhost/api/categories/",
                    {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json"
                      },
                      body: JSON.stringify({
                        category: category,
                        image: base64Image,
                        description: description,
                        status: parseInt(status),
                      }),
                    }
                  );

                  if (!response.ok) {
                    throw new Error("Response not ok.");
                  }
                  setStatus("success");
                  (e.target as HTMLFormElement).reset();
                } catch (error) {
                  setStatus("error");
                }
              }}
            >
              <div className="flex flex-row gap-16">
                <div className="flex flex-col w-1/2">
                  <div className="flex flex-col">
                    <label
                      htmlFor="categoryName"
                      className="mb-1 font-semibold"
                    >
                      Kategorie
                    </label>
                    <input
                      type="text"
                      name="categoryName"
                      className="border rounded-lg bg-neutral-100/20 p-2"
                      placeholder="Kleidung, Elektronik, Spielzeug, ..."
                      required
                    />
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="status" className="mb-1 mt-8 font-semibold">
                      Status
                    </label>
                    <select
                      id="status"
                      name="status"
                      className=" border border-gray-300 rounded-lg p-2 bg-neutral-100/20"
                      required
                    >
                      <option value="1">Aktiv</option>
                      <option value="0">Inaktiv</option>
                    </select>
                  </div>

                  <div className="flex flex-col">
                    <label
                      htmlFor="description"
                      className="mb-1 mt-8 font-semibold"
                    >
                      Beschreibung
                    </label>
                    <textarea
                      name="description"
                      className="border rounded-lg h-40 p-2 bg-neutral-100/20"
                      maxLength={600}
                      required
                    ></textarea>
                  </div>
                </div>
                <FileUpload height="h-96" width="w-full"></FileUpload>
              </div>

              <div className="flex flex-col items-center">
                <div className="flex flex-col sm:flex-row gap-8 mt-24">
                  <CancelButton>Abbrechen</CancelButton>
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
                    Kategorie erstellen
                  </SubmitButton>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export { AddCategoryView };
