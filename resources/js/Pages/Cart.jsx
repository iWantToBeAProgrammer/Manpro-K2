import Navbar from "@/Components/Navbar";
import { Link, router } from "@inertiajs/react";
import Swal from "sweetalert2";
import axios from "axios";
import { useEffect, useState } from "react";
import { Snap } from "midtrans-client";

export default function Cart(props) {
    let totalItems = 0;

    let totalPrice = 0;

    const pushState = (id, value) => {
        initialState.push({
            id: id,
            value: value,
        });
    };

    console.log(props.cart)

    let initialState = [];

    const [quantity, setQuantity] = useState(initialState);
    const [sum, setSum] = useState(initialState);

    useEffect(() => {
        const stateTotal = () => {
            const totalState = initialState
                .map((obj) => obj.value)
                .reduce((a, b) => a + b);

            setSum(totalState);
        };

        if (initialState.length != 0) {
            stateTotal();
        }
    });
    const updateQuantity = async (index, type, id) => {
        const newState = quantity.map((obj) => {
            if (obj.id === index) {
                if (type == "increment") {
                    return { ...obj, value: obj.value + 1 };
                } else {
                    return { ...obj, value: obj.value - 1 };
                }
            }

            return obj;
        });

        setQuantity(newState);

        const data = {
            quantity: newState[index].value,
        };

        const response = await axios.post(route("cart.update", id), data);
        const requestData = await response.data;

        console.log(requestData);
    };

    props.cart.forEach((element) => {
        totalItems += element.product_qty;
    });

    

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
                action == "cart.delete" &&
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

    const Rupiah = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: "0",
    });

   

    const shipping = () => {
        const data = {
            price: totalPrice
        }

        router.get(route('shipping', data))
    }

    const quantityTotal = () => {
        let total = 0;
        quantity.forEach((e) => {
            total += e.value;
        });

        return total;
    };
    return (
        <>
            <Navbar
                title="Puff Vapor"
                user={props.auth.user}
                cart={quantityTotal()}
            />
            <div className="mt-24">
                <h1 className="text-center text-3xl font-bold text-gray-400">
                    Your Cart ({quantityTotal()})
                </h1>
                <div className="overflow-x-auto mt-12">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th></th>
                                <th>Item</th>
                                <th></th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.cart.map((data, i) => {
                                pushState(i, data.product_qty);

                                let orderId = data.id;

                                totalPrice += data.price * quantity[i].value;

                                if (quantity[i].value == 0) {
                                    confirm("cart.delete", orderId);
                                }
                                return (
                                    <tr key={i}>
                                        <th className="text-lg">{i + 1}</th>
                                        <td className="">
                                            <img
                                                src={`http://localhost:8000/storage/${data.image}`}
                                                alt=""
                                                width={100}
                                            />
                                        </td>
                                        <td className="text-lg">
                                            {data.product_name}
                                        </td>
                                        <td className="text-lg">
                                            {Rupiah.format(data.price)}
                                        </td>
                                        <td className="text-xl">
                                            <div className="flex w-[50%] justify-between items-center">
                                                <button
                                                    className="input-group-text btn text-xl"
                                                    type="button"
                                                    onClick={() =>
                                                        updateQuantity(
                                                            i,
                                                            "decrement",
                                                            orderId
                                                        )
                                                    }
                                                >
                                                    -
                                                </button>{" "}
                                                <span className="font-bold mx-3">
                                                    {quantity[i].value}
                                                </span>
                                                <button
                                                    className="input-group-text btn text-xl"
                                                    type="button"
                                                    onClick={() =>
                                                        updateQuantity(
                                                            i,
                                                            "increment",
                                                            orderId
                                                        )
                                                    }
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </td>
                                        <td className="text-lg">
                                            {Rupiah.format(
                                                data.price * quantity[i].value
                                            )}
                                        </td>

                                        <td>
                                            {
                                                <button
                                                    className="btn"
                                                    onClick={() =>
                                                        confirm(
                                                            "cart.delete",
                                                            orderId
                                                        ) 
                                                    }
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        strokeWidth={1.5}
                                                        stroke="currentColor"
                                                        className="w-6 h-6 hover:scale-125 cursor-pointer"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                                        />
                                                    </svg>
                                                </button>
                                            }
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>

                    <div className="flex justify-end me-20">
                        <div className="cart-total w-[40%] flex mt-16 justify-between px-12">
                            <div className="desc w-full">
                                <h2 className="subtotal text-xl font-bold">
                                    Subtotal:
                                </h2>
                                <div className="divider"></div>
                                <h2 className="tax text-xl font-bold">Tax:</h2>
                                <div className="divider"></div>

                                <h2 className="grand-total text-xl font-bold">
                                    Grand Total:
                                </h2>
                                <div className="divider"></div>
                            </div>
                            <div className="divider"></div>

                            <div className="amount text-right">
                                <h2 className="text-xl font-bold">
                                    {Rupiah.format(totalPrice)}
                                </h2>
                                <div className="divider"></div>

                                <h2 className="text-xl font-bold">
                                    {Rupiah.format((totalPrice * 10) / 100)}
                                </h2>
                                <div className="divider"></div>

                                <h2 className="text-xl font-bold">
                                    {Rupiah.format(
                                        totalPrice + (totalPrice * 10) / 100
                                    )}
                                </h2>
                                <div className="divider"></div>

                                <button
                                    className="btn btn-primary px-16"
                                    onClick={() => shipping()}
                                >
                                    Checkout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
