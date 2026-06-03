const StatCard = ({ label, value, note }) => (
  <div className="glass rounded-[2rem] p-6">
    <p className="text-sm uppercase tracking-[0.25em] text-white/45">{label}</p>
    <p className="mt-4 text-4xl font-semibold">{value}</p>
    {note && <p className="mt-3 text-sm text-white/55">{note}</p>}
  </div>
);

export default StatCard;
