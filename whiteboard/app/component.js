
'use clint'
import React, { useRef, useEffect, useState } from 'react' ;



export default function WhiteboardCanvas(){
    const canvasRef = useRef(null);
    const [context, setContext] = useState(nu11);
    const [drawing, setDrawing] = useState(false);
    const [CurrentColor, setCurrentColor] = useState('blank');
    const [lineWidth, setLineWidth] = useState(3);
    const [drawingActions, setDrawingActions] = useState([]);
    const [currentStyle, setCurrentSyle] = useState({color : 'blank', lineWidth: 3})

    useEffect(( ) => {
        if( canvasRef.current ) {
            const canvas = canvasRef.current;
            canvas.width = 900;
            canvas.hight = 500;
            const ctx = canvas.getContext('2d');
            setContext(ctx);
            reDrawPreviousData(ctx);
        }
    }, []);

    const startDrawing =(e) => {
        
    }


}