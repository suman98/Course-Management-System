const createLession = ({ value }) => {

    let db = localStorage.getItem('courses') || "[]";
    db = JSON.parse(db);
    let courses = db.find((arr) => arr.id === value.course);
    courses['position'] = db.findIndex((arr) => arr.id === value.course);
    let newLessons;
    let updated = {
        ...courses,
        lessions_types: [
            ...courses.lessions_types.map((arr) => {
                if (arr.id === value.lesson_type) {
                    value['id'] = Math.random();
                    arr.lessions.push(value);
                    newLessons = arr.lessions;

                }
                return arr;
            })
        ],
    }

    db = db.filter((arr) => arr.id !== value.course);
    db.splice(courses['position'], 0, ...[updated]);

    let new_db = JSON.stringify(db);
    localStorage.setItem("courses", new_db);
    return { new_db, newLessons };
};


const updateLession = ({ value }) => {
    let db = localStorage.getItem('courses') || "[]";
    db = JSON.parse(db);

    let courses = db.find((arr) => arr.id === value.course );
    courses['position'] = db.findIndex((arr) => arr.id === value.course);
    let newLessons;

    let updated = {
        ...courses,
        lessions_types: [
            ...courses.lessions_types.map((arr) => {
                if (arr.id === value.lesson_type) {
                    arr['lessions'] = arr.lessions.filter((l)=> l.id !== value.id );
                    arr['lessions'].push(value);

                    newLessons = arr.lessions;
                    return arr;
                }
                return arr;
            })
        ],
    }

    db = db.filter((arr) => arr.id !== value.course);
    db.splice(courses['position'], 0, ...[courses]);
    let new_db = JSON.stringify(db);
    localStorage.setItem("courses", new_db);
    return { new_db,newLessons };
};

const destroyLession = ({ value }) => {

    let db = localStorage.getItem('courses') || "[]";
    db = JSON.parse(db);

    let courses = db.find((arr) => arr.id === value.course );
    courses['position'] = db.findIndex((arr) => arr.id === value.course);
    let newLessons;
    let updated = {
        ...courses,
        lessions_types: [
            ...courses.lessions_types.map((arr) => {
                if (arr.id === value.lesson_type) {
                    arr['lessions'] = arr.lessions.filter((l)=> l.id !== value.id );

                    newLessons = arr.lessions;
                    return arr;
                }
                return arr;
            })
        ],
    }

    db = db.filter((arr) => arr.id !== value.course);
    db.splice(courses['position'], 0, ...[courses]);
    let new_db = JSON.stringify(db);
    localStorage.setItem("courses", new_db);
    return { new_db,newLessons };
};


export { createLession, destroyLession, updateLession }