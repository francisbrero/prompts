---
title: "Push to GitHub"
description: "Use this rule when asked to push updates to github"
tags: ["github", "git", "workflow"]
tool: "cursor"
example_output: |
  Successfully pushed changes to GitHub with proper branch management and pull request creation...
---
When you are asked to push to github, you should:

0. Verify that the build is passing (if any is defined).
1. Check all the changes you have made.
2. Create a new branch with a name that is related to the changes you have made.
3. Add all the changes you have made to the new branch.
4. Create a commit message that is related to the changes you have made.
5. Push the changes to the new branch.
6. Create a pull request to the master branch and add a thorough description of the changes you have made.
7. Share a link to the pull request with the user.

# Handling conflicts

If you are asked to push to github and there are conflicts, you should use the instructions in https://docs.cursor.com/more/ai-merge-conflicts

