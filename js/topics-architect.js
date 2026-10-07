/**
 * CloudVisual Pro - Solutions Architect Curriculum (AWS SAA-C03 / Azure AZ-305)
 * Enterprise Architecture, High Availability, Event-Driven Systems, DR, and IaC
 */

const CLOUD_ARCHITECT_TOPICS = [
  {
    id: "arch-ha-multiaz",
    track: "Architect",
    domain: "Resilient Architectures",
    title: "Designing Highly Available & Fault-Tolerant Multi-AZ Systems",
    subtitle: "Combining Application Load Balancers, Auto-Scaling Groups, and Multi-AZ Databases",
    summary: "Architect enterprise applications that survive entire data center outages with zero human intervention and automated failover.",
    diagramType: "threeTierCloud",
    readingTime: "13 min read",
    tags: ["High Availability", "Multi-AZ", "ALB", "Auto-Scaling", "RDS", "Fault Tolerance"],
    content: `
      <h3>1. The Anatomy of a High Availability Cloud Architecture</h3>
      <p>True high availability requires removing all <strong>Single Points of Failure (SPOF)</strong> across every tier of the stack:</p>

      <div class="space-y-3 text-xs sm:text-sm text-slate-300 my-4">
        <div class="p-3 bg-slate-900 rounded-lg border border-sky-500/30">
          <strong class="text-sky-300 block mb-1">Tier 1: Load Balancer (ALB)</strong>
          Deploys automatically across at least two Availability Zones. Performs continuous HTTP health checks on backend web servers. If an entire AZ catches fire, the ALB routes 100% of incoming requests to healthy instances in remaining AZs within seconds.
        </div>
        <div class="p-3 bg-slate-900 rounded-lg border border-purple-500/30">
          <strong class="text-purple-300 block mb-1">Tier 2: Stateless Application Tier (Auto Scaling Group)</strong>
          Compute instances should remain <strong>stateless</strong> (no session files stored on local disks; sessions are persisted in Redis/ElastiCache or DynamoDB). The Auto Scaling Group dynamically terminates unhealthy VMs and provisions fresh replacement instances automatically.
        </div>
        <div class="p-3 bg-slate-900 rounded-lg border border-emerald-500/30">
          <strong class="text-emerald-300 block mb-1">Tier 3: Database Tier (Multi-AZ RDS / Aurora)</strong>
          The primary database synchronously replicates every write transaction to a standby database in a separate AZ. If the primary hardware crashes, AWS automatically flips the DNS CNAME to the standby replica within 60–120 seconds with <strong>zero data loss</strong>!
        </div>
      </div>

      <h3 class="mt-4">2. Horizontal vs Vertical Scaling</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3 my-2 text-xs">
        <div class="p-3 bg-slate-900 border border-slate-800 rounded">
          <strong class="text-amber-400">Vertical Scaling (Scale Up):</strong> Increasing the CPU/RAM of a single instance (e.g. from <code>t3.medium</code> to <code>m5.24xlarge</code>). Has a hard physical ceiling and causes downtime during reboot.
        </div>
        <div class="p-3 bg-slate-900 border border-slate-800 rounded">
          <strong class="text-emerald-400">Horizontal Scaling (Scale Out):</strong> Adding more identical instances behind a load balancer (from 2 instances to 50 instances). Infinite scalability and zero downtime!
        </div>
      </div>
    `
  },
  {
    id: "arch-decoupled-events",
    track: "Architect",
    domain: "Event-Driven & Decoupling",
    title: "Decoupling Microservices with Asynchronous Messaging",
    subtitle: "Amazon SQS, SNS, and EventBridge Architecture",
    summary: "Prevent cascading failures and handle traffic spikes gracefully by inserting message queues and pub/sub topics between microservices.",
    diagramType: "serverlessMicroservice",
    readingTime: "12 min read",
    tags: ["Decoupling", "SQS", "SNS", "EventBridge", "Microservices", "Queues"],
    content: `
      <h3>1. Why Tightly Coupled Architectures Fail</h3>
      <p>If Service A calls Service B synchronously via HTTP, and Service B suddenly slows down or crashes under heavy load, Service A's connection pools exhaust and Service A crashes too! This causes a catastrophic <strong>cascading failure</strong> across the entire company.</p>

      <h3 class="mt-4">2. SQS vs SNS vs EventBridge</h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-3 my-3 text-xs">
        <div class="p-4 bg-slate-900 border border-slate-800 rounded-xl">
          <strong class="text-sky-400 block mb-1">Amazon SQS (Queue - Pull Model)</strong>
          <p class="text-slate-300">Point-to-point. One producer puts a message in the queue; one worker pulls and processes it. Messages persist until processed or expired. Absorbs massive traffic spikes seamlessly.</p>
        </div>
        <div class="p-4 bg-slate-900 border border-slate-800 rounded-xl">
          <strong class="text-purple-400 block mb-1">Amazon SNS (Pub/Sub - Push Model)</strong>
          <p class="text-slate-300">Fan-out architecture. One event published to an SNS topic is pushed instantly to hundreds of subscribers (email, SMS, HTTP webhooks, multiple SQS queues simultaneously).</p>
        </div>
        <div class="p-4 bg-slate-900 border border-slate-800 rounded-xl">
          <strong class="text-emerald-400 block mb-1">Amazon EventBridge (Event Bus)</strong>
          <p class="text-slate-300">Advanced enterprise event bus with content-based routing rules, schema registries, and direct native integration with 3rd-party SaaS platforms (Shopify, Zendesk, Datadog).</p>
        </div>
      </div>

      <h3 class="mt-4">3. The Fan-Out Pattern with SQS & SNS</h3>
      <p class="text-xs text-slate-300">When an e-commerce order is placed, publishing to a single SNS Topic fans out the event into 3 separate SQS queues: (1) Payment Processing Queue, (2) Warehouse Shipping Queue, (3) Customer Email Receipt Queue. If the shipping service goes down for maintenance, payment and email continue running smoothly!</p>
    `
  },
  {
    id: "arch-disaster-recovery",
    track: "Architect",
    domain: "Disaster Recovery",
    title: "Enterprise Disaster Recovery (DR) Strategies",
    subtitle: "Balancing Cost against RTO (Recovery Time) and RPO (Recovery Point)",
    summary: "From simple S3 backup/restore to Pilot Light, Warm Standby, and Multi-Region Active/Active cross-continent failover.",
    diagramType: "disasterRecovery",
    readingTime: "11 min read",
    tags: ["Disaster Recovery", "RTO", "RPO", "Pilot Light", "Warm Standby", "Active-Active"],
    content: `
      <h3>1. Defining RTO and RPO</h3>
      <ul class="list-disc pl-6 space-y-1 text-xs sm:text-sm text-slate-300 my-2">
        <li><strong>RTO (Recovery Time Objective):</strong> How long can your company afford for the application to be down? (Downtime clock starts when outage occurs).</li>
        <li><strong>RPO (Recovery Point Objective):</strong> How much data is acceptable to lose? (Measured in time between the disaster and the latest reliable backup).</li>
      </ul>

      <h3 class="mt-4">2. The 4 Cloud DR Strategies Compared</h3>
      <div class="space-y-2 text-xs text-slate-300 my-3">
        <div class="p-3 bg-slate-900 rounded border border-emerald-500/40">
          <strong class="text-emerald-300">1. Backup and Restore (Lowest Cost):</strong>
          Nightly database snapshots and backups stored in cross-region S3 buckets. In a disaster, you spin up all infrastructure from scratch using Terraform/CloudFormation. RTO/RPO: 24+ Hours.
        </div>
        <div class="p-3 bg-slate-900 rounded border border-sky-500/40">
          <strong class="text-sky-300">2. Pilot Light:</strong>
          Only the critical data core (database) is kept running in the secondary region with continuous live replication. Web/App servers are kept off (as AMIs/templates). In disaster, Auto-Scaling powers on the app servers. RTO: Tens of minutes.
        </div>
        <div class="p-3 bg-slate-900 rounded border border-amber-500/40">
          <strong class="text-amber-300">3. Warm Standby:</strong>
          A scaled-down version of your full production environment is running 24/7 in the secondary region (e.g. 2 small instances instead of 20 large instances). In disaster, Route 53 switches traffic and instances scale up to full capacity. RTO: Seconds/Minutes.
        </div>
        <div class="p-3 bg-slate-900 rounded border border-red-500/40">
          <strong class="text-red-300">4. Multi-Site Active/Active (Zero Downtime, Highest Cost):</strong>
          Full production environments running in 2 or more global regions simultaneously handling live customer traffic. Route 53 latency routing or AWS Global Accelerator distributes users. Zero downtime RTO and near-zero RPO!
        </div>
      </div>
    `
  },
  {
    id: "arch-iac-terraform",
    track: "Architect",
    domain: "Automation & IaC",
    title: "Infrastructure as Code (IaC): Terraform & CloudFormation",
    subtitle: "Declarative Cloud Provisioning, State Management, and CI/CD Automation",
    summary: "Codify cloud architecture into version-controlled files, eliminating human errors and ensuring reproducible infrastructure.",
    diagramType: "sharedResponsibility",
    readingTime: "10 min read",
    tags: ["Terraform", "IaC", "CloudFormation", "Automation", "DevOps"],
    content: `
      <h3>1. Why Infrastructure as Code (IaC)?</h3>
      <p>Manually clicking around the AWS or Azure web console (known as 'ClickOps') leads to undocumented configuration drift, security oversights, and slow disaster recovery. IaC treats your infrastructure like software code:</p>

      <ul class="list-disc pl-6 space-y-1 text-xs text-slate-300 my-2">
        <li><strong>Version Control:</strong> Store entire cloud architectures in Git repositories. Track every change via pull requests.</li>
        <li><strong>Repeatability:</strong> Spin up identical Development, Staging, and Production environments in minutes.</li>
        <li><strong>Self-Healing & Drift Detection:</strong> Tools like Terraform detect if someone manually tampered with a firewall rule and automatically correct it back to the declared state.</li>
      </ul>

      <h3 class="mt-4">2. Sample Declarative Terraform Snippet (HCL)</h3>
      <div class="cloud-terminal p-4 my-3 text-xs overflow-x-auto">
        <p class="cli-comment"># Define a secure, encrypted S3 Bucket in Terraform</p>
        <p><span class="cli-keyword">resource</span> <span class="cli-highlight">"aws_s3_bucket"</span> <span class="cli-output">"secure_data"</span> {</p>
        <p>  bucket = <span class="cli-output">"suaaz-enterprise-audit-logs"</span></p>
        <p>}</p>
        <p class="cli-keyword">resource</span> <span class="cli-highlight">"aws_s3_bucket_server_side_encryption_configuration"</span> <span class="cli-output">"s3_kms"</span> {</p>
        <p>  bucket = aws_s3_bucket.secure_data.id</p>
        <p>  rule {</p>
        <p>    apply_server_side_encryption_by_default {</p>
        <p>      sse_algorithm = <span class="cli-output">"aws:kms"</span></p>
        <p>    }</p>
        <p>  }</p>
        <p>}</p>
      </div>
    `
  }
];
