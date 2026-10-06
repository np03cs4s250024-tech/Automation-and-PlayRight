# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: login.spec.ts >> valid agent can sign in and see their role
- Location: tests\login.spec.ts:19:5

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText(/agent/i)
Expected: visible
Error: strict mode violation: getByText(/agent/i) resolved to 2 elements:
    1) <span class="who" data-testid="nav-user">agent.qrius</span> aka getByTestId('nav-user')
    2) <span class="role" data-testid="nav-role">AGENT</span> aka getByTestId('nav-role')

Call log:
  - Expect "toBeVisible" getByText(/agent/i) with timeout 5000ms
  - waiting for getByText(/agent/i)

```

# Page snapshot

```yaml
- generic [ref=e2]:
  - generic [ref=e3]:
    - img "Qrius" [ref=e4]
    - strong [ref=e5]: Lead Manager
    - generic [ref=e6]: agent.qrius
    - generic [ref=e7]: AGENT
    - button "Log out" [ref=e8] [cursor=pointer]
  - generic [ref=e9]:
    - heading "Leads" [level=1] [ref=e10]
    - generic [ref=e11]:
      - textbox [ref=e12]
      - button "Add lead" [ref=e13] [cursor=pointer]
      - generic [ref=e14]: Showing 24 of 24 leads
    - table [ref=e15]:
      - rowgroup [ref=e16]:
        - row [ref=e17]:
          - columnheader "Name" [ref=e18]
          - columnheader "Email" [ref=e19]
          - columnheader "Company" [ref=e20]
          - columnheader "Status" [ref=e21]
          - columnheader "Actions" [ref=e22]
      - rowgroup [ref=e23]:
        - row [ref=e24]:
          - cell "Sita Sharma" [ref=e25]
          - cell "sita@himalkart.com.np" [ref=e26]
          - cell "HimalKart" [ref=e27]
          - cell "New" [ref=e28]
          - cell [ref=e29]:
            - button "Edit" [ref=e31] [cursor=pointer]
        - row [ref=e32]:
          - cell "Ram Thapa" [ref=e33]
          - cell "ram@sajha.coop" [ref=e34]
          - cell "Sajha Yatayat" [ref=e35]
          - cell "Contacted" [ref=e36]
          - cell [ref=e37]:
            - button "Edit" [ref=e39] [cursor=pointer]
        - row [ref=e40]:
          - cell "Gita Rai" [ref=e41]
          - cell "gita@everesto.com.np" [ref=e42]
          - cell "Everest Organics" [ref=e43]
          - cell "Qualified" [ref=e44]
          - cell [ref=e45]:
            - button "Edit" [ref=e47] [cursor=pointer]
        - row [ref=e48]:
          - cell "Hari Koirala" [ref=e49]
          - cell "hari@khanepani.gov.np" [ref=e50]
          - cell "Khanepani" [ref=e51]
          - cell "New" [ref=e52]
          - cell [ref=e53]:
            - button "Edit" [ref=e55] [cursor=pointer]
        - row [ref=e56]:
          - cell "Mina Gurung" [ref=e57]
          - cell "mina@yetiair.com.np" [ref=e58]
          - cell "Yeti Airlines" [ref=e59]
          - cell "Contacted" [ref=e60]
          - cell [ref=e61]:
            - button "Edit" [ref=e63] [cursor=pointer]
        - row [ref=e64]:
          - cell "Bikash Shrestha" [ref=e65]
          - cell "bikash@daraz.com.np" [ref=e66]
          - cell "Daraz Nepal" [ref=e67]
          - cell "New" [ref=e68]
          - cell [ref=e69]:
            - button "Edit" [ref=e71] [cursor=pointer]
        - row [ref=e72]:
          - cell "Anita Lama" [ref=e73]
          - cell "anita@ncell.com.np" [ref=e74]
          - cell "Ncell" [ref=e75]
          - cell "Lost" [ref=e76]
          - cell [ref=e77]:
            - button "Edit" [ref=e79] [cursor=pointer]
        - row [ref=e80]:
          - cell "Suman Adhikari" [ref=e81]
          - cell "suman@fonepay.com" [ref=e82]
          - cell "Fonepay" [ref=e83]
          - cell "Qualified" [ref=e84]
          - cell [ref=e85]:
            - button "Edit" [ref=e87] [cursor=pointer]
        - row [ref=e88]:
          - cell "Pooja Bhattarai" [ref=e89]
          - cell "pooja@khalti.com" [ref=e90]
          - cell "Khalti" [ref=e91]
          - cell "New" [ref=e92]
          - cell [ref=e93]:
            - button "Edit" [ref=e95] [cursor=pointer]
        - row [ref=e96]:
          - cell "Dipak Karki" [ref=e97]
          - cell "dipak@esewa.com.np" [ref=e98]
          - cell "eSewa" [ref=e99]
          - cell "Contacted" [ref=e100]
          - cell [ref=e101]:
            - button "Edit" [ref=e103] [cursor=pointer]
        - row [ref=e104]:
          - cell "Rekha Magar" [ref=e105]
          - cell "rekha@worldlink.com.np" [ref=e106]
          - cell "WorldLink" [ref=e107]
          - cell "New" [ref=e108]
          - cell [ref=e109]:
            - button "Edit" [ref=e111] [cursor=pointer]
        - row [ref=e112]:
          - cell "Nabin Joshi" [ref=e113]
          - cell "nabin@f1soft.com" [ref=e114]
          - cell "F1Soft" [ref=e115]
          - cell "Qualified" [ref=e116]
          - cell [ref=e117]:
            - button "Edit" [ref=e119] [cursor=pointer]
        - row [ref=e120]:
          - cell "Sita Sharma" [ref=e121]
          - cell "sita@himalkart.com.np" [ref=e122]
          - cell "HimalKart" [ref=e123]
          - cell "New" [ref=e124]
          - cell [ref=e125]:
            - button "Edit" [ref=e127] [cursor=pointer]
        - row [ref=e128]:
          - cell "Ram Thapa" [ref=e129]
          - cell "ram@sajha.coop" [ref=e130]
          - cell "Sajha Yatayat" [ref=e131]
          - cell "Contacted" [ref=e132]
          - cell [ref=e133]:
            - button "Edit" [ref=e135] [cursor=pointer]
        - row [ref=e136]:
          - cell "Gita Rai" [ref=e137]
          - cell "gita@everesto.com.np" [ref=e138]
          - cell "Everest Organics" [ref=e139]
          - cell "Qualified" [ref=e140]
          - cell [ref=e141]:
            - button "Edit" [ref=e143] [cursor=pointer]
        - row [ref=e144]:
          - cell "Hari Koirala" [ref=e145]
          - cell "hari@khanepani.gov.np" [ref=e146]
          - cell "Khanepani" [ref=e147]
          - cell "New" [ref=e148]
          - cell [ref=e149]:
            - button "Edit" [ref=e151] [cursor=pointer]
        - row [ref=e152]:
          - cell "Mina Gurung" [ref=e153]
          - cell "mina@yetiair.com.np" [ref=e154]
          - cell "Yeti Airlines" [ref=e155]
          - cell "Contacted" [ref=e156]
          - cell [ref=e157]:
            - button "Edit" [ref=e159] [cursor=pointer]
        - row [ref=e160]:
          - cell "Bikash Shrestha" [ref=e161]
          - cell "bikash@daraz.com.np" [ref=e162]
          - cell "Daraz Nepal" [ref=e163]
          - cell "New" [ref=e164]
          - cell [ref=e165]:
            - button "Edit" [ref=e167] [cursor=pointer]
        - row [ref=e168]:
          - cell "Anita Lama" [ref=e169]
          - cell "anita@ncell.com.np" [ref=e170]
          - cell "Ncell" [ref=e171]
          - cell "Lost" [ref=e172]
          - cell [ref=e173]:
            - button "Edit" [ref=e175] [cursor=pointer]
        - row [ref=e176]:
          - cell "Suman Adhikari" [ref=e177]
          - cell "suman@fonepay.com" [ref=e178]
          - cell "Fonepay" [ref=e179]
          - cell "Qualified" [ref=e180]
          - cell [ref=e181]:
            - button "Edit" [ref=e183] [cursor=pointer]
        - row [ref=e184]:
          - cell "Pooja Bhattarai" [ref=e185]
          - cell "pooja@khalti.com" [ref=e186]
          - cell "Khalti" [ref=e187]
          - cell "New" [ref=e188]
          - cell [ref=e189]:
            - button "Edit" [ref=e191] [cursor=pointer]
        - row [ref=e192]:
          - cell "Dipak Karki" [ref=e193]
          - cell "dipak@esewa.com.np" [ref=e194]
          - cell "eSewa" [ref=e195]
          - cell "Contacted" [ref=e196]
          - cell [ref=e197]:
            - button "Edit" [ref=e199] [cursor=pointer]
        - row [ref=e200]:
          - cell "Rekha Magar" [ref=e201]
          - cell "rekha@worldlink.com.np" [ref=e202]
          - cell "WorldLink" [ref=e203]
          - cell "New" [ref=e204]
          - cell [ref=e205]:
            - button "Edit" [ref=e207] [cursor=pointer]
        - row [ref=e208]:
          - cell "Nabin Joshi" [ref=e209]
          - cell "nabin@f1soft.com" [ref=e210]
          - cell "F1Soft" [ref=e211]
          - cell "Qualified" [ref=e212]
          - cell [ref=e213]:
            - button "Edit" [ref=e215] [cursor=pointer]
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test('login page has the correct title', async ({ page }) => {
  4  |   await page.goto('/login');
  5  | 
  6  |   await expect(page).toHaveTitle(/Qrius Lead Manager/i);
  7  | });
  8  | 
  9  | test('valid admin can sign in and reach the Leads page', async ({ page }) => {
  10 |   await page.goto('/login');
  11 | 
  12 |   await page.getByTestId('username').fill('admin.qrius');
  13 |   await page.getByTestId('password').fill('Admin@123');
  14 |   await page.getByTestId('login-button').click();
  15 | 
  16 |   await expect(page).toHaveURL(/leads/i);
  17 | });
  18 | 
  19 | test('valid agent can sign in and see their role', async ({ page }) => {
  20 |   await page.goto('/login');
  21 | 
  22 |   await page.getByTestId('username').fill('agent.qrius');
  23 |   await page.getByTestId('password').fill('Agent@123');
  24 |   await page.getByTestId('login-button').click();
  25 | 
  26 |   await expect(page).toHaveURL(/leads/i);
> 27 |   await expect(page.getByText(/agent/i)).toBeVisible();
     |                                          ^ Error: expect(locator).toBeVisible() failed
  28 | });
  29 | 
  30 | test('wrong password shows an error and stays on login page', async ({ page }) => {
  31 |   await page.goto('/login');
  32 | 
  33 |   await page.getByTestId('username').fill('admin.qrius');
  34 |   await page.getByTestId('password').fill('WrongPassword');
  35 |   await page.getByTestId('login-button').click();
  36 | 
  37 |   await expect(page).toHaveURL(/login/i);
  38 |   await expect(page.getByText(/invalid|incorrect|wrong|error/i)).toBeVisible();
  39 | });
  40 | 
  41 | 
```