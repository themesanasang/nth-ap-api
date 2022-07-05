import request from '../../client';

let auth = {};
let username = 'a';
let password = 'a';
let fullname = 'aa aa';

describe('Users', () => {
 
    describe('Create User', () => {
        it('create new user failure', () => {
            return request.post('/user')
            .send({
                username: username,
                password: password,
                fullname: fullname
            }).expect(200);
        });
    });

    describe('Auth', () => {
        it('auth user', async () => {
            //test password encrypt
            return await request.post("/login")
            .send({
                username: username,
                password: password
            })
            .expect(200)
            .then(response => {
                auth.token = response.body.token;
            });
        });
    });

    describe('List Users', () => {
        it('list all users', () => {
          return request.get('/user')
          .set('Authorization', `Bearer ${auth.token}`)
          .expect(200);
        });
        it('get user by id', async () => {
            //test uuid encrypt
          return request.get('/user/1')
            .set('Authorization', `Bearer ${auth.token}`)
            .expect(200)
            .then(response => {
              expect(response.body.data,fullname).toEqual(fullname);
            });
        });
    });

});