import express from 'express';
import 'dotenv/config';

export const notFound = express()

notFound.get("*", async (req, res) => {
    res.status(404).json({
        message: "Not Found",
        data: {
            url: req.url,
            method: req.method
        },
        statusCode: 404
    })
});

notFound.post("*", async (req, res) => {
    res.status(404).json({
        message: "Not Found",
        data: {
            url: req.url,
            method: req.method
        },
        statusCode: 404
    })
});

notFound.put("*", async (req, res) => {
    res.status(404).json({
        message: "Not Found",
        data: {
            url: req.url,
            method: req.method
        },
        statusCode: 404
    })
});