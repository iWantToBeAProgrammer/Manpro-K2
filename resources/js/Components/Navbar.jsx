import { Link, router } from "@inertiajs/react";
import { useState } from "react";

const Navbar = ({ title, user, cart }) => {
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [productId, setProductId] = useState("");
    const [image, setImage] = useState("");

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
                                <a>Products</a>
                            </li>
                            <li>
                                <a>User</a>
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
                                <a>Products</a>
                            </li>
                            <li>
                                <a>Cart</a>
                            </li>
                        </ul>
                    )}
                </div>
            </div>
            <div className="navbar-center">
                <Link
                    href={route("home")}
                    className="btn btn-ghost normal-case text-xl"
                >
                    {title}
                </Link>
            </div>
            <div className="navbar-end">
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
