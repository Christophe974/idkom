export default function AmbientBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      <div
        className="absolute w-[600px] h-[600px] rounded-full animate-pulse-slow blur-[150px]"
        style={{
          background: 'radial-gradient(circle, rgba(255,45,85,0.15) 0%, transparent 70%)',
          left: '-10%',
          top: '0%',
        }}
      />
      <div
        className="absolute w-[500px] h-[500px] rounded-full animate-pulse-slow blur-[150px]"
        style={{
          background: 'radial-gradient(circle, rgba(121,40,202,0.12) 0%, transparent 70%)',
          right: '-5%',
          top: '30%',
          animationDelay: '2s',
        }}
      />
      <div
        className="absolute w-[400px] h-[400px] rounded-full animate-pulse-slow blur-[150px]"
        style={{
          background: 'radial-gradient(circle, rgba(0,212,255,0.1) 0%, transparent 70%)',
          left: '30%',
          bottom: '0%',
          animationDelay: '4s',
        }}
      />
    </div>
  );
}
