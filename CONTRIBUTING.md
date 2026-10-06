# Contributing

This list is **generated**, not hand-maintained. Nothing in `README.md` or `.github/scripts/listings.json`
is edited by a person — a workflow rewrites both from [Understudy](https://understudy.live)'s crawl every few
hours. So a pull request that adds a row will be overwritten by the next run, and that is not a reflection on
the role you added.

What *does* work:

## 🏢 A company is missing

Open an **[Add a company board](https://github.com/Keugene11/Summer-2027-Tech-Internships/issues/new?template=add-board.yml)** issue with
a link to their job board. If Understudy can read that board, it joins the crawl and every Summer 2027 tech internship they post
from then on appears here by itself — this time and every time, which a single merged row would not do.

Boards that can be read today: **Greenhouse, Lever, Ashby, Workable, SmartRecruiters, Recruitee, Rippling and
Workday.** A careers page built by hand is usually not readable; a link to the underlying board is.

## 🏷️ A role is in the wrong section, or shouldn't be here

Open a **[Wrong classification](https://github.com/Keugene11/Summer-2027-Tech-Internships/issues/new?template=wrong-section.yml)** issue.
Roles are sorted by title, which gets things wrong at the edges — a systems engineering role at a defence
contractor is genuinely ambiguous, and "Analytics" could be either. Reports are how the rules get better, and
the rules live in `src/lib/lists/roles.ts` in the Understudy repo.

## 🔗 A link is dead

Postings disappear when the employer's board stops listing them, usually within a few hours. If a link is
dead *and* the role is still on the company's board, that is a bug worth an issue.

## 💻 The code

The generator is in the [Understudy](https://github.com/Keugene11/understudy) repo:

| What | Where |
| --- | --- |
| Which roles qualify, and their category | `src/lib/lists/roles.ts` |
| Rendering this README and `listings.json` | `src/lib/lists/build.ts` |
| The endpoint this repo refreshes from | `src/app/api/lists/route.ts` |
| The guards that stop a bad refresh publishing | `.github/scripts/apply.mjs` (here) |

## 🙏 Also

Looking for new grad and entry-level jobs? → [New-Grad-Tech-Jobs](https://github.com/Keugene11/New-Grad-Tech-Jobs)
