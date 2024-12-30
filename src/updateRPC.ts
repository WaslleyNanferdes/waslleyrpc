import { Client } from "discord-rpc";
import psList, { ProcessDescriptor } from "ps-list";

let stateRPC: string = '';

function getProcess(processes: ProcessDescriptor[], executionName: string) {
  return processes.some(process => process.name.toLowerCase().includes(executionName))
}

function setActivity(rpc: Client, app: string) {
  switch (app) {
    case 'godot': {
      rpc.setActivity({
        details: 'Criando um game com godot!',
        state: 'teste',
        largeImageKey: 'godot',
        largeImageText: 'godot',
        startTimestamp: Date.now(),
        instance: true,
      });
      break;
    }

    case 'figma': {
      rpc.setActivity({
        details: 'Prototipando com Figma!',
        state: 'teste',
        largeImageKey: 'figma',
        largeImageText: 'figma',
        startTimestamp: Date.now(),
        instance: true
      });
      break;
    }

    default: rpc.setActivity({
      details: 'Rumo a Balneário',
      state: 'Xulião vai a Balneário',
      largeImageKey: 'xulio',
      largeImageText: 'Xulio?',
      startTimestamp: Date.now(),
      instance: true,
    })
  }
}

export default async function updateRPC(rpc: Client) {
  try {
    const processes = await psList();

    const appStates = [
      { name: 'godot', condition: getProcess(processes, 'godot')},
      { name: 'figma', condition: getProcess(processes, 'figma.exe')},
      { name: 'none', condition: true}
    ]

    const activeApp = appStates.find(app => app.condition)?.name;

    if (activeApp && activeApp !== stateRPC) {
      setActivity(rpc, activeApp);
      stateRPC = activeApp;
    }
  } catch (err) {
    console.error(`Erro: ${err}`);
  }
}
