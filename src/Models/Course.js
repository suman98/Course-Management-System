const createCourse = ({ value }) => {
    let db = localStorage.getItem('courses') || "[]";
    db = JSON.parse(db);
    let record = {
        id: Math.random(),
        position: 1,
        name: value.name,
        grade: value.grade,
        subject: value.subject,
        lessions_types: [],
    };
    db.push(record);
    let new_db = JSON.stringify(db);
    localStorage.setItem("courses", new_db);
    return new_db;
};


const updateCourse = ({ value }) => {
    let db = localStorage.getItem('courses') || "[]";
    db = JSON.parse(db);
    let old_rec = db.find((arr) => arr.id === value.id);

    if (!old_rec) {
        alert("No Item Matched");
        return;
    }

    db = db.filter((arr) => arr.id !== value.id);

    let record = {
        ...old_rec,
        name: value.name,
        grade: value.grade,
        subject: value.subject,
    };

    db.push(record);
    let new_db = JSON.stringify(db);

    localStorage.setItem("courses", new_db);
    return new_db;
};



const destroyCourse = ({ value }) => {

    let db = localStorage.getItem('courses') || "[]";
    db = JSON.parse(db);
    db = db.filter((arr) => arr.id !== value.id);
    let new_db = JSON.stringify(db);
    localStorage.setItem("courses", new_db);
    return new_db;
}


export { createCourse, updateCourse, destroyCourse }