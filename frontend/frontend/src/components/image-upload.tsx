
import { useState, useCallback } from "react";
import { Upload, X, Check, Image } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";

interface ImageUploadProps {
  className?: string;
  multiple?: boolean;
  onChange?: (files: File[]) => void;
}

export function ImageUpload({ className, multiple = true, onChange }: ImageUploadProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [dragging, setDragging] = useState(false);
  const { toast } = useToast();

  const handleFilesChange = useCallback(
    (selectedFiles: FileList | null) => {
      if (!selectedFiles) return;
      
      const fileArray = Array.from(selectedFiles);
      const imageFiles = fileArray.filter(file => file.type.startsWith('image/'));
      
      if (fileArray.length !== imageFiles.length) {
        toast({
          title: "Formato inválido",
          description: "Por favor, selecione apenas arquivos de imagem.",
          variant: "destructive",
        });
      }
      
      if (!multiple && imageFiles.length > 0) {
        const singleFile = [imageFiles[0]];
        setFiles(singleFile);
        setPreviews([URL.createObjectURL(imageFiles[0])]);
        onChange?.(singleFile);
      } else {
        setFiles(prev => [...prev, ...imageFiles]);
        const newPreviews = imageFiles.map(file => URL.createObjectURL(file));
        setPreviews(prev => [...prev, ...newPreviews]);
        onChange?.([...files, ...imageFiles]);
      }
    },
    [files, multiple, onChange, toast]
  );

  const handleDrag = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragging(true);
    } else if (e.type === "dragleave") {
      setDragging(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setDragging(false);
      handleFilesChange(e.dataTransfer.files);
    },
    [handleFilesChange]
  );

  const removeFile = useCallback(
    (index: number) => {
      const newFiles = [...files];
      newFiles.splice(index, 1);
      setFiles(newFiles);
      
      const newPreviews = [...previews];
      URL.revokeObjectURL(newPreviews[index]);
      newPreviews.splice(index, 1);
      setPreviews(newPreviews);
      
      onChange?.(newFiles);
    },
    [files, previews, onChange]
  );

  return (
    <div className={className}>
      <div
        className={cn(
          "border-2 border-dashed rounded-lg p-6 transition-colors flex flex-col items-center justify-center gap-4",
          dragging ? "border-primary bg-primary/5" : "border-border",
          files.length > 0 && "mb-4"
        )}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
      >
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
          <Upload className="h-8 w-8 text-primary" />
        </div>
        <div className="text-center">
          <p className="font-medium">
            Arraste e solte imagens aqui ou{" "}
            <label
              htmlFor="file-upload"
              className="text-primary cursor-pointer hover:underline"
            >
              procure
            </label>
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            Formatos suportados: JPG, PNG, GIF (max 10MB)
          </p>
        </div>
        <input
          id="file-upload"
          type="file"
          multiple={multiple}
          accept="image/*"
          className="hidden"
          onChange={(e) => handleFilesChange(e.target.files)}
        />
      </div>

      {files.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          {previews.map((preview, index) => (
            <Card key={index} className="overflow-hidden relative group">
              <div className="absolute inset-0 bg-foreground/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-10">
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => removeFile(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <img
                src={preview}
                alt={`Preview ${index}`}
                className="w-full h-40 object-cover"
              />
              <div className="p-2 flex items-center justify-between bg-background">
                <div className="truncate text-sm">
                  {files[index].name}
                </div>
                <div className="flex items-center">
                  <Check className="h-4 w-4 text-green-500" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
