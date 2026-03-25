// import axios from "axios";

// async function getCourses(roadmap) {
//   if (typeof roadmap === "string") {
//     roadmap = roadmap.split("\n");
//   }

//   roadmap = roadmap.filter((s) => s.length > 3).slice(0, 5);

//   const query = roadmap.join(" ");

//   try {
//     const res = await axios.get(
//       "https://udemy-paid-courses-for-free-api.p.rapidapi.com/rapidapi/courses/search",

//       {
//         headers: {
//           "X-RapidAPI-Key": process.env.RAPIDAPI_KEY,

//           "X-RapidAPI-Host": "udemy-paid-courses-for-free-api.p.rapidapi.com",
//         },

//         params: {
//           query,
//         },
//       },
//     );

//     return res.data?.courses?.slice(0, 6) || [];
//   } catch {
//     return roadmap.map((skill) => ({
//       title: skill + " Course",

//       url: "https://coursera.org",

//       price: "Free",

//       image: "https://img-c.udemycdn.com/course/480x270/1565838_e54e_16.jpg",

//       description: "Recommended learning course",
//     }));
//   }
// }

// export default getCourses;
