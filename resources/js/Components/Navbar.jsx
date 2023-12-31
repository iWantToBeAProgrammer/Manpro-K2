import { Link, router } from "@inertiajs/react";
import axios from "axios";
import { useEffect, useState } from "react";

const Navbar = ({ title, user, cart }) => {

    console.log(cart)
    const [image, setImage] = useState("");

    let totalItems = 0;

    if (cart) {
        if (Array.isArray(cart)) {
            if (cart != null) {
                Array.from(cart).forEach((element) => {
                    totalItems += element.product_qty;
                });
            }
        } else {
            totalItems = cart;
        }
    } else {
        totalItems == 0
    }

    const handleSubmit = () => {
        const data = {
            image,
        };
        setImage("");
        router.post(route("profile.image", user.id), data);
    };

    var getInitials = function (name) {
        var parts = name.split(" ");
        var initials = "";
        for (var i = 0; i < parts.length; i++) {
            if (parts[i].length > 0 && parts[i] !== "") {
                initials += parts[i][0];
            }
        }
        return initials;
    };
    return (
        <div className="navbar bg-base-100 py-4">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost btn-circle">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h7"
                            />
                        </svg>
                    </label>
                    {title == "Admin Dashboard" ? (
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                        >
                            <li>
                                <Link href={route("home")}>Homepage</Link>
                            </li>
                            <li>
                                <Link href={route("product-details")}>
                                    Products
                                </Link>
                            </li>
                            <li>
                                <Link href={route("user-details")}>User</Link>
                            </li>
                        </ul>
                    ) : (
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                        >
                            <li>
                                <Link href={route("index")}>Homepage</Link>
                            </li>
                            <li>
                                <Link href={route("index.products")}>
                                    Products
                                </Link>
                            </li>
                            <li className="md:hidden flex">
                                <Link href={route("cart")}>Cart</Link>
                            </li>
                        </ul>
                    )}
                </div>
            </div>

            {title == "Admin Dashboard" ? (
                <div className="navbar-center">
                    <Link
                        href={route("home")}
                        className="btn btn-ghost normal-case text-2xl"
                    >
                        {title}
                    </Link>
                </div>
            ) : (
                <div className="navbar-center">
                    <Link
                        href={route("index")}
                        className="btn btn-ghost normal-case text-2xl"
                    >
                        {title}
                    </Link>
                </div>
            )}

            <div className="navbar-end">
                {title != "Admin Dashboard" ? (
                    <Link
                        href={route("cart")}
                        className="btn me-8 md:flex hidden"
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
                                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                            />
                        </svg>

                        <div className="badge badge-secondary">
                            {totalItems}
                        </div>
                    </Link>
                ) : (
                    <></>
                )}
                {user != null ? (
                    <div className="flex items-center gap-5">
                        <button
                            className="btn-primary btn rounded-lg"
                            onClick={() => router.post(route("logout"))}
                        >
                            Sign Out
                        </button>
                        <div className="avatar placeholder me-8">
                            <div className="bg-neutral-focus text-neutral-content rounded-full w-12">
                                <button
                                    className="btn btn-ghost btn-circle p-4 relative"
                                    onClick={() => {
                                        window.my_modal_1.show();
                                    }}
                                >
                                    {user.profile != null ? (
                                        <img
                                            src={`http://localhost:8000/storage/${user.profile}`}
                                            className="absolute"
                                            alt=""
                                        />
                                    ) : (
                                        <span>{getInitials(user.name)}</span>
                                    )}
                                </button>
                            </div>
                        </div>

                        <dialog
                            id="my_modal_1"
                            className="modal modal-bottom sm:modal-middle"
                        >
                            <form
                                method="dialog"
                                className="modal-box flex justify-between h-80 overflow-hidden m-0 p-0"
                            >
                                <div className="ms-4 mt-8">
                                    <h3 className="font-bold text-lg">
                                        Name: {user.name}
                                    </h3>
                                    <h3 className="font-bold text-lg py-4">
                                        Email: {user.email}
                                    </h3>
                                    <Link
                                        href={route("profile.edit")}
                                        className="link link-secondary"
                                    >
                                        Edit Profile
                                    </Link>
                                </div>
                                <div className="h-full object-fill object-center flex items-center flex-col relative">
                                    <label
                                        htmlFor="fileInput"
                                        className="cursor-pointer"
                                    >
                                        {user.profile != null ? (
                                            <img
                                                src={`http://localhost:8000/storage/${user.profile}`}
                                                alt=""
                                                width={250}
                                            />
                                        ) : (
                                            <img
                                                src={`http://localhost:8000/storage/assets/add_profile.png`}
                                                alt=""
                                                width={250}
                                            />
                                        )}
                                    </label>
                                    {image != "" && (
                                        <button
                                            className="btn btn-primary absolute bottom-2"
                                            onClick={() => handleSubmit()}
                                        >
                                            Submit
                                        </button>
                                    )}
                                    <input
                                        type="file"
                                        id="fileInput"
                                        className="hidden"
                                        name="image"
                                        onChange={(image) =>
                                            setImage(image.target.files[0])
                                        }
                                    />
                                </div>
                            </form>
                            <form method="dialog" className="modal-backdrop">
                                <button>close</button>
                            </form>
                        </dialog>
                    </div>
                ) : (
                    <div className="flex items-center gap-5">
                        <button
                            className="btn-primary btn rounded-lg me-8"
                            onClick={() =>
                                (window.location.href = route("login"))
                            }
                        >
                            Sign In
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
