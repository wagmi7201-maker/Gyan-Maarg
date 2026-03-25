
export default function Roadmap({steps}){

return(

<div className="roadmap">

<h2>
Learning Path
</h2>

{steps.map((step,i)=>(

<div key={i} className="step">

<div className="circle">
{i+1}
</div>

<p>
{step}
</p>

<input type="checkbox"/>

</div>

))}

</div>

);

}
