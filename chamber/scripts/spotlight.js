// Load company spotlight


const spotlightContainer =
    document.querySelector("#spotlights");



async function loadSpotlights() {


    try {


        const response =
            await fetch("data/members.json");


        const members =
            await response.json();



        // Keep only Gold and Silver members
        const premiumMembers = members.filter((member) => {
            const level = Number(member.membershipLevel);
            return level === 3 || level === 2;
        });



        // Random selection
        const randomMembers = premiumMembers
            .sort(() => Math.random() - 0.5)
            .slice(0, 3);



        displaySpotlights(randomMembers);



    } catch (error) {


        console.log(error);


    }


}




function displaySpotlights(members) {


    spotlightContainer.innerHTML = "";



    members.forEach(member => {



        const card =
            document.createElement("article");


        card.classList.add(
            "spotlight-card"
        );



        const level = Number(member.membershipLevel);
        const membershipLabel = level === 3 ? "Gold" : level === 2 ? "Silver" : "Member";

        card.innerHTML = `
            <img src="${member.image || "images/default-logo.png"}" alt="${member.name} logo">
            <h3>${member.name}</h3>
            <p>${member.description || ""}</p>
            <p>📍 ${member.address}</p>
            <p>📞 ${member.phone}</p>
            <p>⭐ ${membershipLabel} member</p>
            <a href="${member.website}" target="_blank" rel="noopener noreferrer">Visit Website</a>
        `;



        spotlightContainer.appendChild(card);



    });


}



loadSpotlights();