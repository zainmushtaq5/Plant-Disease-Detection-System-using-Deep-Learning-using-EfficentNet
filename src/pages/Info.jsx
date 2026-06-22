import { motion } from 'framer-motion';
import { Database, Cpu, Activity, Layers } from 'lucide-react';

const InfoSection = ({ title, children, delay = 0 }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay }}
        viewport={{ once: true }}
        className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 mb-8"
    >
        <h2 className="text-2xl font-bold font-heading text-slate-800 mb-4">{title}</h2>
        <div className="text-slate-600 leading-relaxed text-lg space-y-4">
            {children}
        </div>
    </motion.div>
);

const Info = () => {
    return (
        <div className="min-h-screen pt-24 pb-12 px-6 bg-slate-50">
            <div className="container mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-heading font-extrabold text-slate-900 mb-6">
                        System Information
                    </h1>
                    <p className="text-xl text-slate-500 max-w-2xl mx-auto">
                        Technical overview of the Deep Learning model and methodology used in this project.
                    </p>
                </div>

                <InfoSection title="Project Overview">
                    <p>
                        The <span className="font-semibold text-primary-700">Plant Disease Detection System</span> is
                        an automated solution designed to assist farmers and agricultural experts in identifying
                        plant diseases at an early stage. Leveraging Deep Learning techniques,
                        the system analyzes leaf images to classify diseases with high accuracy.
                    </p>
                </InfoSection>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="bg-gradient-to-br from-primary-600 to-primary-800 p-8 rounded-3xl text-white shadow-xl"
                    >
                        <div className="bg-white/20 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                            <Cpu size={24} />
                        </div>
                        <h3 className="text-2xl font-bold mb-4">Deep Learning (CNN)</h3>
                        <p className="text-primary-100 leading-relaxed">
                            We utilize Convolutional Neural Networks (CNNs), specifically the
                            <span className="font-bold text-white"> EfficientNet </span> architecture,
                            renowned for its balance between accuracy and computational efficiency.
                            The model extracts complex feature maps from leaf images to distinguish between healthy and diseased tissues.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm"
                    >
                        <div className="bg-blue-50 text-blue-600 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                            <Database size={24} />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-4">Dataset</h3>
                        <p className="text-slate-600 leading-relaxed">
                            The model was trained on the <span className="font-semibold text-slate-900">PlantVillage Dataset</span>,
                            containing over 90,000 labeled images across 38 class labels. Data augmentation techniques
                            (rotation, flipping, zooming) were applied to prevent overfitting and improve generalization.
                        </p>
                    </motion.div>
                </div>

                <InfoSection title="How It Works" delay={0.2}>
                    <div className="flex flex-col md:flex-row items-center gap-8 py-4">
                        <div className="flex-1 text-center">
                            <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-4 text-primary-600 font-bold text-xl border-2 border-primary-100">1</div>
                            <h4 className="font-bold text-slate-900 mb-2">Image Acquisition</h4>
                            <p className="text-sm">User captures or uploads a leaf image via the frontend interface.</p>
                        </div>
                        <div className="hidden md:block w-12 h-0.5 bg-slate-200" />
                        <div className="flex-1 text-center">
                            <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-4 text-primary-600 font-bold text-xl border-2 border-primary-100">2</div>
                            <h4 className="font-bold text-slate-900 mb-2">Preprocessing</h4>
                            <p className="text-sm">Image is resized (224x224), normalized, and converted to tensor format.</p>
                        </div>
                        <div className="hidden md:block w-12 h-0.5 bg-slate-200" />
                        <div className="flex-1 text-center">
                            <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-4 text-primary-600 font-bold text-xl border-2 border-primary-100">3</div>
                            <h4 className="font-bold text-slate-900 mb-2">Inference</h4>
                            <p className="text-sm">The CNN model analyzes the image and predicts the disease class with a confidence score.</p>
                        </div>
                    </div>
                </InfoSection>

                <InfoSection title="Why Deep Learning?" delay={0.3}>
                    <ul className="space-y-4">
                        <li className="flex gap-4">
                            <div className="mt-1 bg-green-100 p-1 rounded-full h-fit"><Activity size={16} className="text-green-600" /></div>
                            <div>
                                <span className="font-bold text-slate-800">High Accuracy:</span>
                                Traditional computer vision relies on hand-crafted features. Deep learning employs automated feature extraction, resulting in superior performance on complex natural images.
                            </div>
                        </li>
                        <li className="flex gap-4">
                            <div className="mt-1 bg-green-100 p-1 rounded-full h-fit"><Layers size={16} className="text-green-600" /></div>
                            <div>
                                <span className="font-bold text-slate-800">Scalability:</span>
                                The system can be easily retrained to include more plant species and diseases by simply adding more data to the training set.
                            </div>
                        </li>
                    </ul>
                </InfoSection>

            </div>
        </div>
    );
};

export default Info;
