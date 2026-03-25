import { useState } from "react";

import CourseForm from "../components/CourseForm";

import CourseCard from "../components/CourseCard";

import Roadmap from "../components/Roadmap";

import "../styles/course.css";

export default function CourseDashboard() {
  const [data, setData] = useState(null);

  const [loading, setLoading] = useState(false);

  return (
    <div>
      <h1 className="title">AI Course Recommender</h1>

      <CourseForm setData={setData} setLoading={setLoading} />

      {loading && (
        <div className="aiLoading">
          <div className="spinnerLarge" />

          <p>AI analyzing your skills...</p>
        </div>
      )}

      {data && !loading && (
        <>
          <Roadmap steps={data.roadmap} />

          <div className="courseGrid">
            {data.courses.map((c, i) => (
              <CourseCard key={i} course={c} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
