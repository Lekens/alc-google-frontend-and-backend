var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var multer = require('multer');
var Students = require('../models/students');

var studentRouter = express.Router();
studentRouter.use(bodyParser.json());

var response_ = { data: '', msg: '', code: 200, status: 'SUCCESS' };
studentRouter.route('/')
    .get(function (req, res, next) {
        Students.find({}, function (err, student) {
            if (err) throw err;
            response_.data = student;
            response_.msg = 'List successful';
            res.json(response_);
        });
    })

    .post(function (req, res, next) {
        Students.create(req.body, function (err, student) {
            if (err) throw err;
            console.log('Student created successfully!');
            var id = student._id;
            response_.data = student;
            response_.msg = 'Student created successfully!';
            res.json(response_);
        });
    })

    .delete(function (req, res, next) {
        Students.remove({}, function (err, resp) {
            if (err) throw err;
            response_.data = resp;
            response_.msg = 'Student Deleted successfully!';
            res.json(response_);
        });
    });

studentRouter.route('/:studentId')
    .get(function (req, res, next) {
        Students.findById(req.params.studentId, function (err, student) {
            if (err) throw err;
            response_.data = student;
            response_.msg = 'Student fetched successfully!';
            res.json(response_ );
        });
    })

    .put(function (req, res, next) {
        Students.findByIdAndUpdate(req.params.studentId, {
            $set: req.body
        }, {
            new: true
        }, function (err, student) {
            if (err) throw err;
            response_.data = student;
            res.json(response_);
            response_.msg = 'Student Updated successfully!';
        });
    })

    .delete(function (req, res, next) {
        Students.findByIdAndRemove(req.params.studentId, function (err, resp) {
            if (err) throw err;
            response_.data = resp;
            res.json(response_);
            response_.msg = 'Student Deleted successfully!';
        });

    });
module.exports = studentRouter;