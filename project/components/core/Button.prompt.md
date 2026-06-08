Primary action control for LeanHippo interfaces — use for the single most important action in a view.

```jsx
<Button variant="primary" size="md" onClick={handleRun}>Request the Bottleneck Report</Button>
<Button variant="secondary" iconLeft={<Icon name="filter" />}>Filter</Button>
<Button variant="ghost" size="sm">Dismiss</Button>
```

Variants: `primary` (cobalt, glow — one per view), `secondary` (graphite glass), `ghost` (quiet, low-emphasis), `danger` (destructive / leak actions). Sizes: `sm | md | lg`. Props: `iconLeft`, `iconRight`, `full`, `disabled`.
