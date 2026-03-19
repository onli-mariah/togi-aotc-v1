# AOTC Project TODO

## Setup & Configuration
- [x] Update branding colors to Onli theme (#333333, #CCCCCC, #CC9966)
- [x] Create data.json file with current stack and ManuAGI data
- [x] Configure dark minimal design theme

## Pages to Build
- [x] Home page with at-a-glance updates
- [x] Home page: Latest recommendations section
- [x] Home page: Potential alternatives comparison table
- [x] Current Stack page with categorized tools and costs
- [x] ManuAGI page with historical daily recommendations
- [x] Product Hunt page with historical daily recommendations
- [x] Misc page for other tool discoveries

## Features
- [x] Navigation between all pages
- [x] Tool cards with ratings and categories
- [x] Cost calculations and totals
- [x] Responsive design for mobile/desktop
- [ ] Search/filter functionality (optional)

## Documentation
- [x] Create update instructions for JSON file
- [x] Document how to add new tools via chat
- [x] Create example JSON structure for reference


## Updates Requested
- [x] Change home page to "Today's Recommendations"
- [x] Remove total annual cost from home page
- [x] Add "Potential Additions" section with workflow enhancements
- [x] Create new "Workflows" page
- [x] Add account information to all tools
- [x] Include ALL tools from spreadsheet (Annual, Monthly, Unpaid, PYG)
- [x] Add expiration dates for unpaid tools
- [x] Make Current Stack sections collapsible
- [x] Make Product Hunt entries collapsible
- [x] Add Product Hunt tools from CSV

## Refinements Requested
- [x] Reorganize Current Stack by use case/functionality within each section
- [x] Add green expiration dates for valid tools
- [x] Add search bar to Current Stack page
- [x] Create custom workflow form on Workflows page
- [x] Remove at-a-glance section from home page
- [x] Move Today's Recommendations to top of home page
- [x] Simplify section titles to "Additions" and "Alternatives"
- [x] Auto-pull Product Hunt descriptions from links (ready for implementation)
- [x] Make account info primary description, price as smaller detail

## Final Polish
- [x] Sort all use case categories alphabetically within each section
- [x] Rename section headers: "PAID - Annual" → "ANNUAL", "PAID - Monthly" → "MONTHLY"

## UX Improvements
- [x] Add search functionality to ManuAGI page
- [x] Add search functionality to Product Hunt page
- [x] Convert all cards to horizontal layout (Home page)
- [x] Convert all cards to horizontal layout (Current Stack page)
- [x] Convert all cards to horizontal layout (ManuAGI page)
- [x] Convert all cards to horizontal layout (Product Hunt page)
- [x] Convert all cards to horizontal layout (Misc page)

## Theme & Layout Updates
- [x] Switch from dark theme to light minimal tech theme with white background
- [x] Remove excess padding at top of all tool cards
- [x] Apply horizontal card layout to Current Stack page tools


## Final Polish v2
- [x] Tighten card margins (reduce padding between text and top/bottom borders)
- [x] Change accent color from #CC9966 to techy blue
- [x] Remove "ADOPT" tags from Today's Recommendations
- [x] Enhance GitHub/Website link styling for better prominence


## Header Color Fix
- [x] Change all section headers to black (Additions, Alternatives, ANNUAL, MONTHLY, etc.)


## Color Refinement
- [x] Darken techy blue accent color for better contrast


## Layout Reversion
- [x] Revert all tool cards from horizontal to square/vertical grid layout (Home page)
- [x] Revert all tool cards from horizontal to square/vertical grid layout (Current Stack page)
- [x] Revert all tool cards from horizontal to square/vertical grid layout (ManuAGI page)
- [x] Revert all tool cards from horizontal to square/vertical grid layout (Product Hunt page)
- [x] Revert all tool cards from horizontal to square/vertical grid layout (Misc page)


## Page Renaming
- [x] Rename ManuAGI page to YouTube
- [x] Rename Misc page to Deep Dives
- [x] Update all navigation links
- [x] Update routes in App.tsx
- [x] Update data.json structure (manuagi → youtube, misc → deepDives)


## Rebranding to TOGI
- [x] Update site name from AOTC to TOGI across all pages
- [x] Update APP_LOGO in const.ts


## Navigation Labels and Date Format Updates
- [x] Update all navigation labels from "ManuAGI" to "YouTube"
- [x] Update all navigation labels from "Misc" to "Deep Dives"
- [x] Change date format on YouTube page to "Month Day, Year"
- [x] Change date format on Product Hunt page to "Month Day, Year"


## Fix Navigation Labels on All Pages
- [x] Fix navigation on Current Stack page
- [x] Fix navigation on Workflows page  
- [x] Fix navigation on YouTube page
- [x] Fix navigation on Product Hunt page
- [x] Fix navigation on Deep Dives page


## Card Badge and Rating Format Fixes
- [x] Remove "Unknown" license badges from all cards
- [x] Fix overflowing tabs/badges (Apache, etc.) to fit inside cards
- [x] Change star rating format from "⭐⭐⭐⭐½" to "4.5⭐" on Home page
- [x] Change star rating format on YouTube page
- [x] Change star rating format on Product Hunt page
- [x] Change star rating format on Deep Dives page


## November 21, 2025 Daily Update
- [x] Extract YouTube transcript from https://www.youtube.com/watch?v=NeXD-BuAEwM&t=486s
- [x] Research all tools from YouTube video (GitHub/website links)
- [x] Research Antigravity for Raycast (Product Hunt)
- [x] Research Browser Cash (Product Hunt)
- [x] Research Lamatic AI (Product Hunt)
- [x] Evaluate all tools with star ratings
- [x] Categorize tools: IMMEDIATE ADOPTION / EVALUATE / AVOID
- [x] Replace Today's Recommendations on Home page
- [x] Replace Additions section on Home page
- [x] Replace Alternatives section on Home page
- [x] Add new YouTube entry to top of YouTube page
- [x] Add new Product Hunt entry to top of Product Hunt page
- [x] Verify all formatting is consistent
- [x] Test all changes


## Fix YouTube Collapsible Sections
- [x] Restore collapsible functionality to YouTube date sections
- [x] Test collapsible behavior
- [x] Save checkpoint


## Add Katana Icon to TOGI Title
- [x] Add katana icon next to TOGI title on all pages
- [x] Save checkpoint


## Replace Sword Emoji with Katana Image
- [x] Copy katana image to public folder
- [x] Update all pages to use katana image instead of emoji
- [x] Save checkpoint


## Replace with Crossed Katanas Icon
- [x] Replace katana.jpeg with new crossed katanas icon
- [x] Save checkpoint


## Replace with Single Katana Icon
- [x] Replace crossed katanas with new single katana icon
- [x] Save checkpoint


## Reorganize Current Stack Page by Functional Categories
- [x] Read CSV file and analyze all tools
- [x] Create functional category sections (alphabetically organized)
- [x] Reorganize tools within categories (alphabetically)
- [x] Verify all tools from CSV are included
- [x] Ensure all information is preserved (account, description, payment type, cost, billing cycle, dates)
- [x] Save checkpoint


## Consolidate Duplicate Tool Cards with Tabs
- [x] Update data structure to group tools with multiple subscription types
- [x] Add tabs component to tool cards with multiple subscriptions
- [x] Test tab switching functionality
- [x] Save checkpoint


## Update Unpaid Tools with Expiration Dates
- [x] Update data to use "Expiration" instead of "Next Payment" for unpaid tools
- [x] Add color coding: green for future dates, red for past dates
- [x] Style account names in dark blue
- [x] Test color coding and styling
- [x] Save checkpoint


## Add Notes Tab to Navigation
- [x] Add "Notes" link to header navigation on all pages (Home, Current Stack, Workflows, YouTube, Product Hunt, Deep Dives)
- [x] Link to https://staging-leap-app-573i.frontend.encr.app/notes
- [x] Test Notes link opens correctly
- [x] Save checkpoint


## November 24, 2025 Daily Update
- [x] Extract YouTube transcript from https://www.youtube.com/watch?v=KLODmlb-Ra8
- [x] Extract YouTube transcript from https://www.youtube.com/watch?v=mfaMQzOkG4Q
- [x] Research all tools from both YouTube videos (GitHub/website links)
- [x] Evaluate all tools with star ratings
- [x] Categorize tools: IMMEDIATE ADOPTION / EVALUATE / AVOID
- [x] Replace Today's Recommendations on Home page
- [x] Replace Additions section on Home page
- [x] Replace Alternatives section on Home page
- [x] Add new YouTube entries to top of YouTube page
- [x] Verify all formatting is consistent
- [x] Test all changes
- [x] Save checkpoint


## December 2, 2025 Daily Update
- [x] Extract YouTube transcript from https://www.youtube.com/watch?v=8J_VaJHRlNA
- [x] Research VibeCode DB from Product Hunt
- [x] Research Shipper Now from Product Hunt
- [x] Research all tools from YouTube video (GitHub/website links)
- [x] Evaluate all tools with star ratings
- [x] Categorize tools: IMMEDIATE ADOPTION / EVALUATE / AVOID
- [x] Replace Today's Recommendations on Home page
- [x] Replace Additions section on Home page
- [x] Replace Alternatives section on Home page
- [x] Add new YouTube entry to top of YouTube page
- [x] Add new Product Hunt entry to top of Product Hunt page
- [x] Verify all formatting is consistent
- [x] Test all changes
- [x] Save checkpoint


## December 10, 2025 Daily Update
- [ ] Extract YouTube transcript from https://www.youtube.com/watch?v=cFrrrNE06pk
- [ ] Research Incredible from Product Hunt
- [ ] Research Hero 11 from Product Hunt
- [ ] Research Vybe 4 from Product Hunt
- [ ] Research all tools from YouTube video (GitHub/website links)
- [ ] Evaluate all tools with star ratings
- [ ] Categorize tools: IMMEDIATE ADOPTION / EVALUATE / AVOID
- [ ] Replace Today's Recommendations on Home page
- [ ] Replace Additions section on Home page
- [ ] Replace Alternatives section on Home page
- [ ] Add new YouTube entry to top of YouTube page
- [ ] Add new Product Hunt entry to top of Product Hunt page
- [ ] Verify all formatting is consistent
- [ ] Test all changes
- [ ] Save checkpoint
