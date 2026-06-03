import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../components/common/Navbar';

const sectionTitle = 'mb-4 text-sm uppercase tracking-[0.35em] text-white/45';

const features = [
  'Role-based insurance administration',
  'Secure document intake with blob storage',
  'Premium automation and live analytics',
  'Application workflows with audit trails'
];

const plans = [
  'Health Insurance',
  'Life Insurance',
  'Vehicle Insurance',
  'Travel Insurance',
  'Home Insurance'
];

const LandingPage = () => (
  <div className="min-h-screen">
    <Navbar />
    <section className="page-shell grid min-h-[92vh] items-center gap-10 py-12 lg:grid-cols-[1.2fr_0.8fr]">
      <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }}>
        <p className={sectionTitle}>Premium Enterprise Insurance Portal</p>
        <h1 className="max-w-4xl text-5xl font-semibold leading-tight md:text-7xl">
          Trusted coverage operations with elegant customer journeys.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-white/70">
          A production-ready insurance system for admins and policyholders, designed for scale, auditability, and calm operations.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link className="btn-primary" to="/register">Get Started</Link>
          <a className="btn-secondary" href="#plans">Explore Plans</a>
        </div>
      </motion.div>
      <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="glass rounded-[2rem] p-6">
        <div className="grid gap-4">
          {features.map((feature) => (
            <div key={feature} className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
              <p className="text-white/85">{feature}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>

    <section id="about" className="page-shell py-16">
      <p className={sectionTitle}>Features</p>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {features.map((feature, index) => (
          <motion.div key={feature} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.08 }} className="glass rounded-[2rem] p-6">
            <h3 className="text-xl font-semibold">{feature}</h3>
            <p className="mt-3 text-white/60">Structured workflows, secure access, and clean analytics built into one monolith.</p>
          </motion.div>
        ))}
      </div>
    </section>

    <section id="plans" className="page-shell py-16">
      <p className={sectionTitle}>Insurance Plans</p>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">
        {plans.map((plan) => (
          <div key={plan} className="glass rounded-[2rem] p-6">
            <h3 className="text-2xl font-semibold">{plan}</h3>
            <p className="mt-3 text-white/65">Flexible coverage designed for modern households, travel, property, and health needs.</p>
          </div>
        ))}
      </div>
    </section>

    <section className="page-shell grid gap-6 py-16 lg:grid-cols-3">
      {['How It Works', 'Testimonials', 'FAQ'].map((title) => (
        <div key={title} className="glass rounded-[2rem] p-6">
          <p className={sectionTitle}>{title}</p>
          <p className="text-white/70">
            {title === 'How It Works' && 'Select a plan, upload the required documents, and track approvals in a guided timeline.'}
            {title === 'Testimonials' && 'Operations teams gain a cleaner workflow, while policyholders experience faster submissions.'}
            {title === 'FAQ' && 'Supports JWT auth, Azure Blob document storage, MongoDB locally, and Cosmos DB on Azure.'}
          </p>
        </div>
      ))}
    </section>

    <section className="page-shell pb-16">
      <div className="glass rounded-[2rem] p-8 text-center">
        <p className={sectionTitle}>Contact Us</p>
        <h2 className="text-3xl font-semibold">Ready to modernize insurance operations?</h2>
        <p className="mx-auto mt-4 max-w-2xl text-white/65">Launch locally with MongoDB or deploy directly to Azure App Service with Cosmos DB and Blob Storage.</p>
      </div>
    </section>
  </div>
);

export default LandingPage;
