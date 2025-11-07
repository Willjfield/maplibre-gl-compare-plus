# maplibre-gl-compare-plus

A plugin for [MapLibre GL JS](https://maplibre.org/maplibre-gl-js-docs/) that allows for comparing two maps side by side or one on top of the other with an interactive slider.

## Credits

This library is based on [mapbox-gl-compare](https://github.com/mapbox/mapbox-gl-compare) by the Mapbox team. Special thanks to the original authors and contributors for creating the foundation that this project builds upon.

## Why maplibre-gl-compare-plus?

While the original [mapbox-gl-compare](https://github.com/mapbox/mapbox-gl-compare) repository is rarely updated, this fork provides:

- **Active maintenance** for MapLibre GL JS compatibility
- **Enhanced functionality** including the ability to switch between swipe (slider) and side-by-side comparison modes
- **Improved user experience** with a toggle control to seamlessly switch between comparison types

## Installation

### npm

```bash
npm install maplibre-gl-compare-plus
```

### CDN

```html
<link rel="stylesheet" href="https://unpkg.com/maplibre-gl-compare-plus/dist/maplibre-gl-compare.css" />
<script src="https://unpkg.com/maplibre-gl-compare-plus/dist/maplibre-gl-compare-plus.min.js"></script>
```

## Usage

### Basic Example

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>MapLibre GL Compare Plus</title>
  <script src="https://unpkg.com/maplibre-gl@3/dist/maplibre-gl.js"></script>
  <link href="https://unpkg.com/maplibre-gl@3/dist/maplibre-gl.css" rel="stylesheet" />
  <link rel="stylesheet" href="https://unpkg.com/maplibre-gl-compare-plus/dist/maplibre-gl-compare.css" />
  <script src="https://unpkg.com/maplibre-gl-compare-plus/dist/maplibre-gl-compare-plus.min.js"></script>
  <style>
    body { margin: 0; padding: 0; }
    #map { width: 100vw; height: 100vh; }
  </style>
</head>
<body>
  <div id="map"></div>
  <script>
    const before = new maplibregl.Map({
      container: 'before',
      style: 'https://demotiles.maplibre.org/style.json',
      center: [-74.006, 40.7128],
      zoom: 12
    });

    const after = new maplibregl.Map({
      container: 'after',
      style: 'https://demotiles.maplibre.org/style.json',
      center: [-74.006, 40.7128],
      zoom: 12
    });

    const container = '#map';
    
    const compare = new maplibregl.Compare(before, after, container, {
      mousemove: true,
      orientation: 'vertical',
      type: 'slider' // or 'sideBySide'
    });
  </script>
</body>
</html>
```

### With ES Modules

```javascript
import Compare from 'maplibre-gl-compare-plus';
import 'maplibre-gl-compare-plus/dist/maplibre-gl-compare.css';

const before = new maplibregl.Map({
  container: 'before',
  style: 'https://demotiles.maplibre.org/style.json'
});

const after = new maplibregl.Map({
  container: 'after',
  style: 'https://demotiles.maplibre.org/style.json'
});

const compare = new Compare(before, after, '#comparison-container', {
  mousemove: true,
  orientation: 'vertical',
  type: 'slider'
});
```

## API

### Constructor

```javascript
new maplibregl.Compare(mapA, mapB, container, options)
```

#### Parameters

- `mapA` (MapLibre GL Map): The first map instance
- `mapB` (MapLibre GL Map): The second map instance
- `container` (string|HTMLElement): A CSS selector string or HTML element that wraps both map containers
- `options` (Object): Configuration options
  - `orientation` (string): `'vertical'` (default) or `'horizontal'`
    - `'vertical'`: Creates a vertical slider to compare map A (left) with map B (right)
    - `'horizontal'`: Creates a horizontal slider to compare map A (top) with map B (bottom)
  - `mousemove` (boolean): If `true`, the slider moves with cursor movement. Default: `false`
  - `type` (string): Initial comparison type. `'slider'` (default) or `'sideBySide'`

### Methods

#### `setSlider(x)`

Set the slider position programmatically.

```javascript
compare.setSlider(300); // Set slider 300px from left/top edge
```

#### `switchType(type)`

Switch between comparison modes.

```javascript
compare.switchType('sideBySide'); // Switch to side-by-side view
compare.switchType('slider');     // Switch back to slider view
```

#### `on(type, listener)`

Add an event listener.

```javascript
compare.on('slideend', (e) => {
  console.log('Slider position:', e.detail.currentPosition);
});
```

#### `off(type, listener)`

Remove an event listener.

```javascript
compare.off('slideend', listener);
```

#### `remove()`

Remove the compare control and clean up event listeners.

```javascript
compare.remove();
```

### Properties

#### `currentPosition`

Get the current slider position in pixels.

```javascript
const position = compare.currentPosition;
```

### Events

#### `slideend`

Fired when the user finishes moving the slider.

```javascript
compare.on('slideend', (e) => {
  console.log('Final position:', e.detail.currentPosition);
});
```

## Features

### Comparison Modes

- **Slider Mode**: Interactive swipe comparison with a draggable slider
- **Side-by-Side Mode**: View both maps simultaneously, side by side
- **Toggle Control**: Built-in UI toggle to switch between modes seamlessly

### Orientation Support

- **Vertical**: Compare maps left to right
- **Horizontal**: Compare maps top to bottom

### Synchronized Movement

Map movements (pan, zoom, rotate) are automatically synchronized between both maps using [mapbox-gl-sync-move](https://github.com/mapbox/mapbox-gl-sync-move).

## Browser Support

This library supports all modern browsers that support MapLibre GL JS.

## License

MIT
