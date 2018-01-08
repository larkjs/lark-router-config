/**
 * Test of lark-router-config
 **/
'use strict';

const agent = require('supertest');

const example = require('lark-router-config/example');

let request;
before(async () => {
    const server = await example();
    server.unref();
    request = agent(server);
});

describe('loading from config file will work', () => {

    it('should response "/welcome" when requesting GET /yaml/welcome', (done) => {
        request.get('/yaml/welcome')
            .expect(200)
            .expect('/welcome', done);
    });

    it('should response "/home/user name = haohao" when requesting GET /yaml/home/haohao', (done) => {
        request.get('/yaml/home/haohao')
            .expect(200)
            .expect('/home/user name = haohao', done);
    });

    it('should response "/home/profile name = haohao" when requesting GET /yaml/home/haohao/profile', (done) => {
        request.get('/yaml/home/haohao/profile')
            .expect(200)
            .expect('/home/profile name = haohao', done);
    });

    it('should response "/article/read" when requesting GET /yaml/article/haohao', (done) => {
        request.get('/yaml/article/haohao')
            .expect(200)
            .expect('/article/read', done);
    });

    it('should response "/article/read" when requesting POST /yaml/article/haohao/comment', (done) => {
        request.post('/yaml/article/haohao/comment')
            .expect(200)
            .expect('/article/comment', done);
    });
});

describe('loading from directory will work, too', () => {
    it('should response "/welcome" when requesting GET /directory/welcome', (done) => {
        request.get('/directory/welcome')
            .expect(200)
            .expect('/welcome', done);
    });

    it('should response "main" when requesting GET /', (done) => {
        request.get('/')
            .expect(200)
            .expect('main', done);
    });

    it('should response "/home/user name = viringbells" when requesting GET /directory/home/viringbells', (done) => {
        request.get('/directory/home/viringbells')
            .expect(200)
            .expect('/home/user name = viringbells', done);
    });

    it('should response "/home/profile name = viringbells" when requesting GET /directory/home/viringbells/profile', (done) => {
        request.get('/directory/home/viringbells/profile')
            .expect(200)
            .expect('/home/profile name = viringbells', done);
    });

    it('should response "/article/read title = viringbells" when requesting GET /directory/article/viringbells', (done) => {
        request.get('/directory/article/viringbells')
            .expect(200)
            .expect('/article/read title = viringbells', done);
    });

    it('should response "/article/comment on viringbells" when requesting POST /directory/article/viringbells/comment', (done) => {
        request.post('/directory/article/viringbells/comment')
            .expect(200)
            .expect('/article/comment on viringbells', done);
    });

    it('should response "/welcome" when requesting POST /directory/article/haohao/comment', (done) => {
        request.post('/directory/article/haohao/comment')
            .expect(200)
            .expect('/article/comment on haohao', done);
    });

    it('should response "Controller" when requesting GET /directory/controller', (done) => {
        request.get('/directory/controller')
            .expect(200)
            .expect('Controller', done);
    });
});
