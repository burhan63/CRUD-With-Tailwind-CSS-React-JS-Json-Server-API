import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";

function TodoTableComponent() {
    const navigate = useNavigate();
    const [Todolistdata, setTodolistData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [recordToDelete, setRecordToDelete] = useState(null);
    const [notification, setnotification] = useState({
        show: false,
        message: "",
        type: ""
    });



    useEffect(() => {
        TodoList();
    }, []);

    const TodoList = async () => {
        const url = "http://localhost:3000/TODO_List";
        let response = await fetch(url);
        let todo_List = response = await response.json();
        setTodolistData(todo_List);
        setLoading(false);
    }

    const handleDeleteClick = (item) => {
        setRecordToDelete(item);
        setShowModal(true);
    };

    const showNotification = (message, type) => {
        setnotification({
            show: true,
            message,
            type,
        });

        setTimeout(() => {
            setnotification({ show: false, message: "", type: "" });
        }, 3000);
    };

    const confirmDelete = async () => {
        const url = "http://localhost:3000/TODO_List";

        try {
            const response = await fetch(
                `${url}/${recordToDelete.id}`,
                { method: 'DELETE' }
            );

            if (!response.ok) {
                showNotification("Failed to delete record!", "error");
                return;
            }

            showNotification("Record deleted successfully!", "success");
            setShowModal(false);
            setRecordToDelete(null);
            TodoList(); // refresh list

        } catch (error) {
            showNotification("Something went wrong!", "error");
        }
    };

    const Edit_User_Component = (id) => {
        navigate("/edit/" + id);
    }



    return (
        <div className="min-h-screen bg-white-100">

            <div className="w-full max-w-6xl p-6 mx-auto">

                {/* Page Heading */}
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">
                        Task Management
                    </h1>
                    <p className="text-gray-500 mt-1">
                        Manage your daily tasks efficiently
                    </p>
                </div>

                {/* Create Task Button */}
                <div className="mb-4 flex justify-end">
                    <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
                        <Link to="/addnew">+ Create</Link>
                    </button>
                </div>

                {/* Card */}
                <div className="bg-white shadow rounded-lg">

                    {/* Card Header */}
                    <div className="border-b px-6 py-3 bg-gray-50 rounded-t-lg">
                        <h2 className="text-center text-lg font-semibold text-gray-700">
                            Tasks List
                        </h2>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="border px-4 py-2 text-left">ID</th>
                                    <th className="border px-4 py-2 text-left">Title</th>
                                    <th className="border px-4 py-2 text-left">Description</th>
                                    <th className="border px-4 py-2 text-left">Status</th>
                                    <th className="border px-4 py-2 text-center">Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    !loading ?
                                        Todolistdata && Todolistdata.map((item) => (
                                            <tr key={item.id} className="hover:bg-gray-50">
                                                <td className="border px-4 py-2">{item.id}</td>
                                                <td className="border px-4 py-2">{item.Title}</td>
                                                <td className="border px-4 py-2">{item.Description}</td>
                                                <td className="border px-4 py-2">{item.Status}</td>
                                                <td className="border px-4 py-2 text-center space-x-2">
                                                    <button onClick={() => Edit_User_Component(item.id)} className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded">
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteClick(item)}
                                                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        )) : <h4>Data Loading...!!!</h4>
                                }
                            </tbody>

                        </table>
                        {/* Confirmation Modal */}
                        {showModal && (
                            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                                <div className="bg-white rounded-lg shadow-lg p-6 w-80">
                                    <h2 className="text-lg font-semibold mb-4">Confirm Delete</h2>
                                    <p className="mb-4">
                                        Are you sure you want to delete this record permanently?
                                    </p>
                                    <div className="flex justify-end space-x-2">
                                        <button
                                            onClick={() => setShowModal(false)}
                                            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                                        >
                                            No
                                        </button>
                                        <button
                                            onClick={confirmDelete}
                                            className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
                                        >
                                            Yes
                                        </button>

                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                </div>
            </div>
            {notification.show && (
                <div
                    className={`fixed top-5 right-5 px-5 py-3 rounded shadow-lg text-white z-50 transition-all duration-300
        ${notification.type === "success" ? "bg-green-500" : "bg-red-500"}`}
                >
                    {notification.message}
                </div>
            )}
        </div>
    );
}

export default TodoTableComponent;
