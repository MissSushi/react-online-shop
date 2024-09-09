import { ProductApiItem } from "../views/ProductView";

type FormElementsProps = {
  product?: ProductApiItem;
};

const FormElements = ({ product }: FormElementsProps) => {
  console.log("status: ", product?.status);
  return (
    <>
      <div className="flex flex-col w-full px-8">
        <label htmlFor="productName" className="mb-1">
          Produktname
        </label>
        <input
          type="text"
          name="productName"
          className="border rounded-lg p-1 bg-neutral-100/20"
          placeholder="T-Shirt, Kleid, Schuhe ..."
          required
          defaultValue={product?.productName}
        />

        <div className="flex flex-row">
          <div className="flex flex-col justify-start w-1/2">
            <label htmlFor="price" className="mb-1 mt-8">
              Preis in Euro
            </label>
            <input
              type="number"
              name="price"
              className="border rounded-lg p-1 bg-neutral-100/20"
              placeholder="50, 40, 3 ..."
              required
              defaultValue={product?.price}
            />
          </div>

          <div className="flex flex-col w-1/2 ml-16">
            <label htmlFor="status" className="mb-1 mt-8">
              Status
            </label>
            <select
              id="status"
              name="status"
              className=" border border-gray-300 text-sm rounded-lg p-2 bg-neutral-100/20"
              required
              defaultValue={product?.status}
            >
              <option value="1">Aktiv</option>
              <option value="0">Inaktiv</option>
            </select>
          </div>
        </div>

        <label htmlFor="productDescription" className="mb-1 mt-8">
          Beschreibung
        </label>
        <textarea
          name="productDescription"
          className="border rounded-lg h-28 p-1 bg-neutral-100/20"
          maxLength={600}
          required
          defaultValue={product?.description}
        ></textarea>
      </div>
    </>
  );
};

export { FormElements };
