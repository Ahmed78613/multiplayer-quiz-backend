const mongoose = require('mongoose');
const request = require('supertest');
const express = require('express');
const { app } = require('../server');
require('dotenv').config();

/* Connecting to the database before each test. */

beforeAll(async () => {
    await mongoose.connection.close();
    await mongoose.connect(process.env.DATABASE_URL);
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe('GET / ', () => {
    test('index route works', (done) => {
        request(app).get('/').expect(200, done);
    });
});

describe('GET /leaderboards ', () => {
    test('leaderboard page is available', (done) => {
        request(app).get('/leaderboards').expect(200, done);
    });
});

describe('POST /leaderboards ', () => {
    test('add a username and score to leaderboard', (done) => {
        request(app)
            .post('/leaderboards')
            .send({
                username: 'Dave',
                score: '5000',
            })
            .expect(201, done);
    });
});

// describe('GET / ', () => {
//     it('should return Leaderboard', async () => {
//         const res = await request(app).get('/leaderboard');
//         expect(res.statusCode).toBe(200);
//     });
// });

// describe('GET /habits ', () => {
//     it('should return a users habits', async () => {
//         const res = await request(app)
//             .get('/habits/user')
//             .set('Authorization', token);
//         expect(res.statusCode).toBe(200);
//         //   expect(res.body.length).toBeGreaterThan(0);
//     });
// });

// describe('POST /users', () => {
//     it('should create a user account', async () => {
//         const res = await request(app).post('/users/').send({
//             username: 'dgdfgfdgfd',
//             password: '123456fdgdfg78dfg',
//         });
//         expect(res.statusCode).toBe(201);
//     });
// });

// describe('POST /users/login', () => {
//     it('login in user', async () => {
//         const res = await request(app).post('/users/login').send({
//             username: 'peterdgfdg',
//             password: '12345678dfg',
//         });
//         expect(res.statusCode).toBe(200);
//     });
// });

// describe('Patch /user/:id', () => {
//     it('Update counter', async () => {
//         const res = await request(app)
//             .patch('/habits/user/635a673d71d91358aced4158')
//             .send()
//             .set('Authorization', token);
//         expect(res.statusCode).toBe(200);
//     });
// });

// describe('GET a users habits  ', () => {
//     it('should return a users habits', async () => {
//         const res = await request(app)
//             .get('/habits/user/6358f1f7be38c74d42967309')
//             .set(
//                 'Authorization',
//                 `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoicyIsImlhdCI6MTY2Njg3Njg0OH0.EDDOjOvEcw1yKxH73K2PcES3JiU5-xs5HeDx1w9jtKs`
//             );
//         expect(res.statusCode).toBe(200);
//         // expect(res.body.length).toBeGreaterThan(0);
//     });
// });
