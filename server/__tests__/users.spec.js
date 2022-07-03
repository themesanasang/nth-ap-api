import request from '../../client';

describe('Users', () => {
 
    describe('Create User', () => {
        it('create new user failure', () => {
            return request.post('/user')
            .send({
                username: 'a2',
                password: 'a2',
                fullname: 'aa2 aa2'
            }).expect(200);
        });
    })

});