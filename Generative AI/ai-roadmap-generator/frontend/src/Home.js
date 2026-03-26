import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [level, setLevel] = useState("");
  const [skills, setSkills] = useState("");
  const [goal, setGoal] = useState("");
  const [loading, setLoading] = useState(false);

  // NEW STATES
  const goalInputRef = useRef(null);
  const dropdownRef = useRef(null);
  const [suggestions, setSuggestions] = useState([]);
  const [typingTimeout, setTypingTimeout] = useState(null);
  const [activeIndex, setActiveIndex] = useState(-1);
  const navigate = useNavigate();

  useEffect(() => {
  const handleClickOutside = (event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target)
    ) {
      setSuggestions([]);
      setActiveIndex(-1);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);

  // GENERATE ROADMAP
  const generate = async () => {
    if (!level || !goal) {
      alert("Please fill the required fields");
      return;
    }

    setLoading(true);

    try {
      // http://127.0.0.1:8000/generate
      const res = await fetch("", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          level,
          skills: skills || "none",
          goal,
        }),
      });

      const data = await res.json();

      if (data.error) {
        alert(data.error);
        return;
      }

      navigate("/roadmap", { state: data });

    } catch (error) {
      alert("Server error. Make sure backend is running.");
    } finally {
      setLoading(false);
    }
  };

  // HANDLE GOAL INPUT WITH DEBOUNCE
  const handleGoalChange = (value) => {
    setGoal(value);
    setActiveIndex(-1);

    if (typingTimeout) clearTimeout(typingTimeout);

    const timeout = setTimeout(async () => {
      if (value.length > 2) {
        try {
          // `http://127.0.0.1:8000/suggest?query=${value}`
          const res = await fetch(
            
          );
          const data = await res.json();
          setSuggestions(data);
        } catch {
          setSuggestions([]);
        }
      } else {
        setSuggestions([]);
      }
    }, 400);

    setTypingTimeout(timeout);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      // If suggestion selected
      if (activeIndex >= 0) {
        setGoal(suggestions[activeIndex]);
        setSuggestions([]);
        setActiveIndex(-1);
      } else {
        // If no suggestion → still generate
        generate();
      }
    }

    if (!suggestions.length) return;

    if (e.key === "ArrowDown") {
      setActiveIndex((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : prev
      );
    }

    if (e.key === "ArrowUp") {
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : 0));
    }
  };



  const inputStyle = {
    width: "100%",
    padding: "14px",
    margin: "10px 0",
    borderRadius: "10px",
    border: "1px solid #ddd",
    fontSize: "14px",
    outline: "none",
    boxSizing: "border-box",
    // cursor: "pointer",
  };

  const buttonStyle = {
    width: "100%",
    padding: "14px",
    background: loading
      ? "#ccc"
      : "linear-gradient(135deg, #ff7e5f, #feb47b)",
    color: "white",
    border: "none",
    borderRadius: "12px",
    fontWeight: "bold",
    cursor: loading ? "not-allowed" : "pointer",
    marginTop: "15px",
    fontSize: "16px",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #667eea, #764ba2)",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "40px",
          borderRadius: "20px",
          width: "400px",
          boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
          textAlign: "center",
          position: "relative",
        }}
      >
        <h2 style={{ marginBottom: "10px", fontWeight: "bold" }}>
          Gyan-Maarg
        </h2>

        <p style={{ fontSize: "13px", color: "gray", marginBottom: "20px" }}>
          AI-Powered Career Roadmap Generator
        </p>

        {/* LEVEL */}
        <select
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          style={{ ...inputStyle,  cursor: "pointer" }}
        >
          <option value="">Select Skill Level</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Professional">Professional</option>
        </select>

        {/* SKILLS */}
        <input
          placeholder="Skills (optional: Python, SQL)"
          value={skills}
          onChange={(e) => setSkills(e.target.value)} 
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              goalInputRef.current?.focus(); 
            }
          }}
          style={inputStyle}
        />

        {/* GOAL + SUGGESTIONS */}
        <div ref={dropdownRef} style={{ position: "relative" }}>
          <input
            ref={goalInputRef}
              placeholder="Career Goal (e.g., Data Analyst)"
              value={goal}
              onChange={(e) => handleGoalChange(e.target.value)}
              onKeyDown={handleKeyDown}
              style={inputStyle}
          />

          {/* SUGGESTIONS DROPDOWN */}
          {suggestions.length > 0 && (
            <div
              style={{
                position: "absolute",
                top: "100%",
                left: 0,
                right: 0,
                background: "white",
                border: "1px solid #ddd",
                borderRadius: "10px",
                maxHeight: "150px",
                overflowY: "auto",
                zIndex: 10,
                textAlign: "left",

                opacity: suggestions.length > 0 ? 1 : 0,
                transform: suggestions.length > 0 ? "translateY(0)" : "translateY(-10px)",
                transition: "all 0.25s ease",
              }}
            >
              {suggestions.map((item, index) => {
                const isActive = index === activeIndex;

                const parts = item.split(new RegExp(`(${goal})`, "gi"));

                return (
                  <div
                    key={index}
                    style={{
                      padding: "10px",
                      cursor: "pointer",
                      background: isActive ? "#e0e7ff" : "white",
                      fontWeight: isActive ? "bold" : "normal"
                    }}
                    onClick={() => {
                      setGoal(item);
                      setSuggestions([]);
                      setActiveIndex(-1);
                    }}
                  >
                    {parts.map((part, i) =>
                      part.toLowerCase() === goal.toLowerCase() ? (
                        <span key={i} style={{ color: "#4a6cf7", fontWeight: "bold" }}>
                          {part}
                        </span>
                      ) : (
                        part
                      )
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* BUTTON */}
        <button onClick={generate} disabled={loading} style={buttonStyle}>
          {loading ? "⏳ Please wait..." : "🚀 Generate Roadmap"}
        </button>

      </div>
    </div>
  );
}

export default Home;