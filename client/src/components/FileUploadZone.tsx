import { useRef, useState } from "react";

interface FileUploadZoneProps {
  onFileSelected: (file: File) => void;
  isLoading: boolean;
  fileName: string | null;
}

const ACCEPTED_EXTENSIONS = [".csv", ".xlsx", ".xls"];

export default function FileUploadZone({ onFileSelected, isLoading, fileName }: FileUploadZoneProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFile(file: File | undefined) {
    if (!file) return;
    const hasValidExtension = ACCEPTED_EXTENSIONS.some((ext) =>
      file.name.toLowerCase().endsWith(ext)
    );
    if (!hasValidExtension) return;
    onFileSelected(file);
  }

  return (
    <div
      onClick={() => !isLoading && inputRef.current?.click()}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragOver(true);
      }}
      onDragLeave={() => setIsDragOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setIsDragOver(false);
        if (!isLoading) handleFile(e.dataTransfer.files[0]);
      }}
      className={`flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed px-4 py-8 text-center transition ${
        isDragOver ? "border-emerald-500 bg-emerald-50" : "border-slate-300 hover:border-emerald-400"
      } ${isLoading ? "cursor-not-allowed opacity-60" : ""}`}
    >
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED_EXTENSIONS.join(",")}
        className="hidden"
        disabled={isLoading}
        onChange={(e) => handleFile(e.target.files?.[0])}
      />
      <p className="font-medium text-slate-700">
        {isLoading
          ? "Analyzing…"
          : fileName
          ? `Uploaded: ${fileName}`
          : "Drag & drop a reviews CSV or XLSX file, or click to browse"}
      </p>
      <p className="mt-1 text-sm text-slate-400">Accepts .csv, .xlsx, .xls</p>
    </div>
  );
}
