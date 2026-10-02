# Audit: ASD-STE100 rules in 10 agent sessions

This audit selected the rules in [SKILL.md](../SKILL.md). It examined 10 sessions from the week before 2 October 2026. The Cursor agent that wrote STE-lite also did the audit.

The question was: which ASD-STE100 Issue 9 rules can make the assistant text clearer, prevent confusion, and improve the conversations? Numbers that start with "GR" are general recommendations (GR) in Issue 9, not rules.

## Method

### Population

The population was all sessions in which the user worked interactively with an AI agent from 25 September to 2 October 2026. The survey examined these tools:

- Cursor: agent transcripts and the chat database, read in place and read-only
- OpenCode: `opencode.db`, read-only
- Antigravity: the transcript of each session
- Codex, Claude Code, and Orca: no interactive sessions in this period

The population did not include these sessions:

- the session that made this skill
- empty drafts
- subagent sessions and sessions with no user

The population had 11 sessions: 9 from OpenCode, 1 from Antigravity, and 1 from Cursor. Only one session in the period was with the Cursor agent. Thus, the population includes all AI agents, not only Cursor.

### Sample

The script put the 11 sessions in order of creation time. It then shuffled the list with the Fisher-Yates algorithm and the mulberry32 generator, with seed 20261002. The first 10 sessions are the sample. The session that the draw did not select is an OpenCode session from 28 September (`ses_f17691bd…`).

This is the population in order of creation time:

1. OpenCode `ses_f17691bd8ffeW8td72bNGNidtB` (not selected)
2. OpenCode `ses_f17236ca0ffepig7I3SPHsCsKg` (S01)
3. OpenCode `ses_f12966bf4ffemN0KFjOFyFC4fO` (S02)
4. OpenCode `ses_f1284a91dffekEnk1ciBbTWVvS` (S03)
5. OpenCode `ses_f1231f91dfferMc5zEermhoBCS` (S04)
6. OpenCode `ses_f0c90f530ffeoWkMvE9vQrTIx5` (S05)
7. OpenCode `ses_f08960119ffe66zCM2ExRZKRBr` (S06)
8. Antigravity `0efa5c73-44c9-4936-aa47-3fdebaa4866a` (S07)
9. OpenCode `ses_f02eabf48ffe2j1LoWMnmhbAF4` (S08)
10. Cursor `58c13abb-766d-4b30-96da-821352a8703a` (S09)
11. OpenCode `ses_f02d6e53dffefbzMzWx4dUy9bL` (S10)

The labels S01 to S10 follow the creation time, not the order of the draw.

### Text that the audit examined

The audit examined only text that the assistant wrote for the user:

- progress updates, and questions to the user
- the final text of each turn
- documents that the agent wrote for the user, for example a plan or a walkthrough

The audit did not examine tool calls, tool output, or hidden reasoning. The text had 358 sentences and 4,090 words. A list item or a table cell with 6 or more words counts as one sentence. The audit counted words with Rules 8.4 to 8.7.

### Checks

The audit used two types of checks:

1. A script counted the violations that a pattern can find. The script used the same tests as `scripts/ste-check.mjs`. These counts are approximate.
2. A person read each session in full and recorded these items:
   - each user message that showed confusion
   - each statement that was wrong or had two meanings
   - each decision that the user made without the necessary information
   - each step that the user could miss

Each rule got one of these ratings:

- **High:** The problem caused a question from the user, or a decision without the necessary information. A step that the user can miss, with a failure that the user can see, also gets this rating.
- **Medium:** The problem occurred in many places, or it gave a statement with two meanings. But no user message showed an effect.
- **Low:** The audit found no effect, or very few cases.

### Redactions

This file uses "[Company A]" and similar labels in place of employer names. It does not show the name of the user, the personal web site, or salary numbers.

## Sample

| Label | Tool | Model | Date | User turns | Subject |
|---|---|---|---|---|---|
| S01 | OpenCode | muse-spark-1.3 | 28 Sep | 4 | job scan, then evaluation of 8 jobs |
| S02 | OpenCode | muse-spark-1.3 | 29 Sep | 2 | update of career-ops |
| S03 | OpenCode | muse-spark-1.3 | 29 Sep | 1 | installation of a writing skill |
| S04 | OpenCode | muse-spark-1.3 | 29 Sep | 1 | job scan |
| S05 | OpenCode | muse-spark-1.3 | 30 Sep | 2 | scan of one job board, then evaluation |
| S06 | OpenCode | muse-spark-1.3 | 1 Oct | 5 | update, then CVs for two job descriptions |
| S07 | Antigravity | Gemini 3.8 Flash (High) | 1 Oct | 3 | 404 page for a web site: plan, build, push |
| S08 | OpenCode | muse-spark-1.3 | 2 Oct | 2 | update of career-ops |
| S09 | Cursor | Claude Sonnet 5.5 | 2 Oct | 2 | job scan, then a job description (stopped by the user) |
| S10 | OpenCode | muse-spark-1.3 | 2 Oct | 1 | repair of `npx` in `cmd` |

Seven of the 10 sessions used one job-search tool (career-ops).

## Counts

| Check | Result | Sessions |
|---|---|---|
| Two statements joined with a dash | 107 sentences | 9 of 10 |
| Sentence fragments | 68 (57 in progress updates) | 10 of 10 |
| Non-approved words (for example "verify", "should", "need") | 68 | 10 of 10 |
| Contractions | 40 | 7 of 10 |
| Idioms and phrasal verbs | 30 | 7 of 10 |
| Semicolons | 20, mostly in table cells | 3 of 10 |
| Vague words (for example "probably", "might") | 19, mostly in S09 | 3 of 10 |
| Notes from the agent to itself | 16, all in S09 | 1 of 10 |
| Latin abbreviations | 16 | 4 of 10 |
| Passive voice | 15 | 6 of 10 |
| Progressive tense | 10 | 4 of 10 |
| Paragraphs with more than 6 sentences | 9 | not counted |
| Perfect tense | 5 | 2 of 10 |
| Sentences with more than 25 words | 17 (4.7%) | 5 of 10 |
| Sentences with more than 20 words | 10.6% | not counted |
| Instructions with more than 20 words | 0 of 23 | 0 of 10 |
| Abbreviations with no expansion | 1 or more in each of 6 sessions | 6 of 10 |

The average sentence had 11.4 words. Thus, long sentences were not the main problem. These were the main problems:

- two topics in one sentence
- sentence fragments
- terms that changed
- words that the reader possibly did not know
- decisions at the end of a paragraph about a different topic

## Signs of confusion in the conversations

Three user messages show a problem in the conversation:

1. **S06, turn 3:** "what about the second job?". The previous reply made a CV for one of two jobs. It put the decision about the second job in parentheses, at the end of the reply, after a question about a cover letter. See rule 1.
2. **S06, turn 2:** The user selected "Yes, generate the PDF" for the question "Proceed with the [Company A]-tailored CV despite the gaps above?". No text above the question listed the gaps. See rule 3.
3. **S09, turn 2:** The user stopped the agent. The last progress update said "None of [Company B]'s listed roles seem AI-related, so I'm not sure which JD they're after. I should check [Company B]'s careers page directly…". The agent did not ask the user. It continued to search. This problem is mostly outside STE.

A fourth message (S01, turn 3) corrected the choice of tool. It was not about the text.

The audit also found problems that had no reaction from the user in the session. In each of these problems, the text was wrong, had two meanings, or put a necessary step where the user could miss it:

- S10 put the necessary step "Open a new `cmd` window" under "Two notes:".
- S05 gave a second command that was not complete.
- S06 gave an instruction, and then said "No action needed.".
- S01 gave an option labeled "Top 8" with a list of 7 jobs.
- S01 gave three different counts (2, 3, and 5) for the jobs that the location rule removed.
- S01 wrote "they'll fill in naturally", and "they" had two possible meanings.
- S07 did not say who deploys the site after the push.
- S09 put a paragraph of planning text after the final summary, and this paragraph gave the wrong company for two jobs.

## Rules that STE-lite uses

The numbers are the rule numbers in [SKILL.md](../SKILL.md).

### 1. Start with the answer, and give each topic its own paragraph (6.1, 6.4, 6.5): High

- **S06, final reply of turn 2:** The user sent two job descriptions. The agent first wrote "Got both JDs". The final reply had a paragraph about the CV for the first job. The decision about the second job was in parentheses at the end: "(Separately: I did not build one for the [Company B] full-stack role — it's a TypeScript/Cloudflare fundraising-platform job well outside your archetypes; say the word if you still want it.)". The next user message was "what about the second job?". This is the clearest confusion in the sample.
- **S09, final reply of turn 1:** The summary started with the result, and it had short sections. This part is a good example. But a paragraph of planning text came after the last section.
- **S01, final reply of turn 3:** One sentence, "Pipeline bookkeeping this run: …", had four topics with semicolons between them.
- **S10, final reply:** The reply started with the result: "Fixed. `npx` now works in `cmd`." This part is a good example. But the necessary step was at the end, in a note. See rule 2.

### 2. Write each action for the user as a step, not as a note (5.2, 5.3, 5.4, 5.5): High

- **S10:** "Two notes: - Open a **new** `cmd` window to see it — already-open terminals keep the old PATH." The fix works only in a new window. If the user tests in an old window, `npx` still fails, and the user thinks that the fix does not work.
- **S05:** "PDFs deferred (each costs ~30-60s render): run `/career-ops pdf company-c` or `company-d` on demand for the two apply targets." The instruction is in a list of notes, and the second command is not complete.
- **S06:** "Run `npm run manifesto` to read it and sign it if you want to help. No action needed." The note gives an instruction, and then it says that no action is necessary.
- **S09:** "Running `npx playwright install` would fix browser-based liveness checks." The instruction is a description in the conditional.
- **S01 and S10:** "say the word if you want that migration" and "say the word and I'll set up a `cmd` AutoRun hook". These offers are inside notes.

### 3. Make each pronoun and reference point to one item that the reader saw (GR-3, GR-4): High

- **S06:** The question "Proceed with the [Company A]-tailored CV despite the gaps above?" came after a progress update. This update said that the automatic check of the skills gave no result, and that the agent then read the job description. No text listed the gaps. The user approved. The gaps first appeared in the next reply: "no publications, no PhD, no named VLM/tracking/TensorRT/CCTV work". OpenCode can show reasoning to the user, and this audit did not examine reasoning. Thus, the user possibly saw the gaps in the reasoning.
- **S06:** "I did not build one for the [Company B] full-stack role". The word "one" means a CV, but the sentence before it is about a cover letter.
- **S01:** "13 rows stay empty — … (they'll fill in naturally on future merges since every new TSV carries a URL)". The word "they" can mean the 13 old rows or the new rows.
- **S09:** "I'm not sure which JD they're after". The word "they" means the user, who is the reader. The user stopped the agent after this message.

### 4. Write one topic in each sentence (4.1, 4.4, 8.1): Medium

- 107 sentences in 9 of 10 sessions joined two statements with a dash. 20 semicolons occurred in S01, S05, and S06, mostly in table cells.
- **S10:** The explanation of the cause had two sentences of 27 to 30 words, with two dashes and four facts.
- **S05:** "Skip — mid-level scope at […] net with tax/insurance on you". The word "with" does not show the relation (GR-2). The writer possibly meant that the user pays the tax and the insurance.
- No user message showed a problem from this rule. But it is the most frequent problem, and a dash does not tell the reader the relation between the two statements.

### 5. Use one term for one item (1.11, 6.2, 9.4): Medium

- **S07:** The plan and the walkthrough used eight terms for one item: "arbitrary non-existent route", "unknown route", "unmatched path", "unindexed route", "unindexed path", "non-root URLs", "erroneous URLs", and "Unindexed Coordinates" in the title. In search engine optimization (SEO), "unindexed" means "not in the search index". The same walkthrough describes a new `noindex` tag "to protect SEO and prevent indexing of erroneous URLs".
- **S01:** One table used four action labels: "Apply", "Apply immediately", "Consider", and "Stretch only". The cell with "Stretch only" also said "recommend against unless you want the reach".
- **S01:** Three replies gave three counts for the jobs that the location rule removed: "Two more location-DQ cleanups", "Discard log verified (3 lines x 3 fields)", and "5 location-DQ entries". The reader cannot find the relation between these counts.
- **S06, turn 5:** The user asked about "compatibility". The reply used "coverage", and it did not say that these words have the same meaning.

### 6. Write complete sentences (4.2, 4.5): Medium

- The audit found 68 sentence fragments in all 10 sessions. 57 of them were in progress updates, and most of these updates had a low risk.
- **S05:** The second command was not complete (see rule 2).
- **S03:** "Note: global install to PromptScript skipped — it doesn't support global skills, expected and irrelevant for your setup." The reader must find the subject of "skipped", "expected", and "irrelevant".
- **S08:** "Interpreting that as an update request — checking system state." The fragment hides an assumption about the request of the user.
- **S01:** "Bookkeeping done." and "Top 8 it is."

### 7. Use words with their literal meaning (1.3, 9.2, 9.3): Medium

- The audit found 30 idioms and phrasal verbs in 7 of 10 sessions.
- "say the word" occurred in S01, S06 (two times), and S10.
- **S06:** "pin down which benefits survive that", "lays out the exact play", "the bright spot", and "the one interview question you can't rehearse".
- **S01:** "Shell quoting is fighting me", "backtick-escape ate a character", and "unless you want the reach".
- **S09:** "score them out", "turned up", and "dead boards".
- A reader whose first language is not English can read an idiom literally. No user message showed a problem from an idiom.

### 8. Use words that the reader knows (1.9, 1.10, 2.1, 8.3): Medium

- **S01** used 24 internal terms of the career-ops tool, and it did not explain them. Some examples are "zero-token", "fact gate", "skill-gap gate", "liveness", "location-DQ", "survivors", "fit-per-token", "geo-adjust", "runway", and "warm signal".
- These sessions used abbreviations with no expansion:
  - S01: "DQ", "SA", "FDE", "SDET", "RAG"
  - S04: "QC", "ATS"
  - S05: "HPC", "RAG", "K8s"
  - S06: "COLA", "KV", "D1", "PcD", "TS", and a short form of the name of [Company B]
  - S07: "SPA"
  - S09: "ATS", and the same short form of the name of [Company B]
- Noun groups with more than three words: "main interactive 3D Cognitive Sphere portfolio page" (S07), "Brazil-market PcD-quota rule" (S06), and "remote-TS market average" (S06).
- The user did not ask about a term. The user uses career-ops frequently, and thus possibly knows some of these terms. But the terms come from the prompts of the tool, not from the user.

### 9. Say who does each action (3.2, 3.4, 3.6): Medium

- The audit found 15 passive constructions in 6 of 10 sessions. Most of them had no effect. Two of them did:
  - **S07, the last message after the push:** "When deployed to Cloudflare, navigating to `<site>/secrets` or any unindexed path will now return an authentic HTTP 404 status…". The reader cannot tell who deploys the site, or if the push starts a deployment.
  - **S07, walkthrough:** "The 404 Error Page has been implemented and verified." The text does not say how the agent verified the page.
- Complex tenses occurred in progress updates: "I have initiated a `git pull origin main` to ensure your local repository is synchronized…" and "I am running `npm run build`…" (S07, three times). S09 used "I'm weighing whether…" and "I'm leaning toward…". These are also notes from the agent to itself.

### 10. Use a vertical list for complex text (4.3): Medium

- **S01:** The user selected an option with the label "Top 8 strongest PASS". The description of the option named 7 jobs in one line. The evaluation then included an eighth job that the line did not name. A numbered list makes the count easy to see.
- **S01 and S05:** Table cells had three statements with semicolons between them.

### 11. Keep sentences and paragraphs short (5.1, 6.3, 6.6): Low to medium

- 17 sentences had more than 25 words, in S01, S04, S06, S07, and S09. The longest were in the S07 plan (44 and 46 words) and in the S09 progress updates (32 and 37 words).
- No instruction had more than 20 words.
- 9 paragraphs had more than 6 sentences.
- Most long sentences also break rule 4. Thus, rules 1 and 4 prevent more problems than a length limit.

### 12. Put the warning before the risky step (7.1, 7.2, 7.3): No evidence

- The sample had three risky actions. S10 changed the permanent PATH of the user. S06 updated 335 files. S07 pushed to `main`.
- S06 asked before the update, and the question included the command for the rollback: "Ready to update to v1.35.0? This can be rolled back with `/career-ops update rollback`." This is a good example.
- No reply omitted a necessary warning. STE-lite keeps rule 12 because a missing warning has a high cost.

## STE rules that STE-lite does not use

| STE rules | Audit result | Reason |
|---|---|---|
| 1.1 to 1.4, 1.12, 1.13: the dictionary | 68 non-approved words in 10 of 10 sessions, for example "verify" 11 times, "need" 10, "should" 9, "confirm" 9, "already" 7 | No word caused a problem. Strict control makes software text strange. STE-lite keeps only the word changes that remove an ambiguity. |
| 4.2: contractions | 40 in 7 of 10 sessions | No contraction caused a problem. |
| 1.14: American spelling | not counted | The skill uses the spelling of the user. |
| 3.5: the "-ing" form, and 3.7: a verb for an action | the count had many false results | Rules 6 and 9 fix most of these cases. |
| 8.2: hyphens | no problem found | |
| 8.4 to 8.7: word counts | | STE-lite uses these rules only to count words for rule 11. |
| GR-1, GR-5, GR-7, GR-8 | no problem found | |

STE-lite uses three items as word changes, not as full rules:

- vague words: "may", "might", and "would" become "can" in the STE dictionary
- GR-2: a vague "with"
- GR-6: Latin abbreviations, which occurred 16 times in 4 sessions

## Problems that STE does not cover

1. **Notes from the agent to itself (S09).** 16 sentences in S09 were deliberation, for example "I'm weighing whether…". The final summary ended with this paragraph: "I shouldn't add anything unverified, just report these as leads instead. Now I'm looking at the 7 new offers based in [country], noting that some are poor fits—like the QA, Fullstack, and Product Manager roles at [Company C]…". The table above this paragraph showed the QA job and the full-stack job at two other companies. STE-lite adds a rule for this problem.
2. **Turns that ended with no result (S06).** Turn 3 ended with an API error (HTTP 429, rate limit), and the user typed "continue". Turn 5 ended with a progress update ("Coverage moved 25% → 35%. Updating the report's Cloudflare row…") and no final answer. A writing rule cannot fix an API error.
3. **A guess in place of a question (S09, turn 2).** The agent did not know which job description the user meant. It did not ask, and the user stopped it.

## Limitations

- The sample is small: 10 sessions and 23 user turns.
- Most sessions came from one model and one tool. 8 of 10 sessions used muse-spark-1.3 in OpenCode, and 7 of 10 sessions used career-ops. Only S09 used a Claude model.
- The counts come from patterns, and they are approximate. A person decided the ratings.
- The user messages are the only direct evidence of confusion. If a user did not ask a question, the user possibly understood the text, or possibly did not notice the problem.
- The audit did not examine hidden reasoning. In OpenCode, the user can possibly see reasoning, so some information that this audit calls missing was possibly visible.
- The agent that wrote STE-lite also did the audit.

## How to do the audit again

- **Sample:** Use the population order in this file, seed 20261002, the mulberry32 generator, and a Fisher-Yates shuffle. Take the first 10 sessions.
- **Scripts:** The extraction scripts and the session text were in a temporary folder. The agent deleted this folder after the audit, at the request of the user, because these files contained private chat data. They are not in this repository.
- **Checks:** Run `node scripts/ste-check.mjs` on the text of each session. It uses the same tests as the audit.
