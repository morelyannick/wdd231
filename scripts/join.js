// ===================================
// ABIDJAN CHAMBER OF COMMERCE
// Join Module
// ===================================

const JoinModule = {
    memberships: [
        {
            id: "nonprofit",
            name: "Non-Profit Membership",
            price: 0,
            description: "For non-profit organizations",
            benefits: [
                "Directory listing",
                "Access to networking events",
                "Community support",
            ],
        },
        {
            id: "silver",
            name: "Silver Membership",
            price: 500000,
            description: "For small and medium-sized businesses",
            benefits: [
                "Premium directory listing",
                "Business training and workshops",
                "Access to all networking events",
                "Social media publication",
            ],
        },
        {
            id: "gold",
            name: "Gold Membership",
            price: 1500000,
            description: "For established businesses",
            benefits: [
                "Premium directory listing",
                "Business training and workshops",
                "VIP access to events",
                "Custom advertising",
                "Priority social media publication",
                "Dedicated business support",
            ],
        },
    ],

    // Initialize join module
    init() {
        try {
            const joinContainer = document.getElementById("join");
            if (!joinContainer) {
                console.log("Join container not found, skipping join module");
                return;
            }

            // Display pricing cards
            this.displayPricingCards();

            // Setup form event listener
            this.setupFormListener();

            // Setup membership level selector
            this.setupMembershipSelector();
        } catch (error) {
            console.error("Join module error:", error);
        }
    },

    // Display pricing cards
    displayPricingCards() {
        const pricingContainer = document.getElementById("pricing-cards");
        if (!pricingContainer) return;

        const cardsHTML = this.memberships
            .map((membership, index) => this.createPricingCard(membership, index))
            .join("");

        pricingContainer.innerHTML = cardsHTML;

        // Add click handlers to "Choose Plan" buttons
        document.querySelectorAll(".pricing-choose-btn").forEach((btn, index) => {
            btn.addEventListener("click", () => {
                const membershipLevel = document.getElementById("membership-level");
                if (membershipLevel) {
                    membershipLevel.value = this.memberships[index].id;
                    membershipLevel.dispatchEvent(new Event("change"));
                    // Scroll to form
                    document.getElementById("join-form").scrollIntoView({ behavior: "smooth" });
                }
            });
        });
    },

    // Create pricing card HTML
    createPricingCard(membership, index) {
        const isGold = membership.id === "gold";
        const priceText =
            membership.price === 0
                ? "Free"
                : new Intl.NumberFormat("en-CI", {
                    style: "currency",
                    currency: "XOF",
                    minimumFractionDigits: 0,
                }).format(membership.price);

        const benefitsHTML = membership.benefits.map((benefit) => `<li>${benefit}</li>`).join("");

        return `
      <div class="pricing-card ${isGold ? "featured" : ""}">
        <h3>${membership.name}</h3>
        <div class="price">${priceText}</div>
        <p class="price-period">${membership.description}</p>
        <ul class="benefits-list">
          ${benefitsHTML}
        </ul>
        <button class="pricing-choose-btn cta-btn">Choose this plan</button>
      </div>
    `;
    },

    // Setup membership level selector
    setupMembershipSelector() {
        const membershipLevel = document.getElementById("membership-level");
        if (!membershipLevel) return;

        const options = this.memberships
            .map((m) => `<option value="${m.id}">${m.name}</option>`)
            .join("");

        membershipLevel.innerHTML = '<option value="">-- Select a plan --</option>' + options;

        // Add event listener to update description
        membershipLevel.addEventListener("change", (e) => {
            const selected = this.memberships.find((m) => m.id === e.target.value);
            const description = document.getElementById("membership-description");
            if (description && selected) {
                description.textContent = selected.description;
            }
        });
    },

    // Setup form event listener
    setupFormListener() {
        const form = document.getElementById("join-form");
        if (!form) return;

        form.addEventListener("submit", (e) => {
            e.preventDefault();
            this.handleFormSubmit(form);
        });
    },

    // Handle form submission
    handleFormSubmit(form) {
        // Collect form data
        const formData = new FormData(form);
        const data = {
            firstName: formData.get("firstName"),
            lastName: formData.get("lastName"),
            company: formData.get("company"),
            position: formData.get("position"),
            email: formData.get("email"),
            phone: formData.get("phone"),
            membershipLevel: formData.get("membership-level"),
            companyDescription: formData.get("company-description"),
            timestamp: new Date().toISOString(),
        };

        // Validate form
        if (!this.validateForm(data)) {
            return;
        }

        // Show success message
        this.showSuccessMessage(form, data);

        // Store data in localStorage
        this.storeApplicationData(data);

        // Reset form
        form.reset();
    },

    // Validate form data
    validateForm(data) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[0-9\s\-\+\(\)]+$/;

        if (!data.firstName || data.firstName.trim().length === 0) {
            alert("Please enter your first name");
            return false;
        }

        if (!data.lastName || data.lastName.trim().length === 0) {
            alert("Please enter your last name");
            return false;
        }

        if (!data.company || data.company.trim().length === 0) {
            alert("Please enter your company name");
            return false;
        }

        if (!data.email || !emailRegex.test(data.email)) {
            alert("Please enter a valid email address");
            return false;
        }

        if (!data.phone || !phoneRegex.test(data.phone)) {
            alert("Please enter a valid phone number");
            return false;
        }

        if (!data.membershipLevel) {
            alert("Please select a membership plan");
            return false;
        }

        if (!data.companyDescription || data.companyDescription.trim().length === 0) {
            alert("Please describe your company");
            return false;
        }

        return true;
    },

    // Show success message
    showSuccessMessage(form, data) {
        const membership = this.memberships.find((m) => m.id === data.membershipLevel);
        const messageHTML = `
      <div class="success-message" style="
        background-color: var(--light-bg);
        border-left: 4px solid var(--success-color);
        padding: 1.5rem;
        border-radius: 8px;
        margin-bottom: 2rem;
        animation: slideIn 0.3s ease-out;
      ">
        <h3 style="color: var(--success-color); margin-top: 0;">Application received!</h3>
        <p>Thank you ${data.firstName} ${data.lastName}. Your application for the <strong>${membership.name}</strong> plan has been received.</p>
        <p>We will contact you at <strong>${data.email}</strong> within 48 hours.</p>
        <p style="font-size: 0.9rem; color: var(--dark-text);">Tracking number: <code>${this.generateTrackingNumber()}</code></p>
      </div>
    `;

        form.insertAdjacentHTML("beforebegin", messageHTML);

        // Auto-remove success message after 5 seconds
        setTimeout(() => {
            const messages = document.querySelectorAll(".success-message");
            if (messages.length > 0) {
                messages[0].style.animation = "slideOut 0.3s ease-out";
                setTimeout(() => messages[0].remove(), 300);
            }
        }, 5000);

        // Add animation styles
        if (!document.querySelector('style[data-animations]')) {
            const style = document.createElement("style");
            style.setAttribute("data-animations", "true");
            style.innerHTML = `
        @keyframes slideIn {
          from { transform: translateX(-20px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
          from { transform: translateX(0); opacity: 1; }
          to { transform: translateX(-20px); opacity: 0; }
        }
      `;
            document.head.appendChild(style);
        }
    },

    // Generate tracking number
    generateTrackingNumber() {
        return `ACC-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    },

    // Store application data in localStorage
    storeApplicationData(data) {
        try {
            let applications = JSON.parse(localStorage.getItem("applications")) || [];
            applications.push(data);
            localStorage.setItem("applications", JSON.stringify(applications));
            console.log("Application stored successfully");
        } catch (error) {
            console.error("Error storing application:", error);
        }
    },

    // Get stored applications (for admin use)
    getApplications() {
        try {
            return JSON.parse(localStorage.getItem("applications")) || [];
        } catch (error) {
            console.error("Error retrieving applications:", error);
            return [];
        }
    },

    // Export applications as CSV
    exportApplicationsAsCSV() {
        const applications = this.getApplications();
        if (applications.length === 0) {
            alert("No applications to export");
            return;
        }

        const headers = [
            "First Name",
            "Last Name",
            "Company",
            "Position",
            "Email",
            "Phone",
            "Plan",
            "Description",
            "Date",
        ];
        const rows = applications.map((app) => [
            app.firstName,
            app.lastName,
            app.company,
            app.position,
            app.email,
            app.phone,
            app.membershipLevel,
            app.companyDescription,
            new Date(app.timestamp).toLocaleString("en-CI"),
        ]);

        const csv = [headers, ...rows].map((row) => row.map((cell) => `"${cell}"`).join(",")).join("\n");

        const blob = new Blob([csv], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `applications_${new Date().toISOString().split("T")[0]}.csv`;
        link.click();
        window.URL.revokeObjectURL(url);
    },
};

// Initialize join module when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
    JoinModule.init();
});
