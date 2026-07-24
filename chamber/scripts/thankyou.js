document.addEventListener("DOMContentLoaded", () => {
    const summary = document.getElementById("submitted-data");
    if (!summary) return;

    const params = new URLSearchParams(window.location.search);
    const fields = [
        ["First Name", params.get("first-name")],
        ["Last Name", params.get("last-name")],
        ["Email", params.get("email")],
        ["Mobile Phone", params.get("phone")],
        ["Business / Organization", params.get("organization")],
        ["Application Date", formatTimestamp(params.get("timestamp"))],
    ];

    if (!params.toString()) {
        const message = document.createElement("p");
        message.className = "empty-summary";
        message.textContent = "No submitted application details were found.";
        summary.replaceWith(message);
        return;
    }

    fields.forEach(([label, value]) => {
        const item = document.createElement("div");
        item.className = "summary-item";

        const term = document.createElement("dt");
        term.textContent = label;

        const description = document.createElement("dd");
        description.textContent = value || "Not provided";

        item.append(term, description);
        summary.appendChild(item);
    });
});

function formatTimestamp(value) {
    if (!value) return "";

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;

    return new Intl.DateTimeFormat("en-US", {
        dateStyle: "medium",
        timeStyle: "short",
    }).format(date);
}
