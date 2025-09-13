'use client';
import React, { useRef, useEffect, useState } from 'react';

type Point = { x: number; y: number };
type Style = { color: string; lineWidth: number };
type Action = { path: Point[]; style: Style };

export default function WhiteboardCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const [drawing, setDrawing] = useState(false);
  const [currentColor, setCurrentColor] = useState('black');
  const [lineWidth, setLineWidth] = useState(3);
  const [currentStyle, setCurrentStyle] = useState<Style>({ color: 'black', lineWidth: 3 });
  const [currentPath, setCurrentPath] = useState<Point[]>([]);
  const [drawingActions, setDrawingActions] = useState<Action[]>([]);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    // Basic sizing; adjust as needed
    canvas.width = 900;
    canvas.height = 500;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setContext(ctx);
    redrawAll(ctx, drawingActions);
  }, []); // initial mount

  useEffect(() => {
    if (context) redrawAll(context, drawingActions);
  }, [context, drawingActions]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!context) return;
    context.beginPath();
    context.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    setCurrentPath([{ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY }]);
    setDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!drawing || !context) return;

    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;

    context.strokeStyle = currentStyle.color;
    context.lineWidth = currentStyle.lineWidth;
    context.lineTo(x, y);
    context.stroke();

    setCurrentPath((prev) => [...prev, { x, y }]);
  };

  const endDrawing = () => {
    if (!drawing) return;
    setDrawing(false);
    if (context) context.closePath();

    if (currentPath.length > 0) {
      setDrawingActions((prev) => [
        ...prev,
        { path: currentPath, style: { ...currentStyle } },
      ]);
    }
    setCurrentPath([]);
  };

  const changeColor = (color: string) => {
    setCurrentColor(color);
    setCurrentStyle((s) => ({ ...s, color }));
  };

  const changeWidth = (width: number) => {
    setLineWidth(width);
    setCurrentStyle((s) => ({ ...s, lineWidth: width }));
  };

  const undoDrawing = () => {
    if (!canvasRef.current || !context || drawingActions.length === 0) return;

    const next = drawingActions.slice(0, -1);
    setDrawingActions(next);

    context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    redrawAll(context, next);
  };

  const clearDrawing = () => {
    if (!canvasRef.current || !context) return;
    setDrawingActions([]);
    setCurrentPath([]);
    context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  };

  const redrawAll = (
    ctx: CanvasRenderingContext2D,
    actions: Action[]
  ): void => {
    actions.forEach(({ path, style }) => {
      if (path.length === 0) return;
      ctx.beginPath();
      ctx.strokeStyle = style.color;
      ctx.lineWidth = style.lineWidth;
      ctx.moveTo(path[0].x, path[0].y);
      path.forEach((p) => ctx.lineTo(p.x, p.y));
      ctx.stroke();
      ctx.closePath();
    });
  };


   return (
    <div>
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={endDrawing}
        onMouseOut={endDrawing}
        className='border border-gray-400'
        style={{ border: '1px solid #ccc', cursor: 'crosshair', display: 'block' }}
      />
    </div>
  )
}
