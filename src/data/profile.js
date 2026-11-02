// All site content lives here. Wrap a word in *asterisks* to highlight it in a heading.

export const person = {
  name: 'Ritik Naik',
  eyebrow: 'Software Engineer · ML Researcher · MS CS @ Texas A&M',
  openTo: 'Open to SWE · AI · Quant roles',
  // Typed one after another under the name; each follows the word "I".
  typed: [
    'turn trades into insights.',
    'build backends that scale.',
    'decode brain signals with LLMs.',
    'make LLM serving faster.',
    'read markets in time series.',
    'paint when the code compiles.',
  ],
  bio: 'MS CS student at Texas A&M. Previously a Software Engineer in Investment Banking Technology at Wells Fargo, where I led a greenfield microservices platform. I work at the intersection of systems and AI, from serving multimodal LLMs faster to decoding brain signals into images and text.',
  photo: 'images/about/portrait-side.png',
  email: 'ritiknaik23@gmail.com',
  resume: 'https://drive.google.com/file/d/1Y1lYofOmeROaP95eS2S-nsU86VOHdcdf/view?usp=sharing',
  // `icon` picks an icon from SocialLinks.jsx.
  socials: [
    { label: 'Email', icon: 'mail', href: 'mailto:ritiknaik23@gmail.com' },
    { label: 'LinkedIn', icon: 'linkedin', href: 'https://www.linkedin.com/in/ritik-naik-a207551b2/' },
    { label: 'GitHub', icon: 'github', href: 'https://github.com/ritiknaik' },
  ],
};

export const ticker = [
  { k: 'PAPERS', v: '2', up: true },
  { k: 'YEARS OF EXPERIENCE', v: '3', up: true },
  { k: 'B.TECH CGPA', v: '9.08' },
  { k: 'LLM INFERENCE', v: 'PREFILL → DECODE' },
  { k: 'EEG → IMAGE', v: 'ML RESEARCH' },
  { k: 'MS CS', v: 'TEXAS A&M' },
  { k: 'CHESS', v: '♞' },
  { k: 'PAINTINGS', v: '7', up: true },
  { k: 'OPEN TO', v: 'SWE · ML · QUANT' },
];

// Order matters: drives the scroll story, the hero signal line and the project filters.
export const lenses = [
  {
    key: 'swe',
    name: 'Software Engineering',
    short: 'SWE',
    title: 'Building things that *ship*.',
    text: 'Three years at Wells Fargo in market surveillance. Took a greenfield application from pitch to production by owning the system design, the code and the data pipelines underneath.',
    proof: [
      ['Tech lead of a 6-engineer greenfield platform', 'Wells Fargo'],
      ['Quarterly → bi-weekly releases, zero downtime', 'Harness · OpenShift'],
      ['Fault-tolerant workflows with retries & DLQs', 'Kafka'],
    ],
  },
  {
    key: 'ai',
    name: 'AI / ML Research',
    short: 'AI/ML',
    title: 'Decoding the *brain*.',
    text: 'Published research on reconstructing what people imagine from EEG, and on generating language from fMRI with large language models.',
    proof: [
      ['MindCeive, built on CNN-BiGRU + GANs', 'Elsevier BSPC'],
      ['Decoding EEG Signals to Generate Images', 'CRC Press'],
      ['Narratives fMRI-to-text with LLaMA3', 'PyTorch · CLIP'],
    ],
  },
  {
    key: 'quant',
    name: 'Quant & Markets',
    short: 'Quant',
    title: 'Close to the *markets*.',
    text: 'Market surveillance on FX and fixed-income derivatives (swaps, options, forwards), where correctness and latency both matter. I enjoy the maths behind it, especially time series, signals and risk.',
    proof: [
      ['15M+ market records a day from 30+ sources', 'OneTick · Postgres'],
      ['End-to-end pipeline latency cut by 40%', 'Python · Pandas'],
      ['Live trade-signal platform, 15+ indicators', 'React · Flask'],
    ],
  },
  {
    key: 'systems',
    name: 'Systems',
    short: 'Systems',
    title: 'Down to the *metal*.',
    text: 'I like knowing how things work underneath, from threads and sockets to GPUs and where the compute actually goes when a model serves a token.',
    proof: [
      ['Prefill–decode disaggregation, LLaMA3-8B on 2 GPUs', 'PyTorch'],
      ['MRThread, a threading library in C', 'one-one · many-one'],
      ['BlueHawk, an HTTP/1.1 server on raw sockets', 'Python'],
    ],
  },
  {
    key: 'design',
    name: 'Design & Art',
    short: 'Design',
    title: 'Craft that *reads* well.',
    text: 'Painter, sketch artist and former design coordinator. Clarity is a feature, and I care about interfaces that explain themselves.',
    proof: [
      ['Design Coordinator, Impressions COEP', '2020–22'],
      ['Paintings shown in college art exhibitions', 'acrylic · sketch'],
      ['This site, designed & built from scratch', '2026'],
    ],
  },
];

// Each job lists its highlights per application; wrap a key number in *asterisks* to highlight it.
// Leave `groups` empty to show a placeholder.
export const experience = [
  {
    role: 'Software Engineer · Technical Lead',
    org: 'Wells Fargo · Investment Banking, Capital Markets Technology',
    type: 'Full time · Hyderabad',
    dates: '08/2023 — 08/2026',
    groups: [
      {
        label: 'Critical Data Elements (CDE)',
        points: [
          'Led a team of *six engineers* architecting a greenfield microservices platform in Agile sprints; pitched features to business stakeholders and presented the design to the business’s Chief Architect.',
          'Built it with Java, Spring Boot, Kafka and React + TypeScript using agentic AI coding tools with MCP servers, while reviewing AI-generated code and owning Git, code reviews and JUnit / Jest tests.',
          'Designed *20+ REST APIs* and a cross-system database schema with strict validation, standardised error handling and audit triggers, reaching *~100% audit coverage*.',
        ],
      },
      {
        label: 'Market Surveillance',
        points: [
          'Engineered a Python / Pandas ETL pipeline on OneTick (time-series) and PostgreSQL, validating *15M+ records a day* from *30+ sources* of FX and fixed-income derivatives data.',
          'Cut end-to-end pipeline latency by *40%* and manual data-quality investigation by *36%*.',
        ],
      },
    ],
    tags: ['Java', 'Spring Boot', 'Kafka', 'React', 'TypeScript', 'OpenShift', 'Harness CI/CD', 'Python', 'Pandas', 'OneTick', 'PostgreSQL'],
  },
  {
    role: 'Intern Analyst',
    org: 'Wells Fargo · Capital Markets',
    type: 'Internship · Bengaluru',
    dates: '05/2022 — 07/2022',
    groups: [
      {
        points: [
          'Built a real-time trading suggestion platform in React that visualises live market data and algorithmic trade signals.',
          'Wrote the Flask backend computing *15+ technical indicators* (MACD, RSI, Bollinger Bands).',
        ],
      },
    ],
    tags: ['React', 'Python', 'Flask', 'Technical analysis'],
  },
];

// `text` shows on the card; `details` fills the modal that opens when the card is clicked.
// `art` picks a custom illustration from ProjectArt.jsx; papers use an `image` instead.
export const projects = [
  {
    title: 'MindCeive: Perceiving human imagination',
    text: 'Novel CNN-BiGRU architecture with a new GAN to visualise imagined real-world objects from EEG.',
    image: 'images/projects/bspc.png',
    lenses: ['ai'],
    stack: 'PyTorch · GANs',
    paper: 'Biomedical Signal Processing and Control · Elsevier · 2025',
    link: { label: 'Paper', href: 'https://www.sciencedirect.com/science/article/pii/S1746809424011686' },
    details: {
      kind: 'Journal paper',
      authors: 'Ritik Naik, Kunal Chaudhari, Ketaki Jadhav, Amit Joshi',
      summary: 'Can we see what someone is imagining? MindCeive records EEG while a person imagines real-world objects, encodes those signals with a new CNN + Bi-GRU network, and uses a GAN to generate an image of the object they had in mind.',
      highlights: [
        'A hybrid encoder where CNN layers capture spatial patterns across EEG electrodes and a bidirectional GRU captures how they evolve over time',
        'A new GAN architecture conditioned on the learned EEG embedding generates the imagined object',
        'Extends the earlier digit / character work to real-world object categories',
      ],
      tags: ['CNN-BiGRU', 'GANs', 'EEG', 'Neuroscience', 'PyTorch'],
      links: [
        { label: 'Read the paper', href: 'https://www.sciencedirect.com/science/article/pii/S1746809424011686' },
        { label: 'DOI 10.1016/j.bspc.2024.107110', href: 'https://doi.org/10.1016/j.bspc.2024.107110' },
      ],
    },
  },
  {
    title: 'Decoding EEG Signals to Generate Images',
    text: 'Self-designed encoder and GAN pipeline that reconstructs imagined digits and characters.',
    image: 'images/projects/tnf1.png',
    lenses: ['ai'],
    stack: 'TensorFlow · GANs',
    paper: 'Book chapter · CRC Press, Taylor & Francis',
    link: { label: 'Paper', href: 'https://www.taylorfrancis.com/chapters/edit/10.1201/9781003363361-11/decoding-eeg-signals-generate-images-using-gans-ritik-naik-kunal-chaudhari-ketaki-jadhav-amit-joshi?context=ubx' },
    details: {
      kind: 'Book chapter',
      authors: 'Ritik Naik, Kunal Chaudhari, Ketaki Jadhav, Amit Joshi',
      summary: 'The first step of the research line. Given EEG recorded while a person imagines a digit or a character, the model reconstructs an image of it with a self-designed pipeline of an EEG encoder, CNNs and a GAN.',
      highlights: [
        'Encoder turns raw multi-channel EEG into a compact latent representation',
        'GAN generator decodes that latent into an image of the imagined digit or character',
        'Multi-modal learning across brain signals and images',
      ],
      tags: ['GANs', 'Encoders', 'EEG', 'Multi-modal', 'TensorFlow'],
      links: [
        { label: 'Read the chapter', href: 'https://www.taylorfrancis.com/chapters/edit/10.1201/9781003363361-11/decoding-eeg-signals-generate-images-using-gans-ritik-naik-kunal-chaudhari-ketaki-jadhav-amit-joshi?context=ubx' },
        { label: 'DOI 10.1201/9781003363361-11', href: 'https://doi.org/10.1201/9781003363361-11' },
      ],
    },
  },
  {
    title: 'Prefill–Decode Disaggregation',
    text: 'Splits LLaMA3-8B prefill and decode phases across two GPUs to study LLM serving trade-offs.',
    art: 'prefill',
    lenses: ['systems', 'ai'],
    stack: 'PyTorch · LLM serving',
    link: { label: 'GitHub', href: 'https://github.com/ritiknaik/Prefill-Decode-Disaggregation' },
    details: {
      kind: 'Systems prototype',
      summary: 'A prototype and benchmark of prefill–decode disaggregation, the technique behind serving systems like DistServe. Instead of encoding the prompt and generating tokens on one GPU stream, the two phases run as independent workers so they can overlap.',
      highlights: [
        'Compares a monolithic model.generate() against split prefill / decode workers connected by multiprocessing queues',
        'Measures DistServe-style metrics, TTFT (time to first token) and TPOT (time per output token), identically in both modes',
        '10 prompt workloads covering every light / heavy prefill × decode combination, from Q&A to long-document generation',
        'Compares TTFT, TPOT and decode tokens per second side by side',
      ],
      tags: ['LLaMA3-8B', 'PyTorch', 'Transformers', 'Multi-GPU', 'LLM serving'],
      links: [{ label: 'View on GitHub', href: 'https://github.com/ritiknaik/Prefill-Decode-Disaggregation' }],
    },
  },
  {
    title: 'Narratives fMRI-to-Text',
    text: "Aligns fMRI volumes with text in CLIP's latent space and decodes them with LLaMA3.",
    art: 'narratives',
    lenses: ['ai'],
    stack: 'PyTorch · CLIP · LLaMA3',
    link: { label: 'GitHub', href: 'https://github.com/ritiknaik/Narratives-fMRI-to-Text' },
    details: {
      kind: 'Research code · 2024',
      summary: 'Turns brain activity recorded while people listen to stories into text. fMRI volumes from the "Narratives" dataset are paired with word-level timings, projected into a shared embedding space with text, and decoded into language by LLaMA3.',
      highlights: [
        'fMRI → embedding networks (plain and spatial variants) trained with a symmetric CLIP-style contrastive loss',
        'Word-aligned training pairs built from the dataset’s fMRI volumes and TextGrid transcripts, with corrupted scans filtered out',
        'LLaMA3 used as the language decoder on top of the aligned embeddings',
      ],
      tags: ['fMRI', 'CLIP', 'Contrastive learning', 'LLaMA3', 'PyTorch'],
      links: [{ label: 'View on GitHub', href: 'https://github.com/ritiknaik/Narratives-fMRI-to-Text' }],
    },
  },
  {
    title: 'Greenfield Microservices Platform',
    art: 'greenfield',
    text: 'Led system design, development and pitch for a new application in Investment Banking Technology, and owned its code repository.',
    lenses: ['swe', 'quant'],
    stack: 'Microservices · Kafka · OpenShift',
    link: { label: 'Internal' },
    details: {
      kind: 'Wells Fargo · 2023–26',
      summary: 'Technical lead for a greenfield microservices application in Investment Banking Technology, from the initial pitch and system design through development and ownership of the code repository.',
      highlights: [
        'Led a team of six engineers, pitched features to stakeholders and presented the design to the Chief Architect',
        'Multi-stage workflow state machine decoupled over Kafka, with retry and dead-letter-queue strategies',
        'OAuth2 / OIDC authentication via PingFederate with role-based access control',
        'Harness CI/CD to OpenShift with zero-downtime rollouts, taking releases from quarterly to bi-weekly',
      ],
      tags: ['Microservices', 'Kafka', 'OpenShift', 'OAuth2 / OIDC', 'Harness'],
      note: 'Internal project. Code and further details are confidential.',
    },
  },
  {
    title: 'This Portfolio',
    art: 'portfolio',
    text: 'Single-page portfolio in React with day and night themes, hand-drawn SVG graphics and a market mini-game.',
    lenses: ['swe', 'design'],
    stack: 'Vite · React · SVG',
    link: { label: 'GitHub', href: 'https://github.com/ritiknaik/portfolio' },
    details: {
      kind: 'Personal project · 2026',
      summary: 'This very site. A rebuild of an older multi-page portfolio into one fast, static page with no backend, designed and drawn by hand and deployed to both GitHub Pages and Netlify from the same build.',
      highlights: [
        'Vite and React with plain CSS custom properties, so the day and night themes are a single attribute swap',
        'Every project cover and lens scene is a hand-written SVG coloured with theme tokens, so each one works in both themes',
        'Scroll-driven navigation with an IntersectionObserver scrollspy, reveal animations and a sticky browser-tab card',
        'Beat the Market mini-game with 12 simulated market scenarios, from bull runs to flash crashes',
        'All content lives in one data file, and a GitHub Actions workflow builds and deploys on every push',
      ],
      tags: ['React', 'Vite', 'SVG', 'CSS', 'GitHub Actions', 'Responsive design'],
      links: [
        { label: 'View on GitHub', href: 'https://github.com/ritiknaik/portfolio' },
        { label: 'Live site', href: 'https://ritiknaik.github.io/portfolio/' },
      ],
    },
  },
  {
    title: 'MRThread',
    text: 'Multithreading library in C with one-one and many-one implementations.',
    art: 'mrthread',
    lenses: ['systems'],
    stack: 'C · OS',
    link: { label: 'GitHub', href: 'https://github.com/ritiknaik/MRThread' },
    details: {
      kind: 'Operating Systems course project',
      summary: 'A userland multithreading library written from scratch in C on top of system calls, exposing a pthreads-like API.',
      highlights: [
        'Two threading models chosen at compile time, one-one (each user thread on a kernel thread) and many-one (user threads scheduled onto a single kernel thread)',
        'Include mrthread.h and compile against either implementation',
        'Automated test script covering every thread function plus sample applications',
      ],
      tags: ['C', 'System calls', 'Scheduling', 'Concurrency'],
      links: [{ label: 'View on GitHub', href: 'https://github.com/ritiknaik/MRThread' }],
    },
  },
  {
    title: 'BlueHawk HTTP Server',
    text: 'HTTP/1.1-compliant multithreaded web server supporting GET, POST, PUT, DELETE and HEAD.',
    art: 'bluehawk',
    lenses: ['systems', 'swe'],
    stack: 'Python · Sockets',
    link: { label: 'GitHub', href: 'https://github.com/ritiknaik/BlueHawk' },
    details: {
      kind: 'Computer Networks course project · 2021',
      summary: 'An HTTP/1.1 web server built on raw sockets, following RFC 2616.',
      highlights: [
        'Implements GET, POST, PUT, DELETE and HEAD with proper status codes and conditional headers',
        'Multithreaded, serving parallel connections up to a configurable limit',
        'Configurable document root, port, timeout, max connections and keep-alive',
        'Automated test suite compares expected vs. received responses, including concurrent requests',
      ],
      tags: ['Python', 'Sockets', 'HTTP/1.1', 'RFC 2616', 'Multithreading'],
      links: [{ label: 'View on GitHub', href: 'https://github.com/ritiknaik/BlueHawk' }],
    },
  },
  {
    title: 'Emotion Recognition',
    text: 'Transfer learning with ResNet50 and MobileNet on the AffectNet dataset.',
    art: 'emotion',
    lenses: ['ai'],
    stack: 'TensorFlow',
    link: { label: 'Notebook', href: 'https://github.com/ritiknaik/Deep-Learning/blob/main/Emotion_Recognition.ipynb' },
    details: {
      kind: 'Deep learning notebook',
      summary: 'Facial emotion recognition trained on AffectNet using transfer learning from ImageNet-pretrained backbones.',
      highlights: [
        'Fine-tuned ResNet50 and MobileNet and compared the two',
        'Built in TensorFlow / Keras as a Jupyter notebook',
      ],
      tags: ['TensorFlow', 'Transfer learning', 'ResNet50', 'MobileNet', 'Computer vision'],
      links: [{ label: 'Open notebook', href: 'https://github.com/ritiknaik/Deep-Learning/blob/main/Emotion_Recognition.ipynb' }],
    },
  },
  {
    title: 'Samvad',
    text: 'Blockchain-ledger messaging dApp with a secure platform and profile customisation.',
    art: 'samvad',
    lenses: ['swe'],
    stack: 'Solidity · React · Web3.js',
    link: { label: 'GitHub', href: 'https://github.com/ritiknaik/Samvad' },
    details: {
      kind: 'Software Engineering course project',
      summary: 'A decentralised, web-based messaging application where messages live on a blockchain ledger instead of a central server.',
      highlights: [
        'Smart contracts in Solidity, managed with Truffle',
        'React front end talking to the chain through Web3.js',
        'Users sign in with a MetaMask wallet and can customise their profile',
      ],
      tags: ['Solidity', 'React', 'Web3.js', 'Truffle', 'MetaMask'],
      links: [{ label: 'View on GitHub', href: 'https://github.com/ritiknaik/Samvad' }],
    },
  },
  {
    title: 'Coditor',
    text: 'Terminal text editor in C with search, undo and syntax highlighting.',
    art: 'coditor',
    lenses: ['systems'],
    stack: 'C · termios',
    link: { label: 'GitHub', href: 'https://github.com/ritiknaik/Coditor' },
    details: {
      kind: 'Data Structures & Algorithms course project',
      summary: 'A terminal text editor written in C that talks to the terminal directly in raw mode.',
      highlights: [
        'Syntax highlighting for C, Java, JavaScript and Python',
        'Incremental search and a stack-based undo',
        'Raw terminal handling with termios, with no curses and no other dependencies',
      ],
      tags: ['C', 'termios', 'Data structures', 'Terminal'],
      links: [{ label: 'View on GitHub', href: 'https://github.com/ritiknaik/Coditor' }],
    },
  },
  {
    title: 'Impressions COEP',
    art: 'impressions',
    text: 'Posters, brochures, T-shirts and videos for the annual cultural festival of College of Engineering, Pune.',
    lenses: ['design'],
    stack: 'Photoshop · Illustration',
    link: { label: 'Instagram', href: 'https://www.instagram.com/impressions_coep/' },
    details: {
      kind: 'Design Coordinator · 2020–22',
      summary: 'Impressions is the annual cultural festival of College of Engineering, Pune, with music, acting, dance and more. The design team is its public face.',
      highlights: [
        'Designed posters, brochures, T-shirts and videos for the festival',
        'Coordinated the design team’s visual identity across events',
      ],
      tags: ['Photoshop', 'Branding', 'Illustration', 'Video'],
      links: [{ label: 'See the work on Instagram', href: 'https://www.instagram.com/impressions_coep/' }],
    },
  },
];

// `color` is a theme colour token used for the group heading.
export const skills = [
  { color: 'systems', title: 'Languages', items: [['C', 'cnew2.png'], ['C++', 'cppnew.png'], ['Java', 'java.png'], ['Python', 'python.png'], ['JavaScript', 'js.png'], ['TypeScript', 'typescript.png'], ['Solidity', 'solidity_pro.png']] },
  { color: 'swe', title: 'SWE frameworks & tools', items: [['Spring Boot', 'spring_boot.png'], ['React', 'react.png'], ['Node.js', 'nodejs.png'], ['Flask', 'flasknew.png'], ['Kafka', 'Kafka.png'], ['Git', 'git.png'], ['Linux', 'linux.png']] },
  { color: 'ai', title: 'AI / ML', items: [['PyTorch', 'PyTorch.png'], ['TensorFlow', 'tf1.png'], ['scikit-learn', 'scikit-learn.svg'], ['SciPy', 'scipy.svg'], ['Hugging Face', 'huggingface.svg'], ['LangChain', 'langchain.png'], ['Claude', 'claude.svg']] },
  { color: 'quant', title: 'Databases', items: [['PostgreSQL', 'postgres.svg'], ['MySQL', 'mysql.png'], ['MongoDB', 'mongo-db.png'], ['OneTick (time-series)', 'time-series-db.svg']] },
  { color: 'cloud', title: 'Cloud & DevOps', items: [['AWS', 'aws.svg'], ['GCP', 'gcp.png'], ['Azure', 'azure.png'], ['Red Hat OpenShift', 'openshift.png'], ['Docker', 'docker.png'], ['Kubernetes', 'kubernetes.png'], ['Jenkins', 'jenkins.png']] },
  { color: 'design', title: 'Design', items: [['Photoshop', 'photoshop1.png'], ['Illustrator', 'illustrator.svg'], ['Canva', 'canva.svg'], ['HTML', 'html.png'], ['CSS', 'css.png']] },
];

// `badge` is the highlighted result shown next to each entry.
export const education = [
  { dates: '2026 — present', title: 'MS, Computer Science', place: 'Texas A&M University, College Station', badge: 'In progress' },
  { dates: '2019 — 2023', title: 'B.Tech, Computer Engineering', place: 'College of Engineering, Pune', note: 'Honours in Data Science', badge: 'CGPA 9.08' },
  { dates: '2017 — 2019', title: 'Junior College (Science)', place: 'Pace Junior Science College', badge: '91.38%' },
];

export const leadership = [
  { dates: '2022 — 2023', title: 'Secretary', place: 'DSAI Club, COEP', note: 'Ran research-driven events, expert talks and inter-college competitions' },
  { dates: '2021 — 2022', title: 'ML & Python Head', place: 'ASCI, COEP', note: 'Led ML / DL projects and industry sessions' },
  { dates: '2020 — 2022', title: 'Design Coordinator', place: 'Impressions, COEP', note: 'Posters, brochures, merch and video for the cultural fest' },
];

export const art = [
  { file: 'Krishna', title: 'Krishna' },
  { file: 'SunsetGarden', title: 'Sunset Flower Garden' },
  { file: 'Lake', title: 'Lake View' },
  { file: 'BeachView', title: 'Beach View' },
  { file: 'KrishnaMoon', title: 'Night Island' },
  { file: 'House', title: 'Riverside Home' },
  { file: 'PineFlower', title: 'Pine Flower' },
  { file: 'Chess1', title: 'Chess game · 1', href: 'https://www.chess.com/live/game/107843637428' },
  { file: 'Chess2', title: 'Chess game · 2', href: 'https://www.chess.com/live/game/107515763654' },
];

export const sections = [
  { id: 'skills', label: 'Skills' },
  { id: 'work', label: 'Work' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'projects', label: 'Projects' },
  { id: 'art', label: 'Art' },
  { id: 'contact', label: 'Contact' },
];
