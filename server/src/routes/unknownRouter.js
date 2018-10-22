/**
 * router to handle all unknown routes
 */
import express from 'express';

const unknownRouter = express.Router();

const handleUnknownRoutes = (req, res, next) => {
    let resp = {};
    resp.success = false;
    resp.message = "Requested resource not found.";
    res.status(404).json(resp)
    next();
}

unknownRouter.get('*', handleUnknownRoutes);
unknownRouter.post('*', handleUnknownRoutes);
unknownRouter.delete('*', handleUnknownRoutes);
unknownRouter.put('*', handleUnknownRoutes);

export default unknownRouter;