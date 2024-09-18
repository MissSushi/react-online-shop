import { ProductApiItem } from "../views/ProductView";

type FormElementsProps = {
  product?: ProductApiItem;
};

const FormElements = ({ product }: FormElementsProps) => {
  return (
    <>
      <div className="flex flex-col w-full px-8">
        <div className="flex flex-row gap-24">
          <div className="flex flex-col justify-start w-1/2">
            <label htmlFor="productName" className="mb-1 font-semibold">
              Produktname
            </label>
            <input
              type="text"
              name="productName"
              className="border rounded-lg bg-neutral-100/20 p-2"
              placeholder="T-Shirt, Kleid, Schuhe ..."
              required
              defaultValue={product?.productName}
            />
          </div>

          <div className="flex flex-col w-1/2">
            <label htmlFor="category" className="mb-1 font-semibold">
              Kategorie
            </label>
            <select
              name="category"
              id="category"
              className="border border-gray-300 rounded-lg p-2 bg-neutral-100/20"
              required
            >
              <option>Kleidung</option>
            </select>
          </div>
        </div>

        <div className="flex flex-row gap-24">
          <div className="flex flex-col justify-start w-1/2">
            <label htmlFor="price" className="mb-1 mt-8 font-semibold">
              Preis in Euro
            </label>
            <input
              type="text"
              name="price"
              className="border rounded-lg p-2 bg-neutral-100/20"
              placeholder="50, 40, 3 ..."
              required
              defaultValue={product?.price}
            />
          </div>

          <div className="flex flex-col w-1/2">
            <label htmlFor="status" className="mb-1 mt-8 font-semibold">
              Status
            </label>
            <select
              id="status"
              name="status"
              className=" border border-gray-300 rounded-lg p-2 bg-neutral-100/20"
              required
              defaultValue={product?.status}
            >
              <option value="1">Aktiv</option>
              <option value="0">Inaktiv</option>
            </select>
          </div>
        </div>

        <label htmlFor="productDescription" className="mb-1 mt-8 font-semibold">
          Beschreibung
        </label>
        <textarea
          name="productDescription"
          className="border rounded-lg h-52 p-2 bg-neutral-100/20"
          maxLength={600}
          required
          defaultValue={product?.description}
        ></textarea>
      </div>
    </>
  );
};

export { FormElements };
