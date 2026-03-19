# AOTC Update Instructions

## How to Update the Website

You have **three easy ways** to update AOTC:

### Option 1: Chat Updates (Recommended - Fastest)

Just paste content directly in this chat:

**For ManuAGI YouTube videos:**
```
Add this ManuAGI video: https://www.youtube.com/watch?v=XXXXX
```

**For Product Hunt tools:**
```
Add these Product Hunt tools:
- https://www.producthunt.com/posts/tool-name-1
- https://www.producthunt.com/posts/tool-name-2
```

**For Current Stack changes:**
```
Update Current Stack:
- Add: New Tool Name, $50/mo, AI Development category
- Remove: Old Tool Name
- Update: Tool Name cost from $20/mo to $30/mo
```

**For Misc discoveries:**
```
Add to Misc from GitHub:
- https://github.com/username/repo-name
```

I'll analyze the tools, categorize them (IMMEDIATE ADOPTION / EVALUATE / AVOID), and update the website automatically.

---

### Option 2: Google Sheets Sync

When you update your Google Sheet:
1. Download as CSV
2. Upload the CSV file in this chat
3. Say "Update current stack from CSV"

I'll recategorize and update the Current Stack page.

---

### Option 3: Direct JSON Editing (Advanced)

**File location:** `/home/ubuntu/aotc/client/src/data.json`

#### Adding a New ManuAGI Video

```json
{
  "date": "2025-11-21",
  "videoUrl": "https://www.youtube.com/watch?v=XXXXX",
  "videoTitle": "Video Title Here",
  "tools": [
    {
      "name": "Tool Name",
      "rating": "⭐⭐⭐⭐",
      "category": "IMMEDIATE ADOPTION",
      "description": "What it does in plain English",
      "businessValue": "Why it matters for business",
      "githubUrl": "https://github.com/...",
      "websiteUrl": "https://...",
      "stars": "10k",
      "license": "MIT",
      "redFlags": "None"
    }
  ]
}
```

#### Adding Product Hunt Tools

```json
{
  "date": "2025-11-21",
  "tools": [
    {
      "name": "Tool Name",
      "rating": "⭐⭐⭐⭐",
      "category": "EVALUATE",
      "description": "What it does",
      "businessValue": "Business impact",
      "productHuntUrl": "https://www.producthunt.com/posts/...",
      "websiteUrl": "https://...",
      "pricing": "Free / $29/mo",
      "redFlags": "None"
    }
  ]
}
```

#### Updating Current Stack

```json
{
  "category": "AI Development & Code",
  "tools": [
    {
      "name": "Cursor",
      "description": "Smart code editor",
      "cost": "$192/year",
      "url": "https://cursor.sh",
      "notes": "Optional notes"
    }
  ]
}
```

---

## Categories Explained

- **IMMEDIATE ADOPTION** ⭐⭐⭐⭐+: Stable, low-risk, production-ready
- **EVALUATE** ⭐⭐⭐½+: Promising but needs assessment
- **AVOID** ⭐⭐⭐ or less: Significant risks (ToS violations, abandoned, etc.)

---

## Current Stack Categories

1. AI Development & Code
2. Large Language Models
3. Cloud Infrastructure
4. Image Generation & Design
5. Video & Audio
6. Productivity & Documentation

Add new categories as needed by creating a new category object in the JSON.

---

## Quick Reference

**Website URL:** Check the Preview panel in the Management UI

**Data File:** `/home/ubuntu/aotc/client/src/data.json`

**Branding Colors:**
- Background: #333333 (dark)
- Text: #CCCCCC (light gray)
- Accent: #CC9966 (copper/gold)

---

## Need Help?

Just ask in this chat:
- "Add this YouTube video: [URL]"
- "Update cost for [Tool Name] to $X/mo"
- "Remove [Tool Name] from current stack"
- "Add [Tool Name] to Misc from [URL]"

I'll handle the analysis, categorization, and deployment automatically!
