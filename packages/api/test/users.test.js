const request = require('supertest');

const app = require('../src/app');
const { User } = require('../src/models');

const MAIN_ROUTE = '/api/v1/users';

describe('POST /api/v1/users', () => {
  test('create a user and return the user object', async () => {
    const user = {
      name: 'John Doe',
      cpf: '00000000000',
      email: 'johndoe@mail.com',
      phonenumber: '(84) 8888-6666',
    };

    const { status, body } = await request(app)
      .post(MAIN_ROUTE)
      .send({ ...user });

    expect(status).toBe(201);
    expect(body).toEqual(expect.objectContaining(user));
  });
});

describe('GET /api/v1/users', () => {
  test('responds with a user list', async () => {
    const { status, body } = await request(app).get(MAIN_ROUTE);

    expect(status).toBe(200);
    expect(body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: expect.any(String),
          cpf: expect.any(String),
          email: expect.any(String),
          phonenumber: expect.any(String),
        }),
      ]),
    );
  });

  test('responds with one of the paginated user list', async () => {
    const { status, body } = await request(app)
      .get(MAIN_ROUTE)
      .query({ limit: 5, offset: 10 });

    expect(status).toBe(200);
    expect(body.length).toBe(5);
  });

  test('responds with min "limit" message', async () => {
    const { status, text } = await request(app)
      .get(MAIN_ROUTE)
      .query({ limit: -5 });

    expect(status).toBe(400);
    expect(text).toBe('Error validating request query. "limit" must be larger than or equal to 1.');
  });

  test('responds with max "limit" message', async () => {
    const { status, text } = await request(app)
      .get(MAIN_ROUTE)
      .query({ limit: 51 });

    expect(status).toBe(400);
    expect(text).toBe('Error validating request query. "limit" must be less than or equal to 50.');
  });
});

describe('GET /api/v1/users/:id', () => {
  test('responds with a user object', async () => {
    const {
      id, name, cpf, email, phonenumber,
    } = await User.create({
      name: 'John Doe',
      cpf: '00000000000',
      email: 'johndoe@mail.com',
      phonenumber: '(84) 8888-6666',
    });

    const { status, body } = await request(app).get(`${MAIN_ROUTE}/${id}`);

    expect(status).toBe(200);
    expect(body).toEqual(
      expect.objectContaining({
        id,
        name,
        cpf,
        email,
        phonenumber,
      }),
    );
  });

  test('responds with a not found message', async () => {
    const { status, body } = await request(app).get(`${MAIN_ROUTE}/0`);

    expect(status).toBe(404);
    expect(body).toEqual(
      expect.objectContaining({
        statusCode: 404,
        error: 'Not Found',
        message: 'User id:0 not found!',
      }),
    );
  });
});

describe('PUT /api/v1/users/:id', () => {
  test('update a user and responds with updated user object', async () => {
    const {
      id, cpf, email, phonenumber,
    } = await User.create({
      name: 'John Doe',
      cpf: '00000000000',
      email: 'johndoe@mail.com',
      phonenumber: '(84) 8888-6666',
    });

    const { status, body } = await request(app)
      .put(`${MAIN_ROUTE}/${id}`)
      .send({
        name: 'Sarah Connor',
      });

    expect(status).toBe(200);
    expect(body).toEqual(
      expect.objectContaining({
        cpf,
        email,
        phonenumber,
        name: 'Sarah Connor',
      }),
    );
  });

  test('responds with a not found message', async () => {
    const { status, body } = await request(app)
      .put(`${MAIN_ROUTE}/0`)
      .send({
        name: 'Sarah Connor',
      });

    expect(status).toBe(404);
    expect(body).toEqual(
      expect.objectContaining({
        statusCode: 404,
        error: 'Not Found',
        message: 'User id:0 not found!',
      }),
    );
  });
});

describe('DELETE /api/v1/users/:id', () => {
  test('delete a user and responds with a 204 status', async () => {
    const { id } = await User.create({
      name: 'John Doe',
      cpf: '00000000000',
      email: 'johndoe@mail.com',
      phonenumber: '(84) 8888-6666',
    });

    const { status } = await request(app).del(`${MAIN_ROUTE}/${id}`);

    expect(status).toBe(204);
  });

  test('responds with a not found message', async () => {
    const { status, body } = await request(app).del(`${MAIN_ROUTE}/0`);

    expect(status).toBe(404);
    expect(body).toEqual(
      expect.objectContaining({
        statusCode: 404,
        error: 'Not Found',
        message: 'User id:0 not found!',
      }),
    );
  });
});
