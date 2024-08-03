import fs from 'fs'
import type { Preset } from 'unocss'
import { CreateColorTheme, GenerateColorClasses } from '../colors'
import svgToDataUri from 'mini-svg-data-uri'
import Color from 'color'

const siteConfigJson = fs.readFileSync('siteConfig.json', 'utf-8')
const { company: { theme: { primary, secondary, accent, bg, text, gradient } } } = JSON.parse(siteConfigJson)

const theme = CreateColorTheme({
    primary,
    secondary,
    accent,
    bg,
    text,
    gradient
})

const generatedColorClasses = GenerateColorClasses(theme)

function getColor(colorInput: string): { color: string, opacity: number } {
    const [colorValue, opacityValue] = colorInput.split('/');
    let finalColor: string;
    const opacity = opacityValue ? parseFloat(opacityValue) : 1;

    const getThemeColor = (key: string): string | undefined => {
        const [category, shade] = key.split('-');
        return theme[category as keyof typeof theme]?.[shade as keyof (typeof theme)[keyof typeof theme]]?.hex;
    };

    const themeColor = getThemeColor(colorValue);
    if (themeColor) {
        finalColor = themeColor;
    } else {
        try {
            finalColor = Color(colorValue).rgb().string();
        } catch (e) {
            console.error(`Invalid color: ${colorValue}`);
            finalColor = 'rgb(0, 0, 0)';
        }
    }

    return { color: finalColor, opacity };
}

export function presetThevetatColors(): Preset {
    return {
        name: 'unocss-preset-thevetat-colors',
        preflights: [
            {
                getCSS: () => `
          :root {
            --bg-muted: ${theme.bg.muted.hsl};
            --text-lighten: ${theme.text.lighten.hsl};
          }
        `,
            },
        ],
        shortcuts: [
            // ╭────────────────────────────────────────────────────────────────────╮
            // │ Color                                                              │
            // ╰────────────────────────────────────────────────────────────────────╯
            ['color-trans', 'transition-colors duration-400 ease-in-out'],
            ['bg-input', `bg-[#1E2030]`],
            ['bg-card', 'bg-[#383E5A]'],
            ['bg-body', 'bg-[#50D6BE]'],
            ['text-body-muted', 'text-[#828BB8]'],
            ['text-body-muted-xl', 'text-[#495986'],
            ['text-main', 'text-[#C3E88D]'],
            ['text-main-other', 'text-[#C678DD]'],
            ['text-info', 'text-[#66BCFF]'],
            ['text-gradient', 'bg-clip-text text-transparent bg-gradient-to-b from-[#ffffff] to-[#ffffff] via-[#BED2EA] dark:from-moss-300 dark:to-moss-100'],
            ['accent-card', 'bg-gradient-to-br dark:bg-gradient-to-tl from-zinc-950 to-zinc-800 dark:from-zinc-900/80 dark:to-zinc-900/50 rounded-sm transition-colors duration-500 border-zinc-400/50 dark:border-zinc-600/50 border-2 shadow-md'],
            ['border-color', 'border-bg-lighten'],
            ['bg-gradient-start', `bg-gradient-to-b from-transparent to-[${gradient}]`],
            ['bg-gradient-middle', `bg-[${gradient}]`],
            ['bg-gradient-end', `bg-gradient-to-t from-transparent to-[${gradient}]`],
            ['base-border', 'border border-white border-opacity-20 rounded-xl'],

            ...generatedColorClasses,
        ],
        rules: [
            ['gradient', {
                'background-image': `linear-gradient(-70deg, #${primary} 0%, #FFFFFF 50%)`,
            }],
            ['gradient2', {
                'background-image': `linear-gradient(70deg, #${primary} 0%, #FFFFFF 50%)`,
            }],
            ['gradient3', {
                'background-image': `linear-gradient(80deg, #${primary} 0%, #FFFFFF 50%)`,
            }],

            [/^bg-grid-(.+?)(?:\/(\d+))?$/, ([, colorInput, size = '24']) => {
                const { color, opacity } = getColor(colorInput);
                const sizeNum = parseInt(size, 10);
                return {
                    'background-image': `url("${svgToDataUri(
                        `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${sizeNum} ${sizeNum}" width="${sizeNum}" height="${sizeNum}" fill="none" stroke="${color}" opacity="${opacity}"><path d="M0 .5H${sizeNum - 0.5}V${sizeNum}"/></svg>`
                    )}")`,
                    'background-size': `${sizeNum}px ${sizeNum}px`
                };
            }],

            [/^bg-dot-(.+?)(?:\/(\d+))?$/, ([, colorInput, size = '16']) => {
                const { color, opacity } = getColor(colorInput);
                const sizeNum = parseInt(size, 10);
                const radius = sizeNum / 10;
                return {
                    'background-image': `url("${svgToDataUri(
                        `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${sizeNum} ${sizeNum}" width="${sizeNum}" height="${sizeNum}" fill="none" opacity="${opacity}"><circle fill="${color}" cx="${sizeNum / 2}" cy="${sizeNum / 2}" r="${radius}"></circle></svg>`
                    )}")`,
                    'background-size': `${sizeNum}px ${sizeNum}px`
                };
            }],
        ],
        theme: {
            colors: {
                primary,
                secondary,
                accent,
                text,
                bg,
            },
        },
    }
}

export default presetThevetatColors
