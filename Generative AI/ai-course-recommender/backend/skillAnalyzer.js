
function analyzeSkills(skills,roadmap){

let userSkills =
skills.toLowerCase().split(",");

return roadmap.filter(
skill =>
!userSkills.includes(
skill.toLowerCase()
)
);

}

export default analyzeSkills;
