export function setSectionSelection(sections) {

    const selector = document.querySelector("#sectionSelector");

    sections.forEach((section) => {

        const option = document.createElement("option");

        option.value = section.sectionNum;
        option.textContent = `Section ${section.sectionNum}`;

        selector.appendChild(option);

    });

}