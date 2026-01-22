# Implementation Plan: Add Start Dates to Landing Page

## Overview

This implementation plan breaks down the work of adding start dates to the State Exam Review landing page into discrete, incremental steps. The approach focuses on defining data structures first, implementing helper functions, then updating the UI components to display the date information.

## Tasks

- [ ] 1. Define TypeScript interfaces and schedule data structure
  - Create SessionSchedule and GradeGroupSchedule interfaces at the top of App.tsx
  - Define the SCHEDULE_DATA constant array with all grade group schedules
  - Include all session dates for each grade group (Grades 3-4, 5-6, 7-8)
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6_

- [ ]* 1.1 Write unit tests for schedule data structure
  - Test that SCHEDULE_DATA contains all three grade groups
  - Test that each grade group has correct ELA and Math session counts
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6_

- [ ] 2. Implement formatDateList helper function
  - Create function that groups dates by month
  - Implement comma separation for dates within the same month
  - Implement pipe separator for dates spanning multiple months
  - Return formatted string in chronological order
  - _Requirements: 3.1, 3.2, 3.3, 3.4_

- [ ]* 2.1 Write property test for formatDateList
  - **Property 2: Date List Formatting**
  - **Validates: Requirements 3.2, 3.3**

- [ ]* 2.2 Write unit tests for formatDateList edge cases
  - Test single date formatting
  - Test multiple dates in same month
  - Test dates spanning two months
  - Test dates spanning three months (March, April, May)
  - _Requirements: 3.1, 3.2, 3.3_

- [ ] 3. Update hero section with full start date
  - Modify the "Reviews Start" text to display "March 8, 2026"
  - Ensure date format is consistent with exam date display
  - Maintain existing styling (font weight and color)
  - _Requirements: 1.1, 1.2_

- [ ]* 3.1 Write unit test for hero section start date
  - Test that "March 8, 2026" appears in hero section
  - _Requirements: 1.1_

- [ ] 4. Refactor schedule section to use SCHEDULE_DATA
  - Replace hardcoded schedule cards with data-driven rendering
  - Map over SCHEDULE_DATA array to generate grade group cards
  - Maintain existing card styling and layout
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6_

- [ ] 5. Add session dates and week count to schedule cards
  - [ ] 5.1 Add week count badge to each subject card
    - Display "{weekCount} weeks" in a small badge next to subject name
    - Style badge with bg-white/20, rounded corners, and small text
    - _Requirements: 5.1, 5.2_
  
  - [ ] 5.2 Add formatted date list below day/time information
    - Call formatDateList with session.dates
    - Display in small text with appropriate color (text-gray-300 for dark cards)
    - Add margin-top for spacing
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 3.1, 3.2, 3.3_

- [ ]* 5.3 Write property test for session count accuracy
  - **Property 4: Session Count Accuracy**
  - **Validates: Requirements 5.1, 5.2**

- [ ]* 5.4 Write unit tests for schedule card rendering
  - Test that all six schedule cards render (3 grade groups × 2 subjects)
  - Test that each card displays correct dates
  - Test that ELA shows "6 weeks" and Math shows "8 weeks"
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 5.1, 5.2_

- [ ] 6. Verify responsive layout and visual consistency
  - Test layout on mobile viewport (ensure no overflow)
  - Verify text colors maintain sufficient contrast
  - Ensure date information fits within existing card spacing
  - _Requirements: 4.1, 4.2, 4.3, 4.4_

- [ ] 7. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- The implementation follows a bottom-up approach: data structures → helper functions → UI updates
- Property tests validate universal correctness properties across all inputs
- Unit tests validate specific examples and edge cases
- The checkpoint ensures all functionality works correctly before completion
