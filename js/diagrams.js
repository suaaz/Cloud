/**
 * CloudVisual Pro - Scalable SVG Cloud Computing Architectural Blueprints
 * Handcrafted vector diagrams for Cloud Fundamentals & Solutions Architect
 */

const CloudDiagrams = {
  /**
   * Diagram 1: Shared Responsibility Model (On-Prem vs IaaS vs PaaS vs SaaS)
   */
  sharedResponsibility: function() {
    return `
      <svg viewBox="0 0 920 420" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto">
        <rect width="920" height="420" fill="#080d1a" rx="12"/>
        <text x="460" y="32" text-anchor="middle" fill="#38bdf8" font-size="18" font-weight="700">THE CLOUD SHARED RESPONSIBILITY MODEL</text>

        <!-- Column Headers -->
        <g transform="translate(60, 60)">
          <text x="70" y="20" text-anchor="middle" fill="#94a3b8" font-weight="bold" font-size="13">ON-PREMISES</text>
          <text x="250" y="20" text-anchor="middle" fill="#38bdf8" font-weight="bold" font-size="13">IaaS (EC2/VMs)</text>
          <text x="440" y="20" text-anchor="middle" fill="#818cf8" font-weight="bold" font-size="13">PaaS (App Service)</text>
          <text x="630" y="20" text-anchor="middle" fill="#34d399" font-weight="bold" font-size="13">SaaS (M365/Salesforce)</text>
          <text x="780" y="20" text-anchor="middle" fill="#f59e0b" font-weight="bold" font-size="12">LAYER</text>
        </g>

        <!-- Layers List -->
        <!-- Layer 1: Data & IAM -->
        <g transform="translate(60, 95)">
          <rect x="0" y="0" width="140" height="35" rx="4" fill="#0284c7"/>
          <rect x="180" y="0" width="140" height="35" rx="4" fill="#0284c7"/>
          <rect x="370" y="0" width="140" height="35" rx="4" fill="#0284c7"/>
          <rect x="560" y="0" width="140" height="35" rx="4" fill="#0284c7"/>
          <text x="70" y="22" text-anchor="middle" fill="#fff" font-size="11">Customer</text>
          <text x="250" y="22" text-anchor="middle" fill="#fff" font-size="11">Customer</text>
          <text x="440" y="22" text-anchor="middle" fill="#fff" font-size="11">Customer</text>
          <text x="630" y="22" text-anchor="middle" fill="#fff" font-size="11">Customer</text>
          <text x="780" y="22" text-anchor="middle" fill="#f8fafc" font-size="11" font-weight="bold">Customer Data & IAM</text>
        </g>

        <!-- Layer 2: Application Code -->
        <g transform="translate(60, 138)">
          <rect x="0" y="0" width="140" height="35" rx="4" fill="#0284c7"/>
          <rect x="180" y="0" width="140" height="35" rx="4" fill="#0284c7"/>
          <rect x="370" y="0" width="140" height="35" rx="4" fill="#0284c7"/>
          <rect x="560" y="0" width="140" height="35" rx="4" fill="#1e293b" stroke="#334155"/>
          <text x="70" y="22" text-anchor="middle" fill="#fff" font-size="11">Customer</text>
          <text x="250" y="22" text-anchor="middle" fill="#fff" font-size="11">Customer</text>
          <text x="440" y="22" text-anchor="middle" fill="#fff" font-size="11">Customer</text>
          <text x="630" y="22" text-anchor="middle" fill="#94a3b8" font-size="11">Cloud Provider</text>
          <text x="780" y="22" text-anchor="middle" fill="#f8fafc" font-size="11" font-weight="bold">Applications & APIs</text>
        </g>

        <!-- Layer 3: OS & Runtime -->
        <g transform="translate(60, 181)">
          <rect x="0" y="0" width="140" height="35" rx="4" fill="#0284c7"/>
          <rect x="180" y="0" width="140" height="35" rx="4" fill="#0284c7"/>
          <rect x="370" y="0" width="140" height="35" rx="4" fill="#1e293b" stroke="#334155"/>
          <rect x="560" y="0" width="140" height="35" rx="4" fill="#1e293b" stroke="#334155"/>
          <text x="70" y="22" text-anchor="middle" fill="#fff" font-size="11">Customer</text>
          <text x="250" y="22" text-anchor="middle" fill="#fff" font-size="11">Customer</text>
          <text x="440" y="22" text-anchor="middle" fill="#94a3b8" font-size="11">Cloud Provider</text>
          <text x="630" y="22" text-anchor="middle" fill="#94a3b8" font-size="11">Cloud Provider</text>
          <text x="780" y="22" text-anchor="middle" fill="#f8fafc" font-size="11" font-weight="bold">Operating System (OS)</text>
        </g>

        <!-- Layer 4: Virtualization & Hypervisor -->
        <g transform="translate(60, 224)">
          <rect x="0" y="0" width="140" height="35" rx="4" fill="#0284c7"/>
          <rect x="180" y="0" width="140" height="35" rx="4" fill="#1e293b" stroke="#334155"/>
          <rect x="370" y="0" width="140" height="35" rx="4" fill="#1e293b" stroke="#334155"/>
          <rect x="560" y="0" width="140" height="35" rx="4" fill="#1e293b" stroke="#334155"/>
          <text x="70" y="22" text-anchor="middle" fill="#fff" font-size="11">Customer</text>
          <text x="250" y="22" text-anchor="middle" fill="#94a3b8" font-size="11">Cloud Provider</text>
          <text x="440" y="22" text-anchor="middle" fill="#94a3b8" font-size="11">Cloud Provider</text>
          <text x="630" y="22" text-anchor="middle" fill="#94a3b8" font-size="11">Cloud Provider</text>
          <text x="780" y="22" text-anchor="middle" fill="#f8fafc" font-size="11" font-weight="bold">Hypervisor & Runtime</text>
        </g>

        <!-- Layer 5: Physical Hardware & Data Center -->
        <g transform="translate(60, 267)">
          <rect x="0" y="0" width="140" height="35" rx="4" fill="#0284c7"/>
          <rect x="180" y="0" width="140" height="35" rx="4" fill="#1e293b" stroke="#334155"/>
          <rect x="370" y="0" width="140" height="35" rx="4" fill="#1e293b" stroke="#334155"/>
          <rect x="560" y="0" width="140" height="35" rx="4" fill="#1e293b" stroke="#334155"/>
          <text x="70" y="22" text-anchor="middle" fill="#fff" font-size="11">Customer</text>
          <text x="250" y="22" text-anchor="middle" fill="#94a3b8" font-size="11">Cloud Provider</text>
          <text x="440" y="22" text-anchor="middle" fill="#94a3b8" font-size="11">Cloud Provider</text>
          <text x="630" y="22" text-anchor="middle" fill="#94a3b8" font-size="11">Cloud Provider</text>
          <text x="780" y="22" text-anchor="middle" fill="#f8fafc" font-size="11" font-weight="bold">Physical Hardware / DC</text>
        </g>

        <!-- Legend Bar -->
        <g transform="translate(60, 335)">
          <rect width="800" height="55" rx="8" fill="#0f172a" stroke="#1e293b"/>
          <circle cx="35" cy="28" r="8" fill="#0284c7"/>
          <text x="50" y="32" fill="#38bdf8" font-size="12" font-weight="bold">Customer Responsibility:</text>
          <text x="205" y="32" fill="#94a3b8" font-size="12">Security IN the Cloud (Data, Encryption, OS Patches in IaaS, User Access)</text>
          <circle cx="560" cy="28" r="8" fill="#334155"/>
          <text x="575" y="32" fill="#f8fafc" font-size="12" font-weight="bold">Provider Responsibility:</text>
          <text x="720" y="32" fill="#94a3b8" font-size="12">Security OF the Cloud</text>
        </g>
      </svg>
    `;
  },

  /**
   * Diagram 2: 3-Tier Highly Available Cloud Architecture (ALB + Auto Scaling + Multi-AZ RDS)
   */
  threeTierCloud: function() {
    return `
      <svg viewBox="0 0 920 460" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto">
        <rect width="920" height="460" fill="#080d1a" rx="12"/>
        <text x="460" y="35" text-anchor="middle" fill="#38bdf8" font-size="18" font-weight="700">HIGH AVAILABILITY 3-TIER CLOUD ARCHITECTURE (MULTI-AZ)</text>

        <!-- Internet Gateway & Users -->
        <g transform="translate(60, 70)">
          <rect width="800" height="45" rx="8" fill="#0f172a" stroke="#38bdf8" stroke-dasharray="6 4"/>
          <text x="400" y="28" text-anchor="middle" fill="#38bdf8" font-weight="bold" font-size="13">🌐 Internet Clients ➔ Internet Gateway (IGW) / CloudFront CDN</text>
        </g>

        <!-- Tier 1: Public Web Subnets (ALB) -->
        <g transform="translate(60, 130)">
          <rect width="800" height="85" rx="8" fill="rgba(2, 132, 199, 0.08)" stroke="#0284c7"/>
          <text x="20" y="25" fill="#38bdf8" font-weight="bold" font-size="12">TIER 1: PUBLIC SUBNETS (Availability Zone A & B)</text>
          
          <rect x="250" y="35" width="300" height="38" rx="6" fill="#1e293b" stroke="#0284c7"/>
          <text x="400" y="58" text-anchor="middle" fill="#fff" font-weight="bold" font-size="12">Application Load Balancer (ALB)</text>
        </g>

        <!-- Tier 2: Private Application Subnets (Auto Scaling Group) -->
        <g transform="translate(60, 230)">
          <rect width="800" height="95" rx="8" fill="rgba(139, 92, 246, 0.08)" stroke="#8b5cf6"/>
          <text x="20" y="25" fill="#c084fc" font-weight="bold" font-size="12">TIER 2: PRIVATE APP SUBNETS (Compute Instances / Containers)</text>

          <!-- AZ-A Instances -->
          <rect x="120" y="38" width="220" height="42" rx="6" fill="#1e293b" stroke="#8b5cf6"/>
          <text x="230" y="64" text-anchor="middle" fill="#fff" font-size="12">AZ-A: EC2 App Instance (x2)</text>

          <!-- AZ-B Instances -->
          <rect x="460" y="38" width="220" height="42" rx="6" fill="#1e293b" stroke="#8b5cf6"/>
          <text x="570" y="64" text-anchor="middle" fill="#fff" font-size="12">AZ-B: EC2 App Instance (x2)</text>
        </g>

        <!-- Tier 3: Isolated Database Subnets (Multi-AZ RDS) -->
        <g transform="translate(60, 340)">
          <rect width="800" height="95" rx="8" fill="rgba(16, 185, 129, 0.08)" stroke="#10b981"/>
          <text x="20" y="25" fill="#34d399" font-weight="bold" font-size="12">TIER 3: ISOLATED DB SUBNETS (Multi-AZ Relational Database)</text>

          <!-- Primary DB -->
          <rect x="150" y="38" width="200" height="42" rx="6" fill="#1e293b" stroke="#10b981"/>
          <text x="250" y="64" text-anchor="middle" fill="#34d399" font-weight="bold" font-size="12">Primary RDS (Write / Read)</text>

          <line x1="360" y1="59" x2="490" y2="59" stroke="#10b981" stroke-width="2" stroke-dasharray="4 4"/>
          <text x="425" y="52" text-anchor="middle" fill="#94a3b8" font-size="10">Sync Replication</text>

          <!-- Standby DB -->
          <rect x="500" y="38" width="200" height="42" rx="6" fill="#1e293b" stroke="#64748b"/>
          <text x="600" y="64" text-anchor="middle" fill="#94a3b8" font-size="12">Standby RDS (Auto-Failover)</text>
        </g>
      </svg>
    `;
  },

  /**
   * Diagram 3: VPC Networking & Security (NACLs vs Security Groups)
   */
  vpcTrafficFlow: function() {
    return `
      <svg viewBox="0 0 920 440" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto">
        <rect width="920" height="440" fill="#080d1a" rx="12"/>
        <text x="460" y="35" text-anchor="middle" fill="#38bdf8" font-size="18" font-weight="700">VPC SECURITY LAYERS: STATELESS NACL VS STATEFUL SECURITY GROUP</text>

        <!-- VPC Container -->
        <rect x="40" y="65" width="840" height="300" rx="12" fill="rgba(2, 132, 199, 0.04)" stroke="#0284c7" stroke-width="2"/>
        <text x="70" y="95" fill="#38bdf8" font-weight="bold" font-size="14">Virtual Private Cloud (VPC: 10.0.0.0/16)</text>

        <!-- Subnet Boundary -->
        <rect x="80" y="115" width="760" height="230" rx="10" fill="rgba(139, 92, 246, 0.04)" stroke="#8b5cf6" stroke-dasharray="6 4"/>
        <text x="110" y="140" fill="#c084fc" font-weight="bold" font-size="12">Subnet Boundary (10.0.1.0/24)</text>

        <!-- Outer Filter: NACL -->
        <g transform="translate(140, 165)">
          <rect width="200" height="150" rx="8" fill="#111827" stroke="#ef4444" stroke-width="2"/>
          <text x="100" y="30" text-anchor="middle" fill="#f87171" font-weight="bold" font-size="13">NETWORK ACL (NACL)</text>
          <text x="100" y="55" text-anchor="middle" fill="#94a3b8" font-size="11">• Subnet-Level Defense</text>
          <text x="100" y="75" text-anchor="middle" fill="#fca5a5" font-size="11" font-weight="bold">• STATELESS Filtering</text>
          <text x="100" y="95" text-anchor="middle" fill="#94a3b8" font-size="11">• Supports ALLOW and DENY</text>
          <text x="100" y="115" text-anchor="middle" fill="#94a3b8" font-size="11">• Evaluated in Number Order</text>
          <text x="100" y="135" text-anchor="middle" fill="#fca5a5" font-size="10">Must allow Ephemeral Ports!</text>
        </g>

        <!-- Arrow -->
        <line x1="350" y1="240" x2="430" y2="240" stroke="#38bdf8" stroke-width="3"/>

        <!-- Inner Filter: Security Group -->
        <g transform="translate(440, 165)">
          <rect width="200" height="150" rx="8" fill="#111827" stroke="#10b981" stroke-width="2"/>
          <text x="100" y="30" text-anchor="middle" fill="#34d399" font-weight="bold" font-size="13">SECURITY GROUP (SG)</text>
          <text x="100" y="55" text-anchor="middle" fill="#94a3b8" font-size="11">• Instance / ENI Level</text>
          <text x="100" y="75" text-anchor="middle" fill="#6ee7b7" font-size="11" font-weight="bold">• STATEFUL Filtering</text>
          <text x="100" y="95" text-anchor="middle" fill="#94a3b8" font-size="11">• ALLOW Rules ONLY (Implicit Deny)</text>
          <text x="100" y="115" text-anchor="middle" fill="#94a3b8" font-size="11">• Return Traffic Auto-Allowed!</text>
          <text x="100" y="135" text-anchor="middle" fill="#6ee7b7" font-size="10">Can reference other SGs!</text>
        </g>

        <!-- Arrow -->
        <line x1="650" y1="240" x2="710" y2="240" stroke="#38bdf8" stroke-width="3"/>

        <!-- Target VM -->
        <g transform="translate(720, 195)">
          <rect width="95" height="90" rx="8" fill="#1e293b" stroke="#38bdf8"/>
          <text x="47" y="40" text-anchor="middle" fill="#fff" font-size="20">💻</text>
          <text x="47" y="65" text-anchor="middle" fill="#fff" font-weight="bold" font-size="11">EC2 / VM</text>
          <text x="47" y="80" text-anchor="middle" fill="#94a3b8" font-size="9">10.0.1.50</text>
        </g>

        <!-- Bottom Summary -->
        <g transform="translate(40, 385)">
          <rect width="840" height="40" rx="6" fill="#111827"/>
          <text x="420" y="25" text-anchor="middle" fill="#f8fafc" font-size="12">
            💡 Critical Exam Trap: If an inbound connection is allowed by a Security Group, return traffic is automatically allowed regardless of outbound rules!
          </text>
        </g>
      </svg>
    `;
  },

  /**
   * Diagram 4: Serverless Event-Driven Microservices
   */
  serverlessMicroservice: function() {
    return `
      <svg viewBox="0 0 920 400" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto">
        <rect width="920" height="400" fill="#080d1a" rx="12"/>
        <text x="460" y="35" text-anchor="middle" fill="#38bdf8" font-size="18" font-weight="700">SERVERLESS EVENT-DRIVEN MICROSERVICE ARCHITECTURE</text>

        <!-- Step 1: Client -->
        <g transform="translate(50, 120)">
          <rect width="110" height="110" rx="10" fill="#0f172a" stroke="#64748b"/>
          <text x="55" y="45" text-anchor="middle" fill="#fff" font-size="24">📱</text>
          <text x="55" y="75" text-anchor="middle" fill="#fff" font-weight="bold" font-size="12">Client Web/App</text>
          <text x="55" y="95" text-anchor="middle" fill="#94a3b8" font-size="10">HTTPS Calls</text>
        </g>

        <!-- Arrow -->
        <line x1="165" y1="175" x2="225" y2="175" stroke="#38bdf8" stroke-width="3"/>

        <!-- Step 2: API Gateway -->
        <g transform="translate(230, 120)">
          <rect width="140" height="110" rx="10" fill="#0f172a" stroke="#0284c7" stroke-width="2"/>
          <text x="70" y="45" text-anchor="middle" fill="#fff" font-size="24">🚪</text>
          <text x="70" y="75" text-anchor="middle" fill="#38bdf8" font-weight="bold" font-size="12">API Gateway</text>
          <text x="70" y="95" text-anchor="middle" fill="#94a3b8" font-size="10">Auth, Throttling, CORS</text>
        </g>

        <!-- Arrow -->
        <line x1="375" y1="175" x2="435" y2="175" stroke="#38bdf8" stroke-width="3"/>

        <!-- Step 3: AWS Lambda (Compute) -->
        <g transform="translate(440, 120)">
          <rect width="150" height="110" rx="10" fill="#0f172a" stroke="#f59e0b" stroke-width="2"/>
          <text x="75" y="45" text-anchor="middle" fill="#fff" font-size="24">⚡</text>
          <text x="75" y="75" text-anchor="middle" fill="#fbbf24" font-weight="bold" font-size="12">AWS Lambda</text>
          <text x="75" y="95" text-anchor="middle" fill="#94a3b8" font-size="10">Zero Idle Server Costs</text>
        </g>

        <!-- Arrow -->
        <line x1="595" y1="175" x2="655" y2="175" stroke="#38bdf8" stroke-width="3"/>

        <!-- Step 4: DynamoDB -->
        <g transform="translate(660, 120)">
          <rect width="150" height="110" rx="10" fill="#0f172a" stroke="#10b981" stroke-width="2"/>
          <text x="75" y="45" text-anchor="middle" fill="#fff" font-size="24">🗄️</text>
          <text x="75" y="75" text-anchor="middle" fill="#34d399" font-weight="bold" font-size="12">Amazon DynamoDB</text>
          <text x="75" y="95" text-anchor="middle" fill="#94a3b8" font-size="10">Single-Digit ms NoSQL</text>
        </g>

        <!-- Asynchronous Decoupling SQS Queue -->
        <g transform="translate(440, 260)">
          <rect width="370" height="70" rx="8" fill="#111827" stroke="#8b5cf6" stroke-dasharray="6 4"/>
          <text x="25" y="32" fill="#c084fc" font-weight="bold" font-size="12">Decoupling & Dead-Letter Queue (SQS)</text>
          <text x="25" y="52" fill="#94a3b8" font-size="11">Buffers asynchronous tasks and catches failed events for replay</text>
        </g>
        <line x1="515" y1="230" x2="515" y2="260" stroke="#8b5cf6" stroke-width="2"/>

        <!-- Bottom Note -->
        <g transform="translate(50, 350)">
          <rect width="820" height="35" rx="6" fill="#0f172a"/>
          <text x="410" y="22" text-anchor="middle" fill="#94a3b8" font-size="11">
            Serverless Benefits: Auto-scales from 0 to 100,000+ requests/sec • Pay strictly per millisecond of compute • No OS patching
          </text>
        </g>
      </svg>
    `;
  },

  /**
   * Diagram 5: Disaster Recovery RTO vs RPO Spectrum
   */
  disasterRecovery: function() {
    return `
      <svg viewBox="0 0 920 400" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto">
        <rect width="920" height="400" fill="#080d1a" rx="12"/>
        <text x="460" y="35" text-anchor="middle" fill="#38bdf8" font-size="18" font-weight="700">DISASTER RECOVERY (DR) SPECTRUM: RTO & RPO TRADEOFF</text>

        <!-- Spectrum Axis -->
        <g transform="translate(80, 80)">
          <line x1="0" y1="20" x2="760" y2="20" stroke="#334155" stroke-width="4"/>
          <polygon points="760,15 775,20 760,25" fill="#38bdf8"/>
          <text x="0" y="5" fill="#10b981" font-size="11" font-weight="bold">Lowest Cost / Hours Recovery</text>
          <text x="760" y="5" text-anchor="end" fill="#f43f5e" font-size="11" font-weight="bold">Highest Cost / Near-Zero Downtime</text>
        </g>

        <!-- 4 Strategies -->
        <!-- Strategy 1: Backup & Restore -->
        <g transform="translate(70, 130)">
          <rect width="170" height="150" rx="8" fill="#111827" stroke="#10b981"/>
          <text x="85" y="30" text-anchor="middle" fill="#34d399" font-weight="bold" font-size="12">1. Backup & Restore</text>
          <text x="85" y="60" text-anchor="middle" fill="#fff" font-size="11">RTO: 24+ Hours</text>
          <text x="85" y="80" text-anchor="middle" fill="#fff" font-size="11">RPO: 24+ Hours</text>
          <text x="85" y="110" text-anchor="middle" fill="#94a3b8" font-size="10">Nightly snapshots/S3</text>
          <text x="85" y="130" text-anchor="middle" fill="#34d399" font-size="10">💲 Very Inexpensive</text>
        </g>

        <!-- Strategy 2: Pilot Light -->
        <g transform="translate(265, 130)">
          <rect width="170" height="150" rx="8" fill="#111827" stroke="#0284c7"/>
          <text x="85" y="30" text-anchor="middle" fill="#38bdf8" font-weight="bold" font-size="12">2. Pilot Light</text>
          <text x="85" y="60" text-anchor="middle" fill="#fff" font-size="11">RTO: Minutes/Hours</text>
          <text x="85" y="80" text-anchor="middle" fill="#fff" font-size="11">RPO: Minutes</text>
          <text x="85" y="110" text-anchor="middle" fill="#94a3b8" font-size="10">Core DB running replica</text>
          <text x="85" y="130" text-anchor="middle" fill="#38bdf8" font-size="10">💲💲 Low Cost</text>
        </g>

        <!-- Strategy 3: Warm Standby -->
        <g transform="translate(460, 130)">
          <rect width="170" height="150" rx="8" fill="#111827" stroke="#f59e0b"/>
          <text x="85" y="30" text-anchor="middle" fill="#fbbf24" font-weight="bold" font-size="12">3. Warm Standby</text>
          <text x="85" y="60" text-anchor="middle" fill="#fff" font-size="11">RTO: Seconds/Minutes</text>
          <text x="85" y="80" text-anchor="middle" fill="#fff" font-size="11">RPO: Seconds</text>
          <text x="85" y="110" text-anchor="middle" fill="#94a3b8" font-size="10">Scaled-down fleet running</text>
          <text x="85" y="130" text-anchor="middle" fill="#fbbf24" font-size="10">💲💲💲 Moderate Cost</text>
        </g>

        <!-- Strategy 4: Multi-Site Active/Active -->
        <g transform="translate(655, 130)">
          <rect width="170" height="150" rx="8" fill="#111827" stroke="#ef4444"/>
          <text x="85" y="30" text-anchor="middle" fill="#f87171" font-weight="bold" font-size="12">4. Multi-Site Active</text>
          <text x="85" y="60" text-anchor="middle" fill="#fff" font-size="11">RTO: Real-time (0s)</text>
          <text x="85" y="80" text-anchor="middle" fill="#fff" font-size="11">RPO: Near-zero (0s)</text>
          <text x="85" y="110" text-anchor="middle" fill="#94a3b8" font-size="10">Full traffic in 2+ regions</text>
          <text x="85" y="130" text-anchor="middle" fill="#f87171" font-size="10">💲💲💲💲 Premium Cost</text>
        </g>

        <!-- Glossary strip -->
        <g transform="translate(70, 310)">
          <rect width="755" height="65" rx="8" fill="#0f172a" stroke="#1e293b"/>
          <text x="25" y="28" fill="#38bdf8" font-weight="bold" font-size="12">RTO (Recovery Time Objective):</text>
          <text x="250" y="28" fill="#94a3b8" font-size="11">Maximum acceptable downtime before service is restored.</text>
          <text x="25" y="50" fill="#f59e0b" font-weight="bold" font-size="12">RPO (Recovery Point Objective):</text>
          <text x="250" y="50" fill="#94a3b8" font-size="11">Maximum acceptable data loss measured in time (e.g. 1 hour of lost transactions).</text>
        </g>
      </svg>
    `;
  }
};
