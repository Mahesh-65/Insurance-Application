import { motion } from 'framer-motion';
import Navbar from './Navbar';

const AuthShell = ({ title, subtitle, children }) => (
  <div className="min-h-screen">
    <Navbar />
    <div className="page-shell flex min-h-[calc(100vh-88px)] items-center py-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto grid w-full max-w-5xl gap-8 lg:grid-cols-[1.1fr_0.9fr]"
      >
        <div className="flex flex-col justify-center">
          <p className="mb-4 text-sm uppercase tracking-[0.35em] text-white/50">Enterprise Insurance Platform</p>
          <h1 className="text-4xl font-semibold leading-tight text-white md:text-6xl">{title}</h1>
          <p className="mt-4 max-w-xl text-white/70">{subtitle}</p>
        </div>
        <div className="glass rounded-[2rem] p-8">{children}</div>
      </motion.div>
    </div>
  </div>
);

export default AuthShell;
