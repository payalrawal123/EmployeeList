import React, { useState, useEffect } from 'react';
import useSearch from '../hooks/useSearch';
import './EmployeeTable.css'; // Optional: Create CSS for styling

const EmployeeTable = () => {
  const [employees, setEmployees] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');
  const [filterGender, setFilterGender] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingRow, setEditingRow] = useState(null); // State to track which row is being edited

  useEffect(() => {
    // Fetch data from the JSON file (You can put this in /public directory)
    fetch('https://file.notion.so/f/f/3849cbaa-5010-40df-a27a-f34a3a69c598/ce7879ce-8dee-462f-9a6f-52a31ea104e5/MOCK_DATA.json?table=block&id=5766873f-14ad-4eba-9e97-7c51337fa118&spaceId=3849cbaa-5010-40df-a27a-f34a3a69c598&expirationTimestamp=1724940000000&signature=fVeb8qT8SqXtlPw6geGx_6wPW44Z3X0BgRSGwCZjGAs&downloadName=MOCK_DATA.json')
      .then((response) => response.json())
      .then((data) => setEmployees(data));
  }, []);

  // Sorting by salary
  const handleSort = () => {
    const sortedEmployees = [...employees].sort((a, b) => {
      return sortOrder === 'asc'
        ? a.salary - b.salary
        : b.salary - a.salary;
    });
    setEmployees(sortedEmployees);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  // Filtering by gender
  const handleFilter = (gender) => {
    setFilterGender(gender);
  };

  // Search using custom hook
  const filteredEmployees = useSearch(employees, searchTerm).filter(
    (employee) =>
      !filterGender || employee.gender.toLowerCase() === filterGender.toLowerCase()
  );

  // Edit employee details
  const handleEdit = (id, key, value) => {
    const updatedEmployees = employees.map((employee) =>
      employee.id === id ? { ...employee, [key]: value } : employee
    );
    setEmployees(updatedEmployees);
  };

  // Delete employee
  const handleDelete = (id) => {
    const updatedEmployees = employees.filter((employee) => employee.id !== id);
    setEmployees(updatedEmployees);
  };
  const toggleEditMode = (id) => {
    setEditingRow(editingRow === id ? null : id);
  };

  return (
    <div>
      <h1>Employee Management System</h1>

      {/* Search input */}
      <input
        type="text"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Filter buttons */}
      <button onClick={() => handleFilter('')}>All</button>
      <button onClick={() => handleFilter('Male')}>Male</button>
      <button onClick={() => handleFilter('Female')}>Female</button>

      {/* Sort button */}
      <button onClick={handleSort}>
        Sort by Salary ({sortOrder === 'asc' ? 'Ascending' : 'Descending'})
      </button>

      {/* Employee table */}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Gender</th>
            <th>Email</th>
            <th>Salary</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>
              <input
                  type="text"
                  value={employee.first_name}
                  onChange={(e) => handleEdit(employee.id, 'name', e.target.value)}
                />
                
                 {/* {employee.first_name} */}
                 
               
              </td>
              <td>
                <input
                  type="text"
                  value={employee.gender}
                  onChange={(e) => handleEdit(employee.id, 'gender', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="email"
                  value={employee.email}
                  onChange={(e) => handleEdit(employee.id, 'email', e.target.value)}
                />
              </td>
              {/* <td>
                <input
                  type="text"
                  value={employee.job_title}
                  onChange={(e) => handleEdit(employee.id, 'job_title', e.target.value)}
                />
              </td> */}
              <td>
                <input
                  type="number"
                  value={employee.salary}
                  onChange={(e) => handleEdit(employee.id, 'salary', e.target.value)}
                />
              </td>
              <td>
              <button onClick={() => toggleEditMode(employee.id)} className="edit-button">
                  {editingRow === employee.id ? 'Save' : 'Edit'}
                </button>
                <button onClick={() => handleDelete(employee.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;
