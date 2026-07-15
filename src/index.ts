import { config } from './config';
import { listAgents, createAgent, chatAgent } from './clawpump';
import { saveMemory, loadMemory } from './memlawb';
import { getBalance } from './solana';

async function main() {
  const command = process.argv[2];
  const args = process.argv.slice(3);

  console.log(`RevenueDogAi - ${config.branding.name}`);
  console.log(`Ticker: ${config.branding.ticker}`);
  console.log(`Contract: ${config.branding.contract}`);
  console.log('');

  switch (command) {
    case 'agents':
      const agents = await listAgents();
      console.log('Agents:', JSON.stringify(agents, null, 2));
      break;

    case 'create':
      if (!args[0]) { console.log('Usage: create <name> [strategy]'); return; }
      const agent = await createAgent(args[0], args[1]);
      console.log('Created:', JSON.stringify(agent, null, 2));
      break;

    case 'chat':
      if (!args[0] || !args[1]) { console.log('Usage: chat <agent_id> <message>'); return; }
      const reply = await chatAgent(args[0], args.slice(1).join(' '));
      console.log('Reply:', JSON.stringify(reply, null, 2));
      break;

    case 'memory':
      if (args[0] === 'save' && args[1] && args[2]) {
        const result = await saveMemory(args[1], args[2], args.slice(3).join(' '));
        console.log('Saved:', JSON.stringify(result, null, 2));
      } else if (args[0] === 'load' && args[1]) {
        const result = await loadMemory(args[1]);
        console.log('Loaded:', JSON.stringify(result, null, 2));
      } else {
        console.log('Usage: memory save <namespace> <key> <content>');
        console.log('       memory load <namespace>');
      }
      break;

    case 'balance':
      if (!args[0]) { console.log('Usage: balance <wallet_address>'); return; }
      const bal = await getBalance(args[0]);
      console.log(`Balance: ${bal} SOL`);
      break;

    default:
      console.log('Commands:');
      console.log('  agents                    List all agents');
      console.log('  create <name> [strategy]  Create a new agent');
      console.log('  chat <id> <message>       Chat with an agent');
      console.log('  memory save/load ...      Manage agent memory');
      console.log('  balance <address>         Check SOL balance');
  }
}

main().catch(console.error);
