import {
    FaceLandmarker,
    FilesetResolver
} from "@mediapipe/tasks-vision";
import { getRandomMoodText } from "./moodText";

export const init = async ({ videoRef, landmarkerRef, streamRef }) => {
    const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
    );

    landmarkerRef.current = await FaceLandmarker.createFromOptions(
        vision,
        {
            baseOptions: {
                modelAssetPath:
                    "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/latest/face_landmarker.task"
            },
            outputFaceBlendshapes: true,
            runningMode: "VIDEO",
            numFaces: 1
        }
    );

    streamRef.current = await navigator.mediaDevices.getUserMedia({ video: true });
    videoRef.current.srcObject = streamRef.current;
    await videoRef.current.play();

    detect();
};

export const detect = ({ videoRef, landmarkerRef, setExpression }) => {
    if (!landmarkerRef.current || !videoRef.current) return;

    const results = landmarkerRef.current.detectForVideo(
        videoRef.current,
        performance.now()
    );

    if (results.faceBlendshapes?.length > 0) {
        const blendshapes = results.faceBlendshapes[0].categories;

        const getScore = (name) =>
            blendshapes.find((b) => b.categoryName === name)?.score || 0;

        const smileLeft = getScore("mouthSmileLeft");
        const smileRight = getScore("mouthSmileRight");
        const jawOpen = getScore("jawOpen");
        const browUp = getScore("browInnerUp");
        const frownLeft = getScore("mouthFrownLeft");
        const frownRight = getScore("mouthFrownRight");
        const browDownLeft = getScore("browDownLeft");
        const browDownRight = getScore("browDownRight");
        const eyeBlinkLeft = getScore("eyeBlinkLeft");
        const eyeBlinkRight = getScore("eyeBlinkRight");


        const happiness = (smileLeft + smileRight) / 2;
        const sadness =
            (frownLeft * 0.4) +
            (frownRight * 0.4) +
            (browUp * 0.15) +
            ((eyeBlinkLeft + eyeBlinkRight) / 2 * 0.05);
        const surprise = (jawOpen + browUp) / 2;
        const anger = (browDownLeft + browDownRight) / 2;

        console.log(getScore("mouthFrownLeft"))

        let emotion = "netural";
        let intensity = 0;
        let level = "low"

        const scores = {
            happy: happiness,
            sad: sadness,
            surprised: surprise,
            angry: anger
        };

        const maxEmotion = Object.entries(scores).reduce((a, b) =>
            a[1] > b[1] ? a : b
        );

        emotion = maxEmotion[0];
        intensity = maxEmotion[1];

        if (intensity < 0.15) {
            emotion = "netural"
        }

        if (intensity >= 0.7) {
            level = "high";
        } else if (intensity >= 0.4) {
            level = "medium";
        } else if (intensity >= 0.2) {
            level = "low";
        }

        if (sadness > 0.25 && happiness < 0.3) {
            emotion = "sad";
            intensity = sadness;
        }

        const friendlyText = getRandomMoodText(emotion)

        setExpression(friendlyText)


        return { emotion, intensity, level };
    }
};
