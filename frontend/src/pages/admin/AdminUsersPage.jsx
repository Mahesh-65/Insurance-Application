import { useEffect, useState } from 'react';
import SidebarLayout from '../../components/dashboard/SidebarLayout';
import api from '../../services/api';

const AdminUsersPage = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    api.get('/applications').then((response) => setApplications(response.data.applications));
  }, []);

  const users = Array.from(new Map(applications.map((item) => [item.userId?._id, item.userId])).values()).filter(Boolean);

  return (
    <SidebarLayout title="User Oversight">
      <div className="glass rounded-[2rem] p-6">
        <table className="w-full text-left">
          <thead className="text-white/45">
            <tr>
              <th className="pb-4">Name</th>
              <th className="pb-4">Email</th>
              <th className="pb-4">Phone</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr className="border-t border-white/10" key={user._id}>
                <td className="py-4">{user.name}</td>
                <td className="py-4 text-white/70">{user.email}</td>
                <td className="py-4 text-white/70">{user.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SidebarLayout>
  );
};

export default AdminUsersPage;
