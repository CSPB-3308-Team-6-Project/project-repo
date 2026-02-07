# User Story Document

_From Professor Guinn:_

**Here are your team's stories:**

1. > Story 2

- > As a developer, I want to write a simple Python function and test it with multiple inputs, so that I can verify correct behavior before integrating it into a larger program.

2. > Story 11

- > As a developer, I want to write a basic SQL INSERT statement to add rows to a table, so that new data can be stored in the database.

3. > Story 18

- > As a team member, I want to discuss and agree on acceptance criteria for a Python-based task, so that everyone has a shared understanding of what “done” means.


> Here's a typical output (to give you a sense of scale of how much to write):

**User Story**

> As a user, I want the script to skip downloads if the file already exists so that time is saved.

**Effort Level**

> 3

**Acceptance Criteria**

- > Given the correct year and game ID directory already exists
- > When the HTML file is already present
- > Then the script does not download the file again
- > And the script prints “file already exists, skipping download”
  
- > Given the file does not exist
- > When the script runs
- > Then the file is downloaded successfully
- > And the file appears in the correct directory

- > Given the download fails
- > When the script attempts the download
- > Then an error message is printed
- > And the script exits with a non-zero status code