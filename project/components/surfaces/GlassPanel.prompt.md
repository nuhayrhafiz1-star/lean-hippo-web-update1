Dark-glass surface for dashboards, system cards, data layers and AI interfaces.

```jsx
<GlassPanel eyebrow="Visibility" title="The Control Room" lit
  actions={<Badge tone="ok">Live</Badge>}>
  {/* dashboard content */}
</GlassPanel>
```

`lit` adds the cobalt edge-light + glow for the active panel; `strong` switches to the denser graphite glass. Header is optional — omit `eyebrow`/`title`/`actions` for a bare panel.
