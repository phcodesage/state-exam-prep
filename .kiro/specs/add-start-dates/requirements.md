# Requirements Document

## Introduction

This specification defines the requirements for adding missing start dates to the State Exam Review landing page. The landing page currently displays general schedule information (day of week and time) but lacks specific dates for individual class sessions. This enhancement will ensure users can clearly see when each review program begins and the specific dates for all sessions.

## Glossary

- **Landing_Page**: The State Exam Review program landing page component (App.tsx)
- **Hero_Section**: The top section of the landing page containing the main heading, exam date, and countdown timer
- **Schedule_Section**: The section displaying grade-specific class schedules with ELA and Math sessions
- **Grade_Group**: One of three student groupings: Grades 3-4, Grades 5-6, or Grades 7-8
- **Review_Session**: An individual class meeting for either ELA or Math
- **Program_Start_Date**: March 8, 2026 - the first day of review sessions
- **Exam_Date**: April 14, 2026 - the state exam date
- **ELA_Review**: English Language Arts review program (6 weeks duration)
- **Math_Review**: Mathematics review program (8 weeks duration)

## Requirements

### Requirement 1: Display Program Start Date in Hero Section

**User Story:** As a parent, I want to see the program start date prominently displayed in the hero section, so that I know when my student needs to begin attending classes.

#### Acceptance Criteria

1. THE Landing_Page SHALL display "March 8, 2026" as the program start date in the hero section
2. WHEN the hero section renders, THE Landing_Page SHALL format the start date consistently with the exam date format
3. THE Landing_Page SHALL display the start date text with appropriate visual emphasis (font weight and color)

### Requirement 2: Display Individual Session Dates in Schedule Cards

**User Story:** As a parent, I want to see the specific dates for each class session, so that I can plan my student's schedule and ensure they don't miss any sessions.

#### Acceptance Criteria

1. WHEN displaying ELA sessions for Grades 3-4, THE Schedule_Section SHALL show dates: March 8, 15, 22, 29 and April 5, 12
2. WHEN displaying Math sessions for Grades 3-4, THE Schedule_Section SHALL show dates: March 11, 18, 25, April 1, 8, 15, 22, 29
3. WHEN displaying ELA sessions for Grades 5-6, THE Schedule_Section SHALL show dates: March 9, 16, 23, 30 and April 7, 14
4. WHEN displaying Math sessions for Grades 5-6, THE Schedule_Section SHALL show dates: March 12, 19, 26, April 2, 9, 16, 23, 30
5. WHEN displaying ELA sessions for Grades 7-8, THE Schedule_Section SHALL show dates: March 8, 15, 22, 29 and April 5, 12
6. WHEN displaying Math sessions for Grades 7-8, THE Schedule_Section SHALL show dates: March 13, 20, 27, April 3, 10, 17, 24, and May 1

### Requirement 3: Format Session Dates for Readability

**User Story:** As a parent, I want the session dates to be easy to read and understand, so that I can quickly identify when classes occur.

#### Acceptance Criteria

1. WHEN displaying session dates, THE Schedule_Section SHALL format dates as "Month Day" (e.g., "March 8")
2. WHEN displaying multiple dates within the same month, THE Schedule_Section SHALL group them together separated by commas
3. WHEN displaying dates spanning multiple months, THE Schedule_Section SHALL separate month groups with a pipe character or line break
4. THE Schedule_Section SHALL display session dates in chronological order

### Requirement 4: Maintain Visual Consistency

**User Story:** As a user, I want the date information to fit naturally with the existing design, so that the page remains visually appealing and easy to navigate.

#### Acceptance Criteria

1. WHEN adding date information to schedule cards, THE Schedule_Section SHALL maintain the existing card layout and spacing
2. THE Schedule_Section SHALL use text colors that maintain sufficient contrast with card backgrounds
3. WHEN displaying dates, THE Schedule_Section SHALL use font sizes consistent with other secondary information in the cards
4. THE Schedule_Section SHALL ensure date information does not cause layout overflow or wrapping issues on mobile devices

### Requirement 5: Display Session Count Information

**User Story:** As a parent, I want to know how many sessions are included in each program, so that I understand the program duration and value.

#### Acceptance Criteria

1. WHEN displaying ELA sessions, THE Schedule_Section SHALL indicate "6 weeks" or "6 sessions" duration
2. WHEN displaying Math sessions, THE Schedule_Section SHALL indicate "8 weeks" or "8 sessions" duration
3. THE Schedule_Section SHALL display session count information near the subject heading or dates
