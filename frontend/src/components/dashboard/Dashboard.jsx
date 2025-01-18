import React, { useState, useEffect } from "react";
import "./dashboard.css";
import Navbar from "../Navbar";

const Dashboard = () => {
  const [repositories, setRepositories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestedRepositories, setSuggestedRepositories] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true); // Adding loading state

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    const fetchRepositories = async () => {
      try {
        const response = await fetch(
          `http://localhost:3002/repo/user/${userId}`
        );
        const data = await response.json();
        setRepositories(data.repositories || []); // Fallback to empty array if no data
      } catch (err) {
        console.error("Error while fetching repositories: ", err);
      }
    };

    const fetchSuggestedRepositories = async () => {
      try {
        const response = await fetch(`http://localhost:3002/repo/all`);
        const data = await response.json();
        setSuggestedRepositories(data || []); // Fallback to empty array if no data
      } catch (err) {
        console.error("Error while fetching suggested repositories: ", err);
      }
    };

    fetchRepositories();
    fetchSuggestedRepositories();

    setLoading(false); // Set loading to false after data fetching
  }, []);

  // Search handling logic
  useEffect(() => {
    if (searchQuery === "") {
      setSearchResults(repositories); // Show all repositories if no search query
    } else {
      const filteredRepo = repositories.filter((repo) =>
        repo.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filteredRepo);
    }
  }, [searchQuery, repositories]);

  return (
    <>
      <Navbar />
      <section id="dashboard">
        <aside>
          <h3>Suggested Repositories</h3>
          {loading ? (
            <p>Loading suggested repositories...</p> // Loading message
          ) : suggestedRepositories.length > 0 ? (
            suggestedRepositories.map((repo) => (
              <div key={repo._id}>
                <h4>{repo.name}</h4>
                <h4>{repo.description}</h4>
              </div>
            ))
          ) : (
            <p>No suggested repositories found.</p> // Fallback message when no repositories are found
          )}
        </aside>
        <main>
          <h2>Your Repositories</h2>
          <div id="search">
            <input
              type="text"
              value={searchQuery}
              placeholder="Search repositories..."
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          {loading ? (
            <p>Loading your repositories...</p> // Loading message
          ) : searchResults.length > 0 ? (
            searchResults.map((repo) => (
              <div key={repo._id}>
                <h4>{repo.name}</h4>
                <h4>{repo.description}</h4>
              </div>
            ))
          ) : (
            <p>No repositories found for the search query.</p> // Fallback message when no results match the search
          )}
        </main>
        <aside>
          <h3>Upcoming Events</h3>
          <ul>
            <li>
              <p>Tech Conference - Dec 15</p>
            </li>
            <li>
              <p>Developer Meetup - Dec 25</p>
            </li>
            <li>
              <p>React Summit - Jan 5</p>
            </li>
          </ul>
        </aside>
      </section>
    </>
  );
};

export default Dashboard;
