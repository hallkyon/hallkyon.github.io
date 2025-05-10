# Markdown to HTML

## Block Elements

### Paragraphs



### Tables

```markdown
| key | value |
| --- | ----: |
| k1  | 1     |
| k2  | 2     |
```

```html
<table>
    <thead>
        <tr>
            <th>key</th>
            <th style="text-align:right">value</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>k1</td>
            <td style="text-align:right">1</td>
        </tr>
        <tr>
            <td>k2</td>
            <td style="text-align:right">2</td>
        </tr>
    </tbody>
</table>

```

### Links

```markdown
[Something](link)
```

```html
<p><a href="link">Something</a></p>
```

## Span Elements



