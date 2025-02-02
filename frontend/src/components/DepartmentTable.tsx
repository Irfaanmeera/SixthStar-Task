/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { getUserStatistics } from '../api/adminApi';

interface Department {
  _id: string; // Department name
  count: number; // Total users in that department
}

const DepartmentTable: React.FC = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const data = await getUserStatistics();
        console.log('Department stats:', data);

        // Sort by user count (Descending order)
        const sortedDepartments = data.sort((a: Department, b: Department) => b.count - a.count);
        setDepartments(sortedDepartments);
      } catch (err) {
        setError('Failed to fetch department statistics. Please try again later.');
      }
    };

    fetchDepartments();
  }, []);

  return (
    <div className='mt-5'>
      <p className="text-lg font-bold text-slategray mb-4 ">Groups with Most Users</p>
      {error && <p className="text-red">{error}</p>}

      <table className="w-full rounded-lg border border-slategray border-opacity-20 shadow-lg">
        <thead className="text-left text-sm bg-grey500 border-slategray border-opacity-20 shadow-2">
          <tr>
            <th className="p-3">Group Name</th>
            <th className="p-3">Total Users</th>
          </tr>
        </thead>
        <tbody className="bg-gray-3 border-t border-b border-slategray border-opacity-20">
          {departments.map((dept, index) => (
            <tr key={index} className="text-left text-sm border border-slategray border-opacity-20 shadow-1">
              <td className="p-3">{dept._id}</td>
              <td className="p-3">{dept.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DepartmentTable;
