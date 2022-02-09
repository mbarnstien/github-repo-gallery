//div where profile information will appear
const profile = document.querySelector(".overview");
const username = "mbarnstien";
const repoList = document.querySelector(".repo-list");
const repoSection = document.querySelector(".repos");
const repoData = document.querySelector(".repo-data");

const profileInformation = async function () {
    const response = await fetch(`https://api.github.com/users/${username}`)
    const userData = await response.json();
    displayUserData(userData);
};

profileInformation();

const displayUserData = function (userData) {
    const profileDiv = document.createElement("div");
    profileDiv.classList.add("user-info");
    profileDiv.innerHTML = `
        <figure> 
            <img alt="user avatar" src=${userData.avatar_url} /> 
        </figure>
        <div>
            <p><strong>Name:</strong> ${userData.name}</p>
            <p><strong>Bio:</strong> ${userData.bio}</p>
            <p><strong>Location:</strong> ${userData.location}</p>
            <p><strong>Number of public repos:</strong> ${userData.public_repos}</p>
        </div>
    `;
    profile.append(profileDiv);
    fetchRepos();
};

const fetchRepos = async function( ) {
    const repos = await fetch(`https://api.github.com/users/${username}/repos?direction=desc&per_page=100`);
    const allRepos = await repos.json();
    repoTitle(allRepos);
};

const repoTitle = function (allRepos) {
    for (const repo of allRepos) {
        const li = document.createElement("li");
        li.classList.add("repo");
        li.innerHTML = `<h3>${repo.name}</h3>`;
        repoList.append(li);
    }
};

repoList.addEventListener("click", function(e) {
    if (e.target.matches("h3")) {
        const repoName = e.target.innerText; 
        fetchRepoInfo(repoName);
    }
});

const fetchRepoInfo = async function(repoName) {
    const result = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await result.json();
    const fetchLanguages = await fetch (repoInfo.languages_url);
    const languageData = await fetchLanguages.json();
    
    const languages = [];
    for (const language in languageData) {
        languages.push(language);
    }

    displayRepoInfo(repoInfo, languages);
};

const displayRepoInfo = function(repoInfo, languages) {
    repoData.innerHTML = "";
    const repoDiv = document.createElement("div"); 
    repoDiv.innerHTML = `
        <h3>Name: ${repoInfo.name}</h3>
            <p>Description: ${repoInfo.description}</p>
            <p>Default Branch: ${repoInfo.default_branch}</p>
            <p>Languages: ${languages.join(" , ")}</p>
            <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
    `;
    repoData.append(repoDiv);
    repoData.classList.remove("hide");
    repoSection.classList.add("hide");
};