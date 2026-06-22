import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Activity } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary-50/50 -skew-x-12 translate-x-32" />
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
        <div className="absolute top-40 -left-20 w-72 h-72 bg-secondary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
      </div>

      <div className="container mx-auto px-6 z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 border border-primary-100 text-primary-700 font-medium text-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
            AI-Powered Plant Health Analysis
          </div>

          <h1 className="text-5xl lg:text-7xl font-heading font-extrabold text-slate-900 leading-tight mb-6">
            Protect Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-500">
              Crop Yields
            </span>
          </h1>

          <p className="text-lg text-slate-600 mb-8 max-w-lg leading-relaxed">
            Instantly detect plant diseases using advanced Deep Learning (CNN).
            Upload a photo or use your camera to get real-time diagnosis and
            treatment advice.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/detection"
              className="btn-primary flex items-center justify-center gap-2 group"
            >
              Start Diagnosis
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/info"
              className="btn-secondary flex items-center justify-center gap-2"
            >
              How It Works
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-slate-200">
            <div className="flex flex-col gap-1">
              <h3 className="text-3xl font-bold text-slate-900">98%</h3>
              <p className="text-sm text-slate-500">Accuracy Rate</p>
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="text-3xl font-bold text-slate-900">38+</h3>
              <p className="text-sm text-slate-500">Disease Classes</p>
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="text-3xl font-bold text-slate-900">5-6 sec</h3>
              <p className="text-sm text-slate-500">Processing Time</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="relative z-10 card-glass p-6 md:p-8 border border-white/40 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-red-50 text-red-500 rounded-lg">
                  <Activity size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800">Analysis Result</h3>
                  <p className="text-xs text-slate-500">Just Now</p>
                </div>
              </div>
              <span className="px-3 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-full border border-red-200">
                Critical
              </span>
            </div>

            <div className="aspect-video bg-slate-100 rounded-xl mb-6 overflow-hidden relative group">
              <div className="absolute inset-0 flex items-center justify-center bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                <span className="text-xs font-mono text-white bg-black/50 px-2 py-1 rounded">
                  scanning...
                </span>
              </div>
              <img
                src="/images/infected_leaf.png"
                alt="Infected Leaf Analysis"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm font-medium mb-1">
                  <span className="text-slate-700">Tomato Early Blight</span>
                  <span className="text-red-600">92.4% Match</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-red-500 w-[92%]" />
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-lg text-sm text-slate-600 leading-snug">
                <span className="font-semibold text-slate-900 block mb-1">
                  Recommendation:
                </span>
                Remove infected leaves and apply a copper-based fungicide.
                Improve airflow around the plant.
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
