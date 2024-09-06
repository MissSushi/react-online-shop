const FormElements = () => {
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
          //   :value="props.product?.productName"
        />

        <label htmlFor="price" className="mb-1 mt-8">
          Preis in Euro
        </label>
        <input
          type="number"
          name="price"
          className="border rounded-lg p-1 bg-neutral-100/20"
          placeholder="50, 40, 3 ..."
          required
          //   :value="props.product?.price"
        />

        <label htmlFor="productDescription" className="mb-1 mt-8">
          Beschreibung
        </label>
        <textarea
          name="productDescription"
          className="border rounded-lg h-28 p-1 bg-neutral-100/20"
          maxLength={600}
          required
          //   :value="props.product?.description"
        ></textarea>
      </div>
    </>
  );
};

export { FormElements };
