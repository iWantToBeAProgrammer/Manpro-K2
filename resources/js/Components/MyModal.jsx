import { Link } from "@inertiajs/react";
import { router } from "@inertiajs/react";
import { useState } from "react";

const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");
    const [isNotif, setIsNotif] = useState(false);

    const handleSubmit = () => {
        const data = {
            name,
            desc,
            category,
            price,
            stock,
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
        router.post(route("product-post"), data);
    };

const MyModal = () => {
    return (
        <>
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
        </>
    );
};

export default MyModal;
