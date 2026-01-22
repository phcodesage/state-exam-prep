# Design Document: Add Start Dates to Landing Page

## Overview

This design specifies the implementation for adding missing start dates to the State Exam Review landing page. The enhancement will improve user experience by providing clear, specific date information for the program start and individual class sessions across all grade groups.

The implementation involves:
1. Updating the hero section to display the full program start date (March 8, 2026)
2. Adding specific session dates to each schedule card for all grade groups
3. Including session count information (6 weeks for ELA, 8 weeks for Math)
4. Maintaining visual consistency with the existing design system

## Architecture

The landing page is a single-page React application built with TypeScript and Tailwind CSS. The architecture follows a component-based structure:

```
App.tsx (Main Component)
├── Hero Section
│   ├── Title and description
│   ├── Program start date display
│   ├── Countdown timer
│   └── CTA buttons
├── Overview Section (Why Join)
├── Schedule Section
│   ├── Grades 3-4 Card
│   │   ├── ELA schedule with dates
│   │   └── Math schedule with dates
│   ├── Grades 5-6 Card
│   │   ├── ELA schedule with dates
│   │   └── Math schedule with dates
│   └── Grades 7-8 Card
│       ├── ELA schedule with dates
│       └── Math schedule with dates
├── Pricing Section
└── Footer
```

The changes will be localized to:
- Hero section: Update the start date text to include the year
- Schedule section: Add date arrays and rendering logic for each grade group's sessions

## Components and Interfaces

### Data Structures

We'll define TypeScript interfaces to represent the schedule data:

```typescript
interface SessionSchedule {
  subject: 'ELA' | 'Math';
  dayOfWeek: string;
  time: string;
  dates: string[];
  weekCount: number;
}

interface GradeGroupSchedule {
  gradeRange: string;
  ela: SessionSchedule;
  math: SessionSchedule;
}
```

### Schedule Data

The schedule data will be defined as a constant array:

```typescript
const SCHEDULE_DATA: GradeGroupSchedule[] = [
  {
    gradeRange: 'Grades 3–4',
    ela: {
      subject: 'ELA',
      dayOfWeek: 'Mondays',
      time: '4–5 PM',
      dates: ['March 8', 'March 15', 'March 22', 'March 29', 'April 5', 'April 12'],
      weekCount: 6
    },
    math: {
      subject: 'Math',
      dayOfWeek: 'Wednesdays',
      time: '4–5 PM',
      dates: ['March 11', 'March 18', 'March 25', 'April 1', 'April 8', 'April 15', 'April 22', 'April 29'],
      weekCount: 8
    }
  },
  {
    gradeRange: 'Grades 5–6',
    ela: {
      subject: 'ELA',
      dayOfWeek: 'Tuesdays',
      time: '4–5 PM',
      dates: ['March 9', 'March 16', 'March 23', 'March 30', 'April 7', 'April 14'],
      weekCount: 6
    },
    math: {
      subject: 'Math',
      dayOfWeek: 'Thursdays',
      time: '4–5 PM',
      dates: ['March 12', 'March 19', 'March 26', 'April 2', 'April 9', 'April 16', 'April 23', 'April 30'],
      weekCount: 8
    }
  },
  {
    gradeRange: 'Grades 7–8',
    ela: {
      subject: 'ELA',
      dayOfWeek: 'Mondays',
      time: '5–6 PM',
      dates: ['March 8', 'March 15', 'March 22', 'March 29', 'April 5', 'April 12'],
      weekCount: 6
    },
    math: {
      subject: 'Math',
      dayOfWeek: 'Fridays',
      time: '5–6 PM',
      dates: ['March 13', 'March 20', 'March 27', 'April 3', 'April 10', 'April 17', 'April 24', 'May 1'],
      weekCount: 8
    }
  }
];
```

### Helper Functions

#### formatDateList

Formats an array of dates into a readable string with proper grouping by month:

```typescript
function formatDateList(dates: string[]): string {
  // Group dates by month
  const monthGroups: { [key: string]: string[] } = {};
  
  dates.forEach(date => {
    const [month, day] = date.split(' ');
    if (!monthGroups[month]) {
      monthGroups[month] = [];
    }
    monthGroups[month].push(day);
  });
  
  // Format each month group
  const formattedGroups = Object.entries(monthGroups).map(([month, days]) => {
    return `${month} ${days.join(', ')}`;
  });
  
  // Join groups with pipe separator
  return formattedGroups.join(' | ');
}
```

**Example output:**
- Input: `['March 8', 'March 15', 'April 5']`
- Output: `"March 8, 15 | April 5"`

### Component Updates

#### Hero Section Update

The hero section will be updated to display the full date:

```typescript
<p className="text-lg md:text-xl mb-10 text-gray-300">
  Reviews Start: <span className="font-semibold">March 8, 2026</span>
</p>
```

#### Schedule Card Component

Each schedule card will be updated to include:
1. Session count badge (e.g., "6 weeks")
2. Formatted date list below the day/time information

Updated card structure:

```typescript
<div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
  <div className="flex items-center gap-3 mb-2">
    <BookOpen className="w-5 h-5 text-[#f7e0e0]" />
    <span className="font-bold text-[#f7e0e0]">ELA</span>
    <span className="ml-auto text-xs bg-white/20 px-2 py-1 rounded">6 weeks</span>
  </div>
  <div className="flex items-center gap-2 text-sm mb-2">
    <Clock className="w-4 h-4" />
    <span>Mondays • 4–5 PM</span>
  </div>
  <div className="text-xs text-gray-300 mt-2">
    {formatDateList(session.dates)}
  </div>
</div>
```

## Data Models

### SessionSchedule

Represents a single subject's schedule for a grade group:

| Field | Type | Description |
|-------|------|-------------|
| subject | 'ELA' \| 'Math' | The subject being taught |
| dayOfWeek | string | Day of the week (e.g., "Mondays") |
| time | string | Time range (e.g., "4–5 PM") |
| dates | string[] | Array of session dates in "Month Day" format |
| weekCount | number | Total number of sessions (6 for ELA, 8 for Math) |

### GradeGroupSchedule

Represents the complete schedule for a grade group:

| Field | Type | Description |
|-------|------|-------------|
| gradeRange | string | Grade range label (e.g., "Grades 3–4") |
| ela | SessionSchedule | ELA session schedule |
| math | SessionSchedule | Math session schedule |

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Date Format Consistency

*For any* date display in the landing page (start date or session dates), the format pattern should be consistent across all date presentations.

**Validates: Requirements 1.2**

### Property 2: Date List Formatting

*For any* array of session dates, the formatDateList function should group dates by month with comma separation within months and pipe separation between months, maintaining chronological order.

**Validates: Requirements 3.2, 3.3**

### Property 3: Chronological Date Order

*For any* session schedule in the schedule data, the dates array should be in chronological order from earliest to latest.

**Validates: Requirements 3.4**

### Property 4: Session Count Accuracy

*For any* session schedule, the weekCount should match the actual number of dates in the dates array, and should be 6 for ELA sessions and 8 for Math sessions.

**Validates: Requirements 5.1, 5.2**

## Error Handling

This feature primarily involves static data display with minimal error conditions:

1. **Missing Data**: If schedule data is undefined or malformed, the component should gracefully handle the error by either showing a fallback message or skipping the problematic section.

2. **Invalid Date Format**: The formatDateList function should validate that dates follow the "Month Day" format before processing.

3. **Empty Date Arrays**: If a session has an empty dates array, display "Dates TBA" instead of rendering nothing.

## Testing Strategy

### Unit Tests

Unit tests will verify specific examples and edge cases:

1. **Hero Section Start Date**: Verify "March 8, 2026" appears in the hero section
2. **Specific Schedule Examples**: Test that each grade group displays the correct dates (Requirements 2.1-2.6)
3. **formatDateList Edge Cases**:
   - Single date: `['March 8']` → `"March 8"`
   - Same month: `['March 8', 'March 15']` → `"March 8, 15"`
   - Multiple months: `['March 29', 'April 5']` → `"March 29 | April 5"`
   - Three months: `['March 27', 'April 3', 'May 1']` → `"March 27 | April 3 | May 1"`

### Property-Based Tests

Property-based tests will verify universal correctness properties using a testing library like fast-check (for TypeScript):

1. **Property 1: Date Format Consistency** - Generate random date strings and verify consistent formatting
2. **Property 2: Date List Formatting** - Generate random date arrays and verify proper grouping and separation
3. **Property 3: Chronological Order** - Verify all schedule data maintains chronological order
4. **Property 4: Session Count Accuracy** - Verify week counts match array lengths and subject types

Each property test should run a minimum of 100 iterations and be tagged with:
- **Feature: add-start-dates, Property {number}: {property_text}**

### Integration Tests

Integration tests will verify the complete rendering:

1. Render the full App component and verify all three grade groups display correctly
2. Verify responsive behavior at different viewport sizes (mobile, tablet, desktop)
3. Test smooth scrolling functionality still works after changes

