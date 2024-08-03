# UnoCSSPresets

A collection of custom UnoCSS presets for streamlined and consistent styling across projects.

## Overview

UnoCSSPresets is a set of custom presets for [UnoCSS](https://github.com/unocss/unocss), designed to provide a consistent and efficient styling approach across various projects. These presets encapsulate common styling patterns, color schemes, spacing utilities, and typography rules that can be easily integrated into any UnoCSS-powered project.

## Features

- **Color Presets**: Dynamically generated color classes based on a customizable theme
- **Spacing Utilities**: Responsive spacing classes for consistent layouts
- **Typography Rules**: Pre-defined typography styles for various text elements
- **Custom Shortcuts**: Utility classes for common styling patterns

## Presets Included

1. `presetThevetatBase`: Combines all other presets and includes misc utilities
2. `presetThevetatColors`: Custom color scheme and utilities
3. `presetThevetatSpacing`: Responsive spacing utilities
4. `presetThevetatTypography`: Typography rules and text styling

## Usage

To use these presets in your UnoCSS configuration:

```javascript
import { defineConfig } from 'unocss'
import { presetThevetatBase } from 'path-to-unocss-presets'

export default defineConfig({
  presets: [
    presetThevetatBase(),
    // other presets...
  ],
  // other UnoCSS configurations...
})
```

## Configuration

The color scheme can be customized by modifying the `siteConfig.json` file:

```json
{
  "company": {
    "theme": {
      "primary": "#4a73c4",
      "secondary": "#3a3a40",
      "accent": "#F2AD45",
      "bg": "#171212",
      "text": "#d6d6d6",
      "gradient": "#321717"
    }
  }
}
```

## Development Status

Please note that this project is still in development and not fully ready for production use. However, the ideas and patterns implemented here can be used as inspiration or starting points for your own UnoCSS presets.

## Contributing

Contributions are welcome! If you have ideas for improvements or new features, feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
