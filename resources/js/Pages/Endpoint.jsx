import { Link } from "@inertiajs/react";

export default function Endpoint(props) {
    console.log(props)
    return (
        <>
            <div className="flex justify-center items-center w-full min-h-screen">
                <div className="flex flex-col text-center items-center justify-center p-5">
                    <h1 className="text-xl">Thank you</h1>
                    <p className="text-md">Your payment is successful</p>
                    <Link className=" underline link text-blue-500 hover:text-white" href='http://localhost:8000/'>Get Back</Link>
                </div>
            </div>
        </>
    );
}
