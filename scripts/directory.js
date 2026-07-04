// ===================================
// ABIDJAN CHAMBER OF COMMERCE
// Directory Module
// ===================================

const DirectoryModule = {
    members: [],
    filteredMembers: [],
    currentView: "grid", // grid or list

    // Initialize directory
    async init() {
        try {
            const directoryContainer = document.getElementById("directory");
            if (!directoryContainer) {
                console.log("Directory not found, skipping directory module");
                return;
            }

            // Load members data
            await this.loadMembers();

            // Setup event listeners
            this.setupEventListeners();

            // Display all members
            this.displayMembers(this.members);
        } catch (error) {
            console.error("Directory module error:", error);
        }
    },

    // Load members from JSON file
    async loadMembers() {
        try {
            const response = await fetch("data/members.json");
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            this.members = data.members;
            this.filteredMembers = [...this.members];
        } catch (error) {
            console.error("Error loading members:", error);
            // Use demo data if file not found
            this.loadDemoMembers();
        }
    },

    // Demo members data
    loadDemoMembers() {
        this.members = [
            {
                id: 1,
                name: "Orange Cote d'Ivoire",
                category: "Telecommunications",
                description: "Telecommunications service provider",
                phone: "+225 07 07 07 07 07",
                email: "contact@orange.ci",
                website: "www.orange.ci",
                address: "Plateau, Abidjan",
            },
            {
                id: 2,
                name: "MTN Cote d'Ivoire",
                category: "Telecommunications",
                description: "Leader in mobile services",
                phone: "+225 01 00 10 10",
                email: "info@mtn.ci",
                website: "www.mtn.ci",
                address: "Plateau, Abidjan",
            },
            {
                id: 3,
                name: "Societe Generale Cote d'Ivoire",
                category: "Banks",
                description: "Banking and financial services",
                phone: "+225 20 21 75 75",
                email: "contact@sgbf.ci",
                website: "www.sgbf.ci",
                address: "Plateau, Abidjan",
            },
            {
                id: 4,
                name: "NSIA Bank",
                category: "Banks",
                description: "Commercial bank",
                phone: "+225 20 20 08 08",
                email: "contact@nsiabanque.ci",
                website: "www.nsiabanque.ci",
                address: "Cocody, Abidjan",
            },
            {
                id: 5,
                name: "SOTRA",
                category: "Transport",
                description: "Road transport company",
                phone: "+225 21 24 51 51",
                email: "info@sotra-ci.com",
                website: "www.sotra-ci.com",
                address: "Autonomous Port, Abidjan",
            },
        ];
        this.filteredMembers = [...this.members];
    },

    // Setup event listeners
    setupEventListeners() {
        const searchBox = document.getElementById("search");
        const filterSelect = document.getElementById("filter");
        const viewBtns = document.querySelectorAll(".view-btn");

        if (searchBox) {
            searchBox.addEventListener("input", (e) => this.handleSearch(e.target.value));
        }

        if (filterSelect) {
            filterSelect.addEventListener("change", (e) => this.handleFilter(e.target.value));
        }

        viewBtns.forEach((btn) => {
            btn.addEventListener("click", (e) => {
                const view = e.target.dataset.view;
                if (view) {
                    this.setView(view);
                }
            });
        });
    },

    // Handle search
    handleSearch(query) {
        const lowerQuery = query.toLowerCase();
        this.filteredMembers = this.members.filter(
            (member) =>
                member.name.toLowerCase().includes(lowerQuery) ||
                member.description.toLowerCase().includes(lowerQuery) ||
                member.category.toLowerCase().includes(lowerQuery)
        );
        this.displayMembers(this.filteredMembers);
    },

    // Handle filter by category
    handleFilter(category) {
        if (category === "all") {
            this.filteredMembers = [...this.members];
        } else {
            this.filteredMembers = this.members.filter((member) => member.category === category);
        }
        this.displayMembers(this.filteredMembers);
    },

    // Set view type (grid or list)
    setView(view) {
        this.currentView = view;

        // Update button active state
        document.querySelectorAll(".view-btn").forEach((btn) => {
            btn.classList.remove("active");
            if (btn.dataset.view === view) {
                btn.classList.add("active");
            }
        });

        // Update display
        this.displayMembers(this.filteredMembers);
    },

    // Display members
    displayMembers(members) {
        const container = document.getElementById("members-list");
        if (!container) return;

        if (members.length === 0) {
            container.innerHTML = `
        <div class="no-results">
          <p>No businesses found. Try another search.</p>
        </div>
      `;
            return;
        }

        const membersHTML = members
            .map((member) => this.createMemberCard(member))
            .join("");

        container.className = `members-grid members-${this.currentView}`;
        container.innerHTML = membersHTML;
    },

    // Create member card HTML
    createMemberCard(member) {
        return `
      <div class="member-card">
        <h3>${member.name}</h3>
        <span class="member-category">${member.category}</span>
        <p class="member-details"><strong>Address:</strong> ${member.address}</p>
        <p class="member-details"><strong>Phone:</strong> <a href="tel:${member.phone}">${member.phone}</a></p>
        <p class="member-details"><strong>Email:</strong> <a href="mailto:${member.email}">${member.email}</a></p>
        <p class="member-details"><strong>Website:</strong> <a href="https://${member.website}" target="_blank">${member.website}</a></p>
        <p>${member.description}</p>
      </div>
    `;
    },

    // Get unique categories
    getCategories() {
        return [...new Set(this.members.map((member) => member.category))];
    },

    // Populate filter options
    populateFilters() {
        const filterSelect = document.getElementById("filter");
        if (!filterSelect) return;

        const categories = this.getCategories();
        const options = categories.map((cat) => `<option value="${cat}">${cat}</option>`).join("");

        filterSelect.innerHTML = '<option value="all">All categories</option>' + options;
    },
};

// Initialize directory module when DOM is ready
document.addEventListener("DOMContentLoaded", async () => {
    await DirectoryModule.init();
    DirectoryModule.populateFilters();
});
