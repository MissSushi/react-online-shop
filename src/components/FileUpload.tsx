import React, { useState } from "react";

type FileUploadProps = {
  height: string;
  width: string;
};

const FileUpload = ({ height, width }: FileUploadProps) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const allowedFormats = [
    "image/svg+xml",
    "image/png",
    "image/jpeg",
    "image/gif",
  ];

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    const droppedFile = e.dataTransfer.files[0];
    if (validateFile(droppedFile)) {
      setFile(droppedFile);
      setError(null);
    } else {
      setError(
        "Ungültiges Dateiformat. Nur SVG, PNG, JPG und GIF sind erlaubt."
      );
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;
    if (selectedFile && validateFile(selectedFile)) {
      setFile(selectedFile);
      setError(null);
    } else {
      setError(
        "Ungültiges Dateiformat. Nur SVG, PNG, JPG und GIF sind erlaubt."
      );
    }
  };

  const validateFile = (file: File) => {
    return allowedFormats.includes(file.type);
  };

  return (
    <div className="flex items-center justify-center w-1/2">
      <label
        htmlFor="dropzone-file"
        className={`${height} ${width} flex flex-col items-center justify-center border-2 ${
          isDragOver ? "border-slate-900" : "border-gray-300"
        } border-dashed rounded-lg cursor-pointer bg-gray-50`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <svg
            className="w-8 h-8 mb-4 text-gray-500"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 16"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
            />
          </svg>
          <p className="mb-2 text-sm text-gray-500">
            <span className="font-semibold">Zum hochladen klicken</span> oder
            per Drag and Drop hinzufügen
          </p>
          <p className="text-xs text-gray-500">
            SVG, PNG, JPG oder GIF (MAX. 800x400px)
          </p>
          {file && (
            <p className="mt-4 text-sm font-semibold text-slate-900">
              {file.name}
            </p>
          )}
          {error && (
            <p className="mt-4 text-sm text-red-600 font-semibold">{error}</p>
          )}
        </div>
        <input
          id="dropzone-file"
          name="dropzone-file"
          type="file"
          accept=".svg,.png,.jpg,.jpeg,.gif"
          className="hidden"
          onChange={handleFileChange}
        />
      </label>
    </div>
  );
};

export { FileUpload };
