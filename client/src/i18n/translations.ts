// Static UI copy only — the analysis results themselves (pain points,
// consumer language, ad angles, strategy notes) are never translated here;
// they stay exactly as returned by the API regardless of UI language.

export type Locale = "en" | "zh";

export const translations = {
  en: {
    "app.subtitle": "Upload a reviews CSV or XLSX export to mine pain points, consumer language, and ad angles.",
    "app.orTryDemo": "or try the demo",

    "asinForm.placeholder": "Enter an Amazon ASIN (e.g. B08XYZ1234)",
    "asinForm.analyze": "Analyze",
    "asinForm.analyzing": "Analyzing…",

    "upload.dropPrompt": "Drag & drop a reviews CSV or XLSX file, or click to browse",
    "upload.accepts": "Accepts .csv, .xlsx, .xls",
    "upload.uploadedFile": "Uploaded: {{fileName}}",
    "upload.analyzing": "Analyzing…",
    "upload.rejected": '"{{fileName}}" isn\'t a .csv, .xlsx, or .xls file.',

    "status.uploaded": "File uploaded ✓ — {{count}} reviews found",
    "status.uploadedNoCount": "File uploaded ✓",
    "status.analyzing": "Analyzing {{count}} reviews…",
    "status.analyzingNoCount": "Analyzing reviews…",

    "results.showingUploadWithColumn":
      'Showing analysis of your uploaded file (review text read from column "{{column}}").',
    "results.showingUploadNoColumn": "Showing analysis of your uploaded file.",
    "results.showingDemo": "Showing demo data (garden pruning shears).",
    "results.meta": "ASIN: {{asin}} · {{count}} reviews analyzed",

    "export.copyReport": "Copy Report",
    "export.copied": "Copied ✓",
    "export.downloadPdf": "Download PDF",

    "topFinding.title": "Top Finding",
    "topFinding.painPoint": "#1 Pain Point",
    "topFinding.adAngle": "Best Ad Angle",
    "topFinding.quote": "Key Consumer Quote",

    "common.mentions": "{{count}} mentions",

    "recommendations.title": "What to do next",

    "accordion.painPoints": "Clustered Pain Points",
    "accordion.consumerLanguage": "Consumer Language",
    "accordion.adAngles": "Ad Angles",
    "accordion.strategyNotes": "Strategy Notes",

    "adAngles.targets": "targets: {{theme}}",

    "report.title": "HOOKMINER ANALYSIS REPORT",
    "report.product": "Product: {{title}} (ASIN: {{asin}})",
    "report.reviewsAnalyzed": "Reviews analyzed: {{count}}",
    "report.topFinding": "TOP FINDING",
    "report.painPointLabel": "Pain point",
    "report.adAngleLabel": "Best ad angle",
    "report.quoteLabel": "Key consumer quote",
    "report.whatToDoNext": "WHAT TO DO NEXT",
    "report.painPoints": "CLUSTERED PAIN POINTS",
    "report.consumerLanguage": "CONSUMER LANGUAGE",
    "report.adAngles": "AD ANGLES",
    "report.strategyNotes": "STRATEGY NOTES",
  },
  zh: {
    "app.subtitle": "上传评论 CSV 或 XLSX 文件，挖掘用户痛点、消费者语言和广告角度。",
    "app.orTryDemo": "或试用演示数据",

    "asinForm.placeholder": "输入亚马逊 ASIN（例如 B08XYZ1234）",
    "asinForm.analyze": "开始分析",
    "asinForm.analyzing": "分析中…",

    "upload.dropPrompt": "拖拽评论 CSV 或 XLSX 文件到此处，或点击浏览",
    "upload.accepts": "支持 .csv、.xlsx、.xls 格式",
    "upload.uploadedFile": "已上传：{{fileName}}",
    "upload.analyzing": "分析中…",
    "upload.rejected": "“{{fileName}}” 不是 .csv、.xlsx 或 .xls 文件。",

    "status.uploaded": "文件已上传 ✓ — 找到 {{count}} 条评论",
    "status.uploadedNoCount": "文件已上传 ✓",
    "status.analyzing": "正在分析 {{count}} 条评论…",
    "status.analyzingNoCount": "正在分析评论…",

    "results.showingUploadWithColumn": "正在显示您上传文件的分析结果（评论文本读取自列 “{{column}}”）。",
    "results.showingUploadNoColumn": "正在显示您上传文件的分析结果。",
    "results.showingDemo": "正在显示演示数据（园艺剪刀）。",
    "results.meta": "ASIN：{{asin}} · 已分析 {{count}} 条评论",

    "export.copyReport": "复制报告",
    "export.copied": "已复制 ✓",
    "export.downloadPdf": "下载 PDF",

    "topFinding.title": "核心发现",
    "topFinding.painPoint": "首要痛点",
    "topFinding.adAngle": "最佳广告角度",
    "topFinding.quote": "关键消费者原话",

    "common.mentions": "{{count}} 次提及",

    "recommendations.title": "下一步建议",

    "accordion.painPoints": "痛点聚类",
    "accordion.consumerLanguage": "消费者语言",
    "accordion.adAngles": "广告角度",
    "accordion.strategyNotes": "策略笔记",

    "adAngles.targets": "针对：{{theme}}",

    "report.title": "HOOKMINER 分析报告",
    "report.product": "产品：{{title}}（ASIN：{{asin}}）",
    "report.reviewsAnalyzed": "已分析评论数：{{count}}",
    "report.topFinding": "核心发现",
    "report.painPointLabel": "痛点",
    "report.adAngleLabel": "最佳广告角度",
    "report.quoteLabel": "关键消费者原话",
    "report.whatToDoNext": "下一步建议",
    "report.painPoints": "痛点聚类",
    "report.consumerLanguage": "消费者语言",
    "report.adAngles": "广告角度",
    "report.strategyNotes": "策略笔记",
  },
} as const satisfies Record<Locale, Record<string, string>>;

export type TranslationKey = keyof typeof translations.en;
