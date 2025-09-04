---
title: "Email Newsletter Management"
description: "Efficiently manage email newsletters by summarizing recent emails and allowing selective deletion based on content."
tags: ["productivity", "email", "newsletter", "automation"]
tool: "claude"
example_output: |
  Newsletter summaries show key topics and allow bulk deletion decisions...
---

# Email Management Process: Summarize and Curate

## Objective
Help users efficiently manage their email inbox by summarizing recent emails with a specific label, then allowing them to selectively keep or delete emails based on the summaries.

## Process Steps

### 1. Search for Recent Emails
- Use `GMail:search_emails` to find the most recent emails with the specified label
- Set `maxResults` to retrieve enough emails to get the desired number (typically 5-8 to account for any issues)
- Use search query format: `label:[LABEL_NAME]`

### 2. Read and Summarize Each Email
- Use `GMail:read_email` for each message ID retrieved
- Create concise but informative summaries that include:
  - **Main topic/subject matter**
  - **Key points or highlights** (3-4 bullet points max)
  - **Important details** (dates, numbers, names, actionable items)
  - **Source/sender** for context

### 3. Present Summaries to User
- Number each email clearly (1, 2, 3, etc.)
- Include the full subject line and sender
- Format summaries for easy scanning
- Keep each summary to 2-4 sentences with bullet points for key details

### 4. Get User Preferences
- Ask the user which emails they want to keep
- Allow for multiple selection methods:
  - "Keep emails 1 and 3, delete the rest"
  - "Delete all except email 2" 
  - "Keep email 4 only"
  - "Delete emails 1, 3, and 5"

### 5. Execute User Decisions
- For emails to **keep**: Leave unchanged (no action needed)
- For emails to **delete**: Use `GMail:modify_email` to:
  - Add `["TRASH"]` to `addLabelIds`
  - Remove `["INBOX"]` from `removeLabelIds` (if present)

### 6. Confirm Actions
- Clearly summarize what was kept vs. deleted
- Use checkmarks (✅) for kept emails
- Use trash icons (🗑️) for deleted emails
- Provide message IDs or subjects for confirmation

## Example Usage

```
User: "Can you summarize the last 5 emails with the Newsletter label and let me choose which to keep?"

Assistant Response:
1. Searches for recent Newsletter emails
2. Reads and summarizes each one
3. Presents numbered list with summaries
4. Asks: "Which newsletters would you like to keep? I can delete the others."
5. User responds: "Keep 1 and 4, delete the rest"
6. Assistant moves emails 2, 3, and 5 to trash
7. Confirms: "✅ Kept newsletters 1 & 4, 🗑️ Moved newsletters 2, 3 & 5 to trash"
```

## Template Response Format

**Newsletter [X]: "[Subject]" by [Sender]**

**Summary:** Brief overview of main content

**Key Points:**
- Important detail 1
- Important detail 2  
- Important detail 3

---

*After all summaries:*
"Which newsletters would you like to keep? I can move the others to trash."

## Error Handling

- **Empty emails**: Skip and note in summary
- **Permission errors**: Explain limitations (e.g., can't permanently delete, only move to trash)
- **Missing content**: Indicate minimal content and ask if user still wants to keep
- **Large volumes**: Offer to process in batches if more than 10 emails

## Benefits

- **Time-saving**: Quick overview without opening each email
- **Informed decisions**: Summaries provide enough context to decide
- **Bulk actions**: Handle multiple emails efficiently
- **Reversible**: Items moved to trash can be recovered
- **Customizable**: Works with any Gmail label