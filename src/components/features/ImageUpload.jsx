import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, Image as ImageIcon, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';

const ImageUpload = ({ onImageSelect, selectedImage, onClear }) => {
    const onDrop = useCallback((acceptedFiles) => {
        if (acceptedFiles?.length > 0) {
            const file = acceptedFiles[0];
            const imageUrl = URL.createObjectURL(file);
            onImageSelect(file, imageUrl);
        }
    }, [onImageSelect]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.jpeg', '.jpg', '.png']
        },
        maxFiles: 1,
        multiple: false
    });

    return (
        <div className="w-full">
            <AnimatePresence mode="wait">
                {!selectedImage ? (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        key="upload-zone"
                        {...getRootProps()}
                        className={clsx(
                            "relative border-2 border-dashed rounded-3xl p-10 text-center cursor-pointer transition-all duration-300 group",
                            isDragActive
                                ? "border-primary-500 bg-primary-50"
                                : "border-slate-300 hover:border-primary-400 hover:bg-slate-50"
                        )}
                    >
                        <input {...getInputProps()} />

                        <div className="w-20 h-20 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                            <Upload size={32} />
                        </div>

                        <h3 className="text-xl font-bold text-slate-900 mb-2">
                            {isDragActive ? "Drop image here" : "Upload Plant Image"}
                        </h3>
                        <p className="text-slate-500 mb-6">
                            Drag & drop or click to browse files
                        </p>

                        <div className="inline-flex items-center gap-2 text-xs text-slate-400 bg-white px-3 py-1 rounded-full border border-slate-200">
                            <ImageIcon size={14} />
                            Supports JPG, PNG (Max 5MB)
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        key="preview"
                        className="relative rounded-3xl overflow-hidden shadow-lg group"
                    >
                        <img
                            src={selectedImage}
                            alt="Preview"
                            className="w-full h-96 object-cover"
                        />

                        {/* Overlay for remove button */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-start justify-end p-4">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onClear();
                                }}
                                className="bg-white/90 hover:bg-red-50 text-slate-700 hover:text-red-600 p-2 rounded-full shadow-lg backdrop-blur-sm transition-all duration-200"
                            >
                                <X size={20} />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ImageUpload;
