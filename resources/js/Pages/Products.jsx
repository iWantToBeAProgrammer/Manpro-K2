import Card from "@/Components/Card";
import Navbar from "@/Components/Navbar";

export default function Products(props) {

    return (
        <>
            <Navbar title='Dashboard' user={props.auth.user} cart={props.cart.data}/>
            <div className="container-sm min-h-screen mx-auto px-12">
                <h1 className="text-2xl font-bold">Our Products</h1>
                <div className="flex justify-around mt-12 flex-wrap">
                    <Card props={props} />
                </div>
                <div className="flex justify-center mt-12">
                    <button
                        className="btn btn-wide btn-primary"
                        onClick={() => window.location.href = route('index')}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                            />
                        </svg>
                        Back
                    </button>
                </div>
            </div>
        </>
    );
}
