export default function Table({ tableHeaders, children }) {
  return (
    <div className="flex flex-col mb-4 bg-white shadow-md">
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full align-middle ">
          <div className="overflow-hidden border-b border-gray-100 rounded-lg shadow">
            <table className="min-w-full">
              <thead className="bg-blue-600">
                <tr>
                  {tableHeaders.map((header, idx) => (
                    <td key={idx} className="table-header">
                      {header}
                    </td>
                  ))}

                  <td className="table-header">Action</td>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100 ">
                {children}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
