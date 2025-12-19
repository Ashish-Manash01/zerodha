# Contributing to Zerodha Clone

We welcome contributions! This guide will help you get started.

## Getting Started

1. **Fork the Repository**
   - Click "Fork" on GitHub

2. **Clone Your Fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/zerodha-clone.git
   cd zerodha-clone
   ```

3. **Add Upstream Remote**
   ```bash
   git remote add upstream https://github.com/ORIGINAL_OWNER/zerodha-clone.git
   ```

4. **Create a Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Development Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# In another terminal, run type checking
npm run build
```

## Making Changes

### Adding Components

1. Create new file in `src/components/YourComponent.tsx`
2. Follow existing component patterns
3. Export from `src/components/index.ts`
4. Add TypeScript types in `src/types/index.ts`

Example:
```typescript
// src/components/MyComponent.tsx
import React from 'react';

interface MyComponentProps {
  title: string;
  onClick: () => void;
}

export const MyComponent: React.FC<MyComponentProps> = ({ title, onClick }) => {
  return (
    <button onClick={onClick} className="px-4 py-2 bg-blue-600 text-white rounded">
      {title}
    </button>
  );
};
```

### Adding Pages

1. Create new file in `src/pages/YourPage.tsx`
2. Add route in `src/App.tsx`
3. Update navigation in `Header.tsx` if needed

### Adding Types

Edit `src/types/index.ts`:
```typescript
export interface YourType {
  id: string;
  name: string;
  // Add your properties
}
```

### Using Context

Example with useAuth:
```typescript
import { useAuth } from '../context/AuthContext';

export const MyComponent = () => {
  const { user, login, logout } = useAuth();
  // Use the context values
};
```

## Code Style

### TypeScript
- Use strict typing
- Avoid `any` type
- Use interfaces for objects
- Add JSDoc comments for complex functions

### React
- Use functional components with hooks
- Keep components small and focused
- Use React.FC for component types
- Memoize expensive components

### Tailwind CSS
- Use utility-first approach
- Follow existing color scheme
- Use responsive prefixes (sm:, md:, lg:)
- Keep custom CSS minimal

### File Naming
- Components: `PascalCase.tsx`
- Pages: `PascalCase.tsx`
- Services: `camelCase.ts`
- Utilities: `camelCase.ts`

## Testing Your Changes

```bash
# Type check
npm run build

# Preview build
npm run preview
```

## Commit Guidelines

```bash
# Good commit messages
git commit -m "feat: Add stock search filter"
git commit -m "fix: Fix portfolio calculation error"
git commit -m "docs: Update README with API docs"
git commit -m "style: Format code with Prettier"
git commit -m "refactor: Simplify component logic"

# Avoid
git commit -m "fix stuff"
git commit -m "updates"
```

## Push Changes

```bash
# Update your branch with latest changes
git fetch upstream
git rebase upstream/main

# Push to your fork
git push origin feature/your-feature-name
```

## Create Pull Request

1. Go to GitHub
2. Click "New Pull Request"
3. Select your branch
4. Fill in PR description:
   - What changes did you make?
   - Why are these changes needed?
   - Any breaking changes?

5. Link related issues

## Pull Request Checklist

- [ ] Code follows project style guide
- [ ] All TypeScript types are correct
- [ ] No console errors or warnings
- [ ] Components are properly documented
- [ ] PR description is clear and detailed
- [ ] Related issues are linked
- [ ] No merge conflicts

## Review Process

- Maintainers will review your PR
- Make requested changes if needed
- Respond to feedback
- PR will be merged once approved

## Common Contributions

### Bug Fixes
1. Describe the bug in issue
2. Fix the code
3. Add test case if applicable
4. Submit PR with "Fixes #ISSUE_NUMBER"

### Features
1. Create issue with feature proposal
2. Wait for approval
3. Implement feature
4. Add documentation
5. Submit PR

### Documentation
1. Update relevant .md files
2. Add code examples if needed
3. Keep documentation clear and accurate

## Performance Tips

- Use `React.memo()` for expensive components
- Lazy load routes with `React.lazy()`
- Avoid inline object/function creation in JSX
- Use `useCallback` for event handlers
- Monitor bundle size with `npm run build`

## Debugging

### React DevTools
```
1. Install React DevTools browser extension
2. Open DevTools and go to "React" tab
3. Inspect component props and state
```

### Console Debugging
```typescript
// Add debug logs
console.log('Component mounted', props);

// Use debugger statement
debugger; // Opens DevTools when code reaches this line
```

## Project Structure Guidelines

```
src/
├── components/       # Reusable components only
├── pages/           # Full page components
├── context/         # Global state (Auth, Market)
├── services/        # API and data services
├── types/           # TypeScript interfaces
├── utils/           # Helper functions
├── hooks/           # Custom React hooks
└── App.tsx          # Main component
```

## Adding Dependencies

⚠️ **Minimize dependencies!**

Before adding a package:
1. Check if functionality exists in existing packages
2. Consider bundle size impact
3. Check maintenance and community support
4. Discuss with maintainers

To add:
```bash
npm install package-name
# Or for dev dependencies
npm install --save-dev package-name
```

## Removing Unused Code

- Remove unused imports
- Delete unused components
- Clean up old debug code
- Update documentation

## Documentation

- Add comments for complex logic
- Update README for major changes
- Add inline JSDoc for functions
- Keep documentation up-to-date

Example JSDoc:
```typescript
/**
 * Calculates profit/loss for a holding
 * @param buyPrice - Average buy price per share
 * @param currentPrice - Current market price
 * @param quantity - Number of shares
 * @returns Object with profitLoss and percentage
 */
function calculatePL(buyPrice: number, currentPrice: number, quantity: number) {
  // Implementation
}
```

## Code Review Tips

When reviewing code:
- Check for type safety
- Verify component reusability
- Look for performance issues
- Ensure consistency with codebase
- Suggest improvements kindly

## Questions?

- Create a Discussion on GitHub
- Check existing documentation
- Review similar implementations
- Ask in PR comments

## Code of Conduct

- Be respectful and inclusive
- Welcome feedback
- Help others learn
- No harassment or discrimination
- Report issues to maintainers

## Recognition

Contributors are recognized in:
- GitHub contributor list
- Project README
- Release notes

## License

By contributing, you agree your code will be licensed under the project's license.

---

Thank you for contributing to Zerodha Clone! 🙏
