import { useEffect, useRef, useState } from "react";
import {
    FaceLandmarker,
    FilesetResolver
} from "@mediapipe/tasks-vision";
import { init, detect } from "../utils/utils";
import "../styles/faceexpression.scss"

export default function FaceExpression({ onClick = () => { } }) {
    const videoRef = useRef(null);
    const landmarkerRef = useRef(null);
    const animationRef = useRef(null);
    const streamRef = useRef(null);
    let stream;

    const [expression, setExpression] = useState("Detecting...");


    function functionHandleClick() {
        const expression = detect({ videoRef, landmarkerRef, setExpression })
        onClick({ expression })
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
            />
            <h2 className="expression-text">{expression}</h2>
            <button className="detect-btn" onClick={() => functionHandleClick}>
                Detect Expression
            </button>
        </div>
    );
    // return (
    //     <div style={{ textAlign: "center"  }}>
    //         <video
    //             ref={videoRef}
    //             style={{ width: "400px", borderRadius: "12px" }}
    //             playsInline
    //         />
    //         <h2>{expression}</h2>
    //         <button onClick={()=>functionHandleClick} >Detect expression</button>
    //     </div>
    // );
}