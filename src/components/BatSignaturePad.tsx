'use client';

import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';

export interface BatSignaturePadHandle {
  clear: () => void;
  isEmpty: () => boolean;
  getDataURL: () => string | null;
}

interface Props {
  onChange?: (isEmpty: boolean) => void;
  className?: string;
}

interface Point {
  x: number;
  y: number;
}

/**
 * Pad de signature canvas, mouse + touch, lissage par bezier quadratique
 * a travers les milieux de segments. HiDPI-aware.
 */
const BatSignaturePad = forwardRef<BatSignaturePadHandle, Props>(function BatSignaturePad(
  { onChange, className = '' },
  ref,
) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawingRef = useRef(false);
  const pointsRef = useRef<Point[]>([]);
  // isEmptyRef pour l API imperative (getter), isEmpty pour le rendu
  const isEmptyRef = useRef(true);
  const [isEmpty, setIsEmpty] = useState(true);

  const setEmpty = useCallback(
    (v: boolean) => {
      isEmptyRef.current = v;
      setIsEmpty(v);
      onChange?.(v);
    },
    [onChange],
  );

  // ============================================================
  // Init canvas (HiDPI + resize observer)
  // ============================================================
  const setupCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();

    // Sauvegarde du dessin actuel pour le restaurer apres resize
    let snapshot: ImageData | null = null;
    const ctx = canvas.getContext('2d');
    if (ctx && canvas.width > 0 && canvas.height > 0) {
      try {
        snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
      } catch {
        snapshot = null;
      }
    }

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    if (!ctx) return;
    ctx.scale(dpr, dpr);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = '#0f172a'; // bleu-noir comme une vraie encre
    ctx.lineWidth = 2.2;

    if (snapshot) {
      // Pas de restauration parfaite si la taille change beaucoup, mais sufficient
      ctx.putImageData(snapshot, 0, 0);
    }
  }, []);

  useEffect(() => {
    setupCanvas();
    const onResize = () => setupCanvas();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [setupCanvas]);

  // ============================================================
  // Helpers de dessin
  // ============================================================
  const getLocalPoint = (e: PointerEvent | React.PointerEvent): Point => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const drawSmoothLine = (points: Point[]) => {
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx || points.length < 2) return;

    const last = points[points.length - 1];
    const prev = points[points.length - 2];

    if (points.length === 2) {
      // Premier segment : ligne droite
      ctx.beginPath();
      ctx.moveTo(prev.x, prev.y);
      ctx.lineTo(last.x, last.y);
      ctx.stroke();
      return;
    }

    // Bezier quadratique a travers le milieu du segment precedent
    const mid1 = {
      x: (points[points.length - 3].x + prev.x) / 2,
      y: (points[points.length - 3].y + prev.y) / 2,
    };
    const mid2 = {
      x: (prev.x + last.x) / 2,
      y: (prev.y + last.y) / 2,
    };

    ctx.beginPath();
    ctx.moveTo(mid1.x, mid1.y);
    ctx.quadraticCurveTo(prev.x, prev.y, mid2.x, mid2.y);
    ctx.stroke();
  };

  // ============================================================
  // Handlers pointer (unifie souris + tactile)
  // ============================================================
  const onPointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.setPointerCapture(e.pointerId);
    drawingRef.current = true;
    pointsRef.current = [getLocalPoint(e)];
  };

  const onPointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drawingRef.current) return;
    e.preventDefault();
    const point = getLocalPoint(e);
    pointsRef.current.push(point);
    drawSmoothLine(pointsRef.current);

    if (isEmptyRef.current) {
      setEmpty(false);
    }
  };

  const onPointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drawingRef.current) return;
    drawingRef.current = false;
    pointsRef.current = [];
    try {
      canvasRef.current?.releasePointerCapture(e.pointerId);
    } catch {}
  };

  const clear = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setEmpty(true);
  }, [setEmpty]);

  // ============================================================
  // API impérative pour le parent
  // ============================================================
  useImperativeHandle(
    ref,
    () => ({
      clear,
      isEmpty: () => isEmptyRef.current,
      getDataURL: () => {
        const canvas = canvasRef.current;
        if (!canvas || isEmptyRef.current) return null;
        return canvas.toDataURL('image/png');
      },
    }),
    [clear],
  );

  return (
    <div className={`relative ${className}`}>
      <div className="relative rounded-xl overflow-hidden bg-white border-2 border-zinc-200">
        <canvas
          ref={canvasRef}
          className="w-full h-full block touch-none cursor-crosshair"
          style={{ height: '220px' }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        />
        {isEmpty && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <p className="text-zinc-400 text-sm select-none">Signez ici avec le doigt ou la souris</p>
          </div>
        )}
        {/* Ligne guide */}
        <div className="absolute left-6 right-6 bottom-10 border-b border-zinc-300 pointer-events-none" />
      </div>

      <button
        type="button"
        onClick={clear}
        disabled={isEmpty}
        className="mt-3 text-xs text-zinc-400 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        Effacer et recommencer
      </button>
    </div>
  );
});

export default BatSignaturePad;
