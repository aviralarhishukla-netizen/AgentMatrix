const http = require('http');
const AgentFactory = require('./factory');

// Initialize our Agent Factory for the Room
const matrixFactory = new AgentFactory("AgentMatrix Central Room");

// Pre-create a couple of initial agents to showcase the marketplace
matrixFactory.createAgent("Alpha-Trader", "Market Analyst");
matrixFactory.createAgent("Beta-Coder", "Backend Developer");

const server = http.createServer((req, res) => {
  // Parse the URL to handle different routes
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
server.PORT = PORT;

server.listen(PORT, () => {
  console.log(`AgentMatrix server running on port ${PORT}`);
});
