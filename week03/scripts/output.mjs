export function setTitle(course) {

    const courseName = document.querySelector("#courseName");

    courseName.textContent =
        `${course.courseCode} - ${course.courseName}`;

}

export function renderSections(sections) {

    const html = sections
        .map(
            (section) => `
        <tr>
            <td>${section.sectionNum}</td>
            <td>${section.roomNum}</td>
            <td>${section.enrolled}</td>
            <td>${section.days}</td>
        </tr>
    `
        )
        .join("");

    document.querySelector("#sections").innerHTML = html;

}