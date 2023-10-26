import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import Navbar from "@/Components/Navbar";
import ProductsCard from "@/Components/ProductsCard";
import UsersCard from "@/Components/UsersCard";
import Paginator from "@/Components/Paginator";
export default function Admin(props) {
    return (
        <>
            <Navbar title="Admin Dashboard" user={props.auth.user}/>
            <Head title="Admin" />
                <div className="flex justify-evenly gap-4 flex-wrap mt-16">
                    <ProductsCard total={props.total_produk} />
                    <UsersCard total={props.total}/>
                </div>
        </>
    );
}