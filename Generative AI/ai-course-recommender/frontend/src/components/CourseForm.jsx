import axios from "axios";
import { useState } from "react";

function CourseForm() {
  const [skills, setSkills] = useState("");
  const [goal, setGoal] = useState("");
  const [data, setData] = useState({
    roadmap: [],
  });
  const [loading, setLoading] = useState(false);

  async function analyze() {
    try {
      setLoading(true);

      const res = await axios.post("http://localhost:5001/api/recommend", {
        skills,
        goal,
      });

      console.log(res.data);

      setData(res.data);

      setLoading(false);
    } catch (e) {
      console.log(e);

      setLoading(false);
    }
  }

  return (
    <div className="container">
      <input
        placeholder="Your skills"
        value={skills}
        onChange={(e) => setSkills(e.target.value)}
      />

      <input
        placeholder="Career goal"
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
      />

      <button onClick={analyze}>
        {loading ? "Generating..." : "Generate Roadmap"}
      </button>

      {data?.roadmap && (
        <div>
          <h2>Learning Path</h2>

          {data.roadmap.map((step, i) => (
            <div className="stepCard" key={i}>
              <h3>Step {step?.step || i + 1}</h3>

              <h2>{step?.title || "Skill"}</h2>

              <p>{step?.description || ""}</p>

              <p>⏱ {step?.time || "2 weeks"}</p>

              <p>📈 {step?.level || "Beginner"}</p>

              <h4>Topics</h4>

              <ul>
                {step?.topics?.map((t, i) => (
                  <li key={i}>{t}</li>
                ))}
              </ul>

              <h3>Courses</h3>

              <div className="courseGrid">
                {step?.courses?.map((course, i) => (
                  <div className="courseCard" key={i}>
                    <img
                      src={
                        course?.image ||
                        "https://img-c.udemycdn.com/course/480x270/1565838_e54e_16.jpg"
                      }
                      onError={(e) => {
                        e.target.src =
                          "https://img-c.udemycdn.com/course/480x270/1565838_e54e_16.jpg";
                      }}
                      className="courseImg"
                    />

                    <h4>{course?.name || "Course"}</h4>

                    <p>
                      Platform:
                      {course?.platform || "Online"}
                    </p>

                    <p>⭐ {course?.rating || "4.5"}</p>

                    <p>💰 {course?.price || "Free"}</p>

                    <p>⏱ {course?.duration || "10h"}</p>

                    <p>👨‍🎓 {course?.students || "10k"}</p>

                    <a
                      href={course?.link || "https://coursera.org"}
                      target="_blank"
                      rel="noreferrer"
                    >
                      View Course
                    </a>
                  </div>
                )) || <p>No courses</p>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CourseForm;
