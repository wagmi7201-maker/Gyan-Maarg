
export default function CourseCard({course}){

return(

<div className="courseCard">

<img
src={course.image}
className="courseImg"
/>

<h3>{course.title}</h3>

<p>⭐ {course.rating}</p>

<p>💰 {course.price}</p>

<p>⏱ {course.duration}</p>

<p>{course.description}</p>

<a
href={course.link}
target="_blank"
className="courseBtn"
>
View Course
</a>

</div>

);

}
