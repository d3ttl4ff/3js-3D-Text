<div align="center">
<img src="thumb.gif" width="1280"/>
</div>
<br>

<div align="center">
  <img src="https://skillicons.dev/icons?i=threejs,js,nodejs,vite,html,css" />
</div>
<br>

# Three.js 3D Text

This project is a simple 3D text animation created using [`three.js`](https://threejs.org/). The text is created using [`TextGeometry`](https://threejs.org/docs/index.html?q=text#examples/en/geometries/TextGeometry) class. The scene also contains a number of [`torus`](https://threejs.org/docs/index.html?q=torus#api/en/geometries/TorusGeometry) and [`box`](https://threejs.org/docs/index.html?q=box#api/en/geometries/BoxGeometry) meshes that are randomly `positioned`, `rotated`, and `scaled`. The scene also contains an `environment map` that is used as the background. It includes a number of tweaks that can be adjusted using [`Tweakpane`](https://tweakpane.github.io/docs/getting-started/) library. These tweaks include changing the background color, the color of the text, the material used for the text, and the fog settings for the scene. It utilizes [`WebGLRenderer`](https://threejs.org/docs/index.html?q=webg#api/en/renderers/WebGLRenderer) class to render the scene.

## Setup

Download [`Node.js`](https://nodejs.org/en/download/).
Run this followed commands:

```bash
# Clone the repository
git clone https://github.com/d3ttl4ff/3js-3D-Text.git

# Install dependencies (only the first time)
npm install

# Run the local server
npm run dev

# Build for production in the dist/ directory
npm run build
```
