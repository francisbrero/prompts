const fs = require('fs-extra');
const path = require('path');
const matter = require('gray-matter');
const glob = require('glob');
let chalk;

(async () => {
  chalk = (await import('chalk')).default;

  const ROOTS = ['prompts', 'rules', 'workflows'];
  const REQUIRED_KEYS = ['title', 'description', 'tags', 'tool', 'example_output'];
  const ALLOWED_TOOLS = ['chatgpt', 'cursor', 'claude', 'openai', 'custom'];
  const KEBAB_CASE = /^[a-z0-9]+(-[a-z0-9]+)*$/;

  function isKebabCase(str) {
    return KEBAB_CASE.test(str);
  }

  function validateFrontMatter(fm, file, errors) {
    // All required keys present
    for (const key of REQUIRED_KEYS) {
      if (!(key in fm)) {
        errors.push(`Missing required key '${key}' in front-matter.`);
      }
    }
    // No extra keys
    for (const key of Object.keys(fm)) {
      if (!REQUIRED_KEYS.includes(key)) {
        errors.push(`Extra key '${key}' in front-matter.`);
      }
    }
    // Tags: array, <=5, kebab-case
    if (!Array.isArray(fm.tags)) {
      errors.push(`'tags' must be an array.`);
    } else {
      if (fm.tags.length > 5) errors.push(`'tags' must have 5 or fewer items.`);
      for (const tag of fm.tags) {
        if (!isKebabCase(tag)) errors.push(`Tag '${tag}' is not kebab-case.`);
      }
    }
    // Tool: allowed values
    if (!ALLOWED_TOOLS.includes(fm.tool)) {
      errors.push(`'tool' must be one of ${ALLOWED_TOOLS.join(', ')}.`);
    }
  }

  function validateFile(file) {
    const errors = [];
    const rel = path.relative(process.cwd(), file);
    // Filename: kebab-case, .md
    const base = path.basename(file);
    if (!base.endsWith('.md')) errors.push('File does not have .md extension.');
    if (!isKebabCase(base.replace(/\.md$/, ''))) errors.push('Filename is not kebab-case.');
    // Folder: must be in /prompts|rules|workflows/category/
    const parts = rel.split(path.sep);
    if (!ROOTS.includes(parts[0]) || parts.length < 3) {
      errors.push('File must be in /prompts|rules|workflows/<category>/');
    }
    // Parse front-matter
    const raw = fs.readFileSync(file, 'utf8');
    const { data, content } = matter(raw);
    validateFrontMatter(data, file, errors);
    // Markdown body: non-empty
    if (!content.trim()) errors.push('Markdown body is empty.');
    return errors;
  }

  let hasError = false;
  for (const root of ROOTS) {
    const files = glob.sync(`${root}/**/*.md`);
    for (const file of files) {
      const errors = validateFile(file);
      if (errors.length) {
        hasError = true;
        console.log(chalk.red(`\n❌ ${file}`));
        for (const err of errors) {
          console.log(chalk.yellow('  - ' + err));
        }
      }
    }
  }
  if (!hasError) {
    console.log(chalk.green('All markdown files passed validation!'));
    process.exit(0);
  } else {
    process.exit(1);
  }
})(); 