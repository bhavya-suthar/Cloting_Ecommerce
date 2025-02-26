import ProductImageUpload from "@/components/admin-view/image-upload";
import AdminProductTile from "@/components/admin-view/product-tile";
import CommonForm from "@/components/common/form";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { addProductFormElements } from "@/config";
import { useToast } from "@/hooks/use-toast";
import {
  addNewProduct,
  deleteProduct,
  editProduct,
  fetchAllProduct,
} from "@/store/admin/products-slice";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const initialFormData = {
  image: null,
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salePrice: "",
  totalStock: "",
};

function AdminProducts() {
  const [openCreateProductsDialog, setOpenCreateProductsDialog] =
    useState(false);

  const [formData, setFormData] = useState(initialFormData);
  console.log("🚀 ~ AdminProducts ~ formData:", formData);
  const [imageFile, setImageFile] = useState(null);
  console.log("🚀 ~ AdminProducts ~ imageFile:", imageFile);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  console.log("🚀 ~ AdminProducts ~ uploadedImageUrl:", uploadedImageUrl);
  const [imageLoadingState, setImageLoadingState] = useState(false);

  const [currentEditedId, setCurrentEditedId] = useState(null);
  console.log("🚀 ~ AdminProducts ~ currentEditedId:", currentEditedId);

  const dispatch = useDispatch();
  const { productList } = useSelector((state) => state.adminProducts);
  console.log("🚀 ~ AdminProducts ~ productList:", productList);
  const { toast } = useToast();

  const onSubmit = (event) => {
    event.preventDefault();

    currentEditedId !== null
      ? dispatch(editProduct({ id: currentEditedId, formData })).then(
          (data) => {
            console.log("editing product...", data);
            if (data?.payload?.success) {
              dispatch(fetchAllProduct());
              setOpenCreateProductsDialog(false);
              setFormData(initialFormData);
              setCurrentEditedId(null);
            }
          }
        )
      : dispatch(
          addNewProduct({
            ...formData,
            image: uploadedImageUrl,
          })
        ).then((data) => {
          console.log("🚀 ~ onSubmit ~ data:", data);
          if (data?.payload?.success) {
            dispatch(fetchAllProduct());
            setOpenCreateProductsDialog(false);
            setImageFile(null);
            setFormData(initialFormData);
            toast({
              title: "Product Added Successfully!!",
            });
          }
        });
  };

  function isFormValid() {
    return Object.keys(formData)
      .map((key) => formData[key] !== "")
      .every((item) => item);
  }

  function handleDelete(getCurrentProductId) {
    console.log(
      "🚀 ~ handleDelete ~ getCurrentProductId:",
      getCurrentProductId
    );
    dispatch(deleteProduct(getCurrentProductId)).then((data)=>{
      if(data?.payload?.success){
        dispatch(fetchAllProduct())
      }
    })
  }

  useEffect(() => {
    dispatch(fetchAllProduct());
  }, [dispatch]);

  return (
    <Fragment>
      <div className="mb-5 w-full flex justify-end">
        <Button onClick={() => setOpenCreateProductsDialog(true)}>
          Add New Product
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {productList && productList.length > 0
          ? productList.map((productItem) => (
              <AdminProductTile
                product={productItem}
                setFormData={setFormData}
                setOpenCreateProductsDialog={setOpenCreateProductsDialog}
                setCurrentEditedId={setCurrentEditedId}
                handleDelete={handleDelete}
              />
            ))
          : null}
      </div>
      <Sheet
        open={openCreateProductsDialog}
        onOpenChange={() => {
          setOpenCreateProductsDialog(false);
          setCurrentEditedId(null);
          setFormData(initialFormData);
        }}
      >
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>
              {currentEditedId !== null ? "Edit Product" : " Add New Product"}
            </SheetTitle>
          </SheetHeader>
          <ProductImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            setImageLoadingState={setImageLoadingState}
            imageLoadingState={imageLoadingState}
            isEditMode={currentEditedId !== null}
          />
          <div className="py-6">
            <CommonForm
              onSubmit={onSubmit}
              formData={formData}
              setFormData={setFormData}
              buttonText={currentEditedId !== null ? "Edit" : "Add"}
              formControls={addProductFormElements}
              isBtnDisabled={!isFormValid()}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
}

export default AdminProducts;
