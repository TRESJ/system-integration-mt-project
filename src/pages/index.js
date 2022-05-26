import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import EmployeeCard from "../components/EmployeeCard";
import Table from "../components/Table";

const headers = [
  "Name",
  "Sex",
  "Department",
  "Role/Position",
  "Address",
  "Contact Number",
];

export default function Home() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsLoading(true);
    const getEmployees = async () => {
      try {
        const res = await fetch("/api/employee");
        const parsedRes = await res.json();

        if (parsedRes) {
          setData(parsedRes);
          setIsLoading(false);
          return parsedRes;
        }

        return;
      } catch (error) {
        console.log(error.message);
      }
    };

    getEmployees();
  }, []);

  const editEmployee = async (id) => {
    try {
      const res = await fetch(
        `/api/employee/${id}`,
        { method: "GET" },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      const parsedData = await res.json();
      router.push(`/employee/${id}`);
      return parsedData;
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteEmployee = async (id) => {
    try {
      const res = await fetch(`/api/employee/${id}`, { method: "DELETE" });
      const parsedData = await res.json();
      router.reload();
      return parsedData;
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <Head>
        <title>Employee Information System</title>
      </Head>
      <main className="flex flex-col justify-center h-screen max-w-5xl px-4 mx-auto">
        <header className="flex items-center justify-between mb-5">
          <h1 className="text-3xl font-bold">Employees</h1>
          <Link href="/employee/new">
            <a className="btn">+ Add Employee</a>
          </Link>
        </header>
        <Table tableHeaders={headers}>
          <EmployeeCard
            employees={data}
            editEmployee={editEmployee}
            deleteEmployee={deleteEmployee}
          />

          {isLoading && (
            <tr className="h-[250px] text-gray-400 select-none pointer-events-none relative">
              <td className="absolute inset-0 w-[200px] h-[50px] m-auto">
                Loading...
              </td>
            </tr>
          )}
          {data?.employees?.length < 1 && (
            <tr className="h-[250px] text-gray-400 select-none pointer-events-none relative">
              <td className="absolute inset-0 w-[200px] h-[50px] m-auto">
                No employees found
              </td>
            </tr>
          )}
        </Table>
      </main>
    </>
  );
}
