import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};

export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #ff2d55 0%, #7928ca 100%)",
          borderRadius: 40,
        }}
      >
        <div
          style={{
            width: 80,
            height: 80,
            background: "white",
            borderRadius: 8,
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
