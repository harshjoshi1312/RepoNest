import React, { useState, useEffect } from "react";

const Dashboard = () => {
  const [repositories, setRepositories] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [suggestedRepositories, setSuggestedRepositories] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  // you can fetching data using the axios and fetch both

  // for fetcing data from api
  useEffect(() => {
    const userId = localStorage.getItem("userId");

    const fetchRepositories = async () => {
      try {
        const res = await fetch(`http://localhost:3002/repo/user/${userId}`);
        const data = await res.json();
        console.log(data);

        setRepositories(data.repositories);
      } catch (error) {
        console.error("error while fetching repositories", error);
      }
    };

    fetchRepositories();
  }, []);

  // fetching all suggested repositories

  useEffect(() => {
    const fetchSuggestedRepositories = async () => {
      try {
        const res = await fetch("http://localhost:3002/repo/all");
        const data = await res.json();
        console.log(data);

        setSuggestedRepositories(data.repositories);
        console.log(suggestedRepositories);
      } catch (error) {
        console.error("error while fetching suggested repositories", error);
      }
    };

    fetchSuggestedRepositories();
  }, []);
};

export default Dashboard;
