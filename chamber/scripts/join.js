document.addEventListener("DOMContentLoaded", () => {
    const timestamp = document.getElementById("timestamp");

    if (timestamp) {
        timestamp.value = new Date().toISOString();
    }

    const modalTriggers = document.querySelectorAll("[data-modal]");
    const closeButtons = document.querySelectorAll(".modal-close");

    modalTriggers.forEach((trigger) => {
        trigger.addEventListener("click", (event) => {
            event.preventDefault();
            const modal = document.getElementById(trigger.dataset.modal);

            if (modal && typeof modal.showModal === "function") {
                modal.showModal();
            }
        });
    });

    closeButtons.forEach((button) => {
        button.addEventListener("click", () => {
            button.closest("dialog")?.close();
        });
    });

    document.querySelectorAll("dialog").forEach((dialog) => {
        dialog.addEventListener("click", (event) => {
            if (event.target === dialog) {
                dialog.close();
            }
        });
    });
});
