import { Zap, Shield, ClipboardCheck, Globe } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: <Zap className="w-8 h-8 text-yellow-500" />,
    title: "Instant Analysis",
    description:
      "Get results in seconds using our optimized EfficientNet deep learning model.",
    color: "bg-yellow-50",
  },
  {
    icon: <Shield className="w-8 h-8 text-primary-600" />,
    title: "98% Accuracy",
    description:
      "Trained on over 90,000 plant leaf images across 38 distinct classes.",
    color: "bg-primary-50",
  },
  {
    icon: <ClipboardCheck className="w-8 h-8 text-blue-500" />,
    title: "Expert Guidance",
    description:
      "Receive detailed treatment solutions and prevention tips for specific detected diseases.",
    color: "bg-blue-50",
  },
  {
    icon: <Globe className="w-8 h-8 text-purple-500" />,
    title: "Offline Capable",
    description:
      "Progressive Web App support allows basic functionality even without internet.",
    color: "bg-purple-50",
  },
];

const Features = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 mb-4">
            Why Choose Our System?
          </h2>
          <p className="text-slate-600 text-lg">
            Our system combines advanced AI with agricultural expertise to help
            you save your crops.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-lg hover:shadow-primary-100 transition-all duration-300 group"
            >
              <div
                className={`w-16 h-16 rounded-xl ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
              >
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 ml-1">
                {feature.title}
              </h3>
              <p className="text-slate-600 leading-relaxed ml-1">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
