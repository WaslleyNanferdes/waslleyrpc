import 'dotenv/config';
import { Client } from 'discord-rpc';

import updateRPC from './updateRPC.js';

const clientId: string = process.env.CLIENT_ID!;

const rpc = new Client({
  transport: 'ipc',
})

rpc.on('ready', () => {
  setInterval(() => {
    updateRPC(rpc)
  }, 5000);
})

rpc.login({ clientId }).catch(err => console.error('Erro: ', err))