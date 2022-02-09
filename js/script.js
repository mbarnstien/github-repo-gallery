//div where profile information will appear
const profile = document.querySelector(".overview");
const username = "mbarnstien";

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
};