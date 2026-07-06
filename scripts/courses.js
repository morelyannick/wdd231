const courses = [
    {
        subject: "CSE",
        number: 110,
        title: "Introduction to Programming",
        credits: 2,
        completed: true,
    },
    {
        subject: "WDD",
        number: 130,
        title: "Web Fundamentals",
        credits: 2,
        completed: true,
    },
    {
        subject: "CSE",
        number: 111,
        title: "Programming with Functions",
        credits: 2,
        completed: true,
    },
    {
        subject: "CSE",
        number: 210,
        title: "Programming with Classes",
        credits: 2,
        completed: true,
    },
    {
        subject: "WDD",
        number: 131,
        title: "Dynamic Web Fundamentals",
        credits: 2,
        completed: true,
    },
    {
        subject: "WDD",
        number: 231,
        title: "Web Frontend Development I",
        credits: 2,
        completed: false,
    },
];

const courseList = document.getElementById("courses");
const creditTotal = document.getElementById("credit-total");
const filterButtons = document.querySelectorAll(".filter-btn");

function courseTemplate(course) {
    const status = course.completed ? "Completed" : "In Progress";
    return `
        <article class="course-card ${course.completed ? "completed" : "planned"}">
            <div>
                <h3>${course.subject} ${course.number}</h3>
                <p>${course.title}</p>
            </div>
            <div class="course-meta">
                <span>${course.credits} credits</span>
                <span>${status}</span>
            </div>
        </article>
    `;
}

function displayCourses(filter = "all") {
    if (!courseList || !creditTotal) return;

    const filteredCourses = filter === "all"
        ? courses
        : courses.filter((course) => course.subject === filter);

    courseList.innerHTML = filteredCourses.map(courseTemplate).join("");

    const totalCredits = filteredCourses.reduce((total, course) => total + course.credits, 0);
    creditTotal.textContent = `Total credits: ${totalCredits}`;
}

filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const selectedFilter = button.dataset.filter;

        filterButtons.forEach((filterButton) => {
            const isActive = filterButton === button;
            filterButton.classList.toggle("active", isActive);
            filterButton.setAttribute("aria-pressed", String(isActive));
        });

        displayCourses(selectedFilter);
    });
});

displayCourses();
