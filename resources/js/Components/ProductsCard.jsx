import { Link } from "@inertiajs/react";
 
const ProductsCard = ({ total }) => {
    
    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <figure className="px-10 pt-10">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-12 h-12"
                >
                    <path d="M12.378 1.602a.75.75 0 00-.756 0L3 6.632l9 5.25 9-5.25-8.622-5.03zM21.75 7.93l-9 5.25v9l8.628-5.032a.75.75 0 00.372-.648V7.93zM11.25 22.18v-9l-9-5.25v8.57a.75.75 0 00.372.648l8.628 5.033z" />
                </svg>
            </figure>
            <div className="card-body items-center text-center">
                <h2 className="card-title mb-4">Total Products</h2>
                <h2 className="card-title mb-4">{total}</h2>
                <div className="card-actions">
                    <Link href={route("product-details")}>
                        <button className="btn btn-primary">
                            Check Details
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ProductsCard;
