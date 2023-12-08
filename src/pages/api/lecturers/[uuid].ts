import { deleteLecturer, editLecturer, getLecturer } from "../../../components/lecturers";
import { NextApiRequest, NextApiResponse } from "next";
import { debug } from "../../../components/debugger";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const uuid = req.query.uuid as string | undefined;
    if (!uuid) {
        res.status(500).json({
            code: 500,
            message: 'The framework is broken and didn\'t give me a UUID.'
        })
        return
    }

    switch (req.method) {
        case 'GET':
            debug("GET /api/lecturers/" + uuid);
            const lecturer = getLecturer(uuid);
            if (!lecturer) {
                debug("GET /api/lecturers/" + uuid + ": Not found");
                res.status(404).json({
                    code: 404,
                    message: 'Lecturer not found'
                });
                return;
            }
            debug("GET /api/lecturers/" + uuid + ": Found");
            res.status(200).json(lecturer);
            break;
        case 'PUT':
            debug("PUT /api/lecturers/" + uuid);
            const data = editLecturer(uuid, req.body);
            if (typeof data == 'string') {
                debug("GET /api/lecturers/" + uuid + ": Error: " + data);
                res.status(404).json({
                    code: 404,
                    message: data
                });
            }
            else {
                debug("PUT /api/lecturers/" + uuid + ": Success");
                res.status(200).json(data);
            }
            break;
        case 'DELETE':
            debug("DELETE /api/lecturers/" + uuid);
            const success = deleteLecturer(uuid);
            if (!success) {
                debug("DELETE /api/lecturers/" + uuid + ": Not found");
                res.status(404).json({
                    code: 404,
                    message: 'Lecturer not found'
                });
                return;
            }
            else {
                debug("DELETE /api/lecturers/" + uuid + ": Success");
                res.status(204).end();
            }
            break;
        default:
            res.status(405).json({
                code: 405,
                method: 'Unknown request method. Allowed methods: GET, PUT, DELETE'
            })
            break;
    }
}
