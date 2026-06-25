export const PROJECTS = [
  {
    n: '01', name: 'Multi-Agent AI Research Automation', kind: 'AGENTS',
    problem: 'A manual, 4-step research process was slow, repetitive, and inconsistent from run to run.',
    system: 'A 4-agent autonomous pipeline (Search → Read → Write → Critique) with scored reports and a 5-page Streamlit UI featuring a downloadable session library.',
    highlights: [
      '4 chained agents — Search → Read → Write → Critique — built with LangChain LCEL',
      'Live web search via Tavily; reasoning and drafting on Groq-hosted Llama 3.1',
      'A Critique agent scores every report before it is returned',
      'Shipped as a 5-page Streamlit app with a downloadable session library'
    ],
    shows: 'multi-agent orchestration · LCEL composition · tool use · LLM routing · app delivery',
    impact: '~80% faster research-to-insight',
    stack: ['LangChain LCEL', 'Groq Llama 3.1', 'Tavily', 'Streamlit']
  },
  {
    n: '02', name: 'Autonomous AI Shopping Agent', kind: 'AGENTS',
    problem: 'Turning a shopper request into a solid recommendation took human reasoning across many queries.',
    system: 'A LangChain ReAct agent with custom database tools and multi-model switching (Gemini, Qwen), running 5–7 step reasoning chains with structured recommendations.',
    highlights: [
      'ReAct loop runs 5–7 reasoning and tool-call steps per task',
      'Custom database tools query real product data — no hallucinated options',
      'Multi-model switching between Gemini and Qwen, chosen per step',
      '50+ test queries handled with zero human handoff'
    ],
    shows: 'ReAct agent design · tool / function calling · multi-model integration · autonomous reasoning',
    impact: '50+ test queries · zero human handoff',
    stack: ['LangChain ReAct', 'Gemini', 'Qwen', 'Custom DB tools']
  },
  {
    n: '03', name: 'RAG Based Document Search', kind: 'RAG',
    problem: 'Answering questions across PDFs and web pages — with trustworthy citations — was slow and error-prone.',
    system: 'End-to-end Retrieval-Augmented Generation with document chunking, vector retrieval, and semantic search; deployed a Streamlit interface for real-time querying with source-cited responses.',
    highlights: [
      'End-to-end pipeline orchestrated with LangGraph + LangChain',
      'Documents chunked and embedded into a vector store',
      'Semantic retrieval across both PDFs and web pages',
      'Streamlit UI answers in real time with a source citation per reply'
    ],
    shows: 'RAG architecture · chunking · vector search · grounded generation · citation',
    impact: 'real-time, source-cited retrieval',
    stack: ['LangGraph', 'LangChain', 'Vector search', 'Streamlit']
  },
  {
    n: '04', name: 'FOMC Q&A Extraction & LLM Fine-Tuning', kind: 'FINE-TUNE',
    problem: 'No domain-specific dataset existed for Federal Reserve policy language — a true cold start.',
    system: 'A custom extraction pipeline created 1,098 Q&A pairs from 40 Fed transcripts; fine-tuned GPT-2 with supervised fine-tuning and evaluated generalization (aligned with CPT/SFT workflows).',
    highlights: [
      'Built the dataset from scratch: 1,098 Q&A pairs from 40 Fed transcripts',
      'Supervised fine-tuning of GPT-2 on policy-language text',
      'Evaluated generalization, not just training loss',
      'Mirrors real CPT/SFT foundation-model workflows'
    ],
    shows: 'dataset curation · supervised fine-tuning · evaluation · domain adaptation',
    impact: '1,098 Q&A pairs · 40 transcripts',
    stack: ['GPT-2', 'SFT', 'Python', 'Custom pipeline']
  },
  {
    n: '05', name: 'U.S. Retail Sales Time-Series Forecasting', kind: 'FORECAST',
    problem: 'Long-horizon revenue planning needed a retail forecast more accurate than classical baselines.',
    system: 'An LSTM pipeline on 33 years of FRED retail data with stationarity validation and trend capture; outperformed XGBoost, SARIMA, and Prophet, delivering a 24-month forecast.',
    highlights: [
      'LSTM pipeline over 33 years of FRED retail-sales data',
      'Stationarity validation and trend capture before modeling',
      'Benchmarked against XGBoost, SARIMA and Prophet',
      'Beat every baseline at 4.49% error; 24-month forecast'
    ],
    shows: 'time-series modeling · deep learning · statistical validation · benchmarking',
    impact: '4.49% error · 24-month forecast',
    stack: ['LSTM', 'XGBoost', 'SARIMA', 'Prophet', 'FRED']
  },
  {
    n: '06', name: 'Market Regime Detection', kind: 'MODELING',
    problem: 'Spotting when the market shifts behavior needed models robust across long, noisy horizons.',
    system: 'Hidden Markov Model and Gaussian Mixture Model pipelines classified regimes across 15 years of S&P 500 data, validated through statistical testing and backtested on 2025 data.',
    highlights: [
      'HMM and GMM pipelines to classify market regimes',
      '15 years of S&P 500 data analyzed',
      'Regimes validated through statistical testing',
      'Backtested on 2025 data for out-of-sample robustness'
    ],
    shows: 'probabilistic modeling · unsupervised learning · statistical testing · backtesting',
    impact: '15 yrs S&P 500 · backtested 2025',
    stack: ['HMM', 'GMM', 'Statistical testing', 'Python']
  },
  {
    n: '07', name: 'Leaf AI — Plant Disease Detection', kind: 'VISION', context: 'Indus University · Jan–May 2024',
    problem: 'Farmers needed a fast, accessible way to catch leaf diseases early in Apple, Tomato and Potato crops before they spread.',
    system: 'Built a web app to capture or upload a leaf image and get an instant diagnosis, powered by machine-learning image-classification models trained on diseased vs. healthy leaves.',
    highlights: [
      'Image-classification models for Apple, Tomato and Potato leaves',
      'Web app: snap or upload a leaf photo for an instant diagnosis',
      'Detects diseases like Early Blight and Late Blight',
      '97% detection accuracy, built for real agricultural use'
    ],
    shows: 'computer vision · image classification · web app development · applied ML',
    impact: '97% accuracy on Early & Late Blight',
    stack: ['Machine Learning', 'Image Classification', 'Web App', 'Python']
  },
  {
    n: '08', name: 'Early Ocular Disease Diagnosis', kind: 'VISION', context: 'Indus University · Jul–Nov 2023',
    problem: 'Eye diseases are hard to catch early, delaying care — clinicians needed a model that flags disease from medical images at an early stage.',
    system: 'Led development of a VGG-16 deep-learning classifier on a curated dataset of medical imaging and patient records, with iterative data management and model optimization.',
    highlights: [
      'VGG-16 deep-learning classifier for early ocular disease',
      'Curated dataset of medical imaging plus patient records',
      'Iterated on data management and model optimization',
      '89% accuracy on early-stage detection'
    ],
    shows: 'deep learning (CNN / VGG-16) · medical imaging · dataset curation · model optimization',
    impact: '89% accuracy in early-stage detection',
    stack: ['VGG-16', 'Deep Learning', 'Medical Imaging', 'CNN', 'Python']
  }
]
