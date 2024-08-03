import type { Preset } from 'unocss'

export function presetThevetatTypography(): Preset {
    return {
        name: 'unocss-preset-thevetat-typography',
        safelist: 'prose prose-md prose-lg prose-xl m-auto text-left'.split(' '),
        shortcuts: [
            // ╭────────────────────────────────────────────────────────────────────╮
            // │ Typography                                                         │
            // ╰────────────────────────────────────────────────────────────────────╯
            ['text-style-h1', `font-display font-semibold text-text-main tracking-[-2%] text-40px leading-38px lg:text-48px lg:leading-72px select-none`],
            ['text-style-h2', `font-display font-semibold text-text-main tracking-[-2%] text-28px leading-38px lg:text-28px lg:leading-48px select-none`],
            ['text-style-h3', `font-display font-semibold text-text-main tracking-[-2%] text-24px leading-32px  lg:text-20px lg:leading-28px  select-none`],
            ['text-style-h4', `font-display font-semibold text-text-main text-[18px] leading-[28px] lg:text-20px lg:leading-32px lg:tracking-[-2%] select-none`],
            ['text-style-body-lg', 'font-medium text-20px leading-28px select-none tracking-[-1%]'],
            ['text-style-body', 'text-[16px] leading-[24px]'],
            ['text-style-body-sm', 'text-[14px] leading-[14px]'],
            ['text-style-body-xs', 'text-[12px] leading-[16px]'],
            ['text-style-caption', 'font-medium leading-[120%] opacity-50'],
        ],
        rules: [
            ['font-thin', { 'font-weight': '100', 'font-variation-settings': '"wght" 100' }],
            ['font-extralight', { 'font-weight': '200', 'font-variation-settings': '"wght" 200' }],
            ['font-light', { 'font-weight': '300', 'font-variation-settings': '"wght" 300' }],
            ['font-normal', { 'font-weight': '400', 'font-variation-settings': '"wght" 400' }],
            ['font-medium', { 'font-weight': '500', 'font-variation-settings': '"wght" 500' }],
            ['font-semibold', { 'font-weight': '600', 'font-variation-settings': '"wght" 600' }],
            ['font-bold', { 'font-weight': '700', 'font-variation-settings': '"wght" 700' }],
            ['font-extrabold', { 'font-weight': '800', 'font-variation-settings': '"wght" 800' }],
            ['font-black', { 'font-weight': '900', 'font-variation-settings': '"wght" 900' }],
        ],
    }
}

export default presetThevetatTypography
