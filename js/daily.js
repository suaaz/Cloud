/**
 * CloudVisual Pro - Daily Cloud Concept Engine & Certification Practice
 * Rotates daily based on calendar date with deep beginner-friendly context and analogies
 */

const DAILY_CATALOG = [
  {
    dayId: 1,
    dateHint: "Day 1",
    track: "Fundamentals",
    domain: "Cloud Concepts",
    title: "The Shared Responsibility Model: Who Protects What?",
    summary: "Today's spotlight explains why moving to AWS, Azure, or GCP doesn't mean the provider handles all your security. Master Security OF the cloud vs Security IN the cloud.",
    diagramType: "sharedResponsibility",
    takeaway: "The cloud provider protects the physical facilities, hardware, and hypervisor (Security OF the cloud). You are 100% responsible for your data, encryption, and user access (Security IN the cloud).",
    commandOfDay: {
      command: "aws iam get-account-summary",
      syntax: "$ aws iam get-account-summary",
      description: "Audits your AWS account's identity posture: active users, groups, roles, and MFA adoption.",
      sampleOutput: `{
  "SummaryMap": {
    "Users": 14,
    "Groups": 3,
    "Roles": 28,
    "MFADevices": 14,
    "AccountMFAEnabled": 1
  }
}`
    },
    quiz: {
      question: "Under the AWS Shared Responsibility Model, which of the following is strictly the CUSTOMER'S responsibility for an EC2 virtual machine?",
      options: [
        "A) Replacing broken physical RAM and power supplies",
        "B) Installing OS security patches and configuring the guest firewall",
        "C) Securing the physical data center perimeter with biometric locks",
        "D) Maintaining the KVM hypervisor software"
      ],
      correctIndex: 1,
      explanation: "In an IaaS service like EC2, the customer is responsible for the operating system, including applying security patches, antivirus software, and firewall configuration."
    },
    deepContext: {
      analogyTitle: "Think of the Shared Responsibility Model like Renting an Apartment 🏢",
      analogy: `Imagine you rent an apartment in a modern high-rise building.
      
• The **Building Landlord (The Cloud Provider - AWS/Azure/GCP)** is responsible for the building's structural foundation, the roof, the elevators, the water pipes in the walls, and the physical security guards stationed at the front lobby doors.
• You, the **Tenant (The Customer)**, are responsible for locking your own apartment front door, putting valuables in a safe, and deciding who you invite inside.
If someone burglarizes your apartment because you left your front door wide open with the key in the lock, you cannot sue the landlord!
In the cloud, if you configure an S3 bucket or Azure Blob to be publicly accessible with no password, you left your apartment door wide open.`,
      whatIsIt: "The Shared Responsibility Model is the security boundary agreement between you and the cloud vendor that defines exactly where their security duties end and where your duties begin.",
      whyDoWeNeedIt: "Many companies mistakenly believe that moving to the cloud means they can fire their security team. The Shared Responsibility Model ensures both parties know their distinct duties so critical patches and firewalls are not ignored.",
      howItWorksStepByStep: [
        "1. The cloud provider protects all physical data centers, fiber cables, servers, and hypervisors.",
        "2. If you pick IaaS (VMs), you must install OS patches, configure firewalls, and manage user passwords.",
        "3. If you pick PaaS (Serverless / Managed DBs), the provider manages OS patching, and you only manage your application code.",
        "4. In all models (IaaS, PaaS, SaaS), YOU always own and protect your customer data and user permissions."
      ],
      jargonGlossary: [
        { term: "IaaS (Infrastructure as a Service)", def: "Renting raw virtual machines and disks where you manage the OS." },
        { term: "PaaS (Platform as a Service)", def: "Deploying application code where the cloud provider manages the underlying servers and runtime." },
        { term: "SaaS (Software as a Service)", def: "Using complete online software (like Microsoft 365 or Gmail) managed 100% by the vendor." }
      ],
      whatHappensIfWrong: "Failing to understand this model is the #1 cause of major cloud data breaches worldwide: companies deploy unpatched virtual machines or leave database ports open to the public Internet, assuming the cloud provider would automatically block them."
    }
  },
  {
    dayId: 2,
    dateHint: "Day 2",
    track: "Fundamentals",
    domain: "Storage & Databases",
    title: "Amazon S3 Storage Classes & Intelligent-Tiering",
    summary: "How to store petabytes of data affordably by automatically shifting files between instant-access and deep-archive storage tiers without code changes.",
    diagramType: "sharedResponsibility",
    takeaway: "S3 Intelligent-Tiering automatically moves objects between frequent, infrequent, and archive access tiers based on real-time usage, with zero retrieval fees or performance impact.",
    commandOfDay: {
      command: "aws s3 ls s3://my-bucket --recursive --human-readable --summarize",
      syntax: "$ aws s3 ls s3://my-data-lake --summarize",
      description: "Quickly calculates total storage size and object count across an S3 bucket.",
      sampleOutput: `2026-10-07 10:14:22   4.2 MiB reports/q3-summary.pdf
2026-10-07 11:02:18 128.5 GiB raw-logs/analytics-export.parquet
Total Objects: 41295
Total Size: 842.1 GiB`
    },
    quiz: {
      question: "Which Amazon S3 storage class is ideal for compliance archives that are rarely accessed and can tolerate a retrieval time of several hours at the lowest cost?",
      options: [
        "A) S3 Standard",
        "B) S3 Express One Zone",
        "C) S3 Glacier Deep Archive",
        "D) S3 Standard-Infrequent Access"
      ],
      correctIndex: 2,
      explanation: "S3 Glacier Deep Archive offers the lowest cost storage in AWS ($0.00099 per GB/month) for data retained for 7–10+ years for compliance."
    },
    deepContext: {
      analogyTitle: "Think of S3 Storage Classes like Wardrobe vs Attic vs Off-Site Storage Locker 📦",
      analogy: `Imagine all the clothes and items you own:
• The clothes you wear everyday belong in your **Bedroom Closet (S3 Standard)**. You can grab them in 2 seconds, but bedroom closet space is the most expensive square footage in your house.
• Winter coats and ski boots you only touch once a year go in the **Attic (S3 Infrequent Access)**. Slightly harder to get down, but frees up bedroom closet space.
• Old tax receipts and childhood yearbooks from 15 years ago belong in a **Cardboard Box in an Off-Site Storage Locker across town (S3 Glacier Deep Archive)**. It takes 5 hours to drive there and unlock the padlock, but it costs pennies to store.
S3 Intelligent-Tiering is like an automated robot that watches what clothes you wear and silently moves unused items into the attic for you!`,
      whatIsIt: "Amazon S3 is object storage with infinite scale. Storage classes let you choose how much you pay per gigabyte based on how quickly and how frequently you need to retrieve files.",
      whyDoWeNeedIt: "Companies store terabytes of log files and backups that they rarely look at. Paying high S3 Standard prices ($23/TB/month) for unused old data wastes tens of thousands of dollars. Archiving to Glacier drops that bill to $1/TB/month!",
      howItWorksStepByStep: [
        "1. You upload files to Amazon S3 via API or web console.",
        "2. If you enable Intelligent-Tiering, AWS monitors access timestamps on each file.",
        "3. After 30 days without anyone reading a file, it drops to the Infrequent Access tier (saving ~40%).",
        "4. After 90 days, it automatically drops to the Archive tier (saving ~70%).",
        "5. The moment a user requests the file again, it instantly moves back to Frequent tier with zero delay!"
      ],
      jargonGlossary: [
        { term: "Object Storage", def: "Storage designed for static files (images, videos, documents) accessed over HTTP APIs rather than an OS file system." },
        { term: "11 9's Durability (99.999999999%)", def: "The statistical guarantee that if you store 10,000,000 files in S3, you can expect to lose an average of only one file every 10,000 years." },
        { term: "Lifecycle Policy", def: "Automated rules you define to delete or move old files after a set number of days." }
      ],
      whatHappensIfWrong: "Storing raw database dumps in S3 Standard without lifecycle rules leads to 'Cloud Bill Shock', where companies unknowingly pay thousands of dollars every month for old backups that nobody has accessed in five years."
    }
  },
  {
    dayId: 3,
    dateHint: "Day 3",
    track: "Fundamentals",
    domain: "Networking",
    title: "Security Groups vs NACLs: Stateful vs Stateless Filtering",
    summary: "Demystifying the two distinct layers of cloud firewall protection inside your Virtual Private Cloud.",
    diagramType: "vpcTrafficFlow",
    takeaway: "Security Groups operate at the virtual instance level and are STATEFUL (return traffic is automatically allowed). NACLs operate at the subnet level and are STATELESS (you must explicitly permit ephemeral return ports).",
    commandOfDay: {
      command: "aws ec2 describe-security-groups --group-ids sg-0123456789abcdef0",
      syntax: "$ aws ec2 describe-security-groups",
      description: "Inspects inbound and outbound firewall rules applied to an instance.",
      sampleOutput: `{
  "SecurityGroups": [{
    "GroupName": "web-tier-sg",
    "IpPermissions": [{
      "IpProtocol": "tcp",
      "FromPort": 443,
      "ToPort": 443,
      "IpRanges": [{"CidrIp": "0.0.0.0/0"}]
    }]
  }]
}`
    },
    quiz: {
      question: "If a web client connects to your EC2 web server on Port 443, and the Security Group allows inbound Port 443, why does return traffic flow back to the client even if the outbound rule is empty?",
      options: [
        "A) Because Port 443 is an open port by default on all AWS accounts",
        "B) Because Security Groups are STATEFUL and remember established connections",
        "C) Because the Internet Gateway automatically overrides Security Groups",
        "D) Because NACLs handle the return traffic"
      ],
      correctIndex: 1,
      explanation: "Security Groups are stateful. When traffic is permitted inbound, the Security Group automatically allows the return response traffic regardless of outbound rules."
    },
    deepContext: {
      analogyTitle: "Think of Security Groups like a Smart Bouncer vs an Airport Metal Detector 🛡️",
      analogy: `Imagine entering an exclusive private rooftop restaurant:
• The **Security Group** is a **Smart Bouncer with a Great Memory (Stateful)**. If the bouncer lets you inside the restaurant, the bouncer automatically remembers your face and lets you walk back out to your car without stopping you or asking for your ID again.
• The **Network ACL (NACL)** is an **Airport Metal Detector (Stateless)**. The metal detector has zero memory. It scans you when you walk forward, and if you turn around and walk backward through it 3 seconds later, it scans you from scratch as if it has never seen you before in its life!`,
      whatIsIt: "Security Groups and Network ACLs are the two firewall layers that shield your virtual machines in a cloud VPC.",
      whyDoWeNeedIt: "Defense-in-depth. If a developer accidentally opens a Security Group port by mistake, the subnet NACL can act as a second guardrail blocking unauthorized IP ranges.",
      howItWorksStepByStep: [
        "1. Traffic from the Internet hits the Subnet boundary and is inspected by the Network ACL.",
        "2. The NACL checks rules in numerical order (100, 200, 300). If permitted, traffic enters the subnet.",
        "3. Traffic reaches the VM's virtual network interface and is checked by the Security Group.",
        "4. If allowed by the Security Group, the VM processes the web request.",
        "5. The VM sends its response. Because Security Groups are stateful, return traffic exits instantly!",
        "6. Return traffic hits the NACL on the way out; the NACL must have an outbound rule permitting ephemeral ports (1024-65535)."
      ],
      jargonGlossary: [
        { term: "Stateful Firewall", def: "A firewall that tracks the state of active network connections and automatically permits response packets." },
        { term: "Stateless Firewall", def: "A firewall that treats every packet in isolation, requiring explicit rules for both incoming AND outgoing directions." },
        { term: "Ephemeral Ports", def: "Temporary client ports (usually 1024 to 65535) chosen randomly by your web browser to receive web server replies." }
      ],
      whatHappensIfWrong: "If a junior engineer creates a custom stateless NACL and forgets to add an outbound rule for Ephemeral Ports (1024-65535), web servers will receive requests from users but will be completely unable to send the responses back, making the website appear completely dead!"
    }
  },
  {
    dayId: 4,
    dateHint: "Day 4",
    track: "Architect",
    domain: "Event-Driven & Decoupling",
    title: "Decoupling Microservices with Amazon SQS & Lambda",
    summary: "How message queues buffer traffic spikes, prevent cascading failures, and ensure zero lost transactions during Black Friday surges.",
    diagramType: "serverlessMicroservice",
    takeaway: "Amazon SQS acts as a durable shock absorber between frontend APIs and backend worker services. Even if workers crash, messages remain safely queued up to 14 days.",
    commandOfDay: {
      command: "aws sqs get-queue-attributes --queue-url https://sqs.us-east-1.amazonaws.com/123456789012/OrderQueue --attribute-names All",
      syntax: "$ aws sqs get-queue-attributes --queue-url <url>",
      description: "Inspects queue depth, visible messages, and in-flight messages waiting for worker processing.",
      sampleOutput: `{
  "Attributes": {
    "ApproximateNumberOfMessages": "42",
    "VisibilityTimeout": "30",
    "MessageRetentionPeriod": "1209600"
  }
}`
    },
    quiz: {
      question: "What is the primary architectural benefit of placing an Amazon SQS queue between a frontend web tier and a backend payment processing tier?",
      options: [
        "A) It automatically encrypts the customer's credit card in hardware",
        "B) It decouples the tiers so payment spikes don't crash the web servers",
        "C) It converts HTTP requests into SQL database statements",
        "D) It eliminates the need for an Application Load Balancer"
      ],
      correctIndex: 1,
      explanation: "Queues decouple producer and consumer services. If backend payment processing slows down or receives a massive spike, messages accumulate safely in the queue without crashing the frontend."
    },
    deepContext: {
      analogyTitle: "Think of Amazon SQS like an Order Ticket Spike in a Fast Food Restaurant 🍔",
      analogy: `Imagine a busy burger restaurant during lunchtime rush:
• The **Cashiers (Frontend Web App)** take orders from customers and write each order on a small ticket slip.
• Instead of the cashier running into the kitchen, shouting in the cook's ear, and waiting for the burger to cook before helping the next customer, the cashier places the ticket on a **Rotating Ticket Spindle (Amazon SQS Queue)**.
• The **Kitchen Cooks (Backend Lambda / Worker VMs)** look at the spindle, pull the next ticket, cook the burger, and throw away the ticket.
If 500 customers walk in at once, the cashiers keep taking orders and pinning tickets to the spindle. The kitchen doesn't crash; they simply work through the tickets at a steady, reliable pace!`,
      whatIsIt: "Amazon SQS (Simple Queue Service) is a fully managed message queue that lets independent software services talk to each other asynchronously.",
      whyDoWeNeedIt: "In tightly coupled systems, if a backend database slows down by 3 seconds, all frontend web servers freeze and run out of memory. SQS buffers the traffic so frontend servers respond in milliseconds.",
      howItWorksStepByStep: [
        "1. Customer clicks 'Place Order'. The frontend puts a JSON message into SQS and returns 'Order Received!' in 20ms.",
        "2. The message sits safely on redundant AWS disks (persisted across multiple data centers).",
        "3. Backend worker functions (AWS Lambda) poll SQS, grab batches of 10 messages, and process credit cards.",
        "4. If a worker crashes mid-process, the message reappears on the queue (Visibility Timeout) for another worker to retry.",
        "5. If a poisoned message fails 5 times, it is sent to a **Dead-Letter Queue (DLQ)** for engineer inspection."
      ],
      jargonGlossary: [
        { term: "Asynchronous", def: "Operations where the sender does NOT wait for the receiver to finish before moving on to the next task." },
        { term: "Dead-Letter Queue (DLQ)", def: "A backup queue that catches failed or corrupted messages so they don't block the main pipeline." },
        { term: "Visibility Timeout", def: "The window of time (default 30s) a message is hidden from other workers while one worker is trying to process it." }
      ],
      whatHappensIfWrong: "Building microservices without queues means that a temporary 30-second network hiccup in your payment processor causes thousands of customer checkout screens to crash with HTTP 504 Gateway Timeouts, losing thousands in sales."
    }
  },
  {
    dayId: 5,
    dateHint: "Day 5",
    track: "Architect",
    domain: "Resilient Architectures",
    title: "Multi-AZ vs Multi-Region High Availability",
    summary: "When is Multi-AZ sufficient, and when must enterprise applications invest in expensive Multi-Region active replication?",
    diagramType: "threeTierCloud",
    takeaway: "Multi-AZ protects against local data center hardware failures, fires, or power grid cuts within a city (HA). Multi-Region protects against entire regional outages or geopolitical disasters (DR).",
    commandOfDay: {
      command: "aws rds describe-db-instances --query 'DBInstances[*].[DBInstanceIdentifier,MultiAZ,Status]'",
      syntax: "$ aws rds describe-db-instances",
      description: "Verifies whether your production databases have automated synchronous Multi-AZ standby replication enabled.",
      sampleOutput: `[
  ["prod-postgres-db", true, "available"],
  ["staging-mysql-db", false, "available"]
]`
    },
    quiz: {
      question: "Which of the following scenarios REQUIRES a Multi-Region architecture rather than a Multi-AZ architecture?",
      options: [
        "A) A physical fire in one data center building in Northern Virginia",
        "B) A fiber cut between two data centers within the same city",
        "C) Meeting strict data residency laws or surviving an entire continent-wide regional service disruption",
        "D) Replacing a failed EC2 virtual machine automatically"
      ],
      correctIndex: 2,
      explanation: "Multi-AZ survives data center level failures within a metropolitan area. Surviving a full regional disaster or routing users across continents for low latency requires Multi-Region."
    },
    deepContext: {
      analogyTitle: "Think of Multi-AZ vs Multi-Region like Two Branches Across Town vs Two Branches in Different Countries 🏙️",
      analogy: `Imagine your bank needs to ensure customer accounts never go offline:
• **Multi-AZ (Availability Zones)** is having your Main Branch on the North side of town and a Backup Branch on the South side of town. If the North side suffers a localized power blackout, the South side takes over in seconds because they are only 15 miles apart connected by high-speed fiber.
• **Multi-Region** is having a branch in **New York** and another branch in **London**. If an entire continent-wide telecom cable gets cut or severe geopolitical laws require European data to stay in Europe, London operates 100% independently from New York.
Multi-AZ gives you High Availability at low cost. Multi-Region gives you global scale and ultimate Disaster Recovery at higher cost.`,
      whatIsIt: "Multi-AZ deploys redundant infrastructure across separate data centers in one metropolitan area. Multi-Region deploys across entirely different continents or geographical territories.",
      whyDoWeNeedIt: "99% of businesses only need Multi-AZ. However, global mission-critical applications (like Netflix, airlines, or international banks) use Multi-Region so users in Europe and Asia get single-digit millisecond response times.",
      howItWorksStepByStep: [
        "1. Multi-AZ uses synchronous replication because latency between AZs is &lt;2ms.",
        "2. If an AZ fails, the load balancer and database failover automatically in ~60 seconds.",
        "3. Multi-Region uses asynchronous replication because light traveling across oceans takes 70–150ms.",
        "4. DNS services like Route 53 or Azure Traffic Manager route users to the geographically closest healthy region."
      ],
      jargonGlossary: [
        { term: "Synchronous Replication", def: "A write is only considered successful after it is written to BOTH databases at the exact same millisecond (zero data loss)." },
        { term: "Asynchronous Replication", def: "A write succeeds locally first, then syncs to the distant region a few hundred milliseconds later." },
        { term: "Replication Lag", def: "The brief delay between data being saved in Region 1 and appearing in Region 2." }
      ],
      whatHappensIfWrong: "Trying to do synchronous database writes across different global regions (e.g. New York to Tokyo) will introduce 150ms+ of lag on EVERY single user click, causing the application to feel intolerably sluggish."
    }
  },
  {
    dayId: 6,
    dateHint: "Day 6",
    track: "Fundamentals",
    domain: "Security & IAM",
    title: "IAM Roles vs IAM Users: The Principle of Least Privilege",
    summary: "Why hardcoding AWS Access Keys and passwords in source code is dangerous, and how temporary IAM Roles eliminate security leaks.",
    diagramType: "sharedResponsibility",
    takeaway: "Never embed long-term access keys in code or EC2 instances. Use IAM Roles with temporary STS credentials that rotate automatically every hour.",
    commandOfDay: {
      command: "aws sts get-caller-identity",
      syntax: "$ aws sts get-caller-identity",
      description: "Instantly prints who you currently are in AWS: Account ID, IAM User or Role ARN.",
      sampleOutput: `{
  "UserId": "AROA123456789EXAMPLE:ec2-app-role",
  "Account": "123456789012",
  "Arn": "arn:aws:sts::123456789012:assumed-role/ec2-app-role/i-0abcdef123"
}`
    },
    quiz: {
      question: "Which AWS Identity and Access Management (IAM) feature should an EC2 virtual machine use to securely access an Amazon S3 bucket without embedding credentials in code?",
      options: [
        "A) An IAM Root Account password",
        "B) An IAM Role attached via an Instance Profile",
        "C) Storing an Access Key ID in a plaintext config.json file",
        "D) A Security Group rule pointing to S3"
      ],
      correctIndex: 1,
      explanation: "IAM Roles provide temporary, automatically rotated security credentials via the AWS Security Token Service (STS) and should always be assigned to VMs and Lambda functions."
    },
    deepContext: {
      analogyTitle: "Think of IAM Roles like an Electronic Visitor RFID Badge vs a Permanent Metal Key 🪪",
      analogy: `Imagine an office building with a secure server room:
• An **IAM User with Access Keys** is like handing an employee a physical brass master key. If they lose that brass key in a coffee shop or accidentally post a photo of it on GitHub, anyone who finds it can copy the key and walk into your server room forever until you change all the locks!
• An **IAM Role** is like an electronic RFID badge programmed to expire in 1 hour.
When an EC2 server or Lambda function needs to read a database, it asks the guard for a temporary 60-minute badge. The badge expires automatically. Even if a hacker steals the badge, it becomes useless paper within minutes!`,
      whatIsIt: "IAM (Identity and Access Management) controls WHO is authenticated and WHAT they are authorized to do in your cloud account.",
      whyDoWeNeedIt: "Accidentally committing long-term AWS access keys to public GitHub repositories allows automated hacker bots to hijack cloud accounts within 60 seconds, spinning up thousands of cryptocurrency mining servers that rack up $50,000 bills overnight.",
      howItWorksStepByStep: [
        "1. You create an IAM Role with permission to read S3: `arn:aws:iam::aws:policy/AmazonS3ReadOnlyAccess`.",
        "2. You attach the Role to your EC2 instance or Lambda function.",
        "3. The AWS Instance Metadata Service (IMDSv2) delivers temporary credentials to the VM.",
        "4. AWS automatically rotates the secret access keys every hour behind the scenes with zero downtime."
      ],
      jargonGlossary: [
        { term: "Least Privilege", def: "The golden security rule: grant only the absolute minimum permissions needed to do the job, and nothing more." },
        { term: "IAM Policy", def: "A JSON document defining permissions (Effect: Allow, Action: s3:GetObject, Resource: arn:...)." },
        { term: "STS (Security Token Service)", def: "The AWS service that generates temporary, expiring security credentials." }
      ],
      whatHappensIfWrong: "Granting `AdministratorAccess` (`*:*`) to an application role means that if an attacker discovers a minor SQL injection flaw in your web app, they can delete your entire company's databases, backups, and user accounts."
    }
  },
  {
    dayId: 7,
    dateHint: "Day 7",
    track: "Architect",
    domain: "Disaster Recovery",
    title: "Disaster Recovery: Pilot Light vs Warm Standby",
    summary: "Architecting cloud DR topologies to balance real-time data recovery against idle cloud server costs.",
    diagramType: "disasterRecovery",
    takeaway: "Pilot Light keeps only the live database core running in the secondary region; Warm Standby keeps a scaled-down minimal copy of the entire application stack running 24/7.",
    commandOfDay: {
      command: "aws route53 list-health-checks",
      syntax: "$ aws route53 list-health-checks",
      description: "Monitors endpoint health checks used to trigger automated cross-region DNS failover.",
      sampleOutput: `{
  "HealthChecks": [{
    "Id": "hc-primary-region",
    "HealthCheckConfig": {
      "Type": "HTTPS",
      "FullyQualifiedDomainName": "primary.suaaz-cloud.io",
      "FailureThreshold": 3
    }
  }]
}`
    },
    quiz: {
      question: "In cloud Disaster Recovery, what is the key difference between 'Pilot Light' and 'Warm Standby'?",
      options: [
        "A) Pilot Light is more expensive than Warm Standby",
        "B) Warm Standby has a smaller scaled-down version of all services running, whereas Pilot Light only runs the core database",
        "C) Pilot Light only works on-premises, while Warm Standby is cloud-native",
        "D) Warm Standby does not require DNS routing"
      ],
      correctIndex: 1,
      explanation: "In Pilot Light, only the critical core (live database replica) is running. In Warm Standby, a scaled-down version of both the app servers and database are running live."
    },
    deepContext: {
      analogyTitle: "Think of Pilot Light like the Tiny Blue Flame on a Gas Heater 🔥",
      analogy: `Imagine a gas water heater in winter:
• A **Pilot Light** is that tiny, constant blue flame burning inside the furnace. It consumes very little gas, but it keeps the core system ready. When you turn on the hot water tap, the tiny flame instantly ignites the giant heating burners in 15 seconds.
In the cloud:
• The tiny blue flame is your **Live Replicated Database** running quietly in the secondary region.
• The giant heating burners are the hundreds of **Auto-Scaling Web Servers** that stay powered off until a disaster strikes, saving you thousands in idle compute costs!`,
      whatIsIt: "Pilot Light and Warm Standby are middle-tier Disaster Recovery strategies that let enterprises achieve minutes of RTO without paying double the cost of a full secondary data center.",
      whyDoWeNeedIt: "Full Active/Active multi-region architectures double your infrastructure bill. Pilot Light provides 95% of the disaster protection for only ~15% extra cost.",
      howItWorksStepByStep: [
        "1. Production runs normally in Primary Region A (e.g. US-East).",
        "2. Database transactions continuously replicate to Secondary Region B (e.g. US-West).",
        "3. Application VM templates and container images are pre-baked and ready in Region B.",
        "4. If Region A goes dark, DNS detects failed health checks.",
        "5. Auto-Scaling groups in Region B launch 50 compute instances in 4 minutes, connect to the ready database, and resume service."
      ],
      jargonGlossary: [
        { term: "RTO (Recovery Time Objective)", def: "The maximum acceptable duration of time an application can be down after a disaster." },
        { term: "RPO (Recovery Point Objective)", def: "The maximum acceptable time window of lost transactions (e.g. 5 minutes of data)." },
        { term: "Failover", def: "The automated or manual switching of traffic from a failed system to a standby system." }
      ],
      whatHappensIfWrong: "If a company never conducts quarterly DR fire drills, they often discover during a real disaster that their pre-baked VM images in the secondary region have expired software certificates, causing the failover to fail completely."
    }
  }
];

const DailyEngine = {
  /**
   * Get day index of the year (1 - 365)
   */
  getDayOfYear: function(date = new Date()) {
    const start = new Date(date.getFullYear(), 0, 0);
    const diff = (date - start) + ((start.getTimezoneOffset() - date.getTimezoneOffset()) * 60 * 1000);
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
  },

  /**
   * Get the featured concept for the selected date
   */
  getTodayConcept: function(customDate = new Date()) {
    const dayOfYear = this.getDayOfYear(customDate);
    const catalogIndex = (dayOfYear - 1) % DAILY_CATALOG.length;
    const entry = DAILY_CATALOG[catalogIndex];
    
    return {
      ...entry,
      currentDate: customDate.toLocaleDateString(undefined, { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      dayNumber: dayOfYear,
      totalCatalog: DAILY_CATALOG.length
    };
  }
};
