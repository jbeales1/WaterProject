import { useEffect, useState } from "react";
import {Project} from '../types/Project';
import { useNavigate } from "react-router-dom";
import { fetchProjects } from "../api/ProjectsAPI";
import Pagination from "./Pagination";

function ProjectList ({selectedCategories} : {selectedCategories: string[]}) {

    // projects is the data setProjects allows us to update the data

    const [projects, setProjects] = useState<Project[]>([]);
    const [pageSize, setPageSize] = useState<number>(10);
    const [pageNum, setPageNum] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
 
    // watch the cookies video to see this part
    // add , {credentials: 'include',}

    useEffect(() => {
        const loadProjects = async () => {
            try {
                setLoading(true);
                const data = await fetchProjects(pageSize, pageNum, selectedCategories)
            

            setProjects(data.projects); // lowercase p to match the json
            setTotalPages(Math.ceil(data.totalNumProjects / pageSize));
            } catch (error) {
                setError((error as Error).message);
            } finally {
                setLoading(false);
            }
        };

        loadProjects();

    }, [pageSize, pageNum, selectedCategories]);

    if (loading) return <p>Loading projects...</p>
    if (error) return <p className="text-red-500">Error: (error)</p>

    return (
        <>
            {projects.map((p) => (            
                <div key={p.projectId} id="projectCard" className="card">
                <h3 className="card-title">{p.projectName}</h3>
                <div className="card-body">
                    <ul className="list-unstyled">
                        <li>
                            <strong>Project Type: </strong> 
                            {p.projectType}
                        </li>
                        <li>
                            <strong>Project Program: </strong> 
                            {p.projectRegionalProgram}
                        </li>
                        <li>
                            <strong>Impact: </strong> 
                            {p.projectImpact} Individuals Served
                        </li>
                        <li>
                            <strong>Project Phase: </strong>
                            {p.projectPhase}
                        </li>
                        <li>
                            <strong>Project Status: </strong>
                            {p.projectFunctionalityStatus}
                        </li>
                    </ul>

                    <button className="btn btn-success" onClick={() => navigate(`/donate/${p.projectName}/${p.projectId}`)}>Donate</button>

                </div>
            </div>
            ))}
            
            <Pagination 
                currentPage={pageNum}
                totalPages={totalPages}
                pageSize={pageSize}
                onPageChange={setPageNum}
                onPageSizeChange={(newSize) => {
                    setPageSize(newSize);
                    setPageNum(1);
            }}
            />
        </>
    );
}

export default ProjectList;