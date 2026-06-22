import { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";
import { Camera, RotateCcw, X } from "lucide-react";

const WebcamCapture = ({ onCapture, onCancel }) => {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
  }, [webcamRef]);

  const retake = () => {
    setImgSrc(null);
  };

  const confirm = () => {
    if (imgSrc) {
      fetch(imgSrc)
        .then((res) => res.blob()) /* make file */
        .then((blob) => {
          const file = new File([blob], "camera-capture.jpg", {
            type: "image/jpeg",
          });
          onCapture(file, imgSrc);
        });
    }
  };

  return (
    <div className="relative rounded-3xl overflow-hidden bg-black aspect-[4/3] flex flex-col items-center justify-center">
      {!imgSrc ? (
        <>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            className="w-full h-full object-cover"
            videoConstraints={{
              facingMode: "environment",
            }}
          />

          <div className="absolute bottom-6 left-0 right-0 flex items-center justify-center gap-6">
            <button
              onClick={onCancel}
              className="p-3 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/30 transition-colors"
              title="Cancel"
            >
              <X size={24} />
            </button>

            <button
              onClick={capture}
              className="w-16 h-16 rounded-full border-4 border-white flex items-center justify-center bg-transparent hover:bg-white/20 transition-all active:scale-95"
            >
              <div className="w-12 h-12 rounded-full bg-white" />
            </button>

            <div className="w-12" />
          </div>
        </>
      ) : (
        <>
          <img
            src={imgSrc}
            alt="Captured"
            className="w-full h-full object-cover"
          />

          <div className="absolute bottom-6 left-0 right-0 flex items-center justify-center gap-4">
            <button
              onClick={retake}
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-white text-slate-900 font-bold shadow-lg hover:bg-slate-100 transition-colors"
            >
              <RotateCcw size={18} />
              Retake
            </button>

            <button
              onClick={confirm}
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-primary-600 text-white font-bold shadow-lg hover:bg-primary-700 transition-colors"
            >
              <Camera size={18} />
              Use Photo
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default WebcamCapture;
