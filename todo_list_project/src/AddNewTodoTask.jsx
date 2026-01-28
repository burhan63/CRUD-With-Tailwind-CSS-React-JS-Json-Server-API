import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

function AddNewTaskComponent() {
    const [id, setID] = useState('');
    const [Title, setTitle] = useState('');
    const [Description, setDescription] = useState('');
    const [Status, setStatus] = useState('');
    const [notification, setnotification] = useState({
        show: false,
        message: "",
        type: ""
    });

    const navigate = useNavigate();

    const showNotification = (message, type) => {
        setnotification({
            show: true,
            message,
            type,
        });

        setTimeout(() => {
            setnotification({ show: false, message: "", type: "" });
            navigate("/");
        }, 3000);
    };

    const AddNewTask_InsertAPI = async () => {
        const url = "http://localhost:3000/TODO_List";

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id,
                    Title,
                    Description,
                    Status
                })
            });

            if (!response.ok) {
                showNotification("Failed to add record!", "error");
                return;
            }

            const data = await response.json();

            showNotification("Record added successfully!", "success");


        } catch (error) {
            console.error(error);
            showNotification("Something went wrong!", "error");
        }
    };

    // useEffect(() => {
    //     if (isEdit && editData) {
    //         setTitle(editData.Title);
    //         setDescription(editData.Description);
    //         setStatus(editData.Status);
    //     }
    // }, []);

    // const Edit_User_Operation = async () => {
    //     const url = "http://localhost:3000/TODO_List" + id;
    //     let response = await fetch(url);
    //     response = response.json();

    //     setID(response.id);
    //     setTitle(response.Title);
    //     setDescription(response.Description);
    //     setStatus(response.Status);
    // }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="w-full max-w-4xl border-b border-gray-900/10 pb-12 bg-white p-8 rounded-lg shadow">

                <h2 className="text-base/7 font-semibold text-gray-900 text-center">
                    Create New Task
                </h2>
                <p className="mt-1 text-sm/6 text-gray-600 text-center">
                    Complete or Mark your Task
                </p>

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                    <div className="sm:col-span-3">
                        <label htmlFor="task-id" className="block text-sm/6 font-medium text-gray-900">
                            ID
                        </label>
                        <div className="mt-2">
                            <input
                                onChange={(event) => setID(event.target.value)} value={id}
                                id="task-id"
                                type="text"
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 outline outline-1 outline-gray-300 focus:outline-2 focus:outline-indigo-600"
                            />
                        </div>
                    </div>

                    <div className="sm:col-span-3">
                        <label htmlFor="title" className="block text-sm/6 font-medium text-gray-900">
                            Title
                        </label>
                        <div className="mt-2">
                            <input
                                onChange={(event) => setTitle(event.target.value)} value={Title}
                                id="title"
                                type="text"
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 outline outline-1 outline-gray-300 focus:outline-2 focus:outline-indigo-600"
                            />
                        </div>
                    </div>

                    <div className="sm:col-span-6">
                        <label htmlFor="description" className="block text-sm/6 font-medium text-gray-900">
                            Description
                        </label>
                        <div className="mt-2">
                            <textarea
                                onChange={(event) => setDescription(event.target.value)} value={Description}
                                id="description"
                                rows={4}
                                className="block w-full rounded-md bg-white px-3 py-2 text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600"
                                placeholder="Enter task description..."
                            ></textarea>
                        </div>

                    </div>
                    <div className="sm:col-span-3">
                        <label htmlFor="status" className="block text-sm/6 font-medium text-gray-900">
                            Status
                        </label>
                        <div className="mt-2">
                            <input
                                onChange={(event) => setStatus(event.target.value)} value={Status}
                                id="status"
                                type="text"
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 outline outline-1 outline-gray-300 focus:outline-2 focus:outline-indigo-600"
                            />
                        </div>
                    </div>
                    <div className="sm:col-span-3">
                        <label htmlFor="status" className="block text-sm/6 font-medium text-gray-900">
                            Date
                        </label>
                        <div className="mt-2">
                            <input
                                id="statusdate"
                                type="date"
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 outline outline-1 outline-gray-300 focus:outline-2 focus:outline-indigo-600"
                            />
                        </div>
                    </div>
                </div>
                <div className="mt-10 flex justify-center">
                    <button onClick={AddNewTask_InsertAPI} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium">
                        Add Task
                    </button>
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

export default AddNewTaskComponent;
