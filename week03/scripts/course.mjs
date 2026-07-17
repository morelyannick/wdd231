const byuiCourse = {
    courseCode: "WDD 330",
    courseName: "Web Frontend Development II",

    sections: [
        {
            sectionNum: 1,
            roomNum: "STC 353",
            enrolled: 26,
            days: "TTh"
        },
        {
            sectionNum: 2,
            roomNum: "STC 347",
            enrolled: 22,
            days: "TTh"
        },
        {
            sectionNum: 3,
            roomNum: "STC 351",
            enrolled: 25,
            days: "TTh"
        }
    ],

    changeEnrollment(sectionNum, add = true) {
        const section = this.sections.find(
            (section) => section.sectionNum === sectionNum
        );

        if (!section) return;

        if (add) {
            section.enrolled++;
        } else {
            section.enrolled--;
        }
    }
};

export default byuiCourse;