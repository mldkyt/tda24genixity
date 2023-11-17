import { deleteLecturer, editLecturer, getLecturer } from "../../../components/lecturers";
import { NextApiRequest, NextApiResponse } from "next";

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
            const lecturer = getLecturer(uuid);
            if (!lecturer) {
                res.status(404).json({
                    code: 404,
                    message: 'Lecturer not found'
                });
                return;
            }
            res.status(200).json(lecturer);
            break;
        case 'PUT':
            const data = editLecturer(uuid, req.body);
            if (typeof data == 'string') {
                res.status(404).json({
                    code: 404,
                    message: data
                });
            }
            else {
                res.status(200).json(data);
            }
            break;
        case 'DELETE':
            const success = deleteLecturer(uuid);
            if (!success) {
                res.status(404).json({
                    code: 404,
                    message: 'Lecturer not found'
                });
                return;
            }
            else {
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
