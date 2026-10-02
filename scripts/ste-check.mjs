#!/usr/bin/env node
// Advisory checker for the ASD-STE100 (Issue 9) rules that SKILL.md adopts.
// Usage: node scripts/ste-check.mjs [--strict] [--quotes] [file ...]   (reads stdin if no file)
// Skips fenced code, headings, and blockquotes (--quotes checks blockquotes too).
// Counts words as rules 8.4-8.7 say:
// inline code, links, URLs, quoted text, text in parentheses, numbers with units,
// and hyphenated words each count as one word.
import fs from 'node:fs';

const LIMITS = { instruction: 20, description: 25, paragraph: 6 };
const IMPERATIVES = new Set(('run open close check add use install uninstall say set create read remove delete type restart start stop ' +
  'choose copy paste review confirm make keep try apply update edit replace move rename tell reply send push pull commit merge test ' +
  'fix enable disable select click go write put give find look ask do get see list show save load build deploy enter press count ' +
  'define refer call answer').split(' '));
const IRREGULAR_PP = new Set(('done made run found kept left sent built written given taken shown seen known set put read held told got ' +
  'gotten paid begun broken chosen driven hidden spoken thrown cut hit shut split spread lost won bought brought caught taught thought').split(' '));
const NOT_PP = new Set('need seed feed speed bed red shed hundred indeed ten then open often even seen when been'.split(' '));
const ING_OK = /^(during|something|nothing|anything|everything|string|thing|morning|evening|warning|setting|pending|missing|remaining|ceiling|bring|spring|swing|king|ring|sing|wing)s?$/i;
const IDIOMS = /\b(say the word|pin(ned)? down|lay(s|ing)? out the|is a stretch|bright spot|warm signal|slip(ped|s)? through|score (it|them) out|fill(s|ed)? in naturally|wired (into|up)|on top of (it|that)|going forward|in hand|out of the box|under the hood|figure(d)? out|turn(ed|s)? up|came back (at|with|inconclusive)|show(ed|s)? up|kick(ed|s)? off|look(ed)? into|end(ed|s)? up|move on|carry on|go ahead|hold off|ate a)\b/gi;
const LATIN = /(?<![\w.])(e\.g\.|i\.e\.|etc\.?|vs\.?|cf\.|viz\.)(?![\w])/gi;
const HEDGES = /\b(might|may|would|probably|likely|perhaps|seems?|appears?|apparently|basically|actually|just|roughly|somewhat)\b/gi;
const SELF_TALK = /\b(I need to|I should(n't)?|I('m| am) (weighing|leaning|looking at|thinking|considering)|I wonder|I'll write up|they're after)\b/i;
const COMMON_ABBR = new Set(('AI API URL PDF CV HTTP HTTPS HTML CSS JSON YAML PATH CLI UI UX OK US EU UK UTC AWS GCP SQL LLM NLP QA CI CD PR ID IT ' +
  'CEO CTO JS TS MD SEO GPU CPU RAM KB MB GB TB NPM VPN OS DB DNS SDK IDE CSV TSV XML SSH SSL TLS REST UUID ISO PNG JPG SVG MCP README ' +
  'CCTV NOTE WARNING CAUTION TODO STE ASD STE100 CODE LINK QUOTE').split(' '));

function mask(line) {
  return line
    .replace(/\[([^\]]+)\]\([^)]+\)/g, 'LINK')
    .replace(/`[^`]+`/g, 'CODE')
    .replace(/https?:\/\/\S+/g, 'URL')
    .replace(/["“][^"”\n]{1,300}["”]/g, 'QUOTE')
    .replace(/\*\*|__/g, '');
}
const countWords = s => s.replace(/\([^()]*\)/g, ' P ').replace(/\b\d[\d,.]*\s?(%|ms|s|KB|MB|GB|px|k)\b/g, 'N')
  .split(/\s+/).filter(w => /[A-Za-z0-9]/.test(w)).length;
const splitSentences = line => line.split(/(?<=[.!?])\s+(?=[A-Z0-9"(`])/).map(s => s.trim()).filter(Boolean);

function check(name, text, quotes) {
  text = text.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, m => m.replace(/[^\n]/g, ''));
  if (quotes) text = text.replace(/^([ \t]*>)+[ \t]?/gm, '');
  const findings = [];
  const add = (line, rule, msg, s, info = false) => findings.push({ line, rule, msg, s: s.length > 110 ? s.slice(0, 110) + '…' : s, info });
  const lines = text.split(/\r?\n/);
  let fence = false;
  let para = { start: 0, n: 0 };
  const closePara = () => { if (para.n > LIMITS.paragraph) add(para.start, '6.6', `paragraph has ${para.n} sentences (max ${LIMITS.paragraph})`, lines[para.start - 1].trim()); para = { start: 0, n: 0 }; };
  const masked = mask(lines.filter(l => !/^\s*>/.test(l)).join('\n').replace(/```[\s\S]*?```/g, ' '));
  const abbrs = new Map();

  lines.forEach((raw, i) => {
    const ln = i + 1;
    if (/^\s*(```|~~~)/.test(raw)) { fence = !fence; closePara(); return; }
    if (fence || /^\s*>/.test(raw) || /^\s*<\/?\w+[^>]*>\s*$/.test(raw) || /^---\s*$/.test(raw)) return;
    if (!raw.trim() || /^\s*#{1,6}\s/.test(raw)) { closePara(); return; }
    let line = mask(raw.trim());
    const isTable = line.startsWith('|');
    const isList = !isTable && /^([-*+•]|\d+[.)])\s+/.test(line);
    const units = isTable
      ? line.split('|').map(c => c.trim()).filter(c => c && !/^:?-+:?$/.test(c) && countWords(c) >= 6)
      : splitSentences(line.replace(/^([-*+•]|\d+[.)])\s+/, ''));
    if (!isTable && !isList) { if (!para.n) para.start = ln; para.n += units.length; }
    for (const s of units) {
      const wc = countWords(s);
      const first = (s.replace(/^[^A-Za-z]+/, '').split(/\s+/)[0] ?? '').toLowerCase().replace(/[^a-z]+$/, '');
      const limit = IMPERATIVES.has(first) ? LIMITS.instruction : LIMITS.description;
      if (wc > limit) add(ln, IMPERATIVES.has(first) ? '5.1' : '6.3', `${wc} words (max ${limit})`, s);
      if (s.includes(';')) add(ln, '8.1', 'semicolon: write two sentences', s);
      const dash = s.search(/\s[—–]\s|\w—\w|\s--\s/);
      if (dash > 0 && countWords(s.slice(0, dash)) > 3) add(ln, '4.1', 'dash joins two statements: one topic per sentence', s);
      if (/^([A-Z][a-z]+ing|[A-Z][a-z]+ed)\b/.test(s) && !ING_OK.test(first) && /[.:]$/.test(s) && !/\b(I|we|you|it|this|the \w+)\s+(am|is|are|was|were|will|can|did|do|have|has)\b/i.test(s))
        add(ln, '4.2', 'fragment: give the sentence a subject and a verb', s);
      for (const m of s.matchAll(/\b(is|are|was|were|be|been|being)\s+(\w+ly\s+)?(\w+)\b/gi)) {
        const w = m[3].toLowerCase();
        if ((/(ed|en)$/.test(w) && !NOT_PP.has(w)) || IRREGULAR_PP.has(w)) { add(ln, '3.6', `passive "${m[0]}": name the agent if you know it`, s, true); break; }
      }
      if (/\b(have|has|had)\s+(\w+ed|been|done|made|found|run|built|written|given|taken|shown|sent)\b/i.test(s) || /\b(am|is|are|was|were|I'm|we're)\s+(?!going\b)\w+ing\b/.test(s))
        add(ln, '3.2', 'complex tense: use simple past, present, or future', s, true);
      for (const m of s.matchAll(IDIOMS)) add(ln, '9.3', `idiom or phrasal verb "${m[0]}": use the literal word`, s);
      for (const m of s.matchAll(LATIN)) add(ln, 'GR-6', `"${m[0]}": write "for example", "that is", "and other", "compared to", or "through"`, s, true);
      const hedges = [...s.matchAll(HEDGES)].map(m => m[0]);
      if (hedges.length) add(ln, '4.1', `vague word(s) ${hedges.join(', ')}: state the fact, or say what you do not know`, s, true);
      if (SELF_TALK.test(s)) add(ln, 'self-talk', 'note to self: write only text for the reader', s);
      if (/\b\w+'(t|re|ve|ll|d|m)\b/i.test(s)) add(ln, '4.2', 'contraction', s, true);
      for (const m of s.matchAll(/\b([A-Z][A-Z0-9]{1,5})s?\b/g)) if (/[A-Z].*[A-Z]/.test(m[1]) && !COMMON_ABBR.has(m[1]) && !abbrs.has(m[1])) abbrs.set(m[1], ln);
    }
  });
  closePara();
  for (const [a, ln] of abbrs) if (!new RegExp(`\\(${a}s?\\)|\\b${a}s? \\(`).test(masked)) add(ln, '8.3', `abbreviation "${a}" has no expansion: write the full term once, then "(${a})"`, a);
  return findings.sort((x, y) => x.line - y.line);
}

const args = process.argv.slice(2);
const strict = args.includes('--strict');
const quotes = args.includes('--quotes');
const files = args.filter(a => !a.startsWith('--'));
const inputs = files.length ? files.map(f => [f, fs.readFileSync(f, 'utf8')]) : [['stdin', fs.readFileSync(0, 'utf8')]];
let errors = 0;
for (const [name, text] of inputs) {
  const found = check(name, text, quotes);
  const byRule = {};
  for (const f of found) {
    byRule[f.rule] = (byRule[f.rule] ?? 0) + 1;
    if (!f.info) errors++;
    console.log(`${name}:${f.line}  [${f.rule}]${f.info ? ' (review)' : ''} ${f.msg}  | ${f.s}`);
  }
  console.log(`${name}: ${found.length} findings ${JSON.stringify(byRule)}`);
}
process.exit(strict && errors ? 1 : 0);
