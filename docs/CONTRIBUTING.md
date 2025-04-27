# Contributing Guidelines

## Code Style and Standards
- Use consistent indentation (2 spaces)
- Follow the existing naming conventions (camelCase for variables/functions, PascalCase for components)
- Write self-documenting code with clear variable and function names
- Add JSDoc comments for complex functions
- Keep components focused on a single responsibility

## Git Workflow
- Create feature branches from `main` using format: `feature/descriptive-name`
- Make small, focused commits with clear messages
- Open pull requests with detailed descriptions
- Require at least one code review before merging
- Squash commits when merging to main

## Mobile-First Development
- Design and implement for mobile devices first
- Test on multiple screen sizes before submitting PRs
- Use responsive design patterns and avoid fixed dimensions
- Ensure touch targets are at least 44×44px

## Accessibility Requirements
- Maintain WCAG 2.1 AA compliance
- Include proper aria attributes
- Ensure keyboard navigation works
- Maintain color contrast ratios of at least 4.5:1 for normal text

## Performance Guidelines
- Optimize images before adding to the project
- Lazy-load non-critical resources
- Keep bundle size minimal by avoiding unnecessary dependencies
- Use code splitting for larger features 