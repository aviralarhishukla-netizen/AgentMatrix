const http = require('http');

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

const matrixFactory = new AgentFactory("AgentMatrix Central Room");
matrixFactory.createAgent("Alpha-Trader", "Market Analyst");
matrixFactory.createAgent("Beta-Coder", "Backend Developer");

const server = http.createServer((req, res) => {
  if (req.url === '/agents') {
    // Show JSON data for agents API
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      room: "AgentMatrix Central Room",
      status: "Active",
      totalAgents: matrixFactory.listAgents().length,
      agents: matrixFactory.listAgents()
    }, null, 2));
  } else {
    // Show a beautiful HTML Room page for the main URL
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>AgentMatrix Room</title>
        <style>
          body { font-family: Arial, sans-serif; background: #0f172a; color: #f8fafc; text-align: center; padding: 50px; }
          .card { background: #1e293b; padding: 30px; border-radius: 12px; display: inline-block; box-shadow: 0 4px 15px rgba(0,0,0,0.3); }
          h1 { color: #38bdf8; }
          a { color: #34d399; text-decoration: none; font-weight: bold; font-size: 18px; }
          a:hover { text-decoration: underline; }
        </style>
      </head>
      <body>
        <div class="card">
          <h1>AgentMatrix Central Room</h1>
          <p>Status: <strong>Active & Running</strong></p>
          <p>Welcome to the Decentralized B2B AI Agent Marketplace.</p>
          <br>
          <a href="/agents">👉 Click here to view active Agents (JSON)</a>
        </div>
      </body>
      </html>
    `);
  }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`AgentMatrix server running on port ${PORT}`);
});
