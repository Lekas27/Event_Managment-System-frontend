

export const CategoryRoleAdminTable = ({type, onDelete, onEdit, label}) => {

    return (
        <table className="mx-auto lg:mx-0 w-full  lg:w-1/2 border-collapse border border-gray-300 table-fixed self-start ">
            <thead>
            <tr className="bg-green-600 text-left ">
                <th className="p-3 border border-gray-300">{label} name</th>
                <th className="p-3 border border-gray-300 text-center">Actions</th>
            </tr>
            </thead>
            <tbody>
            {type && type.map((t) => (
                <tr key={t.id}>
                    <td className="p-3 border border-gray-300 text-white">{t.name}</td>
                    <td className="p-3 border border-gray-300 text-center flex flex-col sm:flex-row gap-y-2 sm:gap-y-0">
                        <button
                            className="w-full sm:w-1/2 px-3 py-1 bg-blue-500 text-white rounded mr-2 hover:bg-blue-600"
                            onClick={() => onEdit(t.id)}
                        >
                            Edit
                        </button>
                        <button
                            className="w-full sm:w-1/2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                            onClick={() => onDelete(t.id)}
                        >
                            Delete
                        </button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    )

}