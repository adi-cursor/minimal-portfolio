import { useEffect, useState, useMemo } from "react"
import ProjectCard from "./ProjectCard"

const GITHUB_USER = "adityaj08";
const LOAD_COUNT = 5;

const getProjectType = (repo) => {
  if (repo.topics) {
    if (repo.topics.includes('website')) return 'Website';
    if (repo.topics.includes('app')) return 'App';
  }
  
  const name = repo.name.toLowerCase();
  if (name.includes('web') || name.includes('site')) return 'Website';
  if (name.includes('app') || name.includes('mobile')) return 'App';
  
  return 'Website';
};

const getEventType = (repo) => {
  // Check repository topics first
  if (repo.topics) {
    if (repo.topics.includes('internship')) return 'Internship';
    if (repo.topics.includes('college')) return 'College Project';
    if (repo.topics.includes('side-project')) return 'Side Project';
  }
  
  // Check repository name patterns
  const name = repo.name.toLowerCase();
  if (name.includes('intern') || name.includes('internship')) return 'Internship';
  if (name.includes('college') || name.includes('university')) return 'College Project';
  
  // Default to Side Project if no specific indicators
  return 'Side Project';
};

// Function to get tech stack from repository topics
const getTechStack = (repo) => {
  if (!repo.topics) return [];
  
  // Filter out non-tech topics
  const nonTechTopics = ['website', 'app', 'internship', 'college', 'side-project'];
  return repo.topics.filter(topic => !nonTechTopics.includes(topic));
};

//Function to fetch (or fallback) the project image.
async function getProjectImage(repo) {
  const fallback = "https://opengraph.githubassets.com/1/" + repo.full_name;
  if (!repo.html_url) return fallback;
  const rawUrl = repo.html_url.replace("github.com", "raw.githubusercontent.com") + "/main/project.png";
  try {
    const res = await fetch(rawUrl, { method: "HEAD" });
    if (res.ok) return rawUrl;
  } catch (e) {}
  return fallback;
}

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [visibleCount, setVisibleCount] = useState(LOAD_COUNT);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageMap, setImageMap] = useState({});

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`https://api.github.com/users/${GITHUB_USER}/repos?per_page=100`);
        if (!res.ok) throw new Error("Failed to fetch projects");
        let data = await res.json();
        data = data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        setProjects(data);
        const newImageMap = {};
        for (const repo of data) {
          const imgUrl = await getProjectImage(repo);
          newImageMap[repo.id] = imgUrl;
        }
        setImageMap(newImageMap);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + LOAD_COUNT);
  };

  return (
    <div className='py-5 md:px-32'>
      <h1 className='text-4xl md:text-6xl text-white font-workSans font-light px-5 md:px-10 mb-4'>Selected Works</h1>
      <div className="w-11/12 mx-auto flex flex-col rounded-lg gap-2">
        <div className="mb-4 px-5 py-2 bg-yellow-900 bg-opacity-20 text-yellow-300 rounded-lg text-sm font-space">
          Projects are dynamically loaded from the GitHub API. There may be a delay or rate limit if you refresh too often.
        </div>
        {error && <div className="text-red-400 px-5">{error}</div>}
        {!error && projects.slice(0, visibleCount).map((repo, i) => {
          const imgUrl = imageMap[repo.id] || "https://opengraph.githubassets.com/1/" + repo.full_name;
          return (
            <ProjectCard
              key={repo.id}
              props={{
                name: repo.name,
                type: getProjectType(repo),
                event: getEventType(repo),
                year: new Date(repo.created_at).getFullYear(),
                link: repo.html_url,
                img: imgUrl,
                desc: repo.description || "No description provided.",
                techStack: getTechStack(repo)
              }}
              isLoaded={!loading && imgUrl !== undefined}
            />
          );
        })}
        {!loading && !error && visibleCount < projects.length && (
          <button
            onClick={handleLoadMore}
            className="mt-4 mx-auto bg-white bg-opacity-[0.01] h-[60px] w-[200px] relative flex items-center justify-center px-6 py-3 overflow-hidden font-bold text-white rounded-md shadow-2xl group transition-all hover:bg-opacity-20"
            style={{fontFamily: 'var(--font-space, inherit)'}}
          >
            <span className="relative text-xl font-space">Discover More</span>
          </button>
        )}
      </div>
    </div>
  )
}

export default Projects 