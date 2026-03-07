import { useEffect, useRef, useState } from "react";
import {
    FaceLandmarker,
    FilesetResolver
} from "@mediapipe/tasks-vision";
import { init, detect } from "../utils/utils";
import "../styles/faceexpression.scss"
import { useAuth } from "../../auth/hooks/useAuth";

export default function FaceExpression({ onClick = () => { } }) {
    const videoRef = useRef(null);
    const landmarkerRef = useRef(null);
    const animationRef = useRef(null);
    const streamRef = useRef(null);
    let stream;

    const [expression, setExpression] = useState("Detecting...");
    const { loading, btnLoader, setBtnLoader } = useAuth()
    console.log(btnLoader)

    function functionHandleClick() {
        setBtnLoader(true)
        const expression = detect({ videoRef, landmarkerRef, setExpression })
        onClick({ expression })
        setBtnLoader(false)
    }

    useEffect(() => {


        init({ videoRef, landmarkerRef, streamRef });

        return () => {

            if (landmarkerRef.current) {
                landmarkerRef.current.close();
            }

            if (videoRef.current?.srcObject) {
                videoRef.current.srcObject
                    .getTracks()
                    .forEach((track) => track.stop());
            }
        };
    }, []);

    return (
        <div className="expression-container">
            <video
                ref={videoRef}
                className="expression-video"
                playsInline
                height={400}
            />
            {/* <h2 className="expression-text">{expression}</h2> */}
            <button className="detect-btn" onClick={functionHandleClick}>
                {btnLoader ?(
                    <svg width={25} height={25} fill="hsl(228, 80%, 60%)" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z"><animateTransform attributeName="transform" type="rotate" dur="0.75s" values="0 12 12;360 12 12" repeatCount="indefinite" /></path></svg>
                ):(
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M480-160q-134 0-227-93t-93-227q0-134 93-227t227-93q134 0 227 93t93 227q0 134-93 227t-227 93Zm0-80q100 0 170-70t70-170q0-17-2.5-33.5T710-546q-15 3-30 4.5t-30 1.5q-63 0-120-24t-102-70q-28 57-77 99t-111 61q3 98 72.5 166T480-240ZM256-566q44-23 67-53.5t45-72.5q-38 20-67 52.5T256-566Zm95.5 154.5Q340-423 340-440t11.5-28.5Q363-480 380-480t28.5 11.5Q420-457 420-440t-11.5 28.5Q397-400 380-400t-28.5-11.5ZM650-620h12q6 0 12-1-33-45-83.5-72T480-720h-12q-6 0-11 1 39 45 82.5 72T650-620Zm-98.5 208.5Q540-423 540-440t11.5-28.5Q563-480 580-480t28.5 11.5Q620-457 620-440t-11.5 28.5Q597-400 580-400t-28.5-11.5ZM40-720v-120q0-33 23.5-56.5T120-920h120v80H120v120H40ZM240-40H120q-33 0-56.5-23.5T40-120v-120h80v120h120v80Zm480 0v-80h120v-120h80v120q0 33-23.5 56.5T840-40H720Zm120-680v-120H720v-80h120q33 0 56.5 23.5T920-840v120h-80Zm-383 1Zm-89 27Z" /></svg>
                )
                }
                Capture Expression
                <span>ready</span>
            </button>
            <p className="face-note">Data is processed locally and never stored on servers.</p>
        </div>
    );
}