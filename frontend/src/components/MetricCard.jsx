import { motion } from 'framer-motion';

const MetricCard = ({ title, value, subtitle }) => (
  <motion.div whileHover={{ scale: 1.02 }} className="card">
    <p className="text-sm text-slate-400">{title}</p>
    <h3 className="mt-2 text-3xl font-semibold">{value}</h3>
    <p className="mt-2 text-xs text-accent">{subtitle}</p>
  </motion.div>
);

export default MetricCard;
