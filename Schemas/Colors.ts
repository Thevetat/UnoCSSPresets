import { z } from 'zod'

export interface RGB {
    r: number
    g: number
    b: number
}

export interface HSLA {
    h: number
    s: number
    l: number
    a: number
}

export const ColorSchema = z.object({
    hex: z.string(),
    hsl: z.string(),
    rgb: z.string(),
})

export const ColorShadesSchema = z.object({
    main: ColorSchema,
    subtle: ColorSchema,
    lighten: ColorSchema,
    muted: ColorSchema,
    mutedXL: ColorSchema,
    invert: ColorSchema,
    invertMuted: ColorSchema,
})

export const ColorThemeSchema = z.object({
    primary: ColorShadesSchema,
    secondary: ColorShadesSchema,
    accent: ColorShadesSchema,
    bg: ColorShadesSchema,
    text: ColorShadesSchema,
})

export const CompanyThemeSchema = z.object({
    primary: z.string(),
    secondary: z.string(),
    accent: z.string(),
    bg: z.string(),
    text: z.string(),
    gradient: z.string(),
})

export type CompanyTheme = z.infer<typeof CompanyThemeSchema>

export type Color = z.infer<typeof ColorSchema>
export type ColorShades = z.infer<typeof ColorShadesSchema>
export type ColorTheme = z.infer<typeof ColorThemeSchema>

export function createBlankColorTheme(): ColorTheme {
    const blankColor = {
        hex: '',
        rgb: '',
        hsl: '',
    }
    return {
        primary: {
            main: blankColor,
            subtle: blankColor,
            lighten: blankColor,
            muted: blankColor,
            mutedXL: blankColor,
            invert: blankColor,
            invertMuted: blankColor,
        },
        secondary: {
            main: blankColor,
            subtle: blankColor,
            lighten: blankColor,
            muted: blankColor,
            mutedXL: blankColor,
            invert: blankColor,
            invertMuted: blankColor,
        },
        accent: {
            main: blankColor,
            subtle: blankColor,
            lighten: blankColor,
            muted: blankColor,
            mutedXL: blankColor,
            invert: blankColor,
            invertMuted: blankColor,
        },
        bg: {
            main: blankColor,
            subtle: blankColor,
            lighten: blankColor,
            muted: blankColor,
            mutedXL: blankColor,
            invert: blankColor,
            invertMuted: blankColor,
        },
        text: {
            main: blankColor,
            subtle: blankColor,
            lighten: blankColor,
            muted: blankColor,
            mutedXL: blankColor,
            invert: blankColor,
            invertMuted: blankColor,
        },
    }
}


export function CreateBlankCompanyTheme(): CompanyTheme {
    return {
        primary: '#4a73c4',
        secondary: '#3a3a40',
        accent: '#F2AD45',
        bg: '#171212',
        text: '#d6d6d6',
        gradient: '#321717',
    }
}
