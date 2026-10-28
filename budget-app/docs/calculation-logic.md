# Calculation Logic

```mermaid
flowchart TD
    A[Selected services and web config] --> B[total = 0]
    B --> C{SEO selected?}
    C -- Yes --> C1[total += SEO price]
    C -- No --> D
    C1 --> D{Ads selected?}
    D -- Yes --> D1[total += Ads price]
    D -- No --> E
    D1 --> E{Web selected?}
    E -- Yes --> E1["total += Web base price + (pages + languages) * cost per unit"]
    E -- No --> F
    E1 --> F[Return total]
```

All prices and the cost per unit come from `services.json`. No hard-coded values in the code.

## Reference examples

| Selection | Result |
|-----------|--------|
| Nothing | 0 € |
| SEO | 300 € |
| SEO + Ads | 700 € |
| Web (1 page, 3 languages) | 620 € |
| Web (4 pages, 2 languages) + SEO | 980 € |

