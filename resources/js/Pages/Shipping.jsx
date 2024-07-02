import { useEffect, useState } from "react";
import axios from "axios";
import { router } from "@inertiajs/react";
import Navbar from "@/Components/Navbar";

export default function Shipping(props) {
    console.log(props);

    const [provinsi, setProvinsi] = useState([]);
    const [kota, setKota] = useState([]);

    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [street, setStreet] = useState("");
    const [cityValue, setCityValue] = useState("");
    const [subdistrict, setSubdistrict] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [cost, setCost] = useState([]);
    const [shipping, setShipping] = useState(0);

    console.log(shipping);

    console.log(name, phoneNumber, street, cityValue, subdistrict, postalCode);

    const totalPrice = Number(props.price);

    const Rupiah = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: "0",
    });

    const shippingValue = (valueSelected) => {
        setShipping(valueSelected);
    };

    useEffect(() => {
        const provinsi = async () => {
            const provinsi = await axios.get(route("provinsi"));
            setProvinsi(provinsi.data.rajaongkir.results);
        };

        provinsi();
        const snapScript = "https://app.sandbox.midtrans.com/snap/snap.js";
        const clientKey = import.meta.env.MIDTRANS_CLIENT_KEY;
        const script = document.createElement("script");

        script.src = snapScript;
        script.setAttribute("data-client-key", clientKey);
        script.async = true;

        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    console.log(provinsi);

    const totalWeight = () => {
        let total = 0;

        props.cart.map((data) => {
            total += Number(data.weight);
        });

        return total;
    };

    const checkout = async () => {
        const data = {
            price: totalPrice + (totalPrice * 10) / 100 + shipping,
            username: props.auth.user.name,
            email: props.auth.user.email,
        };

        const response = await axios.post(route("checkout"), data);

        const requestData = await response.data;

        window.snap.pay(requestData.token);
    };

    const city = async (id) => {
        const response = await axios.get(route("kota", id));
        setKota(response.data.rajaongkir.results);
    };

    const getFee = async () => {
        const weight = totalWeight();

        const data = {
            name: name,
            phone: phoneNumber,
            street: street,
            city: cityValue,
            subdistrict: subdistrict,
            postalCode: postalCode,
            weight: weight,
        };

        const response = await axios.post(route("get.fee"), data);

        const requestData = await response.data.rajaongkir.results[0];

        setCost(requestData);
    };

    console.log(cost);

    return (
        <>
            <Navbar
                title="Puff Vapor"
                user={props.auth.user}
                cart={props.cart}
            />
            <div className="bg-base-100 w-full max-h-screen flex justify-center items-center">
                <div className="bg-base-300 w-[90%] min-h-[80vh] rounded-lg shadow-lg py-12 px-8 flex mt-8">
                    <div className="left w-[40%]">
                        <h1 className="title font-bold text-2xl">
                            Add Shipping Address
                        </h1>

                        <div className="kontak-wrapper mt-4">
                            <div className="label-text py-4">Kontak</div>
                            <div className="kontak flex w-full justify-between gap-8">
                                <input
                                    type="text"
                                    id="city"
                                    placeholder="Nama"
                                    className="input input-bordered input-lg w-full max-w-s"
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <input
                                    type="text"
                                    id="city"
                                    placeholder="Nomor Telepon"
                                    className="input input-bordered input-lg w-full max-w-s"
                                    onChange={(e) =>
                                        setPhoneNumber(e.target.value)
                                    }
                                />
                            </div>
                            <div className="alamat">
                                <div className="label-text py-4">Alamat</div>
                                <div className="first-row flex w-full justify-between gap-8">
                                    <select
                                        className="select select-bordered select-lg w-full max-w-s"
                                        onChange={(e) => city(e.target.value)}
                                    >
                                        <option disabled selected>
                                            Provinsi
                                        </option>
                                        {provinsi.map((data, i) => {
                                            return (
                                                <option
                                                    key={i}
                                                    value={data.province_id}
                                                >
                                                    {data.province}
                                                </option>
                                            );
                                        })}
                                    </select>
                                    <select
                                        className="select select-bordered select-lg w-full max-w-s"
                                        onChange={(e) =>
                                            setCityValue(e.target.value)
                                        }
                                    >
                                        <option disabled selected>
                                            Kota
                                        </option>
                                        {kota.map((data, i) => {
                                            return (
                                                <option
                                                    value={data.city_id}
                                                    key={i}
                                                >
                                                    {data.city_name}
                                                </option>
                                            );
                                        })}
                                    </select>
                                </div>
                                <div className="second-row flex justify-between gap-8 w-full mt-8">
                                    <input
                                        type="text"
                                        id="subdistrict"
                                        placeholder="Kecamatan"
                                        className="input input-bordered input-lg w-full max-w-s"
                                        onChange={(e) =>
                                            setSubdistrict(e.target.value)
                                        }
                                    />
                                    <input
                                        type="text"
                                        id="city"
                                        placeholder="Kode Pos"
                                        className="input input-bordered input-lg w-full max-w-s"
                                        onChange={(e) =>
                                            setPostalCode(e.target.value)
                                        }
                                    />
                                </div>
                                <textarea
                                    placeholder="Nama Jalan, Gedung, No. Rumah"
                                    className="textarea textarea-bordered textarea-lg w-full mt-8"
                                    onChange={(e) => setStreet(e.target.value)}
                                ></textarea>
                                <button
                                    className="btn btn-primary w-full h-14 mt-8 capitalize text-lg tracking-widest"
                                    onClick={() => getFee()}
                                >
                                    Konfirmasi Alamat
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="divider divider-horizontal mx-8"></div>
                    <div className="middle w-[25%] relative">
                        <h1 className="title font-bold text-2xl mb-6">
                            Order Details
                        </h1>
                        {/* ORDER DETAILS */}
                        {props.cart.map((data, i) => {
                            return (
                                <div
                                    className="order-container flex gap-6 w-full mb-4"
                                    key={i}
                                >
                                    <div className="order-img">
                                        <img
                                            src={`http://localhost:8000/storage/${data.image}`}
                                            alt=""
                                            width={100}
                                            height={100}
                                        />
                                    </div>
                                    <div className="order-details w-full">
                                        <h1 className="product-name text-lg font-semibold">
                                            {data.product_name}
                                        </h1>
                                        <h1 className="product-desc text-lg font-semibold">
                                            {data.product_desc}
                                        </h1>
                                        <div className="price-wrapper w-full flex justify-between">
                                            <div className="product-count">
                                                <span className="product-price me-6">
                                                    {Rupiah.format(data.price)}
                                                </span>
                                                <span className="product_qty">
                                                    x{data.product_qty}
                                                </span>
                                            </div>

                                            <div className="price">
                                                <h1 className="total-price">
                                                    {Rupiah.format(
                                                        data.price *
                                                            data.product_qty
                                                    )}
                                                </h1>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                        {/* Total Price */}
                        <div className="flex flex-col w-full absolute bottom-0">
                            <div className="divider"></div>
                            <div className="total-wrapper flex justify-between w-full">
                                <div className="total-desc text-lg font-semibold">
                                    <h3 className="subtotal text-lg font-semibold">
                                        Subtotal
                                    </h3>
                                    <h3 className="tax text-lg font-semibold">
                                        Tax
                                    </h3>
                                    <h3 className="shipping-fee text-lg font-semibold">
                                        Shipping Fee
                                    </h3>
                                    <h3 className="grand-total text-lg font-semibold">
                                        Total
                                    </h3>
                                </div>
                                <div className="total-value">
                                    <h3 className="subtotal-value text-lg font-semibold">
                                        {Rupiah.format(props.price)}
                                    </h3>
                                    <h3 className="tax-value text-lg font-semibold">
                                        {Rupiah.format(
                                            (props.price * 10) / 100
                                        )}
                                    </h3>
                                    <h3 className="shipping-fee-value text-lg font-semibold">
                                        {Rupiah.format(Number(shipping))}
                                    </h3>
                                    <h3 className="grand-total-value text-lg font-semibold">
                                        {Rupiah.format(
                                            totalPrice +
                                                (totalPrice * 10) / 100 +
                                                shipping
                                        )}
                                    </h3>
                                </div>
                            </div>
                            <div className="button-wrapper mt-8 flex justify-center">
                                <button
                                    className="btn btn-accent w-[60%]"
                                    onClick={() => checkout()}
                                >
                                    Checkout
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="divider divider-horizontal mx-8"></div>
                    <div className="right w-[25%]">
                        <h1 className="title font-bold text-2xl mb-6">
                            Shipping Details
                        </h1>
                        {cost.length === 0 ? (
                            <h1 className="text-xl text-center mt-64 px-8">
                                Konfirmasi alamat lalu detail pengiriman akan
                                tampil disini
                            </h1>
                        ) : (
                            cost.costs.map((data, i) => {
                                return (
                                    <button
                                        key={i}
                                        onClick={() =>
                                            shippingValue(data.cost[0].value)
                                        }
                                        className="w-full text-left flex justify-between bg-base-100 p-6 rounded-xl mb-8 items-center cursor-pointer focus:outline-none focus-within:ring focus:ring-primary"
                                    >
                                        <div className="courier w-[30%]">
                                            <h1 className="shipping-code uppercase font-bold">
                                                {cost.code}
                                            </h1>
                                            <h1 className="shipping-name">
                                                {cost.name}
                                            </h1>
                                        </div>
                                        <div className="service w-[35%]">
                                            <h1 className="shipping-service font-bold">
                                                {data.service}
                                            </h1>
                                            <h1 className="shipping-desc">
                                                {data.description}
                                            </h1>
                                        </div>
                                        <div className="cost w-[25%]">
                                            <h1 className="shipping-cost font-bold text-lg ">
                                                {Rupiah.format(
                                                    data.cost[0].value
                                                )}
                                            </h1>
                                        </div>
                                    </button>
                                );
                            })
                        )}
                    </div>
                    :
                </div>
            </div>
        </>
    );
}
