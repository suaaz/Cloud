/**
 * CloudVisual Pro - Cloud Fundamentals Curriculum (AWS CLF-C02 / Azure AZ-900 / GCP)
 * High quality deep-dives, architecture explanations, CLI syntax, and exam tips
 */

const CLOUD_FUNDAMENTALS_TOPICS = [
  {
    id: "cloud-shared-responsibility",
    track: "Fundamentals",
    domain: "Cloud Concepts & Security",
    title: "The Shared Responsibility Model (IaaS vs PaaS vs SaaS)",
    subtitle: "Security OF the Cloud vs Security IN the Cloud",
    summary: "Clear breakdown of what the cloud customer must secure versus what AWS, Azure, or Google Cloud guarantees.",
    diagramType: "sharedResponsibility",
    readingTime: "9 min read",
    tags: ["Shared Responsibility", "Security", "IaaS", "PaaS", "SaaS", "Compliance"],
    content: `
      <h3>1. What is the Shared Responsibility Model?</h3>
      <p>When migrating to the public cloud, security does not automatically become 100% the cloud provider's problem. Security is divided into a shared contract:</p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
        <div class="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <h4 class="text-sky-400 font-bold mb-2">Security OF the Cloud (Provider Responsibility)</h4>
          <p class="text-xs text-slate-300 mb-2">AWS, Azure, and Google Cloud are responsible for protecting the infrastructure that runs all of the services offered in the cloud:</p>
          <ul class="text-xs space-y-1 text-slate-400 list-disc pl-4">
            <li>Physical data center security, biometric doors, guards, cameras</li>
            <li>Physical servers, disks, cabling, power supplies, cooling</li>
            <li>Virtualization layer (Hypervisor software, KVM/Nitro)</li>
            <li>Physical network backbone and fiber rings</li>
          </ul>
        </div>

        <div class="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <h4 class="text-emerald-400 font-bold mb-2">Security IN the Cloud (Customer Responsibility)</h4>
          <p class="text-xs text-slate-300 mb-2">You, the customer, determine what security you manage depending on the services you select:</p>
          <ul class="text-xs space-y-1 text-slate-400 list-disc pl-4">
            <li>Customer data encryption (at-rest and in-transit)</li>
            <li>Identity and Access Management (IAM user passwords, MFA, roles)</li>
            <li>Operating System updates, patches, and firewalls on virtual machines</li>
            <li>Network configuration (Security Groups, Subnets, Routing)</li>
          </ul>
        </div>
      </div>

      <h3 class="mt-4">2. IaaS vs PaaS vs SaaS Breakdown</h3>
      <ul class="space-y-2 text-xs text-slate-300 my-3">
        <li class="p-2.5 bg-slate-950 rounded border border-slate-800">
          <strong class="text-sky-300">Infrastructure as a Service (IaaS):</strong> Maximum control. You rent raw VMs and storage (e.g. AWS EC2, Azure VM). You must patch the OS, manage antivirus, and configure networking.
        </li>
        <li class="p-2.5 bg-slate-950 rounded border border-slate-800">
          <strong class="text-purple-300">Platform as a Service (PaaS):</strong> The provider manages the OS, web server, and runtime. You only upload application code (e.g. AWS Elastic Beanstalk, Azure App Service, Google Cloud Run).
        </li>
        <li class="p-2.5 bg-slate-950 rounded border border-slate-800">
          <strong class="text-emerald-300">Software as a Service (SaaS):</strong> Complete end-user software hosted by vendor. You only manage user logins and configuration (e.g. Microsoft 365, Salesforce, Gmail).
        </li>
      </ul>

      <h3 class="mt-6">3. Cloud CLI Verification Command</h3>
      <div class="cloud-terminal p-4 my-3 text-xs overflow-x-auto">
        <p class="cli-comment"># AWS CLI: Audit public S3 buckets (Customer Responsibility!)</p>
        <p><span class="cli-prompt">$</span> <span class="cli-command">aws s3api get-public-access-block --bucket my-company-data-lake</span></p>
        <p class="cli-output">{</p>
        <p class="cli-output">    "PublicAccessBlockConfiguration": {</p>
        <p class="cli-output">        "BlockPublicAcls": <span class="cli-highlight">true</span>,</p>
        <p class="cli-output">        "IgnorePublicAcls": <span class="cli-highlight">true</span>,</p>
        <p class="cli-output">        "BlockPublicPolicy": <span class="cli-highlight">true</span>,</p>
        <p class="cli-output">        "RestrictPublicBuckets": <span class="cli-highlight">true</span></p>
        <p class="cli-output">    }</p>
        <p class="cli-output">}</p>
      </div>

      <div class="p-4 rounded-lg bg-sky-950/40 border border-sky-500/30 my-4">
        <h4 class="text-sky-300 font-bold flex items-center gap-2">💡 Exam Golden Rule</h4>
        <p class="text-sm text-slate-300 mt-1">If a customer accidentally configures an S3 storage bucket or Azure Blob to be publicly readable and leaks confidential customer credit card data, <strong>the customer is 100% legally and architecturally responsible</strong>!</p>
      </div>
    `
  },
  {
    id: "cloud-global-infra",
    track: "Fundamentals",
    domain: "Global Infrastructure",
    title: "Global Infrastructure: Regions, Availability Zones & Edge Locations",
    subtitle: "Achieving High Availability, Low Latency, and Data Sovereignty",
    summary: "How cloud providers physically distribute data centers worldwide to guarantee 99.999% uptime and compliance.",
    diagramType: "threeTierCloud",
    readingTime: "10 min read",
    tags: ["Regions", "Availability Zones", "Edge Locations", "Latency", "CloudFront"],
    content: `
      <h3>1. The Three Tiers of Cloud Global Infrastructure</h3>
      <p>Cloud providers deploy hardware in hierarchical geographic clusters:</p>

      <div class="space-y-3 text-xs sm:text-sm text-slate-300 my-4">
        <div class="p-3 bg-slate-900 rounded-lg border border-slate-800">
          <strong class="text-sky-400 block mb-1">1. Regions:</strong>
          A physical geographic location in the world (e.g. <code>us-east-1</code> in N. Virginia, <code>eu-west-1</code> in Dublin, <code>ap-southeast-1</code> in Singapore). Each Region is completely isolated and contains at least <strong>three Availability Zones</strong>.
        </div>
        <div class="p-3 bg-slate-900 rounded-lg border border-slate-800">
          <strong class="text-purple-400 block mb-1">2. Availability Zones (AZs):</strong>
          One or more discrete, physically separated data centers within a Region. Each AZ has its own independent redundant power supplies, backup diesel generators, cooling, and network links. AZs are separated by tens of kilometers (to survive local fires or floods) but connected with ultra-low latency fiber (&lt;2ms).
        </div>
        <div class="p-3 bg-slate-900 rounded-lg border border-slate-800">
          <strong class="text-emerald-400 block mb-1">3. Edge Locations (Points of Presence - PoPs):</strong>
          Hundreds of lightweight caching points located in major global metropolitan cities. Used by CDNs (AWS CloudFront, Azure CDN) to cache static images, videos, and APIs close to end users to eliminate latency.
        </div>
      </div>

      <h3 class="mt-4">2. Factors for Choosing a Cloud Region</h3>
      <ol class="list-decimal pl-6 space-y-1 text-xs sm:text-sm text-slate-300">
        <li><strong>Compliance & Data Residency:</strong> Legal requirements (e.g. GDPR requires European citizen data to remain in the EU).</li>
        <li><strong>Proximity to End Users:</strong> Minimize round-trip speed-of-light network latency.</li>
        <li><strong>Service Availability:</strong> Brand new cloud services launch in flagship regions (like <code>us-east-1</code>) before smaller regional expansions.</li>
        <li><strong>Cost:</strong> Running an EC2 instance or VM varies in price by Region due to local land, electricity, and taxation rates (e.g. Sao Paulo is often 30-40% more expensive than Ohio).</li>
      </ol>

      <h3 class="mt-6">3. CLI Command</h3>
      <div class="cloud-terminal p-4 my-3 text-xs overflow-x-auto">
        <p class="cli-comment"># List all available AWS Regions</p>
        <p><span class="cli-prompt">$</span> <span class="cli-command">aws ec2 describe-regions --output table</span></p>
        <p class="cli-comment"># List all Availability Zones in current Region</p>
        <p><span class="cli-prompt">$</span> <span class="cli-command">aws ec2 describe-availability-zones --region us-east-1</span></p>
      </div>
    `
  },
  {
    id: "cloud-compute-options",
    track: "Fundamentals",
    domain: "Compute & Containers",
    title: "Cloud Compute Spectrum: VMs vs Containers vs Serverless",
    subtitle: "Choosing Between EC2, ECS/EKS (Kubernetes), and AWS Lambda / Cloud Functions",
    summary: "From virtual machines to lightweight container microservices and event-driven serverless functions with zero idle cost.",
    diagramType: "serverlessMicroservice",
    readingTime: "11 min read",
    tags: ["EC2", "Virtual Machines", "Docker", "Kubernetes", "Lambda", "Serverless"],
    content: `
      <h3>1. The Evolution of Cloud Compute</h3>
      <p>Modern applications are built using three primary compute paradigms:</p>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-3 my-4 text-xs">
        <div class="p-4 bg-slate-900 border border-slate-800 rounded-xl">
          <span class="text-2xl block mb-2">🖥️</span>
          <strong class="text-sky-400 font-bold block mb-1">Virtual Machines (EC2 / Azure VM)</strong>
          <p class="text-slate-300">Full virtual operating system. You install software dependencies, configure daemons, and manage security updates. Best for legacy monolithic software and steady 24/7 workloads.</p>
        </div>
        <div class="p-4 bg-slate-900 border border-slate-800 rounded-xl">
          <span class="text-2xl block mb-2">📦</span>
          <strong class="text-purple-400 font-bold block mb-1">Containers (Docker / ECS / EKS)</strong>
          <p class="text-slate-300">Package code and dependencies into portable images that boot in seconds. Standardized across developer laptops and production clouds. Orchestrated via Kubernetes (EKS/AKS).</p>
        </div>
        <div class="p-4 bg-slate-900 border border-slate-800 rounded-xl">
          <span class="text-2xl block mb-2">⚡</span>
          <strong class="text-amber-400 font-bold block mb-1">Serverless (AWS Lambda / Cloud Run)</strong>
          <p class="text-slate-300">Upload just your function code (Python, Node, Go). The cloud platform automatically executes it on demand, scales to tens of thousands of requests, and charges <strong>zero dollars when idle</strong>!</p>
        </div>
      </div>

      <h3 class="mt-4">2. Compute Pricing Models</h3>
      <ul class="space-y-1.5 text-xs text-slate-300 my-2">
        <li><strong>On-Demand:</strong> Pay per second with zero long-term commitment. Highest flexibility, highest hourly cost.</li>
        <li><strong>Reserved Instances / Savings Plans:</strong> Commit to 1 or 3 years of consistent usage in exchange for up to <strong>72% discount</strong>.</li>
        <li><strong>Spot Instances:</strong> Bid on unused surplus cloud capacity for up to <strong>90% discount</strong>. Cloud provider can reclaim with 2 minutes notice. Ideal for batch rendering, CI/CD, and fault-tolerant processing.</li>
      </ul>
    `
  },
  {
    id: "cloud-storage-types",
    track: "Fundamentals",
    domain: "Storage & Databases",
    title: "Object vs Block vs File Storage (S3 vs EBS vs EFS)",
    subtitle: "Choosing the Right Storage Medium for Web Apps, Databases, and Data Lakes",
    summary: "Deep dive into Amazon S3 (Object), Elastic Block Store (Block for OS/DB), and Elastic File System (NFS File sharing).",
    diagramType: "sharedResponsibility",
    readingTime: "10 min read",
    tags: ["S3", "EBS", "EFS", "Object Storage", "Block Storage", "Data Lake"],
    content: `
      <h3>1. The Three Primary Cloud Storage Types</h3>
      <table class="w-full text-xs text-slate-300 border border-slate-800 my-3">
        <thead class="bg-slate-900 text-sky-400">
          <tr><th class="p-2 text-left">Storage Type</th><th class="p-2 text-left">AWS / Azure Equivalent</th><th class="p-2 text-left">Access Method</th><th class="p-2 text-left">Best Use Case</th></tr>
        </thead>
        <tbody class="divide-y divide-slate-800">
          <tr>
            <td class="p-2 font-bold text-sky-300">Object Storage</td>
            <td class="p-2">Amazon S3 / Azure Blob Storage</td>
            <td class="p-2 font-mono">REST API (HTTP GET/PUT)</td>
            <td class="p-2">Static website hosting, backups, images, videos, big data lakes (Infinite scale)</td>
          </tr>
          <tr>
            <td class="p-2 font-bold text-amber-300">Block Storage</td>
            <td class="p-2">Amazon EBS / Azure Managed Disks</td>
            <td class="p-2 font-mono">Fibre Channel / NVMe (OS Disk)</td>
            <td class="p-2">Boot drives for Virtual Machines, relational databases requiring low-latency IOPS</td>
          </tr>
          <tr>
            <td class="p-2 font-bold text-emerald-300">File Storage</td>
            <td class="p-2">Amazon EFS / Azure Files</td>
            <td class="p-2 font-mono">NFS v4 / SMB Network Mount</td>
            <td class="p-2">Shared folders mounted concurrently across thousands of Linux/Windows servers</td>
          </tr>
        </tbody>
      </table>

      <h3 class="mt-4">2. Amazon S3 Storage Classes & Cost Optimization</h3>
      <p class="text-xs text-slate-300">S3 is designed for <strong>99.999999999% (11 9's)</strong> of data durability:</p>
      <ul class="list-disc pl-5 space-y-1 text-xs text-slate-400 my-2">
        <li><strong>S3 Standard:</strong> High throughput, low latency for active data accessed frequently ($0.023/GB).</li>
        <li><strong>S3 Intelligent-Tiering:</strong> Automatically moves data between frequent and infrequent tiers based on access patterns with zero retrieval fees!</li>
        <li><strong>S3 Standard-Infrequent Access (IA):</strong> For data accessed less frequently but requiring immediate millisecond retrieval. Cheaper storage, small per-GB retrieval fee.</li>
        <li><strong>S3 Glacier Flexible / Deep Archive:</strong> Extremely low cost ($0.00099/GB) for compliance records and archival where retrieval can take minutes or hours.</li>
      </ul>
    `
  },
  {
    id: "cloud-networking-vpc",
    track: "Fundamentals",
    domain: "Networking",
    title: "Virtual Private Cloud (VPC) & Cloud Subnetting",
    subtitle: "Public Subnets, Private Subnets, Route Tables, and NAT Gateways",
    summary: "Architecting private, logically isolated software-defined networks in the cloud.",
    diagramType: "vpcTrafficFlow",
    readingTime: "12 min read",
    tags: ["VPC", "Subnets", "Internet Gateway", "NAT Gateway", "Route Table", "CIDR"],
    content: `
      <h3>1. What is a Virtual Private Cloud (VPC)?</h3>
      <p>A VPC (or Azure Virtual Network - VNet) is your private, isolated virtual data center inside the cloud. You control the IP address space (CIDR block, e.g. <code>10.0.0.0/16</code>), create subnets, configure route tables, and configure network gateways.</p>

      <h3 class="mt-4">2. Public vs Private Subnets</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-3 text-xs">
        <div class="p-4 bg-slate-900 border border-slate-800 rounded-xl">
          <h4 class="text-sky-400 font-bold mb-1">Public Subnet</h4>
          <p class="text-slate-300 mb-2">Its Route Table has an explicit route pointing to an <strong>Internet Gateway (IGW)</strong> (<code>0.0.0.0/0 ➔ igw-xxxx</code>). Instances in this subnet have Public IPs and can receive direct traffic from the Internet (e.g. Load Balancers, Bastion Hosts).</p>
        </div>
        <div class="p-4 bg-slate-900 border border-slate-800 rounded-xl">
          <h4 class="text-purple-400 font-bold mb-1">Private Subnet</h4>
          <p class="text-slate-300 mb-2">Has NO direct route to an Internet Gateway. Instances have only private IP addresses. Outbound internet access (for software patches) is routed through a <strong>NAT Gateway</strong> in the public subnet. Inbound connections from the internet are impossible!</p>
        </div>
      </div>

      <h3 class="mt-6">3. Security Groups vs NACLs Quick Matrix</h3>
      <table class="w-full text-xs text-slate-300 border border-slate-800 my-2">
        <thead class="bg-slate-900 text-sky-400">
          <tr><th class="p-2 text-left">Property</th><th class="p-2 text-left">Security Group</th><th class="p-2 text-left">Network ACL (NACL)</th></tr>
        </thead>
        <tbody class="divide-y divide-slate-800">
          <tr><td class="p-2 font-bold">Scope</td><td class="p-2">Instance / Virtual NIC level</td><td class="p-2">Subnet level boundary</td></tr>
          <tr><td class="p-2 font-bold">Statefulness</td><td class="p-2 font-bold text-emerald-400">Stateful (Return traffic auto-allowed)</td><td class="p-2 font-bold text-red-400">Stateless (Must allow return traffic explicitly)</td></tr>
          <tr><td class="p-2 font-bold">Rules</td><td class="p-2">ALLOW rules only</td><td class="p-2">ALLOW and explicit DENY rules</td></tr>
          <tr><td class="p-2 font-bold">Rule Processing</td><td class="p-2">All rules evaluated concurrently</td><td class="p-2">Evaluated in numerical order (lowest first)</td></tr>
        </tbody>
      </table>
    `
  }
];
