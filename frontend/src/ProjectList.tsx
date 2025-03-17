import { useEffect, useState } from "react";
import {Project} from './types/Project';

function ProjectList () {

    // projects is the data setProjects allows us to update the data

    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
        const fetchProjects = async () => {
            const response = await fetch('https://localhost:5000/Water/AllProjects');
            const data = await response.json();
            setProjects(data);
        };

        fetchProjects();

    }, []);

    return (
        <>
            <h1>Water Projects</h1>
            <br />
            {projects.map((p) => (            
                <div id="projectCard">
                <h3>{p.projectName}</h3>

                <ul>
                    <li>Project Type: {p.projectType}</li>
                    <li>Project Program: {p.projectRegionalProgram}</li>
                    <li>Impact: {p.projectImpact} Individuals Served</li>
                    <li>Project Phase: {p.projectPhase}</li>
                    <li>Project Status: {p.projectFunctionalityStatus}</li>
                </ul>

            </div>
            ))}
        </>
    );
}

export default ProjectList;