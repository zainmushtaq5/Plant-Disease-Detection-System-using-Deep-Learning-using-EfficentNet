import { useState } from "react";
import ImageUpload from "../components/features/ImageUpload";
import WebcamCapture from "../components/features/WebcamCapture";
import { Camera, AlertCircle, Upload } from "lucide-react";
import { motion } from "framer-motion";

const Detection = () => {
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [isCameraMode, setIsCameraMode] = useState(false);

  const handleImageSelect = (file, url) => {
    setImageFile(file);
    setPreviewUrl(url);
    setIsCameraMode(false);
    setResult(null);
  };

  const handleClear = () => {
    setImageFile(null);
    setPreviewUrl(null);
    setResult(null);
  };

  const handlePredict = async () => {
    if (!imageFile) return;

    setIsAnalyzing(true);

    try {
      const formData = new FormData();
      formData.append("file", imageFile);

      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Prediction failed");
      }

      const data = await response.json();

      setResult({
        disease: data.disease,
        confidence: data.confidence.toFixed(1),
        status: "critical",
        plant: data.plant,
        solution: data.solution,
      });
    } catch (error) {
      console.error("Error detecting disease:", error);
      alert(
        "Failed to analyze image. Please ensure the backend server is running.",
      );
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-6 bg-slate-50">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-heading font-bold text-slate-900 mb-4">
            Disease Detection Center
          </h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Upload a clear image of the plant leaf. Our AI will analyze patterns
            to identify potential diseases.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left Column: Upload / Camera */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-800">
                {isCameraMode ? "Camera Feed" : "Input Source"}
              </h2>
              <button
                onClick={() => setIsCameraMode(!isCameraMode)}
                className="flex items-center gap-2 text-sm font-medium text-primary-600 bg-primary-50 px-3 py-1.5 rounded-lg hover:bg-primary-100 transition-colors"
              >
                {isCameraMode ? (
                  <>
                    <Upload size={16} />
                    Switch to Upload
                  </>
                ) : (
                  <>
                    <Camera size={16} />
                    Switch to Camera
                  </>
                )}
              </button>
            </div>

            <div className="min-h-[400px]">
              {isCameraMode ? (
                <WebcamCapture
                  onCapture={handleImageSelect}
                  onCancel={() => setIsCameraMode(false)}
                />
              ) : (
                <ImageUpload
                  onImageSelect={handleImageSelect}
                  selectedImage={previewUrl}
                  onClear={handleClear}
                />
              )}
            </div>

            <div className="mt-8">
              <button
                onClick={handlePredict}
                disabled={!imageFile || isAnalyzing || isCameraMode}
                className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg transition-all duration-300 ${
                  !imageFile || isAnalyzing || isCameraMode
                    ? "bg-slate-200 text-slate-400 cursor-not-allowed shadow-none"
                    : "bg-primary-600 text-white hover:bg-primary-700 hover:shadow-primary-600/30 transform hover:-translate-y-1"
                }`}
              >
                {isAnalyzing ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Analyzing...
                  </span>
                ) : (
                  "Analyze Plant"
                )}
              </button>
            </div>
          </div>

          {/* Right Column: Results Placeholder */}
          <div className="relative">
            {result ? (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white p-8 rounded-3xl shadow-lg border border-primary-100"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-red-700 font-bold text-xs mb-6">
                  <AlertCircle size={14} />
                  Disease Detected
                </div>

                <h3 className="text-3xl font-heading font-bold text-slate-900 mb-2">
                  {result.disease}
                </h3>
                <p className="text-slate-500 mb-8">
                  Detected in{" "}
                  <span className="font-semibold text-slate-900">
                    {result.plant}
                  </span>{" "}
                  plant
                </p>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="text-sm text-slate-500 mb-1">
                      Confidence
                    </div>
                    <div className="text-2xl font-bold text-primary-600">
                      {result.confidence}%
                    </div>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="text-sm text-slate-500 mb-1">Severity</div>
                    <div className="text-2xl font-bold text-red-500">High</div>
                  </div>
                </div>

                <div className="p-6 bg-primary-50 rounded-2xl">
                  <h4 className="font-bold text-primary-900 mb-2">
                    Recommended Action
                  </h4>
                  <p className="text-primary-700 text-sm leading-relaxed">
                    {result.solution}
                  </p>
                </div>
              </motion.div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center p-12 text-center text-slate-400 border-2 border-dashed border-slate-200 rounded-3xl bg-slate-50/50">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4 text-slate-300">
                  <AlertCircle size={32} />
                </div>
                <h3 className="text-lg font-semibold text-slate-600">
                  No Analysis Yet
                </h3>
                <p className="text-sm">
                  Upload an image or capture a photo allowing our AI to
                  diagnose.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detection;
