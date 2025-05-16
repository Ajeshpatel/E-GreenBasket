import { useParams } from "react-router-dom";
import ProductDetail from "../components/ProductDetails";

const ProductPage = () => {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-indigo-100">
      <div className="container mx-auto px-4 py-4  ">
        <ProductDetail />
      </div>
    </div>
  );
};

export default ProductPage;