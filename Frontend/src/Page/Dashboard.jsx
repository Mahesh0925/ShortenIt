import React, { useEffect, useState } from "react";
import api from "../utils/axiosInstance";
export default function Dashboard() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const res = await api.get("/top", { withCredentials: true });
        setRows(res.data.data);
      } catch (err) {
        console.error("Error fetching top URLs:", err);
      }
    };

    fetchLinks();
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10); // Dropdown value

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = rows.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(rows.length / rowsPerPage);

  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1); // reset to first page
  };

  return (
    <div className="px-4 md:px-40 flex flex-1 justify-center py-5">
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
        {/* Top Header */}
        <div className="flex flex-wrap justify-between gap-3 p-4">
          <p className="text-[#111418] tracking-light text-[32px] font-bold leading-tight min-w-72">
            Your Links
          </p>
          <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-8 px-4 bg-[#f0f2f5] text-[#111418] text-sm font-medium leading-normal">
            <span className="truncate">
              <a href="/shorten">New Link</a>
            </span>
          </button>
        </div>

        {/* Search */}
        <div className="px-4 py-3">
          <label className="flex flex-col min-w-40 h-12 w-full">
            <div className="flex w-full flex-1 items-stretch rounded-lg h-full">
              <div className="text-[#60758a] flex border-none bg-[#f0f2f5] items-center justify-center pl-4 rounded-l-lg border-r-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24px"
                  height="24px"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                >
                  <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z" />
                </svg>
              </div>
              <input
                placeholder="Search links"
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111418] focus:outline-0 focus:ring-0 border-none bg-[#f0f2f5] focus:border-none h-full placeholder:text-[#60758a] px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal"
              />
            </div>
          </label>
        </div>

        {/* Table */}
        <div className="px-4 py-3">
          {rows.length === 0 ? (
            <div className="text-center py-10 text-[#60758a] text-lg font-medium">
              No links found.{" "}
              <a href="/shorten" className="text-[#196ec4] underline">
                Create a short URL
              </a>{" "}
              to get started.
            </div>
          ) : (
            <div className="flex overflow-hidden rounded-lg border border-[#dbe0e6] bg-white flex-col">
              {/* Rows-per-page dropdown */}
              <div className="flex justify-end px-4 py-2">
                <div className="flex items-center gap-2">
                  <label
                    htmlFor="rowsPerPage"
                    className="text-sm text-[#60758a]"
                  >
                    Rows per page:
                  </label>
                  <select
                    id="rowsPerPage"
                    value={rowsPerPage}
                    onChange={handleChangeRowsPerPage}
                    className="border border-[#dbe0e6] rounded px-2 py-1 text-sm"
                  >
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                  </select>
                </div>
              </div>
              <table className="flex-1">
                <thead>
                  <tr className="bg-white">
                    <th className="px-4 py-3 text-left text-[#111418] w-[400px] text-sm font-medium leading-normal">
                      Original URL
                    </th>
                    <th className="px-4 py-3 text-left text-[#111418] w-[400px] text-sm font-medium leading-normal">
                      Shortened URL
                    </th>
                    <th className="px-4 py-3 text-left text-[#111418] w-[400px] text-sm font-medium leading-normal hidden md:table-cell">
                      Created
                    </th>
                    <th className="px-4 py-3 text-left text-[#111418] w-[400px] text-sm font-medium leading-normal">
                      Clicks
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentRows.map((row, index) => (
                    <tr
                      key={index}
                      className="border-t border-t-[#dbe0e6] hover:bg-[#f0f2f5] transition-colors duration-150"
                    >
                      <td className="h-[72px] px-4 py-2 w-[400px] text-[#60758a] text-sm font-normal leading-normal">
                        <a
                          href={row.full_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#196ec4] hover:underline"
                        >
                          {row.full_url}
                        </a>
                      </td>
                      <td className="h-[72px] px-4 py-2 w-[400px] text-[#60758a] text-sm font-normal leading-normal">
                        <a
                          href={`${import.meta.env.VITE_BACKEND_URL}/${row.short_url}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#196ec4] hover:underline"
                        >
                          {`${import.meta.env.VITE_BACKEND_URL}/${row.short_url}`}
                        </a>
                      </td>
                      <td className="h-[72px] px-4 py-2 w-[400px] text-[#60758a] text-sm font-normal leading-normal hidden md:table-cell">
                        {new Date(row.date).toLocaleDateString()}
                      </td>
                      <td className="h-[72px] px-4 py-2 w-[400px] text-[#60758a] text-sm font-normal leading-normal">
                        {row.clicks}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex justify-between items-center px-4 py-4">
                <div className="text-sm text-[#60758a]">
                  Showing {indexOfFirstRow + 1} -{" "}
                  {Math.min(indexOfLastRow, rows.length)} of {rows.length}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                    className="text-sm px-3 py-1 border rounded disabled:opacity-50"
                  >
                    Prev
                  </button>
                  <span className="text-sm text-[#60758a]">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className="text-sm px-3 py-1 border rounded disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}
          <div
            className="bg-yellow-100 border-l-4 border-yellow-400 text-yellow-800 p-4 mb-4 rounded-md mt-3"
            role="alert"
          >
            <p className="font-semibold">Note:</p>
            <p>
              Your created links will be automatically deleted after{" "}
              <strong>7 days</strong>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
