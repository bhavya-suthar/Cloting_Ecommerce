import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useRef } from "react";

function ProductImageUpload({imageFile,setImageFile,uploadedImageUrl, setUploadedUrl}) {

    const inputRef = useRef(null)

    function handleFileChange(event){
        console.log(event.target.files);
        
    }

    return ( 
        <div className="w-full max-w-md  mx-auto">
            <Label className="text-lg font-semibold mb-2 block">Upload Image</Label>
            <div>
                <Input id="iamge-upload" type='file' className="hidden" ref={inputRef} onChange={handleFileChange}/>
            </div>
        </div>
     );
}

export default ProductImageUpload;