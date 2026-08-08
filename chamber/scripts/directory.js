document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Hamburger Menu Toggle
    const hamburger = document.getElementById('hamburger-btn');
    const navMenu = document.getElementById('primary-nav');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('open');
            navMenu.classList.toggle('open');
        });
    }

    // 2. Dynamic Footer Dates
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    const lastModifiedSpan = document.getElementById('last-modified');
    if (lastModifiedSpan) {
        lastModifiedSpan.textContent = document.lastModified;
    }

    // 3. Fetch and Render Members
    const membersContainer = document.getElementById('members-container');
    const gridBtn = document.getElementById('grid-view-btn');
    const listBtn = document.getElementById('list-view-btn');

    let membersData = [];

    async function getMembers() {
        try {
            const response = await fetch('data/members.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            membersData = await response.json();
            displayMembers(membersData);
        } catch (error) {
            console.error('Error fetching members:', error);
            if (membersContainer) {
                membersContainer.innerHTML = `<p class="error-msg">Unable to load business members list at this time. Please try again later.</p>`;
            }
        }
    }

    function displayMembers(members) {
        if (!membersContainer) return;
        membersContainer.innerHTML = '';

        members.forEach(member => {
            const card = document.createElement('section');
            card.className = 'member-card';

            // Determine membership string
            let membershipText = 'Member';
            let membershipClass = 'member';
            if (member.membershipLevel === 3) {
                membershipText = 'Gold';
                membershipClass = 'gold';
            } else if (member.membershipLevel === 2) {
                membershipText = 'Silver';
                membershipClass = 'silver';
            }

            // Build standard markup supporting both grid and list styling
            card.innerHTML = `
                <div class="member-info-left">
                    <img src="${member.image}" alt="${member.name} Logo" class="member-logo" loading="lazy">
                    <div>
                        <h3 class="member-name">${member.name}</h3>
                        <span class="membership-badge ${membershipClass}">${membershipText}</span>
                    </div>
                </div>
                <div class="member-info-mid">
                    <span class="member-category">${member.category}</span>
                    <p class="member-desc">${member.description}</p>
                </div>
                <div class="member-info-right">
                    <div class="member-details">
                        <p class="member-address">📍 ${member.address}</p>
                        <p class="member-phone">📞 ${member.phone}</p>
                    </div>
                    <a href="${member.website}" class="member-website" target="_blank" rel="noopener">Visit Website</a>
                </div>
            `;
            membersContainer.appendChild(card);
        });
    }

    // View Toggles
    if (gridBtn && listBtn && membersContainer) {
        gridBtn.addEventListener('click', () => {
            membersContainer.classList.add('grid-view');
            membersContainer.classList.remove('list-view');
            gridBtn.classList.add('active');
            listBtn.classList.remove('active');
        });

        listBtn.addEventListener('click', () => {
            membersContainer.classList.add('list-view');
            membersContainer.classList.remove('grid-view');
            listBtn.classList.add('active');
            gridBtn.classList.remove('active');
        });
    }

    // Load data
    getMembers();
});
