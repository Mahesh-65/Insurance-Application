import SidebarLayout from '../../components/dashboard/SidebarLayout';
import { useAuth } from '../../context/AuthContext';

const ProfilePage = () => {
  const { auth } = useAuth();
  const user = auth.user;

  return (
    <SidebarLayout title="Profile Management">
      <div className="glass rounded-[2rem] p-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-white/45">Name</p>
            <p className="mt-2 text-2xl">{user?.name}</p>
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-white/45">Email</p>
            <p className="mt-2 text-2xl">{user?.email}</p>
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-white/45">Phone</p>
            <p className="mt-2 text-2xl">{user?.phone}</p>
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-white/45">Role</p>
            <p className="mt-2 text-2xl">{user?.role}</p>
          </div>
        </div>
      </div>
    </SidebarLayout>
  );
};

export default ProfilePage;
