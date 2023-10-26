export default function Cart(props) {
    console.log(props);
    return (
        <>
            {props.cart.map((data, i) => {
                return (
                    <div className="card card-side bg-base-100 shadow-xl" key={i}>
                        <figure>
                            <img
                                src="/images/stock/photo-1635805737707-575885ab0820.jpg"
                                alt="Movie"
                            />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">
                                {data.product_name}
                            </h2>
                            <p>{data.price}</p>
                            <p>{data.quantity}</p>
                            <div className="card-actions justify-end">
                                <button className="btn btn-primary">
                                    Watch
                                </button>
                            </div>
                        </div>
                    </div>
                );
            })}
        </>
    );
}
