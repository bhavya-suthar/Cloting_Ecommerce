import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useEffect, useRef } from "react";
import { Button } from "../ui/button";
import axios from "axios";
import { Skeleton } from "../ui/skeleton";

function ProductImageUpload({
  imageFile,
  setImageFile,
  uploadedImageUrl,
  setUploadedImageUrl,
  setImageLoadingState,
  imageLoadingState,
  isEditMode
}) {
  console.log("🚀 ~ isEditMode:", isEditMode)
  const inputRef = useRef(null);
  console.log("🚀 ~ inputRef:", inputRef);

  function handleFileChange(event) {
    console.log(event.target.files);
    const selectedFile = event.target.files?.[0];
    if (selectedFile) setImageFile(selectedFile);
  }

  function handleDragOver(event) {
    event.preventDefault();
  }

  function handleDrop(event) {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files?.[0];
    if (droppedFile) setImageFile(droppedFile);
  }

  function handleRemoveImage(event) {
    event.stopPropagation(); // Prevents triggering file selection

    setImageFile(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  console.log(imageFile);

  async function uploadImageToCloudinary() {
    setImageLoadingState(true);
    const data = new FormData();
    data.append("my_file", imageFile);
    console.log("🚀 ~ uploadImageToCloudinary ~ data:", data);

    const response = await axios.post(
      "http://localhost:5000/api/admin/products/upload-image",
      data
    );
    console.log("🚀 ~ uploadImageToCloudinary ~ response:", response);
    if (response?.data?.success) {
      setUploadedImageUrl(response.data.result.url); setImageLoadingState(false);
    }
  }

  useEffect(() => {
    if (imageFile !== null) uploadImageToCloudinary();
  }, [imageFile]);

  return (
    <div className="w-full max-w-md mx-auto mt-4">
      <Label className="text-lg font-semibold mb-2 block">Upload Image</Label>
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`${isEditMode ? 'opacity-60' : ''} border-2 border-dashed rounded-lg p-4`}
        onClick={() => inputRef.current?.click()} // Ensures clicking opens the file dialog
      >
        <Input
          id="image-upload"
          type="file"
          className="hidden"
          ref={inputRef}
          onChange={handleFileChange}
          disabled={isEditMode}
        />
        {!imageFile ? (
          <Label
            hrmlFor="image-upload"
            className={`${isEditMode ? 'cursor-not-allowed' : ''} flex flex-col items-center justify-center h-32 cursor-pointer`}
          >
            <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />
            <span>Drag & Drop or Click to upload Image</span>
          </Label>
        ) : (
          imageLoadingState ? <Skeleton className='h-10 bg-gray-100'/>:
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FileIcon className="w-8 h-8 text-primary mr-2" />
            </div>
            <p className="text-small font-medium">{imageFile.name}</p>
            <Button
              varient="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground"
              onClick={handleRemoveImage}
            >
              <XIcon className="w-4 h-4" />
              <span className="sr-only">Remove File</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductImageUpload;
