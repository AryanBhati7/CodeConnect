import React from "react";
import { GithubIcon } from "lucide-react";
function ProjectCard({ project }) {
  return (
    <div className="p-5 sm-w-[360px] w-full">
      <div className="relative  w-full h-[230px]">
        <img
          src={project?.image?.url || "https://github.com/shadcn.png"}
          alt="project_image"
          className="w-full h-full object-cover rounded-2xl"
        />
      </div>

      <div className="mt-5 flex flex-col">
        <div className="flex justify-between">
          "
          <h3 className="text-white font-bold text-[24px]">
            {project?.name || "Project Title"}
          </h3>
          <div className="flex gap-3">
            <div className="violet-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer">
              <img
                src={project?.image?.url || "https://via.placeholder.com/150"}
                alt="source code"
                className="w-1/2 h-1/2 object-contain"
              />
            </div>
            <div className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer">
              <GithubIcon />
            </div>
          </div>
        </div>
        <p className="mt-2 text-white text-[14px]">
          {project?.description || "Project Description"}
        </p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {/* {project?.technologies?.map((tech) => (
          <p key={`${project?.name}-${tech.name}`} className={`text-[14px] ${tag.color}`}>
            #{tag.name}
          </p>
        ))} */}
        <p className="text-[14px]">React</p>
      </div>
    </div>
  );
}

export default ProjectCard;
