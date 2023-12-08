import { addLecturer, getLecturers } from "../../../components/lecturers";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case "POST":
            if (req.headers["content-type"] != "application/json") return res.status(612).send("only application/json is supported");
            const added = addLecturer(req.body);
            if (typeof added == "string") {
                res.status(400).json({
                    code: 400,
                    message: added
                });
                return;
            }
            res.status(200).json(added);
            break;
        case "GET":
            const lecturers = getLecturers();
            res.status(200).json(lecturers);
            break;
        default:
            console.log("Unknown request method", req.method);
            res.status(405).json({
                code: 405,
                method: "Unknown request method. Allowed methods: POST, GET"
            });
            break;
    }
}
