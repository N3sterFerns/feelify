import React from 'react'
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,

} from "recharts";
import "../styles/moodgraph.scss"
import { useState } from 'react';
import { useEffect } from 'react';
import { moodColorMap } from '../utils/moodColors';
import { useSong } from '../../home/hooks/useSong';

const MoodGraph = () => {

    // const [data, setData] = useState([]);

    // useEffect(() => {
    //     // Dummy mood analytics data
    //     const dummyData = [
    //         { emotion: "Happy", count: 12 },
    //         { emotion: "Sad", count: 5 },
    //         { emotion: "Angry", count: 3 },
    //         { emotion: "Neutral", count: 7 },
    //         { emotion: "Excited", count: 9 }
    //     ];

    //     setData(dummyData);
    // }, []);

    const {analyticsGraph} = useSong()
    console.log(analyticsGraph)
    return (
        <div className="mood-analytics">
            <h2 className="analytics-title">Your Mood Analytics</h2>

            <div className="chart-container">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={analyticsGraph}>
                        <XAxis dataKey="emotion" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="count"
                            radius={[6, 6, 0, 0]}
                            shape={(props) => {
                                const mood = props.payload.emotion.toLowerCase();
                                const color = moodColorMap[mood] || "#8884d8";

                                return <rect {...props} fill={color} />;
                            }} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default MoodGraph