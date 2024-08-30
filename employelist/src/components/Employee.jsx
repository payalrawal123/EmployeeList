import { Link, useNavigate } from "react-router-dom";
import "./EmployeeTable.css";
import useSearch from "../hooks/useSearch";
import React, { useEffect, useState } from "react";

const EmployeeTable = () => {
  const [employee, setEmployee] = useState([]); // Fixed typo in state
  const [filteredEmployee, setFilteredEmployee] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sorting, setSorting] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const navigate = useNavigate(); // Correctly initializing useNavigate

  let url =
    "https://file.notion.so/f/f/3849cbaa-5010-40df-a27a-f34a3a69c598/ce7879ce-8dee-462f-9a6f-52a31ea104e5/MOCK_DATA.json?table=block&id=5766873f-14ad-4eba-9e97-7c51337fa118&spaceId=3849cbaa-5010-40df-a27a-f34a3a69c598&expirationTimestamp=1725004800000&signature=7kROS-fsLFKxuCF_ObYvaa-wmffcl-RzC30v2EDHq0s&downloadName=MOCK_DATA.json";

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setEmployee(data);
        setFilteredEmployee(data);
      });
  }, []);

  const handleDelete = (id) => {
    const updatedEmployees = employee.filter(
      (employees) => employees.id !== id
    );
    setEmployee(updatedEmployees);
    setFilteredEmployee(updatedEmployees); // Update filtered data
  };

  useEffect(() => {
    let filteredData = employee;
    if (selectedGender) {
      filteredData = filteredData.filter(
        (item) => item.gender.toLowerCase() === selectedGender.toLowerCase()
      );
    }
   if (searchTerm) {
      filteredData = filteredData.filter((item) =>
        item.first_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (sorting === "highToLow") {
      filteredData.sort((a, b) => a.salary - b.salary);
    } else if (sorting === "lowToHigh") {
      filteredData.sort((a, b) => b.salary - a.salary);
    }
    setFilteredEmployee(filteredData);
  }, [selectedGender, sorting, employee, searchTerm]);

  return (
    <div>
      <h1>Employee Management</h1>
      <div className="filter-container">
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          value={selectedGender}
          onChange={(e) => setSelectedGender(e.target.value)}
        >
          <option value="">All</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Non-binary">Non-binary</option>
        </select>

        <select value={sorting} onChange={(e) => setSorting(e.target.value)}>
          <option value="">Sort by Salary</option>
          <option value="highToLow">High to Low</option>
          <option value="lowToHigh">Low to High</option>
        </select>
      </div>

      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Gender</th>
            <th>Email</th>
            <th>Salary</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployee.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.first_name}</td>
              <td>{item.gender}</td>
              <td>{item.email}</td>
              <td>{item.salary}</td>
              <td>
                {/* Fixing navigate function call */}
                {/* <Link to={`/update/${item.id}`} className="edit-button">Edit</Link> */}

                <button onClick={() => handleDelete(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;
