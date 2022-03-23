mjml-hook
=========

A simple wrapper around the [`mjml`](https://github.com/mjmlio/mjml) tool to use as a [`pre-commit`](https://pre-commit.com) hook.

### Using mjml-hook with pre-commit

Add this to your `.pre-commit-config.yaml`

```yaml
-   repo: https://github.com/mattkram/mjml-hook
    rev: main  # Use the ref you want to point at
    hooks:
    -   id: mjml
```

### What does the hook do?

The pre-commit hook will execute any time a file with the pattern `*.mjml` is staged for commit.
For each of these files, the following command is run:

```shell
mjml <filename>.mjml -o <filename>.html
```

where the base filename remains the same, and the extension is changed.

If the HTML file is already being tracked by `git` and is changed by the hook, `pre-commit` will raise an error.
If this is a new template, `pre-commit` will not fail and you may need to do an amend commit to add the initial HTML file to the `git` history.

```shell
git commit --amend path/to/file.html
```
