const courses = [
    {
        subject: "CSE",
        number: 110,
        title: "Introduction to Programming",
        credits: 2,
        certificate: "Web and Computer Programming",
        description: "This course will introduce the basic concepts of computer programming and problem solving using Python. Learn fundamental programming constructs including variables, conditions, loops, and functions.",
        technology: ["Python"],
        completed: true,
    },
    {
        subject: "WDD",
        number: 130,
        title: "Web Fundamentals",
        credits: 2,
        certificate: "Web and Computer Programming",
        description: "This course introduces students to the World Wide Web and the basics of front-end web development, focusing on HTML5, CSS3, and standard web layout principles.",
        technology: ["HTML", "CSS"],
        completed: true,
    },
    {
        subject: "CSE",
        number: 111,
        title: "Programming with Functions",
        credits: 2,
        certificate: "Web and Computer Programming",
        description: "CSE 111 students write code with functions, parameters, and return values. Students learn to develop modular programs, work with files, write automated tests, and handle errors.",
        technology: ["Python"],
        completed: true,
    },
    {
        subject: "CSE",
        number: 210,
        title: "Programming with Classes",
        credits: 2,
        certificate: "Web and Computer Programming",
        description: "This course introduces object-oriented programming concepts using classes and objects, encapsulation principles, inheritance, and polymorphism in C#.",
        technology: ["C#"],
        completed: true,
    },
    {
        subject: "WDD",
        number: 131,
        title: "Dynamic Web Fundamentals",
        credits: 2,
        certificate: "Web and Computer Programming",
        description: "Dynamic Web Fundamentals builds on WDD 130 to create dynamic, interactive web pages using JavaScript, DOM manipulation, events, and dynamic content rendering.",
        technology: ["HTML", "CSS", "JavaScript"],
        completed: true,
    },
    {
        subject: "WDD",
        number: 231,
        title: "Web Frontend Development I",
        credits: 2,
        certificate: "Web and Computer Programming",
        description: "Web Frontend Development I focuses on user experience, accessibility, web APIs, dynamic data fetching, responsive web design, and modern front-end engineering techniques.",
        technology: ["HTML", "CSS", "JavaScript"],
        completed: false,
    },
];

const courseList = document.getElementById("courses");
const creditTotal = document.getElementById("credit-total");
const filterButtons = document.querySelectorAll(".filter-btn");
const courseDetails = document.getElementById("course-details");

function courseTemplate(course) {
    const status = course.completed ? "Completed" : "In Progress";
    return `
        <article class="course-card ${course.completed ? "completed" : "planned"}" data-course="${course.subject} ${course.number}" tabindex="0" role="button" aria-label="View details for ${course.subject} ${course.number}">
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

function displayCourseDetails(course) {
    if (!courseDetails) return;

    courseDetails.innerHTML = `
        <button id="closeModal" aria-label="Close details dialog">❌</button>
        <h2>${course.subject} ${course.number}</h2>
        <h3>${course.title}</h3>
        <p><strong>Credits</strong>: ${course.credits}</p>
        <p><strong>Certificate</strong>: ${course.certificate}</p>
        <p>${course.description}</p>
        <p><strong>Technologies</strong>: ${course.technology ? course.technology.join(', ') : 'N/A'}</p>
    `;

    courseDetails.showModal();

    const closeModal = courseDetails.querySelector("#closeModal");
    if (closeModal) {
        closeModal.addEventListener("click", () => {
            courseDetails.close();
        });
    }
}

if (courseDetails) {
    courseDetails.addEventListener("click", (event) => {
        const dialogBounds = courseDetails.getBoundingClientRect();
        if (
            event.clientX < dialogBounds.left ||
            event.clientX > dialogBounds.right ||
            event.clientY < dialogBounds.top ||
            event.clientY > dialogBounds.bottom
        ) {
            courseDetails.close();
        }
    });
}

if (courseList) {
    courseList.addEventListener("click", (event) => {
        const card = event.target.closest(".course-card");
        if (card) {
            const courseCode = card.dataset.course;
            const selectedCourse = courses.find((c) => `${c.subject} ${c.number}` === courseCode);
            if (selectedCourse) {
                displayCourseDetails(selectedCourse);
            }
        }
    });

    courseList.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
            const card = event.target.closest(".course-card");
            if (card) {
                event.preventDefault();
                const courseCode = card.dataset.course;
                const selectedCourse = courses.find((c) => `${c.subject} ${c.number}` === courseCode);
                if (selectedCourse) {
                    displayCourseDetails(selectedCourse);
                }
            }
        }
    });
}

displayCourses();

