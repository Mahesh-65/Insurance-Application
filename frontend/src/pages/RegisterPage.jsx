import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import AuthShell from '../components/common/AuthShell';
import { useAuth } from '../context/AuthContext';

const RegisterPage = () => {
  const { register: field, handleSubmit, formState: { errors } } = useForm();
  const { register, loading, error, setError } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    try {
      const user = await register(values);
      navigate(user.role === 'ADMIN' ? '/admin/dashboard' : '/user/dashboard');
    } catch {
      return;
    }
  };

  return (
    <AuthShell title="Create a secure customer account." subtitle="Password rules are enforced by the API to keep identities protected.">
      <form className="grid gap-4 md:grid-cols-2" onSubmit={handleSubmit(onSubmit)}>
        <input className="input" placeholder="Full Name" {...field('name')} onChange={() => setError('')} />
        <input className="input" placeholder="Email" {...field('email')} onChange={() => setError('')} />
        <input className="input" placeholder="Phone" {...field('phone')} onChange={() => setError('')} />
        <input className="input" type="date" {...field('dob')} onChange={() => setError('')} />
        <div className="md:col-span-2">
          <input
            className="input"
            placeholder="Password"
            type="password"
            {...field('password', {
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/,
                message: 'Use 8+ characters with uppercase, lowercase, number, and special character'
              }
            })}
            onChange={() => setError('')}
          />
          <p className="mt-2 text-sm text-white/55">Use 8+ characters with uppercase, lowercase, number, and special character.</p>
          {errors.password && <p className="mt-2 text-sm text-white/80">{errors.password.message}</p>}
        </div>
        {error && <p className="rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white/80 md:col-span-2">{error}</p>}
        <button className="btn-primary md:col-span-2" disabled={loading} type="submit">
          {loading ? 'Creating account...' : 'Register'}
        </button>
      </form>
    </AuthShell>
  );
};

export default RegisterPage;
