/**
 * CloudVisual Pro - Interactive Cloud Engineering Tools
 * 1. Step-by-Step VPC Traffic & Security Simulator (Stateful SG vs Stateless NACL)
 * 2. Visual Cloud Architecture Cost & TCO Estimator (FinOps)
 */

const InteractiveTools = {
  // Simulator State
  simulatorStep: 0,

  simulatorSteps: [
    {
      title: "Step 1: Client Request Arrives at Internet Gateway",
      description: "An external web user at IP 203.0.113.5 sends an HTTPS request on destination port 443. The packet hits the VPC's Internet Gateway (IGW). The IGW performs 1:1 NAT translation, translating the public destination IP to the EC2 instance's private VPC IP (10.0.1.50).",
      activeNode: "igw",
      layer: "Internet Gateway (L3/L4)",
      srcIp: "203.0.113.5 (Client)",
      dstIp: "10.0.1.50 (VPC Private IP)",
      port: "TCP 443 (HTTPS)",
      securityState: "Public Traffic Accepted by IGW"
    },
    {
      title: "Step 2: VPC Route Table Evaluates Destination",
      description: "The Public Subnet Route Table checks the destination IP. Since 10.0.1.50 is within the VPC CIDR (10.0.0.0/16), the packet is forwarded locally to Subnet A.",
      activeNode: "routetable",
      layer: "VPC Route Table",
      srcIp: "203.0.113.5",
      dstIp: "10.0.1.50",
      port: "TCP 443",
      securityState: "Target: Local (10.0.0.0/16)"
    },
    {
      title: "Step 3: Network ACL (NACL) Inbound Rule Evaluation",
      description: "Before crossing the subnet boundary, the packet is filtered by the Network ACL. Rule 100 permits inbound TCP Port 443 from 0.0.0.0/0. Because NACLs are stateless, this inbound check only verifies the incoming packet direction.",
      activeNode: "nacl",
      layer: "Network ACL (Stateless Subnet Boundary)",
      srcIp: "203.0.113.5",
      dstIp: "10.0.1.50",
      port: "TCP 443",
      securityState: "NACL Rule 100: ALLOW Inbound"
    },
    {
      title: "Step 4: Security Group Inbound Inspection",
      description: "The packet reaches the Virtual NIC (ENI) of the EC2 instance. The Security Group checks its inbound rules: 'TCP Port 443 ALLOW from 0.0.0.0/0'. The Security Group records this connection in its internal state table (STATEFUL tracking).",
      activeNode: "sg",
      layer: "Security Group (Stateful ENI Boundary)",
      srcIp: "203.0.113.5",
      dstIp: "10.0.1.50",
      port: "TCP 443",
      securityState: "SG Rule: ALLOW • Connection State Cached!"
    },
    {
      title: "Step 5: EC2 Virtual Machine Processes Request",
      description: "The web application (Node.js/Nginx/Python) receives the HTTPS request, queries a backend database, and prepares an HTTP 200 OK response payload (50KB JSON data).",
      activeNode: "ec2",
      layer: "Application Compute",
      srcIp: "10.0.1.50",
      dstIp: "203.0.113.5",
      port: "Ephemeral Port 52418",
      securityState: "HTTP 200 OK Response Generated"
    },
    {
      title: "Step 6: Security Group Auto-Permits Return Traffic",
      description: "The EC2 instance transmits the response back to the client. Even if the Security Group has ZERO outbound rules, the response is AUTOMATICALLY allowed out because Security Groups are STATEFUL!",
      activeNode: "sg",
      layer: "Security Group (Return Flow)",
      srcIp: "10.0.1.50",
      dstIp: "203.0.113.5",
      port: "TCP 52418 (Ephemeral)",
      securityState: "STATEFUL: Auto-allowed by connection tracker!"
    },
    {
      title: "Step 7: Network ACL Outbound Verification",
      description: "Because NACLs are STATELESS, they do NOT remember the inbound request. The NACL checks its outbound table for Rule 100 (Outbound Ephemeral Ports 1024-65535). Traffic passes and exits the Internet Gateway to the user!",
      activeNode: "nacl",
      layer: "Network ACL (Stateless Outbound)",
      srcIp: "10.0.1.50",
      dstIp: "203.0.113.5",
      port: "TCP 52418",
      securityState: "NACL Rule 100: ALLOW Ephemeral Outbound"
    }
  ],

  /**
   * Render VPC Simulator UI
   */
  renderSimulator: function(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const current = this.simulatorSteps[this.simulatorStep];
    const totalSteps = this.simulatorSteps.length;

    container.innerHTML = `
      <div class="glass-card rounded-xl p-5 border border-slate-700/60 shadow-xl">
        <div class="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-800">
          <div>
            <span class="text-xs uppercase tracking-wider font-semibold text-sky-400 bg-sky-950/60 px-2.5 py-1 rounded border border-sky-800/40">
              Interactive Cloud Network Engine
            </span>
            <h3 class="text-lg font-bold text-white mt-1">VPC Packet Trace & Security Filter</h3>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-xs font-mono text-slate-400">Step ${this.simulatorStep + 1} of ${totalSteps}</span>
            <button id="sim-prev-btn" class="px-3 py-1.5 text-xs rounded bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition" ${this.simulatorStep === 0 ? 'disabled opacity-50 cursor-not-allowed' : ''}>
              ◀ Prev
            </button>
            <button id="sim-next-btn" class="px-3 py-1.5 text-xs rounded bg-sky-600 hover:bg-sky-500 text-white font-semibold transition" ${this.simulatorStep === totalSteps - 1 ? 'disabled opacity-50 cursor-not-allowed' : ''}>
              Next ▶
            </button>
            <button id="sim-reset-btn" class="px-3 py-1.5 text-xs rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition">
              Reset
            </button>
          </div>
        </div>

        <!-- Visual Flow Nodes -->
        <div class="bg-slate-950 p-6 rounded-lg border border-slate-800 my-4 overflow-x-auto">
          <div class="min-w-[650px] flex items-center justify-between relative">
            <div class="absolute left-10 right-10 top-1/2 -translate-y-1/2 h-1 bg-slate-800 -z-0"></div>

            <!-- Client Node -->
            <div class="flex flex-col items-center z-10 transition-all">
              <div class="w-13 h-13 p-3 rounded-xl flex items-center justify-center font-bold text-lg bg-slate-800 text-slate-300 border border-slate-700 shadow-lg">
                🌐
              </div>
              <span class="text-xs font-bold text-white mt-1">Client</span>
              <span class="text-[10px] text-slate-400 font-mono">203.0.113.5</span>
            </div>

            <!-- IGW Node -->
            <div class="flex flex-col items-center z-10 transition-all ${current.activeNode === 'igw' ? 'scale-110' : 'opacity-70'}">
              <div class="w-13 h-13 p-3 rounded-xl flex items-center justify-center font-bold text-lg ${current.activeNode === 'igw' ? 'bg-sky-500 text-white ring-4 ring-sky-500/30' : 'bg-slate-800 text-slate-300 border border-slate-700'} shadow-lg">
                🚪
              </div>
              <span class="text-xs font-bold text-white mt-1">IGW</span>
              <span class="text-[10px] text-slate-400 font-mono">Gateway</span>
            </div>

            <!-- NACL Node -->
            <div class="flex flex-col items-center z-10 transition-all ${current.activeNode === 'nacl' ? 'scale-110' : 'opacity-70'}">
              <div class="w-13 h-13 p-3 rounded-xl flex items-center justify-center font-bold text-lg ${current.activeNode === 'nacl' ? 'bg-red-500 text-white ring-4 ring-red-500/30' : 'bg-slate-800 text-slate-300 border border-slate-700'} shadow-lg">
                🧱
              </div>
              <span class="text-xs font-bold text-white mt-1">NACL</span>
              <span class="text-[10px] text-slate-400 font-mono">Stateless</span>
            </div>

            <!-- Security Group Node -->
            <div class="flex flex-col items-center z-10 transition-all ${current.activeNode === 'sg' ? 'scale-110' : 'opacity-70'}">
              <div class="w-13 h-13 p-3 rounded-xl flex items-center justify-center font-bold text-lg ${current.activeNode === 'sg' ? 'bg-emerald-500 text-white ring-4 ring-emerald-500/30' : 'bg-slate-800 text-slate-300 border border-slate-700'} shadow-lg">
                🛡️
              </div>
              <span class="text-xs font-bold text-white mt-1">Security Group</span>
              <span class="text-[10px] text-slate-400 font-mono">Stateful</span>
            </div>

            <!-- EC2 Node -->
            <div class="flex flex-col items-center z-10 transition-all ${current.activeNode === 'ec2' ? 'scale-110' : 'opacity-70'}">
              <div class="w-13 h-13 p-3 rounded-xl flex items-center justify-center font-bold text-lg ${current.activeNode === 'ec2' ? 'bg-purple-500 text-white ring-4 ring-purple-500/30' : 'bg-slate-800 text-slate-300 border border-slate-700'} shadow-lg">
                💻
              </div>
              <span class="text-xs font-bold text-white mt-1">EC2 Instance</span>
              <span class="text-[10px] text-slate-400 font-mono">10.0.1.50</span>
            </div>
          </div>
        </div>

        <!-- Description Box -->
        <div class="p-4 rounded-lg bg-slate-900 border border-slate-800 mb-4">
          <div class="flex items-center gap-2 mb-1.5">
            <span class="w-2.5 h-2.5 rounded-full bg-sky-400 animate-ping"></span>
            <h4 class="text-sm font-bold text-sky-300">${current.title}</h4>
            <span class="ml-auto text-xs bg-slate-800 text-slate-400 px-2 py-0.5 rounded font-mono">${current.layer}</span>
          </div>
          <p class="text-xs text-slate-300 leading-relaxed">${current.description}</p>
        </div>

        <!-- Packet Inspector Strip -->
        <div class="bg-slate-950 p-4 rounded-lg border border-slate-800">
          <span class="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 block">
            🔍 Live Packet Inspection & Security Firewall State:
          </span>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs font-mono">
            <div class="p-2 bg-slate-900 rounded border border-slate-800">
              <span class="text-slate-500 text-[10px] block">Source IP:</span>
              <span class="text-sky-300 font-semibold truncate block">${current.srcIp}</span>
            </div>
            <div class="p-2 bg-slate-900 rounded border border-slate-800">
              <span class="text-slate-500 text-[10px] block">Destination IP:</span>
              <span class="text-emerald-300 font-semibold truncate block">${current.dstIp}</span>
            </div>
            <div class="p-2 bg-slate-900 rounded border border-slate-800">
              <span class="text-slate-500 text-[10px] block">Transport Port:</span>
              <span class="text-amber-300 font-semibold truncate block">${current.port}</span>
            </div>
            <div class="p-2 bg-slate-900 rounded border border-slate-800">
              <span class="text-slate-500 text-[10px] block">Firewall Evaluation:</span>
              <span class="text-purple-300 font-semibold truncate block">${current.securityState}</span>
            </div>
          </div>
        </div>
      </div>
    `;

    // Bind navigation buttons
    document.getElementById("sim-prev-btn")?.addEventListener("click", () => {
      if (this.simulatorStep > 0) {
        this.simulatorStep--;
        this.renderSimulator(containerId);
      }
    });
    document.getElementById("sim-next-btn")?.addEventListener("click", () => {
      if (this.simulatorStep < this.simulatorSteps.length - 1) {
        this.simulatorStep++;
        this.renderSimulator(containerId);
      }
    });
    document.getElementById("sim-reset-btn")?.addEventListener("click", () => {
      this.simulatorStep = 0;
      this.renderSimulator(containerId);
    });
  },

  /**
   * Render Cloud Cost & TCO Estimator
   */
  renderCostEstimator: function(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = `
      <div class="glass-card rounded-xl p-5 border border-slate-700/60 shadow-xl">
        <div class="mb-4 pb-3 border-b border-slate-800">
          <span class="text-xs uppercase tracking-wider font-semibold text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded border border-emerald-800/40">
            Cloud FinOps Calculator
          </span>
          <h3 class="text-lg font-bold text-white mt-1">Visual Cloud Cost & TCO Estimator</h3>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label class="text-xs text-slate-400 block mb-1 font-semibold">Compute Infrastructure:</label>
            <select id="cost-compute" class="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white text-xs focus:border-emerald-500">
              <option value="60">2x t3.medium VMs (Basic Web App - $60/mo)</option>
              <option value="280" selected>4x m5.large VMs (Auto-Scaled Fleet - $280/mo)</option>
              <option value="760">8x c5.2xlarge VMs (Compute Intensive - $760/mo)</option>
              <option value="15">AWS Lambda / Cloud Run (Serverless - $15/mo)</option>
            </select>
          </div>

          <div>
            <label class="text-xs text-slate-400 block mb-1 font-semibold">Database Infrastructure:</label>
            <select id="cost-database" class="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white text-xs focus:border-emerald-500">
              <option value="45">Single-AZ RDS PostgreSQL ($45/mo)</option>
              <option value="180" selected>Multi-AZ Amazon Aurora Serverless ($180/mo)</option>
              <option value="520">Multi-AZ High-Throughput Cluster ($520/mo)</option>
              <option value="10">Amazon DynamoDB On-Demand ($10/mo)</option>
            </select>
          </div>

          <div>
            <label class="text-xs text-slate-400 block mb-1 font-semibold">Cloud Storage Capacity:</label>
            <select id="cost-storage" class="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white text-xs focus:border-emerald-500">
              <option value="12">500 GB S3 Standard Storage ($12/mo)</option>
              <option value="60" selected>2.5 TB S3 Intelligent-Tiering ($60/mo)</option>
              <option value="230">10 TB S3 Enterprise Lake ($230/mo)</option>
            </select>
          </div>

          <div>
            <label class="text-xs text-slate-400 block mb-1 font-semibold">Pricing & Commitment Strategy:</label>
            <select id="cost-discount" class="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white text-xs focus:border-emerald-500">
              <option value="0">On-Demand (0% Savings - Standard)</option>
              <option value="0.38" selected>1-Year Compute Savings Plan (38% Savings)</option>
              <option value="0.72">3-Year Reserved Instances (72% Savings)</option>
              <option value="0.65">Spot Instances for stateless workers (65% Savings)</option>
            </select>
          </div>
        </div>

        <div id="cost-results-box" class="p-4 rounded-xl bg-slate-950 border border-slate-800">
          <!-- Dynamically populated -->
        </div>
      </div>
    `;

    const updateCost = () => {
      const compute = parseFloat(document.getElementById("cost-compute")?.value || 280);
      const db = parseFloat(document.getElementById("cost-database")?.value || 180);
      const storage = parseFloat(document.getElementById("cost-storage")?.value || 60);
      const discountRate = parseFloat(document.getElementById("cost-discount")?.value || 0.38);

      const rawMonthly = compute + db + storage;
      const savingsMonthly = (compute * discountRate) + (db * (discountRate * 0.7));
      const finalMonthly = Math.max(10, Math.round(rawMonthly - savingsMonthly));
      const yearly = finalMonthly * 12;

      const resBox = document.getElementById("cost-results-box");
      if (!resBox) return;

      resBox.innerHTML = `
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center mb-3">
          <div class="p-3 bg-slate-900 rounded-lg border border-slate-800">
            <span class="text-[10px] text-slate-500 uppercase block font-semibold">Estimated Monthly Bill</span>
            <span class="text-2xl font-extrabold text-emerald-400">$${finalMonthly} / mo</span>
          </div>
          <div class="p-3 bg-slate-900 rounded-lg border border-slate-800">
            <span class="text-[10px] text-slate-500 uppercase block font-semibold">Annual Cloud Cost</span>
            <span class="text-2xl font-extrabold text-white">$${yearly.toLocaleString()} / yr</span>
          </div>
          <div class="p-3 bg-slate-900 rounded-lg border border-slate-800">
            <span class="text-[10px] text-slate-500 uppercase block font-semibold">Monthly Savings</span>
            <span class="text-2xl font-extrabold text-sky-400">-$${Math.round(savingsMonthly)} / mo</span>
          </div>
        </div>
        <div class="text-[11px] text-slate-400 flex items-center justify-between border-t border-slate-800/80 pt-2">
          <span>💡 <strong>FinOps Tip:</strong> Committing to a 3-Year Savings Plan or using Graviton (ARM) processors can slash compute bills by up to 72%!</span>
        </div>
      `;
    };

    document.getElementById("cost-compute")?.addEventListener("change", updateCost);
    document.getElementById("cost-database")?.addEventListener("change", updateCost);
    document.getElementById("cost-storage")?.addEventListener("change", updateCost);
    document.getElementById("cost-discount")?.addEventListener("change", updateCost);
    updateCost();
  }
};
