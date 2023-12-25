import { Head } from "@inertiajs/react";
import { Link } from "@inertiajs/react";
import Navbar from "@/Components/Navbar";
import Paginator from "@/Components/Paginator";
import { useEffect, useState } from "react";
import { router, useForm, usePage } from "@inertiajs/react";
import axios from "axios";
import Swal from "sweetalert2";

export default function ProductDetails(props) {
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");
    const [image, setImage] = useState("");
    const [weight, setWeight] = useState("");
    const [isOpen, setIsOpen] = useState("");
    const [isNotif, setIsNotif] = useState(false);

    const confirm = (action, id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            background: "#333",
            color: "#fff",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                action == "product-delete" &&
                    Swal.fire({
                        title: "Product has been deleted",
                        icon: "success",
                        background: "#333",
                        color: "#fff",
                    });
                window.location.href = route(action, id);
            }
        });
    };

    const handleSubmit = () => {
        const data = {
            name,
            desc,
            category,
            price,
            stock,
            weight,
            image,
        };

        setIsNotif(true);
        setTimeout(() => {
            setIsNotif(false);
        }, 3000);
        setName("");
        setDesc("");
        setCategory("");
        setPrice("");
        setStock("");
        setImage("");
        setWeight("");
        router.post(route("product-post"), data);
    };

    const handleUpdate = () => {
        const data = {
            id,
            name,
            desc,
            category,
            price,
            stock,
            weight,
            image,
        };
        setIsNotif(true);
        setTimeout(() => {
            setIsNotif(false);
        }, 3000);
        setName("");
        setDesc("");
        setCategory("");
        setPrice("");
        setStock("");
        setWeight("");
        router.post(route("product-update", id), data);
    };

    const Rupiah = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: "0",
    });

    return (
        <>
            <Head title="product-details" />
            <Navbar title="Admin Dashboard" user={props.auth.user} />
            <div>
                {isNotif && (
                    <div className="alert alert-success">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="stroke-current shrink-0 h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        <span>{props.flash.message}</span>
                    </div>
                )}
            </div>

            <div className="m-2">
                <button
                    className="btn btn-primary"
                    onClick={() => window.my_modal_5.showModal()}
                >
                    New Product
                </button>
                <dialog
                    id="my_modal_5"
                    className="modal modal-bottom sm:modal-middle"
                >
                    <form
                        className="modal-box flex flex-col gap-4 items-center"
                        method="dialog"
                    >
                        <input
                            type="text"
                            placeholder="Product Name"
                            className="input input-bordered input-primary w-full max-w-xs"
                            onChange={(name) => setName(name.target.value)}
                            value={name}
                        />
                        <input
                            type="text"
                            placeholder="Product Desc"
                            className="input input-bordered input-primary w-full max-w-xs"
                            onChange={(desc) => setDesc(desc.target.value)}
                            value={desc}
                        />
                        <input
                            type="text"
                            placeholder="Category"
                            className="input input-bordered input-primary w-full max-w-xs"
                            onChange={(category) =>
                                setCategory(category.target.value)
                            }
                            value={category}
                        />
                        <input
                            type="number"
                            min="1"
                            step="any"
                            placeholder="Price"
                            className="input input-bordered input-primary w-full max-w-xs"
                            onChange={(price) => setPrice(price.target.value)}
                            value={price}
                        />
                        <input
                            type="number"
                            min="0"
                            placeholder="Stock"
                            className="input input-bordered input-primary w-full max-w-xs"
                            onChange={(stock) => setStock(stock.target.value)}
                            value={stock}
                        />
                        <input
                            type="number"
                            min="0"
                            step="0.01"
                            placeholder="Weight"
                            className="input input-bordered input-primary w-full max-w-xs"
                            onChange={(weight) =>
                                setWeight(weight.target.value)
                            }
                            value={weight}
                        />
                        <input
                            type="file"
                            className="file-input file-input-bordered file-input-primary w-full max-w-xs"
                            label="Image"
                            name="image"
                            onChange={(image) =>
                                setImage(image.target.files[0])
                            }
                        />
                        <button
                            className="input btn btn-primary w-full max-w-xs"
                            onClick={() => handleSubmit()}
                        >
                            Submit
                        </button>
                    </form>
                    <form method="dialog" className="modal-backdrop">
                        <button>close</button>
                    </form>
                </dialog>
            </div>

            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Product id</th>
                            <th>Product Name</th>
                            <th>Product Desc</th>
                            <th>Product Category</th>
                            <th>Product Price</th>
                            <th>Product Weight</th>
                            <th>Product Image</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.products.data.map((data, i) => {
                            return (
                                <tr className="hover" key={i}>
                                    <th>{data.id}</th>
                                    <td>{data.product_name}</td>
                                    <td>{data.product_desc}</td>
                                    <td>{data.category}</td>
                                    <td>{Rupiah.format(data.price)}</td>
                                    <td>
                                        {data.weight == null ? 0 : data.weight}
                                    </td>
                                    <button
                                        onClick={() => {
                                            setIsOpen(data.image);
                                            window.my_modal_3.show();
                                        }}
                                    >
                                        {data.image == "" || !data.image ? (
                                            <img
                                                src="http://localhost:8000/storage/assets/No_Image_Available.jpg"
                                                width={100}
                                                className="h-[75px] overflow-hidden"
                                            />
                                        ) : (
                                            <img
                                                src={`http://localhost:8000/storage/${data.image}`}
                                                alt=""
                                                width={100}
                                                className="h-[75px] overflow-hidden"
                                            />
                                        )}
                                    </button>
                                    <td>
                                        <button
                                            className="btn btn-outline btn-success"
                                            onClick={() => {
                                                axios
                                                    .get(
                                                        `http://localhost:8000/admin/product/edit/${data.id}`
                                                    )
                                                    .then((response) => {
                                                        setId(
                                                            response.data
                                                                .product.id
                                                        );
                                                        setName(
                                                            response.data
                                                                .product
                                                                .product_name
                                                        );
                                                        setDesc(
                                                            response.data
                                                                .product
                                                                .product_desc
                                                        );
                                                        setCategory(
                                                            response.data
                                                                .product
                                                                .category
                                                        );
                                                        setPrice(
                                                            response.data
                                                                .product.price
                                                        );
                                                        setStock(
                                                            response.data
                                                                .product.stock
                                                        );
                                                        setWeight(
                                                            response.data
                                                                .product.weight
                                                        );
                                                        setImage(
                                                            response.data
                                                                .product.image
                                                        );
                                                    });
                                                window.my_modal_4.show();
                                            }}
                                            method="get"
                                        >
                                            Edit Product
                                        </button>
                                    </td>
                                    <td>
                                        <button
                                            className="btn btn-outline btn-error"
                                            onClick={() =>
                                                confirm(
                                                    "product-delete",
                                                    data.id
                                                )
                                            }
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <dialog
                    id="my_modal_4"
                    className="modal modal-bottom sm:modal-middle"
                >
                    <form
                        className="modal-box flex flex-col gap-4 items-center"
                        method="dialog"
                    >
                        <h1>Update Product</h1>
                        <input
                            type="text"
                            placeholder="Product Name"
                            className="input input-bordered input-primary w-full max-w-xs"
                            onChange={(name) => setName(name.target.value)}
                            value={name}
                        />
                        <input
                            type="text"
                            placeholder="Product Desc"
                            className="input input-bordered input-primary w-full max-w-xs"
                            onChange={(desc) => setDesc(desc.target.value)}
                            value={desc}
                        />
                        <input
                            type="text"
                            placeholder="Category"
                            className="input input-bordered input-primary w-full max-w-xs"
                            onChange={(category) =>
                                setCategory(category.target.value)
                            }
                            value={category}
                        />
                        <input
                            type="number"
                            min="1"
                            step="any"
                            placeholder="Price"
                            className="input input-bordered input-primary w-full max-w-xs"
                            onChange={(price) => setPrice(price.target.value)}
                            value={price}
                        />
                        <input
                            type="number"
                            min="0"
                            placeholder="Stock"
                            className="input input-bordered input-primary w-full max-w-xs"
                            onChange={(stock) => setStock(stock.target.value)}
                            value={stock}
                        />
                        <input
                            type="number"
                            min="0"
                            step="0.01"
                            placeholder="Weight"
                            className="input input-bordered input-primary w-full max-w-xs"
                            onChange={(weight) =>
                                setWeight(weight.target.value)
                            }
                            value={weight}
                        />
                        <input
                            type="file"
                            className="file-input file-input-bordered file-input-primary w-full max-w-xs"
                            label="Image"
                            name="image"
                            onChange={(image) =>
                                setImage(image.target.files[0])
                            }
                        />
                        <button
                            className="input btn btn-primary w-full max-w-xs"
                            onClick={() => handleUpdate()}
                        >
                            Submit
                        </button>
                    </form>
                    <form method="dialog" className="modal-backdrop">
                        <button
                            onClick={() => {
                                setName("");
                                setDesc("");
                                setCategory("");
                                setPrice("");
                                setStock("");
                                setWeight("");
                            }}
                        >
                            close
                        </button>
                    </form>
                </dialog>
                {isOpen != "" ? (
                    <dialog
                        id="my_modal_3"
                        className="modal modal-bottom sm:modal-middle"
                    >
                        <form method="dialog" className="modal-box">
                            <img
                                src={`http://localhost:8000/storage/${isOpen}`}
                                alt=""
                            />
                        </form>
                        <form method="dialog" className="modal-backdrop">
                            <button
                                onClick={() => {
                                    setIsOpen("");
                                }}
                            >
                                close
                            </button>
                        </form>
                    </dialog>
                ) : (
                    <dialog
                        id="my_modal_3"
                        className="modal modal-bottom sm:modal-middle"
                    >
                        <form method="dialog" className="modal-box">
                            <img
                                src={`http://localhost:8000/storage/assets/No_Image_Available.jpg`}
                                alt=""
                            />
                        </form>
                        <form method="dialog" className="modal-backdrop">
                            <button
                                onClick={() => {
                                    setIsOpen("");
                                }}
                            >
                                close
                            </button>
                        </form>
                    </dialog>
                )}
            </div>
            <div className="flex justify-center gap-2">
                <Paginator meta={props.products.meta} />
            </div>
        </>
    );
}
