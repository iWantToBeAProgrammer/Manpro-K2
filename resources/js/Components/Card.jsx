import { router } from "@inertiajs/react";
import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";

const Card = ({ props }) => {
    const Rupiah = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: "0",
    });

    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");
    const [cartImage, setCartImage] = useState("");
    const [num, setNum] = useState(1);

    let handleIncrement = () => {
        if(num < 10 ) {
            setNum(Number(num)+1)
        }
    } 

    let handleDecerement = () => {
        if(num > 0) {
            setNum(num - 1)
        }
    }

    let handleChange = (e) => {
        setNum(e.target.value)
    }

    const addToCart = () => {
        const data = {
            id: id,
            quantity: num,
        }

        console.log(props)
        axios.get('http://localhost:8000/add-to-cart', data).then((response) => {
           if(response.status === 200) {
            Swal.fire('Product Added To Cart');
           }
        })

        props.auth.user == null
            ? router.get(route("login"), {message: 'Please login before buying anything'})
            : router.get(route("add-to-cart", props.auth.user.id), data);
    };

    return (
        <>
            {props.products.data.map((data, i) => {
                return (
                    <div
                        className="card w-80 bg-base-100 shadow-xl mt-8"
                        key={i}
                    >
                        <figure className="">
                            {data.image == null || data.image == "" ? (
                                <img
                                    src="http://localhost:8000/storage/assets/No_Image_Available.jpg"
                                    width={100}
                                    className="w-80 h-80"
                                />
                            ) : (
                                <img
                                    src={`http://localhost:8000/storage/${data.image}`}
                                    alt=""
                                    width={100}
                                    className="w-80 h-80"
                                />
                            )}
                        </figure>
                        <div className="card-body">
                            <div className="card-title font-light">
                                {data.product_name}
                            </div>
                            <p className="text-2xl font-semibold">
                                {Rupiah.format(data.price)}
                            </p>
                            <div className="card-actions justify-end">
                                <button
                                    className="btn btn-primary"
                                    onClick={() => {
                                        setId(data.id);
                                        setName(data.product_name);
                                        setDesc(data.product_desc);
                                        setCategory(data.category);
                                        setPrice(data.price);
                                        setStock(data.stock);
                                        setCartImage(data.image);
                                        window.cart.show();
                                    }}
                                >
                                    Buy Now
                                </button>
                            </div>
                        </div>
                    </div>
                );
            })}
            <dialog id="cart" className="modal modal-bottom sm:modal-middle">
                <form method="dialog" className=" modal-box">
                    <div className="w-[100%] flex justify-between">
                        <div className="me-8">
                            {cartImage == "" || cartImage == null ? (
                                <img
                                    src={`http://localhost:8000/storage/assets/No_Image_Available.jpg`}
                                    alt=""
                                    className=" w-full h-[220px] object-fill object-center"
                                />
                            ) : (
                                <img
                                    src={`http://localhost:8000/storage/${cartImage}`}
                                    alt=""
                                    className=" w-full h-[220px] object-fill object-center"
                                />
                            )}
                        </div>
                        <div className="">
                            <h3 className="font-bold text-lg">
                                Product name: {name}
                            </h3>
                            <p className="py-2">Product desc: {desc}</p>
                            <p className="py-2">Category: {category}</p>
                            <p className="py-2">
                                Price: {Rupiah.format(price)}
                            </p>
                            <p>Stock: {stock}</p>
                        </div>
                    </div>
                    <div className="modal-action">
                        <div className="input-group flex items-center">
                            <button className="input-group-text btn" type="button" onClick={handleDecerement}>-</button>
                            <input type="text" className="input input-bordered w-[50px] max-w-xs " onChange={handleChange} value={num}/>
                            <button className="input-group-text btn" type="button" onClick={handleIncrement}>+</button>

                        </div>
                        <button
                            className="btn btn-primary"
                            onClick={() => addToCart()}
                        >
                            Add to cart
                        </button>
                    </div>
                </form>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </>
    );
};

export default Card;
