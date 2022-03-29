const EmployeeCard = ({ employees, editEmployee, deleteEmployee }) => {
  return (
    <>
      {employees?.employees?.map((employee) => (
        <tr
          key={employee._id}
          className="border-b odd:bg-white even:bg-gray-50 "
        >
          <td className="py-4 px-6 text-sm whitespace-nowrap">
            {`${employee.firstName} ${employee.lastName}`}
          </td>
          <td className="py-4 px-6 text-sm whitespace-nowrap">
            {employee.sex}
          </td>
          <td className="py-4 px-6 text-sm whitespace-nowrap">
            {employee.department}
          </td>
          <td className="py-4 text-sm whitespace-nowrap">
            {employee.position}
          </td>
          <td className="py-4 px-6 text-sm whitespace-nowrap">
            {employee.address}
          </td>
          <td className="py-4 px-6 text-sm whitespace-nowrap">
            {employee.contact_number}
          </td>
          <td className="py-4 px-6 space-x-4 text-sm whitespace-nowrap">
            <button
              type="button"
              className="text-indigo-500 font-medium hover:underline"
              onClick={() => editEmployee(employee._id)}
            >
              Edit
            </button>
            <button
              type="button"
              className="text-indigo-500 font-medium hover:underline"
              onClick={() => deleteEmployee(employee._id)}
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
    </>
  );
};

export default EmployeeCard;
