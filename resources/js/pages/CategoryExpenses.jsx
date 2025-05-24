import React from 'react'

function CategoryExpenses() {
  const [incomes, setIncomes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
      const fetchIncomes = async () => {
          try {
              setLoading(true);
              const response = await axiosInstance.get("/");
              setIncomes(response.data.data || []);
          } catch (err) {
              console.error("Error fetching incomes:", err);
              setError("Failed to load incomes. Please try again later.");
          } finally {
              setLoading(false);
          }
      };

      fetchIncomes();
  }, []);

  if (loading) {
      return <div className="container mx-auto p-4">Loading incomes...</div>;
  }

  if (error) {
      return <div className="container mx-auto p-4 text-red-500">{error}</div>;
  }

  return (
      <div className="container mx-auto p-4">
          {incomes.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
                  <svg
                      className="w-16 h-16 text-gray-400 mb-4"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                  >
                      <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                  </svg>
                  <p className="text-lg font-medium text-gray-600 dark:text-neutral-400 mb-1">
                      No income records found
                  </p>
                  <p className="text-sm text-gray-500 dark:text-neutral-500">
                      Add your first income record to get started.
                  </p>
              </div>
          ) : (
              <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700 m-2">
                  <thead>
                      <tr className="border-t border-gray-200 divide-x divide-gray-200 dark:border-neutral-700 dark:divide-neutral-700">
                          <th scope="col">
                              <button
                                  id="hs-pro-id"
                                  type="button"
                                  className="px-4 py-2.5 text-start w-full flex items-center gap-x-1 text-sm font-normal text-gray-500 focus:outline-none focus:bg-gray-100 dark:text-neutral-500 dark:focus:bg-neutral-700"
                                  aria-haspopup="menu"
                                  aria-expanded="false"
                                  aria-label="Dropdown"
                              >
                                  Income ID
                              </button>
                          </th>
                          <th scope="col" className="max-w-[250px]">
                              <button
                                  id="hs-pro-name"
                                  type="button"
                                  className="px-4 py-2.5 text-start w-full flex items-center gap-x-1 text-sm font-normal text-gray-500 focus:outline-none focus:bg-gray-100 dark:text-neutral-500 dark:focus:bg-neutral-700"
                                  aria-haspopup="menu"
                                  aria-expanded="false"
                                  aria-label="Dropdown"
                              >
                                  Source
                              </button>
                          </th>
                          <th scope="col" className="max-w-[250px]">
                              <button
                                  id="hs-pro-time"
                                  type="button"
                                  className="px-4 py-2.5 text-start w-full flex items-center gap-x-1 text-sm font-normal text-gray-500 focus:outline-none focus:bg-gray-100 dark:text-neutral-500 dark:focus:bg-neutral-700"
                                  aria-haspopup="menu"
                                  aria-expanded="false"
                                  aria-label="Dropdown"
                              >
                                  Amount
                              </button>
                          </th>
                          <th scope="col" className="max-w-[250px]">
                              <button
                                  id="hs-pro-description"
                                  type="button"
                                  className="px-4 py-2.5 text-start w-full flex items-center gap-x-1 text-sm font-normal text-gray-500 focus:outline-none focus:bg-gray-100 dark:text-neutral-500 dark:focus:bg-neutral-700"
                                  aria-haspopup="menu"
                                  aria-expanded="false"
                                  aria-label="Dropdown"
                              >
                                  Description
                              </button>
                          </th>
                          <th scope="col" className="max-w-[250px]">
                              <button
                                  id="hs-pro-added"
                                  type="button"
                                  className="px-4 py-2.5 text-start w-full flex items-center gap-x-1 text-sm font-normal text-gray-500 focus:outline-none focus:bg-gray-100 dark:text-neutral-500 dark:focus:bg-neutral-700"
                                  aria-haspopup="menu"
                                  aria-expanded="false"
                                  aria-label="Dropdown"
                              >
                                  Added
                              </button>
                          </th>
                          <th scope="col" className="max-w-[250px]">
                              <button
                                  id="hs-pro-update"
                                  type="button"
                                  className="px-4 py-2.5 text-start w-full flex items-center gap-x-1 text-sm font-normal text-gray-500 focus:outline-none focus:bg-gray-100 dark:text-neutral-500 dark:focus:bg-neutral-700"
                                  aria-haspopup="menu"
                                  aria-expanded="false"
                                  aria-label="Dropdown"
                              >
                                  Update
                              </button>
                          </th>
                          <th scope="col" className="max-w-[250px]">
                              <button
                                  id="hs-pro-delete"
                                  type="button"
                                  className="px-4 py-2.5 text-start w-full flex items-center gap-x-1 text-sm font-normal text-gray-500 focus:outline-none focus:bg-gray-100 dark:text-neutral-500 dark:focus:bg-neutral-700"
                                  aria-haspopup="menu"
                                  aria-expanded="false"
                                  aria-label="Dropdown"
                              >
                                  Delete
                              </button>
                          </th>
                      </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                      {incomes.map((income) => (
                          <tr
                              key={income.id}
                              className="divide-x divide-gray-200 dark:divide-neutral-700"
                          >
                              <td className="size-px whitespace-nowrap px-4 py-1">
                                  <div className="w-full flex items-center gap-x-3">
                                      <span className="text-sm font-medium text-gray-800 dark:text-neutral-200">
                                          {income.id}
                                      </span>
                                  </div>
                              </td>
                              <td className="size-px whitespace-nowrap px-4 py-1">
                                  <div className="w-full flex items-center gap-x-3">
                                      <span className="text-sm font-medium text-gray-800 dark:text-neutral-200">
                                          {income.source}
                                      </span>
                                  </div>
                              </td>
                              <td className="size-px whitespace-nowrap px-4 py-1">
                                  <div className="w-full flex items-center gap-x-3">
                                      <span className="text-sm font-medium text-gray-800 dark:text-neutral-200">
                                          ${income.amount}
                                      </span>
                                  </div>
                              </td>
                              <td className="size-px whitespace-nowrap px-4 py-1">
                                  <div className="w-full flex items-center gap-x-3">
                                      <span className="text-sm font-medium text-gray-800 dark:text-neutral-200">
                                          {income.description}
                                      </span>
                                  </div>
                              </td>
                              <td className="size-px whitespace-nowrap px-4 py-1">
                                  <div className="w-full flex items-center gap-x-3">
                                      <span className="text-sm font-medium text-gray-800 dark:text-neutral-200">
                                          {income.created_at}
                                      </span>
                                  </div>
                              </td>
                              <td className="size-px whitespace-nowrap px-4 py-1">
                                  <button
                                      type="button"
                                      className="py-2 px-3 inline-flex items-center gap-x-2 text-xs font-medium rounded-lg border border-stone-200 bg-white text-green-500 shadow-sm hover:bg-stone-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-stone-50 dark:bg-neutral-800 dark:border-neutral-700 dark:text-green-500 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                                  >
                                      Update
                                  </button>
                              </td>
                              <td className="size-px whitespace-nowrap px-4 py-1">
                                  <button
                                      type="button"
                                      className="py-2 px-3 inline-flex items-center gap-x-2 text-xs font-medium rounded-lg border border-stone-200 bg-white text-red-500 shadow-sm hover:bg-stone-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-stone-50 dark:bg-neutral-800 dark:border-neutral-700 dark:text-red-500 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                                  >
                                      Delete
                                  </button>
                              </td>
                          </tr>
                      ))}
                  </tbody>
              </table>
          )}
      </div>
  );
}

export default CategoryExpenses