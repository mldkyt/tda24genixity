import { v4 as uuidv4 } from "uuid";
import fs from "fs";

export function addLecturer(data: Lecturer): Lecturer | string {
    if (data.first_name === null || data.first_name === undefined) {
        return "First name is required";
    }
    if (data.last_name === null || data.last_name === undefined) {
        return "Last name is required";
    }

    // assign every tag a uuid
    if (data.tags) {
        if (!validateTags(data.tags)) {
            return "Tags are invalid";
        }
        // give a uuid to every tag
        data.tags = data.tags?.map((element) => {
            element.uuid = uuidv4();
            return element;
        });
    }

    if (data.contact) {
        if (!validateContact(data.contact)) {
            return "Contact information is invalid";
        }
    }

    data.uuid = uuidv4()

    // create data folder if it doesn't exist
    if (!fs.existsSync("data")) fs.mkdirSync("data");
    if (!fs.existsSync("data/lecturers.json")) fs.writeFileSync("data/lecturers.json", "[]");
    let file = JSON.parse(fs.readFileSync("data/lecturers.json").toString());
    file.push(data);
    fs.writeFileSync("data/lecturers.json", JSON.stringify(file));
    return data;
}

export function getLecturers() {
    if (!fs.existsSync("data/lecturers.json")) fs.writeFileSync("data/lecturers.json", "[]");
    return JSON.parse(fs.readFileSync("data/lecturers.json").toString()) as Lecturer[];
}

export function getLecturer(uuid: string): Lecturer | undefined {
    if (!fs.existsSync("data/lecturers.json")) fs.writeFileSync("data/lecturers.json", "[]");

    const lecturers = JSON.parse(fs.readFileSync("data/lecturers.json").toString()) as Lecturer[];
    return lecturers.find((element) => element.uuid == uuid);
}

export function validateTags(tags: Partial<Tag>[]) {
    // tags has to be a format {name: string}[]
    if (!Array.isArray(tags)) return false;
    for (const element of tags) {
        if (!element.name) return false;
    }
    return true;
}

export function validateContact(contact: Partial<Contact>) {
    if (!contact) return false;
    if (!Array.isArray(contact.emails)) return false;
    if (!Array.isArray(contact.telephone_numbers)) return false;
    // validate emails using regex
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    for (const element of contact.emails) {
        if (!emailRegex.test(element)) {
            return false;
        }
    }

    // validate telephone numbers using regex
    const telephoneRegex = /^(\+\d{1,3})?[-.\s]?\(?\d{1,4}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/g;
    for (const element of contact.telephone_numbers) {
        if (!telephoneRegex.test(element)) {
            return false;
        }
    }
    return true;
}

export function validateExtraKeys(data: { [key: string]: any }, keys: string[]): boolean {
    for (const element in data) {
        if (!keys.includes(element.toLowerCase())) return false;
    }

    return true;
}

export function editLecturer(uuid: string, newData: Partial<Lecturer>): Lecturer | string {
    if (!fs.existsSync("data/lecturers.json")) fs.writeFileSync("data/lecturers.json", "[]");

    const lecturers = JSON.parse(fs.readFileSync("data/lecturers.json").toString()) as Lecturer[];
    const index = lecturers.findIndex((element) => element.uuid == uuid);
    if (index == -1) {
        return "This lecturer doesn't exist";
    }
    for (const key of Object.keys(newData)) {
        if (newData[key as keyof Lecturer]) {
            if (key == "tags") {
                if (!validateTags(newData.tags || [])) {
                    return `Tag on index ${index} is invalid`;
                }
                // give a uuid to every tag if it doesn't have one
                newData.tags = newData.tags?.map((element) => {
                    if (!element.uuid) {
                        element.uuid = uuidv4();
                    }
                    return element;
                });
            }
            if (key == "contact") {
                if (!validateContact(newData.contact || {})) {
                    return `Contact information is invalid`;
                }
            }

            lecturers[index][key as keyof Lecturer] = newData[key as keyof Lecturer] as never;
        }
    }
    fs.writeFileSync("data/lecturers.json", JSON.stringify(lecturers));
    return lecturers[index];
}

export function deleteLecturer(uuid: string): boolean {
    if (!fs.existsSync("data/lecturers.json")) fs.writeFileSync("data/lecturers.json", "[]");

    const lecturers = JSON.parse(fs.readFileSync("data/lecturers.json").toString()) as Lecturer[];
    const index = lecturers.findIndex((element) => element.uuid == uuid);
    if (index == -1) {
        return false;
    }
    lecturers.splice(index, 1);
    fs.writeFileSync("data/lecturers.json", JSON.stringify(lecturers));
    return true;
}
