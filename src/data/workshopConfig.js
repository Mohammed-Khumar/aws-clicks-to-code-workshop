/**
 * Central Configuration Layer for AWS SBG × MHSSCE Workshop Microsite
 * "AWS FROM CLICKS TO CODE"
 *
 * All event-specific parameters, links, and text are defined here to ensure
 * no hardcoded event data is scattered across components.
 */

export const workshopConfig = {
  // Brand & Chapter Identity
  organization: {
    brandmarkText: "AWS SBG",
    chapter: "MHSSCE",
    fullName: "AWS Student Builder Group at M. H. Saboo Siddik College of Engineering",
    parentWebsiteUrl: "https://awssbg-mhssce.in/",
    email: "awssbg@mhssce.ac.in",
    programEmblem: "/assets/program-icon.png",
    brandmarkLogo: "/assets/brandmark.png",
    socials: {
      linkedin: "https://www.linkedin.com/company/aws-sbg-mhssce/",
      instagram: "https://www.instagram.com/awssbg_mhssce/"
    }
  },

  // Workshop Metadata
  event: {
    title: "AWS FROM CLICKS TO CODE",
    tagline: "See the Cloud. Build It. Access It. Automate It.",
    topic: "Automating EC2: From Manual Clicks to Automated Infrastructure",
    date: "24 September 2026",
    time: "10:00 AM – 12:30 PM", // Configurable timing slot
    venue: "Seminar Hall, MHSSCE Campus", // Configurable venue name
    venueAddress: "M. H. Saboo Siddik College of Engineering, 8 Saboo Siddik Polytechnic Rd, Byculla, Mumbai 400008",
    
    // Meetup RSVP URL — Centralized configuration variable
    // Can be updated with the live Meetup event link when published
    meetupUrl: "https://www.meetup.com/aws-sbg-mhssce/events/",
    primaryCtaLabel: "RSVP ON MEETUP",
    calendarReminderUrl: "https://awssbg-mhssce.in/events"
  },

  // Speaker Details (Preserves supplied information without fabricated credentials)
  speaker: {
    title: "YOUR GUIDE",
    name: "AFREEN BANU",
    role: "Chief Guest · Speaker · Guide",
    image: "/assets/afreen_bano.jpg",
    bio: [
      "Technology leader with extensive experience spanning AWS Cloud, DevSecOps, engineering leadership, and high-performing technical teams.",
      "Lead at HerTechEra – Pune Chapter, dedicated to fostering inclusive technology communities and hands-on learning.",
      "Guiding students through the complete cloud infrastructure journey: bridging the gap between manual AWS console provisioning and automated Infrastructure as Code."
    ]
  },

  // Section 2: The Hook
  hook: {
    largeStatementLine1: "YOU’RE NOT HERE TO WATCH.",
    largeStatementLine2: "YOU’RE HERE TO BUILD.",
    subtext: "An end-to-end technical workshop taking you from your very first compute instance to automated infrastructure.",
    journeyPillars: [
      { step: "IDEA", label: "Cloud Fundamentals", desc: "Understand on-demand virtualization & cloud architecture" },
      { step: "SERVER", label: "Amazon EC2", desc: "Launch and configure compute capacity in the AWS Console" },
      { step: "LIVE WEB PAGE", label: "Apache Web Server", desc: "Deploy httpd and expose a customized live webpage" },
      { step: "REUSABLE CODE", label: "AWS CloudFormation", desc: "Codify manual steps into declarative Infrastructure as Code" }
    ]
  },

  // Section 3: The 5-Step Cloud Journey
  journeySteps: [
    {
      step: "01",
      title: "UNDERSTAND",
      subtitle: "Cloud Computing + AWS",
      summary: "What the cloud changes and how on-demand infrastructure works.",
      description: "Understand the shift from physical data centers to elastic, on-demand compute capacity. Explore AWS core primitives and connect conceptual foundations directly to what we build.",
      visualType: "cloud",
      tag: "Foundations",
      badgeText: "01 → Cloud"
    },
    {
      step: "02",
      title: "PROVISION",
      subtitle: "Launch Amazon EC2 manually",
      summary: "See the core choices involved in creating compute infrastructure.",
      description: "Navigate the AWS Management Console to launch an Amazon Elastic Compute Cloud (EC2) virtual server. Examine AMI selections, instance sizing, security groups, and subnet placements.",
      visualType: "ec2",
      tag: "Compute",
      badgeText: "02 → Server / EC2"
    },
    {
      step: "03",
      title: "CONNECT",
      subtitle: "AWS Systems Manager Session Manager",
      summary: "Access EC2 without using the traditional SSH login path.",
      description: "Bypass traditional SSH key pairs, bastions, and open inbound port 22. Establish a zero-trust, browser-based secure shell terminal governed directly by AWS IAM policies.",
      visualType: "terminal",
      tag: "Secure Access",
      badgeText: "03 → Secure Terminal"
    },
    {
      step: "04",
      title: "MAKE IT REAL",
      subtitle: "Apache + customized webpage",
      summary: "Turn a running server into something visible in the browser.",
      description: "Execute commands inside Linux to install Apache HTTP Server, activate the daemon, style a custom index.html webpage, and verify live public web delivery from the browser.",
      visualType: "browser",
      tag: "Deployment",
      badgeText: "04 → Browser / Web Page"
    },
    {
      step: "05",
      title: "AUTOMATE",
      subtitle: "AWS CloudFormation + Infrastructure as Code",
      summary: "Create similar EC2 infrastructure from a template instead of repeating console clicks.",
      description: "The pivotal architectural transformation: codify compute, networking, and user-data bootstrapping into a declarative YAML CloudFormation template for automated, repeatable deployments.",
      visualType: "code",
      tag: "Automation",
      badgeText: "05 → Code / Template"
    }
  ],

  // Section 4: Manual vs Automated
  comparison: {
    tagline: "THE ARCHITECTURAL SHIFT",
    title: "From Clicks to Code",
    centerDividerText: "FROM CLICKS → TO CODE",
    manual: {
      title: "MANUAL",
      badge: "AWS Console Clicks",
      description: "Prone to configuration drift, difficult to audit, and requires repetitive effort for every environment.",
      steps: [
        { label: "Console", desc: "Log in to AWS Management Console" },
        { label: "Click", desc: "Click through EC2 launch wizard screens" },
        { label: "Configure", desc: "Manually set AMIs, subnets & security groups" },
        { label: "Launch", desc: "Wait for provisioning & manually verify" },
        { label: "Repeat", desc: "Repeat every single manual step from scratch" }
      ]
    },
    automated: {
      title: "AUTOMATED",
      badge: "Infrastructure as Code",
      description: "Version-controlled, deterministic, auditable, and deploys production compute in seconds.",
      steps: [
        { label: "CloudFormation Template", desc: "Define compute, IAM & bootstrapping as YAML" },
        { label: "Provision", desc: "Execute stack deployment with single action" },
        { label: "Repeat Consistently", desc: "Replicate across any region or environment identically" }
      ]
    }
  },

  // Section 5: Terminal / Code Experience
  terminalSequence: [
    { command: "$ aws ec2 run-instances --image-id ami-0c55b159cbfafe1f0 --instance-type t2.micro", delay: 1000 },
    { output: "> instance starting: i-08ab34f9ec2workshop [pending]", delay: 1400 },
    { command: "$ aws ssm start-session --target i-08ab34f9ec2workshop", delay: 1000 },
    { output: "> connecting securely via AWS Systems Manager Session Manager...", delay: 1400 },
    { output: "> authenticated via AWS IAM (no port 22 required)", delay: 1000 },
    { command: "sh-5.2$ sudo yum install -y httpd && sudo systemctl start httpd", delay: 1200 },
    { output: "> installing apache httpd package...", delay: 1200 },
    { output: "> starting web server daemon...", delay: 1000 },
    { command: "sh-5.2$ echo '<h1>AWS FROM CLICKS TO CODE - EC2 Live</h1>' > /var/www/html/index.html", delay: 1000 },
    { success: "✓ web server is live at http://13.233.94.102:80" }
  ],

  cloudFormationSnippet: `AWSTemplateFormatVersion: '2010-09-09'
Description: 'Automating EC2 Workshop - Production Web Server Stack'

Parameters:
  InstanceType:
    Type: String
    Default: t2.micro
    AllowedValues: [t2.micro, t3.micro]
    Description: EC2 compute instance size

Resources:
  EC2WebServerInstance:
    Type: AWS::EC2::Instance
    Properties:
      InstanceType: !Ref InstanceType
      ImageId: ami-0c55b159cbfafe1f0 # Amazon Linux 2023
      IamInstanceProfile: !Ref SSMAccessInstanceProfile
      SecurityGroupIds:
        - !Ref WebServerSecurityGroup
      UserData:
        Fn::Base64: !Sub |
          #!/bin/bash
          yum update -y
          yum install -y httpd
          systemctl start httpd
          systemctl enable httpd
          echo "<h1>AWS FROM CLICKS TO CODE</h1><p>Automated EC2 via CloudFormation</p>" > /var/www/html/index.html

Outputs:
  InstancePublicIP:
    Description: Public IP of the automated EC2 web server
    Value: !GetAtt EC2WebServerInstance.PublicIp`,

  // Section 6: Technology Stack
  techStack: [
    {
      name: "AWS Global Cloud",
      category: "Cloud Foundation",
      role: "Global regions, availability zones, and elastic infrastructure backbone.",
      icon: "Cloud"
    },
    {
      name: "Amazon EC2",
      category: "Compute Engine",
      role: "Secure, resizable compute capacity in the cloud.",
      icon: "Server"
    },
    {
      name: "AWS Systems Manager",
      category: "Secure Session Manager",
      role: "Keyless, IAM-audited direct browser access without SSH keys or open port 22.",
      icon: "ShieldCheck"
    },
    {
      name: "Apache HTTP Server",
      category: "Web Delivery",
      role: "Production open-source Linux web server hosting live customized HTML pages.",
      icon: "Globe"
    },
    {
      name: "AWS CloudFormation",
      category: "Infrastructure as Code",
      role: "Declarative modeling and automated provisioning of complete AWS resource stacks.",
      icon: "FileCode2"
    }
  ],

  // Section 8: What You'll Walk Away With
  takeaways: [
    {
      title: "Cloud Computing Fundamentals",
      desc: "Clear mental model of on-demand cloud infrastructure, virtualization, and how AWS delivers scalable IT resources.",
      stage: "Stage 01"
    },
    {
      title: "Amazon EC2 Provisioning",
      desc: "Hands-on experience launching and configuring Linux compute instances through the AWS Management Console.",
      stage: "Stage 02"
    },
    {
      title: "Secure Session Manager Access",
      desc: "Modern zero-trust instance connectivity using AWS Systems Manager, removing the vulnerability of open port 22.",
      stage: "Stage 03"
    },
    {
      title: "Live Apache Web Hosting",
      desc: "Installing and running Apache httpd on Linux, building a custom webpage, and exposing live browser traffic.",
      stage: "Stage 04"
    },
    {
      title: "AWS CloudFormation Mastery",
      desc: "Writing declarative YAML templates to model, provision, and replicate cloud infrastructure consistently.",
      stage: "Stage 05"
    },
    {
      title: "Infrastructure as Code Mindset",
      desc: "The critical engineering leap from repetitive console clicks to version-controlled, production-grade automation.",
      stage: "Synthesis"
    }
  ],

  // Section 9: Before You Arrive Checklist
  checklist: [
    {
      id: "arrive-early",
      title: "ARRIVE EARLY",
      instruction: "Arrive 30 minutes before the workshop to complete registration and check-in.",
      badge: "Registration"
    },
    {
      id: "bring-laptop",
      title: "BRING YOUR LAPTOP",
      instruction: "This is a hands-on experience. Bring your own laptop, charger, and modern web browser.",
      badge: "Hands-On"
    },
    {
      id: "rsvp-meetup",
      title: "CONFIRM MEETUP RSVP",
      instruction: "Workshop registration is strictly managed through Meetup. Ensure your RSVP status is confirmed.",
      badge: "Essential"
    },
    {
      id: "aws-account",
      title: "AWS FREE TIER ACCOUNT",
      instruction: "Have an active AWS Free Tier account or verify access to follow along with console provisioning.",
      badge: "Prerequisite"
    }
  ],

  // Section 10: Final CTA
  finalCta: {
    eyebrow: "READY TO BUILD?",
    title: "FROM CLICKS TO CODE",
    date: "24 SEPTEMBER 2026",
    subtext: "Transition from manual clicks to automated cloud infrastructure. Reserve your seat on Meetup.",
    buttonText: "RSVP ON MEETUP"
  }
};
