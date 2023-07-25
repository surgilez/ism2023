import { verifySocketToken } from '@middlewares/verifyToken';
import prisma from 'database';
import { Server } from 'socket.io';

interface IUser {
  online: boolean | null;
  id: string;
  person: {
    id: string;
    name: string;
    img: string | null;
    lastName: string;
  } | null;
  role: {
    id: string;
    name: string;
  };
}

const getUsers = async () =>
  prisma.account.findMany({
    where: { online: true, state: true },
    select: {
      id: true,
      online: true,
      person: { select: { id: true, name: true, img: true, lastName: true } },
      role: { select: { id: true, name: true } },
    },
  });
let users: IUser[] = [];

export default async (io: Server) => {
  verifySocketToken(io);
  users = [...(await getUsers())];
  io.on('connection', async (socket) => {
    console.log('a user connected');

    socket.on('add-user', async (data) => {
      users.push(data);
      socket.broadcast.emit('get-users', users);
    });

    socket.on('disconnect', () => {
      console.log('user disconnected');
    });

    socket.on('chat message', (msg) => {
      io.emit('chat message', msg);
    });
  });
};
