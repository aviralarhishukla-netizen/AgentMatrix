const http = require('http');

// Simple in-memory Agent Factory embedded directly to avoid module path issues
class AgentFactory {
  constructor(roomName) {
    this.roomName = roomName;
    this.agents = [];
  }

  createAgent(name, role) {
    const agent = {
      id: Math.random().toString(36).substring(2, 9),
      name: name,
      role: role,
      status: 'Ready in ' + this.roomName,
      createdAt: new Date().toISOString()
    };
    this.agents.push(agent);
    return agent;
  }

  listAgents() {
    return this.agents;
  }
}

// Initialize our Agent Factory for the Room
const matrixFactory = new AgentFactory("AgentMatrix Central Room");
matrixFactory.createAgent("Alpha-Trader", "Market Analyst");
matrixFactory.createAgent("Beta-Coder", "Backend Developer");

const server = http.createServer((req, res) => {
  if (req.url === '/agents') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      room: "AgentMatrix Central Room",
      status: "Active",
      totalAgents: matrixFactory.listAgents().length,
      agents: matrixFactory.listAgents()
    }, null, 2));
  } else {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('AgentMatrix Room is Live and Running!');
  }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`AgentMatrix server running on port ${PORT}`);
});
