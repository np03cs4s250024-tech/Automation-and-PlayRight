# Test Findings

## Failed Test: Leads list displays 12 leads

Judgement: my test is wrong

Reason: The assignment states that the database starts with 12 leads, but previous test runs created additional leads in the test environment.

## Failed Test: Search by lead name narrows the list

Judgement: my test is wrong

Reason: The test originally searched for Anita Lama, but that lead had already been deleted during testing, so the database contained no matching record.

## Failed Test: Search by company

Judgement: the application has a bug

Reason: The database contains leads with company HimalKart, but searching HimalKart returns no results because the backend search query only checks the name column.

## Failed Test: New lead appears with the selected status

Judgement: the application has a bug

Reason: The lead creation form allows a selected status, but the application saves the new lead with status New instead of the selected status.