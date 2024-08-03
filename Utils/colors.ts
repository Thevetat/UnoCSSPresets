import { ColorShades, ColorTheme, CompanyTheme } from '@/base_submod/Schemas/Colors'
import Color from 'color'

function createColor(color: Color<string>) {
    return {
        hex: color.hex(),
        hsl: color.hsl().string(0),
        rgb: color.rgb().string(0),

    }
}

function subtleColor(colorString: string) {
    if (Color(colorString).isDark()) {
        return Color(colorString).lighten(0.4)
    }
    else {
        return Color(colorString).darken(0.2)
    }
}

function lightColor(colorString: string) {
    return Color(colorString).lighten(0.9).saturate(0.3)
}

function transformHSL(hsl: string): string {
    const transformedHSL = hsl.replace(/[, ]+/g, '_')
    if (hsl.startsWith('hsla')) {
        const lastIndex = transformedHSL.lastIndexOf('_')
        return transformedHSL.slice(0, lastIndex) + '_/_' + transformedHSL.slice(lastIndex + 1)
    }
    return transformedHSL
}

function createColorShades(colorString: string): ColorShades {
    return {
        main: createColor(Color(colorString)),
        subtle: createColor(subtleColor(colorString)),
        lighten: createColor(lightColor(colorString)),
        muted: createColor(Color(colorString).fade(0.3).darken(0.2)),
        mutedXL: createColor(Color(colorString).fade(0.8).darken(0.2)),
        invert: createColor(Color(colorString).negate()),
        invertMuted: createColor(Color(colorString).negate().fade(0.3).darken(0.2)),
    }
}

export function CreateColorTheme(companyTheme: CompanyTheme): ColorTheme {
    return {
        primary: createColorShades(companyTheme.primary),
        secondary: createColorShades(companyTheme.secondary),
        accent: createColorShades(companyTheme.accent),
        bg: createColorShades(companyTheme.bg),
        text: createColorShades(companyTheme.text),
    }
}

export function GenerateColorClasses(colorTheme: ColorTheme) {
    const colorClasses: Array<[string, string]> = []

    for (const [category, shades] of Object.entries(colorTheme)) {
        for (const [shade, color] of Object.entries(shades)) {
            const transformedShade
                = shade === 'mutedXL'
                    ? 'muted-xl'
                    : shade === 'invertMuted'
                        ? 'invert-muted'
                        : shade
            colorClasses.push([`bg-${category}-${transformedShade}`, `bg-[${transformHSL(color.hsl)}]`])
            colorClasses.push([`text-${category}-${transformedShade}`, `text-[${transformHSL(color.hsl)}]`])
            colorClasses.push([`border-${category}-${transformedShade}`, `border-[${transformHSL(color.hsl)}]`])
            colorClasses.push([`outline-${category}-${transformedShade}`, `outline-[${transformHSL(color.hsl)}]`])
        }
    }

    return colorClasses
}

type CSSProperties = 'bg' | 'text' | 'border' | 'outline'
type ShadeKeys = 'main' | 'subtle' | 'lighten' | 'muted' | 'mutedXL' | 'invert' | 'invertMuted'

export type GeneratedCSSClasses = {
    [K in keyof ColorTheme]: {
        [P in CSSProperties]: {
            [S in ShadeKeys]: string
        }
    }
}

function initializeCSSClasses(): GeneratedCSSClasses {
    const categories: (keyof ColorTheme)[] = ['primary', 'secondary', 'accent', 'bg', 'text']
    const cssProperties: CSSProperties[] = ['bg', 'text', 'border', 'outline']
    const shades: ShadeKeys[] = ['main', 'subtle', 'lighten', 'muted', 'mutedXL', 'invert', 'invertMuted']

    const cssClasses = {} as GeneratedCSSClasses

    categories.forEach((category) => {
        cssClasses[category] = {} as Record<CSSProperties, Record<ShadeKeys, string>>
        cssProperties.forEach((prop) => {
            cssClasses[category][prop] = {} as Record<ShadeKeys, string>
            shades.forEach((shade) => {
                cssClasses[category][prop][shade] = ''
            })
        })
    })

    return cssClasses
}

export function GenerateCSSClasses(colorTheme: ColorTheme): GeneratedCSSClasses {
    const cssClasses = initializeCSSClasses()

    for (const [category, shades] of Object.entries(colorTheme)) {
        for (const [shade, color] of Object.entries(shades)) {
            const propertyMap: Record<CSSProperties, string> = {
                bg: 'background-color',
                text: 'color',
                border: 'border-color',
                outline: 'outline-color',
            }

            for (const [prop, cssProperty] of Object.entries(propertyMap)) {
                cssClasses[category as keyof ColorTheme][prop as CSSProperties][shade as ShadeKeys]
                    = `${cssProperty}: ${color.hsl} !important;`
            }
        }
    }

    return cssClasses
}
