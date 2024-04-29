
# Skeletons

Simple API to create skeleton loaders

## Features

- Text skeleton
- Image skeleton
- Bar chart skeleton


## Usage/Examples

### HTML
```html
<div class="skeleton" data-skeleton-text></div>
```

### JS
```javascript
const targets = document.querySelectorAll(".skeleton");

targets.forEach((target) => {
    const skeleton = new Skeleton({
        target
    });
    skeleton.render();
});
```


## API Reference

### HTML data attributes

| Parameter | Options | Description                |
| :-------- | :------ | :------------------------- |
| `data-skeleton-text` | `number` |  Number of text lines, default `1` |
| `data-skeleton-text-size` | `small` or `large` |  Size of text relative to minimum, default `none` |
| `data-skeleton-image` | `number` |  Number of images, default `1` |
| `data-skeleton-image-aspect-ratio` | aspect ratio i.e. `3/2` or `1.5` |  Aspect ratio of image, default `3/2` |
| `data-skeleton-bar-chart` |  |  Enable bar chart |

### JS Parameters

```js
  new Skeleton({
      target,
      minLineHeight: 20
  });
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `target`      | `Element` | Element to render the skeleton on |
| `minLineHeight`      | `number` | Set minimum height for text lines |
