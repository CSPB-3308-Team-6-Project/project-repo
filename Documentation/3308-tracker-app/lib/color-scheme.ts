// color-scheme.ts
// Central color scheme for the Health/Emotion Tracker App.
//
// TWO ways to use this, depending on the component:
//
// 1. Tailwind className usage (most divs, custom buttons, wrappers):
//      import { colorScheme } from '@/lib/color-scheme';
//      <div className={colorScheme.background}>
//
// 2. Mantine prop usage (Card, Text, Title, Select, LineChart, etc.):
//      import { colors } from '@/lib/color-scheme';
//      <Text c={colors.textSecondary}>
//      <Card bg={colors.card}>

// ─────────────────────────────────────────────────────────────
// RAW COLOR STRINGS — use with Mantine props (c=, bg=, color=)
// ─────────────────────────────────────────────────────────────
export const colors = {

    // Backgrounds
    background:     "#020617",   // slate-950
    card:           "#1e293b",   // slate-800
    section:        "#0f172a",   // slate-900
    sectionInner:   "#334155",   // slate-700
  
    // Text
    textPrimary:    "#f1f5f9",   // slate-100
    textSecondary:  "#94a3b8",   // slate-400
    textAccent:     "#2dd4bf",   // teal-400
    textDanger:     "#f87171",   // red-400
  
    // Buttons (bg colors)
    buttonSubmit:   "#14b8a6",   // teal-500
    buttonLogin:    "#4f46e5",   // indigo-600
    buttonRegister: "#0f766e",   // teal-700
    buttonEdit:     "#475569",   // slate-600
    buttonDelete:   "#b91c1c",   // red-700
    buttonCancel:   "#334155",   // slate-700
  
    // Nav
    nav:            "#0f172a",   // slate-900
    navLink:        "#cbd5e1",   // slate-300
    navLinkActive:  "#2dd4bf",   // teal-400
  
    // Forms
    input:          "#334155",   // slate-700
    inputBorder:    "#475569",   // slate-600
    inputFocus:     "#2dd4bf",   // teal-400
    label:          "#cbd5e1",   // slate-300
  
    // Tracker posts
    postItem:       "#1e293b",   // slate-800
    postItemBorder: "#334155",   // slate-700
    badge:          "#134e4a",   // teal-900
  
    // Reports / charts
    reportSection:  "#1e293b",   // slate-800
    chartAccent:    "#2dd4bf",   // teal-400
    statPositive:   "#2dd4bf",   // teal-400
    statNeutral:    "#cbd5e1",   // slate-300
  
    // Dividers
    divider:        "#334155",   // slate-700
  }
  
  // ─────────────────────────────────────────────────────────────
  // TAILWIND CLASS STRINGS — use in className= props
  // ─────────────────────────────────────────────────────────────
  export const colorScheme = {
  
    // Backgrounds
    background:       "bg-slate-950",
    card:             "bg-slate-800",
    section:          "bg-slate-900",
    sectionInner:     "bg-slate-700",
  
    // Text
    textPrimary:      "text-slate-100",
    textSecondary:    "text-slate-400",
    textAccent:       "text-teal-400",
    textDanger:       "text-red-400",
  
    // Buttons
    buttonSubmit:     "bg-teal-500 hover:bg-teal-400 text-white",
    buttonLogin:      "bg-indigo-600 hover:bg-indigo-500 text-white",
    buttonRegister:   "bg-teal-700 hover:bg-teal-600 text-white",
    buttonEdit:       "bg-slate-600 hover:bg-slate-500 text-slate-100",
    buttonDelete:     "bg-red-700 hover:bg-red-600 text-white",
    buttonCancel:     "bg-slate-700 hover:bg-slate-600 text-slate-300",
  
    // Nav
    nav:              "bg-slate-900",
    navLink:          "text-slate-300 hover:text-teal-400",
    navLinkActive:    "text-teal-400 font-semibold",
  
    // Forms
    input:            "bg-slate-700 text-slate-100 placeholder-slate-400",
    inputBorder:      "border border-slate-600",
    inputBorderFocus: "focus:border-teal-400 focus:outline-none",
    label:            "text-slate-300",
  
    // Tracker posts
    postItem:         "bg-slate-800 border border-slate-700",
    postItemHover:    "hover:border-teal-500",
    badge:            "bg-teal-900 text-teal-300",
  
    // Reports
    reportSection:    "bg-slate-800",
    statPositive:     "text-teal-400",
    statNeutral:      "text-slate-300",
  
    // Dividers
    divider:          "border-slate-700",
  }