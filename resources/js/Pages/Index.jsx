import Card from "@/Components/Card";
import Carousel from "@/Components/Carousel";
import Footer from "@/Components/Footer";
import Navbar from "@/Components/Navbar";
import { router } from "@inertiajs/react";

export default function Index(props) {

    return (
        <>
        
            <Navbar title='Dashboard' user={props.auth.user} cart={props.cart.data}/>
            <div className="container-sm min-h-screen mx-auto px-12">
                <Carousel />
                <section id="service" className="mt-32">
                    <div className="title-wrap w-full justify-between flex flex-wrap">
                        <div className="service-title w-[250px]">
                            <h1 className="text-2xl font-bold">
                                We provide best customer experiences
                            </h1>
                        </div>

                        <div className="service-desc p-6 border-l-2">
                            <small>
                                We ensure our customers have the best shopping
                                experience
                            </small>
                        </div>
                    </div>
                    <div className="flex justify-around">
                        <div className="card w-[24rem] mt-6">
                            <div className="card card-side bg-base-100 shadow-xl">
                                <div className="card-body">
                                    <div className="icon w-12 h-12 bg-primary rounded-lg flex justify-center items-center">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="w-8 h-8"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                    </div>
                                    <h2 className="card-title">
                                        Original Products
                                    </h2>
                                    <p>
                                        We provide money back guarantee if the
                                        product aren't original
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="card w-[24rem] mt-6">
                            <div className="card card-side bg-base-100 shadow-xl">
                                <div className="card-body">
                                    <div className="icon w-12 h-12 bg-primary rounded-lg flex justify-center items-center">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="w-8 h-8"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                                            />
                                        </svg>
                                    </div>
                                    <h2 className="card-title">
                                        Satisfaction Guarantee
                                    </h2>
                                    <p>
                                        Exchange the product you've purchased if
                                        it doesn't fit on you
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="card w-[24rem] mt-6">
                            <div className="card card-side bg-base-100 shadow-xl">
                                <div className="card-body">
                                    <div className="icon w-12 h-12 bg-primary rounded-lg flex justify-center items-center">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="w-8 h-8"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605"
                                            />
                                        </svg>
                                    </div>
                                    <h2 className="card-title">
                                        New Arrival Everyday
                                    </h2>
                                    <p className="pe-8">
                                        We updates our collection almost
                                        everyday
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="card w-[24rem] mt-6">
                            <div className="card card-side bg-base-100 shadow-xl">
                                <div className="card-body">
                                    <div className="icon w-12 h-12 bg-primary rounded-lg flex justify-center items-center">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="w-8 h-8"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                                            />
                                        </svg>
                                    </div>
                                    <h2 className="card-title">
                                        Fast & Free Shipping
                                    </h2>
                                    <p>
                                        We offer fast and free shipping to our
                                        loyal customer
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section id="products" className="mt-32">
                    <h1 className="text-2xl font-bold">Newest Products</h1>
                    <div className="flex justify-around flex-wrap mt-8">
                        <Card props={props} />
                    </div>
                </section>
                <div className="flex justify-center mt-12">
                    <button
                        className="btn btn-wide btn-primary"
                        onClick={() => router.get(route("index.products"))}
                    >
                        See More{" "}
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
                                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                            />
                        </svg>
                    </button>
                </div>
            </div>
            <div className="mt-24">
                <Footer />
            </div>
        </>
    );
}
