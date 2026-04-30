import type { DetailedHTMLProps, HTMLAttributes } from 'react';

type ModelViewerAttributes = {
  src: string;
  alt?: string;
  poster?: string;
  'auto-rotate'?: boolean | string;
  'camera-controls'?: boolean | string;
  'touch-action'?: string;
  'shadow-intensity'?: string | number;
  'shadow-softness'?: string | number;
  exposure?: string | number;
  'environment-image'?: string;
  'rotation-per-second'?: string;
  'auto-rotate-delay'?: string | number;
  'camera-orbit'?: string;
  'min-camera-orbit'?: string;
  'max-camera-orbit'?: string;
  'field-of-view'?: string;
  'interaction-prompt'?: 'auto' | 'when-focused' | 'none';
  'disable-zoom'?: boolean | string;
  loading?: 'auto' | 'lazy' | 'eager';
  reveal?: 'auto' | 'manual';
};

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': DetailedHTMLProps<
        HTMLAttributes<HTMLElement> & ModelViewerAttributes,
        HTMLElement
      >;
    }
  }
}

export {};
