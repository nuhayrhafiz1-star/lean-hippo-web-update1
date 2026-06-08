KPI / metric tile for the visibility layer.

```jsx
<StatTile label="Cash today" value="48.2" unit="k" delta="+12%" trend="up"
  sparkline={[0.2,0.4,0.3,0.6,0.5,0.8,1]} />
<StatTile label="Missed enquiries" value="3" delta="-2" trend="down" tone="cobalt" />
```

Big numeral runs Klik Light. `trend` colors the delta (up=ok green, down=alert red). Pass `sparkline` as 0..1 values for the cobalt trace.
