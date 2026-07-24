/**
 * ES Module: Modal Dialog Manager
 * Manages opening, closing, and backdrop clicking for HTML <dialog> modals
 */

export function initModals() {
    const openButtons = document.querySelectorAll(".modal-open-btn");
    openButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const modalId = button.getAttribute("data-modal");
            if (modalId) {
                const modal = document.getElementById(modalId);
                if (modal && typeof modal.showModal === "function") {
                    modal.showModal();
                }
            }
        });
    });

    const closeButtons = document.querySelectorAll(".modal-close-btn");
    closeButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const modal = button.closest("dialog");
            if (modal && typeof modal.close === "function") {
                modal.close();
            }
        });
    });

    const modals = document.querySelectorAll("dialog.membership-modal");
    modals.forEach((modal) => {
        modal.addEventListener("click", (event) => {
            const rect = modal.getBoundingClientRect();
            if (
                event.clientX < rect.left ||
                event.clientX > rect.right ||
                event.clientY < rect.top ||
                event.clientY > rect.bottom
            ) {
                modal.close();
            }
        });
    });
}
