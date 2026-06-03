import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import AuthShell from '../components/common/AuthShell';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const { register, handleSubmit } = useForm();
  const { login, loading, error, setError } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    try {
      const user = await login(values);
      navigate(user.role === 'ADMIN' ? '/admin/dashboard' : '/user/dashboard');
    } catch {
      return;
    }
  };

  return (
    <AuthShell title="Sign in to your insurance workspace." subtitle="Secure access for administrators and policyholders with role-based routing.">
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <input className="input" placeholder="Email" {...register('email')} onChange={() => setError('')} />
        <input className="input" placeholder="Password" type="password" {...register('password')} onChange={() => setError('')} />
        {error && <p className="rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white/80">{error}</p>}
        <button className="btn-primary w-full" disabled={loading} type="submit">
          {loading ? 'Signing in...' : 'Login'}
        </button>
      </form>
    </AuthShell>
  );
};

export default LoginPage;
