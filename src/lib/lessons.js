export const LESSONS = [
  // ── BEGINNER ──────────────────────────────────────────────────────────────
  {
    id: 'b1',
    level: 'beginner',
    title: 'What is a Memecoin?',
    emoji: '🐸',
    xp: 10,
    slides: [
      {
        type: 'info',
        heading: 'Memecoins are crypto tokens born from internet culture',
        body: 'Unlike Bitcoin or Ethereum, memecoins start as jokes or community vibes — think $DOGE, $PEPE, $WIF. Their value is driven by hype, not fundamentals.',
      },
      {
        type: 'info',
        heading: 'They move FAST',
        body: 'A memecoin can 100x in hours… and lose 99% just as quickly. This is high-risk, high-reward territory. Most traders lose money. The ones who win understand the game.',
      },
      {
        type: 'quiz',
        question: 'What primarily drives a memecoin\'s price?',
        options: ['Team & product roadmap', 'Hype, community & narrative', 'Revenue and profit', 'Central bank policy'],
        correct: 1,
        explanation: 'Memecoins are pure narrative plays. Community energy and social media hype are the fuel.',
      },
      {
        type: 'quiz',
        question: 'Which of these is a well-known memecoin?',
        options: ['Ethereum', 'Solana', 'PEPE', 'USDC'],
        correct: 2,
        explanation: '$PEPE is a memecoin based on the Pepe the Frog meme. ETH, SOL, and USDC are not memecoins.',
      },
    ],
  },
  {
    id: 'b2',
    level: 'beginner',
    title: 'How to Buy Your First Memecoin',
    emoji: '💸',
    xp: 10,
    slides: [
      {
        type: 'info',
        heading: 'Step 1: Get a wallet',
        body: 'For Solana memecoins use Phantom. For Ethereum/Base use MetaMask. These are browser/mobile wallets that hold your crypto.',
      },
      {
        type: 'info',
        heading: 'Step 2: Fund with SOL or ETH',
        body: 'Buy SOL or ETH on a CEX like Coinbase or Binance, then send it to your wallet address. Always keep a little extra for gas fees.',
      },
      {
        type: 'info',
        heading: 'Step 3: Use a DEX or trading terminal',
        body: 'Platforms like axiom.trade, Raydium (Solana) or Uniswap (ETH) let you swap SOL/ETH for any memecoin using its contract address (CA).',
      },
      {
        type: 'quiz',
        question: 'Which wallet is best for Solana memecoins?',
        options: ['MetaMask', 'Ledger', 'Phantom', 'Coinbase Wallet'],
        correct: 2,
        explanation: 'Phantom is the go-to wallet for Solana. MetaMask is for Ethereum/EVM chains.',
      },
      {
        type: 'quiz',
        question: 'What do you need to buy a memecoin on a DEX?',
        options: ['A bank account', 'The token\'s contract address (CA)', 'A credit card', 'Government ID'],
        correct: 1,
        explanation: 'On a DEX you paste the contract address (CA) to find and buy any token. No KYC needed.',
      },
    ],
  },
  {
    id: 'b3',
    level: 'beginner',
    title: 'Reading a Token Page',
    emoji: '📊',
    xp: 15,
    slides: [
      {
        type: 'info',
        heading: 'Market Cap (MC) vs Price',
        body: 'Market Cap = Price × Total Supply. A $1M MC token with 1B supply has a price of $0.000001. Focus on MC, not price, to compare tokens.',
      },
      {
        type: 'info',
        heading: 'Liquidity',
        body: 'Liquidity is the pool of funds that lets you buy/sell. Low liquidity (<$20k) means your trade will move the price a lot — and you may struggle to exit.',
      },
      {
        type: 'info',
        heading: 'Volume & Holders',
        body: 'High 24h volume means active trading. A rising holder count is bullish. If a handful of wallets hold 50%+ of supply, that\'s a red flag.',
      },
      {
        type: 'quiz',
        question: 'A token has $500 market cap and $200M liquidity. What\'s the best description?',
        options: ['Impossible — liquidity can\'t exceed market cap', 'A great buy opportunity', 'Normal for memecoins', 'Means the token is safe'],
        correct: 0,
        explanation: 'Liquidity can\'t realistically exceed market cap. If you see this on a scanner, the data is wrong or the token is a honeypot.',
      },
      {
        type: 'quiz',
        question: 'Why does low liquidity matter?',
        options: ['You pay lower fees', 'Hard to exit without crashing price', 'Token is more legit', 'It means more holders'],
        correct: 1,
        explanation: 'Low liquidity = high price impact. A sell worth $5k in a $10k pool will crash the price ~50% before you exit.',
      },
    ],
  },

  // ── INTERMEDIATE ──────────────────────────────────────────────────────────
  {
    id: 'i1',
    level: 'intermediate',
    title: 'Chart Basics for Memecoins',
    emoji: '📈',
    xp: 20,
    slides: [
      {
        type: 'info',
        heading: 'Candlestick charts',
        body: 'Each candle shows Open, High, Low, Close for a time period. Green = price closed up. Red = price closed down. The wicks show the extremes.',
      },
      {
        type: 'info',
        heading: 'Support & Resistance',
        body: 'Support is a price floor where buyers step in. Resistance is a ceiling where sellers push back. Memecoins often bounce hard off key levels — watch the chart.',
      },
      {
        type: 'info',
        heading: 'Volume confirms moves',
        body: 'A price spike with high volume = real interest. A spike on low volume = fake-out. Always check volume bars at the bottom of the chart.',
      },
      {
        type: 'quiz',
        question: 'A green candle with a very long upper wick means:',
        options: ['Strong buyers all session', 'Price pumped then got sold hard', 'Low volatility day', 'The token is safe'],
        correct: 1,
        explanation: 'A long upper wick = price ran up but sellers stepped in and pushed it back down. Classic distribution signal.',
      },
      {
        type: 'quiz',
        question: 'Price breaks to a new ATH on low volume. What do you do?',
        options: ['FOMO buy immediately', 'Be cautious — low-volume breakout is suspect', 'Short it', 'It\'s always bullish'],
        correct: 1,
        explanation: 'Low-volume breakouts often fail. Wait for a retest with confirmation before entering.',
      },
    ],
  },
  {
    id: 'i2',
    level: 'intermediate',
    title: 'Entries, Exits & Position Sizing',
    emoji: '🎯',
    xp: 20,
    slides: [
      {
        type: 'info',
        heading: 'Never FOMO the top',
        body: 'The worst entries are chasing a token already up 10x. Wait for a pullback to a support level or enter on low-cap tokens before they trend.',
      },
      {
        type: 'info',
        heading: 'Set a mental stop-loss',
        body: 'Decide before you buy: "If this drops 30%, I\'m out." Stick to it. Most blown accounts come from "I\'ll wait for a recovery" thinking.',
      },
      {
        type: 'info',
        heading: 'Sizing: risk only what you can lose',
        body: 'A good rule: never put more than 1-5% of your portfolio in any single memecoin. Take partial profits at 3x, 5x, 10x. Let the rest ride.',
      },
      {
        type: 'quiz',
        question: 'A token just 20x\'d in 2 hours and is trending on Twitter. What\'s the smart play?',
        options: ['All in immediately', 'Wait for a retracement or skip', 'Sell other holdings to buy it', 'It always keeps going'],
        correct: 1,
        explanation: 'Late FOMO is how most people lose. After a violent pump, the risk/reward is terrible. Wait for a pullback or find the next gem.',
      },
      {
        type: 'quiz',
        question: 'You\'re up 5x on a memecoin. Best move?',
        options: ['Hold for 100x or nothing', 'Take partial profits and let the rest ride', 'Sell everything immediately', 'Buy more'],
        correct: 1,
        explanation: 'Taking partial profits "de-risks" you — you\'ve secured gains while keeping exposure to more upside. This is how pros trade.',
      },
    ],
  },
  {
    id: 'i3',
    level: 'intermediate',
    title: 'On-Chain Signals',
    emoji: '🔍',
    xp: 25,
    slides: [
      {
        type: 'info',
        heading: 'Watch the dev wallet',
        body: 'The deployer wallet (dev) often holds a chunk of supply. Check if they\'ve been selling. Tools like Solscan or Etherscan let you trace wallet movements.',
      },
      {
        type: 'info',
        heading: 'Sniper clusters = warning',
        body: 'If 10-20 wallets bought in the first block of the token launch, those are snipers. They\'ll dump on you as soon as they\'re up. Check the holder list.',
      },
      {
        type: 'info',
        heading: 'Liquidity lock',
        body: 'Good projects lock LP (liquidity pool) tokens for months/years. An unlocked LP means the dev can pull the liquidity and run — a classic rug.',
      },
      {
        type: 'quiz',
        question: 'The top 3 wallets hold 70% of supply. This is:',
        options: ['Very bullish', 'A major red flag', 'Normal for memecoins', 'Proof of legitimacy'],
        correct: 1,
        explanation: 'Concentrated supply means a few wallets can crash the price anytime they sell. Always check holder distribution.',
      },
      {
        type: 'quiz',
        question: 'What does "LP locked" mean?',
        options: ['Dev can\'t trade the token', 'Liquidity can\'t be removed for a set time', 'Token is paused', 'The price is fixed'],
        correct: 1,
        explanation: 'Locking LP means the dev has surrendered the ability to drain the liquidity pool for a period. It\'s a trust signal, not a guarantee.',
      },
    ],
  },

  // ── ADVANCED ──────────────────────────────────────────────────────────────
  {
    id: 'a1',
    level: 'advanced',
    title: 'Rug Pull Playbook',
    emoji: '🚨',
    xp: 30,
    slides: [
      {
        type: 'info',
        heading: 'The classic rug: LP pull',
        body: 'Dev creates token, provides liquidity, hypes it up, then calls `removeLiquidity()`. Price drops to zero instantly. Counter: check if LP is locked.',
      },
      {
        type: 'info',
        heading: 'Honeypot contracts',
        body: 'You can buy but can\'t sell. The contract has code that blocks sells for everyone except the dev. Always test with a tiny buy and try to sell before going in big.',
      },
      {
        type: 'info',
        heading: 'Slow rug / gradual dump',
        body: 'Dev doesn\'t pull everything at once. They sell a little each day while keeping hype alive. Watch the dev wallet daily if you hold a position.',
      },
      {
        type: 'quiz',
        question: 'You buy a token but can\'t sell. This is most likely:',
        options: ['A network error', 'A honeypot contract', 'Normal during high volatility', 'Your wallet is broken'],
        correct: 1,
        explanation: 'Honeypots block all sells except the dev. Always do a small test sell before sizing up.',
      },
      {
        type: 'quiz',
        question: 'Best way to check if a token is a honeypot before buying:',
        options: ['Check Twitter followers', 'Use honeypot checkers like Honeypot.is or RugCheck', 'Look at the logo', 'Check if it has a website'],
        correct: 1,
        explanation: 'Tools like Honeypot.is (EVM) and RugCheck.xyz (Solana) simulate buys and sells to detect malicious contract code.',
      },
    ],
  },
  {
    id: 'a2',
    level: 'advanced',
    title: 'Alpha Hunting',
    emoji: '⚡',
    xp: 35,
    slides: [
      {
        type: 'info',
        heading: 'Find tokens early with screeners',
        body: 'Tools like axiom.trade, Dexscreener "New Pairs", and Birdeye\'s trending feed surface tokens before they trend on CT (Crypto Twitter).',
      },
      {
        type: 'info',
        heading: 'Follow smart money wallets',
        body: 'Track wallets with consistent wins on Solscan / Nansen. When a proven degen enters a new token, it\'s worth investigating. Don\'t copy blindly — they may already be exiting.',
      },
      {
        type: 'info',
        heading: 'Narrative timing',
        body: 'Memecoins ride macro narratives: AI coins when ChatGPT trends, political coins during elections, animal coins when a meme goes viral. Get in early on the narrative, not after CT is saturated.',
      },
      {
        type: 'quiz',
        question: 'A well-known degen just tweeted a CA. What\'s the smartest move?',
        options: ['Ape in immediately', 'Check the CA yourself, then decide fast if fundamentals check out', 'Ignore it', 'Wait a week'],
        correct: 1,
        explanation: 'KOL (Key Opinion Leader) calls move markets instantly. Do a quick rug check and check holder concentration, then decide. Speed matters but not at the cost of due diligence.',
      },
      {
        type: 'quiz',
        question: 'A new "AI agent" narrative is heating up. You spot a new token in the space at $50k MC. Best approach?',
        options: ['Wait for $10M MC to confirm it\'s real', 'Small position early, take profits as it grows', 'Skip — only buy established tokens', 'Put your whole portfolio in'],
        correct: 1,
        explanation: 'Early narrative plays with small MC = highest risk/reward. A small position that could 100x with defined risk is the degen sweet spot.',
      },
    ],
  },
  {
    id: 'a3',
    level: 'advanced',
    title: 'Tax, Security & Longevity',
    emoji: '🔐',
    xp: 30,
    slides: [
      {
        type: 'info',
        heading: 'Protect your wallet',
        body: 'Never share your seed phrase. Use a hardware wallet (Ledger) for large holdings. Use a fresh "hot wallet" for degen trading — limit exposure.',
      },
      {
        type: 'info',
        heading: 'Revoke token approvals',
        body: 'Every time you trade on a DEX, you grant token approvals. Use revoke.cash (EVM) or Phantom\'s built-in revoke to clean up unused approvals that hackers exploit.',
      },
      {
        type: 'info',
        heading: 'Track your P&L for taxes',
        body: 'In most countries, crypto trades are taxable events. Tools like Koinly or Cointracker import your on-chain history and generate tax reports. Ignoring this is a ticking time bomb.',
      },
      {
        type: 'quiz',
        question: 'Someone in Telegram DMs you offering "free tokens" and asks for your seed phrase. You should:',
        options: ['Share it — free tokens sound great', 'Block and ignore — it\'s a scam', 'Share only the first 6 words', 'Ask for more info first'],
        correct: 1,
        explanation: 'NOBODY legitimate will ever ask for your seed phrase. This is the oldest scam in crypto. Block immediately.',
      },
      {
        type: 'quiz',
        question: 'You made $50k trading memecoins this year. What should you do?',
        options: ['Nothing — crypto is anonymous', 'Report it — use a crypto tax tool to track trades', 'Only report if asked', 'Convert to stablecoins to avoid taxes'],
        correct: 1,
        explanation: 'Crypto is traceable on-chain and tax authorities are increasingly sophisticated. Report accurately to avoid penalties.',
      },
    ],
  },
];

export const LEVEL_ORDER = ['beginner', 'intermediate', 'advanced'];

export const LEVEL_META = {
  beginner: { label: 'Beginner', color: 'text-primary', bg: 'bg-primary/10', border: 'border-primary/30', emoji: '🌱' },
  intermediate: { label: 'Intermediate', color: 'text-yellow-400', bg: 'bg-yellow-400/10', border: 'border-yellow-400/30', emoji: '🔥' },
  advanced: { label: 'Advanced', color: 'text-orange-400', bg: 'bg-orange-400/10', border: 'border-orange-400/30', emoji: '⚡' },
};