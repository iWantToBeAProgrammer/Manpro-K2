import { Head } from "@inertiajs/react";
import { Link } from "@inertiajs/react";
import Navbar from "@/Components/Navbar";
import Paginator from "@/Components/Paginator";
import Swal from "sweetalert2";

export default function UserDetails(props) {
    let id =
        (props.users.meta.current_page - 1) * props.users.meta.per_page + 1;

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
                action == "delete"
                    ? Swal.fire({
                          title: "User has been deleted",
                          icon: "success",
                          background: "#333",
                          color: "#fff",
                      })
                    : Swal.fire({
                        title: "This user now an admin",
                        icon: "success",
                        background: "#333",
                        color: "#fff",
                    })
                window.location.href = route(action, id);
            }
        });
    };

    return (
        <>
            <Head title="user-details" />
            <Navbar title="Admin Dashboard" user={props.auth.user}/>
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Created at</th>
                            <th>Updated at</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.users.data.map((data, i) => {
                            return (
                                <tr className="hover" key={i}>
                                    <th>{id++}</th>
                                    <td>{data.name}</td>
                                    <td>{data.email}</td>
                                    <td>{data.created_at}</td>
                                    <td>{data.updated_at}</td>
                                    <td>
                                        <button
                                            className="btn btn-outline btn-success"
                                            onClick={() =>
                                                confirm("make-admin", data.id)
                                            }
                                        >
                                            Make Admin
                                        </button>
                                    </td>
                                    <td>
                                        <button
                                            className="btn btn-outline btn-error"
                                            onClick={() =>
                                                confirm("delete", data.id)
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
            </div>
            <div className="flex justify-center gap-2">
                <Paginator meta={props.users.meta} />
            </div>
        </>
    );
}
