const fs = require('fs');
const path = './src/app/(app)/error-log/page.tsx';
let content = fs.readFileSync(path, 'utf8');

const map = {
  'bg-slate-50': 'bg-slate-50 dark:bg-transparent',
  'bg-white': 'bg-white dark:bg-white/5',
  'text-slate-900': 'text-slate-900 dark:text-white',
  'text-slate-800': 'text-slate-800 dark:text-slate-100',
  'text-slate-700': 'text-slate-700 dark:text-slate-200',
  'text-slate-600': 'text-slate-600 dark:text-slate-300',
  'text-slate-500': 'text-slate-500 dark:text-slate-400',
  'text-slate-400': 'text-slate-400 dark:text-slate-500',
  'border-slate-200': 'border-slate-200 dark:border-white/10',
  'border-slate-100': 'border-slate-100 dark:border-white/5',
  'bg-slate-100': 'bg-slate-100 dark:bg-white/10',
  'bg-slate-200': 'bg-slate-200 dark:bg-white/20',
  'bg-\\[#F8FAFC\\]': 'bg-[#F8FAFC] dark:bg-[#0A0A0A]',
  'shadow-apple-soft': 'shadow-apple-soft dark:shadow-none',
  'bg-blue-50': 'bg-blue-50 dark:bg-blue-900/20',
  'border-blue-100': 'border-blue-100 dark:border-blue-900/30',
  'bg-emerald-50': 'bg-emerald-50 dark:bg-emerald-900/20',
  'border-emerald-200': 'border-emerald-200 dark:border-emerald-900/30',
  'border-emerald-100': 'border-emerald-100 dark:border-emerald-900/20',
  'bg-rose-50': 'bg-rose-50 dark:bg-rose-900/20',
  'border-rose-200': 'border-rose-200 dark:border-rose-900/30',
  'bg-orange-100': 'bg-orange-100 dark:bg-orange-900/20',
  'border-orange-200': 'border-orange-200 dark:border-orange-900/30',
  'bg-purple-100': 'bg-purple-100 dark:bg-purple-900/20',
  'border-purple-200': 'border-purple-200 dark:border-purple-900/30',
  'text-slate-300': 'text-slate-300 dark:text-slate-400'
};

for (const [cls, replacement] of Object.entries(map)) {
  const regex = new RegExp(`(?<![\\w-])` + cls + `(?![\\w-])`, 'g');
  content = content.replace(regex, replacement);
}

fs.writeFileSync(path, content, 'utf8');
