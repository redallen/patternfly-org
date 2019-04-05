---
linkText: "Typography"
path: "/design-guidelines/styles/typography"
---

# Typography
import { Button, Grid, GridItem } from '@patternfly/react-core';
import { CheckCircleIcon, TimesCircleIcon } from '@patternfly/react-icons';
import { TypographyGrid, LineHeightTitle, SpacingContentItem, Spacer } from './typography';
import correct from './typography_correct_spacing.png';
import incorrect from './typography_incorrect_spacing.png';

## Our font family
We use the open source typeface, Overpass, inspired by Highway Gothic.

<Button variant="primary" component="a" href="https://fonts.google.com/specimen/Overpass" target="_blank">Download Overpass</Button>

## Usage guidelines
Use our typographic styles to communicate visual hierarchy. A consistent and logical hierarchy provides a clear pattern for users, making it easier to quickly scan and understand information on a page.

<TypographyGrid title="Hero Title*" note="*Not to be used in content block (Landing pages, login, etc.)" fontWeight="400" fontSize="36" lineHeight="1.3">Did the Patriots win the Super Bowl?</TypographyGrid>
<TypographyGrid title="Main Title" fontWeight="400" fontSize="28" lineHeight="1.3">Did the Patriots win the Super Bowl?</TypographyGrid>
<TypographyGrid title="Secondary Title" fontWeight="400" fontSize="24" lineHeight="1.3">Did the Patriots win the Super Bowl?</TypographyGrid>
<TypographyGrid title="Subtitle" fontWeight="400" fontSize="21" lineHeight="1.5">Did the Patriots win the Super Bowl?</TypographyGrid>
<TypographyGrid title="Fourth Level Title" fontWeight="500" fontSize="18" lineHeight="1.5">Did the Patriots win the Super Bowl?</TypographyGrid>
<TypographyGrid title="Fifth Level Title" fontWeight="500" fontSize="16" lineHeight="1.5">Did the Patriots win the Super Bowl?</TypographyGrid>
<TypographyGrid title="Body" fontWeight="400" fontSize="16" lineHeight="1.5">Did the Patriots win the Super Bowl?</TypographyGrid>
<TypographyGrid title="Small Text" fontWeight="400" fontSize="14" lineHeight="1.3">Did the Patriots win the Super Bowl?</TypographyGrid>
<TypographyGrid title="Tiny Text*" note="*Not to be used in content block (Only used with data visualizations when 14px is not small enough.)" fontWeight="400" fontSize="12" lineHeight="1.3">Yes, yes they did.</TypographyGrid>

## Line height
When laying out text-based content, you need to factor in line-height when measuring spacing. Line height is a relative number used in CSS that represents a ratio to the text size. For example, body text uses a line height of 1.5. Body text size is 16px. 16*1.5 = 24px line height. So, when creating designs in design software, you must include the 24px line height as a part of the text.

<Grid>
  <GridItem sm={12} span={6} lg={4}>
    <LineHeightTitle><CheckCircleIcon color="#52A549" /> Correct</LineHeightTitle>
    <div>Note how the line height space is included when laying out with spacer elements.</div>
  </GridItem>
  <GridItem sm={12} span={6} lg={8}>
    <img style={{maxHeight: '170px', padding: '16px'}} src={correct} />
  </GridItem>
  <GridItem span={12}><Spacer size="48" /></GridItem>
  <GridItem sm={12} span={6} lg={4}>
    <LineHeightTitle><TimesCircleIcon color="#CC0000" /> Incorrect</LineHeightTitle>
    <div>Do not use the text itself to align with spacing elements when designing. Remember to always include the line height space.</div>
  </GridItem>
  <GridItem sm={12} span={6} lg={8}>
    <img style={{maxHeight: '125px', padding: '16px'}} src={incorrect} />
  </GridItem>
  <GridItem span={12}><Spacer size="48" /></GridItem>
</Grid>

## Spacing
The spacing of the content comes into play with line height too. It represents the margins that are padded on top and bottom of the text itself. When creating specs, it is important to use these spacers to communicate the appropriate spacing for each type of text.

<Grid gutter="md">
  <GridItem span={8}>
    <SpacingContentItem fontWeight="400" fontSize="36" lineHeight="1.3">I think the Patriots won</SpacingContentItem>
    <Spacer size="16" color="16" />
    <SpacingContentItem fontWeight="400" fontSize="16" lineHeight="1.5">Body text should be Overpass Regular at 16px. It should have leading of 24px because of its relative line height of 1.5.</SpacingContentItem>
    <Spacer size="24" color="24" />
    <SpacingContentItem fontWeight="400" fontSize="28" lineHeight="1.3">I think the Patriots won</SpacingContentItem>
    <Spacer size="16" color="16" />
    <SpacingContentItem fontWeight="400" fontSize="16" lineHeight="1.5">Body text should be Overpass Regular at 16px. It should have leading of 24px because of its relative line height of 1.5.</SpacingContentItem>
    <Spacer size="24" color="24" />
    <SpacingContentItem fontWeight="400" fontSize="24" lineHeight="1.3">I think the Patriots won</SpacingContentItem>
    <Spacer size="16" color="16" />
    <SpacingContentItem fontWeight="400" fontSize="16" lineHeight="1.5">Body text should be Overpass Regular at 16px. It should have leading of 24px because of its relative line height of 1.5.</SpacingContentItem>
    <Spacer size="16" color="16" />
    <SpacingContentItem fontWeight="400" fontSize="16" lineHeight="1.5">1. Lists should use body text style with 8px between items.</SpacingContentItem>
    <Spacer size="8" color="8" />
    <SpacingContentItem fontWeight="400" fontSize="16" lineHeight="1.5">2. This is the second item in the list.</SpacingContentItem>
    <Spacer size="8" color="8" />
    <SpacingContentItem fontWeight="400" fontSize="16" lineHeight="1.5">&nbsp;&nbsp;&nbsp;&nbsp;a. Secondary items in the list should use 8px spacing.</SpacingContentItem>
    <Spacer size="8" color="8" />
    <SpacingContentItem fontWeight="400" fontSize="16" lineHeight="1.5">&nbsp;&nbsp;&nbsp;&nbsp;b. They still use the same text styling, however.</SpacingContentItem>
    <Spacer size="24" color="24" />
    <SpacingContentItem fontWeight="400" fontSize="21" lineHeight="1.5">I think the Patriots won</SpacingContentItem>
    <Spacer size="16" color="16" />
    <SpacingContentItem fontWeight="400" fontSize="16" lineHeight="1.5">Body text should be Overpass Regular at 16px. It should have leading of 24px because of its relative line height of 1.5.</SpacingContentItem>
    <Spacer size="24" color="24" />
    <SpacingContentItem fontWeight="400" fontSize="18" lineHeight="1.5">I think the Patriots won</SpacingContentItem>
    <Spacer size="16" color="16" />
    <SpacingContentItem fontWeight="400" fontSize="16" lineHeight="1.5">Body text should be Overpass Regular at 16px. It should have leading of 24px because of its relative line height of 1.5.</SpacingContentItem>
    <Spacer size="24" color="24" />
    <SpacingContentItem fontWeight="400" fontSize="16" lineHeight="1.5">I think the Patriots won</SpacingContentItem>
    <Spacer size="16" color="16" />
    <SpacingContentItem fontWeight="400" fontSize="16" lineHeight="1.5">Body text should be Overpass Regular at 16px. It should have leading of 24px because of its relative line height of 1.5.</SpacingContentItem>
    <Spacer size="24" color="24" />
    <SpacingContentItem fontWeight="400" fontSize="14" lineHeight="1.3">Small text style should be Overpass Regular.</SpacingContentItem>
  </GridItem>
  <GridItem span={4}>
    <Spacer size="8" color="8" description="8px" />
    <Spacer size="16" color="16" description="16px" />
    <Spacer size="24" color="24" description="24px" />
    <Spacer size="24" description="Line Height" showBorder />
  </GridItem>
</Grid>
