---
name: ste-lite
description: Applies a lite subset of ASD-STE100 Simplified Technical English (Issue 9) to text that the user reads. The rules give one topic per paragraph and per sentence, one term for one item, and literal words. Instructions become numbered imperative steps. Use when writing or revising answers, progress updates, summaries, plans, questions, or instructions for the user. Also use when the reader is not a native English speaker, or when the user mentions STE, ASD-STE100, Simplified Technical English, plain English, or clear writing.
---

# STE-lite

ASD-STE100 Simplified Technical English (STE) is a controlled language for technical documents. Its main objective is that "readers immediately understand each sentence that they read" (Issue 9, Rule 9.1).

STE-lite keeps 12 groups of STE rules. Each group can prevent a type of problem that an audit of 10 agent sessions found. STE-lite does not use the STE rules that gave no benefit in the audit. The method and the evidence are in [references/audit.md](references/audit.md).

The numbers in parentheses are ASD-STE100 Issue 9 rule numbers. Numbers that start with "GR" are general recommendations (GR), not rules. S01 to S10 are the sessions in the audit.

## Scope

Apply STE-lite to all text that the user reads:

- final answers and summaries
- progress updates
- questions and options for the user
- plans, walkthroughs, commit messages, and pull request descriptions

Do not change these items. Rule 8.6 counts each of them as one word:

- code, commands, file paths, URLs, and error messages
- quoted text and titles
- product names and other proper nouns

Keep the technical words that the reader uses, for example "commit", "deploy", and "PATH". STE-lite changes the sentences around these words.

## Rules

The rules are in order of their effect in the audit.

### 1. Start with the answer, and give each topic its own paragraph (6.1, 6.4, 6.5)

- Start the reply with the result.
- Give one paragraph to each request, decision, or problem. Start each paragraph with a topic sentence.
- If you did not do a part of the request, tell the user in a separate paragraph. Give the reason.
- Do not put a decision in parentheses, or at the end of a paragraph about a different topic.

**Before** (S06, the end of the reply to a request with two job descriptions):

> Want a cover letter for this role too? Say "yes" and I'll run the interactive cover flow. (Separately: I did not build one for the [Company B] full-stack role — it's a TypeScript/Cloudflare fundraising-platform job well outside your archetypes; say the word if you still want it.)

The next user message was "what about the second job?".

**After:**

> I made a CV for one of your two jobs.
>
> - **[Company A], AI Research Engineer:** The CV is in `output/cv-company-a.pdf`.
> - **[Company B], Full-Stack Engineer:** I did not make a CV. This job is for a TypeScript and Cloudflare fundraising platform. It does not match the job types in your profile. Tell me if you want a CV for this job.
>
> Do you also want a cover letter for the [Company A] job?

### 2. Write each action for the user as a step, not as a note (5.2, 5.3, 5.4, 5.5)

- Write each action in the imperative: "Open a new window."
- If there is a condition, put it first, and then a comma: "If the build fails, run `npm ci`."
- Write one action in each step. Use a numbered list for two or more steps.
- Write notes only to give information. The steps must work if the reader does not read the notes.
- Do not write a step as a description. "Running `npx playwright install` would fix it" (S09) becomes "To fix it, run `npx playwright install`."

**Before** (S10, the first item under "Two notes:"):

> - Open a **new** `cmd` window to see it — already-open terminals keep the old PATH.

The fix works only in a new window. If the user does not read the notes, the user tests in an old window and thinks that the fix failed.

**After** (a step directly after the result):

> To use `npx`, open a new `cmd` window. A `cmd` window that is already open keeps the old PATH.

### 3. Make each pronoun and reference point to one item that the reader saw (GR-3, GR-4)

- If "it", "they", "this", or "one" can refer to two nouns, write the noun.
- Refer only to text that the reader saw. "The gaps above" needs a list of gaps above it.
- Call the user "you". S09 called the user "they".

**Before** (S01):

> 13 rows stay empty — their reports predate the URL-header rule, so there's nothing to pull from (they'll fill in naturally on future merges since every new TSV carries a URL).

"They" can mean the 13 old rows or the new rows. The reader cannot tell if the 13 rows will get a URL.

**After:**

> 13 old rows have no URL, because their reports have no URL. These 13 rows will stay empty. Each new row will get a URL, because each new TSV file has a URL.

**Before** (S06, a question to the user):

> Proceed with the [Company A]-tailored CV despite the gaps above?

No text above the question listed the gaps. The user approved without this information. The gaps first appeared in the next reply.

**After:**

> Your CV does not show these items from the job description:
>
> 1. Research publications
> 2. A PhD
> 3. Work with vision-language models (VLMs), video tracking, TensorRT, or CCTV
>
> Do you want me to make the CV for this job?

### 4. Write one topic in each sentence (4.1, 4.4, 8.1)

- Put one statement in each sentence. Do not join two statements with a dash or a semicolon.
- Give the cause before the result.
- Use a connecting word to show the relation between two sentences: "and", "but", "because", "then", or "as a result".

**Before** (S10):

> It was only wired into PowerShell — your PowerShell profile runs `fnm env ...`, which injects a temp session dir (`fnm_multishells\...`) containing `node`/`npm`/`npx` into PATH. `cmd` has no equivalent init (no AutoRun), and your persistent User PATH contained only `fnm.exe` itself, not any Node — so a fresh `cmd` found nothing.

**After:**

> Your PowerShell profile runs `fnm env`. This command adds a temporary folder to PATH, and this folder contains `node`, `npm`, and `npx`. `cmd` does not run `fnm env`, and your permanent PATH contained only `fnm.exe`. As a result, `cmd` did not find `npx`.

Evidence: 107 sentences in 9 of 10 sessions joined two statements with a dash.

### 5. Use one term for one item (1.11, 6.2, 9.4)

- Select one term for each item, and use only that term. A different term makes the reader think of a different item.
- Use the same label for the same decision. Define each label one time.
- Do not use a term that has a different meaning in the same subject.

**Before** (S07, one plan and its summary): "arbitrary non-existent route", "unknown route", "unmatched path", "unindexed route", "unindexed path", "non-root URLs", "erroneous URLs", and the title "404 Error Page for Unindexed Coordinates".

Eight terms name one item. In search engine optimization (SEO), "unindexed" means "not in the search index". The same summary also describes a new `noindex` tag.

**After:** Define the term one time. Then use only this term.

> An unknown URL is a URL that does not match a page on the site. For each unknown URL, Cloudflare sends the 404 page.

**Before** (S01, the action column of one table): "Apply", "Apply immediately", "Consider", and "Stretch only … recommend against unless you want the reach".

**After:** Use two labels, "Apply" and "Skip". Put the reason in a different column.

### 6. Write complete sentences (4.2, 4.5)

- Give each sentence a subject and a verb. Do not omit "I", "it", "is", or "the".
- Write the full command each time. Do not shorten the second of two commands.
- In a progress update, write one or two full sentences: what you found, and what you will do next.

**Before** (S05):

> PDFs deferred (each costs ~30-60s render): run `/career-ops pdf company-c` or `company-d` on demand for the two apply targets.

The second command is not complete. The reader can type `company-d` as a command.

**After:**

> I did not make the two PDFs, because each PDF takes 30 to 60 seconds. To make them, run these commands:
>
> 1. `/career-ops pdf company-c`
> 2. `/career-ops pdf company-d`

**Before** (S08, a progress update): "Interpreting that as an update request — checking system state."

**After:** "I think that you want to update career-ops. First, I will check the installed version."

Evidence: The audit found 68 sentence fragments in all 10 sessions. 57 of them were in progress updates.

### 7. Use words with their literal meaning (1.3, 9.2, 9.3)

- Do not use idioms or metaphors. A reader whose first language is not English can read them literally.
- Do not use a phrasal verb if one verb has the same meaning.

| In the audit | Literal text |
|---|---|
| "say the word" (S01, S06, S10) | "tell me" |
| "pin down which benefits survive that" (S06) | "ask which benefits you keep as a contractor" |
| "lays out the exact play" (S06) | "gives the steps" |
| "Shell quoting is fighting me" (S01) | "The shell changes the quotes in my command" |
| "let the pipeline score them out" (S09) | "let the pipeline evaluate them" |
| "turned up promising roles" (S09) | "found good jobs" |

Evidence: The audit found 30 idioms and phrasal verbs in 7 of 10 sessions.

### 8. Use words that the reader knows (1.9, 1.10, 2.1, 8.3)

- Do not use internal names from prompts, tools, or files, for example "fact gate" or "zero-token scan". Say what the item does.
- The first time that you use an abbreviation, write the full term. Put the abbreviation after it in parentheses: "job description (JD)".
- Do not use slang or metaphors as names, for example "seat", "runway", or "warm signal".
- Do not put more than three nouns together. "Brazil-market PcD-quota rule" (S06) becomes "the Brazilian quota for people with disabilities (PcD)".

**Before** (S01):

> Two more location-DQ cleanups ([Company] Berlin/Warszawa — on-site outside [country], so pre-screen FAILs regardless of their uncertain liveness):

**After:**

> I removed two more jobs from the list. Both jobs are on-site, in Berlin and in Warsaw. Your location rule rejects on-site jobs outside your country. This rule applies even if the job postings are still open.

Evidence: S01 used more than 20 internal terms from its tool, and it did not explain them. 6 of 10 sessions used an abbreviation with no expansion, for example "DQ", "SA", "FDE", "COLA", or "PcD".

### 9. Say who does each action (3.2, 3.4, 3.6)

- Use the active voice. Say who did the action, and who must do the next action.
- Use the passive voice only if you do not know the agent.
- Use the simple past for what you did. Use the present for what is true now. Use "will" for what happens next. Do not write "I have initiated" or "I am running".

**Before** (S07, the last message, after a push to `main`):

> When deployed to Cloudflare, navigating to `<site>/secrets` or any unindexed path will now return an authentic HTTP 404 status and display the dedicated Cyberpunk 404 Error page instead of the main 3D portfolio.

The reader cannot tell who deploys the site, or if the push starts a deployment.

**After:**

> I pushed the commit to `main`. I did not deploy the site, and I do not know if your Cloudflare project deploys from `main`. When the new version is live, each unknown URL will show the 404 page with HTTP status 404.

### 10. Use a vertical list for complex text (4.3)

- Use a list for three or more items, steps, or conditions.
- Put a colon at the end of the lead-in sentence. Make each item continue the lead-in sentence.
- Do not put steps and descriptions in the same list.
- If the count is important, use a numbered list. Make sure that the count in the text and the length of the list agree.

**Before** (S01, an option that the user selected): The label was "Top 8 strongest PASS". The description was one line that named seven jobs, with commas between them. The results then included an eighth job that the line did not name.

**After:** Put a numbered list of the 8 jobs in the message before the question. Then ask: "Do you want me to evaluate these 8 jobs?"

### 11. Keep sentences and paragraphs short (5.1, 6.3, 6.6)

- Write a maximum of 20 words in an instruction and 25 words in a description.
- Write a maximum of 6 sentences in a paragraph.
- Count each of these items as one word (8.4 to 8.7):
  - code, a path, or a URL
  - a number with its unit
  - quoted text, or text in parentheses
  - a hyphenated word

**Before** (S07, a plan. The sentence has 44 words with the STE count.):

> This task creates a dedicated, high-performance, cybernetic/AI-branded 404 Error Page and configures both the Cloudflare Worker Assets layer and client application so that visiting `/secrets` or any unknown route displays the error page and returns an authentic HTTP 404 Not Found status code (avoiding soft-404 SEO penalties and saving GPU/bundle overhead).

**After:**

> This task adds a 404 page to the site. For each unknown URL, Cloudflare will send this page with HTTP status 404. The browser will not load the 3D scene for these URLs. As a result, search engines will not record the unknown URLs as real pages.

Evidence: 17 sentences in 5 of 10 sessions had more than 25 words, but the average was 11.4 words. Thus, rules 1 and 4 prevent more problems than a length limit.

### 12. Put the warning before the risky step (7.1, 7.2, 7.3)

- Before a step that can delete data or that you cannot easily reverse, write "Warning:".
- Start with the command or the condition. Then give the risk.

> Warning: Do not run `git push --force` on `main`. This command deletes the commits that other people pushed after your last pull.

The audit found no missing warnings. STE-lite keeps this rule because a missing warning has a high cost.

## Word choices

These changes come from the STE dictionary. Each change removes an ambiguity:

| Instead of | Write |
|---|---|
| should | "must" for a requirement, "I recommend" for advice, or "I expect" for a prediction |
| may, might, would | "can", or say what you do not know |
| just | "only" or "immediately" |
| e.g., i.e., etc. | "for example", "that is", "and other" (GR-6) |
| a vague "with" | a verb that shows the relation, for example "has", "uses", or "costs" (GR-2) |

## STE rules that STE-lite does not use

- **Full dictionary control (1.1 to 1.4, 1.12, 1.13).** The audit found 68 non-approved words, but no word caused a problem. Strict control makes software text strange, for example "do a check of the log" in place of "check the log".
- **No contractions (part of 4.2).** The audit found 40 contractions, but no contraction caused a problem.
- **American spelling (1.14).** Use the spelling of the user.
- **The "-ing" rule and the verb-for-action rule (3.5, 3.7).** Rules 6 and 9 of STE-lite fix most of these cases.
- **Hyphens (8.2), "that" (GR-1), false friends (GR-5), inclusive language (GR-7), and the possessive form (GR-8).** The audit found no problems with these items.

## A problem that STE does not cover

Write only text for the reader. Do not write notes to yourself, for example "I'm weighing whether…" or "I should check…". Do not put planning text after the final summary.

In S09, 16 sentences were notes from the agent to itself. The final summary ended with a paragraph of planning text. This paragraph put three jobs at one company, but only one of the three jobs was at this company.

## Check before you send

Read the draft one time, and answer these questions:

1. Does the first sentence give the result?
2. Does each request, decision, and problem have its own paragraph?
3. Is each action for the user a numbered imperative step, outside the notes?
4. Can each pronoun refer to only one noun that the reader saw?
5. Does each sentence have one topic, a subject, and a verb?
6. Did you use the same term for the same item each time?
7. Did you remove idioms, internal names, and abbreviations with no expansion?
8. Does the text say who did each action, and who does the next action?
9. Do the instructions have 20 words or fewer, and the descriptions 25 words or fewer?

## Checker script

`scripts/ste-check.mjs` finds many violations of rules 4, 6, 7, 8, 9, and 11. Use it for long text, for example a plan or a pull request description. Run it from the skill folder:

```bash
node scripts/ste-check.mjs draft.md
```

The checker reads stdin if you give no file. In Windows PowerShell, give a file, because the pipe can change special characters, for example the em dash. The checker skips code blocks, blockquotes, and headings, and `--quotes` makes it check blockquotes too. It marks heuristic results with "(review)", and these results can be false. With `--strict`, the exit code is 1 if a result is not marked "(review)".
