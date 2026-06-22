import { motion } from "framer-motion";
import { GraduationCap, Code, Target, Database, Activity } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen pt-24 pb-12 px-6 bg-slate-50 flex items-center justify-center">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Column: Text & Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 text-primary-700 font-bold text-sm mb-6">
              <GraduationCap size={18} />
              Final Year Capstone Project
            </div>

            <h1 className="text-5xl font-heading font-extrabold text-slate-900 mb-6 leading-tight">
              Developed by <br />
              <span className="text-primary-600">Computer Science</span> Student
            </h1>

            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              This project represents the culmination of my undergraduate
              studies, demonstrating proficiency in Full Stack Development and
              Artificial Intelligence. My goal was to solve a real-world
              agricultural problem using modern technology.
            </p>

            <div className="space-y-6 mb-10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-700 shadow-sm">
                  <span className="font-bold text-xl">U</span>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">
                    THE UNIVERSITY OF HARIPUR
                  </h4>
                  <p className="text-slate-500 text-sm">
                    Bachelor of Science in Computer Science
                  </p>
                </div>
              </div>
            </div>

            {/* Project Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
              <div className="p-4 rounded-2xl bg-white border border-slate-100 shadow-sm">
                <Activity className="text-primary-600 mb-2" size={20} />
                <div className="text-xl font-bold text-slate-900">98%</div>
                <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
                  Accuracy
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-slate-100 shadow-sm">
                <Database className="text-blue-500 mb-2" size={20} />
                <div className="text-xl font-bold text-slate-900">90k+</div>
                <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
                  Images
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-slate-100 shadow-sm">
                <Target className="text-purple-500 mb-2" size={20} />
                <div className="text-xl font-bold text-slate-900">38</div>
                <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
                  Classes
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Tech Stack & Profile */}
          <div className="relative">
            <div className="relative z-10 bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-yellow-100 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-primary-100 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>

              <h3 className="text-2xl font-bold font-heading text-slate-800 mb-6 flex items-center gap-2">
                <Code className="text-primary-600" />
                Technology Stack
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 rounded-xl hover:bg-primary-50 transition-colors group">
                  <div className="font-bold text-slate-900 group-hover:text-primary-700">
                    Frontend
                  </div>
                  <div className="text-sm text-slate-500">
                    React, Tailwind CSS
                  </div>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl hover:bg-primary-50 transition-colors group">
                  <div className="font-bold text-slate-900 group-hover:text-primary-700">
                    AI Model
                  </div>
                  <div className="text-sm text-slate-500">
                    Python, TensorFlow, Keras, CNN
                  </div>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl hover:bg-primary-50 transition-colors group">
                  <div className="font-bold text-slate-900 group-hover:text-primary-700">
                    Deployment
                  </div>
                  <div className="text-sm text-slate-500">
                    Local Development Server
                  </div>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl hover:bg-primary-50 transition-colors group">
                  <div className="font-bold text-slate-900 group-hover:text-primary-700">
                    Tools
                  </div>
                  <div className="text-sm text-slate-500">Kaggle, VS Code</div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100 text-center">
                <p className="text-slate-500 italic text-sm">
                  "Leveraging technology for sustainable agriculture."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
