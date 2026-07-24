/**
 * ES Module: Thankyou Display Manager
 * Parses GET URL search parameters and renders submitted application details
 */

export function displayFormData() {
    const container = document.getElementById("submitted-data");
    if (!container) return;

    const params = new URLSearchParams(window.location.search);

    const fname = params.get("fname") || "";
    const lname = params.get("lname") || "";
    const email = params.get("email") || "";
    const phone = params.get("phone") || "";
    const organization = params.get("organization") || "";
    const orgtitle = params.get("orgtitle") || "";
    const membership = params.get("membership") || "";
    const description = params.get("description") || "";
    const timestamp = params.get("timestamp") || "";

    const membershipNames = {
        np: "NP Membership (Non-Profit - No Fee)",
        bronze: "Bronze Membership ($100/yr)",
        silver: "Silver Membership ($300/yr)",
        gold: "Gold Membership ($500/yr)"
    };

    let formattedDate = timestamp;
    if (timestamp) {
        try {
            const dateObj = new Date(timestamp);
            if (!isNaN(dateObj.getTime())) {
                formattedDate = dateObj.toLocaleString("en-US", {
                    dateStyle: "full",
                    timeStyle: "medium"
                });
            }
        } catch (e) {
            console.error("Date formatting error:", e);
        }
    }

    container.innerHTML = `
        <div class="thankyou-summary">
            <h3>Submitted Application Details</h3>
            <p class="summary-intro">Thank you, <strong>${escapeHTML(fname)} ${escapeHTML(lname)}</strong>! We have successfully received your membership application.</p>
            <dl class="summary-list">
                <div class="summary-item">
                    <dt>First Name:</dt>
                    <dd>${escapeHTML(fname)}</dd>
                </div>
                <div class="summary-item">
                    <dt>Last Name:</dt>
                    <dd>${escapeHTML(lname)}</dd>
                </div>
                <div class="summary-item">
                    <dt>Email Address:</dt>
                    <dd><a href="mailto:${escapeHTML(email)}">${escapeHTML(email)}</a></dd>
                </div>
                <div class="summary-item">
                    <dt>Mobile Phone Number:</dt>
                    <dd><a href="tel:${escapeHTML(phone)}">${escapeHTML(phone)}</a></dd>
                </div>
                <div class="summary-item">
                    <dt>Business / Organization Name:</dt>
                    <dd>${escapeHTML(organization)}</dd>
                </div>
                ${orgtitle ? `
                <div class="summary-item">
                    <dt>Organizational Title:</dt>
                    <dd>${escapeHTML(orgtitle)}</dd>
                </div>` : ''}
                <div class="summary-item">
                    <dt>Selected Membership Level:</dt>
                    <dd><span class="badge badge-${escapeHTML(membership)}">${escapeHTML(membershipNames[membership] || membership)}</span></dd>
                </div>
                ${description ? `
                <div class="summary-item">
                    <dt>Organization Description:</dt>
                    <dd>${escapeHTML(description)}</dd>
                </div>` : ''}
                <div class="summary-item">
                    <dt>Application Timestamp:</dt>
                    <dd>${escapeHTML(formattedDate)}</dd>
                </div>
            </dl>
        </div>
    `;
}

function escapeHTML(str) {
    if (!str) return '';
    return str.replace(/[&<>'"]/g, 
        tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
}
