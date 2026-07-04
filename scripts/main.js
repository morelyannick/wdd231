// ===================================
// ABIDJAN CHAMBER OF COMMERCE
// Main JavaScript
// ===================================

// Hamburger Menu Toggle
document.addEventListener("DOMContentLoaded", function () {
    const hamburger = document.getElementById("hamburger");
    const nav = document.getElementById("nav");

    if (hamburger) {
        hamburger.addEventListener("click", function () {
            hamburger.classList.toggle("active");
            nav.classList.toggle("active");
        });

        // Close menu when a link is clicked
        const navLinks = nav.querySelectorAll("a");
        navLinks.forEach((link) => {
            link.addEventListener("click", function () {
                hamburger.classList.remove("active");
                nav.classList.remove("active");
            });
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });
            }
        });
    });

    // Add active class to nav links based on current page
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    const navItems = document.querySelectorAll("nav a");
    navItems.forEach((link) => {
        const href = link.getAttribute("href");
        if (href === currentPage || (currentPage === "" && href === "index.html")) {
            link.parentElement.classList.add("active");
        }
    });
});

// Utility function to format phone numbers
function formatPhoneNumber(phoneNumber) {
    const cleaned = phoneNumber.replace(/\D/g, "");
    if (cleaned.length === 10) {
        return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(
            6
        )}`;
    }
    return phoneNumber;
}

// Utility function to format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat("en-CI", {
        style: "currency",
        currency: "XOF",
    }).format(amount);
}

// Utility function to load external HTML content
async function loadHTMLContent(url, elementId) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const html = await response.text();
        const element = document.getElementById(elementId);
        if (element) {
            element.innerHTML = html;
        }
    } catch (error) {
        console.error("Error loading content:", error);
    }
}

// Lazy loading for images
if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add("loaded");
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll("img[data-src]").forEach((img) => {
        imageObserver.observe(img);
    });
}

// Scroll to top button
const scrollButton = document.createElement("button");
scrollButton.id = "scrollTop";
scrollButton.innerHTML = "^ Top";
scrollButton.style.display = "none";
document.body.appendChild(scrollButton);

window.addEventListener("scroll", function () {
    if (window.pageYOffset > 300) {
        scrollButton.style.display = "block";
    } else {
        scrollButton.style.display = "none";
    }
});

scrollButton.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

// Add click animation to buttons
document.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", function (e) {
        const ripple = document.createElement("span");
        ripple.style.position = "absolute";
        ripple.style.borderRadius = "50%";
        ripple.style.backgroundColor = "rgba(255,255,255,0.6)";
        ripple.style.transform = "scale(0)";
        ripple.style.animation = "ripple 0.6s ease-out";
        ripple.style.pointerEvents = "none";

        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + "px";
        ripple.style.left = x + "px";
        ripple.style.top = y + "px";

        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation style
const style = document.createElement("style");
style.innerHTML = `
  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
  
  button {
    position: relative;
    overflow: hidden;
  }
  
  #scrollTop {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background-color: var(--primary-color);
    color: var(--secondary-color);
    border: none;
    padding: 10px 15px;
    border-radius: 50%;
    cursor: pointer;
    font-weight: 600;
    z-index: 999;
    box-shadow: 0 2px 5px rgba(0,0,0,0.2);
    transition: all 0.3s;
  }
  
  #scrollTop:hover {
    background-color: #c89957;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.3);
  }
`;
document.head.appendChild(style);
