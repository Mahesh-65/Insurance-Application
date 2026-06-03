import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import SidebarLayout from '../../components/dashboard/SidebarLayout';
import api from '../../services/api';

const AdminPlansPage = () => {
  const [plans, setPlans] = useState([]);
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      planName: '',
      planType: 'Health Insurance',
      description: '',
      minimumAge: 18,
      maximumAge: 65,
      basePremium: 10000,
      coverageAmount: 500000,
      requiredDocuments: 'Aadhaar, PAN',
      activeStatus: true
    }
  });

  const loadPlans = () => api.get('/plans').then((response) => setPlans(response.data.plans));
  useEffect(() => { loadPlans(); }, []);

  const onSubmit = async (values) => {
    await api.post('/plans', {
      ...values,
      requiredDocuments: values.requiredDocuments.split(',').map((item) => item.trim())
    });
    reset();
    loadPlans();
  };

  const togglePlan = async (plan) => {
    await api.put(`/plans/${plan._id}`, { ...plan, activeStatus: !plan.activeStatus });
    loadPlans();
  };

  return (
    <SidebarLayout title="Plan Management">
      <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <form className="glass grid gap-4 rounded-[2rem] p-6" onSubmit={handleSubmit(onSubmit)}>
          <input className="input" placeholder="Plan name" {...register('planName')} />
          <input className="input" placeholder="Plan type" {...register('planType')} />
          <textarea className="input min-h-28" placeholder="Description" {...register('description')} />
          <div className="grid gap-4 md:grid-cols-2">
            <input className="input" type="number" placeholder="Minimum age" {...register('minimumAge')} />
            <input className="input" type="number" placeholder="Maximum age" {...register('maximumAge')} />
            <input className="input" type="number" placeholder="Base premium" {...register('basePremium')} />
            <input className="input" type="number" placeholder="Coverage amount" {...register('coverageAmount')} />
          </div>
          <input className="input" placeholder="Required documents separated by commas" {...register('requiredDocuments')} />
          <button className="btn-primary" type="submit">Create Plan</button>
        </form>
        <div className="space-y-4">
          {plans.map((plan) => (
            <div key={plan._id} className="glass rounded-[2rem] p-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-semibold">{plan.planName}</h3>
                  <p className="mt-2 text-white/65">{plan.description}</p>
                </div>
                <button className="btn-secondary" onClick={() => togglePlan(plan)}>
                  {plan.activeStatus ? 'Deactivate' : 'Activate'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SidebarLayout>
  );
};

export default AdminPlansPage;
