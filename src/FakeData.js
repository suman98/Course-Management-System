import DB from "./DB";
import faker from '@faker-js/faker';



Array.prototype.random = function() {
    return this[Math.floor(Math.random() * this.length)];
}


function lessions() {
    const toAdd = [];
    for (let i = 0; i < 10; i++) {
        toAdd.push({
            id: Math.random(),
            lession_name_file: null,
            lession_name: faker.name.findName(),
            domains: DB.domains.random().value,
            standard: DB.standards.random().value,
            pass_percent: Math.floor(Math.random() * 100) + 1,
            access_type: ['Trial', "On duty"].random(),
            live_link: ['PO', "OQ"].random(),
            pdf: null,
        });
    }
    return toAdd;
}


function lessions_types() {
    const toAdd = [];

    for (let i = 0; i < 5; i++) {
        toAdd.push({
            id: Math.random(),
            name: faker.name.findName(),
            lessions: lessions(),
        });
    }
    return toAdd;
}

export default function LoadFakeData() {

    let db = localStorage.getItem('courses') || "[]";
    db = JSON.parse(db);
    let grades = DB.grades.filter((arr) => arr.value !== null);

    for (let i = 0; i < 20; i++) {
        let grade = grades.random();
        let course = {
            id: Math.random(),
            position: Math.floor(Math.random() * 20) + 1,
            name: faker.name.findName(),
            grade: grade.value,
            subject: grade.subjects.random().value,
            lessions_types: lessions_types(),
        }
        db.push(course);
    }
    let new_db = JSON.stringify(db);
    localStorage.setItem("courses", new_db);

};