import { useRef, useState } from "react";

interface FileUploadZoneProps {
  onFileSelected: (file: File) => void;
  isLoading: boolean;
  fileName: string | null;
}

const ACCEPTED_EXTENSIONS = [".csv", ".xlsx", ".xls"];

export default function FileUploadZone({ onFileSelected, isLoading, fileName }: FileUploadZoneProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [rejectionMessage, setRejectionMessage] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFile(file: File | undefined) {
    console.log("[FileUploadZone] handleFile called with:", file?.name, file?.size, file?.type);
    if (!file) {
      console.log("[FileUploadZone] no file present, aborting");
      return;
    }
    const hasValidExtension = ACCEPTED_EXTENSIONS.some((ext) =>
      file.name.toLowerCase().endsWith(ext)
    );
    if (!hasValidExtension) {
      const message = `"${file.name}" isn't a .csv, .xlsx, or .xls file.`;
      console.warn(`[FileUploadZone] rejected: ${message}`);
      setRejectionMessage(message);
      return;
    }
    console.log("[FileUploadZone] extension OK, calling onFileSelected");
    setRejectionMessage(null);
    onFileSelected(file);
  }

  return (
    <div
      onClick={() => {
        console.log("[FileUploadZone] zone clicked, isLoading:", isLoading);
        if (!isLoading) inputRef.current?.click();
      }}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragOver(true);
      }}
      onDragLeave={() => setIsDragOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setIsDragOver(false);
        console.log("[FileUploadZone] onDrop fired, files:", e.dataTransfer.files.length);
        if (!isLoading) handleFile(e.dataTransfer.files[0]);
      }}
      className={`flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed px-6 py-12 text-center transition ${
        isDragOver ? "border-accent bg-accent-soft" : "border-line hover:border-accent/50"
      } ${isLoading ? "cursor-not-allowed opacity-60" : ""}`}
    >
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED_EXTENSIONS.join(",")}
        className="hidden"
        disabled={isLoading}
        onChange={(e) => {
          console.log("[FileUploadZone] onChange fired, files:", e.target.files?.length);
          handleFile(e.target.files?.[0]);
          // Reset so selecting the same file again still fires a change event.
          e.target.value = "";
        }}
      />
      <p className="text-ink">
        {isLoading
          ? "Analyzing…"
          : fileName
          ? `Uploaded: ${fileName}`
          : "Drag & drop a reviews CSV or XLSX file, or click to browse"}
      </p>
      <p className="mt-2 text-sm text-muted">Accepts .csv, .xlsx, .xls</p>
      {rejectionMessage && <p className="mt-3 text-sm text-danger">{rejectionMessage}</p>}
    </div>
  );
}
