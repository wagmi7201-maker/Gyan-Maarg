import { useNavigate, useLocation } from "react-router-dom";
import html2canvas from "html2canvas";
import { useRef } from "react";
import { useState } from "react";

function Roadmap() {
  const navigate = useNavigate();
  const location = useLocation();
  const result = location.state;
  const pdfRef = useRef();
  const [isPDF, setIsPDF] = useState(false);

  // Error Handling
  if (!result || result.error) {
    return (
      <div style={{ padding: "30px", textAlign: "center" }}>
        <h3>{result?.error || "No data found"}</h3>
        <button onClick={() => navigate("/")}>Go Back</button>
      </div>
    );
  }

  if (!Array.isArray(result.roadmap) || result.roadmap.length === 0) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h3>No roadmap generated</h3>
        <button onClick={() => navigate("/")}>Go Back</button>
      </div>
    );
  }

  // Image Download
  const downloadImage = async () => {
    setIsPDF(true); // optional (for removing gradients)
    await new Promise((res) => setTimeout(res, 300));

    const element = pdfRef.current;

    const canvas = await html2canvas(element, {
      scale: 3, //  HD quality
      useCORS: true,
    });

    const image = canvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.href = image;
    link.download = "roadmap.png";
    link.click();

    setIsPDF(false);
  };

  return (
    <div
      style={{
        padding: "40px 20px",
        background: "linear-gradient(135deg, #eef2ff, #f8fafc)",
        position: "relative",
        minHeight: "100vh",
        fontFamily: "Inter, sans-serif",
      }}
    >
      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        style={{
          marginBottom: "20px",
          padding: "8px 16px",
          borderRadius: "8px",
          border: "none",
          background: "#4a6cf7",
          color: "white",
          cursor: "pointer",
        }}
      >
        ← Back
      </button>

      {/* Sticky Download Button */}
      <div
        style={{
          position: "sticky",
          top: "10px",
          display: "flex",
          justifyContent: "flex-end",
          zIndex: 1000,
          marginBottom: "10px",
        }}
      >
        <button
          onClick={downloadImage}
          style={{
            padding: "10px 16px",
            borderRadius: "10px",
            border: "none",
            background: "linear-gradient(135deg, #4a6cf7, #8b5cf6)",
            color: "white",
            cursor: "pointer",
            fontWeight: "500",
            boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
          }}
        >
          Download
        </button>
      </div>

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "50px" }}>
        <h1 style={{ fontSize: "28px", marginBottom: "10px" }}>
           Career Roadmap
        </h1>

        <h3 style={{ color: "#4a6cf7", fontWeight: "600" }}>
          🎯 {result.role?.toUpperCase()}
        </h3>
      </div>

      {/* Timeline */}
      <div
        ref={pdfRef}
        style={{
          position: "relative",
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        {/* Vertical Line */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: 0,
            bottom: 0,
            width: "3px",
            background: "linear-gradient(to bottom, #4a6cf7, #8b5cf6)",
            transform: "translateX(-50%)",
          }}
        />

        {result.roadmap.map((item, index) => {
          const isLeft = index % 2 === 0;

          return (
            <div
              key={index}
              style={{
                position: "relative",
                display: "flex",
                justifyContent: isLeft ? "flex-start" : "flex-end",
                alignItems: "center",
                marginBottom: "60px",
              }}
            >
              {/* CENTER LINE DOT */}
              <div
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "30px",
                  transform: "translateX(-50%)",
                  width: "20px",
                  height: "20px",
                  background: "#4a6cf7",
                  borderRadius: "50%",
                  border: "4px solid white",
                  boxShadow: "0 0 0 3px #4a6cf7",
                  zIndex: 2,
                }}
              />

              {/* CARD */}
              <div
                style={{
                  width: "42%",
                  background: "linear-gradient(135deg, #ffffff, #f1f5ff)",
                  border: "1px solid #e0e7ff",
                  padding: "22px",
                  borderRadius: "16px",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
                  transition: "all 0.3s ease",

                  // ✅ ONLY GAP CONTROL HERE
                  marginLeft: isLeft ? "0" : "80px",
                  marginRight: isLeft ? "80px" : "0",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-6px)";
                  e.currentTarget.style.boxShadow =
                    "0 20px 40px rgba(0,0,0,0.12)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 10px 25px rgba(0,0,0,0.08)";
                }}
              >
                {/* Title */}
                <h4
                  style={{
                    marginBottom: "12px",
                    fontSize: "16px",
                    color: isPDF ? "#4a6cf7" : "transparent",
                    background: isPDF
                      ? "none"
                      : "linear-gradient(135deg, #4a6cf7, #8b5cf6)",
                    WebkitBackgroundClip: isPDF ? "unset" : "text",
                    WebkitTextFillColor: isPDF ? "unset" : "transparent",
                  }}
                >
                  Month {item.month}: {item.title}
                </h4>

                {/* Topics */}
                <ul style={{ paddingLeft: "18px", color: "#444" }}>
                  {Array.isArray(item.topics) &&
                    item.topics.map((topic, i) => (
                      <li key={i} style={{ marginBottom: "6px" }}>
                        {topic}
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating Button */}
      <button
        onClick={downloadImage}
        style={{
          position: "fixed",
          bottom: "30px",
          right: "30px",
          width: "55px",
          height: "55px",
          borderRadius: "50%",
          border: "none",
          background: "linear-gradient(135deg, #4a6cf7, #8b5cf6)",
          color: "white",
          fontSize: "22px",
          cursor: "pointer",
          boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000,
          transition: "all 0.3s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.1)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
        }}
      >
      </button>

      {/* Animation */}
      <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>

      <div
        style={{
          position: "absolute",
          bottom: "15px",
          right: "20px",
          fontSize: "12px",
          color: "#888",
          opacity: 0.7,
        }}
      >
        🚀 Generated by Gyan-Maarg
      </div>
    </div>
  );
}

export default Roadmap;